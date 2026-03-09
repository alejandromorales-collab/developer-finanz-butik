# Finanz Butik® — User Stories & API Endpoints

> Organized by **Module :: EPIC**. Each story maps to required API endpoints.

---

## Module A :: Public Marketplace

### EPIC A1: Project Discovery

| ID | User Story | API Endpoint |
|----|-----------|--------------|
| A1.1 | As a visitor, I want to see a hero section with a CTA so I can understand the platform's value proposition | — (static content) |
| A1.2 | As a visitor, I want to browse a grid of investment projects so I can discover opportunities | `GET /api/projects` |
| A1.3 | As a visitor, I want to filter projects by category (Cash, Lend, Buy, Develop) so I can find relevant investments | `GET /api/projects?category={category}` |
| A1.4 | As a visitor, I want to see project status (Active, Sold Out, Coming Soon) so I can know availability | `GET /api/projects` (status field) |
| A1.5 | As a visitor, I want to see each project's key metrics (term, rate, min investment) in the card | `GET /api/projects` (summary fields) |
| A1.6 | As a visitor, I want to search projects by keyword so I can quickly find specific opportunities | `GET /api/projects?search={query}` |

### EPIC A2: Authentication

| ID | User Story | API Endpoint |
|----|-----------|--------------|
| A2.1 | As a visitor, I want to log in selecting my role (Investor / Developer) so I can access role-specific features | `POST /api/auth/login` |
| A2.2 | As an authenticated user, I want to see my name and a logout button in the navbar | `GET /api/auth/me` |
| A2.3 | As an authenticated user, I want to be redirected to login if I try to access a protected route | — (client-side guard) |
| A2.4 | As an unauthenticated user, I should NOT see Portfolio, Learn, or notification icons in the navbar | — (client-side guard) |

---

## Module B :: Project Sheet

### EPIC B1: Project Detail View

| ID | User Story | API Endpoint |
|----|-----------|--------------|
| B1.1 | As a visitor, I want to see a full image gallery mosaic for a project | `GET /api/projects/{slug}` → `images[]` |
| B1.2 | As a visitor, I want to see project term, annual interest rate range, and minimum investment | `GET /api/projects/{slug}` |
| B1.3 | As a visitor, I want to see who curated the project and if legal support is included | `GET /api/projects/{slug}` → `curatedBy`, `legalSupport` |
| B1.4 | As a visitor, I want to expand the project description to read highlights | `GET /api/projects/{slug}` → `highlights[]` |
| B1.5 | As a visitor, I want to share the project via a share button | — (client-side Web Share API) |
| B1.6 | As an investor, I want to save/bookmark a project for later | `POST /api/projects/{slug}/bookmark` |

### EPIC B2: Return Simulator

| ID | User Story | API Endpoint |
|----|-----------|--------------|
| B2.1 | As a visitor, I want to enter an investment amount and select a term (1-3 years) | — (client-side input) |
| B2.2 | As a visitor, I want to see the projected value, gain amount, and gain percentage | `POST /api/projects/{id}/simulate` `{amount, years}` → `SimulatorResult` |
| B2.3 | As a visitor, I want to see a growth chart visualizing returns over time | `POST /api/projects/{id}/simulate` → `chartData[]` |

### EPIC B3: Investment Tiers & Documents

| ID | User Story | API Endpoint |
|----|-----------|--------------|
| B3.1 | As an investor, I want to see the investment tiers with ranges and interest rates | `GET /api/projects/{slug}` → `tiers[]` |
| B3.2 | As an investor, I want to download project legal documents (Purchase Agreement, etc.) | `GET /api/documents/{id}/download` |

### EPIC B4: Investment Action

| ID | User Story | API Endpoint |
|----|-----------|--------------|
| B4.1 | As an investor, I want to see the minimum investment and an "Invest" CTA (or "Sold Out" if unavailable) | `GET /api/projects/{slug}` → `status`, `minInvestment` |
| B4.2 | As an investor, I want to initiate an investment by clicking the CTA | `POST /api/investments` `{projectId, amount, tierId}` |
| B4.3 | As an investor, I want a confirmation step before committing my investment | `POST /api/investments/confirm` `{investmentId}` |

---

## Module C :: Investor Portfolio

### EPIC C1: Portfolio Overview

| ID | User Story | API Endpoint |
|----|-----------|--------------|
| C1.1 | As an investor, I want to see my total invested, current value, total return %, and active count | `GET /api/portfolio/summary` |
| C1.2 | As an investor, I want to see a portfolio growth chart over time | `GET /api/portfolio/chart?period={months}` |
| C1.3 | As an investor, I want to see a table of all my investments with project name, category, invested, current value, return, and status | `GET /api/portfolio/investments` |
| C1.4 | As an investor, I want to filter my investments by status (Active, Matured, Pending) | `GET /api/portfolio/investments?status={status}` |

