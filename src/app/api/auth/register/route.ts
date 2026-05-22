import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


import bcrypt from "bcryptjs";
import { JWTService } from "@/lib/security/jwt";





export async function POST(req: Request) {
  try {
    const { email, password, firstName, lastName } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    
    const user = await prisma.user.create({
      data: { email, passwordHash, firstName, lastName }
    });

    const token = await JWTService.sign({ sub: user.id, email: user.email, role: "USER" });

    const response = NextResponse.json({ success: true, user: { id: user.id, email: user.email, firstName: user.firstName } });
    
    // Set HTTP-only cookie
    response.cookies.set({
      name: "next-auth.session-token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}

