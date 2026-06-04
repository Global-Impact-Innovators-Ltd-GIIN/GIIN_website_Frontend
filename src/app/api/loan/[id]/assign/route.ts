import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { JWTService } from "@/lib/security/jwt";
import { AuditLogger } from "@/lib/audit";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { recoveryOfficerId } = await req.json();
        const loanId = id;

        const cookieStore = await cookies();
        const token = cookieStore.get("next-auth.session-token");
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const payload = await JWTService.verify(token.value);
        if (!payload || !["ADMIN", "SUPER_ADMIN", "LOAN_MANAGER"].includes(payload.role as string)) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const loan = await prisma.loan.update({
            where: { id: loanId },
            data: {
                recoveryOfficerId,
                status: "OVERDUE"
            },
        });

        // Log Activity using unified AuditLogger
        await AuditLogger.logEvent({
            userId: payload.sub as string,
            loanId,
            action: "SETTINGS_MODIFIED", // Or add a specific action if needed
            details: { recoveryOfficerId, note: "Recovery Officer Assigned" },
            affectedRecord: "Loan"
        });

        return NextResponse.json({ success: true, loan });
    } catch (error) {
        console.error("Assignment error:", error);
        return NextResponse.json({ error: "Failed to assign officer" }, { status: 500 });
    }
}