---

## Module D :: Learn (Education Hub)

### EPIC D1: Educational Content

| ID | User Story | API Endpoint |
|----|-----------|--------------|
| D1.1 | As an investor, I want to see a featured certification program banner | `GET /api/learn/featured` |
| D1.2 | As an investor, I want to browse educational articles by category (Basics, Strategy, Legal) | `GET /api/learn/articles?category={cat}` |
| D1.3 | As an investor, I want to watch webinars and video content | `GET /api/learn/videos` |
| D1.4 | As an investor, I want to track my progress in the certification program | `GET /api/learn/certification/progress` |

---

## Module E :: Developer Dashboard

### EPIC E1: Project Management

| ID | User Story | API Endpoint |
|----|-----------|--------------|
| E1.1 | As a developer, I want to see a list of all my published projects with status badges | `GET /api/developer/projects` |
| E1.2 | As a developer, I want to view a project's public page from the dashboard | — (client-side route to `/project/:slug`) |
| E1.3 | As a developer, I want to edit an existing project's details | `PUT /api/developer/projects/{id}` |
| E1.4 | As a developer, I want to see the total count of my projects | `GET /api/developer/projects` → `total` |

### EPIC E2: Project Upload Wizard

| ID | User Story | API Endpoint |
|----|-----------|--------------|
| E2.1 | As a developer, I want to create a new project via a 4-step wizard | — (client-side wizard UX) |
| E2.2 | As a developer, I want to fill in basic info (title, category, description) in Step 1 | — (form state) |
| E2.3 | As a developer, I want to enter financial details (min investment, interest rates, term, highlights) in Step 2 | — (form state) |
| E2.4 | As a developer, I want to upload thumbnail, gallery images, and legal documents in Step 3 | `POST /api/developer/projects/media` (multipart) |
| E2.5 | As a developer, I want to review all details before submitting in Step 4 | — (client-side review) |
| E2.6 | As a developer, I want to submit the project and receive a success confirmation toast | `POST /api/developer/projects` → `201 Created` |
| E2.7 | As a developer, I want my newly submitted project to appear in "My Projects" with a "Waiting Approval" tag | `GET /api/developer/projects` (status: `waiting_approval`) |

### EPIC E3: Analytics

| ID | User Story | API Endpoint |
|----|-----------|--------------|
| E3.1 | As a developer, I want to see KPIs: Total Raised, Active Projects, Total Investors, Avg Return | `GET /api/developer/analytics/summary` |
| E3.2 | As a developer, I want to see a monthly capital-raised bar chart | `GET /api/developer/analytics/monthly` |
| E3.3 | As a developer, I want to see per-project performance with progress bars (raised vs goal) | `GET /api/developer/analytics/projects` |

### EPIC E4: Profile & KYC

| ID | User Story | API Endpoint |
|----|-----------|--------------|
| E4.1 | As a developer, I want to edit my personal info (name, email, phone, country) | `PUT /api/developer/profile` |
| E4.2 | As a developer, I want to edit my company details (name, tax ID, description) | `PUT /api/developer/profile/company` |
| E4.3 | As a developer, I want to upload KYC documents (ID, proof of address, registration, financials) | `POST /api/developer/kyc/documents` (multipart) |
| E4.4 | As a developer, I want to see the verification status of each KYC document | `GET /api/developer/kyc/status` |

---

## Module F :: Client Manager (White-Label)

### EPIC F1: Client CRM

| ID | User Story | API Endpoint |
|----|-----------|--------------|
| F1.1 | As a developer, I want to see a table of all my managed clients with invested amount, deals, risk profile | `GET /api/manager/clients` |
| F1.2 | As a developer, I want to search clients by name | `GET /api/manager/clients?search={query}` |
| F1.3 | As a developer, I want to add a new client | `POST /api/manager/clients` |
| F1.4 | As a developer, I want to view a client's detail profile | `GET /api/manager/clients/{id}` |

### EPIC F2: Brand Settings (White-Label)

| ID | User Story | API Endpoint |
|----|-----------|--------------|
| F2.1 | As a developer, I want to set my company name and see a live preview | `GET /api/manager/brand` |
| F2.2 | As a developer, I want to choose a primary brand color via color picker | `PUT /api/manager/brand` |
| F2.3 | As a developer, I want to set a custom domain for my white-label portal | `PUT /api/manager/brand` `{domain}` |
| F2.4 | As a developer, I want to upload my company logo | `POST /api/manager/brand/logo` (multipart) |
| F2.5 | As a developer, I want to save all brand settings and receive confirmation | `PUT /api/manager/brand` → `200 OK` |

