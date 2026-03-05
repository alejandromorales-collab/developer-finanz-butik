# Finanz Butik® — Investment Marketplace Platform

> **Curated real-estate and alternative investment marketplace** that connects Investors with Developers, featuring project discovery, portfolio management, return simulation, and white-label client management.

---

## 1. Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | React + TypeScript | 18.3 / 5.8 |
| **Build Tool** | Vite (SWC) | 5.4 |
| **Styling** | Tailwind CSS + CSS Variables (HSL Design Tokens) | 3.4 |
| **Component Library** | shadcn/ui (Radix UI primitives) | — |
| **Icons** | Phosphor Icons (`@phosphor-icons/react`) | 2.1 |
| **Animation** | Framer Motion | 12.x |
| **Routing** | React Router DOM | 6.30 |
| **Server State** | TanStack React Query | 5.83 |
| **Forms** | React Hook Form + Zod | 7.61 / 3.25 |
| **Charts** | Recharts + custom SVG | 2.15 |
| **Testing** | Vitest + Testing Library + jsdom | 3.2 |
| **Typography** | Nunito (headings) + Inter (body) via Google Fonts |

### Design System Tokens (index.css)

| Token | Light | Purpose |
|-------|-------|---------|
| `--primary` | `187 89% 27%` (#067783 Teal) | Main CTA, active states |
| `--foreground` | `220 20% 14%` (Navy-Charcoal) | Text, dark backgrounds |
| `--muted` | `210 20% 96%` | Subtle backgrounds |
| `--gold` | `40 80% 55%` | Badges (coming soon) |
| `--success` | `160 60% 40%` | Positive returns |
| `--destructive` | `0 72% 51%` | Errors, sold out |

Button radius: `8px` · Container max-width: `1400px`

---

## 2. Architecture

```
src/
├── assets/                   # Static images (hero, generated)
├── components/
│   ├── ui/                   # shadcn/ui primitives (button, card, dialog…)
│   ├── Navbar.tsx            # Global nav — auth-aware, role-aware
│   ├── HeroSection.tsx       # Landing hero with CTA
│   ├── SuccessCases.tsx      # Project grid with category filters
│   ├── ProjectCard.tsx       # Reusable project card
│   ├── DeveloperSidebar.tsx  # Dashboard sidebar (Dev + Manager sections)
│   ├── NavLink.tsx           # Active-aware nav link
│   └── ProtectedRoute.tsx    # Role-based route guard
├── contexts/
│   └── AuthContext.tsx        # Mock auth (investor | developer)
├── data/
│   ├── mockProjects.ts        # Mutable project list
│   ├── mockPortfolio.ts       # Investor portfolio data
│   ├── mockClients.ts         # Managed clients + brand config
│   └── mockAnalytics.ts       # Developer KPIs
├── hooks/
│   └── use-toast.ts           # Toast notification hook
├── pages/
│   ├── Index.tsx              # Landing (Navbar + Hero + SuccessCases)
│   ├── ProjectSheet.tsx       # Full project detail + simulator
│   ├── Portfolio.tsx          # Investor portfolio dashboard
│   ├── Learn.tsx              # Educational content hub
│   ├── Login.tsx              # Role selection (mock auth)
│   ├── NotFound.tsx           # 404
│   └── developer/
│       ├── DeveloperLayout.tsx # Sidebar layout wrapper
│       ├── MyProjects.tsx      # Project list management
│       ├── UploadWizard.tsx    # 4-step project creation
│       ├── Analytics.tsx       # KPIs + charts
│       └── Profile.tsx         # KYC / profile settings
│   └── manager/
│       ├── Clients.tsx         # Client CRM table
│       ├── BrandSettings.tsx   # White-label config
│       └── Reports.tsx         # Report generation
├── services/
│   └── api.ts                 # API service class (fetch wrapper)
├── types/
│   └── api.ts                 # TypeScript interfaces (Project, Tier, etc.)
└── App.tsx                    # Route definitions + providers
```

### State Management

- **Auth**: React Context (`AuthContext`) — mock login with role selection
- **Server State**: TanStack React Query (ready, currently using mock data)
- **Project Data**: Mutable array in `mockProjects.ts` (persists in-session)
- **Forms**: Controlled state in wizard components

### Routing Map

| Path | Component | Access |
|------|-----------|--------|
| `/` | Index | Public |
| `/project/:slug` | ProjectSheet | Public |
| `/portfolio` | Portfolio | Auth (any) |
| `/learn` | Learn | Auth (any) |
| `/login` | Login | Public |
| `/developer` | DeveloperLayout > MyProjects | Developer only |
| `/developer/upload` | UploadWizard | Developer only |
| `/developer/analytics` | Analytics | Developer only |
| `/developer/profile` | Profile | Developer only |
| `/developer/clients` | Clients | Developer only |
| `/developer/brand` | BrandSettings | Developer only |
| `/developer/reports` | Reports | Developer only |

---

## 3. User Roles

| Role | Description | Accessible Modules |
|------|-------------|-------------------|
| **Investor** | Explores projects, manages portfolio, accesses educational content | Landing, Project Sheet, Portfolio, Learn |
| **Developer** | Publishes projects, monitors analytics, manages KYC, manages clients and brand | All of the above + Developer Dashboard + Client Manager |

> Auth is currently mock-based (`AuthContext`). Routes are guarded by `ProtectedRoute` with `allowedRoles` prop.

---

## 4. Modules & Features

### Module A: Public Marketplace
- Landing page with hero + CTA
- Project grid with category filters (Cash, Lend, Buy, Develop)
- Status badges (Active, Sold Out, Coming Soon, Waiting Approval)

### Module B: Project Sheet
- Image gallery mosaic (5 images)
- Project stats (term, rates, min investment)
- "Curated by" attribution with legal support badge
- **Return Simulator**: Investment amount × years → projected value with chart
- Investment Tiers table (multi-tier, multi-range)
- Documents section with download

### Module C: Investor Portfolio
- Summary cards (Total Invested, Current Value, Return %, Active)
- Portfolio growth chart (SVG line chart)
- Holdings table with status badges and return indicators

### Module D: Learn (Education Hub)
- Featured certification banner
- Article cards (image, category, read time)
- Video/Webinar list

### Module E: Developer Dashboard
- **My Projects**: List with status tags, view/edit actions, "New Project" CTA
- **Upload Wizard**: 4-step form (Basic Info → Financials → Media → Review) → toast + redirect
- **Analytics**: KPI cards + monthly bar chart + project performance progress bars
- **Profile/KYC**: Personal info, company details, document upload slots

### Module F: Client Manager (White-Label)
- **Clients CRM**: Searchable table (name, invested, deals, risk profile, activity)
- **Brand Settings**: Company name, color picker, custom domain, logo upload, live preview
- **Reports**: AUM summary, report template list with generate/download

---

## 5. Data Models (TypeScript Interfaces)

```typescript
Project {
  id, title, slug, status, category, thumbnailUrl, images[],
  termRange, annualInterestRateMin, annualInterestRateMax,
  minInvestment, currency, description, highlights[],
  curatedBy, legalSupport, tiers[], documents[], createdAt, updatedAt
}

InvestmentTier { id, name, years, ranges: TierRange[] }
TierRange { minAmount, maxAmount, interestRate }
ProjectDocument { id, name, date, downloadUrl }
SimulatorResult { investmentAmount, projectedValue, gain, gainPercentage, years, chartData[] }
PortfolioItem { id, projectName, category, invested, currentValue, returnRate, status, dates }
ManagedClient { id, name, email, totalInvested, activeDeals, riskProfile, lastActivity }
```

---

## 6. API Service Layer

The `ApiService` class (`src/services/api.ts`) is pre-wired with:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `getProjects(filters?)` | `GET /projects` | List with category/status/search filters |
| `getProject(slug)` | `GET /projects/:slug` | Single project detail |
| `simulate(projectId, amount, years)` | `POST /projects/:id/simulate` | Return simulation |

Base URL configurable via `VITE_API_BASE_URL` env variable.

---

## 7. Getting Started

```bash
npm install
npm run dev        # Dev server at localhost:5173
npm run build      # Production build
npm run test       # Run Vitest
```
