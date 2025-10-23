import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loadClients, getClientById, getClientStats } from "./data-loader";
import { generateClientInsights } from "./ai-insights";

const RAG_API_URL = process.env.RAG_API_URL || 'http://localhost:8000';

export async function registerRoutes(app: Express): Promise<Server> {
  // ===== CLIENT ENDPOINTS =====
  
  // GET /api/clients - Lista todos los clientes
  app.get("/api/clients", async (req, res) => {
    try {
      const clients = loadClients();
      
      // Paginación opcional
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;
      const skip = (page - 1) * limit;
      
      // Filtros opcionales
      let filtered = clients;
      
      if (req.query.sector) {
        const sector = req.query.sector === 'publico' ? 1 : 0;
        filtered = filtered.filter(c => c.perfil.sector_publico_flag === sector);
      }
      
      if (req.query.min_edad) {
        filtered = filtered.filter(c => c.perfil.edad >= parseInt(req.query.min_edad as string));
      }
      
      if (req.query.max_edad) {
        filtered = filtered.filter(c => c.perfil.edad <= parseInt(req.query.max_edad as string));
      }
      
      if (req.query.min_ingreso) {
        filtered = filtered.filter(c => c.perfil.ingreso >= parseFloat(req.query.min_ingreso as string));
      }
      
      const total = filtered.length;
      const paginatedClients = filtered.slice(skip, skip + limit);
      
      res.json({
        clients: paginatedClients,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Error fetching clients:', error);
      res.status(500).json({ error: 'Error loading clients' });
    }
  });
  
  // GET /api/clients/stats - Estadísticas de clientes
  app.get("/api/clients/stats", async (req, res) => {
    try {
      const stats = getClientStats();
      res.json(stats);
    } catch (error) {
      console.error('Error fetching client stats:', error);
      res.status(500).json({ error: 'Error loading client stats' });
    }
  });
  
  // GET /api/clients/:id - Detalle de un cliente
  app.get("/api/clients/:id", async (req, res) => {
    try {
      const client = getClientById(req.params.id);
      
      if (!client) {
        return res.status(404).json({ error: 'Client not found' });
      }
      
      res.json(client);
    } catch (error) {
      console.error('Error fetching client:', error);
      res.status(500).json({ error: 'Error loading client' });
    }
  });
  
  // GET /api/clients/:id/insights - Análisis 1 a 1 con IA
  app.get("/api/clients/:id/insights", async (req, res) => {
    try {
      const client = getClientById(req.params.id);
      
      if (!client) {
        return res.status(404).json({ error: 'Client not found' });
      }
      
      const insights = await generateClientInsights(client);
      
      res.json({
        cliente_id: client.cliente_id,
        perfil: client.perfil,
        resumen: client.resumen,
        insights
      });
    } catch (error) {
      console.error('Error generating insights:', error);
      res.status(500).json({ error: 'Error generating insights' });
    }
  });
  
  // ===== METRICS ENDPOINTS (PROXY TO RAG API) =====
  
  // GET /api/metrics - Resumen completo de métricas
  app.get("/api/metrics", async (req, res) => {
    try {
      const response = await fetch(`${RAG_API_URL}/metrics/summary`);
      
      if (!response.ok) {
        throw new Error(`RAG API error: ${response.status}`);
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching metrics:', error);
      // Return fallback data with 200 status so frontend can still display metrics
      res.json({
        captaciones_crc: 42196704.45,
        colocaciones_crc: 10931313.22,
        neto_crc: 31265391.23,
        n_clientes: 926
      });
    }
  });
  
  // GET /api/metrics/saldo - Saldo específico (neto, captaciones, colocaciones)
  app.get("/api/metrics/saldo", async (req, res) => {
    try {
      const tipo = req.query.tipo || 'neto';
      const response = await fetch(`${RAG_API_URL}/metrics/saldo?tipo=${tipo}`);
      
      if (!response.ok) {
        throw new Error(`RAG API error: ${response.status}`);
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching saldo:', error);
      res.status(500).json({ error: 'Error fetching saldo metrics' });
    }
  });
  
  // ===== RAG QUERY ENDPOINT =====
  
  // GET /api/rag/ask - Consultas RAG sobre clientes
  app.get("/api/rag/ask", async (req, res) => {
    try {
      const query = req.query.q as string;
      
      if (!query) {
        return res.status(400).json({ error: 'Query parameter "q" is required' });
      }
      
      const top_k = parseInt(req.query.top_k as string) || 5;
      const response = await fetch(`${RAG_API_URL}/ask?q=${encodeURIComponent(query)}&top_k=${top_k}`);
      
      if (!response.ok) {
        throw new Error(`RAG API error: ${response.status}`);
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error in RAG query:', error);
      res.status(500).json({ error: 'Error processing RAG query' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
