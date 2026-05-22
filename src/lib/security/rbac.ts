/**
 * GIIN Role-Based Access Control (RBAC) Module
 * Defines roles and checks permissions across the enterprise platform.
 */

export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'USER' | 'GUEST';

const RoleHierarchy: Record<Role, number> = {
  SUPER_ADMIN: 100,
  ADMIN: 80,
  EDITOR: 50,
  USER: 10,
  GUEST: 0
};

export const RBACService = {
  hasPermission: (userRole: Role, requiredRole: Role): boolean => {
    return RoleHierarchy[userRole] >= RoleHierarchy[requiredRole];
  },

  checkAccessOrThrow: (userRole: Role, requiredRole: Role) => {
    if (!RBACService.hasPermission(userRole, requiredRole)) {
      throw new Error("RBAC_ACCESS_DENIED");
    }
  }
};
