import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { JWTService } from "@/lib/security/jwt";
import { AssetCondition } from "@prisma/client";

/**
 * GIIN Loan Application Submission Engine
 * Converts high-fidelity portal data into permanent database records.
 */
export async function POST(req: Request) {
    try {
        const data = await req.json();

        // 1. Authenticate (Optional link to User account)
        const cookieStore = await cookies();
        const token = cookieStore.get("next-auth.session-token");
        let sessionUserId: string | undefined;

        if (token) {
            const payload = await JWTService.verify(token.value);
            if (payload) sessionUserId = payload.sub as string;
        }

        // 2. Generation of Sequential Application Code
        const year = new Date().getFullYear();
        const count = await prisma.loanApplication.count();
        const appCode = `GIIN-APP-${year}-${(count + 1).toString().padStart(6, '0')}`;

        // 3. Borrower Identification (Find or Create)
        let borrower = await prisma.borrower.findUnique({
            where: { nationalId: data.nationalId }
        });

        if (!borrower) {
            const borrowerCount = await prisma.borrower.count();
            const bCode = `BOR-${year}-${(borrowerCount + 1).toString().padStart(4, '0')}`;

            borrower = await prisma.borrower.create({
                data: {
                    borrowerCode: bCode,
                    userId: sessionUserId,
                    fullName: data.fullName,
                    nationalId: data.nationalId,
                    passportNumber: data.passportNumber,
                    studentId: data.studentId,
                    phoneNumber: data.phone,
                    email: data.email,
                    gender: data.gender,
                    occupation: data.occupation,
                    status: "ACTIVE"
                }
            });
        }

        // 4. Create Loan Application
        const application = await prisma.loanApplication.create({
            data: {
                applicationCode: appCode,
                borrowerId: borrower.id,
                requestedAmount: data.requestedAmount,
                requestedDuration: data.loanDuration,
                purposeOfLoan: data.purpose || "Business Growth",
                status: "PENDING",
            }
        });

        // 5. Initialize Loan & Collateral record
        const rate = data.loanDuration === 1 ? 0.15 : 0.25;
        const interest = data.requestedAmount * rate;
        const total = data.requestedAmount + interest;
        const loanCode = `LN-${year}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

        const loan = await prisma.loan.create({
            data: {
                loanCode: loanCode,
                borrowerId: borrower.id,
                applicationId: application.id,
                principalAmount: data.requestedAmount,
                interestRate: rate,
                interestAmount: interest,
                totalRepayment: total,
                outstandingBalance: total,
                durationWeeks: data.loanDuration,
                status: "PENDING",
                collateral: {
                    create: {
                        collateralCode: `COL-${loanCode}`,
                        itemType: data.collateralType,
                        brand: data.brand,
                        model: data.model,
                        serialNumber: data.serialNumber,
                        encryptedDevicePassword: data.devicePassword,
                        estimatedValue: data.estimatedValue,
                        conditionStatus: (data.condition as AssetCondition) || "GOOD",
                        images: {
                            create: (data.images || ["/placeholder.png"]).map((url: string) => ({
                                imageUrl: url,
                                uploadedAt: new Date()
                            }))
                        }
                    }
                }
            }
        });

        // 6. Final Audit Log
        await prisma.loanAuditLog.create({
            data: {
                loanId: loan.id,
                userId: sessionUserId,
                actionType: "LOAN_APPLICATION_SUBMITTED",
                newValue: { appCode, amount: data.requestedAmount } // Fixed field name
            }
        });

        return NextResponse.json({
            success: true,
            applicationCode: appCode,
            loanId: loan.id
        });

    } catch (error: any) {
        console.error("Submission Engine Failure:", error);
        return NextResponse.json({
            error: "Protocol Submission Failed",
            details: error.message
        }, { status: 500 });
    }
}
