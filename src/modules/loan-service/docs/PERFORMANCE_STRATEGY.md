# Database Performance & Scalability Strategy — Phase 2

## 1. Indexing Strategy
To ensure sub-second response times for the dashboard and search queries, the following indexes are implemented:

*   **Financial Tracking:** `loan_code`, `repayment_code`, and `application_code` are indexed for O(1) lookups.
*   **Borrower Search:** `national_id` and `phone_number` are indexed to prevent duplicate profiles during onboarding.
*   **Operational Filters:** `loan_status`, `due_date`, and `payment_date` are indexed to optimize:
    *   Morning "Overdue Reports"
    *   Weekly "Disbursement Summaries"
    *   Monthly "Financial Reconciliation"

## 2. Optimized Query Patterns
*   **Soft Delete Filtering:** All application-level queries automatically append `WHERE deleted_at IS NULL` via a middleware layer (or logical wrapper) to ensure high-performance audit-friendly data retrieval.
*   **Selective Loading:** Relations (Collateral, Repayments) are generally fetched via Prisma's `include` only when necessary (e.g., in detail views), while list views use optimized JSON projections.

## 3. Data Archiving & Soft Deletes
*   The `deleted_at` field prevents hard deletion of financial records, satisfying continental compliance requirements for data retention.
*   Older `LoanAuditLog` entries can be moved to cold storage (historical partitions) after 24 months without affecting active loan operations.

## 4. Multi-Branch & AI Readiness
*   **Branching:** The schema supports `Organization` mapping, allowing GIIN to scale from one location to multiple distributed branches.
*   **AI Analytics:** The `purpose_of_loan` and `Startup stage` fields provide the unstructured and categorical data needed for future AI-driven creditworthiness scoring.
