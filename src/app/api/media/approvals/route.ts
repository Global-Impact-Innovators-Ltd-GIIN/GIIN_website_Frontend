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

    const { assetId, reviewerId, status, feedback } = await req.json();

    const approval = await prisma.contentApproval.create({
      data: {
        assetId,
        reviewerId,
        status,
        feedback,
      }
    });

    return NextResponse.json({ success: true, approval });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create approval request" }, { status: 500 });
  }
}

