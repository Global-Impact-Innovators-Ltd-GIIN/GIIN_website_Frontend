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

    const { subject, description, priority, projectId } = await req.json();

    const user = await prisma.user.findUnique({ where: { email: payload.email as string } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const ticket = await prisma.ticket.create({
      data: {
        subject,
        description,
        status: "OPEN",
        priority,
        projectId,
        reporterId: user.id
      }
    });

    return NextResponse.json({ success: true, ticket });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create ticket" }, { status: 500 });
  }
}

