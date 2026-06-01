# GIIN Loan Service Integration Architecture

## 1. Core Architecture Detection
The GIIN platform is built on a modern Next.js Full-stack architecture using the App Router.

*   **Frontend:** React 19, Tailwind CSS, Framer Motion (Animations), Lucide (Icons), Radix UI (Base Components).
*   **Backend:** Next.js Route Handlers (API), Prisma ORM (Relational Mapping).
*   **Security:** JWT-based session management, cookies-based persistence, RBAC (Role-Based Access Control).
*   **Database:** PostgreSQL (Supabase) managed via Prisma.

## 2. Integration Strategy (Modular Subsystem)
The Loan Service is implemented as a **pluggable module** residing in `/src/modules/loan-service`. This ensures that the core GIIN platform remains untouched, and the loan system can be enabled/disabled by simply adding/removing the entry points in `src/app/loan`.

### **Namespace Mapping**
*   **Routes:** All loan-related UI is prefixed with `/loan/*`.
*   **APIs:** All loan-related logic is prefixed with `/api/loan/*`.

### **Integration Points**
1.  **Navbar:** Injected via `NavigationConfig.ts` under the "Capital" megamenu.
2.  **Authentication:** Extends existing JWT tokens with loan-specific roles (`LOAN_OFFICER`, `CASHIER`, etc.).
3.  **Theme System:** Uses existing `globals.css` variables for colors (`--primary`, `--accent`, etc.) to ensure 100% visual consistency.

## 3. Modular Folder Structure
```
/src/modules/loan-service/
├── docs/                # Documentation and maps
├── components/          # Module-specific UI (Calculators, Form steps)
├── hooks/               # useLoanTracking, useRepayment
├── services/            # Business logic (Interest calculation, Amortization)
├── types/               # Type definitions for applications and collateral
├── utils/               # Formatting and validation
└── server/              # Server-side logic (Middleware, RBAC guards)
```

## 4. Permission Model
Extensions to the existing GIIN RBAC System:
- **loan_access:** Standard user permission to apply for loans.
- **loan_officer:** Permission to inspect collateral and approve/reject applications.
- **loan_cashier:** Permission to disburse funds and record physical repayments.
- **loan_admin:** Full oversight and reporting access.

## 5. Non-Breaking Guarantees
- **No Root Modifications:** The root `layout.tsx` is preserved.
- **Encapsulated Styles:** No global CSS modifications; only scoped Tailwind utilities or CSS modules.
- **Atomic Migrations:** Database extensions add new tables only and do not alter existing `User` or `Account` schemas except via optional relations.