### EPIC F3: Reports

| ID | User Story | API Endpoint |
|----|-----------|--------------|
| F3.1 | As a developer, I want to see AUM, total clients, and reports generated this month | `GET /api/manager/reports/summary` |
| F3.2 | As a developer, I want to see available report templates | `GET /api/manager/reports/templates` |
| F3.3 | As a developer, I want to generate and download a report (PDF) | `POST /api/manager/reports/generate` `{templateId, params}` → PDF |

---

## API Endpoint Summary

| Method | Endpoint | Module |
|--------|----------|--------|
| `POST` | `/api/auth/login` | A |
| `GET` | `/api/auth/me` | A |
| `GET` | `/api/projects` | A, B |
| `GET` | `/api/projects/{slug}` | B |
| `POST` | `/api/projects/{id}/simulate` | B |
| `POST` | `/api/projects/{slug}/bookmark` | B |
| `GET` | `/api/documents/{id}/download` | B |
| `POST` | `/api/investments` | B |
| `POST` | `/api/investments/confirm` | B |
| `GET` | `/api/portfolio/summary` | C |
| `GET` | `/api/portfolio/chart` | C |
| `GET` | `/api/portfolio/investments` | C |
| `GET` | `/api/learn/featured` | D |
| `GET` | `/api/learn/articles` | D |
| `GET` | `/api/learn/videos` | D |
| `GET` | `/api/learn/certification/progress` | D |
| `GET` | `/api/developer/projects` | E |
| `POST` | `/api/developer/projects` | E |
| `PUT` | `/api/developer/projects/{id}` | E |
| `POST` | `/api/developer/projects/media` | E |
| `GET` | `/api/developer/analytics/summary` | E |
| `GET` | `/api/developer/analytics/monthly` | E |
| `GET` | `/api/developer/analytics/projects` | E |
| `PUT` | `/api/developer/profile` | E |
| `PUT` | `/api/developer/profile/company` | E |
| `POST` | `/api/developer/kyc/documents` | E |
| `GET` | `/api/developer/kyc/status` | E |
| `GET` | `/api/manager/clients` | F |
| `POST` | `/api/manager/clients` | F |
| `GET` | `/api/manager/clients/{id}` | F |
| `GET` | `/api/manager/brand` | F |
| `PUT` | `/api/manager/brand` | F |
| `POST` | `/api/manager/brand/logo` | F |
| `GET` | `/api/manager/reports/summary` | F |
| `GET` | `/api/manager/reports/templates` | F |
| `POST` | `/api/manager/reports/generate` | F |

---

**Total: 6 Modules · 14 EPICs · 47 User Stories · 34 API Endpoints**

---

## Module G :: Vendors Marketplace

> **DB:** MongoDB (Motor async) | **Backend:** FastAPI + Routes→Services→Repositories+Factories pattern | **Frontend:** `src/features/vendors/` · `src/features/marketplace/` · `src/features/messages/`

### EPIC G1: Vendor Onboarding

| ID | User Story | API Endpoint |
|----|-----------|--------------|
| G1.1 | As a service provider, I want to register as a Vendor so I can publish services and connect with investors | `POST /api/vendors/register` |
| G1.2 | As a service provider, I want to review and accept Vendor-specific T&C before operating | — (part of registration flow) |
| G1.3 | As an approved Vendor, I want to view and edit my company profile to keep my information updated | `GET /api/vendors/{id}` · `PATCH /api/vendors/{id}` |
| G1.4 | As a Vendor, I want to see my account status (Pending / Approved / Rejected) to know if I can operate | `GET /api/vendors/{id}/status` |

### EPIC G2: Service Management (Vendor)

| ID | User Story | API Endpoint |
|----|-----------|--------------|
| G2.1 | As an approved Vendor, I want to create a new service with text content so I can offer it to investors | `POST /api/vendors/{vendor_id}/services` |
| G2.2 | As an approved Vendor, I want to upload images to my service to make it more attractive | `POST /api/vendors/{vendor_id}/services/media` (multipart) |
| G2.3 | As a Vendor, I want to edit a draft or rejected service to correct information before review | `PATCH /api/services/{id}` |
| G2.4 | As an approved Vendor, I want to submit my draft service for admin review so it can be published | `POST /api/services/{id}/submit` |
| G2.5 | As a Vendor, I want to see all my services with their current status to manage my catalog | `GET /api/vendors/{vendor_id}/services` |

### EPIC G3: Services Marketplace (Investors/Clients)

