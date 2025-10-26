# 🚀 Instrucciones de Inicio Rápido - ARIA Banking CRM

## ✅ Pasos para Ejecutar la Aplicación

### 1️⃣ Verificar Requisitos
Ejecuta este comando para verificar que tienes todo lo necesario:

```powershell
.\check-requirements.ps1
```

### 2️⃣ Instalar Dependencias
Ejecuta el script de setup:

```powershell
.\setup-local.ps1
```

### 3️⃣ Configurar Variables de Entorno
Crea un archivo llamado `.env` en la raíz del proyecto con el siguiente contenido:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/aria_banking
AI_INTEGRATIONS_OPENAI_API_KEY=sk-tu-api-key-aqui
PORT=5000
RAG_API_URL=http://localhost:8000
NODE_ENV=development
```

**Importante:**
- Si usas PostgreSQL local, asegúrate de que el servicio esté ejecutándose
- Si prefieres usar Neon (cloud), regístrate en https://neon.tech/ y usa su connection string
- Obtén tu OpenAI API key en https://platform.openai.com/api-keys

### 4️⃣ Configurar la Base de Datos
Ejecuta este comando para crear las tablas:

```powershell
npm run db:push
```

### 5️⃣ Iniciar la Aplicación
Ejecuta este script para iniciar ambos servidores:

```powershell
.\start-all.ps1
```

Esto abrirá:
- **Terminal 1**: Backend TypeScript + Frontend React (puerto 5000)
- **Terminal 2**: API RAG Python (puerto 8000)

### 6️⃣ Abrir en el Navegador
Abre tu navegador y visita:
- **Aplicación**: http://localhost:5000
- **API Docs**: http://localhost:8000/docs

---

## 🎯 Alternativas de Inicio

### Opción A: Script Automático (Recomendado)
```powershell
.\start-all.ps1
```

### Opción B: Manual (2 Terminales)

**Terminal 1** - Backend TypeScript:
```powershell
.\start-backend.ps1
```

**Terminal 2** - API RAG Python:
```powershell
.\start-rag-api.ps1
```

### Opción C: Comandos Directos

**Terminal 1**:
```powershell
npm run dev
```

**Terminal 2**:
```powershell
cd server\api_rag
python run_api.py
```

---

## 📦 Requisitos Necesarios

| Componente | Versión Mínima | Verificar |
|------------|----------------|-----------|
| Node.js | v18.0+ | `node --version` |
| npm | v8.0+ | `npm --version` |
| Python | v3.11+ | `python --version` |
| PostgreSQL | v14.0+ | `psql --version` |
| OpenAI API Key | - | https://platform.openai.com/ |

---

## 🐛 Problemas Comunes

### No se pueden ejecutar scripts de PowerShell
```powershell
# Ejecuta como Administrador:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Python no se reconoce
- Reinstala Python y marca "Add Python to PATH"
- Reinicia PowerShell

### PostgreSQL no conecta
- Verifica que el servicio esté ejecutándose (Servicios de Windows)
- Verifica las credenciales en el archivo `.env`
- O usa Neon (cloud) en lugar de PostgreSQL local

### Puerto 5000 en uso
Cambia el puerto en `.env`:
```env
PORT=5001
```

---

## 📚 Documentación Completa

Para más detalles, revisa:
- **SETUP-WINDOWS.md** - Guía completa para Windows
- **README-LOCAL.md** - Documentación técnica del proyecto
- **env.example** - Plantilla de variables de entorno

---

## 🎉 ¡Listo!

Una vez que ambos servidores estén ejecutándose, podrás:
- ✅ Ver el dashboard bancario
- ✅ Explorar clientes y análisis 1:1
- ✅ Usar ARIA (asistente IA)
- ✅ Analizar campañas y segmentos
- ✅ Revisar notificaciones inteligentes

**¿Necesitas ayuda?** Consulta la documentación completa o revisa los logs de los servidores.

