import { NextResponse } from "next/server";
import { QueueSystem } from "@/lib/queue";
import { AuditLogger } from "@/lib/audit";

export async function POST(req: Request) {
  try {
    const { userId, programId } = await req.json();

    if (!userId || !programId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // In a production environment, this would verify payment/subscription status
    // and write an Enrollment record to the Prisma DB.
    
    // Simulate enqueueing an onboarding email and assigning a mentor
    await QueueSystem.enqueue("SEND_EMAIL", { userId, template: "LEADERSHIP_WELCOME" });
    
    AuditLogger.logSecurityEvent(userId, "LEADERSHIP_ENROLLMENT_SUCCESS", { programId });

    return NextResponse.json({ 
      success: true, 
      message: "Successfully enrolled in Leadership Program.",
      status: "ACTIVE"
    });
  } catch (error) {
    AuditLogger.logSystemError("EnrollmentAPI", error as Error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
