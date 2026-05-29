import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { JWTService } from "@/lib/security/jwt";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("next-auth.session-token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const payload = await JWTService.verify(token);
        if (!payload || !payload.sub) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id: payload.sub as string },
            include: {
                organizations: {
                    include: {
                        organization: true,
                        role: true,
                    }
                }
            }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            avatarUrl: user.avatarUrl,
            isSuperAdmin: user.isSuperAdmin,
            organizations: user.organizations.map((m) => ({
                id: m.organization.id,
                name: m.organization.name,
                role: m.role.name,
            })),
        });
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
