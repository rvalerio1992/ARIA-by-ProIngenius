# Premium Banking CRM Platform

## Overview

This is a Premium Banking CRM platform designed for relationship managers handling high-value client portfolios. The system provides a comprehensive view of client relationships, predictive insights, intelligent recommendations, and an AI-powered conversational assistant (ARIA). The platform emphasizes data clarity, operational efficiency, and regulatory compliance while maintaining a professional banking interface. It is a full-stack TypeScript solution with a React frontend and Express backend, aiming to consolidate client data, automate relationship management, and provide actionable intelligence.

## User Preferences

- Preferred communication style: Simple, everyday language.
- Executive user name: Victor Hugo Pavon (used throughout the application)
- Currency: USD ($) for all monetary displays
- Language: Spanish for all user-facing content

## System Architecture

### Frontend

- **Framework**: React with TypeScript (Vite).
- **UI Component System**: shadcn/ui (New York style) with Radix UI primitives, using Promerica brand colors and a professional banking aesthetic.
- **Styling**: Tailwind CSS with CSS variables for theming (light/dark mode support).
- **Routing**: Wouter.
- **State Management**: TanStack Query for server state.
- **Key Features**:
    - **Análisis de Cartera (Dashboard)**: Main dashboard with personalized welcome for Victor Hugo Pavon, showing key metrics (Saldos Pasivos, Saldos Activos, Contribución Neta) with YTD goal comparisons in USD. Includes "Oportunidades del día" widget and Portfolio Management metrics (Margen Financiero Promedio, % Clientes Principalidad Alta, % Mora >90 días).
    - **Vista 360 (Client Detail View)**: Comprehensive client snapshot with relationship history, sentiment, transactional data, MCC consumption charts (top 5 categories), card usage history (6-month trend), and key indicators (risk level, main bank, new products, cancellations).
    - **Portfolio Management**: Aggregate views with predictive insights (churn risk, propensity scoring) and operational triggers.
    - **Campaign Recommendations**: Next Best Action (NBA+) engine with probability × value - risk scoring.
    - **ARIA Responde**: Conversational AI interface querying PostgreSQL directly with GPT-4o, providing professional Spanish banking responses with HTML sanitization (DOMPurify).
    - **Compliance Integration**: Real-time KYC/AML/FATCA/PEP monitoring.

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
- **Architecture**: Separate Python backend for RAG and portfolio metrics calculation, running independently.
- **Services**:
    - **RAG Service**: ChromaDB vector store, OpenAI embeddings, GPT-4 integration for semantic search over client profiles.
    - **Metrics Service**: Portfolio calculations using `metrics_config.json`, working without OpenAI API key.
- **ARIA Responde Conversational Assistant**: GPT-4o powered analyzer for query intent, SQL query generation, and natural language response generation (Spanish banking tone). Directly queries PostgreSQL via Drizzle ORM.
- **Security**: CORS enabled for development, OpenAI API key via Replit secrets, DOMPurify for HTML sanitization in frontend responses.

## External Dependencies

### Third-Party UI Libraries

- **Radix UI**: Unstyled, accessible component primitives.
- **shadcn/ui**: Component library built on Radix UI.
- **cmdk**: Command palette component.
- **Lucide React**: Icon library.

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
- **recharts**: Chart library for data visualization (MCC consumption, card usage history).
- **DOMPurify**: HTML sanitization for XSS protection in ARIA responses.

### Session and Storage

- **connect-pg-simple**: PostgreSQL session store for Express (planned).

## Recent Changes (October 25, 2025)

### Dashboard Rebranding to "Análisis de Cartera"
- Module renamed from "Dashboard" to "Análisis de Cartera" throughout the application
- Personalized welcome message: "Bienvenido Victor Hugo Pavon · ARIA te ha preparado tu resumen inteligente"
- Sidebar and footer updated with executive name: Victor Hugo Pavon

### Currency Migration: Colones (₡) → USD ($)
- All monetary displays converted from Costa Rican colones to US dollars
- Dashboard metrics now show values in millions of USD (e.g., "$42.2M")
- Ingreso mensual in Vista 360 converted with approximate exchange rate (×0.0018)

### Metrics Renaming and YTD Goals
- **Captaciones** → **Saldos Pasivos** (with YTD goal: $40.0M)
- **Colocaciones** → **Saldos Activos** (with YTD goal: $11.0M)
- **Saldo Neto** → **Contribución Neta** (invented value: $45.3M, YTD goal: $44.0M)
- Each metric displays percentage variance vs. YTD goal with trend indicators

