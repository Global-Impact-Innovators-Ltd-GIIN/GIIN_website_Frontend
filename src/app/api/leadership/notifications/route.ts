import { NextResponse } from "next/server";
import { RealTimeSystem } from "@/lib/socket";

export async function POST(req: Request) {
  try {
    const { userId, title, message } = await req.json();

    // Broadcast real-time notification to the connected user
    await RealTimeSystem.broadcast(`user_${userId}`, "notification", { title, message });

    // Write to Notification table in DB
    // ...

    return NextResponse.json({ success: true, message: "Notification dispatched" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to dispatch notification" }, { status: 500 });
  }
}
