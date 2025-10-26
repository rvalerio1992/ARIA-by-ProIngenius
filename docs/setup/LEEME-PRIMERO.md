# 📋 LEE ESTO PRIMERO - Configuración Completada

## ✅ Lo que ya está listo

He configurado todo el proyecto para que funcione localmente en tu computadora Windows:

### 📦 Archivos Creados

1. **Scripts de Instalación**:
   - `setup-local.ps1` / `setup-local.bat` - Instala todas las dependencias
   - `install-python-deps.bat` - Instala solo dependencias Python
   - `check-requirements.ps1` / `check-requirements.bat` - Verifica requisitos

2. **Scripts de Inicio**:
   - `start-all.ps1` - Inicia todo (2 servidores)
   - `start-backend.ps1` / `start-backend.bat` - Solo backend TypeScript
   - `start-rag-api.ps1` / `start-rag-api.bat` - Solo API Python

3. **Documentación**:
   - `INSTRUCCIONES-INICIO.md` - Guía rápida de inicio
   - `SETUP-WINDOWS.md` - Guía completa para Windows
   - `README-LOCAL.md` - Documentación técnica completa
   - `SOLUCION-PROBLEMAS-PYTHON.md` - Ayuda con problemas de Python
   - `env.example` - Plantilla de variables de entorno

4. **Configuración**:
   - Archivos del proyecto ajustados para funcionar sin Replit
   - `.gitignore` actualizado
   - Dependencias instaladas correctamente

### ✅ Verificado en tu sistema

- ✅ Node.js v24.5.0 instalado
- ✅ Python 3.11.9 instalado
- ✅ npm 11.5.1 instalado
- ✅ Dependencias de Node.js instaladas (598 paquetes)
- ⚠️ Python tiene problema de configuración (ver abajo)

---

## 🚨 PROBLEMA DETECTADO: Python

Tu instalación de Python tiene un problema de configuración que impide instalar paquetes con `pip`. 

**No te preocupes**, es un problema común en Windows y hay varias soluciones.

### Opciones para resolver:

**OPCIÓN 1: Reinstalar Python (Más simple)**
1. Desinstala Python desde "Agregar o quitar programas"
2. Descarga de nuevo: https://www.python.org/downloads/
3. **MUY IMPORTANTE**: Marca "Add Python to PATH" al instalar
4. Reinicia PowerShell

**OPCIÓN 2: Usar entorno virtual (Recomendado para desarrollo)**
```cmd
# Crear entorno virtual
python -m venv venv

# Activar
venv\Scripts\activate

# Instalar dependencias
pip install -r server\api_rag\requirements.txt
```

**OPCIÓN 3: Seguir la guía completa**
Lee: `SOLUCION-PROBLEMAS-PYTHON.md` para soluciones detalladas.

---

## 🎯 PRÓXIMOS PASOS (en orden)

### Paso 1: Resolver el problema de Python
Elige una de las opciones de arriba y resuélvelo primero.

### Paso 2: Instalar dependencias Python
Una vez resuelto Python, ejecuta:
```cmd
.\install-python-deps.bat
```
O manualmente:
```cmd
pip install -r server\api_rag\requirements.txt
```

### Paso 3: Configurar variables de entorno
Necesitas crear un archivo llamado `.env` en la raíz del proyecto:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/aria_banking
AI_INTEGRATIONS_OPENAI_API_KEY=sk-tu-api-key-aqui
PORT=5000
RAG_API_URL=http://localhost:8000
NODE_ENV=development
```

**¿Dónde conseguir las credenciales?**

1. **DATABASE_URL** (PostgreSQL):
   - **Opción A - Local**: Instala PostgreSQL desde https://www.postgresql.org/download/
   - **Opción B - Cloud (Más fácil)**: Usa Neon gratis → https://neon.tech/
   
2. **AI_INTEGRATIONS_OPENAI_API_KEY**:
   - Regístrate en: https://platform.openai.com/
   - Ve a: https://platform.openai.com/api-keys
   - Crea una nueva API key (empieza con `sk-`)

### Paso 4: Configurar la base de datos
Una vez que tengas el `.env` configurado:
```cmd
npm run db:push
```

### Paso 5: ¡Iniciar la aplicación!
```cmd
.\start-all.ps1
```

O manualmente en 2 terminales:
```cmd
# Terminal 1
.\start-backend.bat

# Terminal 2
.\start-rag-api.bat
```

### Paso 6: Abrir en el navegador
- **Aplicación principal**: http://localhost:5000
- **API RAG**: http://localhost:8000
- **Docs API**: http://localhost:8000/docs

---

## 📚 Documentación Disponible

Según lo que necesites:

- **Inicio rápido**: `INSTRUCCIONES-INICIO.md`
- **Guía completa Windows**: `SETUP-WINDOWS.md`
- **Documentación técnica**: `README-LOCAL.md`
- **Problemas con Python**: `SOLUCION-PROBLEMAS-PYTHON.md`

---

## 🆘 ¿Necesitas Ayuda?

### Scripts útiles:
```cmd
# Verificar que todo esté instalado
.\check-requirements.bat

# Instalar todo de nuevo
.\setup-local.bat

# Solo Python
.\install-python-deps.bat
```

### Problemas comunes:

**"No se puede ejecutar scripts PowerShell"**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**"Puerto 5000 ya en uso"**
Cambia `PORT=5001` en el archivo `.env`

**"Cannot connect to PostgreSQL"**
- Usa Neon (cloud): https://neon.tech/
- O instala PostgreSQL local: https://www.postgresql.org/download/

**"OpenAI API error"**
- La app funcionará sin API key, pero sin funciones de IA
- Obtén una key en: https://platform.openai.com/api-keys

---

## 📝 Resumen del Proyecto

**ARIA Banking CRM** es una plataforma bancaria CRM premium con:

- 💼 Gestión de cartera de clientes
- 🤖 Asistente IA (ARIA) con GPT-4
- 📊 Analytics y métricas en tiempo real
- 🎯 Análisis 1:1 y campañas
- 📱 Interfaz moderna con React + TypeScript
- 🚀 Backend con Express + PostgreSQL
- 🧠 RAG con ChromaDB + OpenAI

---

## ✨ ¡Estás casi listo!

Solo te falta:
1. ✅ Resolver el problema de Python (5 minutos)
2. ✅ Crear el archivo `.env` (2 minutos)
3. ✅ Ejecutar `npm run db:push` (30 segundos)
4. ✅ Iniciar con `.\start-all.ps1` (30 segundos)

**Total**: ~10 minutos para estar corriendo 🚀

---

¿Dudas? Revisa las guías en este directorio o los comentarios en los scripts.

