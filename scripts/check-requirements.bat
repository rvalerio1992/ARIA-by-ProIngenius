@echo off
echo ========================================
echo   Verificacion de Requisitos
echo ========================================
echo.

set ALL_OK=1

:: Verificar Node.js
echo Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Node.js instalado
    node --version
) else (
    echo [ERROR] Node.js NO encontrado
    echo Descarga: https://nodejs.org/
    set ALL_OK=0
)

:: Verificar npm
echo Verificando npm...
npm --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] npm instalado
    npm --version
) else (
    echo [ERROR] npm NO encontrado
    set ALL_OK=0
)

:: Verificar Python
echo Verificando Python...
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Python instalado
    python --version
) else (
    echo [ERROR] Python NO encontrado
    echo Descarga: https://www.python.org/downloads/
    set ALL_OK=0
)

:: Verificar pip
echo Verificando pip...
pip --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] pip instalado
    pip --version
) else (
    echo [ERROR] pip NO encontrado
    set ALL_OK=0
)

:: Verificar PostgreSQL (opcional)
echo Verificando PostgreSQL...
psql --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] PostgreSQL instalado
    psql --version
) else (
    echo [AVISO] PostgreSQL no encontrado localmente
    echo   Puedes usar PostgreSQL local o Neon (cloud)
)

echo.
echo ========================================

:: Verificar .env
echo Verificando configuracion...
if exist ".env" (
    echo [OK] Archivo .env encontrado
) else (
    echo [ERROR] Archivo .env no encontrado
    echo   Debes crear un archivo .env con tus credenciales
    set ALL_OK=0
)

:: Verificar node_modules
if exist "node_modules" (
    echo [OK] node_modules encontrado
) else (
    echo [ERROR] node_modules no encontrado
    echo   Ejecuta: npm install
    set ALL_OK=0
)

echo.
echo ========================================
echo.

if %ALL_OK% equ 1 (
    echo [OK] Todo listo para ejecutar la aplicacion!
    echo.
    echo Para iniciar:
    echo   start-backend.bat  ^(Terminal 1^)
    echo   start-rag-api.bat  ^(Terminal 2^)
) else (
    echo [AVISO] Algunos requisitos faltan
    echo.
    echo Sigue las instrucciones en INSTRUCCIONES-INICIO.md
)

echo.
pause

