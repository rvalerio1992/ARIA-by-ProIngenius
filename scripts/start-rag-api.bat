@echo off
echo ========================================
echo   Iniciando API RAG Python
echo ========================================
echo.
echo API RAG estara disponible en: http://localhost:8000
echo Documentacion: http://localhost:8000/docs
echo.
echo Presiona Ctrl+C para detener el servidor
echo.
cd server\api_rag
python run_api.py

