# ✅ Checklist: Subir ARIA a GitHub y Habilitar Codespaces

Este documento te guía paso a paso para subir el proyecto ARIA al repositorio de GitHub y habilitar GitHub Codespaces.

---

## 📋 Parte 1: Preparar el Repositorio Local

### 1. Verificar Estado del Proyecto

```bash
# Ver qué archivos han cambiado
git status

# Deberías ver todos los archivos nuevos y modificados
```

### 2. Agregar Todos los Archivos

```bash
# Agregar todos los archivos al staging
git add .

# O agregar selectivamente:
git add .devcontainer/
git add .github/
git add docs/
git add scripts/
git add README.md
git add .env.codespaces.example
git add server/
git add client/
```

### 3. Verificar qué se Subirá

```bash
# Ver lista de archivos staged
git status

# IMPORTANTE: Verificar que .env NO esté en la lista
# (debe estar en .gitignore)
```

⚠️ **CRÍTICO**: Asegúrate de que `.env` con secrets reales NO esté incluido.

### 4. Hacer Commit

```bash
# Commit con mensaje descriptivo
git commit -m "feat: Proyecto ARIA completo con soporte para GitHub Codespaces

- Configuración completa de DevContainer
- Documentación exhaustiva (README, CODESPACES, OPTIMIZACIONES)
- Scripts organizados para Windows y desarrollo
- Backend optimizado con validación robusta
- Frontend React con componentes UI profesionales
- API RAG Python con FastAPI
- Soporte para modo local y PostgreSQL
- GitHub Actions para prebuilds
- Configuración automática en Codespaces"
```

---

## 📤 Parte 2: Subir al Repositorio GitHub

### Opción A: Repositorio Ya Existe (Recomendado)

Tu repositorio: https://github.com/rvalerio1992/ARIA-by-ProIngenius

```bash
# 1. Agregar remote si no existe
git remote add origin https://github.com/rvalerio1992/ARIA-by-ProIngenius.git

# O si ya existe, verificar:
git remote -v

# 2. Hacer push a main
git push -u origin main

# Si tienes conflictos o el repo tiene contenido:
git pull origin main --rebase
git push -u origin main
```

### Opción B: Crear Nuevo Repositorio

Si el repositorio actual está vacío:

```bash
# 1. Ir a GitHub.com
# 2. Crear nuevo repositorio "ARIA-by-ProIngenius"
# 3. NO inicializar con README, .gitignore, o license

# 4. Seguir instrucciones de GitHub:
git remote add origin https://github.com/rvalerio1992/ARIA-by-ProIngenius.git
git branch -M main
git push -u origin main
```

---

## 🔐 Parte 3: Configurar Secrets (Importante)

### Para Tu Uso Personal

1. Ir a tu perfil en GitHub
2. **Settings** → **Codespaces** → **Secrets**
3. Click **"New secret"**
4. Configurar:
   - **Name**: `AI_INTEGRATIONS_OPENAI_API_KEY`
   - **Value**: Tu API key de OpenAI
   - **Repository access**: Seleccionar "ARIA-by-ProIngenius"
5. Click **"Add secret"**

### Para Colaboradores

Cada desarrollador debe configurar sus propios secrets siguiendo los pasos anteriores.

---

## 🚀 Parte 4: Probar Codespaces

### Primera Prueba

1. Ir a: https://github.com/rvalerio1992/ARIA-by-ProIngenius
2. Click en botón verde **"Code"**
3. Seleccionar pestaña **"Codespaces"**
4. Click **"Create codespace on main"**
5. Esperar 2-3 minutos (primera vez puede tomar más)
6. Verificar que el setup automático se ejecute

### Verificaciones

```bash
# En el Codespace, verificar:

# 1. Node.js instalado
node --version  # Debe mostrar v20.x

# 2. Python instalado
python --version  # Debe mostrar v3.11.x

# 3. Dependencias Node instaladas
ls node_modules  # Debe tener contenido

# 4. Dependencias Python instaladas
cd server/api_rag
pip list | grep fastapi  # Debe mostrar fastapi

# 5. Archivo .env existe
cat ../../.env  # Debe mostrar template
```

### Probar la Aplicación

**Terminal 1:**
```bash
npm run dev
```

**Terminal 2:**
```bash
cd server/api_rag
python run_api.py
```

**Verificar:**
- Notificación de puerto 5000 aparece
- Click "Open in Browser"
- Aplicación carga correctamente
- API RAG responde en puerto 8000

---

## ⚙️ Parte 5: Configuración Avanzada (Opcional)

### Habilitar Prebuilds

Los prebuilds reducen el tiempo de inicio de ~3 minutos a ~30 segundos.

