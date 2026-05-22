import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DeviceMonitor } from "@/lib/security/device";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET_KEY || "GIIN-Super-Secret-Enterprise-Key-2026!"
);

// Edge Proxy for Global API Gateway (Rate Limiting, Auth checking)
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect Admin and Leadership Routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/leadership/academy") || pathname.startsWith("/technology/dashboards") || pathname.startsWith("/multimedia/dashboards") || pathname.startsWith("/innovation/dashboards") || pathname.startsWith("/research/dashboards") || pathname.startsWith("/cyber/dashboards")) {
    const sessionCookie = request.cookies.get("next-auth.session-token");
    
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    try {
      // Real JWT verification at the edge
      await jwtVerify(sessionCookie.value, SECRET_KEY);
    } catch (error) {
      // Invalid token, force re-login
      const response = NextResponse.redirect(new URL("/auth/login", request.url));
      response.cookies.delete("next-auth.session-token");
      return response;
    }
  }

  // Global API Gateway Layer
  if (pathname.startsWith("/api/")) {
    const response = NextResponse.next();
    
    // OWASP Security Headers
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-XSS-Protection", "1; mode=block");
    response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    response.headers.set("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;");
    response.headers.set("x-giin-api-gateway", "active");

    // Device & Session Monitoring Hook
    const userAgent = request.headers.get("user-agent");
    const deviceContext = DeviceMonitor.parseUserAgent(userAgent);
    
    if (deviceContext.isBot && process.env.NODE_ENV === "production") {
       // Production bot mitigation
       return new NextResponse("Forbidden", { status: 403 });
    }

    return response;
  }

  // Inject OWASP headers for all HTML requests as well
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/:path*",
    "/leadership/academy/:path*",
    "/technology/dashboards/:path*",
    "/multimedia/dashboards/:path*",
    "/innovation/dashboards/:path*",
    "/research/dashboards/:path*",
    "/cyber/dashboards/:path*"
  ]
};
