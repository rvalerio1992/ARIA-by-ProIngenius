# 🐍 Guía Completa: Instalar Python Correctamente

## 📋 Contexto

Tu aplicación **YA FUNCIONA** sin Python. Python solo se necesita para características opcionales avanzadas:
- API RAG (búsqueda semántica con ChromaDB)
- Análisis con IA (GPT-4)
- Métricas calculadas desde Python

---

## ⚠️ Problema Actual

Python está instalado pero con un error de configuración:
```
Fatal Python error: init_fs_encoding
ModuleNotFoundError: No module named 'encodings'
```

Esto impide instalar paquetes con `pip`.

---

## ✅ Solución: Reinstalar Python Correctamente

### Paso 1: Desinstalar Python Actual (2 minutos)

1. **Abrir "Agregar o quitar programas":**
   - Presiona `Win + I` (Configuración)
   - Click en "Aplicaciones"
   - O busca "Agregar o quitar programas" en el menú Inicio

2. **Buscar y desinstalar Python:**
   - En el buscador, escribe: `Python`
   - Encontrarás algo como: "Python 3.11.9 (64-bit)"
   - Click en los tres puntos → "Desinstalar"
   - Confirma la desinstalación

3. **Limpiar restos (opcional pero recomendado):**
   ```powershell
   # Eliminar carpetas de Python si existen
   Remove-Item -Path "$env:LOCALAPPDATA\Programs\Python" -Recurse -Force -ErrorAction SilentlyContinue
   Remove-Item -Path "$env:APPDATA\Python" -Recurse -Force -ErrorAction SilentlyContinue
   ```

### Paso 2: Descargar Python (1 minuto)

1. **Ir al sitio oficial:**
   ```
   https://www.python.org/downloads/
   ```

2. **Descargar la versión recomendada:**
   - Click en el botón grande amarillo "Download Python 3.12.x"
   - O descargar Python 3.11.x si prefieres
   - **Asegúrate de descargar la versión de 64-bit para Windows**

3. **Guardar el instalador:**
   - Se descargará algo como: `python-3.12.x-amd64.exe`
   - Guárdalo en un lugar fácil de encontrar (Descargas)

### Paso 3: Instalar Python CORRECTAMENTE (2 minutos)

**⚠️ ESTE ES EL PASO MÁS IMPORTANTE:**

1. **Ejecutar el instalador:**
   - Doble click en `python-3.12.x-amd64.exe`
   - Se abrirá la ventana del instalador

2. **PRIMERA PANTALLA - MUY IMPORTANTE:**
   ```
   ┌────────────────────────────────────────┐
   │  Install Python 3.12.x                 │
   │                                        │
   │  ☑ Add python.exe to PATH   ← MARCAR │
   │  ☐ Install launcher for all users      │
   │                                        │
   │  [ Install Now ]                       │
   │  [ Customize installation ]            │
   └────────────────────────────────────────┘
   ```

   **⚠️ DEBES MARCAR**: ☑ **Add python.exe to PATH**
   
   Sin esto, Python no funcionará desde PowerShell/CMD.

3. **Click en "Install Now":**
   - La instalación comenzará
   - Puede pedir permisos de administrador → Acepta
   - Espera 1-2 minutos

4. **Pantalla final:**
   - Cuando veas "Setup was successful"
   - Click en "Close"

### Paso 4: Verificar Instalación (30 segundos)

1. **Cerrar todas las ventanas de PowerShell/CMD abiertas**
   - Muy importante: las ventanas viejas no verán el nuevo PATH

2. **Abrir PowerShell NUEVA:**
   - Presiona `Win + X`
   - Selecciona "Windows PowerShell" o "Terminal"

3. **Verificar Python:**
   ```powershell
   python --version
   ```
   
   **Debería mostrar:**
   ```
   Python 3.12.x
   ```

4. **Verificar pip:**
   ```powershell
   pip --version
   ```
   
   **Debería mostrar:**
   ```
   pip 24.x.x from C:\Users\...\Python312\Lib\site-packages\pip (python 3.12)
   ```

### Paso 5: Instalar Dependencias del Proyecto (2 minutos)

1. **Navegar al proyecto:**
   ```powershell
   cd C:\Users\Administrator\Desktop\ARIA-by-ProIngenius
   ```

2. **Opción A: Usar el script automático:**
   ```powershell
   .\install-python-deps.bat
   ```

3. **Opción B: Instalar manualmente:**
   ```powershell
   pip install -r server\api_rag\requirements.txt
   ```

4. **Verificar instalación:**
   ```powershell
   pip list | Select-String -Pattern "fastapi|uvicorn|chromadb|openai"
   ```
   
   **Debería mostrar:**
   ```
   fastapi        0.119.x
   uvicorn        0.38.x
   chromadb       1.2.x
   openai         2.6.x
   ```

---

