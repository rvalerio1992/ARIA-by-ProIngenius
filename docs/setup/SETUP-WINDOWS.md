# 🪟 Guía de Configuración para Windows

Esta guía te ayudará a configurar y ejecutar ARIA Banking CRM en Windows localmente.

## 🚀 Inicio Rápido (3 pasos)

### 1. Verificar Requisitos
```powershell
.\check-requirements.ps1
```

### 2. Ejecutar Setup
```powershell
.\setup-local.ps1
```

### 3. Configurar .env
Crea un archivo `.env` en la raíz del proyecto con:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/aria_banking
AI_INTEGRATIONS_OPENAI_API_KEY=sk-tu-api-key-aqui
PORT=5000
RAG_API_URL=http://localhost:8000
NODE_ENV=development
```

### 4. Iniciar la Aplicación
```powershell
.\start-all.ps1
```

¡Listo! Abre http://localhost:5000 en tu navegador.

---

## 📋 Requisitos Detallados

### 1. Node.js (v18+)
**Verificar instalación:**
```powershell
node --version
npm --version
```

**Si no está instalado:**
1. Descargar desde: https://nodejs.org/
2. Ejecutar el instalador
3. Reiniciar PowerShell
4. Verificar nuevamente

### 2. Python (v3.11+)
**Verificar instalación:**
```powershell
python --version
pip --version
```

**Si no está instalado:**
1. Descargar desde: https://www.python.org/downloads/
2. **IMPORTANTE**: Marcar "Add Python to PATH" durante la instalación
3. Reiniciar PowerShell
4. Verificar nuevamente

### 3. PostgreSQL

**Opción A: PostgreSQL Local**
1. Descargar desde: https://www.postgresql.org/download/windows/
2. Durante la instalación, recordar:
   - Usuario: `postgres`
   - Contraseña que elijas
   - Puerto: `5432` (por defecto)
3. Crear base de datos:
```powershell
# Abrir psql
psql -U postgres

# Crear base de datos
CREATE DATABASE aria_banking;

# Salir
\q
```

**Opción B: Neon (Cloud, Recomendado)**
1. Crear cuenta en: https://neon.tech/
2. Crear un nuevo proyecto
3. Copiar la connection string
4. Usar en `.env` como `DATABASE_URL`

**Opción C: Docker**
```powershell
docker run --name postgres-aria -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=aria_banking -p 5432:5432 -d postgres
```

### 4. OpenAI API Key
1. Crear cuenta en: https://platform.openai.com/
2. Ir a: https://platform.openai.com/api-keys
3. Crear una nueva API key
4. Copiar la key (empieza con `sk-`)
5. Guardar en `.env` como `AI_INTEGRATIONS_OPENAI_API_KEY`

---

## 🔧 Scripts Disponibles

### `check-requirements.ps1`
Verifica que todos los requisitos estén instalados correctamente.
```powershell
.\check-requirements.ps1
```

### `setup-local.ps1`
Instala todas las dependencias (Node.js y Python).
```powershell
.\setup-local.ps1
```

### `start-all.ps1`
Inicia ambos servidores (Backend + API RAG) en ventanas separadas.
```powershell
.\start-all.ps1
```

### `start-backend.ps1`
Inicia solo el backend TypeScript (Express + Frontend).
```powershell
.\start-backend.ps1
```

### `start-rag-api.ps1`
Inicia solo la API RAG Python (FastAPI).
```powershell
.\start-rag-api.ps1
```

---

## 📝 Configuración del archivo .env

Crea un archivo llamado `.env` en la raíz del proyecto con el siguiente contenido:

```env
# ===== BASE DE DATOS =====
# URL de conexión a PostgreSQL
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/aria_banking

# ===== OPENAI API =====
# API Key de OpenAI (obtener en https://platform.openai.com/api-keys)
AI_INTEGRATIONS_OPENAI_API_KEY=sk-tu-api-key-real-aqui

# ===== SERVIDOR =====
PORT=5000
RAG_API_URL=http://localhost:8000
NODE_ENV=development
```

**Notas importantes:**
- Reemplaza `sk-tu-api-key-real-aqui` con tu API key real de OpenAI
- Si usas Neon, reemplaza el `DATABASE_URL` con tu connection string de Neon
- Si cambiaste la contraseña de PostgreSQL, actualiza el `DATABASE_URL`

---

## 🎯 Proceso Completo de Instalación

### Paso 1: Verificar requisitos
```powershell
# Ejecutar script de verificación
.\check-requirements.ps1
```

### Paso 2: Instalar dependencias
```powershell
# Ejecutar script de setup
.\setup-local.ps1
```

O manualmente:
```powershell
# Instalar dependencias Node.js
npm install

