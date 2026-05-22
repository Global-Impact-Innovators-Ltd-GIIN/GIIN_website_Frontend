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

    const { title, abstract, doi, url, status } = await req.json();

    const user = await prisma.user.findUnique({ where: { email: payload.email as string } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const paper = await prisma.researchPaper.create({
      data: {
        title,
        abstract,
        doi,
        url,
        status: status || "DRAFT",
        authors: {
          create: {
            userId: user.id,
            order: 1
          }
        }
      }
    });

    return NextResponse.json({ success: true, paper });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit research paper" }, { status: 500 });
  }
}