## 🧪 Probar que Funciona

### Test 1: Python básico
```powershell
python -c "print('Python funciona!')"
```
**Esperado:** `Python funciona!`

### Test 2: Importar paquetes
```powershell
python -c "import fastapi, uvicorn, openai; print('Todos los paquetes OK!')"
```
**Esperado:** `Todos los paquetes OK!`

### Test 3: Iniciar API RAG
```powershell
cd server\api_rag
python run_api.py
```

**Esperado:**
```
========================================
🚀 Iniciando API RAG - Gemelo 1.1 Premium
========================================
📡 Servidor: http://0.0.0.0:8000
📖 Docs: http://0.0.0.0:8000/docs
...
```

Luego abre: http://localhost:8000/docs

---

## ❓ Solución de Problemas

### Problema 1: "python no se reconoce como comando"

**Causa:** Python no está en el PATH

**Solución A - Rápida (Agregar manualmente al PATH):**

1. Buscar donde se instaló Python:
   ```powershell
   dir "C:\Users\$env:USERNAME\AppData\Local\Programs\Python" -Recurse -Filter python.exe | Select-Object -First 1 FullName
   ```

2. Agregar al PATH:
   - Presiona `Win + Pause` → "Configuración avanzada del sistema"
   - "Variables de entorno"
   - En "Variables del sistema", selecciona "Path" → "Editar"
   - "Nuevo" y agregar:
     - `C:\Users\TuUsuario\AppData\Local\Programs\Python\Python312\`
     - `C:\Users\TuUsuario\AppData\Local\Programs\Python\Python312\Scripts\`
   - "Aceptar" en todo
   - **Reiniciar PowerShell**

**Solución B - Completa (Reinstalar):**
- Desinstalar Python
- Reinstalar marcando "Add python.exe to PATH"

### Problema 2: "pip no funciona"

```powershell
# Usar python -m pip en lugar de pip
python -m pip install --upgrade pip
python -m pip install -r server\api_rag\requirements.txt
```

### Problema 3: "Error al instalar chromadb"

ChromaDB puede necesitar Visual C++ Build Tools:

1. Descargar:
   ```
   https://visualstudio.microsoft.com/visual-cpp-build-tools/
   ```

2. Instalar "Build Tools for Visual Studio"
3. Seleccionar "C++ build tools" durante instalación
4. Reintentar: `pip install chromadb`

### Problema 4: Permisos denegados

```powershell
# Ejecutar PowerShell como Administrador
# Win + X → "Windows PowerShell (Admin)"
```

---

## 🎯 Alternativa: Usar Entorno Virtual

Si prefieres mantener las dependencias aisladas:

### Crear entorno virtual:
```powershell
cd C:\Users\Administrator\Desktop\ARIA-by-ProIngenius
python -m venv venv
```

### Activar entorno:
```powershell
.\venv\Scripts\Activate.ps1
```

Verás `(venv)` al inicio del prompt.

### Instalar dependencias:
```powershell
pip install -r server\api_rag\requirements.txt
```

### Desactivar cuando termines:
```powershell
deactivate
```

### Modificar scripts para usar venv:

Edita `start-rag-api.ps1`:
```powershell
# Agregar al inicio:
.\venv\Scripts\Activate.ps1
cd server\api_rag
python run_api.py
```

---

## 📝 Checklist de Instalación

- [ ] Python desinstalado completamente
- [ ] Python descargado desde python.org
- [ ] Instalado con "Add python.exe to PATH" MARCADO
- [ ] PowerShell reiniciado
- [ ] `python --version` funciona
- [ ] `pip --version` funciona
- [ ] Dependencias instaladas (`pip install -r ...`)
- [ ] API RAG inicia correctamente
- [ ] Docs visibles en http://localhost:8000/docs

---

## ✨ Una Vez Instalado Python

### Iniciar Backend + Frontend (Ya funciona):
```powershell
npm run dev
```

### Iniciar API RAG (Nueva terminal):
```powershell
cd server\api_rag
python run_api.py
```

### O usar el script todo-en-uno:
```powershell
.\start-all.ps1
```

---

## 🎉 Resultado Final

Con Python instalado tendrás acceso a:

- ✅ Backend principal (ya funciona sin Python)
- ✅ Frontend React (ya funciona sin Python)
- 🆕 API RAG con búsqueda semántica
- 🆕 ChromaDB para embeddings
- 🆕 Métricas calculadas desde Python
- 🆕 Integración completa con OpenAI (cuando configures la key)

---

## 📚 Recursos

- **Python oficial**: https://www.python.org/
- **Documentación pip**: https://pip.pypa.io/
- **FastAPI**: https://fastapi.tiangolo.com/
- **ChromaDB**: https://www.trychroma.com/

---

**¿Listo para instalar Python?** Sigue los pasos de arriba y estarás listo en ~5-7 minutos.

