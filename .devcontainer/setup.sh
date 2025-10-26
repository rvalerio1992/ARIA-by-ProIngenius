#!/bin/bash

echo "================================================"
echo "🚀 Configurando ARIA Banking CRM en Codespaces"
echo "================================================"
echo ""

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 1. Instalar dependencias de Node.js
echo -e "${BLUE}📦 Instalando dependencias de Node.js...${NC}"
npm install
echo -e "${GREEN}✓ Dependencias de Node.js instaladas${NC}"
echo ""

# 2. Instalar dependencias de Python
echo -e "${BLUE}🐍 Instalando dependencias de Python...${NC}"
cd server/api_rag
pip install --no-cache-dir fastapi uvicorn chromadb openai pydantic python-dotenv
cd ../..
echo -e "${GREEN}✓ Dependencias de Python instaladas${NC}"
echo ""

# 3. Crear archivo .env si no existe
if [ ! -f .env ]; then
    echo -e "${YELLOW}📝 Creando archivo .env desde template...${NC}"
    if [ -f env.example ]; then
        cp env.example .env
        echo -e "${GREEN}✓ Archivo .env creado${NC}"
        echo -e "${YELLOW}⚠️  IMPORTANTE: Configura tus variables de entorno en .env${NC}"
    else
        echo -e "${YELLOW}⚠️  env.example no encontrado, creando .env básico...${NC}"
        cat > .env << 'EOF'
# Base de datos (opcional para modo local)
DATABASE_URL=

# OpenAI API Key (requerido para funciones de IA)
AI_INTEGRATIONS_OPENAI_API_KEY=

# URLs de servicios
RAG_API_URL=http://localhost:8000
PORT=5000
HOST=0.0.0.0
NODE_ENV=development
EOF
        echo -e "${GREEN}✓ Archivo .env básico creado${NC}"
    fi
else
    echo -e "${GREEN}✓ Archivo .env ya existe${NC}"
fi
echo ""

# 4. Información de puertos
echo -e "${BLUE}🌐 Configuración de puertos:${NC}"
echo "  - Backend + Frontend: http://localhost:5000"
echo "  - API RAG Python: http://localhost:8000"
echo "  - Docs API: http://localhost:8000/docs"
echo ""

# 5. Instrucciones finales
echo "================================================"
echo -e "${GREEN}✅ Configuración completada${NC}"
echo "================================================"
echo ""
echo -e "${YELLOW}📋 Próximos pasos:${NC}"
echo ""
echo "1. Configura tus variables de entorno en .env:"
echo "   - AI_INTEGRATIONS_OPENAI_API_KEY (para funciones de IA)"
echo "   - DATABASE_URL (opcional, deja vacío para modo local)"
echo ""
echo "2. Inicia los servidores en terminales separadas:"
echo ""
echo -e "   ${BLUE}Terminal 1:${NC}"
echo "   $ npm run dev"
echo ""
echo -e "   ${BLUE}Terminal 2:${NC}"
echo "   $ cd server/api_rag"
echo "   $ python run_api.py"
echo ""
echo "3. Abre la aplicación en el navegador cuando aparezcan los URLs"
echo ""
echo -e "${GREEN}¡Listo para desarrollar! 🎉${NC}"
echo ""

