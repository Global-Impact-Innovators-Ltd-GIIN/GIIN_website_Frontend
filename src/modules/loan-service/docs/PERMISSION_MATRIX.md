# GIIN Loan Service — Permission Matrix

| Permission | Super Admin | Loan Manager | Loan Officer | Cashier | Recovery | Auditor |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **loan.view** | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| **loan.create** | ✔ | ✖ | ✔ | ✖ | ✖ | ✖ |
| **loan.edit** | ✔ | ✖ | ✔ | ✖ | ✖ | ✖ |
| **loan.delete** | ✔ | ✖ | ✖ | ✖ | ✖ | ✖ |
| **loan.approve** | ✔ | ✔ | ✖ | ✖ | ✖ | ✖ |
| **loan.reject** | ✔ | ✔ | ✖ | ✖ | ✖ | ✖ |
| **loan.repay** | ✔ | ✖ | ✖ | ✔ | ✖ | ✖ |
| **loan.generate.invoice** | ✔ | ✖ | ✖ | ✖ | ✖ | ✖ |
| **loan.generate.receipt** | ✔ | ✖ | ✖ | ✔ | ✖ | ✖ |
| **loan.manage.collateral** | ✔ | ✖ | ✔ | ✖ | ✖ | ✖ |
| **loan.manage.settings** | ✔ | ✖ | ✖ | ✖ | ✖ | ✖ |
| **loan.view.analytics** | ✔ | ✔ | ✖ | ✖ | ✔ | ✔ |
| **loan.export.reports** | ✔ | ✔ | ✖ | ✖ | ✖ | ✔ |

## Security Rules
1. **Financial Immutability:** Once a repayment is recorded, it cannot be modified by a Cashier. Only an Auditor or Super Admin can mark it for review.
2. **Approval Separation:** A Loan Officer can submit an application but CANNOT approve it. Approval requires a different account with `Loan Manager` or `Super Admin` role.
3. **Audit Enforcement:** Every permission check failure is logged as a `SYSTEM` security event for investigation.
