@echo off
echo ========================================
echo   ARIA Banking CRM - Setup Local
echo ========================================
echo.

:: Verificar Node.js
echo Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js NO encontrado
    echo Descarga desde: https://nodejs.org/
    pause
    exit /b 1
)
echo [OK] Node.js instalado

:: Verificar Python
echo Verificando Python...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python NO encontrado
    echo Descarga desde: https://www.python.org/downloads/
    pause
    exit /b 1
)
echo [OK] Python instalado

echo.
echo ========================================
echo   Instalando Dependencias
echo ========================================
echo.

:: Instalar dependencias Node.js
echo Instalando dependencias de Node.js...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Error instalando dependencias de Node.js
    pause
    exit /b 1
)
echo [OK] Dependencias de Node.js instaladas

:: Instalar dependencias Python
echo.
echo Instalando dependencias de Python...
pip install fastapi uvicorn chromadb openai pydantic python-dotenv
if %errorlevel% neq 0 (
    echo [AVISO] Hubo un problema instalando dependencias de Python
    echo Intenta ejecutar manualmente:
    echo   pip install fastapi uvicorn chromadb openai pydantic python-dotenv
)
echo [OK] Dependencias de Python instaladas

echo.
echo ========================================
echo   Configuracion
echo ========================================
echo.

:: Verificar archivo .env
if not exist ".env" (
    echo [AVISO] Archivo .env no encontrado
    echo.
    echo IMPORTANTE: Debes crear un archivo .env con:
    echo.
    echo DATABASE_URL=postgresql://postgres:postgres@localhost:5432/aria_banking
    echo AI_INTEGRATIONS_OPENAI_API_KEY=sk-tu-api-key-aqui
    echo PORT=5000
    echo RAG_API_URL=http://localhost:8000
    echo NODE_ENV=development
    echo.
    echo Puedes usar env.example como plantilla
) else (
    echo [OK] Archivo .env encontrado
)

echo.
echo ========================================
echo   Setup Completado!
echo ========================================
echo.
echo Proximos pasos:
echo.
echo 1. Configura tu archivo .env con:
echo    - DATABASE_URL (PostgreSQL)
echo    - AI_INTEGRATIONS_OPENAI_API_KEY (OpenAI)
echo.
echo 2. Ejecuta la base de datos:
echo    npm run db:push
echo.
echo 3. Inicia los servidores (2 terminales):
echo    Terminal 1: start-backend.bat
echo    Terminal 2: start-rag-api.bat
echo.
echo 4. Abre tu navegador en: http://localhost:5000
echo.
pause

