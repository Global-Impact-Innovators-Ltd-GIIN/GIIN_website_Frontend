# GIIN Loan Service - Database Extension Plan

## 1. Schema Extensions
The following models are added to `schema.prisma` to support the modular loan subsystem.

### **Borrower**
Encapsulates identifying information for loan applicants.
- `userId`: Optional link to core GIIN User.
- `nationalId`: Unique identifier (Required).
- `studentId`: Optional unique identifier for academic innovators.

### **Loan**
Core financial instrument mapping.
- `amount`: Principal value.
- `durationWeeks`: Repayment window.
- `interestRate`: Dynamic based on duration.
- `status`: PENDING, APPROVED, DISBURSED, ACTIVE, OVERDUE, REPAID, REJECTED.

### **Collateral**
Asset protection layer.
- `type`: DEVICE, VEHICLE, PROPERTY, OTHER.
- `status`: HELD, RELEASED, LIQUIDATED.

### **Repayment**
Tracking layer for incoming capital.
- `method`: MOBILE_MONEY, BANK_TRANSFER, CASH.

## 2. Integrity Rules
- **Foreign Keys:** All transactions MUST reference a `loanId`.
- **Audit Logs:** Every status change is recorded in `LoanActivityLog`.
- **Non-Destructive:** No existing tables are modified.

## 3. Implementation Status
- Models defined in `schema.prisma`.
- Migration ready to be applied.
