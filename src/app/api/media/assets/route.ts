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
    if (!payload || payload.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { title, description, type, organizationId, creatorId } = await req.json();

    const asset = await prisma.mediaAsset.create({
      data: {
        title,
        description,
        type,
        status: "DRAFT",
        organizationId,
        creatorId
      }
    });

    return NextResponse.json({ success: true, asset });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create media asset" }, { status: 500 });
  }
}

