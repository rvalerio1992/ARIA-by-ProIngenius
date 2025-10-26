# 📜 Scripts de ARIA

Esta carpeta contiene todos los scripts de utilidad para gestionar el proyecto ARIA.

## 🚀 Scripts de Inicio (Recomendados)

### `start-all.ps1` ⭐
Inicia ambos servidores simultáneamente (Backend TypeScript + API RAG Python).
```powershell
.\scripts\start-all.ps1
```
**Servicios iniciados:**
- Backend Express + Frontend Vite: `http://localhost:5000`
- API RAG FastAPI: `http://localhost:8000`
- Documentación API: `http://localhost:8000/docs`

### `start-backend.ps1`
Inicia solo el backend TypeScript con Express y el frontend React.
```powershell
.\scripts\start-backend.ps1
```

### `start-rag-api.ps1`
Inicia solo la API RAG Python (FastAPI).
```powershell
.\scripts\start-rag-api.ps1
```

## 🔧 Scripts de Configuración

### `setup-local.ps1` ⭐
Script completo de configuración inicial. Instala dependencias, verifica requisitos y configura el entorno.
```powershell
.\scripts\setup-local.ps1
```

### `check-requirements.ps1`
Verifica que todas las herramientas necesarias estén instaladas (Node.js, Python, PostgreSQL).
```powershell
.\scripts\check-requirements.ps1
```

### `install-python-deps.bat`
Instala las dependencias de Python para la API RAG.
```batch
.\scripts\install-python-deps.bat
```

## 🔍 Scripts de Diagnóstico

### `diagnostico-completo.ps1`
Realiza un diagnóstico completo del sistema, verifica configuración y estado de servicios.
```powershell
.\scripts\diagnostico-completo.ps1
```

## 💡 Uso Rápido

### Primera vez (Setup completo):
```powershell
# 1. Ejecutar setup
.\scripts\setup-local.ps1

# 2. Configurar .env con tus credenciales
# Editar DATABASE_URL y AI_INTEGRATIONS_OPENAI_API_KEY

# 3. Iniciar todo
.\scripts\start-all.ps1
```

### Desarrollo diario:
```powershell
# Solo ejecutar esto cada vez que trabajes en el proyecto
.\scripts\start-all.ps1
```

## 📝 Notas

- **PowerShell (.ps1)**: Scripts principales para Windows
- **Batch (.bat)**: Scripts legacy/alternativos para CMD
- Si tienes problemas de ejecución en PowerShell:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```

## ⚠️ Requisitos

Antes de ejecutar los scripts, asegúrate de tener instalado:
- **Node.js** v18+
- **Python** v3.11+
- **PostgreSQL** v14+ (o usar Neon Database cloud)
- **OpenAI API Key** (para funciones de IA)

Ver documentación completa en `docs/README-SETUP.md`

