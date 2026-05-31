import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query) {
        return NextResponse.json({ error: "Query parameter required" }, { status: 400 });
    }

    try {
        // Search by Application Code, Loan Code, or Phone Number
        const loan = await prisma.loan.findFirst({
            where: {
                OR: [
                    { loanCode: query },
                    { application: { applicationCode: query } },
                    { borrower: { phoneNumber: query } },
                    { borrower: { nationalId: query } }
                ]
            },
            include: {
                borrower: {
                    select: {
                        fullName: true,
                        phoneNumber: true
                    }
                },
                application: {
                    select: {
                        applicationCode: true,
                        status: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        if (!loan) {
            return NextResponse.json({ error: "Application not found" }, { status: 404 });
        }

        return NextResponse.json(loan);
    } catch (error) {
        return NextResponse.json({ error: "Internal Protocol Error" }, { status: 500 });
    }
}
