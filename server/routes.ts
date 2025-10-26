import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loadClients, getClientById, getClientStats } from "./data-loader";
import { generateClientInsights } from "./ai-insights";
import { generateAriaResponse } from "./aria-chat";

const RAG_API_URL = process.env.RAG_API_URL || 'http://localhost:8000';
const MAX_LIMIT = 100; // Límite máximo de resultados por página
const DEFAULT_LIMIT = 50;
const DEFAULT_PAGE = 1;

export async function registerRoutes(app: Express): Promise<Server> {
  // ===== CLIENT ENDPOINTS =====
  
  /**
   * GET /api/clients - Lista todos los clientes con paginación y filtros
   * Query params: page, limit, sector, min_edad, max_edad, min_ingreso
   */
  app.get("/api/clients", async (req, res) => {
    try {
      const clients = loadClients();
      
      // Paginación con validación
      const page = Math.max(1, parseInt(req.query.page as string) || DEFAULT_PAGE);
      const limit = Math.min(MAX_LIMIT, Math.max(1, parseInt(req.query.limit as string) || DEFAULT_LIMIT));
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
  
  /**
   * GET /api/clients/stats - Estadísticas agregadas de clientes
   */
  app.get("/api/clients/stats", async (req, res) => {
    try {
      const stats = getClientStats();
      res.json(stats);
    } catch (error) {
      console.error('Error fetching client stats:', error);
      res.status(500).json({ 
        error: 'Error loading client stats',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });
  
  /**
   * GET /api/clients/:id - Detalle completo de un cliente específico
   */
  app.get("/api/clients/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      // Validación de ID
      if (!id || id.trim() === '') {
        return res.status(400).json({ error: 'Client ID is required' });
      }
      
      const client = getClientById(id);
      
      if (!client) {
        return res.status(404).json({ 
          error: 'Client not found',
          clientId: id
        });
      }
      
      res.json(client);
    } catch (error) {
      console.error('Error fetching client:', error);
      res.status(500).json({ 
        error: 'Error loading client',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });
  
  /**
   * GET /api/clients/:id/insights - Análisis 1 a 1 con IA (requiere OpenAI API Key)
   */
  app.get("/api/clients/:id/insights", async (req, res) => {
    try {
      const { id } = req.params;
      
      // Validación de ID
      if (!id || id.trim() === '') {
        return res.status(400).json({ error: 'Client ID is required' });
      }
      
      const client = getClientById(id);
      
      if (!client) {
        return res.status(404).json({ 
          error: 'Client not found',
          clientId: id
        });
      }
      
      // Verificar que la API key de OpenAI esté configurada
      if (!process.env.AI_INTEGRATIONS_OPENAI_API_KEY) {
        return res.status(503).json({ 
          error: 'AI service not configured',
          message: 'OpenAI API key not found. Please configure AI_INTEGRATIONS_OPENAI_API_KEY in .env'
        });
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
      res.status(500).json({ 
        error: 'Error generating insights',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });
  
  // ===== METRICS ENDPOINTS (PROXY TO RAG API) =====
  
  /**
   * GET /api/metrics - Resumen completo de métricas de cartera
   * Proxy al endpoint de la API RAG Python
   */
  app.get("/api/metrics", async (req, res) => {
    try {
      const response = await fetch(`${RAG_API_URL}/metrics/summary`, {
        signal: AbortSignal.timeout(5000) // 5 segundos timeout
      });
      
      if (!response.ok) {
        throw new Error(`RAG API error: ${response.status}`);
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.warn('⚠️  RAG API no disponible, usando datos de respaldo:', error instanceof Error ? error.message : 'Unknown error');
      // Retornar datos de respaldo para que el frontend siga funcionando
      res.json({
        captaciones_crc: 42196704.45,
        colocaciones_crc: 10931313.22,
        neto_crc: 31265391.23,
        n_clientes: 926,
        _fallback: true // Indica que son datos de respaldo
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
  
  /**
   * GET /api/rag/ask - Consultas RAG sobre clientes usando búsqueda semántica
   * Query params: q (query string), top_k (número de resultados)
   */
  app.get("/api/rag/ask", async (req, res) => {
    try {
      const query = req.query.q as string;
      
      // Validación de query
      if (!query || query.trim() === '') {
        return res.status(400).json({ 
          error: 'Query parameter "q" is required',
          example: '/api/rag/ask?q=clientes+con+alto+ingreso'
        });
      }
      
      // Validar top_k
      const top_k = Math.min(20, Math.max(1, parseInt(req.query.top_k as string) || 5));
      
      const response = await fetch(
        `${RAG_API_URL}/ask?q=${encodeURIComponent(query)}&top_k=${top_k}`,
        { signal: AbortSignal.timeout(10000) } // 10 segundos timeout
      );
      
      if (!response.ok) {
        throw new Error(`RAG API error: ${response.status}`);
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error in RAG query:', error);
      res.status(500).json({ 
        error: 'Error processing RAG query',
        message: error instanceof Error ? error.message : 'Unknown error',
        hint: 'Verifica que la API RAG esté ejecutándose en http://localhost:8000'
      });
    }
  });
  
  // ===== ARIA CHAT ENDPOINT =====
  
  /**
   * POST /api/aria/ask - Chat con ARIA (asistente IA bancario)
   * Body: { message: string }
   * Requiere OpenAI API Key configurada
   */
  app.post("/api/aria/ask", async (req, res) => {
    try {
      const { message } = req.body;
      
      // Validación de mensaje
      if (!message || typeof message !== 'string' || message.trim() === '') {
        return res.status(400).json({ 
          error: 'Message is required',
          example: { message: "¿Cuál es el saldo total de la cartera?" }
        });
      }
      
      // Validar longitud del mensaje
      if (message.length > 1000) {
        return res.status(400).json({ 
          error: 'Message too long',
          maxLength: 1000
        });
      }
      
      // Verificar API key de OpenAI
      if (!process.env.AI_INTEGRATIONS_OPENAI_API_KEY) {
        return res.status(503).json({ 
          error: 'AI service not configured',
          message: 'OpenAI API key not found. Please configure AI_INTEGRATIONS_OPENAI_API_KEY in .env'
        });
      }
      
      const response = await generateAriaResponse(message);
      
      res.json({
        message: response,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error in ARIA chat:', error);
      res.status(500).json({ 
        error: 'Error processing ARIA request',
        message: 'Lo siento, hubo un error al procesar tu pregunta. Por favor intenta nuevamente.',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
