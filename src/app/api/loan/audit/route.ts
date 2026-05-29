import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { JWTService } from "@/lib/security/jwt";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("next-auth.session-token");
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const payload = await JWTService.verify(token.value);
        if (!payload || !["ADMIN", "SUPER_ADMIN", "AUDITOR"].includes(payload.role as string)) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const auditLogs = await prisma.loanActivityLog.findMany({
            include: {
                loan: {
                    include: { borrower: true }
                },
                user: true,
            },
            orderBy: { createdAt: "desc" },
            take: 100,
        });

        return NextResponse.json({ success: true, logs: auditLogs });
    } catch (error) {
        console.error("Audit log error:", error);
        return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 });
    }
}
