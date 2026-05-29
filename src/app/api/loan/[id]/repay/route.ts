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
        const { amount, paymentMethod, reference } = await req.json();
        const loanId = id;

        const cookieStore = await cookies();
        const token = cookieStore.get("next-auth.session-token");
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const payload = await JWTService.verify(token.value);
        if (!payload || !["ADMIN", "SUPER_ADMIN", "CASHIER"].includes(payload.role as string)) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const userId = payload.sub as string;

        const loan = await prisma.loan.findUnique({
            where: { id: loanId },
            include: { borrower: true }
        });

        if (!loan) return NextResponse.json({ error: "Loan not found" }, { status: 404 });

        const newBalance = Math.max(0, loan.outstandingBalance - amount);
        const isFullyPaid = newBalance === 0;

        // 1. Create Repayment
        const repayment = await prisma.repayment.create({
            data: {
                loanId,
                amountPaid: amount,
                paymentMethod,
                transactionRef: reference,
                processedById: userId
            }
        });

        // 2. Update Loan
        await prisma.loan.update({
            where: { id: loanId },
            data: {
                outstandingBalance: newBalance,
                status: isFullyPaid ? "COMPLETED" : "PARTIAL"
            }
        });

        // 3. Create Receipt
        const receipt = await prisma.receipt.create({
            data: {
                repaymentId: repayment.id,
                receiptNumber: `REC-${Date.now()}`,
                issuedById: userId
            }
        });

        // 4. Log Activity
        await prisma.loanActivityLog.create({
            data: {
                loanId,
                userId,
                action: "REPAYMENT_RECORDED",
                details: { amount, balance: newBalance, repaymentId: repayment.id }
            }
        });

        return NextResponse.json({
            success: true,
            receiptId: receipt.id,
            newBalance,
            status: isFullyPaid ? "COMPLETED" : "PARTIAL"
        });

    } catch (error) {
        console.error("Repayment error:", error);
        return NextResponse.json({ error: "Transaction failed" }, { status: 500 });
    }
}
