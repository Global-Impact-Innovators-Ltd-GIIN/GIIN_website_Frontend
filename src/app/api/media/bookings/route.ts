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

    const { clientId, serviceType, location, startDate, details } = await req.json();

    const booking = await prisma.mediaBooking.create({
      data: {
        clientId,
        serviceType,
        location,
        startDate: new Date(startDate),
        status: "REQUESTED",
        details,
      }
    });

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}

