# Premium Banking CRM Platform

## Overview

This is a Premium Banking CRM platform designed for relationship managers handling high-value client portfolios. The system provides a comprehensive view of client relationships, predictive insights, intelligent recommendations, and an AI-powered conversational assistant (ARIA). The platform emphasizes data clarity, operational efficiency, and regulatory compliance while maintaining a professional banking interface inspired by Bloomberg Terminal and Carbon Design System.

The application is built as a full-stack TypeScript solution with a React frontend and Express backend, designed to consolidate client data, automate relationship management tasks, and provide actionable intelligence for premium banking executives.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool and development server.

**UI Component System**: Implements shadcn/ui component library (New York style) with Radix UI primitives for accessible, composable components. The design system follows a professional banking aesthetic with a Promerica brand color palette (deep forest green primary #006A4E, lime green accent #B8E986).

**Styling Strategy**: Tailwind CSS with CSS variables for theming. Supports both light and dark modes with theme switching capability. Custom HSL-based color system enables dynamic theme variations while maintaining brand consistency.

**Routing**: Client-side routing handled by Wouter (lightweight React Router alternative).

**State Management**: TanStack Query (React Query) for server state management with custom query client configuration. Query functions are centralized with error handling and credential management.

**Component Architecture**: 
- Modular components organized by feature (activity timelines, client profiles, recommendations, compliance badges)
- Reusable UI primitives in `components/ui/`
- Feature-specific components for portfolio management, campaign tracking, and AI copilot interface
- Example components demonstrate usage patterns for the design system

**Key Features**:
- **Vista 360 (Client Detail View)**: Comprehensive client snapshot with relationship history, sociodemographic profile, sentiment analysis, digital engagement metrics, and transactional behavior
- **Portfolio Management**: Aggregate views with predictive insights (churn risk, propensity scoring, CLV), operational triggers (document expirations, KYC/AML alerts), and market comparisons
- **Campaign Recommendations**: NBA+ (Next Best Action) engine with probability × value - risk scoring, respecting compliance policies and suitability requirements
- **ARIA Copilot**: Conversational AI interface with RAG (Retrieval-Augmented Generation) for institutional knowledge, trained on policies, products, and procedures
- **Compliance Integration**: Real-time KYC/AML/FATCA/PEP status monitoring with visual indicators and automated workflows

### Backend Architecture

**Framework**: Express.js server with TypeScript (ESM modules).

**API Structure**: RESTful API design with routes registered in `server/routes.ts`. Currently configured as a minimal setup with placeholder for route implementation.

**Development Tooling**: 
- Vite middleware integration for hot module replacement in development
- Custom logging middleware for API request/response tracking
- Error overlay plugin for development debugging

**Storage Layer**: Abstracted storage interface (`IStorage`) with in-memory implementation (`MemStorage`). Designed to support future database integration while maintaining clean separation of concerns.

**Session Management**: Infrastructure prepared for session handling (connect-pg-simple dependency suggests PostgreSQL-backed sessions planned).

**Build Strategy**: esbuild for production server bundling, compiling to ESM format with external packages.

### Data Storage Solutions

**ORM**: Drizzle ORM configured for PostgreSQL with Neon serverless driver via WebSocket connection.

**Database Provider**: Neon serverless PostgreSQL (indicated by `@neondatabase/serverless` dependency and connection pool setup).

**Schema Design**: 
- Type-safe schema definitions in `shared/schema.ts` using Drizzle's pg-core
- Zod integration for runtime validation (drizzle-zod)
- Current schema includes user authentication table with UUID primary keys

**Migration Strategy**: Drizzle Kit for schema migrations stored in `migrations/` directory with push-based deployment.

**Connection Management**: Connection pooling with WebSocket constructor for serverless environment compatibility.

### Authentication and Authorization

**Planned Implementation**: User authentication schema defined with username/password fields. Actual authentication routes and session management not yet implemented but infrastructure prepared (session storage dependencies present).

**Security Considerations**: Type-safe validation schemas using Zod, credential-based fetch requests configured in query client.

### Design System Philosophy

**Color Strategy**: Dual-mode (light/dark) theme with banking-appropriate palette. Light mode uses neutral backgrounds with Promerica green accents. Dark mode employs green-tinted dark backgrounds maintaining brand consistency.

**Typography**: Not fully specified in config but design guidelines reference professional banking aesthetics prioritizing scanability and information hierarchy.

**Interaction Patterns**: 
- Hover elevation effects for cards and interactive elements
- Consistent border treatments with opacity-based outlines
- Shadow system ranging from subtle (shadow-xs) to prominent (shadow-lg)
- Responsive design with mobile breakpoint at 768px

**Component Variants**: Extensive variant system for buttons (default, destructive, outline, secondary, ghost) and badges with size options (sm, default, lg, icon).

### RAG API Backend (Python/FastAPI)

**Framework**: FastAPI with uvicorn ASGI server running independently on port 8000.

**Architecture**: Separate Python backend providing RAG (Retrieval-Augmented Generation) capabilities and portfolio metrics calculation. Designed to run alongside the main Express/React application.

**Services**:
1. **RAG Service** (`rag_service.py`): 
   - ChromaDB persistent vector store with 926 indexed client profiles
   - OpenAI embeddings (text-embedding-3-small) for semantic search
   - GPT-4 integration for natural language query responses
   - Lazy initialization: only loads when first RAG query is made
   - Batch indexing (100 documents per batch) on first run
   - Vector store persists in `./rag_cartera` directory

2. **Metrics Service** (`metrics_service.py`):
   - Portfolio calculations using `metrics_config.json` definitions
   - Saldo calculations: captaciones (₡42.2M), colocaciones (₡10.9M), neto (₡31.3M)
   - No external dependencies - works without OpenAI API key
   - 926 client dataset from `row_cards.jsonl`

**Endpoints**:
- `GET /health` - Service health check and status
- `GET /ask?q={query}` - RAG-powered semantic search over clients (requires OpenAI key)
- `GET /metrics/saldo?tipo={neto|captaciones|colocaciones}` - Portfolio metrics
- `GET /metrics/saldo_por_producto` - Product-level breakdown
- `GET /metrics/summary` - Complete portfolio summary
- `GET /docs` - Interactive API documentation (Swagger UI)

**Data Files** (in `server/api_rag/data/`):
- `row_cards.jsonl` - 926 client profiles with demographic and financial data
- `portfolio_totals.json` - Pre-calculated portfolio aggregates
- `metrics_config.json` - Product/column definitions for captaciones and colocaciones
- `schema_card.json` - Response validation schema

**Execution**: 
```bash
cd server/api_rag
python3 run_api.py
```
Server available at http://0.0.0.0:8000 with interactive docs at /docs

**Security**: 
- CORS enabled for development (all origins)
- OpenAI API key managed via `AI_INTEGRATIONS_OPENAI_API_KEY` secret
- Graceful degradation: metrics endpoints work without OpenAI key

**Recent Changes (October 23, 2025)**:

**Phase 1: RAG API Backend (Python/FastAPI)**
- Implemented complete RAG API backend with FastAPI
- Added ChromaDB vector store with OpenAI embeddings
- Created metrics calculation service for portfolio analytics
- Comprehensive testing suite validates all endpoints
- README documentation with usage examples and deployment guide

**Phase 2: Full Data Integration (Express + React)**
- **Backend Express Enhancements**:
  - `server/data-loader.ts`: Client data loading service with 926 profiles from row_cards.jsonl
  - `server/ai-insights.ts`: GPT-4 powered 1:1 client analysis service with 4-section prompt (Snapshot Ejecutivo, Análisis de Comportamiento, Oportunidades Detectadas, Alertas y Riesgos)
  - **New API Endpoints** in `server/routes.ts`:
    - `GET /api/clients` - Paginated client list with filters (sector, age, income)
    - `GET /api/clients/stats` - Aggregate statistics (total: 926, sector breakdown)
    - `GET /api/clients/:id` - Individual client profile
    - `GET /api/clients/:id/insights` - AI-generated 1:1 analysis using GPT-4
    - `GET /api/metrics` - Portfolio metrics proxy with fallback
    - `GET /api/metrics/saldo` - Saldo breakdown proxy
    - `GET /api/rag/ask` - RAG conversational query proxy

- **Frontend React Enhancements**:
  - `pages/dashboard.tsx`: Real metrics display (₡42.2M captaciones, ₡10.9M colocaciones, ₡31.3M neto, 926 clients)
  - `pages/clients.tsx`: Client portfolio list with pagination (24/page), sector filters, and search
  - `pages/client-vista360.tsx`: Individual AI-powered Vista 360 with 4 analysis sections
  - Navigation: Added "Cartera Clientes" to sidebar with 926 badge
  - Routes: `/clients` (list) and `/clients/:id` (Vista 360) registered in App.tsx

- **Data Flow Architecture**:
  ```
  row_cards.jsonl (926 clients)
      ↓
  data-loader.ts (Express, in-memory cache)
      ↓
  routes.ts (REST API endpoints)
      ↓
  TanStack Query (React, client-side state)
      ↓
  UI Components (Dashboard, Clients List, Vista 360)
  ```

- **AI Insights System**:
  - Structured GPT-4 prompt generates JSON with 4 sections
  - Includes sociodemographic, financial, and behavioral analysis
  - Fallback: Returns profile data without AI when OpenAI unavailable
  - Query fixed: Vista 360 now correctly calls `/api/clients/:id/insights` endpoint

**Phase 3: Bug Fixes and E2E Testing**
- **Critical Bug Fixes**:
  - Fixed /api/metrics endpoint: Now returns 200 with fallback data instead of 500 when RAG API unavailable
  - Fixed clients list query: Corrected URL construction to use query params (?page=1&limit=24)
  - Fixed Vista 360 query: Added explicit queryFn to call correct insights endpoint
  
- **E2E Testing Results** (Playwright):
  - ✅ Dashboard displays real metrics correctly
  - ✅ Client list loads 24 cards with pagination
  - ✅ Vista 360 shows AI-generated 4-section analysis
  - ✅ Complete user journey validated: Dashboard → Clients → Vista 360
  - ⚠️ GPT-4 insights take ~4 seconds (expected behavior)
  
- **Fallback System**:
  - When RAG API Python (port 8000) is unavailable, Express backend serves hardcoded metrics
  - All frontend features work with or without RAG API
  - Graceful degradation ensures consistent UX

## External Dependencies

### Third-Party UI Libraries

- **Radix UI**: Complete suite of unstyled, accessible component primitives (accordion, alert-dialog, avatar, checkbox, collapsible, context-menu, dialog, dropdown-menu, hover-card, label, menubar, navigation-menu, popover, progress, radio-group, scroll-area, select, separator, slider, switch, tabs, toast, toggle, tooltip)
- **shadcn/ui**: Component library built on Radix UI with Tailwind styling
- **cmdk**: Command palette/menu component for keyboard-driven navigation
- **Lucide React**: Icon library for consistent iconography

### Data Fetching and State

- **TanStack Query v5**: Server state management with caching, background updates, and optimistic updates
- **React Hook Form**: Form state management with validation
- **@hookform/resolvers**: Validation resolver integration for React Hook Form
- **Zod**: TypeScript-first schema validation

### Database and ORM

- **Drizzle ORM v0.39**: Type-safe SQL query builder and ORM
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver
- **drizzle-zod**: Zod schema generation from Drizzle tables
- **ws**: WebSocket library for Neon serverless connection

### Build Tools and Development

- **Vite**: Frontend build tool and dev server with HMR
- **esbuild**: Fast JavaScript/TypeScript bundler for server builds
- **TypeScript**: Type safety across full stack
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS & Autoprefixer**: CSS processing pipeline
- **@replit Plugins**: Replit-specific development tools (runtime error modal, cartographer, dev banner)

### Utilities

- **class-variance-authority (cva)**: Type-safe variant management for components
- **clsx & tailwind-merge**: Utility for conditional className composition
- **date-fns**: Date manipulation and formatting
- **wouter**: Lightweight client-side routing
- **nanoid**: Unique ID generation

### Session and Storage

- **connect-pg-simple**: PostgreSQL session store for Express (prepared for future use)

### Development Dependencies

- **tsx**: TypeScript execution for development server
- **drizzle-kit**: Database migration and schema management CLI

### API Integration Points

While not currently implemented, the architecture anticipates:
- Internal bank policy/product knowledge base for RAG system
- Risk and compliance API endpoints
- Credit/legal department integration bridges
- KYC/AML verification services
- Market data feeds for macroeconomic context
- Email/SMS notification services for campaign execution