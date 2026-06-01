import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { JWTService } from "./jwt";
import { RBACService, Role, Permission } from "./rbac";

/**
 * Server-side Security Middleware for Loan Service
 */
export async function authenticate() {
    const cookieStore = await cookies();
    const token = cookieStore.get("next-auth.session-token")?.value;

    if (!token) return null;

    const payload = await JWTService.verify(token);
    return payload;
}

export function authorizeRole(payload: any, requiredRole: Role) {
    if (!payload || !payload.role) return false;
    return RBACService.hasRole(payload.role as Role, requiredRole);
}

export function authorizePermission(payload: any, requiredPermission: Permission) {
    if (!payload || !payload.role) return false;
    return RBACService.hasPermission(payload.role as Role, requiredPermission);
}

export function forbiddenResponse() {
    return NextResponse.json({ error: "Access Denied: Insufficient Privileges" }, { status: 403 });
}

export function unauthorizedResponse() {
    return NextResponse.json({ error: "Authentication Required" }, { status: 401 });
}
