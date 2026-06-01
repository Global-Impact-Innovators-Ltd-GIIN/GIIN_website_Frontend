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
        const rawData = await req.json();

        // Data Normalization (Empty strings to null for unique/optional constraints)
        const data = {
            ...rawData,
            studentId: rawData.studentId?.trim() === "" ? null : rawData.studentId,
            passportNumber: rawData.passportNumber?.trim() === "" ? null : rawData.passportNumber,
            email: rawData.email?.toLowerCase().trim() || "no-email@giin.com",
            nationalId: rawData.nationalId?.toUpperCase().trim(),
        };

        if (!data.nationalId || !data.fullName) {
            return NextResponse.json({ error: "Missing identity protocol signatures." }, { status: 400 });
        }

        // 1. Authenticate (Optional link to User account)
        const cookieStore = await cookies();
        const token = cookieStore.get("next-auth.session-token");
        let sessionUserId: string | undefined;

        if (token) {
            try {
                const payload = await JWTService.verify(token.value);
                if (payload) sessionUserId = payload.sub as string;
            } catch (e) {
                console.warn("Auth token invalid during submission - continuing as guest.");
            }
        }

        // 2. Generation of Sequential Application Code
        const year = new Date().getFullYear();
        const count = await prisma.loanApplication.count();
        const appCode = `GIIN-APP-${year}-${(count + 1).toString().padStart(6, '0')}`;

        // 3. Start Transaction for Atomic Operations
        const result = await prisma.$transaction(async (tx) => {
            // A. Borrower Identification (Find or Create)
            let borrower = await tx.borrower.findUnique({
                where: { nationalId: data.nationalId }
            });

            if (!borrower) {
                const borrowerCount = await tx.borrower.count();
                const bCode = `BOR-${year}-${(borrowerCount + 1).toString().padStart(4, '0')}`;

                borrower = await tx.borrower.create({
                    data: {
                        borrowerCode: bCode,
                        userId: sessionUserId,
                        fullName: data.fullName,
                        nationalId: data.nationalId,
                        passportNumber: data.passportNumber,
                        studentId: data.studentId,
                        phoneNumber: data.phone || data.phoneNumber || "0000000000",
                        email: data.email,
                        gender: data.gender,
                        occupation: data.occupation,
                        status: "ACTIVE"
                    }
                });
            }

            // B. Create Loan Application
            const application = await tx.loanApplication.create({
                data: {
                    applicationCode: appCode,
                    borrowerId: borrower.id,
                    requestedAmount: Number(data.requestedAmount),
                    requestedDuration: Number(data.loanDuration),
                    purposeOfLoan: data.purpose || "Business Growth",
                    status: "PENDING",
                }
            });

            // C. Initialize Loan & Collateral record
            const rate = Number(data.loanDuration) === 1 ? 0.15 : 0.25;
            const interest = Number(data.requestedAmount) * rate;
            const total = Number(data.requestedAmount) + interest;
            const loanCode = `LN-${year}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

            const loan = await tx.loan.create({
                data: {
                    loanCode: loanCode,
                    borrowerId: borrower.id,
                    applicationId: application.id,
                    principalAmount: Number(data.requestedAmount),
                    interestRate: rate,
                    interestAmount: interest,
                    totalRepayment: total,
                    outstandingBalance: total,
                    durationWeeks: Number(data.loanDuration),
                    status: "PENDING",
                    collateral: {
                        create: {
                            collateralCode: `COL-${loanCode}`,
                            itemType: data.collateralType,
                            brand: data.brand,
                            model: data.model,
                            serialNumber: data.serialNumber,
                            encryptedDevicePassword: data.devicePassword,
                            estimatedValue: Number(data.estimatedValue) || 0,
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

            // D. Audit Log Entry
            await tx.loanAuditLog.create({
                data: {
                    loanId: loan.id,
                    userId: sessionUserId,
                    actionType: "LOAN_APPLICATION_SUBMITTED",
                    newValue: { appCode, amount: data.requestedAmount }
                }
            });

            return { appCode, loanId: loan.id };
        });

        return NextResponse.json({
            success: true,
            applicationCode: result.appCode,
            loanId: result.loanId
        });

    } catch (error: any) {
        console.error("CRITICAL: Submission Engine failure >>", error);

        // Identify specific database errors
        if (error.code === 'P2002') {
            return NextResponse.json({
                error: "Duplicate constraint failure. Identity or serial number already registered.",
                details: error.meta?.target
            }, { status: 409 });
        }

        return NextResponse.json({
            error: "Protocol Submission Failed",
            details: error.message
        }, { status: 500 });
    }
}
