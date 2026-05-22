import { NextResponse } from "next/server";
import { QueueSystem } from "@/lib/queue";
import { RealTimeSystem } from "@/lib/socket";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    version: "1.0.0",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
}

export async function POST(req: Request) {
  // Demonstration of Event-driven / Queue architecture triggers
  const body = await req.json();
  
  if (body.trigger === "report") {
    await QueueSystem.enqueue("GENERATE_AI_REPORT", { user: "admin" });
    await RealTimeSystem.broadcast("admin-channel", "report_queued", { status: "processing" });
  }

  return NextResponse.json({ message: "Action acknowledged and queued" }, { status: 202 });
}
