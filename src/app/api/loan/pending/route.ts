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
        if (!payload || (payload.role !== "ADMIN" && payload.role !== "SUPER_ADMIN" && payload.role !== "LOAN_OFFICER")) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const pendingLoans = await prisma.loan.findMany({
            where: { status: "PENDING" },
            include: {
                borrower: true,
                collateral: true,
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ success: true, loans: pendingLoans });
    } catch (error) {
        console.error("Fetch pending loans error:", error);
        return NextResponse.json({ error: "Failed to fetch loans" }, { status: 500 });
    }
}
