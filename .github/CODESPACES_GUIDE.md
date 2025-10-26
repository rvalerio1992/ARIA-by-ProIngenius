# 🚀 Guía Rápida de Codespaces para ARIA

## Abrir el Proyecto

1. Click en el botón "Code" verde
2. Selecciona pestaña "Codespaces"
3. Click "Create codespace on main"

[![Abrir en Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?repo=rvalerio1992/ARIA-by-ProIngenius)

## Configuración Inicial (Solo Primera Vez)

### 1. Configurar OpenAI API Key

```bash
# Editar .env
code .env
```

Agregar tu API key:
```env
AI_INTEGRATIONS_OPENAI_API_KEY=sk-tu-api-key-aqui
```

### 2. Iniciar Servidores

**Terminal 1:**
```bash
npm run dev
```

**Terminal 2:**
```bash
cd server/api_rag
python run_api.py
```

### 3. Acceder a la App

Cuando veas las notificaciones de puertos:
- Click "Open in Browser" para el puerto **5000**
- Accede a docs API en el puerto **8000**

## ✅ Checklist de Verificación

- [ ] Codespace creado y configurado
- [ ] Archivo `.env` tiene `AI_INTEGRATIONS_OPENAI_API_KEY`
- [ ] Terminal 1 ejecutando `npm run dev`
- [ ] Terminal 2 ejecutando `python run_api.py`
- [ ] Puerto 5000 abierto en navegador
- [ ] Aplicación cargando correctamente

## 💡 Comandos Útiles

```bash
# Ver status de servicios
ps aux | grep -E "node|python"

# Reiniciar todo
# Ctrl+C en ambas terminales, luego volver a ejecutar

# Verificar tipos
npm run check

# Ver logs detallados
npm run dev --verbose
```

## 🐛 Problemas Comunes

### "Cannot connect to RAG API"
→ Verifica que Terminal 2 está ejecutando Python

### "OpenAI API Key not found"
→ Revisa que `.env` tiene la variable configurada

### Puertos no se abren automáticamente
→ Ve a pestaña "Ports" y click derecho → "Open in Browser"

## 📚 Documentación Completa

Ver: [docs/CODESPACES.md](../../docs/CODESPACES.md)

---

¿Necesitas ayuda? Abre un [issue](https://github.com/rvalerio1992/ARIA-by-ProIngenius/issues).

