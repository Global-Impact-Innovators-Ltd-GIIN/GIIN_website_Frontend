import React from "react";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { JWTService } from "@/lib/security/jwt";
import { redirect } from "next/navigation";
import { CalendarDays, Film, BarChart3, Settings } from "lucide-react";

const prisma = new PrismaClient();

export default async function MediaAdminDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("next-auth.session-token");
  
  if (!token) redirect("/auth/login");

  const payload = await JWTService.verify(token.value);
  if (!payload || payload.role !== "ADMIN") redirect("/auth/login");

  const bookingsCount = await prisma.mediaBooking.count({ where: { status: "REQUESTED" } });
  const assetsCount = await prisma.mediaAsset.count();
  const approvalsCount = await prisma.contentApproval.count({ where: { status: "PENDING" } });

  const recentBookings = await prisma.mediaBooking.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { client: true }
  });

  return (
    <div className="min-h-screen bg-[#020205] text-slate-200 pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex items-center justify-between border-b border-white/10 pb-8">
          <div>
            <h1 className="text-3xl font-bold text-white font-heading">Studio Operations Control</h1>
            <p className="text-slate-400 mt-2">Manage global media scheduling, asset distribution, and studio analytics.</p>
          </div>
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 flex items-center gap-2">
            <Settings className="w-5 h-5" /> Operations Manager
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: "New Booking Requests", value: bookingsCount, icon: <CalendarDays className="w-5 h-5" />, color: "text-amber-400" },
            { label: "Total Asset Catalog", value: assetsCount, icon: <Film className="w-5 h-5" />, color: "text-rose-400" },
            { label: "Pending Client Approvals", value: approvalsCount, icon: <BarChart3 className="w-5 h-5" />, color: "text-emerald-400" }
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4 ${stat.color}`}>
                {stat.icon}
              </div>
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-lg font-bold text-white">Recent Studio Bookings</h2>
              <span className="text-xs text-rose-400 bg-rose-500/10 px-2 py-1 rounded font-bold">Requires Action</span>
            </div>
            <div className="p-6">
              {recentBookings.length === 0 ? (
                <p className="text-slate-500">No recent bookings.</p>
              ) : (
                <ul className="space-y-4">
                  {recentBookings.map(b => (
                    <li key={b.id} className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                      <div>
                        <p className="font-bold text-white">{b.serviceType}</p>
                        <p className="text-xs text-slate-400">{b.client.name} • {new Date(b.startDate).toLocaleDateString()}</p>
                      </div>
                      <span className="px-3 py-1 bg-white/10 text-white rounded-full text-xs font-bold tracking-wider">
                        {b.status}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
