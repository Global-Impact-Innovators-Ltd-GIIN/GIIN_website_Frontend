import React from "react";
import { cookies } from "next/headers";
import { JWTService } from "@/lib/security/jwt";
import { redirect } from "next/navigation";
import { ShieldCheck, Crosshair, Users, HardDrive } from "lucide-react";

import prisma from "@/lib/prisma";

export default async function CyberAdminDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("next-auth.session-token");
  
  if (!token) redirect("/auth/login");

  const payload = await JWTService.verify(token.value);
  if (!payload || payload.role !== "ADMIN") redirect("/auth/login");

  const incidentsCount = await prisma.incident.count({ where: { status: "OPEN" } });
  const auditsCount = await prisma.securityAudit.count();
  const assessmentsCount = await prisma.assessment.count();

  return (
    <div className="min-h-screen bg-[#020205] text-slate-200 pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex items-center justify-between border-b border-white/10 pb-8">
          <div>
            <h1 className="text-3xl font-bold text-white font-heading">SOC Command Center</h1>
            <p className="text-slate-400 mt-2">Global oversight of cyber defense operations and business consulting units.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: "Active Incidents (Critical)", value: incidentsCount, icon: <Crosshair className="w-5 h-5" />, color: "text-red-400" },
            { label: "Completed Security Audits", value: auditsCount, icon: <ShieldCheck className="w-5 h-5" />, color: "text-cyan-400" },
            { label: "Business Assessments Delivered", value: assessmentsCount, icon: <HardDrive className="w-5 h-5" />, color: "text-indigo-400" }
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
      </div>
    </div>
  );
}
