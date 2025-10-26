# 🔧 Solución de Problemas con Python

## Problema: Python no reconoce comandos

Si ves errores como:
- `pip: The term 'pip' is not recognized`
- `Fatal Python error: init_fs_encoding`
- `ModuleNotFoundError: No module named 'encodings'`

Esto indica un problema con la instalación o configuración de Python en Windows.

---

## ✅ Soluciones

### Solución 1: Reinstalar Python (Recomendado)

1. **Desinstalar Python actual**:
   - Ve a "Agregar o quitar programas" en Windows
   - Busca "Python 3.11"
   - Desinstala completamente

2. **Descargar Python nuevo**:
   - Descarga desde: https://www.python.org/downloads/
   - Asegúrate de descargar Python 3.11 o superior

3. **Instalar correctamente**:
   - **IMPORTANTE**: Marca la casilla "Add Python to PATH" en la primera pantalla
   - Selecciona "Install Now" o "Customize installation"
   - Si personalizas, asegúrate de incluir pip

4. **Verificar instalación**:
   ```cmd
   python --version
   python -m pip --version
   ```

---

### Solución 2: Usar un Entorno Virtual (Recomendado para desarrollo)

```cmd
# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
venv\Scripts\activate

# Instalar dependencias
pip install -r server\api_rag\requirements.txt

# Cuando termines
deactivate
```

**Ventaja**: Aísla las dependencias del proyecto y evita conflictos.

---

### Solución 3: Reparar el PATH de Python

1. **Encontrar la ruta de instalación de Python**:
   - Usualmente: `C:\Users\TuUsuario\AppData\Local\Programs\Python\Python311\`
   - O: `C:\Python311\`

2. **Agregar al PATH manualmente**:
   - Presiona `Win + X` y selecciona "Sistema"
   - Clic en "Configuración avanzada del sistema"
   - Clic en "Variables de entorno"
   - En "Variables del sistema", selecciona "Path" y clic en "Editar"
   - Agrega estas rutas (ajusta según tu instalación):
     - `C:\Users\TuUsuario\AppData\Local\Programs\Python\Python311\`
     - `C:\Users\TuUsuario\AppData\Local\Programs\Python\Python311\Scripts\`
   - Clic en "Aceptar" en todas las ventanas
   - **Reinicia PowerShell/CMD**

3. **Verificar**:
   ```cmd
   python --version
   pip --version
   ```

---

### Solución 4: Instalar dependencias manualmente

Si los scripts automáticos fallan, instala cada paquete uno por uno:

```cmd
pip install fastapi
pip install uvicorn
pip install chromadb
pip install openai
pip install pydantic
pip install python-dotenv
```

---

### Solución 5: Usar Anaconda/Miniconda (Alternativa)

Si sigues teniendo problemas con Python estándar:

1. **Descargar Miniconda**:
   - https://docs.conda.io/en/latest/miniconda.html

2. **Instalar Miniconda**

3. **Crear entorno e instalar dependencias**:
   ```cmd
   conda create -n aria python=3.11
   conda activate aria
   pip install -r server\api_rag\requirements.txt
   ```

4. **Usar este entorno**:
   - Siempre activa el entorno antes de trabajar: `conda activate aria`

---

## 🎯 Después de Solucionar

Una vez que Python funcione correctamente:

1. **Instalar dependencias Python**:
   ```cmd
   .\install-python-deps.bat
   ```
   O manualmente:
   ```cmd
   pip install -r server\api_rag\requirements.txt
   ```

2. **Verificar instalación**:
   ```cmd
   cd server\api_rag
   python -c "import fastapi, uvicorn, chromadb, openai; print('Todo OK!')"
   ```

3. **Probar la API RAG**:
   ```cmd
   cd server\api_rag
   python run_api.py
   ```
   Debería iniciarse en http://localhost:8000

---

## 📝 Notas Adicionales

### Si usas entorno virtual:

Modifica `start-rag-api.bat` para activar el entorno primero:

```batch
@echo off
echo Activando entorno virtual...
call venv\Scripts\activate
cd server\api_rag
python run_api.py
```

### Si usas Conda:

Modifica `start-rag-api.bat`:

```batch
@echo off
echo Activando entorno conda...
call conda activate aria
cd server\api_rag
python run_api.py
```

---

## ❓ ¿Sigues con problemas?

Si ninguna solución funciona:

1. **Verifica la versión de Windows**:
   - Python funciona mejor en Windows 10/11 actualizados

2. **Ejecuta como Administrador**:
   - Intenta ejecutar CMD/PowerShell como administrador

3. **Revisa el firewall/antivirus**:
   - Algunos antivirus bloquean la instalación de paquetes

4. **Usa WSL (Windows Subsystem for Linux)**:
   - Si tienes Windows 10/11 Pro, puedes usar WSL2 con Ubuntu
   - En WSL, Python y pip suelen funcionar sin problemas

---

## 🎉 Una vez resuelto

Continúa con las instrucciones en **INSTRUCCIONES-INICIO.md** para completar la configuración y ejecutar la aplicación.

