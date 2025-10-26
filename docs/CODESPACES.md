# ☁️ ARIA en GitHub Codespaces

Esta guía te ayudará a ejecutar **ARIA Banking CRM** completamente en la nube usando GitHub Codespaces, sin necesidad de instalar nada localmente.

## 🚀 Inicio Rápido

### 1. Abrir en Codespaces

[![Abrir en GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?repo=rvalerio1992/ARIA-by-ProIngenius)

**O manualmente:**

1. Ve al repositorio: [ARIA-by-ProIngenius](https://github.com/rvalerio1992/ARIA-by-ProIngenius)
2. Click en el botón verde **"Code"**
3. Selecciona la pestaña **"Codespaces"**
4. Click en **"Create codespace on main"**

### 2. Esperar la Configuración Automática

El Codespace se configurará automáticamente:
- ✅ Instala Node.js 20
- ✅ Instala Python 3.11
- ✅ Instala todas las dependencias
- ✅ Configura el entorno de desarrollo
- ✅ Prepara los puertos 5000 y 8000

⏱️ **Tiempo estimado**: 2-3 minutos

### 3. Configurar Variables de Entorno

Una vez que el Codespace esté listo:

```bash
# Editar el archivo .env
code .env
```

**Configuración mínima requerida:**

```env
# Obligatorio: Tu API Key de OpenAI
AI_INTEGRATIONS_OPENAI_API_KEY=sk-tu-api-key-aqui

# Opcional: Base de datos PostgreSQL (deja vacío para modo local)
DATABASE_URL=
```

💡 **Tip**: Puedes usar [GitHub Secrets](https://docs.github.com/en/codespaces/managing-your-codespaces/managing-secrets-for-your-codespaces) para almacenar tu API key de forma segura.

### 4. Iniciar los Servidores

**Opción A: Usar terminales integradas** (Recomendado)

El Codespace abrirá automáticamente 2 terminales:

**Terminal 1 - Backend + Frontend:**
```bash
npm run dev
```

**Terminal 2 - API RAG Python:**
```bash
cd server/api_rag
python run_api.py
```

**Opción B: Usar tmux (avanzado)**
```bash
# Terminal única con ambos servicios
tmux new-session -d -s aria 'npm run dev'
tmux split-window -h 'cd server/api_rag && python run_api.py'
tmux attach -t aria
```

### 5. Acceder a la Aplicación

Cuando los servidores inicien, VS Code mostrará notificaciones con los puertos:

- 🌐 **Frontend + Backend**: Click en "Open in Browser" cuando veas el puerto 5000
- 📚 **API Docs**: Abre el puerto 8000 para ver la documentación FastAPI

Los URLs tendrán el formato:
```
https://<codespace-name>-5000.app.github.dev
https://<codespace-name>-8000.app.github.dev
```

## 🎯 Características en Codespaces

### ✅ Pre-configurado

- **Node.js 20** + **Python 3.11**
- **PostgreSQL 14** (opcional, puede usar modo local)
- **Git** y herramientas de desarrollo
- **Extensiones VS Code** recomendadas

### 🔌 Extensiones Instaladas

- ESLint + Prettier (formateo automático)
- Python + Pylance
- Tailwind CSS IntelliSense
- React snippets
- GitHub Copilot (si está disponible)
- Auto Rename Tag
- Path IntelliSense

### 🌐 Puertos Configurados

| Puerto | Servicio | Visibilidad |
|--------|----------|-------------|
| 5000 | Backend Express + Frontend React | Public |
| 8000 | API RAG FastAPI | Public |

## 📝 Comandos Útiles

### Desarrollo

```bash
# Ver logs del backend
npm run dev

# Ver logs de la API RAG
cd server/api_rag && python run_api.py

# Verificar tipos TypeScript
npm run check

# Build para producción
npm run build
```

### Base de Datos

```bash
# Sincronizar schema (si usas PostgreSQL)
npm run db:push

# Abrir Drizzle Studio
npm run db:studio
```

### Gestión de Dependencias

```bash
# Actualizar dependencias Node.js
npm update

# Actualizar dependencias Python
cd server/api_rag
pip install --upgrade -r requirements.txt
```

## 🔐 Configuración de Secrets

Para configurar tu OpenAI API key de forma segura:

### Opción 1: GitHub Codespaces Secrets

1. Ve a tu perfil → **Settings**
2. **Codespaces** → **Secrets**
3. Click **New secret**
4. Nombre: `AI_INTEGRATIONS_OPENAI_API_KEY`
5. Valor: Tu API key
6. Selecciona el repositorio
7. Reconstruye el Codespace

### Opción 2: Archivo .env (menos seguro)

```bash
# Editar directamente
code .env

# Agregar tu API key
AI_INTEGRATIONS_OPENAI_API_KEY=sk-tu-api-key-aqui
```

⚠️ **Importante**: No hagas commit del archivo `.env` con secrets reales.

## 🛠️ Solución de Problemas

### Puerto 5000 no responde

```bash
# Verificar que el proceso está corriendo
ps aux | grep node

# Reiniciar el servidor
npm run dev
```

### API RAG no se conecta

```bash
# Verificar que Python está ejecutando
ps aux | grep python

# Verificar que las dependencias están instaladas
cd server/api_rag
pip list | grep fastapi

# Reinstalar si es necesario
pip install -r requirements.txt
```

### Error: "OpenAI API Key not found"

1. Verifica que `.env` tiene la variable configurada:
   ```bash
   cat .env | grep AI_INTEGRATIONS_OPENAI_API_KEY
   ```

2. Si está vacía, agrégala:
   ```bash
   echo "AI_INTEGRATIONS_OPENAI_API_KEY=sk-tu-key" >> .env
   ```

3. Reinicia los servidores

### Cambios no se reflejan

```bash
# Limpiar caché y reinstalar
rm -rf node_modules
npm install

# Para Python
cd server/api_rag
pip cache purge
pip install --no-cache-dir -r requirements.txt
```

## 💾 Persistencia de Datos

### Base de Datos

**Opción 1: Modo Local (Default)**
- Usa archivos JSON en `server/api_rag/data/`
- Los datos persisten mientras el Codespace exista
- Perfecto para desarrollo y pruebas

**Opción 2: PostgreSQL Externo**
- Usa un servicio como [Neon](https://neon.tech/) (gratis)
- [Supabase](https://supabase.com/) (gratis)
- [ElephantSQL](https://www.elephantsql.com/) (gratis)
- Configura `DATABASE_URL` en `.env`

### Archivos del Codespace

⚠️ **Importante**: Los Codespaces se suspenden después de inactividad.

Para preservar tu trabajo:
```bash
# Hacer commit regularmente
git add .
git commit -m "Checkpoint de desarrollo"
git push
```

## 🔄 Reconstruir el Codespace

Si algo sale mal, puedes reconstruir:

1. Command Palette (Ctrl+Shift+P / Cmd+Shift+P)
2. Buscar: **"Codespaces: Rebuild Container"**
3. Confirmar

Esto reinstalará todo desde cero usando `.devcontainer/devcontainer.json`.

## 📊 Recursos del Codespace

### Límites Gratuitos (GitHub Free)

- ⏰ **60 horas/mes** de uso
- 💾 **15 GB** de almacenamiento
- 🖥️ **2 cores**, **4 GB RAM**

### Optimizar Uso

```bash
# Detener el Codespace cuando no lo uses
# Desde GitHub.com → Codespaces → Stop

# O desde VS Code
# Command Palette → "Codespaces: Stop Current Codespace"
```

### Eliminar Codespaces Viejos

```bash
# Listar todos tus Codespaces
gh codespace list

# Eliminar uno específico
gh codespace delete -c <codespace-name>
```

## 🎓 Recursos Adicionales

- [Documentación GitHub Codespaces](https://docs.github.com/en/codespaces)
- [Configuración de devcontainers](https://containers.dev/)
- [README principal del proyecto](../README.md)
- [Guía de setup local](README-SETUP.md)

## 💡 Consejos Pro

### 1. Usar Ports Tab
- Ve a la pestaña **"Ports"** en VS Code
- Click derecho en un puerto → **"Open in Browser"**
- Puedes hacer los puertos públicos o privados

### 2. Terminal Persistente
```bash
# Usar tmux para terminales que persistan
tmux new -s dev
# Ctrl+B, D para detach
# tmux attach -t dev para volver
```

### 3. Personalizar el Editor
```bash
# Agregar tus propias extensiones en .devcontainer/devcontainer.json
# Cambiar settings en "customizations.vscode.settings"
```

### 4. Debugging
- El debugger de VS Code está configurado para TypeScript
- Usa breakpoints normalmente
- Para Python, instala la extensión Python Debugger

## 🤝 Contribuir desde Codespaces

```bash
# 1. Crear rama
git checkout -b feature/mi-feature

# 2. Hacer cambios y commit
git add .
git commit -m "Agrega nueva feature"

# 3. Push
git push origin feature/mi-feature

# 4. Crear Pull Request desde GitHub
```

---

## 🎉 ¡Todo Listo!

Ahora puedes desarrollar ARIA Banking CRM completamente en la nube, desde cualquier dispositivo con un navegador.

**¿Problemas?** Abre un issue en el [repositorio](https://github.com/rvalerio1992/ARIA-by-ProIngenius/issues).

---

**Documentación actualizada**: Octubre 2025  
**Hecho con ❤️ por ProIngenius**

