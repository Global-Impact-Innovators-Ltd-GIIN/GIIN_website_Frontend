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

    const { name, industry, stage, description } = await req.json();

    const user = await prisma.user.findUnique({ where: { email: payload.email as string } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Mock AI Score calculation based on industry/stage combo
    const aiScore = Math.floor(Math.random() * (95 - 60 + 1) + 60);

    const startup = await prisma.startup.create({
      data: {
        name,
        industry,
        stage,
        description,
        innovationScore: aiScore,
        founders: {
          create: {
            userId: user.id,
            role: "FOUNDER"
          }
        }
      }
    });

    return NextResponse.json({ success: true, startup });
  } catch (error) {
    return NextResponse.json({ error: "Failed to register startup" }, { status: 500 });
  }
}

