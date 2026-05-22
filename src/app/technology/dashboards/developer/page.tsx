import React from "react";
import { cookies } from "next/headers";
import { JWTService } from "@/lib/security/jwt";
import { redirect } from "next/navigation";
import { GitBranch, Terminal, LayoutList, Bug, PlusCircle } from "lucide-react";

import prisma from "@/lib/prisma";

export default async function DeveloperDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("next-auth.session-token");
  
  if (!token) {
    redirect("/auth/login");
  }

  const payload = await JWTService.verify(token.value);
  if (!payload || !payload.email) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: payload.email as string },
  });

  if (!user) redirect("/auth/login");

  // Fetch tasks assigned to the developer
  const tasks = await prisma.task.findMany({
    where: { assigneeId: user.id },
    include: { project: true }
  });

  const tickets = await prisma.ticket.findMany({
    where: { status: "OPEN" },
    take: 5
  });

  return (
    <div className="min-h-screen bg-[#020205] text-slate-200 pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex items-center justify-between border-b border-white/10 pb-8">
          <div>
            <h1 className="text-3xl font-bold text-white font-heading">Developer Workspace</h1>
            <p className="text-slate-400 mt-2">Engineering command center. Track workflows, resolve tickets, build the future.</p>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-sm font-medium transition-all flex items-center gap-2">
              <Terminal className="w-4 h-4" /> AI Architect
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <LayoutList className="w-5 h-5 text-primary" /> Active Tasks
              </h2>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
              <table className="w-full text-left text-sm">
                <thead className="bg-black/40 border-b border-white/10 text-slate-400">
                  <tr>
                    <th className="p-4 font-medium">Task</th>
                    <th className="p-4 font-medium">Project</th>
                    <th className="p-4 font-medium">Priority</th>
                    <th className="p-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-slate-500">No active tasks assigned to you.</td>
                    </tr>
                  ) : (
                    tasks.map(task => (
                      <tr key={task.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4 font-medium text-white">{task.title}</td>
                        <td className="p-4 text-slate-400">{task.project.name}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${task.priority === "HIGH" || task.priority === "CRITICAL" ? "bg-red-500/20 text-red-400" : "bg-primary/20 text-primary"}`}>
                            {task.priority}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 rounded bg-white/10 text-white text-xs font-bold">{task.status}</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Bug className="w-5 h-5 text-red-400" /> Open Tickets
            </h2>
            <div className="space-y-4">
              {tickets.length === 0 ? (
                <div className="p-6 border border-white/5 bg-white/5 rounded-2xl text-center backdrop-blur-xl">
                  <p className="text-sm text-slate-400">Zero inbox! No open tickets.</p>
                </div>
              ) : (
                tickets.map(ticket => (
                  <div key={ticket.id} className="p-4 border border-white/10 bg-black/40 rounded-xl">
                    <h4 className="font-bold text-white text-sm truncate">{ticket.subject}</h4>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded font-bold">{ticket.priority}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-900/20 to-black border border-cyan-500/20">
              <h3 className="font-bold text-white mb-2 flex items-center gap-2"><GitBranch className="w-4 h-4 text-cyan-400" /> Repositories</h3>
              <p className="text-sm text-slate-400 mb-4">Connect and sync with enterprise Git providers.</p>
              <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-lg transition-colors">
                Manage Git Sync
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
