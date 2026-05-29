import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { JWTService } from "@/lib/security/jwt";

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
        if (!payload || !["ADMIN", "SUPER_ADMIN"].includes(payload.role as string)) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const loan = await prisma.loan.update({
            where: { id: loanId },
            data: {
                recoveryOfficerId,
                status: "OVERDUE" // Usually assigned when overdue
            },
        });

        // Log Activity
        await prisma.loanActivityLog.create({
            data: {
                loanId,
                userId: payload.sub as string,
                action: "RECOVERY_OFFICER_ASSIGNED",
                details: { recoveryOfficerId }
            }
        });

        return NextResponse.json({ success: true, loan });
    } catch (error) {
        console.error("Assignment error:", error);
        return NextResponse.json({ error: "Failed to assign officer" }, { status: 500 });
    }
}
