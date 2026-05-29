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
        const { action, notes } = await req.json();
        const loanId = id;

        const cookieStore = await cookies();
        const token = cookieStore.get("next-auth.session-token");
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const payload = await JWTService.verify(token.value);
        if (!payload || (payload.role !== "ADMIN" && payload.role !== "SUPER_ADMIN" && payload.role !== "LOAN_OFFICER")) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const userId = payload.sub as string;

        let status: any;
        if (action === "APPROVE") status = "ACTIVE";
        else if (action === "REJECT") status = "DEFAULTED"; // Or another status for rejected
        else if (action === "CANCEL") status = "DEFAULTED";
        else return NextResponse.json({ error: "Invalid action" }, { status: 400 });

        const loan = await prisma.loan.update({
            where: { id: loanId },
            data: {
                status,
                loanOfficerId: userId,
                startDate: action === "APPROVE" ? new Date() : undefined,
                dueDate: action === "APPROVE" ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : undefined, // Placeholder 1 week
            },
        });

        // Log Activity
        await prisma.loanActivityLog.create({
            data: {
                loanId,
                userId,
                action: `LOAN_${action}`,
                details: { notes }
            }
        });

        return NextResponse.json({ success: true, loan });
    } catch (error) {
        console.error("Loan action error:", error);
        return NextResponse.json({ error: "Action failed" }, { status: 500 });
    }
}
