import React from "react";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { JWTService } from "@/lib/security/jwt";
import { redirect } from "next/navigation";
import { Calendar, Image as ImageIcon, Video, FileCheck, Clock } from "lucide-react";

const prisma = new PrismaClient();

export default async function ClientMultimediaDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("next-auth.session-token");
  
  if (!token) redirect("/auth/login");

  const payload = await JWTService.verify(token.value);
  if (!payload || !payload.email) redirect("/auth/login");

  const user = await prisma.user.findUnique({
    where: { email: payload.email as string },
    include: { organizations: true }
  });

  const orgIds = user?.organizations.map(o => o.organizationId) || [];

  const bookings = await prisma.mediaBooking.findMany({
    where: { clientId: { in: orgIds } },
    orderBy: { createdAt: "desc" }
  });

  const approvals = await prisma.contentApproval.findMany({
    where: { asset: { organizationId: { in: orgIds } } },
    include: { asset: { include: { versions: true } } }
  });

  return (
    <div className="min-h-screen bg-[#020205] text-slate-200 pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-3xl font-bold text-white font-heading">Client Media Portal</h1>
          <p className="text-slate-400 mt-2">Manage your studio bookings and review pending content.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-rose-500" /> Pending Approvals
            </h2>
            {approvals.length === 0 ? (
              <div className="p-8 border border-white/5 bg-white/5 rounded-2xl text-center backdrop-blur-xl">
                <p className="text-slate-400">You're all caught up! No media pending review.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {approvals.map(approval => (
                  <div key={approval.id} className="p-6 border border-white/10 bg-black/40 rounded-2xl backdrop-blur-xl transition-all hover:border-rose-500/30 flex gap-6">
                    <div className="w-32 h-24 bg-white/5 rounded-xl flex items-center justify-center overflow-hidden relative group">
                      {approval.asset.type === 'VIDEO' ? <Video className="text-slate-500" /> : <ImageIcon className="text-slate-500" />}
                      <div className="absolute inset-0 bg-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                        <span className="text-xs font-bold text-white">Review</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-white">{approval.asset.title}</h3>
                          <p className="text-xs text-slate-400">Format: {approval.asset.type}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-bold rounded uppercase ${approval.status === 'PENDING' ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'}`}>
                          {approval.status}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg transition-colors">
                          Approve
                        </button>
                        <button className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition-colors">
                          Request Changes
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-400" /> Studio Bookings
              </h2>
            </div>
            
            <div className="space-y-4">
              {bookings.length === 0 ? (
                <div className="p-6 border border-white/5 bg-white/5 rounded-2xl text-center backdrop-blur-xl">
                  <p className="text-sm text-slate-400">No active studio bookings.</p>
                </div>
              ) : (
                bookings.map(booking => (
                  <div key={booking.id} className="p-4 border border-white/10 bg-black/40 rounded-xl">
                    <h4 className="font-bold text-white text-sm">{booking.serviceType}</h4>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {new Date(booking.startDate).toLocaleDateString()}
                    </p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs bg-white/10 px-2 py-1 rounded text-slate-300">{booking.status}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-rose-900/20 to-black border border-rose-500/20">
              <h3 className="font-bold text-white mb-2">Book a Session</h3>
              <p className="text-sm text-slate-300 mb-4">Request photography, videography, or podcast production.</p>
              <button className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg transition-colors">
                New Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
