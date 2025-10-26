# 🏦 ARIA Banking CRM

**ARIA** (Asistente de Relaciones Inteligente Avanzado) es un sistema CRM bancario inteligente con capacidades de IA para análisis de carteras, segmentación de clientes y recomendaciones personalizadas.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Python](https://img.shields.io/badge/Python-3.11+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![React](https://img.shields.io/badge/React-18.3-61dafb)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-009688)

---

## ☁️ Desarrollo en la Nube

¿Quieres probar ARIA sin instalar nada? Usa GitHub Codespaces:

[![Abrir en GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?repo=rvalerio1992/ARIA-by-ProIngenius)

**Configuración automática en 2 minutos** - Incluye Node.js, Python, y todas las dependencias. [Ver guía completa →](docs/CODESPACES.md)

---

## ✨ Características Principales

- 🤖 **Asistente IA (ARIA)**: Chat inteligente con contexto de clientes y métricas
- 📊 **Dashboard Analítico**: Visualización de métricas clave de cartera
- 👥 **Vista 360° de Clientes**: Perfil completo con análisis de comportamiento
- 🔍 **Búsqueda Semántica**: RAG (Retrieval Augmented Generation) sobre base de clientes
- 📈 **Métricas en Tiempo Real**: Captaciones, colocaciones y saldos netos
- 🎯 **Recomendaciones Personalizadas**: Sugerencias de productos basadas en IA
- 🌓 **Modo Oscuro/Claro**: Interfaz moderna y adaptable

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React + Vite)                  │
│              http://localhost:5000                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│              Backend (Express + TypeScript)                  │
│                   Rutas API REST                             │
└──────────┬──────────────────────────────┬───────────────────┘
           │                              │
           │                              │
┌──────────▼────────────┐    ┌────────────▼──────────────────┐
│  PostgreSQL Database  │    │   API RAG (FastAPI + Python)  │
│   (o DB Local JSON)   │    │   http://localhost:8000       │
└───────────────────────┘    │   - ChromaDB (vectores)       │
                             │   - OpenAI (embeddings + GPT)  │
                             └───────────────────────────────┘
```

## 📦 Tecnologías

### Frontend
- **React 18** + **TypeScript**
- **Vite** - Build tool ultra rápido
- **Wouter** - Routing ligero
- **Radix UI** - Componentes accesibles
- **Tailwind CSS** - Estilos utility-first
- **Recharts** - Gráficos interactivos
- **TanStack Query** - Estado del servidor

### Backend
- **Express** - Framework web Node.js
- **TypeScript** - Type safety
- **Drizzle ORM** - Type-safe database toolkit
- **PostgreSQL** - Base de datos principal (opcional: modo local con JSON)

### API RAG (Python)
- **FastAPI** - Framework web moderno
- **ChromaDB** - Base de datos vectorial
- **OpenAI API** - Embeddings + GPT-4
- **Pydantic** - Validación de datos

## 🚀 Inicio Rápido

### Opción 1: GitHub Codespaces (Recomendado) ☁️

La forma más rápida de probar ARIA:

1. Click en [![Abrir en Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?repo=rvalerio1992/ARIA-by-ProIngenius)
2. Espera 2-3 minutos mientras se configura automáticamente
3. Configura tu `AI_INTEGRATIONS_OPENAI_API_KEY` en el archivo `.env`
4. Ejecuta los servidores (ver [guía completa](docs/CODESPACES.md))

**✅ No requiere instalación local** | **✅ Funciona en cualquier navegador**

### Opción 2: Instalación Local

#### Requisitos Previos

- **Node.js** v18+ ([Descargar](https://nodejs.org/))
- **Python** v3.11+ ([Descargar](https://www.python.org/downloads/))
- **PostgreSQL** v14+ (opcional - puede usar modo local)
- **OpenAI API Key** ([Obtener aquí](https://platform.openai.com/api-keys))

### Instalación

```bash
# 1. Clonar el repositorio
git clone <repo-url>
cd ARIA-by-ProIngenius

# 2. Instalar dependencias Node.js
npm install

# 3. Instalar dependencias Python
cd server/api_rag
pip install fastapi uvicorn chromadb openai pydantic python-dotenv
cd ../..

# 4. Configurar variables de entorno
cp env.example .env
# Editar .env con tus credenciales
```

### Configuración del Archivo `.env`

```env
# Base de datos (usa PostgreSQL o déjalo vacío para modo local)
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/aria_banking

# OpenAI API Key (requerido para funciones de IA)
AI_INTEGRATIONS_OPENAI_API_KEY=sk-tu-api-key-aqui

# URLs de servicios (opcional, valores por defecto)
RAG_API_URL=http://localhost:8000
PORT=5000
HOST=127.0.0.1
```

### Ejecutar el Proyecto

#### Opción 1: Script Todo-en-Uno (Recomendado)

```powershell
# Windows PowerShell
.\scripts\start-all.ps1
```

Este script inicia:
- ✅ Backend Express + Frontend React → `http://localhost:5000`
- ✅ API RAG Python → `http://localhost:8000`
- ✅ Docs API interactiva → `http://localhost:8000/docs`

#### Opción 2: Servidores Separados

**Terminal 1: Backend + Frontend**
```bash
npm run dev
```

**Terminal 2: API RAG Python**
```bash
cd server/api_rag
python run_api.py
```

### 🎉 ¡Listo!

Abre tu navegador en **http://localhost:5000** y comienza a usar ARIA.

## 📚 Documentación

### Inicio
- **[🚀 GitHub Codespaces](docs/CODESPACES.md)** - Ejecuta ARIA en la nube (recomendado)
- **[📦 Setup Local Completo](docs/README-SETUP.md)** - Instalación en tu computadora
- **[🔧 Scripts](scripts/README.md)** - Documentación de scripts de utilidad

### Configuración y Solución de Problemas
- **[🐍 Guía de Instalación Python](docs/setup/INSTALAR-PYTHON-GUIA.md)** - Ayuda con Python en Windows
- **[🐛 Solución de Problemas](docs/setup/SOLUCION-PROBLEMAS-PYTHON.md)** - Errores comunes

### Avanzado
- **[📊 Registro de Optimizaciones](docs/OPTIMIZACIONES.md)** - Historial de mejoras al proyecto

## 🗂️ Estructura del Proyecto

```
ARIA-by-ProIngenius/
├── client/                 # Frontend React + TypeScript
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/          # Páginas de la aplicación
│   │   ├── lib/            # Utilidades y configuración
│   │   └── App.tsx         # Componente raíz
│   └── index.html
│
├── server/                 # Backend Express + TypeScript
│   ├── api_rag/            # API RAG Python (FastAPI)
│   │   ├── data/           # Datos de clientes y métricas
│   │   ├── rag_service.py  # Servicio de búsqueda semántica
│   │   ├── metrics_service.py
│   │   └── main.py         # Aplicación FastAPI
│   │
│   ├── routes.ts           # Rutas API Express
│   ├── data-loader.ts      # Carga de datos de clientes
│   ├── db.ts               # Conexión a base de datos
│   └── index.ts            # Servidor Express
│
├── shared/                 # Tipos y schemas compartidos
│   └── schema.ts           # Schemas Drizzle ORM
│
├── scripts/                # Scripts de utilidad
│   ├── start-all.ps1       # Inicia todos los servicios
│   └── setup-local.ps1     # Setup inicial
│
├── docs/                   # Documentación del proyecto
│   ├── setup/              # Guías de instalación
│   └── images/             # Imágenes y recursos
│
├── .env                    # Variables de entorno (crear desde env.example)
├── package.json            # Dependencias Node.js
├── pyproject.toml          # Dependencias Python
└── README.md               # Este archivo
```

## 🔑 API Endpoints

### Clientes

- `GET /api/clients` - Lista clientes con paginación y filtros
- `GET /api/clients/:id` - Detalle de cliente
- `GET /api/clients/:id/insights` - Análisis IA del cliente
- `GET /api/clients/stats` - Estadísticas agregadas

### Métricas

- `GET /api/metrics` - Resumen de métricas de cartera
- `GET /api/metrics/saldo?tipo=neto|captaciones|colocaciones`

### RAG y ARIA

- `GET /api/rag/ask?q=<query>` - Búsqueda semántica de clientes
- `POST /api/aria/ask` - Chat con asistente ARIA
  ```json
  { "message": "¿Cuál es el saldo total de captaciones?" }
  ```

Ver documentación interactiva completa en: **http://localhost:8000/docs**

## 🛠️ Comandos Disponibles

```bash
# Desarrollo
npm run dev              # Inicia backend + frontend en modo desarrollo
npm run check            # Verifica tipos TypeScript

# Build
npm run build            # Construye para producción

# Base de datos
npm run db:push          # Sincroniza schema con PostgreSQL
npm run db:studio        # Abre Drizzle Studio (GUI)

# Scripts PowerShell (Windows)
.\scripts\start-all.ps1          # Inicia todo
.\scripts\start-backend.ps1      # Solo backend
.\scripts\start-rag-api.ps1      # Solo API RAG
.\scripts\setup-local.ps1        # Setup completo
.\scripts\check-requirements.ps1 # Verificar requisitos
```

## 🐛 Solución de Problemas

### Error: "DATABASE_URL must be set"
- Crea el archivo `.env` desde `env.example`
- Configura `DATABASE_URL` o déjalo vacío para usar modo local

### Error: "Cannot connect to RAG API"
- Verifica que la API RAG esté corriendo: `http://localhost:8000`
- Revisa los logs de Python en la segunda terminal

### Error: "OpenAI API Key not found"
- Configura `AI_INTEGRATIONS_OPENAI_API_KEY` en `.env`
- Algunas funciones (métricas básicas) funcionan sin API key

### Puerto 5000 ya en uso
- Cambia `PORT=5001` en `.env`
- O detén la aplicación que está usando el puerto 5000

Ver más en: [Solución de Problemas](docs/setup/SOLUCION-PROBLEMAS-PYTHON.md)

## 🤝 Contribuir

Este es un proyecto privado de **ProIngenius**. Para contribuir:

1. Crea una rama feature: `git checkout -b feature/nueva-funcionalidad`
2. Haz commit de tus cambios: `git commit -m 'Agrega nueva funcionalidad'`
3. Push a la rama: `git push origin feature/nueva-funcionalidad`
4. Abre un Pull Request

## 📄 Licencia

© 2025 ProIngenius. Todos los derechos reservados.

## 🙏 Agradecimientos

Construido con:
- [OpenAI](https://openai.com/) - Modelos de lenguaje
- [Replit](https://replit.com/) - Desarrollo inicial
- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI base

---

**Hecho con ❤️ por ProIngenius**

¿Preguntas? Contacta al equipo de desarrollo.

