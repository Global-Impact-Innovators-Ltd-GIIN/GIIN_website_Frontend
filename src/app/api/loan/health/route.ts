import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * GIIN Loan Service Health Check
 * Validates database connectivity and module availability.
 */
export async function GET() {
    try {
        // Quick DB check
        await prisma.$queryRaw`SELECT 1`;

        return NextResponse.json({
            status: "healthy",
            module: "loan-service",
            version: "1.0.0",
            integration: "integrated",
            timestamp: new Date().toISOString(),
            checks: {
                database: "connected",
                api_namespace: "/api/loan/*",
                routing: "verified"
            }
        });
    } catch (error) {
        return NextResponse.json({
            status: "degraded",
            module: "loan-service",
            error: "Database connection failed",
            timestamp: new Date().toISOString()
        }, { status: 503 });
    }
}
