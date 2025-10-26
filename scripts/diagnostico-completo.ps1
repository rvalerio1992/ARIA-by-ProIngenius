# Script de Diagnóstico Completo - ARIA Banking CRM
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  DIAGNÓSTICO COMPLETO DEL PROYECTO" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$allGood = $true
$warnings = @()
$errors = @()

# ===== VERIFICAR SISTEMA =====
Write-Host "1. VERIFICANDO SISTEMA..." -ForegroundColor Yellow
Write-Host ""

# Node.js
try {
    $nodeVersion = node --version
    Write-Host "  ✓ Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Node.js: NO INSTALADO" -ForegroundColor Red
    $errors += "Node.js no instalado"
    $allGood = $false
}

# npm
try {
    $npmVersion = npm --version
    Write-Host "  ✓ npm: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "  ✗ npm: NO INSTALADO" -ForegroundColor Red
    $errors += "npm no instalado"
    $allGood = $false
}

# Python
try {
    $pythonVersion = python --version 2>&1
    Write-Host "  ✓ Python: $pythonVersion" -ForegroundColor Green
    
    # Verificar si pip funciona
    try {
        $pipTest = pip --version 2>&1
        if ($pipTest -match "pip") {
            Write-Host "  ✓ pip: Funcional" -ForegroundColor Green
        } else {
            Write-Host "  ⚠ pip: Instalado pero con problemas" -ForegroundColor Yellow
            $warnings += "pip tiene problemas de configuración"
        }
    } catch {
        Write-Host "  ⚠ pip: No funciona correctamente" -ForegroundColor Yellow
        $warnings += "pip no funciona - necesita reinstalar Python"
    }
} catch {
    Write-Host "  ✗ Python: NO INSTALADO" -ForegroundColor Red
    $errors += "Python no instalado"
    $allGood = $false
}

# PostgreSQL
Write-Host ""
Write-Host "  Verificando PostgreSQL..." -ForegroundColor Gray
$pgService = Get-Service -Name "*postgres*" -ErrorAction SilentlyContinue
if ($pgService) {
    Write-Host "  ✓ PostgreSQL: Servicio detectado" -ForegroundColor Green
    if ($pgService.Status -eq "Running") {
        Write-Host "    Estado: Ejecutándose" -ForegroundColor Green
    } else {
        Write-Host "    ⚠ Estado: Detenido" -ForegroundColor Yellow
        $warnings += "PostgreSQL está instalado pero no corriendo"
    }
} else {
    try {
        psql --version 2>&1 | Out-Null
        Write-Host "  ⚠ PostgreSQL: Instalado pero servicio no detectado" -ForegroundColor Yellow
        $warnings += "PostgreSQL instalado pero no como servicio"
    } catch {
        Write-Host "  ⚠ PostgreSQL: No detectado (usa Neon o instala local)" -ForegroundColor Yellow
        $warnings += "PostgreSQL no instalado - considera usar Neon (cloud)"
    }
}

Write-Host ""
Write-Host "2. VERIFICANDO PROYECTO..." -ForegroundColor Yellow
Write-Host ""

# node_modules
if (Test-Path "node_modules") {
    $packageCount = (Get-ChildItem "node_modules" -Directory).Count
    Write-Host "  ✓ node_modules: $packageCount paquetes" -ForegroundColor Green
} else {
    Write-Host "  ✗ node_modules: NO EXISTE" -ForegroundColor Red
    $errors += "Ejecuta: npm install"
    $allGood = $false
}

# .env
if (Test-Path ".env") {
    Write-Host "  ✓ .env: Existe" -ForegroundColor Green
    
    $envContent = Get-Content ".env" -Raw
    
    # Verificar DATABASE_URL
    if ($envContent -match "DATABASE_URL=postgresql://") {
        Write-Host "    ✓ DATABASE_URL configurado" -ForegroundColor Green
    } else {
        Write-Host "    ⚠ DATABASE_URL vacío o inválido" -ForegroundColor Yellow
        $warnings += "DATABASE_URL necesita configurarse con DB real"
    }
    
    # Verificar OpenAI
    if ($envContent -match "AI_INTEGRATIONS_OPENAI_API_KEY=sk-") {
        Write-Host "    ✓ OpenAI API Key configurada" -ForegroundColor Green
    } else {
        Write-Host "    ⚠ OpenAI API Key no configurada (opcional)" -ForegroundColor Yellow
        $warnings += "Sin OpenAI key - funciones IA no disponibles"
    }
} else {
    Write-Host "  ✗ .env: NO EXISTE" -ForegroundColor Red
    $errors += "Archivo .env necesario"
    $allGood = $false
}

