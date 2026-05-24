import React from "react";
import { cookies } from "next/headers";
import { JWTService } from "@/lib/security/jwt";
import { redirect } from "next/navigation";
import { ShieldAlert, FileSearch, ShieldCheck, Activity, BarChart3 } from "lucide-react";

import prisma from "@/lib/prisma";

export default async function CyberClientDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("next-auth.session-token");
  
  if (!token) redirect("/auth/login");

  const payload = await JWTService.verify(token.value);
  if (!payload || !payload.email) redirect("/auth/login");

  const user = await prisma.user.findUnique({
    where: { email: payload.email as string },
    include: { organizations: true }
  });

  if (!user || user.organizations.length === 0) redirect("/auth/login");
  const organizationId = user.organizations[0].organizationId;

  const incidents = await prisma.incident.findMany({
    where: { organizationId: organizationId },
    orderBy: { createdAt: "desc" }
  });

  const audits = await prisma.securityAudit.findMany({
    where: { organizationId: organizationId },
    orderBy: { createdAt: "desc" }
  });

  const latestAudit = audits.length > 0 ? audits[0] : null;

  return (
    <div className="min-h-screen bg-[#020205] text-slate-200 pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white font-heading">Security Posture Portal</h1>
            <p className="text-slate-400 mt-2">Monitor vulnerabilities, view audit reports, and request consulting.</p>
          </div>
          <button className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-colors flex items-center gap-2 shadow-[0_0_15px_-3px_rgba(220,38,38,0.5)]">
            <ShieldAlert className="w-4 h-4" /> Report Incident
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-8 lg:col-span-1">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-900/40 to-black border border-cyan-500/20 text-center">
              <h3 className="font-bold text-white mb-2 flex items-center justify-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" /> Enterprise Risk Score
              </h3>
              {latestAudit ? (
                <>
                  <div className="text-6xl font-black text-white my-6">
                    {latestAudit.riskScore}
                    <span className="text-xl text-slate-500 font-medium">/100</span>
                  </div>
                  <p className="text-sm text-slate-300">
                    {latestAudit.riskScore > 80 ? "Your infrastructure posture is highly resilient." : "Critical vulnerabilities detected. Consultation recommended."}
                  </p>
                  <button className="mt-6 w-full py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-lg transition-colors border border-white/10 flex items-center justify-center gap-2">
                    <FileSearch className="w-4 h-4" /> Download Audit Report
                  </button>
                </>
              ) : (
                <div className="py-8">
                  <p className="text-slate-400 text-sm mb-4">No recent security audits performed.</p>
                  <button className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold rounded-lg transition-colors">
                    Request Assessment
                  </button>
                </div>
              )}
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-indigo-400" /> Business Consulting</h3>
              <p className="text-sm text-slate-400 mb-4">Schedule a digital transformation mapping or business maturity assessment with GIIN experts.</p>
              <button className="w-full py-2 bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 text-indigo-400 font-bold rounded-lg transition-colors">
                Book Consultation
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-400" /> Active Incidents
            </h2>
            {incidents.length === 0 ? (
              <div className="p-8 border border-white/5 bg-white/5 rounded-2xl text-center backdrop-blur-xl flex flex-col items-center">
                <ShieldCheck className="w-12 h-12 text-emerald-500/50 mb-4" />
                <p className="text-slate-400">Zero active security incidents detected on your perimeter.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {incidents.map((incident: any) => (
                  <div key={incident.id} className="p-6 border border-white/10 bg-black/40 rounded-2xl backdrop-blur-xl transition-all hover:border-red-500/30">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white">{incident.title}</h3>
                        <p className="text-sm text-slate-400 mt-1">{new Date(incident.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${
                          incident.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400' : 
                          incident.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {incident.severity}
                        </span>
                        <span className="px-3 py-1 bg-white/10 text-white rounded-full text-xs font-bold uppercase tracking-wider">
                          {incident.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 line-clamp-2">{incident.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