| ID | User Story | API Endpoint |
|----|-----------|--------------|
| G3.1 | As an authenticated investor, I want to browse the vendor services marketplace to find service providers | `GET /api/services` |
| G3.2 | As an investor, I want to filter services by category to quickly find the type of provider I need | `GET /api/services?category={category}` |
| G3.3 | As an investor, I want to see the full detail of a vendor service to evaluate whether to contact the provider | `GET /api/services/{id}` |

### EPIC G4: Messaging Vendor ↔ Client

| ID | User Story | API Endpoint |
|----|-----------|--------------|
| G4.1 | As an authenticated investor, I want to send a message to a Vendor from their service page to inquire about the service | `POST /api/messages` |
| G4.2 | As an approved Vendor, I want to see and reply to client messages in my dashboard to manage inquiries | `GET /api/vendors/{id}/messages` · `POST /api/messages/{thread_id}/reply` |
| G4.3 | As an investor/client, I want to view and reply to Vendor messages in my inbox to follow up on service inquiries | `GET /api/clients/{id}/messages` |
| G4.4 | As a Vendor, I want to receive an email notification when a client messages me so I can respond promptly | — (async background task) |
| G4.5 | As a client, I want to receive an email notification when a Vendor replies so I stay informed | — (async background task) |

### EPIC G5: Admin Moderation (Vendors)

| ID | User Story | API Endpoint |
|----|-----------|--------------|
| G5.1 | As an admin, I want to see a list of pending vendors to review and moderate their applications | `GET /api/admin/vendors?status=pending` |
| G5.2 | As an admin, I want to approve a Vendor account so they can operate and publish services | `PATCH /api/admin/vendors/{id}/approve` |
| G5.3 | As an admin, I want to reject a Vendor with an explicit reason so they can correct their application | `PATCH /api/admin/vendors/{id}/reject` |
| G5.4 | As an admin, I want to see pending services for review to approve or reject their publication | `GET /api/admin/services?status=pending` |
| G5.5 | As an admin, I want to approve a Vendor service so it becomes immediately visible in the marketplace | `PATCH /api/admin/services/{id}/approve` |
| G5.6 | As an admin, I want to reject a service with a reason so the Vendor can correct and resubmit it | `PATCH /api/admin/services/{id}/reject` |
| G5.7 | As an admin, I want to assign a Vendor service to a specific investment opportunity to connect relevant providers with investors | `POST /api/admin/opportunities/{id}/vendor-services` |

### EPIC G6: Vendor Dashboard

| ID | User Story | API Endpoint |
|----|-----------|--------------|
| G6.1 | As an approved Vendor, I want to see a summary of client activity on my dashboard to understand the interest in my services | `GET /api/vendors/{id}/activity/summary` |

---

## Module G :: API Endpoint Summary

| Method | Endpoint | Module |
|--------|----------|--------|
| `POST` | `/api/vendors/register` | G |
| `GET` | `/api/vendors/{id}` | G |
| `PATCH` | `/api/vendors/{id}` | G |
| `GET` | `/api/vendors/{id}/status` | G |
| `GET` | `/api/vendors/{id}/activity/summary` | G |
| `GET` | `/api/vendors/{id}/messages` | G |
| `POST` | `/api/vendors/{vendor_id}/services` | G |
| `POST` | `/api/vendors/{vendor_id}/services/media` | G |
| `GET` | `/api/vendors/{vendor_id}/services` | G |
| `PATCH` | `/api/services/{id}` | G |
| `POST` | `/api/services/{id}/submit` | G |
| `GET` | `/api/services` | G |
| `GET` | `/api/services/{id}` | G |
| `POST` | `/api/messages` | G |
| `POST` | `/api/messages/{thread_id}/reply` | G |
| `GET` | `/api/clients/{id}/messages` | G |
| `GET` | `/api/admin/vendors` | G |
| `PATCH` | `/api/admin/vendors/{id}/approve` | G |
| `PATCH` | `/api/admin/vendors/{id}/reject` | G |
| `GET` | `/api/admin/services` | G |
| `PATCH` | `/api/admin/services/{id}/approve` | G |
| `PATCH` | `/api/admin/services/{id}/reject` | G |
| `POST` | `/api/admin/opportunities/{id}/vendor-services` | G |

---

**Total: 7 Modules · 20 EPICs · 72 User Stories · 57 API Endpoints**

> **Módulo G** generado con Gimena (RUN-003, 2026-03-09) · Work Plan en `WORKPLAN_RUN-003_2026-03-09.md`
> **Stack G:** FastAPI + MongoDB (Motor async) · Routes→Services→Repositories+Factories · React feature-based (`src/features/`) · TanStack Query · React Hook Form + Zod · MSW
