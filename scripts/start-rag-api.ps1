# Script para iniciar la API RAG Python (FastAPI)
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Iniciando API RAG Python" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "API RAG estará disponible en: http://localhost:8000" -ForegroundColor Green
Write-Host "Documentación: http://localhost:8000/docs" -ForegroundColor Green
Write-Host ""
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
Write-Host ""

Set-Location server\api_rag
python run_api.py

