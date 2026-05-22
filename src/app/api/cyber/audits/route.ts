import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { JWTService } from "@/lib/security/jwt";



export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("next-auth.session-token");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = await JWTService.verify(token.value);
    // Ensure only admins/analysts can submit audits
    if (!payload || payload.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { title, description, riskScore, organizationId } = await req.json();

    const user = await prisma.user.findUnique({ where: { email: payload.email as string } });
    if (!user) return NextResponse.json({ error: "Auditor not found" }, { status: 404 });

    const audit = await prisma.securityAudit.create({
      data: {
        title,
        description,
        riskScore,
        status: "PENDING",
        organizationId,
        auditorId: user.id
      }
    });

    return NextResponse.json({ success: true, audit });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit audit" }, { status: 500 });
  }
}

