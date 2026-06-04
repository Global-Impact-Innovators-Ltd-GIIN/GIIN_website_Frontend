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
        if (!payload || !["ADMIN", "SUPER_ADMIN", "LOAN_OFFICER", "AUDITOR"].includes(payload.role as string)) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const activeLoans = await prisma.loan.findMany({
            where: {
                status: { in: ["ACTIVE", "PARTIAL", "OVERDUE"] }
            },
            include: {
                borrower: true,
                collateral: true,
            },
            orderBy: { dueDate: "asc" },
        });

        return NextResponse.json({ success: true, loans: activeLoans });
    } catch (error) {
        console.error("Fetch active loans error:", error);
        return NextResponse.json({ error: "Failed to fetch loans" }, { status: 500 });
    }
}
