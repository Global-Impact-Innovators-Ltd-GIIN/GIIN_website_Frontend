import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { JWTService } from "@/lib/security/jwt";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const {
            fullName,
            nationalId,
            studentId,
            phone,
            email,
            requestedAmount,
            loanDuration,
            collateralType,
            deviceDetails,
            imei,
            images
        } = data;

        // Optional: Check if user is logged in to link profile
        const cookieStore = await cookies();
        const token = cookieStore.get("next-auth.session-token");
        let userId: string | undefined;

        if (token) {
            const payload = await JWTService.verify(token.value);
            if (payload) userId = payload.sub as string;
        }

        const sanitizedNationalId = nationalId?.trim();
        const sanitizedStudentId = studentId?.trim() || null;

        if (!sanitizedNationalId) {
            return NextResponse.json({ error: "National ID is required" }, { status: 400 });
        }

        // 1. Find or create borrower
        let borrower = await prisma.borrower.findUnique({
            where: { nationalId: sanitizedNationalId }
        });

        if (!borrower) {
            borrower = await prisma.borrower.create({
                data: {
                    fullName,
                    nationalId: sanitizedNationalId,
                    studentId: sanitizedStudentId,
                    phone,
                    email,
                    userId // Link if logged in
                }
            });
        }

        // 2. Calculate interest
        const getRate = (weeks: number) => {
            if (weeks === 1) return 0.15;
            if (weeks === 2) return 0.25;
            return 0.25 + (weeks - 2) * 0.05;
        };

        const rate = getRate(loanDuration);
        const totalRepayment = requestedAmount + (requestedAmount * rate);

        // 3. Create Loan Request
        const loan = await prisma.loan.create({
            data: {
                borrowerId: borrower.id,
                amount: requestedAmount,
                durationWeeks: loanDuration,
                interestRate: rate,
                totalRepayment,
                outstandingBalance: totalRepayment,
                status: "PENDING",
                purpose: "Innovation Capital",
                collateral: {
                    create: {
                        type: collateralType,
                        description: deviceDetails,
                        details: { imei },
                        images: images || [],
                        status: "HELD"
                    }
                }
            }
        });

        // 4. Log Activity
        await prisma.loanActivityLog.create({
            data: {
                loanId: loan.id,
                userId: userId,
                action: "LOAN_APPLICATION_SUBMITTED",
                details: { amount: requestedAmount, borrowerId: borrower.id }
            }
        });

        return NextResponse.json({
            success: true,
            loanId: loan.id,
            message: "Application submitted successfully."
        });

    } catch (error: any) {
        console.error("Loan application error full stack:", error);
        return NextResponse.json({
            error: "Failed to submit application",
            message: error.message,
            code: error.code // Prisma error codes are useful
        }, { status: 500 });
    }
}
