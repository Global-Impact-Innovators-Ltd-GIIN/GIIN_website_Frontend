import React from "react";
import { cookies } from "next/headers";
import { JWTService } from "@/lib/security/jwt";
import { redirect } from "next/navigation";
import { Library, Users, FileText, Database } from "lucide-react";

import prisma from "@/lib/prisma";

export default async function ResearchAdminDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("next-auth.session-token");
  
  if (!token) redirect("/auth/login");

  const payload = await JWTService.verify(token.value);
  if (!payload || payload.role !== "ADMIN") redirect("/auth/login");

  const papersCount = await prisma.researchPaper.count();
  const coursesCount = await prisma.course.count();
  const projectsCount = await prisma.academicProject.count();

  const recentPapers = await prisma.researchPaper.findMany({
    take: 5,
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="min-h-screen bg-[#020205] text-slate-200 pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex items-center justify-between border-b border-white/10 pb-8">
          <div>
            <h1 className="text-3xl font-bold text-white font-heading">Academy & Research Admin</h1>
            <p className="text-slate-400 mt-2">Manage the global knowledge hub, academic journals, and course engines.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: "Published Papers", value: papersCount, icon: <FileText className="w-5 h-5" />, color: "text-blue-400" },
            { label: "Active Courses", value: coursesCount, icon: <Library className="w-5 h-5" />, color: "text-violet-400" },
            { label: "Virtual Labs", value: projectsCount, icon: <Database className="w-5 h-5" />, color: "text-emerald-400" }
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
              <h2 className="text-lg font-bold text-white">Recent Research Submissions</h2>
            </div>
            <div className="p-6">
              {recentPapers.length === 0 ? (
                <p className="text-slate-500">No papers submitted.</p>
              ) : (
                <ul className="space-y-4">
                  {recentPapers.map(p => (
                    <li key={p.id} className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                      <div>
                        <p className="font-bold text-white">{p.title}</p>
                        <p className="text-xs text-slate-400 truncate max-w-sm">{p.abstract}</p>
                      </div>
                      <span className="px-3 py-1 bg-white/10 text-white rounded-full text-xs font-bold tracking-wider uppercase">
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
