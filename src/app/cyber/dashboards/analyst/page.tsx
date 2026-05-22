import React from "react";
import { cookies } from "next/headers";
import { JWTService } from "@/lib/security/jwt";
import { redirect } from "next/navigation";
import { ServerCrash, Search, Activity, ShieldAlert, Cpu } from "lucide-react";

import prisma from "@/lib/prisma";

export default async function AnalystDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("next-auth.session-token");
  
  if (!token) redirect("/auth/login");

  const payload = await JWTService.verify(token.value);
  if (!payload || !payload.email) redirect("/auth/login");

  // In a real app, verify they are an analyst/consultant. Here we mock check via role.
  const openIncidents = await prisma.incident.findMany({
    where: { status: "OPEN" },
    include: { organization: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="min-h-screen bg-[#020205] text-slate-200 pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white font-heading">SOC Analyst Terminal</h1>
            <p className="text-slate-400 mt-2">Triage incidents, execute penetration tests, and run algorithmic threat models.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-lg text-sm font-bold transition-all flex items-center gap-2">
              <Cpu className="w-4 h-4" /> AI Threat Predictor
            </button>
            <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_-3px_rgba(6,182,212,0.5)]">
              Upload Audit
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-500" /> Triage Queue
              </h2>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
              <table className="w-full text-left text-sm">
                <thead className="bg-black/40 border-b border-white/10 text-slate-400">
                  <tr>
                    <th className="p-4 font-medium">Incident</th>
                    <th className="p-4 font-medium">Client Org</th>
                    <th className="p-4 font-medium">Severity</th>
                    <th className="p-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {openIncidents.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-slate-500">No open incidents in the queue.</td>
                    </tr>
                  ) : (
                    openIncidents.map((incident: any) => (
                      <tr key={incident.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4 font-medium text-white flex items-center gap-3">
                          <ServerCrash className="w-4 h-4 text-slate-500" />
                          {incident.title}
                        </td>
                        <td className="p-4 text-slate-400">{incident.organization.name}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${incident.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                            {incident.severity}
                          </span>
                        </td>
                        <td className="p-4">
                          <button className="text-xs font-bold text-cyan-400 hover:text-cyan-300">Investigate</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-red-900/20 to-black border border-red-500/20 backdrop-blur-md">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-red-400" /> Live Telemetry
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-sm">
                  <p className="text-slate-300 leading-relaxed mb-2">Unusual outbound traffic spike detected originating from Client Org ID #8821. Port 443 mapping anomalies.</p>
                  <span className="text-xs text-red-400 font-bold">GIIN IDS/IPS Sensor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
