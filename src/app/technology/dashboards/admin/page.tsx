import React from "react";
import { cookies } from "next/headers";
import { JWTService } from "@/lib/security/jwt";
import { redirect } from "next/navigation";
import { Shield, Users, Layers, Activity } from "lucide-react";

import prisma from "@/lib/prisma";

export default async function TechAdminDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("next-auth.session-token");
  
  if (!token) redirect("/auth/login");

  const payload = await JWTService.verify(token.value);
  if (!payload || payload.role !== "ADMIN") redirect("/auth/login"); // Strictly protected

  const projectsCount = await prisma.project.count();
  const tasksCount = await prisma.task.count();
  const ticketsCount = await prisma.ticket.count();
  const proposalsCount = await prisma.proposal.count();

  const recentProjects = await prisma.project.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { organization: true }
  });

  return (
    <div className="min-h-screen bg-[#020205] text-slate-200 pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex items-center justify-between border-b border-white/10 pb-8">
          <div>
            <h1 className="text-3xl font-bold text-white font-heading">Tech Operations Control</h1>
            <p className="text-slate-400 mt-2">Enterprise administration, metrics, and top-level governance.</p>
          </div>
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-center gap-2">
            <Shield className="w-5 h-5" /> Super Admin Access
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Projects", value: projectsCount, icon: <Layers className="w-5 h-5" />, color: "text-primary" },
            { label: "Active Tasks", value: tasksCount, icon: <Activity className="w-5 h-5" />, color: "text-cyan-400" },
            { label: "Open Tickets", value: ticketsCount, icon: <Users className="w-5 h-5" />, color: "text-emerald-400" },
            { label: "Proposals Generated", value: proposalsCount, icon: <Shield className="w-5 h-5" />, color: "text-amber-400" },
          ].map((stat: any, i: any) => (
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
            <div className="p-6 border-b border-white/10">
              <h2 className="text-lg font-bold text-white">Recent Projects</h2>
            </div>
            <div className="p-6">
              {recentProjects.length === 0 ? (
                <p className="text-slate-500">No projects yet.</p>
              ) : (
                <ul className="space-y-4">
                  {recentProjects.map((p: any) => (
                    <li key={p.id} className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                      <div>
                        <p className="font-bold text-white">{p.name}</p>
                        <p className="text-xs text-slate-400">{p.organization.name}</p>
                      </div>
                      <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
                        {p.status}
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
