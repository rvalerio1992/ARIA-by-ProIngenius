"""
API RAG para Asistente Bancario - Gemelo 1.1 Premium
API minimal viable con RAG sobre clientes y métricas de cartera
"""
import os
from typing import Optional
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from rag_service import RAGService
from metrics_service import MetricsService

# Inicializar FastAPI
app = FastAPI(
    title="API RAG - Gemelo 1.1 Premium",
    description="API para consultas RAG sobre clientes y métricas de cartera bancaria",
    version="0.1.0"
)

# Configurar CORS (abierto para pruebas)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicializar servicios (lazy loading)
rag_service: Optional[RAGService] = None
metrics_service: Optional[MetricsService] = None

def get_rag_service() -> RAGService:
    """Obtiene instancia singleton del servicio RAG"""
    global rag_service
    if rag_service is None:
        print("→ Inicializando RAG Service...")
        rag_service = RAGService()
        print("✓ RAG Service listo")
    return rag_service

def get_metrics_service() -> MetricsService:
    """Obtiene instancia singleton del servicio de métricas"""
    global metrics_service
    if metrics_service is None:
        print("→ Inicializando Metrics Service...")
        metrics_service = MetricsService()
        print("✓ Metrics Service listo")
    return metrics_service

# ===== MODELOS PYDANTIC =====

class HealthResponse(BaseModel):
    status: str
    vector_docs: int
    services: dict

class AskResponse(BaseModel):
    answer: str
    matches: list
    context_used: int

class SaldoResponse(BaseModel):
    tipo: str
    crc: float
    n_clientes: int

# ===== ENDPOINTS =====

@app.get("/")
async def root():
    """Endpoint raíz con información de la API"""
    return {
        "name": "API RAG - Gemelo 1.1 Premium",
        "version": "0.1.0",
        "endpoints": {
            "health": "/health",
            "ask": "/ask?q=tu_pregunta",
            "metrics_saldo": "/metrics/saldo?tipo=neto|captaciones|colocaciones",
            "metrics_productos": "/metrics/saldo_por_producto"
        },
        "docs": "/docs"
    }

@app.get("/health")
async def health():
    """
    Endpoint de salud del sistema
    Retorna estado de servicios disponibles
    """
    try:
        # Verificar API key (sin inicializar RAG aún)
        api_key = os.getenv("AI_INTEGRATIONS_OPENAI_API_KEY", "")
        has_valid_key = len(api_key) > 20  # API keys reales son >40 chars
        
        # Inicializar solo metrics (no requiere OpenAI)
        metrics = get_metrics_service()
        
        # Verificar si RAG ya está inicializado
        rag_status = "not_initialized"
        vector_docs = 0
        
        if rag_service is not None:
            stats = rag_service.get_stats()
            rag_status = stats['status']
            vector_docs = stats['total_documents']
        elif has_valid_key:
            rag_status = "ready_to_init"
        else:
            rag_status = "needs_api_key"
        
        return {
            "status": "ok",
            "vector_docs": vector_docs,
            "services": {
                "metrics": "ready",
                "rag": rag_status,
                "openai_configured": has_valid_key
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en health check: {str(e)}")

@app.get("/ask", response_model=AskResponse)
async def ask(
    q: str = Query(..., description="Pregunta sobre clientes o segmentos"),
    top_k: int = Query(5, ge=1, le=20, description="Número de clientes a recuperar")
):
    """
    Endpoint RAG para preguntas sobre clientes/segmentos
    
    Usa embeddings de OpenAI + ChromaDB para búsqueda semántica
    y GPT-4 para generar respuestas basadas en contexto recuperado
    
    Ejemplos:
    - /ask?q=clientes con alto ingreso del sector público
    - /ask?q=mujeres mayores de 50 años con antigüedad laboral alta
    - /ask?q=clientes jóvenes profesionales
    """
    try:
        rag = get_rag_service()
        
        # Ejecutar RAG + GPT-4
        result = rag.ask_with_gpt(q, top_k=top_k)
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en RAG query: {str(e)}")

@app.get("/metrics/saldo")
async def get_saldo(
    tipo: str = Query(..., description="Tipo de saldo: neto, captaciones, o colocaciones")
):
    """
    Endpoint de métricas de cartera
    
    Calcula saldos usando definiciones exactas de metrics_config.json
    
    Tipos disponibles:
    - neto: captaciones - colocaciones
    - captaciones: suma de productos pasivos (CE_SALDO, CDI_SALDO, etc.)
    - colocaciones: suma de productos activos (PR_PRENDARIO_SALDO, TC_SALDO, etc.)
    
    Ejemplos:
    - /metrics/saldo?tipo=neto
    - /metrics/saldo?tipo=captaciones
    - /metrics/saldo?tipo=colocaciones
    """
    try:
        metrics = get_metrics_service()
        
        result = metrics.get_saldo(tipo)
        
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calculando saldo: {str(e)}")

@app.get("/metrics/saldo_por_producto")
async def get_saldo_por_producto():
    """
    Endpoint de desglose por producto
    
    Retorna información detallada de columnas/productos
    detectados en captaciones y colocaciones
    """
    try:
        metrics = get_metrics_service()
        
        result = metrics.get_saldo_por_producto()
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error obteniendo productos: {str(e)}")

@app.get("/metrics/summary")
async def get_metrics_summary():
    """
    Endpoint de resumen completo de métricas
    
    Retorna todos los totales y definiciones
    """
    try:
        metrics = get_metrics_service()
        
        result = metrics.get_totals_summary()
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error obteniendo resumen: {str(e)}")

# ===== STARTUP / SHUTDOWN =====

@app.on_event("startup")
async def startup_event():
    """Evento de inicio de la aplicación"""
    print("=" * 60)
    print("Iniciando API RAG - ARIA by ProIngenius")
    print("=" * 60)
    print(f"OpenAI API Key: {'Configurada' if os.getenv('AI_INTEGRATIONS_OPENAI_API_KEY') else 'NO ENCONTRADA'}")
    print("=" * 60)

@app.on_event("shutdown")
async def shutdown_event():
    """Evento de cierre de la aplicación"""
    print("Cerrando API RAG...")

if __name__ == "__main__":
    import uvicorn
    
    # Configuración del servidor
    host = "127.0.0.1"  # Cambio para Windows local
    port = 8000
    
    print(f"\nServidor disponible en: http://{host}:{port}")
    print(f"Documentacion interactiva: http://{host}:{port}/docs\n")
    
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=False,
        log_level="info"
    )
