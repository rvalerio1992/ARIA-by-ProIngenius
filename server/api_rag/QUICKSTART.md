# 🚀 Guía de Inicio Rápido - API RAG

## ¿Qué es esto?

Una API REST independiente que te permite:
1. **Consultar clientes** usando lenguaje natural (ej: "clientes del sector público con alto ingreso")
2. **Calcular métricas** de cartera bancaria (captaciones, colocaciones, saldo neto)

## 📊 Datos Disponibles

- **926 clientes** indexados con perfiles completos
- **₡42.2M** en captaciones (productos pasivos)
- **₡10.9M** en colocaciones (productos activos)  
- **₡31.3M** saldo neto

## ⚡ Inicio Rápido (3 pasos)

### 1. Inicia el servidor

```bash
cd server/api_rag
python3 run_api.py
```

**Salida esperada:**
```
============================================================
🚀 Iniciando API RAG - Gemelo 1.1 Premium
============================================================
📡 Servidor: http://0.0.0.0:8000
📖 Docs: http://0.0.0.0:8000/docs
🔍 Health: http://0.0.0.0:8000/health
🔑 OpenAI Key: ✗ No configurada

⚠️  ADVERTENCIA: AI_INTEGRATIONS_OPENAI_API_KEY no encontrada
   • Endpoints de métricas (/metrics/*) funcionarán normalmente
   • Endpoint RAG (/ask) retornará error hasta configurar la key
============================================================
```

### 2. Prueba los endpoints de métricas (sin API key requerida)

Abre otra terminal y ejecuta:

```bash
# Saldo neto (captaciones - colocaciones)
curl "http://localhost:8000/metrics/saldo?tipo=neto"

# Captaciones totales
curl "http://localhost:8000/metrics/saldo?tipo=captaciones"

# Colocaciones totales
curl "http://localhost:8000/metrics/saldo?tipo=colocaciones"
```

**Respuesta esperada:**
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

### 3. (Opcional) Configura OpenAI para RAG

Para usar consultas en lenguaje natural sobre clientes:

1. Ve a **Secrets** en Replit
2. Agrega: `AI_INTEGRATIONS_OPENAI_API_KEY` = `tu-api-key-de-openai`
3. Reinicia el servidor (`Ctrl+C` y vuelve a ejecutar `python3 run_api.py`)

Luego prueba:

```bash
# Buscar clientes del sector público
curl "http://localhost:8000/ask?q=clientes+del+sector+público+con+alto+ingreso"

# Buscar segmentos demográficos
curl "http://localhost:8000/ask?q=mujeres+mayores+de+50+años"

# Buscar perfiles profesionales  
curl "http://localhost:8000/ask?q=jóvenes+profesionales"
```

## 📖 Documentación Interactiva

Una vez que el servidor esté corriendo, visita:

**http://0.0.0.0:8000/docs**

Tendrás una interfaz interactiva donde puedes:
- Ver todos los endpoints disponibles
- Probar requests directamente desde el navegador
- Ver ejemplos de respuestas
- Leer documentación detallada de cada endpoint

## 🧪 Tests Rápidos

```bash
# Health check
curl http://localhost:8000/health

# Resumen completo de métricas
curl http://localhost:8000/metrics/summary

# Desglose por producto
curl http://localhost:8000/metrics/saldo_por_producto
```

## 🔧 Solución de Problemas

### El servidor no inicia

**Problema**: `ModuleNotFoundError: No module named 'fastapi'`

**Solución**: Las dependencias ya están instaladas. Si ves este error, ejecuta:
```bash
cd /home/runner/workspace
python3 -m pip install --user fastapi uvicorn chromadb openai
```

### Puerto 8000 ya en uso

**Problema**: `Address already in use`

**Solución**: 
```bash
# Encuentra el proceso
ps aux | grep uvicorn

# Mátalo (reemplaza PID con el número que encuentres)
kill -9 PID
```

### OpenAI API retorna 401

**Problema**: `Error code: 401 - Incorrect API key`

**Solución**: 
1. Verifica que el secret esté configurado correctamente en Replit
2. La key debe tener el prefijo `sk-`
3. Reinicia el servidor después de agregar el secret

## 📚 Próximos Pasos

1. ✅ **Revisar README.md** completo en `server/api_rag/README.md`
2. ✅ **Explorar la API docs** en http://localhost:8000/docs
3. ✅ **Integrar con el frontend** React (si aplica)
4. ✅ **Crear workflow** de Replit para mantener API corriendo automáticamente

## 💡 Tips

- Los endpoints de **métricas** siempre funcionan (sin API key)
- El endpoint **RAG** solo funciona con OpenAI API key configurada
- La **primera consulta RAG** toma ~30 segundos (indexa 926 clientes)
- Las **consultas siguientes** son instantáneas (vector store persistente)
- Puedes **cambiar el puerto** editando `run_api.py` (línea 16)

## ✅ Verificación Rápida

```bash
# Este comando debe retornar 200 OK
curl -I http://localhost:8000/health

# Este comando debe mostrar información del servidor
curl http://localhost:8000/ | python3 -m json.tool
```

---

**¿Preguntas?** Revisa el README.md completo o consulta la documentación interactiva en /docs
