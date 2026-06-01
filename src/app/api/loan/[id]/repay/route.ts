import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { JWTService } from "@/lib/security/jwt";
import { AuditLogger } from "@/lib/audit";
import { LoanStatus } from "@prisma/client";

/**
 * GIIN Repayment Processing Engine
 * Records payments and generates receipts.
 */
export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: loanId } = await params;
        const { amount, paymentMethod, reference } = await req.json();

        const cookieStore = await cookies();
        const token = cookieStore.get("next-auth.session-token");
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const payload = await JWTService.verify(token.value);
        if (!payload || !["ADMIN", "SUPER_ADMIN", "CASHIER", "LOAN_MANAGER"].includes(payload.role as string)) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const userId = payload.sub as string;

        const loan = await prisma.loan.findUnique({
            where: { id: loanId },
        });

        if (!loan) return NextResponse.json({ error: "Loan context missing" }, { status: 404 });

        const newBalance = Math.max(0, loan.outstandingBalance - amount);
        const isFullyPaid = newBalance === 0;
        const repaymentCode = `REPAY-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

        // Atomic Transaction for Repayment
        const result = await prisma.$transaction(async (tx) => {
            // 1. Create Repayment
            const repayment = await tx.repayment.create({
                data: {
                    repaymentCode,
                    loanId,
                    amountPaid: amount,
                    remainingBalance: newBalance,
                    paymentMethod,
                    paymentReference: reference,
                    receivedBy: userId,
                    paymentDate: new Date()
                }
            });

            // 2. Update Loan Balance
            await tx.loan.update({
                where: { id: loanId },
                data: {
                    outstandingBalance: newBalance,
                    amountPaid: loan.amountPaid + amount,
                    status: (isFullyPaid ? "REPAID" : "PARTIAL") as LoanStatus
                }
            });

            // 3. Create Receipt (linked to Loan in current schema)
            const receipt = await tx.receipt.create({
                data: {
                    receiptNumber: `GIIN-REC-${repaymentCode}`,
                    loanId: loanId,
                    generatedBy: userId,
                    generatedAt: new Date()
                }
            });

            return { repayment, receipt };
        });

        // 4. Audit Trail
        await AuditLogger.logEvent({
            userId,
            loanId,
            action: "REPAYMENT_PROCESSED",
            details: { amount, balance: newBalance, repaymentId: result.repayment.id },
            affectedRecord: "Repayment"
        });

        return NextResponse.json({
            success: true,
            receiptId: result.receipt.id,
            repaymentCode: result.repayment.repaymentCode,
            newBalance,
            status: isFullyPaid ? "REPAID" : "PARTIAL"
        });

    } catch (error: any) {
        console.error("Repayment Engine Error:", error);
        return NextResponse.json({ error: "Transaction Failed", details: error.message }, { status: 500 });
    }
}
