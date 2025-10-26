# Script de configuración local para ARIA Banking CRM
# PowerShell Script para Windows

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ARIA Banking CRM - Setup Local" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar Node.js
Write-Host "Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js instalado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js NO encontrado" -ForegroundColor Red
    Write-Host "  Descarga desde: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Verificar npm
try {
    $npmVersion = npm --version
    Write-Host "✓ npm instalado: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ npm NO encontrado" -ForegroundColor Red
    exit 1
}

# Verificar Python
Write-Host "Verificando Python..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version
    Write-Host "✓ Python instalado: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Python NO encontrado" -ForegroundColor Red
    Write-Host "  Descarga desde: https://www.python.org/downloads/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Instalando Dependencias" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Instalar dependencias Node.js
Write-Host "Instalando dependencias de Node.js..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Error instalando dependencias de Node.js" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Dependencias de Node.js instaladas" -ForegroundColor Green

# Instalar dependencias Python
Write-Host ""
Write-Host "Instalando dependencias de Python..." -ForegroundColor Yellow
pip install fastapi uvicorn chromadb openai pydantic python-dotenv
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Error instalando dependencias de Python" -ForegroundColor Red
    Write-Host "  Intenta ejecutar manualmente: pip install fastapi uvicorn chromadb openai pydantic python-dotenv" -ForegroundColor Yellow
}
Write-Host "✓ Dependencias de Python instaladas" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Configuración" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar archivo .env
if (-Not (Test-Path ".env")) {
    Write-Host "⚠ Archivo .env no encontrado" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "IMPORTANTE: Debes crear un archivo .env con la siguiente configuración:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/aria_banking" -ForegroundColor White
    Write-Host "AI_INTEGRATIONS_OPENAI_API_KEY=tu-api-key-aqui" -ForegroundColor White
    Write-Host "PORT=5000" -ForegroundColor White
    Write-Host "RAG_API_URL=http://localhost:8000" -ForegroundColor White
    Write-Host "NODE_ENV=development" -ForegroundColor White
    Write-Host ""
    Write-Host "Puedes usar .env.example como plantilla" -ForegroundColor Yellow
} else {
    Write-Host "✓ Archivo .env encontrado" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ¡Setup Completado!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Próximos pasos:" -ForegroundColor Green
Write-Host ""
Write-Host "1. Configura tu archivo .env con:" -ForegroundColor White
Write-Host "   - DATABASE_URL (PostgreSQL)" -ForegroundColor White
Write-Host "   - AI_INTEGRATIONS_OPENAI_API_KEY (OpenAI)" -ForegroundColor White
Write-Host ""
Write-Host "2. Ejecuta la base de datos:" -ForegroundColor White
Write-Host "   npm run db:push" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Inicia los servidores (2 terminales):" -ForegroundColor White
Write-Host "   Terminal 1: .\start-backend.ps1" -ForegroundColor Cyan
Write-Host "   Terminal 2: .\start-rag-api.ps1" -ForegroundColor Cyan
Write-Host ""
Write-Host "   O usa el script combinado:" -ForegroundColor White
Write-Host "   .\start-all.ps1" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. Abre tu navegador en: http://localhost:5000" -ForegroundColor White
Write-Host ""

