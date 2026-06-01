# Database Integration Report — Phase 2

## 1. Analysis of Existing GIIN Data Architecture
The core GIIN platform uses a relational PostgreSQL schema managed via Prisma. 

*   **Users Table:** Reused as the high-level identity layer. Loan officers, cashiers, and borrowers with portal access are mapped to the primary `User` table.
*   **Borrower vs User:** Not all borrowers require a GIIN portal account immediately. Thus, the `Borrower` model acts as a standalone profile that *optionally* links to a `User` record via `userId`.
*   **Soft Deletes:** Standard cross-cutting concern. Implementation involves adding a `deletedAt DateTime?` field to all loan-related models.
*   **Naming Conventions:** Maintaining GIIN's camelCase convention in Prisma application logic while adhering to the specified data dictionary requirements.

## 2. Relationship Mapping
| Entity | Relation | Target | Description |
| :--- | :--- | :--- | :--- |
| **Borrower** | 1:N | **Loan** | One borrower can have multiple historical loans. |
| **Loan** | 1:N | **Repayment** | Tracking multiple installments per loan. |
| **Loan** | 1:1 | **Collateral** | Direct mapping of asset security per loan. |
| **Collateral** | 1:N | **CollateralImage**| Supporting multiple visual proof points of asset condition. |
| **Loan** | 1:N | **Receipt** | Legal proof of repayment for each installment. |
| **User** | 1:N | **Loan** | Captures "Approved By" and "Assigned To" metadata. |

## 3. Data Integrity & Validation
*   **Unique Constraints:** `loan_code`, `borrower_code`, and `application_code` are strictly unique to prevent financial collisions.
*   **Cascading Rules:** Deleting a Loan (soft delete) preserves Audit Logs but hides collateral images and repayments from active views.
*   **Audit Logic:** Every state transition (e.g., PENDING -> APPROVED) triggers a `LoanAuditLog` entry capturing the actor, the changed value, and the timestamp.

## 4. Scalability & AI Readiness
*   **Innovation Index:** The `Startup` industry Stage and Stage mappings are preserved to allow future AI credit scoring based on innovation output.
*   **Multi-Branch Mapping:** The `OrganizationId` from the GIIN core is ready to be utilized for branch-level loan reporting.
