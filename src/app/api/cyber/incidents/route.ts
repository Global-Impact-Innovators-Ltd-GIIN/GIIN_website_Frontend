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
    if (!payload) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { title, severity, description } = await req.json();

    const user = await prisma.user.findUnique({ 
      where: { email: payload.email as string },
      include: { organizations: true }
    });
    if (!user || user.organizations.length === 0) return NextResponse.json({ error: "User organization not found" }, { status: 404 });

    const organizationId = user.organizations[0].organizationId;

    const incident = await prisma.incident.create({
      data: {
        title,
        severity,
        description,
        status: "OPEN",
        organizationId: organizationId,
        reporterId: user.id
      }
    });

    return NextResponse.json({ success: true, incident });
  } catch (error) {
    return NextResponse.json({ error: "Failed to report incident" }, { status: 500 });
  }
}

