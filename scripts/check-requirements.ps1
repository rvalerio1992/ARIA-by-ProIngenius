# Script para verificar requisitos del sistema
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Verificación de Requisitos" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$allOk = $true

# Verificar Node.js
Write-Host "Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    $nodeVersionNum = $nodeVersion -replace 'v', ''
    Write-Host "✓ Node.js instalado: $nodeVersion" -ForegroundColor Green
    if ([version]$nodeVersionNum -lt [version]"18.0.0") {
        Write-Host "  ⚠ Se recomienda Node.js v18 o superior" -ForegroundColor Yellow
    }
} catch {
    Write-Host "✗ Node.js NO encontrado" -ForegroundColor Red
    Write-Host "  Descarga: https://nodejs.org/" -ForegroundColor Yellow
    $allOk = $false
}

# Verificar npm
Write-Host "Verificando npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✓ npm instalado: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ npm NO encontrado" -ForegroundColor Red
    $allOk = $false
}

# Verificar Python
Write-Host "Verificando Python..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version
    Write-Host "✓ Python instalado: $pythonVersion" -ForegroundColor Green
    
    $pythonVersionMatch = $pythonVersion -match '(\d+)\.(\d+)'
    if ($pythonVersionMatch) {
        $majorVersion = [int]$Matches[1]
        $minorVersion = [int]$Matches[2]
        if ($majorVersion -lt 3 -or ($majorVersion -eq 3 -and $minorVersion -lt 11)) {
            Write-Host "  ⚠ Se recomienda Python 3.11 o superior" -ForegroundColor Yellow
        }
    }
} catch {
    Write-Host "✗ Python NO encontrado" -ForegroundColor Red
    Write-Host "  Descarga: https://www.python.org/downloads/" -ForegroundColor Yellow
    $allOk = $false
}

# Verificar pip
Write-Host "Verificando pip..." -ForegroundColor Yellow
try {
    $pipVersion = pip --version
    Write-Host "✓ pip instalado: $pipVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ pip NO encontrado" -ForegroundColor Red
    $allOk = $false
}

# Verificar PostgreSQL (opcional)
Write-Host "Verificando PostgreSQL..." -ForegroundColor Yellow
try {
    $pgVersion = psql --version
    Write-Host "✓ PostgreSQL instalado: $pgVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠ PostgreSQL no encontrado localmente" -ForegroundColor Yellow
    Write-Host "  Opciones:" -ForegroundColor White
    Write-Host "  - Instalar localmente: https://www.postgresql.org/download/" -ForegroundColor White
    Write-Host "  - Usar Neon (cloud): https://neon.tech/" -ForegroundColor White
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan

# Verificar archivo .env
Write-Host "Verificando configuración..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "✓ Archivo .env encontrado" -ForegroundColor Green
    
    $envContent = Get-Content ".env" -Raw
    
    if ($envContent -match "DATABASE_URL=.+") {
        Write-Host "✓ DATABASE_URL configurado" -ForegroundColor Green
    } else {
        Write-Host "✗ DATABASE_URL no configurado en .env" -ForegroundColor Red
        $allOk = $false
    }
    
    if ($envContent -match "AI_INTEGRATIONS_OPENAI_API_KEY=sk-.+") {
        Write-Host "✓ AI_INTEGRATIONS_OPENAI_API_KEY configurado" -ForegroundColor Green
    } else {
        Write-Host "⚠ AI_INTEGRATIONS_OPENAI_API_KEY no configurado en .env" -ForegroundColor Yellow
        Write-Host "  (Requerido para funciones de IA)" -ForegroundColor White
    }
} else {
    Write-Host "✗ Archivo .env no encontrado" -ForegroundColor Red
    Write-Host "  Ejecuta: .\setup-local.ps1" -ForegroundColor Yellow
    $allOk = $false
}

# Verificar node_modules
Write-Host "Verificando dependencias Node.js..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "✓ node_modules encontrado" -ForegroundColor Green
} else {
    Write-Host "✗ node_modules no encontrado" -ForegroundColor Red
    Write-Host "  Ejecuta: npm install" -ForegroundColor Yellow
    $allOk = $false
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ($allOk) {
    Write-Host "✓ ¡Todo listo para ejecutar la aplicación!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Para iniciar:" -ForegroundColor White
    Write-Host "  .\start-all.ps1" -ForegroundColor Cyan
} else {
    Write-Host "⚠ Algunos requisitos faltan" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Ejecuta el setup:" -ForegroundColor White
    Write-Host "  .\setup-local.ps1" -ForegroundColor Cyan
}

Write-Host ""

