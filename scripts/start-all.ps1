# Script para iniciar ambos servidores simultáneamente
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ARIA Banking CRM - Inicio Completo" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Iniciando ambos servidores..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Backend: http://localhost:5000" -ForegroundColor Green
Write-Host "API RAG: http://localhost:8000" -ForegroundColor Green
Write-Host "Docs API: http://localhost:8000/docs" -ForegroundColor Green
Write-Host ""
Write-Host "Presiona Ctrl+C para detener todos los servidores" -ForegroundColor Yellow
Write-Host ""

# Iniciar API RAG en una nueva ventana de PowerShell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; .\start-rag-api.ps1"

# Esperar un momento para que la API RAG inicie
Start-Sleep -Seconds 3

# Iniciar el backend en la ventana actual
npm run dev

