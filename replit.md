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