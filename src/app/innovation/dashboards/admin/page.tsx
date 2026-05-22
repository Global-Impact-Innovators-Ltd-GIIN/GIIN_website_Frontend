import React from "react";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { JWTService } from "@/lib/security/jwt";
import { redirect } from "next/navigation";
import { Rocket, Trophy, Banknote, ShieldAlert } from "lucide-react";

const prisma = new PrismaClient();

export default async function InnovationAdminDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("next-auth.session-token");
  
  if (!token) redirect("/auth/login");

  const payload = await JWTService.verify(token.value);
  if (!payload || payload.role !== "ADMIN") redirect("/auth/login");

  const startupsCount = await prisma.startup.count();
  const grantsCount = await prisma.grant.count({ where: { status: "OPEN" } });
  const investorsCount = await prisma.investor.count();

  const competitions = await prisma.competition.findMany({
    take: 5,
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="min-h-screen bg-[#020205] text-slate-200 pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex items-center justify-between border-b border-white/10 pb-8">
          <div>
            <h1 className="text-3xl font-bold text-white font-heading">Venture Ecosystem Admin</h1>
            <p className="text-slate-400 mt-2">Oversee incubator performance, hackathons, and global capital deployment.</p>
          </div>
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5" /> Super Admin Access
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: "Incubated Startups", value: startupsCount, icon: <Rocket className="w-5 h-5" />, color: "text-emerald-400" },
            { label: "Open Grants", value: grantsCount, icon: <Banknote className="w-5 h-5" />, color: "text-amber-400" },
            { label: "Active Investors", value: investorsCount, icon: <Trophy className="w-5 h-5" />, color: "text-indigo-400" }
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
              <h2 className="text-lg font-bold text-white">Innovation Challenges & Hackathons</h2>
            </div>
            <div className="p-6">
              {competitions.length === 0 ? (
                <p className="text-slate-500">No competitions created.</p>
              ) : (
                <ul className="space-y-4">
                  {competitions.map(c => (
                    <li key={c.id} className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                      <div>
                        <p className="font-bold text-white">{c.name}</p>
                        <p className="text-xs text-slate-400">{c.type} • Pool: ${c.prizePool?.toLocaleString() || 0}</p>
                      </div>
                      <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs font-bold tracking-wider uppercase">
                        {c.status}
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
