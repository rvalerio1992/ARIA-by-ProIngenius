# 🚀 ARIA Banking CRM - Setup Local

Guía completa para ejecutar el proyecto ARIA localmente en tu computadora.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

### 1. Node.js (v18 o superior)
```bash
# Verificar instalación
node --version
npm --version
```
Descargar desde: https://nodejs.org/

### 2. Python (v3.11 o superior)
```bash
# Verificar instalación
python --version
```
Descargar desde: https://www.python.org/downloads/

### 3. PostgreSQL (v14 o superior)
Opciones:
- **Local**: [Descargar PostgreSQL](https://www.postgresql.org/download/)
- **Cloud**: [Neon Database](https://neon.tech/) (recomendado, gratis)
- **Docker**: `docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres`

### 4. OpenAI API Key
- Crear cuenta en: https://platform.openai.com/
- Obtener API key en: https://platform.openai.com/api-keys
- ⚠️ Necesario para funciones de IA (ARIA, análisis, etc.)

## 🔧 Instalación

### Paso 1: Clonar/Abrir el Proyecto
```bash
# Ya lo tienes en: C:\Users\Administrator\Desktop\ARIA-by-ProIngenius
cd C:\Users\Administrator\Desktop\ARIA-by-ProIngenius
```

### Paso 2: Instalar Dependencias de Node.js
```bash
# Instalar todas las dependencias
npm install
```

### Paso 3: Instalar Dependencias de Python
```bash
# Navegar a la carpeta de la API RAG
cd server/api_rag

# Instalar dependencias (usando pip)
pip install fastapi uvicorn chromadb openai pydantic python-dotenv

# O si prefieres usar el archivo pyproject.toml desde la raíz:
cd ../..
pip install -e .
```

### Paso 4: Configurar Variables de Entorno
```bash
# El archivo .env ya fue creado, ahora edítalo
# Abre .env en tu editor favorito y configura:
```

**Editar `.env`**:
```env
# 1. URL de tu base de datos PostgreSQL
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/aria_banking

# 2. Tu API key de OpenAI
AI_INTEGRATIONS_OPENAI_API_KEY=sk-tu-api-key-aqui
```

**Opciones para DATABASE_URL**:

- **PostgreSQL Local**:
  ```
  DATABASE_URL=postgresql://postgres:postgres@localhost:5432/aria_banking
  ```

- **Neon (Cloud, recomendado)**:
  1. Crear cuenta en https://neon.tech/
  2. Crear un proyecto
  3. Copiar la connection string
  ```
  DATABASE_URL=postgresql://user:pass@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
  ```

### Paso 5: Configurar la Base de Datos
```bash
# Crear las tablas en la base de datos
npm run db:push

# Si tienes datos seed (opcional):
# npm run seed
```

## ▶️ Ejecutar el Proyecto

El proyecto tiene 2 partes que deben ejecutarse simultáneamente:

### Terminal 1: Backend TypeScript (Express + Frontend)
```bash
# Desde la raíz del proyecto
npm run dev
```
Esto inicia:
- Backend Express en `http://localhost:5000`
- Frontend React con Vite (en desarrollo)

### Terminal 2: API RAG Python (FastAPI)
```bash
# Navegar a la carpeta de la API
cd server/api_rag

# Ejecutar el servidor
python run_api.py

# O directamente con uvicorn:
# uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
Esto inicia:
- API RAG en `http://localhost:8000`
- Documentación interactiva en `http://localhost:8000/docs`

### 🎉 ¡Listo!
Abre tu navegador en: **http://localhost:5000**

## 🛠️ Scripts Disponibles

```bash
# Desarrollo (con hot reload)
npm run dev

# Build para producción
npm run build

# Ejecutar producción
npm run start

# Verificar tipos TypeScript
npm run check

# Migrar base de datos
npm run db:push
```

## 📁 Estructura del Proyecto

```
ARIA-by-ProIngenius/
├── client/              # Frontend React + TypeScript
│   ├── src/
│   │   ├── components/  # Componentes UI
│   │   ├── pages/       # Páginas de la app
│   │   └── App.tsx
│   └── index.html
├── server/              # Backend Express + TypeScript
│   ├── api_rag/         # API Python FastAPI
│   │   ├── main.py
│   │   ├── rag_service.py
│   │   ├── metrics_service.py
│   │   └── run_api.py
│   ├── routes.ts
│   ├── db.ts
│   └── index.ts
├── shared/              # Schemas compartidos
│   └── schema.ts
├── .env                 # Variables de entorno (CONFIGURAR)
├── package.json         # Dependencias Node.js
└── pyproject.toml       # Dependencias Python
```

## 🐛 Solución de Problemas

### Error: "DATABASE_URL must be set"
- Verifica que el archivo `.env` existe en la raíz del proyecto
- Confirma que `DATABASE_URL` está configurado correctamente
- Reinicia el servidor después de modificar `.env`

### Error: "Cannot connect to PostgreSQL"
- Verifica que PostgreSQL está ejecutándose
- Confirma que las credenciales en `DATABASE_URL` son correctas
- Para PostgreSQL local: `pg_ctl status` o verifica el servicio

### Error: "OpenAI API Key not found"
- La API de métricas funcionará sin API key
- Las funciones de IA (ARIA, análisis 1:1, campaña) requieren la key
- Configurar `AI_INTEGRATIONS_OPENAI_API_KEY` en `.env`

### Error: "Cannot connect to RAG API"
- Verifica que la API Python está ejecutándose en puerto 8000
- Confirma que `RAG_API_URL=http://localhost:8000` en `.env`
- Revisa logs de la Terminal 2 (Python)

### Puerto 5000 ya en uso
- Cambiar `PORT=5001` en `.env`
- O cerrar la aplicación que usa el puerto 5000

### Error al instalar dependencias Python
```bash
# Usar pip directamente
pip install fastapi uvicorn chromadb openai pydantic python-dotenv

# O actualizar pip primero
python -m pip install --upgrade pip
```

## 🔐 Seguridad

- ⚠️ **NUNCA** subas el archivo `.env` a Git
- El archivo `.env.example` es seguro para compartir (sin credenciales)
- Mantén tu API key de OpenAI privada

## 📚 Recursos

- [Documentación React](https://react.dev/)
- [Documentación Express](https://expressjs.com/)
- [Documentación FastAPI](https://fastapi.tiangolo.com/)
- [Documentación Drizzle ORM](https://orm.drizzle.team/)
- [Documentación OpenAI](https://platform.openai.com/docs)

## 💡 Próximos Pasos

1. Configura tu base de datos PostgreSQL
2. Obtén tu API key de OpenAI
3. Ejecuta ambos servidores (Node.js + Python)
4. Explora la aplicación en http://localhost:5000
5. Revisa la documentación de la API en http://localhost:8000/docs

---

**¿Problemas?** Revisa la sección de Solución de Problemas o contacta al equipo de desarrollo.


