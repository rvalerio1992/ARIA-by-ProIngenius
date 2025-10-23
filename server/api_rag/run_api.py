#!/usr/bin/env python3
"""
Script de arranque para la API RAG de Gemelo 1.1 Premium
Ejecuta el servidor FastAPI en puerto 8000
"""
import os
import uvicorn

if __name__ == "__main__":
    # Verificar API key (advertencia, no bloqueo)
    api_key = os.getenv("AI_INTEGRATIONS_OPENAI_API_KEY", "")
    has_key = len(api_key) > 20
    
    # Configuración del servidor
    host = "0.0.0.0"
    port = 8000
    
    print("\n" + "=" * 60)
    print("🚀 Iniciando API RAG - Gemelo 1.1 Premium")
    print("=" * 60)
    print(f"📡 Servidor: http://{host}:{port}")
    print(f"📖 Docs: http://{host}:{port}/docs")
    print(f"🔍 Health: http://{host}:{port}/health")
    print(f"🔑 OpenAI Key: {'✓ Configurada' if has_key else '✗ No configurada'}")
    
    if not has_key:
        print("\n⚠️  ADVERTENCIA: AI_INTEGRATIONS_OPENAI_API_KEY no encontrada")
        print("   • Endpoints de métricas (/metrics/*) funcionarán normalmente")
        print("   • Endpoint RAG (/ask) retornará error hasta configurar la key")
        print("   • Configura el secret en Replit para habilitar RAG completo")
    
    print("=" * 60 + "\n")
    
    # Ejecutar servidor (sin bloqueo)
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=False,
        log_level="info"
    )
