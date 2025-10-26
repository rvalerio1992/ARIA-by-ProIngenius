# Premium Banking CRM Platform

## Overview

This is a Premium Banking CRM platform designed for relationship managers handling high-value client portfolios. The system provides a comprehensive view of client relationships, predictive insights, intelligent recommendations, and an AI-powered conversational assistant (ARIA). The platform emphasizes data clarity, operational efficiency, and regulatory compliance while maintaining a professional banking interface. It is a full-stack TypeScript solution with a React frontend and Express backend, aiming to consolidate client data, automate relationship management, and provide actionable intelligence.

## User Preferences

- Preferred communication style: Simple, everyday language.
- Executive user name: Victor Hugo Pavon (used throughout the application)
- Currency: USD ($) for all monetary displays
  - Client income ("Ingreso Mensual") displays in USD without conversion
  - Consistent formatting between income card and Snapshot Ejecutivo (both show same value, e.g., $5,395)
  - All AI-generated insights use USD currency format
- Language: Spanish for all user-facing content
- Number formatting: Percentages show 1 decimal place for clarity

## System Architecture

### Frontend

- **Framework**: React with TypeScript (Vite).
- **UI Component System**: shadcn/ui (New York style) with Radix UI primitives, using Promerica brand colors and a professional banking aesthetic.
- **Styling**: Tailwind CSS with CSS variables for theming (light/dark mode support).
- **Routing**: Wouter.
- **State Management**: TanStack Query for server state.
- **Key Features**:
    - **Análisis de Cartera (Dashboard)**: ARIA-centric main dashboard with personalized welcome, 4 key metrics (Saldos Pasivos, Saldos Activos, Contribución Neta, Alta Vinculación) with YTD goal comparisons in USD. Features Financial Metrics Widget (Tasa Pasiva Ponderada 5.2%, Tasa Activa Ponderada 9.8%, Margen Financiero Promedio 4.6%, Mora >90 días 3.8%) and prominent ARIA Action Buttons directing users to AI-powered features (Enfoque 1:1 and Enfoque Campaña). Loads instantly without analysis loaders.
    - **Vista 360 (Client Detail View)**: Comprehensive client snapshot with relationship history, sentiment, transactional data, MCC consumption charts, card usage history, and key indicators (risk level, main bank, new products, cancellations). Includes ARIA System Prompt Viewer showing the perfected mega prompt v1.1 used to generate each 1:1 analysis, demonstrating transparency in AI-driven insights.
    - **Enfoque Campaña**: Next Best Action (NBA+) engine with probability × value - risk scoring, aligned with dashboard goals. Includes ARIA Campaign System Prompt Viewer showing the specialized mega prompt v1.0 for strategic campaign analysis combining segmentation, predictive models, and ROI prioritization.
    - **ARIA Responde**: Conversational AI interface querying PostgreSQL directly with GPT-4o, providing professional Spanish banking responses.
    - **Notificaciones**: Intelligent alert system with 16 categorized notifications (Oportunidades, Riesgos, Metas, Acciones Pendientes) powered by ARIA. Features priority-based alerts and actionable insights aligned with portfolio management goals.
    - **Compliance Integration**: Real-time KYC/AML/FATCA/PEP monitoring.
    - **AI-Powered Loaders**: Premium animated analysis loaders (ARIAAnalysisLoader for client details, ARIACampaignAnalysisLoader for campaigns) showcasing generative AI capabilities. Dashboard loads instantly without analysis animation.

### Backend

- **Framework**: Express.js with TypeScript (ESM modules).
- **API Structure**: RESTful API.
- **Storage Layer**: Abstracted `IStorage` interface with in-memory implementation (`MemStorage`), designed for future database integration.

### Data Storage

- **ORM**: Drizzle ORM for PostgreSQL.
- **Database Provider**: Neon serverless PostgreSQL.
- **Schema Design**: Type-safe schema definitions using Drizzle's pg-core and Zod for validation.
- **Migration Strategy**: Drizzle Kit.

### Authentication and Authorization

- User authentication schema defined; session management infrastructure prepared.

### Design System Philosophy

- **Color Strategy**: Dual-mode (light/dark) theme with Promerica green palette.
- **Interaction Patterns**: Hover effects, consistent borders, shadow system, and responsive design.
- **Component Variants**: Extensive variant system for buttons and badges.

### RAG API Backend (Python/FastAPI)

- **Framework**: FastAPI with uvicorn.
- **Architecture**: Separate Python backend for RAG and portfolio metrics calculation.
- **Services**:
    - **RAG Service**: ChromaDB vector store, OpenAI embeddings, GPT-4 integration for semantic search over client profiles.
    - **Metrics Service**: Portfolio calculations using `metrics_config.json`.
- **ARIA Responde Conversational Assistant**: GPT-4o powered analyzer for query intent, SQL query generation, and natural language response generation (Spanish banking tone). Directly queries PostgreSQL via Drizzle ORM.
- **Security**: CORS enabled for development, OpenAI API key via Replit secrets, DOMPurify for HTML sanitization in frontend responses.

## External Dependencies

### Third-Party UI Libraries

- **Radix UI**: Unstyled, accessible component primitives.
- **shadcn/ui**: Component library built on Radix UI.
- **cmdk**: Command palette component.
- **Lucide React**: Icon library.
- **recharts**: Chart library for data visualization.

### Data Fetching and State

- **TanStack Query v5**: Server state management.
- **React Hook Form**: Form state management with validation.
- **Zod**: TypeScript-first schema validation.

### Database and ORM

- **Drizzle ORM v0.39**: Type-safe SQL query builder.
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver.
- **drizzle-zod**: Zod schema generation from Drizzle tables.
- **ws**: WebSocket library for Neon connection.

### Build Tools and Development

- **Vite**: Frontend build tool.
- **esbuild**: JavaScript/TypeScript bundler for server.
- **TypeScript**: Type safety.
- **Tailwind CSS**: Utility-first CSS framework.

### Utilities

- **class-variance-authority (cva)**: Type-safe variant management.
- **clsx & tailwind-merge**: Conditional className composition.
- **date-fns**: Date manipulation.
- **wouter**: Lightweight client-side routing.
- **nanoid**: Unique ID generation.
- **DOMPurify**: HTML sanitization for XSS protection.

### Session and Storage

- **connect-pg-simple**: PostgreSQL session store for Express (planned).