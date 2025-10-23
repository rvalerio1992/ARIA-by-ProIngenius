# API RAG - Gemelo 1.1 Premium

API REST para consultas RAG (Retrieval-Augmented Generation) sobre clientes bancarios y métricas de cartera.

## 🎯 Descripción

Esta API proporciona dos funcionalidades principales:

1. **RAG sobre Clientes**: Búsqueda semántica con ChromaDB + OpenAI embeddings sobre 926 perfiles de clientes
2. **Métricas de Cartera**: Cálculos de saldos (captaciones, colocaciones, neto) usando definiciones exactas

## 📊 Datos

- **926 clientes** indexados desde `row_cards.jsonl`
- **Captaciones totales**: ₡42,196,704.45
- **Colocaciones totales**: ₡10,931,313.22
- **Saldo neto**: ₡31,265,391.23

## 🚀 Ejecutar la API

### Opción 1: Script de arranque (recomendado)

```bash
cd server/api_rag
python3 run_api.py
```

### Opción 2: Uvicorn directo

```bash
cd server/api_rag
python3 -m uvicorn main:app --host 0.0.0.0 --port 8000
```

La API estará disponible en:
- **Servidor**: http://0.0.0.0:8000
- **Documentación interactiva**: http://0.0.0.0:8000/docs
- **Health check**: http://0.0.0.0:8000/health

## 🔑 Configuración de Secrets

### Secret requerido para RAG

Para usar los endpoints RAG (`/ask`), necesitas configurar tu API key de OpenAI:

1. Ve a **Secrets** en Replit
2. Agrega `AI_INTEGRATIONS_OPENAI_API_KEY` con tu API key de OpenAI
3. Reinicia la API

**Nota**: Los endpoints de métricas (`/metrics/*`) funcionan sin API key.

## 📡 Endpoints Disponibles

### 1. Health Check

```bash
GET /health
```

**Respuesta**:
```json
{
  "status": "ok",
  "vector_docs": 926,
  "services": {
    "metrics": "ready",
    "rag": "ready_to_init",
    "openai_configured": true
  }
}
```

### 2. Consultas RAG

```bash
GET /ask?q=tu_pregunta&top_k=5
```

**Parámetros**:
- `q`: Pregunta sobre clientes o segmentos (requerido)
- `top_k`: Número de clientes a recuperar (1-20, default: 5)

**Ejemplos**:

```bash
# Buscar clientes del sector público
curl "http://localhost:8000/ask?q=clientes+con+alto+ingreso+del+sector+público"

# Buscar segmentos demográficos
curl "http://localhost:8000/ask?q=mujeres+mayores+de+50+años"

# Buscar perfiles profesionales
curl "http://localhost:8000/ask?q=jóvenes+profesionales+con+alta+antigüedad"
```

**Respuesta**:
```json
{
  "answer": "Basándome en los datos...",
  "matches": [
    {
      "cliente_id": "CLI_123",
      "resumen": "Mujer, 52 años, sector público...",
      "metadata": {"sexo": "F", "edad": 52, "ingreso": 850000}
    }
  ],
  "context_used": 5
}
```

### 3. Métricas de Saldo

```bash
GET /metrics/saldo?tipo={neto|captaciones|colocaciones}
```

**Tipos disponibles**:
- `neto`: Captaciones - Colocaciones
- `captaciones`: Suma de productos pasivos (CE_SALDO, CDI_SALDO, FI_SALDO, etc.)
- `colocaciones`: Suma de productos activos (PR_PRENDARIO_SALDO, TC_SALDO, etc.)

**Ejemplos**:

```bash
# Saldo neto
curl "http://localhost:8000/metrics/saldo?tipo=neto"

# Captaciones
curl "http://localhost:8000/metrics/saldo?tipo=captaciones"

# Colocaciones
curl "http://localhost:8000/metrics/saldo?tipo=colocaciones"
```

**Respuesta (neto)**:
```json
{
  "tipo": "neto",
  "crc": 31265391.23,
  "formula": "captaciones - colocaciones",
  "captaciones_crc": 42196704.45,
  "colocaciones_crc": 10931313.22,
  "n_clientes": 926
}
```

### 4. Desglose por Producto

```bash
GET /metrics/saldo_por_producto
```

Retorna información detallada de columnas/productos detectados en captaciones y colocaciones.

### 5. Resumen Completo

```bash
GET /metrics/summary
```

Retorna todos los totales y definiciones de métricas.

## 🏗️ Arquitectura

### Servicios

1. **RAGService** (`rag_service.py`)
   - ChromaDB persistent vector store
   - OpenAI embeddings (text-embedding-3-small)
   - GPT-4 para generación de respuestas
   - Indexación en lotes de 100 documentos

2. **MetricsService** (`metrics_service.py`)
   - Cálculos basados en `metrics_config.json`
   - Sin dependencias externas (funciona sin API keys)
   - Soporte para captaciones, colocaciones y saldo neto

### Estructura de Datos

```
server/api_rag/
├── main.py                 # FastAPI app con endpoints
├── rag_service.py          # Servicio RAG (ChromaDB + OpenAI)
├── metrics_service.py      # Servicio de métricas
├── run_api.py              # Script de arranque
├── rag_cartera/            # Vector store persistente (generado)
└── data/
    ├── row_cards.jsonl     # 926 perfiles de clientes
    ├── portfolio_totals.json
    ├── metrics_config.json
    └── schema_card.json
```

## 🧪 Testing

### Test con cURL

```bash
# Health
curl http://localhost:8000/health

# Root
curl http://localhost:8000/

# Métricas
curl "http://localhost:8000/metrics/saldo?tipo=neto"

# RAG (requiere API key)
curl "http://localhost:8000/ask?q=clientes+sector+público"
```

### Test con Python

```python
import requests

# Métricas
response = requests.get("http://localhost:8000/metrics/saldo?tipo=neto")
print(response.json())

# RAG
response = requests.get(
    "http://localhost:8000/ask",
    params={"q": "mujeres profesionales", "top_k": 3}
)
print(response.json())
```

### Test con FastAPI TestClient

```python
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

# Test endpoints
response = client.get("/health")
assert response.status_code == 200

response = client.get("/metrics/saldo?tipo=neto")
assert response.status_code == 200
assert response.json()["crc"] == 31265391.23
```

## 🔧 Dependencias

- **fastapi**: Framework web
- **uvicorn**: Servidor ASGI
- **chromadb**: Vector store
- **openai**: Embeddings + GPT-4
- **pydantic**: Validación de datos
- **python-dotenv**: Gestión de variables de entorno

## 📝 Notas

- **Lazy Loading**: RAG solo se inicializa cuando se usa (primera llamada a `/ask`)
- **Persistencia**: Vector store se guarda en `./rag_cartera` (indexación única)
- **CORS**: Configurado para aceptar todas las origins (ajustar para producción)
- **Puerto**: 8000 (configurado en `.replit`)

## 🎓 Próximos Pasos

1. Crear workflow en Replit UI para mantener API corriendo
2. Configurar API key de OpenAI en Secrets
3. Integrar con frontend React (si aplica)
4. Agregar autenticación para producción
5. Implementar rate limiting
