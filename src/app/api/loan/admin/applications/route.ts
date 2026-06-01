import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authenticate, authorizePermission, unauthorizedResponse, forbiddenResponse } from "@/lib/security/middleware";

export async function GET() {
    const session = await authenticate();
    if (!session) return unauthorizedResponse();

    // Requires view or approve permission
    if (!authorizePermission(session, "loan.view")) {
        return forbiddenResponse();
    }

    try {
        const applications = await prisma.loanApplication.findMany({
            include: {
                borrower: {
                    select: {
                        fullName: true,
                        borrowerCode: true
                    }
                },
                loan: {
                    select: {
                        principalAmount: true,
                        status: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(applications);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
    }
}