# Instalar dependencias Python
pip install fastapi uvicorn chromadb openai pydantic python-dotenv
```

### Paso 3: Configurar base de datos
```powershell
# Crear/actualizar tablas en la base de datos
npm run db:push
```

### Paso 4: Crear archivo .env
Crea el archivo `.env` con las variables de entorno necesarias (ver sección anterior).

### Paso 5: Iniciar la aplicación

**Opción A: Usar el script combinado (Recomendado)**
```powershell
.\start-all.ps1
```
Esto abrirá 2 ventanas de PowerShell:
- Una para el Backend (Express + React)
- Una para la API RAG (FastAPI)

**Opción B: Iniciar manualmente en 2 terminales**

Terminal 1 (Backend):
```powershell
.\start-backend.ps1
# O manualmente:
# npm run dev
```

Terminal 2 (API RAG):
```powershell
.\start-rag-api.ps1
# O manualmente:
# cd server\api_rag
# python run_api.py
```

### Paso 6: Acceder a la aplicación
- **Aplicación principal**: http://localhost:5000
- **API RAG**: http://localhost:8000
- **Documentación API**: http://localhost:8000/docs

---

## 🐛 Solución de Problemas

### Error: "No se puede ejecutar scripts en este sistema"
**Problema**: PowerShell tiene restricciones de ejecución de scripts.

**Solución**:
```powershell
# Abrir PowerShell como Administrador y ejecutar:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# O ejecutar scripts con bypass:
powershell -ExecutionPolicy Bypass -File .\setup-local.ps1
```

### Error: "python no se reconoce como comando"
**Problema**: Python no está en el PATH.

**Solución**:
1. Reinstalar Python marcando "Add Python to PATH"
2. O agregarlo manualmente:
   - Buscar "Variables de entorno" en Windows
   - Editar "Path" en variables de usuario
   - Agregar la ruta de Python (ej: `C:\Users\TuUsuario\AppData\Local\Programs\Python\Python311`)

### Error: "npm no se reconoce como comando"
**Problema**: Node.js no está en el PATH.

**Solución**:
1. Reinstalar Node.js
2. Reiniciar PowerShell
3. Verificar con `node --version`

### Error: "Cannot connect to PostgreSQL"
**Problema**: PostgreSQL no está ejecutándose o las credenciales son incorrectas.

**Solución**:
1. Verificar que PostgreSQL esté ejecutándose:
   - Buscar "Servicios" en Windows
   - Buscar "postgresql" y verificar que está "En ejecución"
2. Verificar credenciales en `.env`
3. Probar conexión:
```powershell
psql -U postgres -d aria_banking
```

### Error: "Puerto 5000 ya en uso"
**Problema**: Otro proceso está usando el puerto 5000.

**Solución**:
```powershell
# Ver qué proceso usa el puerto 5000
netstat -ano | findstr :5000

# Cambiar el puerto en .env
PORT=5001
```

### Error: "OpenAI API error"
**Problema**: API key no configurada o inválida.

**Solución**:
1. Verificar que `AI_INTEGRATIONS_OPENAI_API_KEY` está en `.env`
2. Verificar que la key empiece con `sk-`
3. Verificar que la key es válida en https://platform.openai.com/api-keys
4. La aplicación funcionará sin API key, pero sin funciones de IA

### Error: "Dependencias Python no se instalan"
**Problema**: pip tiene problemas o falta un compilador.

**Solución**:
```powershell
# Actualizar pip
python -m pip install --upgrade pip

# Instalar dependencias una por una
pip install fastapi
pip install uvicorn
pip install chromadb
pip install openai
pip install pydantic
pip install python-dotenv

# Si chromadb falla, puede requerir Visual C++ Build Tools
# Descargar de: https://visualstudio.microsoft.com/visual-cpp-build-tools/
```

---

## 📊 Estructura del Proyecto

```
ARIA-by-ProIngenius/
├── 📄 .env                      # Variables de entorno (CREAR ESTE)
├── 📄 .env.example              # Plantilla de variables
├── 📄 package.json              # Dependencias Node.js
├── 📄 pyproject.toml            # Dependencias Python
├── 📄 README-LOCAL.md           # Documentación completa
├── 📄 SETUP-WINDOWS.md          # Esta guía
├── 🔧 setup-local.ps1           # Script de instalación
├── 🔧 check-requirements.ps1   # Script de verificación
├── 🔧 start-all.ps1            # Iniciar todo
├── 🔧 start-backend.ps1        # Iniciar backend
├── 🔧 start-rag-api.ps1        # Iniciar API RAG
├── 📁 client/                   # Frontend React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.tsx
│   └── index.html
├── 📁 server/                   # Backend Express
│   ├── 📁 api_rag/             # API Python
│   │   ├── main.py
│   │   ├── run_api.py
│   │   └── data/
│   ├── routes.ts
│   ├── db.ts
│   └── index.ts
└── 📁 shared/                   # Schemas compartidos
    └── schema.ts
```

---

## ✅ Checklist de Configuración

- [ ] Node.js instalado (v18+)
- [ ] Python instalado (v3.11+)
- [ ] PostgreSQL configurado (local o Neon)
- [ ] OpenAI API key obtenida
- [ ] Dependencias instaladas (`npm install`)
- [ ] Dependencias Python instaladas
- [ ] Archivo `.env` creado
- [ ] Base de datos creada y migrada (`npm run db:push`)
- [ ] Ambos servidores iniciados
- [ ] Aplicación accesible en http://localhost:5000

---

## 🎉 ¡Siguiente Paso!

Una vez que todo esté configurado, puedes:

1. Explorar la aplicación en http://localhost:5000
2. Ver la documentación de la API en http://localhost:8000/docs
3. Revisar el código y personalizar según tus necesidades
4. Agregar datos de prueba o conectar con datos reales

---

**¿Necesitas ayuda?** Revisa la sección de Solución de Problemas o el archivo README-LOCAL.md para más detalles.

