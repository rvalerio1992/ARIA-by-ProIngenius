# Premium Banking CRM Platform - Design Guidelines

## Design Approach: Enterprise Financial System

**Selected Framework:** Professional Banking Interface inspired by Bloomberg Terminal and Carbon Design System
**Rationale:** Utility-focused financial application requiring data clarity, trust, and operational efficiency for relationship managers handling premium client portfolios.

**Core Principles:**
- Information hierarchy and scanability over visual flourish
- Professional trust through restrained color palette
- Dense data presentation with breathing room
- Consistent, predictable interaction patterns

---

## Color Palette - Promerica Banking Brand

**Light Mode (Primary):**
- Background Base: 0 0% 96% (Light gray)
- Surface Elevated: 0 0% 100% (White cards)
- Sidebar: 163 95% 18% (Deep Promerica Green)
- Border Subtle: 163 10% 85%
- Border Interactive: 163 10% 80%

**Dark Mode:**
- Background Base: 163 60% 8% (Dark green-tinted)
- Surface Elevated: 163 50% 12%
- Sidebar: 163 95% 12% (Deep green)
- Border Subtle: 163 30% 22%
- Border Interactive: 163 20% 32%

**Brand & Accent Colors:**
- Primary (Promerica Green): 163 100% 21% (#006A4E - Deep forest green)
- Accent (Lime Highlight): 88 64% 72% (#B8E986 - Fresh lime green)
- Success: 163 100% 28% (Green variant)
- Warning (Alert Amber): 38 92% 50%
- Danger (Risk Red): 0 72% 51%
- Chart Palette: Green-based spectrum from deep to lime

**Text Hierarchy:**
- Text Primary (Dark): 220 10% 95%
- Text Secondary (Dark): 220 8% 70%
- Text Tertiary (Dark): 220 6% 50%
- Text Primary (Light): 220 15% 12%
- Text Secondary (Light): 220 10% 35%
- Text Tertiary (Light): 220 8% 55%

---

## Typography

**Font Families:**
- Primary: 'Inter', system-ui, sans-serif (body, UI elements, data)
- Mono: 'JetBrains Mono', 'Courier New', monospace (numerical data, codes, IDs)

**Scale & Usage:**
- Hero/Dashboard Title: text-3xl font-semibold (client names, dashboard headers)
- Section Headers: text-xl font-semibold
- Subsection/Card Headers: text-lg font-medium
- Body/Data Labels: text-sm font-medium
- Body Text: text-sm font-normal
- Metadata/Timestamps: text-xs font-normal text-secondary
- Data Values (Mono): text-sm font-mono font-medium

---

## Layout System

**Spacing Primitives:** Use tailwind units of 2, 4, 6, 8, 12, 16, 24 for consistency
- Micro spacing (within components): p-2, gap-2, space-y-2
- Component padding: p-4, p-6
- Section spacing: p-8, py-12
- Major layout gaps: gap-6, gap-8

**Grid System:**
- Dashboard: 12-column responsive grid
- Two-column splits: 2:1 ratio (main content : sidebar)
- Card grids: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4

**Container Constraints:**
- Max-width: max-w-[1600px] (financial dashboards need width for data)
- Content areas: Generous horizontal padding px-6 lg:px-12

---

## Component Library

### Navigation & Shell
- **Top Navigation Bar:** Sticky header (h-16) with logo, global search, notifications, user profile
- **Sidebar Navigation:** Collapsible left sidebar (w-64) with module icons and labels, active state highlighting
- **Breadcrumbs:** Show hierarchical path (Client > Portfolio > Actions)

### Data Display Components
- **Client Profile Card:** Elevated surface with avatar, name (text-2xl), key metrics row, status badges
- **Metric Cards:** Grid of KPI cards showing value (text-2xl font-mono), label (text-sm), trend indicator (arrow + percentage)
- **Data Tables:** Striped rows, sortable columns, inline actions, pagination footer, sticky headers for long lists
- **Timeline/Activity Feed:** Vertical timeline with icons, timestamps, descriptions, actor information
- **Charts/Visualizations:** Line charts (portfolio value over time), bar charts (segment comparison), donut charts (allocation breakdown)

### Forms & Inputs
- **Input Fields:** Consistent height (h-10), border with focus ring, floating labels, helper text below
- **Select Dropdowns:** Same styling as inputs, chevron indicator, searchable for long lists
- **Date Pickers:** Calendar popup with range selection for filters
- **Toggle Switches:** For feature flags and boolean settings
- **All form backgrounds:** Match surface color in both dark/light modes - no bright white inputs in dark mode

### Interactive Elements
- **Primary CTA Buttons:** bg-primary, rounded-md, h-10, px-6, font-medium
- **Secondary Buttons:** variant="outline", same sizing
- **Icon Buttons:** Square (h-10 w-10), centered icon, hover background
- **Action Menus:** Dropdown with icon+label rows, dividers between groups

### Overlays
- **Modals:** Centered, max-w-2xl, backdrop blur, elevated shadow, close button top-right
- **Slide-out Panels:** Right-side panel (w-[480px]) for detailed views, client briefings, AI copilot
- **Toasts/Notifications:** Top-right stack, auto-dismiss, color-coded by type (success/warning/error)
- **Tooltips:** Dark background, small text, appear on hover for data points and icons

### Specialized Banking Components
- **Risk Indicators:** Color-coded badges (low/medium/high risk) with dot indicators
- **Compliance Badges:** Small pills showing KYC status, AML flags, FATCA alerts
- **Recommendation Cards:** Action item with priority score (circular progress), description, CTA button, dismiss option
- **Client Snapshot Widget:** Compact card showing photo, summary stats, last interaction, sentiment indicator
- **Portfolio Health Dashboard:** Multi-metric view with sparklines, percentage changes, alert icons

---

## Images

**Client Profile Images:**
- Circular avatars (h-12 w-12 for lists, h-20 w-20 for headers, h-32 w-32 for detailed profile)
- Placeholder: Initials on colored background (generated from client name)
- Border: Subtle border for definition

**Dashboard Hero Area:**
- No large hero image - this is a data-first application
- Optional: Subtle background gradient or pattern for visual interest without distraction
- Focus on welcome message and key actions/shortcuts

**Illustrative Icons:**
- Use Heroicons for consistent iconography throughout
- Financial-specific icons for modules (portfolio, recommendations, copilot, analytics)

---

## Animations

Minimal and purposeful only:
- Smooth transitions on navigation (duration-200)
- Fade-in for data loading states (duration-300)
- Slide animations for panels and modals (duration-300)
- Hover lift effect on interactive cards (translate-y-1)
- NO decorative scroll animations or parallax effects

---

## Accessibility & Responsiveness

- Maintain WCAG AA contrast ratios minimum
- Full keyboard navigation support
- Screen reader labels for all interactive elements
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- Mobile: Stack columns, collapsible sidebar, simplified tables with horizontal scroll
- Focus indicators: Prominent ring on all interactive elements

---

## Language & Localization

- All UI text in Spanish (labels, buttons, messages)
- Number formatting: European format (1.234.567,89)
- Date format: DD/MM/YYYY
- Currency: Support for multiple currencies (USD, EUR, local)