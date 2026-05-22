import React from "react";
import { cookies } from "next/headers";
import { JWTService } from "@/lib/security/jwt";
import { redirect } from "next/navigation";
import { Rocket, Target, Briefcase, ChevronRight, FileText } from "lucide-react";

import prisma from "@/lib/prisma";

export default async function FounderDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("next-auth.session-token");
  
  if (!token) redirect("/auth/login");

  const payload = await JWTService.verify(token.value);
  if (!payload || !payload.email) redirect("/auth/login");

  const user = await prisma.user.findUnique({
    where: { email: payload.email as string },
    include: { startupRoles: { include: { startup: true } } }
  });

  if (!user) redirect("/auth/login");

  const startups = user.startupRoles.map((r: any) => r.startup);
  
  // For demo, fetch some open grants
  const grants = await prisma.grant.findMany({
    where: { status: "OPEN" },
    take: 3
  });

  return (
    <div className="min-h-screen bg-[#020205] text-slate-200 pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-3xl font-bold text-white font-heading">Founder Workspace</h1>
          <p className="text-slate-400 mt-2">Manage your venture, refine your pitch, and secure capital.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Rocket className="w-5 h-5 text-emerald-400" /> My Ventures
            </h2>
            {startups.length === 0 ? (
              <div className="p-8 border border-white/5 bg-white/5 rounded-2xl text-center backdrop-blur-xl">
                <p className="text-slate-400">You haven't registered a startup yet.</p>
                <button className="mt-4 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors">
                  Register Startup
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {startups.map((startup: any) => (
                  <div key={startup.id} className="p-6 border border-white/10 bg-black/40 rounded-2xl backdrop-blur-xl transition-all hover:border-emerald-500/30">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">{startup.name}</h3>
                        <p className="text-sm text-slate-400 mt-1">{startup.industry}</p>
                      </div>
                      <div className="text-right">
                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider">
                          {startup.stage}
                        </span>
                        {startup.innovationScore && (
                          <div className="mt-2 text-xs font-bold text-indigo-400">
                            AI Score: {startup.innovationScore}/100
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 mt-4 line-clamp-2">{startup.description}</p>
                    <div className="flex gap-2 mt-6">
                      <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1">
                        <Target className="w-3 h-3" /> Update Pitch
                      </button>
                      <button className="px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 text-xs font-bold rounded-lg transition-colors flex items-center gap-1">
                        AI Pitch Assistant <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-amber-400" /> Open Grants
              </h2>
            </div>
            
            <div className="space-y-4">
              {grants.length === 0 ? (
                <div className="p-6 border border-white/5 bg-white/5 rounded-2xl text-center backdrop-blur-xl">
                  <p className="text-sm text-slate-400">No active grants currently available.</p>
                </div>
              ) : (
                grants.map((grant: any) => (
                  <div key={grant.id} className="p-5 border border-white/10 bg-black/40 rounded-xl hover:border-amber-500/30 transition-colors">
                    <h4 className="font-bold text-white text-sm">{grant.title}</h4>
                    <div className="flex justify-between items-end mt-3">
                      <div>
                        <span className="text-xs text-slate-500 uppercase font-bold block">Amount</span>
                        <span className="text-amber-400 font-bold">${grant.amount.toLocaleString()}</span>
                      </div>
                      <button className="text-xs font-bold text-white bg-white/10 px-3 py-1.5 rounded hover:bg-white/20">
                        Apply
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-indigo-900/40 to-black border border-indigo-500/20">
              <h3 className="font-bold text-white mb-2 flex items-center gap-2"><FileText className="w-4 h-4 text-indigo-400" /> AI Business Analyzer</h3>
              <p className="text-sm text-slate-300 mb-4">Run our proprietary algorithmic model on your business metrics to predict market fit.</p>
              <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors">
                Run Evaluation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
