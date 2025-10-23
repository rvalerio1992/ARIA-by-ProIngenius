# Premium Banking CRM Platform

## Overview

This is a Premium Banking CRM platform designed for relationship managers handling high-value client portfolios. The system provides a comprehensive view of client relationships, predictive insights, intelligent recommendations, and an AI-powered conversational assistant (ARIA). The platform emphasizes data clarity, operational efficiency, and regulatory compliance while maintaining a professional banking interface. It is a full-stack TypeScript solution with a React frontend and Express backend, aiming to consolidate client data, automate relationship management, and provide actionable intelligence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend

- **Framework**: React with TypeScript (Vite).
- **UI Component System**: shadcn/ui (New York style) with Radix UI primitives, using Promerica brand colors and a professional banking aesthetic.
- **Styling**: Tailwind CSS with CSS variables for theming (light/dark mode support).
- **Routing**: Wouter.
- **State Management**: TanStack Query for server state.
- **Key Features**:
    - **Vista 360 (Client Detail View)**: Comprehensive client snapshot with relationship history, sentiment, and transactional data.
    - **Portfolio Management**: Aggregate views with predictive insights (churn risk, propensity scoring) and operational triggers.
    - **Campaign Recommendations**: Next Best Action (NBA+) engine with probability × value - risk scoring.
    - **ARIA Copilot**: Conversational AI interface with RAG for institutional knowledge.
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

### Session and Storage

- **connect-pg-simple**: PostgreSQL session store for Express (planned).