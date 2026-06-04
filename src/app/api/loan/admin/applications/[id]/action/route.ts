import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authenticate, authorizePermission, unauthorizedResponse, forbiddenResponse } from "@/lib/security/middleware";
import { AuditLogger } from "@/lib/audit";

/**
 * GIIN Loan Migration & Workflow Engine
 * Handles Approval, Rejection, and Information Requests.
 */
export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await authenticate();
        if (!session) return unauthorizedResponse();

        const { id: appId } = await params;
        const { action, notes, riskCategory, liquidationValue, rejectionReason } = await req.json();
        const userId = session.sub as string;

        // 1. Fetch Application & Associated Loan
        const application = await prisma.loanApplication.findUnique({
            where: { id: appId },
            include: { loan: true, borrower: true }
        });

        if (!application || !application.loan) {
            return NextResponse.json({ error: "Context missing: Loan or Application not found" }, { status: 404 });
        }

        const loanId = application.loan.id;

        // 2. Permission Routing
        const isManager = session.role === "LOAN_MANAGER" || session.role === "SUPER_ADMIN";

        if (action === "APPROVE" && !isManager) return forbiddenResponse();
        if (!authorizePermission(session, "loan.edit")) return forbiddenResponse();

        // 3. Execution Logic
        if (action === "APPROVE") {
            // Sequential Loan Code Generation
            const year = new Date().getFullYear();
            const loanCount = await prisma.loan.count({ where: { status: "APPROVED" } });
            const loanCode = `GIIN-LN-${year}-${(loanCount + 1).toString().padStart(6, '0')}`;

            const dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + (application.loan.durationWeeks * 7));

            await prisma.$transaction([
                // Update Application
                prisma.loanApplication.update({
                    where: { id: appId },
                    data: { status: "APPROVED", reviewedBy: userId, reviewedAt: new Date(), remarks: notes }
                }),
                // Migrate to Active Loan
                prisma.loan.update({
                    where: { id: loanId },
                    data: {
                        loanCode,
                        status: "APPROVED",
                        approvedBy: userId,
                        loanDate: new Date(),
                        dueDate,
                        // Create Invoice Draft
                        invoice: {
                            create: {
                                invoiceNumber: `INV-${loanCode}`,
                                generatedBy: userId,
                                generatedAt: new Date()
                            }
                        }
                    }
                }),
                // Update Collateral Assessment
                prisma.collateral.update({
                    where: { loanId },
                    data: {
                        conditionStatus: riskCategory === "LOW" ? "EXCELLENT" : "GOOD",
                        estimatedValue: liquidationValue || application.loan.principalAmount // Mock calculation
                    }
                })
            ]);

            await AuditLogger.logEvent({
                userId,
                loanId,
                action: "LOAN_APPROVED",
                details: { notes, riskCategory, appCode: application.applicationCode },
                affectedRecord: "Loan"
            });

            return NextResponse.json({ success: true, message: "Application migrated to APPROVED loan." });
        }

        if (action === "REJECT") {
            await prisma.loanApplication.update({
                where: { id: appId },
                data: { status: "REJECTED", remarks: `${rejectionReason}: ${notes}`, reviewedBy: userId, reviewedAt: new Date() }
            });

            await prisma.loan.update({
                where: { id: loanId },
                data: { status: "CANCELLED" }
            });

            await AuditLogger.logEvent({
                userId,
                loanId,
                action: "LOAN_REJECTED",
                details: { reason: rejectionReason, notes },
                affectedRecord: "Application"
            });

            return NextResponse.json({ success: true, message: "Application rejected." });
        }

        if (action === "REQUEST_INFO") {
            await prisma.loanApplication.update({
                where: { id: appId },
                data: { status: "UNDER_REVIEW", remarks: notes }
            });

            return NextResponse.json({ success: true, message: "Status updated to Under Review." });
        }

        return NextResponse.json({ error: "Invalid protocol action" }, { status: 400 });

    } catch (error: any) {
        console.error("Migration Engine Error:", error);
        return NextResponse.json({ error: "Workflow transmission failure", details: error.message }, { status: 500 });
    }
}
