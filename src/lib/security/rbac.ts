/**
 * GIIN Role-Based Access Control (RBAC) Module
 * Defines roles and checks permissions across the enterprise platform.
 */

export type Role =
  | 'SUPER_ADMIN'      // Full system access
  | 'LOAN_MANAGER'     // Approvals, reporting, officer management
  | 'LOAN_OFFICER'     // Application review, borrower/collateral management
  | 'CASHIER'          // Repayments and receipts
  | 'RECOVERY_OFFICER' // Overdue tracking and collections
  | 'AUDITOR'          // Read-only system-wide audit
  | 'ADMIN'            // General organizational admin
  | 'USER'             // Standard platform user
  | 'GUEST';           // Unauthenticated

export type Permission =
  | 'loan.view'
  | 'loan.create'
  | 'loan.edit'
  | 'loan.delete'
  | 'loan.approve'
  | 'loan.reject'
  | 'loan.repay'
  | 'loan.generate.invoice'
  | 'loan.generate.receipt'
  | 'loan.manage.collateral'
  | 'loan.manage.settings'
  | 'loan.view.analytics'
  | 'loan.export.reports';

const RoleHierarchy: Record<Role, number> = {
  SUPER_ADMIN: 100,
  LOAN_MANAGER: 90,
  ADMIN: 80,
  AUDITOR: 75,
  LOAN_OFFICER: 70,
  CASHIER: 60,
  RECOVERY_OFFICER: 50,
  USER: 10,
  GUEST: 0
};

const RolePermissions: Record<Role, Permission[]> = {
  SUPER_ADMIN: [
    'loan.view', 'loan.create', 'loan.edit', 'loan.delete', 'loan.approve',
    'loan.reject', 'loan.repay', 'loan.generate.invoice', 'loan.generate.receipt',
    'loan.manage.collateral', 'loan.manage.settings', 'loan.view.analytics', 'loan.export.reports'
  ],
  LOAN_MANAGER: [
    'loan.view', 'loan.approve', 'loan.reject', 'loan.view.analytics', 'loan.export.reports'
  ],
  LOAN_OFFICER: [
    'loan.view', 'loan.create', 'loan.edit', 'loan.manage.collateral'
  ],
  CASHIER: [
    'loan.view', 'loan.repay', 'loan.generate.receipt'
  ],
  RECOVERY_OFFICER: [
    'loan.view', 'loan.view.analytics' // Specifically for overdue trends
  ],
  AUDITOR: [
    'loan.view', 'loan.view.analytics', 'loan.export.reports'
  ],
  ADMIN: ['loan.view'],
  USER: ['loan.view'],
  GUEST: []
};

export const RBACService = {
  hasPermission: (userRole: Role, requiredPermission: Permission): boolean => {
    if (userRole === 'SUPER_ADMIN') return true;
    return RolePermissions[userRole]?.includes(requiredPermission) || false;
  },

  hasRole: (userRole: Role, requiredRole: Role): boolean => {
    return RoleHierarchy[userRole] >= RoleHierarchy[requiredRole];
  },

  checkAccessOrThrow: (userRole: Role, requiredPermission: Permission) => {
    if (!RBACService.hasPermission(userRole, requiredPermission)) {
      throw new Error("RBAC_ACCESS_DENIED");
    }
  }
};
