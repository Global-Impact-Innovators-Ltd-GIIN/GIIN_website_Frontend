import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authenticate, authorizePermission, forbiddenResponse, unauthorizedResponse } from "@/lib/security/middleware";
import { AuditLogger } from "@/lib/audit";

/**
 * GIIN Loan Action Controller
 * Handles Approvals, Rejections, and Cancellations.
 */
export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { action, notes } = await req.json();

        // 1. Authenticate & Authorize
        const session = await authenticate();
        if (!session) return unauthorizedResponse();

        const userId = session.sub as string;
        const loanId = id;

        // 2. Permission Check
        const requiredPermission = action === "APPROVE" || action === "REJECT" ? "loan.approve" : "loan.delete";
        if (!authorizePermission(session, requiredPermission)) {
            return forbiddenResponse();
        }

        // 3. Determine New Status
        let status: any;
        let auditAction: any;

        if (action === "APPROVE") {
            status = "ACTIVE";
            auditAction = "LOAN_APPROVED";
        } else if (action === "REJECT") {
            status = "CANCELLED"; // Or REJECTED if using Application model
            auditAction = "LOAN_REJECTED";
        } else if (action === "CANCEL") {
            status = "CANCELLED";
            auditAction = "LOAN_REJECTED";
        } else {
            return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }

        // 4. Update Database
        const loan = await prisma.loan.update({
            where: { id: loanId },
            data: {
                status,
                loanOfficerId: userId,
                startDate: action === "APPROVE" ? new Date() : undefined,
                dueDate: action === "APPROVE" ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : undefined, // 1 week default
            },
        });

        // 5. Persistent Audit Log
        await AuditLogger.logEvent({
            userId,
            loanId,
            action: auditAction,
            details: { notes, oldStatus: "PENDING", newStatus: status },
            affectedRecord: "Loan"
        });

        return NextResponse.json({ success: true, loan });
    } catch (error) {
        console.error("Loan action error:", error);
        return NextResponse.json({ error: "Action failed" }, { status: 500 });
    }
}
