import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authenticate, authorizePermission, unauthorizedResponse, forbiddenResponse } from "@/lib/security/middleware";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await authenticate();
    if (!session) return unauthorizedResponse();

    if (!authorizePermission(session, "loan.view")) {
        return forbiddenResponse();
    }

    try {
        const { id } = await params;

        const application = await prisma.loanApplication.findUnique({
            where: { id },
            include: {
                borrower: true,
                loan: {
                    include: {
                        collateral: {
                            include: {
                                images: true
                            }
                        },
                        activityLogs: {
                            include: {
                                user: {
                                    select: {
                                        firstName: true,
                                        lastName: true,
                                        role: true
                                    }
                                }
                            },
                            orderBy: {
                                timestamp: 'desc'
                            }
                        }
                    }
                }
            }
        });

        if (!application) {
            return NextResponse.json({ error: "Application not found" }, { status: 404 });
        }

        return NextResponse.json(application);
    } catch (error) {
        return NextResponse.json({ error: "Internal protocol error" }, { status: 500 });
    }
}