1. Ir a: https://github.com/rvalerio1992/ARIA-by-ProIngenius/settings/codespaces
2. Scroll a **"Prebuild configuration"**
3. Click **"Set up prebuild"**
4. Configurar:
   - **Branch**: main
   - **Configuration file**: `.devcontainer/devcontainer.json`
   - **Region**: Seleccionar tu región más cercana
   - **Schedule**: "On push" (para desarrollo activo)
5. Click **"Create"**

### Configurar Límites de Recursos

1. En la misma página de settings
2. Configurar:
   - **Machine type**: 2-core (default, suficiente)
   - **Timeout**: 30 minutes de inactividad
   - **Retention**: 30 días para Codespaces detenidos

---

## 📊 Parte 6: Verificación Final

### Checklist de Verificación

- [ ] Código subido a GitHub exitosamente
- [ ] Archivo `.env` NO está en el repositorio (verificar en GitHub.com)
- [ ] Badge de Codespaces aparece en README
- [ ] Documentación visible en `docs/`
- [ ] `.devcontainer/` está presente en el repo
- [ ] Codespace se crea sin errores
- [ ] Setup automático se ejecuta correctamente
- [ ] Aplicación inicia sin problemas en Codespace
- [ ] Puertos 5000 y 8000 funcionan
- [ ] Secrets configurados en tu cuenta

### Verificar en GitHub.com

1. Ve a: https://github.com/rvalerio1992/ARIA-by-ProIngenius
2. Verifica que veas:
   - ✅ Estructura de carpetas correcta
   - ✅ README.md se muestra con formato
   - ✅ Badge de Codespaces clickeable
   - ✅ Archivos `.devcontainer/` presentes
   - ✅ Documentación en `docs/`
   - ✅ NO hay archivos `.env` con secrets

---

## 🎉 Parte 7: Compartir con el Equipo

### Para Nuevos Desarrolladores

Envía este mensaje:

```
¡Hola! 👋

Para empezar a trabajar en ARIA Banking CRM:

1. Ve a: https://github.com/rvalerio1992/ARIA-by-ProIngenius
2. Click en el badge "Open in Codespaces"
3. Espera 2-3 minutos mientras se configura
4. Lee la guía: docs/CODESPACES.md
5. Configura tu OpenAI API Key en .env
6. ¡Empieza a desarrollar!

Documentación completa: https://github.com/rvalerio1992/ARIA-by-ProIngenius#readme
```

### Para Demos o Stakeholders

```
Demo en vivo de ARIA CRM:

👉 Abrir en navegador (sin instalación):
https://github.com/codespaces/new?repo=rvalerio1992/ARIA-by-ProIngenius

- Funciona en cualquier navegador
- No requiere instalación local
- Listo en 2-3 minutos
- Incluye datos de ejemplo

Documentación: https://github.com/rvalerio1992/ARIA-by-ProIngenius
```

---

## 🐛 Solución de Problemas

### Error: "Remote origin already exists"

```bash
# Eliminar remote anterior
git remote remove origin

# Agregar nuevo
git remote add origin https://github.com/rvalerio1992/ARIA-by-ProIngenius.git
```

### Error: "Failed to push some refs"

```bash
# Pull con rebase
git pull origin main --rebase

# Resolver conflictos si hay
# Luego:
git push origin main
```

### Error: "Authentication failed"

```bash
# Usar GitHub CLI (recomendado)
gh auth login

# O usar Personal Access Token
# Settings → Developer settings → Personal access tokens → Generate new token
```

### Codespace no inicia

1. Verificar que `.devcontainer/devcontainer.json` existe en el repo
2. Verificar sintaxis JSON válida
3. Revisar logs del Codespace: Settings → View creation log

### Setup.sh no se ejecuta

1. Verificar que `setup.sh` está en `.devcontainer/`
2. Verificar `postCreateCommand` en `devcontainer.json`
3. Los permisos se setean automáticamente en Linux (Codespaces)

---

## 📞 Soporte

Si tienes problemas:

1. **Documentación**: Revisa `docs/CODESPACES.md`
2. **Issues**: Abre un issue en GitHub
3. **Logs**: Revisa logs del Codespace (View → Problems)

---

## ✅ Resumen de Comandos Rápidos

```bash
# Verificar estado
git status

# Agregar todo
git add .

# Commit
git commit -m "feat: ARIA con Codespaces completo"

# Push
git push -u origin main

# Verificar remote
git remote -v
```

---

**¡Listo para subir! 🚀**

Una vez completados estos pasos, ARIA estará disponible para desarrollo en la nube con GitHub Codespaces.

---

**Última actualización**: Octubre 26, 2025  
**Por**: ProIngenius Team

