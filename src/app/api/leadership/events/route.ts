import { NextResponse } from "next/server";

export async function GET() {
  // In production, this fetches events from Prisma where type=LEADERSHIP_PROGRAM or CONFERENCE
  const events = [
    {
      id: "ev-1",
      title: "Africa Leadership Summit 2026",
      type: "CONFERENCE",
      date: "2026-08-15T09:00:00Z",
      location: "Virtual & Kigali, Rwanda",
      availableSeats: 500
    },
    {
      id: "ev-2",
      title: "Strategic AI for Executives",
      type: "WORKSHOP",
      date: "2026-09-01T14:00:00Z",
      location: "Virtual Classroom Alpha",
      availableSeats: 50
    }
  ];

  return NextResponse.json({ events });
}
