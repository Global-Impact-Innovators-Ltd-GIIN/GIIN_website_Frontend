import React from "react";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { JWTService } from "@/lib/security/jwt";
import { redirect } from "next/navigation";
import { Activity, Target, Zap, Building2, TrendingUp } from "lucide-react";

const prisma = new PrismaClient();

export default async function InvestorDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("next-auth.session-token");
  
  if (!token) redirect("/auth/login");

  const payload = await JWTService.verify(token.value);
  if (!payload || !payload.email) redirect("/auth/login");

  // Fetch startups ordered by AI innovation score
  const topStartups = await prisma.startup.findMany({
    orderBy: { innovationScore: 'desc' },
    take: 10
  });

  return (
    <div className="min-h-screen bg-[#020205] text-slate-200 pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white font-heading">Investor Deal Flow</h1>
            <p className="text-slate-400 mt-2">Discover high-impact African ventures curated by GIIN algorithmic intelligence.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-400 rounded-lg text-sm font-bold transition-all flex items-center gap-2">
              <Zap className="w-4 h-4" /> Market Predictor
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-500" /> Proprietary Deal Flow
              </h2>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
              <table className="w-full text-left text-sm">
                <thead className="bg-black/40 border-b border-white/10 text-slate-400">
                  <tr>
                    <th className="p-4 font-medium">Startup</th>
                    <th className="p-4 font-medium">Industry</th>
                    <th className="p-4 font-medium">Stage</th>
                    <th className="p-4 font-medium">AI Score</th>
                    <th className="p-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {topStartups.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-500">No active startups in the incubator.</td>
                    </tr>
                  ) : (
                    topStartups.map(startup => (
                      <tr key={startup.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4 font-medium text-white flex items-center gap-3">
                          <Building2 className="w-4 h-4 text-slate-500" />
                          {startup.name}
                        </td>
                        <td className="p-4 text-slate-400">{startup.industry}</td>
                        <td className="p-4">
                          <span className="px-2 py-1 rounded bg-white/10 text-white text-xs font-bold">{startup.stage}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-indigo-400 font-bold">{startup.innovationScore ? `${startup.innovationScore}/100` : "N/A"}</span>
                        </td>
                        <td className="p-4">
                          <button className="text-xs font-bold text-emerald-400 hover:text-emerald-300">View Deck</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900/20 to-black border border-indigo-500/20 backdrop-blur-md">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-400" /> AI Insights
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-sm">
                  <p className="text-slate-300 leading-relaxed mb-2">Deep-tech agriculture is showing a 40% increased probability of Series A follow-on funding in East Africa.</p>
                  <span className="text-xs text-indigo-400 font-bold">GIIN Intelligence Engine</span>
                </div>
                <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-sm">
                  <p className="text-slate-300 leading-relaxed mb-2">Fintech infrastructure startups are saturated. Model recommends pivoting focus to climate-tech.</p>
                  <span className="text-xs text-indigo-400 font-bold">Market Predictor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