### Campaign Widget Update
- "Resumen Enfoque Campaña" renamed to **"Oportunidades del día"**
- Maintains same functionality: displays top 3 active campaigns with impact metrics

### Portfolio Management Metrics Replacement
- **Old metrics**: Salud, Δ Saldo 30d, Riesgo Alto, Contactados ≤30d
- **New metrics**:
  - **Margen Financiero Promedio**: 4.25% (spread between passive and active rates)
  - **% Clientes Principalidad Alta**: 62% (clients with high principal relationship)
  - **% Mora >90 días**: 3.8% (clients with >90 day delinquency)
- Color-coded thresholds for each metric (green/yellow/red)

### Vista 360 Enhancements
1. **New Indicators (Badge System)**:
   - **Nivel de Riesgo**: Badge showing "Bajo/Medio/Alto" with color coding (green/yellow/red)
   - **Banco Principal**: Badge indicating main banking relationship (Promerica highlighted in accent color)
   - **Nuevos Productos**: Badge showing products acquired in last 30 days (e.g., "+2 productos (30d)")
   - **Cancelaciones**: Badge showing products cancelled in last 30 days

2. **MCC Consumption Chart** (`mcc-consumption-chart.tsx`):
   - Recharts bar chart showing top 5 merchant categories
   - Mock data: Supermercados ($2,850), Restaurantes ($1,920), Gasolineras ($1,540), Farmacias ($980), Entretenimiento ($720)
   - Color-coded bars using chart color palette
   - Custom tooltip with category and amount

3. **Card Usage History Chart** (`card-usage-history-chart.tsx`):
   - Recharts dual-axis line chart for 6-month trend
   - Left axis: Number of transactions
   - Right axis: Transaction amounts in USD
   - Mock data showing monthly variations
   - Legend and custom tooltip

### Security Enhancement
- DOMPurify integration in ARIA Responde copilot panel
- Strict HTML allowlist: only `<p>`, `<strong>`, `<br>`, `<ul>`, `<ol>`, `<li>` tags permitted
- XSS protection for all AI-generated responses

### Dashboard Metrics Aesthetic Improvements (October 26, 2025)
- **Percentage Formatting**: All percentages now display with only 1 decimal place for clarity (e.g., "5.5%" instead of "5.4917611250000007%")
- **Status Badges**: Added visual status indicators on all financial metrics:
  - "Sobre meta" (green badge) when exceeding YTD goal
  - "Bajo meta" (red badge) when below YTD goal
- **Fourth Metric Replacement**: Changed "Total Clientes" (926) to "% Clientes con Alta Principalidad" (62%) with YTD goal of 60%
- **Visual Alignment Fix**: Applied consistent minimum height (170px) and flexbox layout to all MetricCard components to eliminate visual descuadre (misalignment)

### Campaign System Realignment (October 26, 2025)
- **Oportunidades del día**: Campaigns now directly aligned with dashboard goals
  - Impulso Colocaciones - Créditos Personales (Saldos Activos)
  - Colocación de Cuenta Alto Rendimiento - Clientes Alto Potencial Ahorradores (Saldos Pasivos)
  - Colocación Hipotecaria - Segmento Alto (Saldos Activos)
  - Upselling Principalidad - Multi-producto (Alta Principalidad)
  - Retención Pasivos - Inversiones Q2 (Contribución Neta)
  - Cross-sell Tarjetas Premium (Contribución Neta)
- **Enfoque Campaña Module**: Updated to match dashboard campaigns with explicit references to meta YTD values
- **Coherence**: "Ver Todas las Campañas" button now leads to consistent campaign data
- Each campaign description explicitly mentions which dashboard goal it supports

### Portfolio Management Simplification (October 26, 2025)
- **Reduced from 3 to 2 metrics** for clearer visual presentation:
  - ✅ Margen Financiero Promedio (4.25%)
  - ✅ Mora Mayor a 90 días (3.8%)
  - ❌ Removed: % Clientes Principalidad Alta (now in main dashboard metrics)
- **Improved layout**: Grid layout with gap-4 for better spacing and visual balance

### Component Updates
- **MetricCard**: 
  - Added optional `subtitle` prop for YTD goal display
  - Added optional `status` prop with badge display (success/warning/neutral types)
  - Implemented consistent height with flexbox layout (min-h-[170px])
  - Automatic 1-decimal formatting for trend percentages (.toFixed(1))
- **CampaignSummaryWidget**: Title updated to "Oportunidades del día"
- **PortfolioHealthWidget**: Complete metric replacement with new financial indicators
- **AppSidebar**: Updated menu item and footer with Victor Hugo Pavon name