# package.json
if (Test-Path "package.json") {
    Write-Host "  ✓ package.json: OK" -ForegroundColor Green
} else {
    Write-Host "  ✗ package.json: NO EXISTE" -ForegroundColor Red
    $errors += "package.json faltante"
    $allGood = $false
}

# Python requirements
if (Test-Path "server/api_rag/requirements.txt") {
    Write-Host "  ✓ requirements.txt: OK" -ForegroundColor Green
} else {
    Write-Host "  ⚠ requirements.txt: No encontrado" -ForegroundColor Yellow
    $warnings += "requirements.txt faltante en server/api_rag"
}

# Scripts
$scriptsExist = (Test-Path "start-all.ps1") -and (Test-Path "setup-local.ps1")
if ($scriptsExist) {
    Write-Host "  ✓ Scripts de automatización: OK" -ForegroundColor Green
} else {
    Write-Host "  ⚠ Scripts: Algunos faltantes" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "3. VERIFICANDO CONECTIVIDAD..." -ForegroundColor Yellow
Write-Host ""

# Puerto 5000 disponible
$port5000 = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue
if ($port5000) {
    Write-Host "  ⚠ Puerto 5000: EN USO" -ForegroundColor Yellow
    $warnings += "Puerto 5000 en uso - cambia PORT en .env"
} else {
    Write-Host "  ✓ Puerto 5000: Disponible" -ForegroundColor Green
}

# Puerto 8000 disponible
$port8000 = Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue
if ($port8000) {
    Write-Host "  ⚠ Puerto 8000: EN USO" -ForegroundColor Yellow
    $warnings += "Puerto 8000 en uso - cambia en .env"
} else {
    Write-Host "  ✓ Puerto 8000: Disponible" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  RESUMEN DEL DIAGNÓSTICO" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Mostrar errores
if ($errors.Count -gt 0) {
    Write-Host "ERRORES CRÍTICOS:" -ForegroundColor Red
    foreach ($error in $errors) {
        Write-Host "  ✗ $error" -ForegroundColor Red
    }
    Write-Host ""
}

# Mostrar advertencias
if ($warnings.Count -gt 0) {
    Write-Host "ADVERTENCIAS:" -ForegroundColor Yellow
    foreach ($warning in $warnings) {
        Write-Host "  ⚠ $warning" -ForegroundColor Yellow
    }
    Write-Host ""
}

# Estado final
if ($allGood -and $warnings.Count -eq 0) {
    Write-Host "ESTADO: ✓ TODO LISTO" -ForegroundColor Green
    Write-Host ""
    Write-Host "Puedes ejecutar la aplicación:" -ForegroundColor White
    Write-Host "  .\start-all.ps1" -ForegroundColor Cyan
} elseif ($allGood) {
    Write-Host "ESTADO: ⚠ LISTO CON ADVERTENCIAS" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "La aplicación puede funcionar, pero revisa las advertencias arriba." -ForegroundColor White
} else {
    Write-Host "ESTADO: ✗ REQUIERE CONFIGURACIÓN" -ForegroundColor Red
    Write-Host ""
    Write-Host "Soluciona los errores críticos antes de ejecutar." -ForegroundColor White
    Write-Host ""
    Write-Host "PRÓXIMOS PASOS:" -ForegroundColor Yellow
    
    if ($errors -match "node_modules") {
        Write-Host "  1. npm install" -ForegroundColor Cyan
    }
    if ($errors -match ".env") {
        Write-Host "  2. Crear archivo .env (ver env.example)" -ForegroundColor Cyan
    }
    if ($warnings -match "PostgreSQL") {
        Write-Host "  3. Configurar PostgreSQL (recomendado: Neon)" -ForegroundColor Cyan
    }
    if ($warnings -match "pip") {
        Write-Host "  4. Resolver problema de Python" -ForegroundColor Cyan
    }
}

Write-Host ""
Write-Host "DOCUMENTACIÓN:" -ForegroundColor Cyan
Write-Host "  • REPORTE-VALIDACION.md - Reporte completo" -ForegroundColor White
Write-Host "  • LEEME-PRIMERO.md - Guía de inicio" -ForegroundColor White
Write-Host "  • SETUP-WINDOWS.md - Instrucciones completas" -ForegroundColor White
Write-Host ""

