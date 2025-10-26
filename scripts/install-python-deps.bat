@echo off
echo ========================================
echo   Instalando Dependencias Python
echo ========================================
echo.

:: Intentar diferentes métodos de instalación

echo Metodo 1: Usando pip directamente...
pip install -r server\api_rag\requirements.txt
if %errorlevel% equ 0 (
    echo [OK] Dependencias instaladas con pip
    goto :done
)

echo.
echo Metodo 2: Usando python -m pip...
python -m pip install -r server\api_rag\requirements.txt
if %errorlevel% equ 0 (
    echo [OK] Dependencias instaladas con python -m pip
    goto :done
)

echo.
echo Metodo 3: Instalando una por una...
pip install fastapi
pip install uvicorn
pip install chromadb
pip install openai
pip install pydantic
pip install python-dotenv
if %errorlevel% equ 0 (
    echo [OK] Dependencias instaladas individualmente
    goto :done
)

:error
echo.
echo [ERROR] No se pudieron instalar las dependencias de Python
echo.
echo SOLUCIONES POSIBLES:
echo 1. Verifica que Python este instalado correctamente
echo 2. Reinstala Python y marca "Add Python to PATH"
echo 3. Ejecuta manualmente desde el directorio server\api_rag:
echo    pip install -r requirements.txt
echo.
goto :end

:done
echo.
echo [OK] Todas las dependencias de Python instaladas correctamente!
echo.

:end
pause

