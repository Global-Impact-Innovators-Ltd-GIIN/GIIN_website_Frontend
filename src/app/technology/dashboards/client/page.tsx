import React from "react";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { JWTService } from "@/lib/security/jwt";
import { redirect } from "next/navigation";
import { Clock, CheckCircle2, AlertCircle, FileText } from "lucide-react";

const prisma = new PrismaClient();

export default async function ClientDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("next-auth.session-token");
  
  if (!token) {
    redirect("/auth/login");
  }

  const payload = await JWTService.verify(token.value);
  if (!payload || !payload.email) {
    redirect("/auth/login");
  }

  // Find user's organization projects (assuming the user is associated with a Client organization)
  // For demo purposes, we fetch projects where the user is somehow related, or just all for now
  const user = await prisma.user.findUnique({
    where: { email: payload.email as string },
    include: {
      organizations: { include: { organization: true } }
    }
  });

  const orgIds = user?.organizations.map(o => o.organizationId) || [];

  const projects = await prisma.project.findMany({
    where: { organizationId: { in: orgIds } },
    include: {
      tasks: true,
      tickets: true
    }
  });

  const proposals = await prisma.proposal.findMany({
    where: { clientId: { in: orgIds } }
  });

  return (
    <div className="min-h-screen bg-[#020205] text-slate-200 pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-3xl font-bold text-white font-heading">Client Portal</h1>
          <p className="text-slate-400 mt-2">Welcome back, {user?.firstName || "Enterprise Client"}. Here is your project overview.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> Active Projects
            </h2>
            {projects.length === 0 ? (
              <div className="p-8 border border-white/5 bg-white/5 rounded-2xl text-center backdrop-blur-xl">
                <p className="text-slate-400">No active projects found. Request a consultation to begin.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {projects.map(project => (
                  <div key={project.id} className="p-6 border border-white/10 bg-black/40 rounded-2xl backdrop-blur-xl transition-all hover:border-primary/30">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white">{project.name}</h3>
                        <p className="text-sm text-slate-400">{project.description}</p>
                      </div>
                      <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
                        {project.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/5">
                      <div>
                        <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Timeline</span>
                        <p className="text-sm text-white mt-1">{project.timeline || "TBD"}</p>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Budget</span>
                        <p className="text-sm text-white mt-1">${project.budget?.toLocaleString() || "TBD"}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" /> Quotations & Proposals
            </h2>
            <div className="space-y-4">
              {proposals.length === 0 ? (
                <div className="p-6 border border-white/5 bg-white/5 rounded-2xl text-center backdrop-blur-xl">
                  <p className="text-sm text-slate-400">No active proposals.</p>
                </div>
              ) : (
                proposals.map(prop => (
                  <div key={prop.id} className="p-4 border border-white/10 bg-black/40 rounded-xl">
                    <h4 className="font-bold text-white text-sm">{prop.title}</h4>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-cyan-400 font-bold">${prop.totalAmount.toLocaleString()}</span>
                      <span className="text-xs bg-white/10 px-2 py-1 rounded text-slate-300">{prop.status}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-indigo-900/20 border border-primary/20">
              <h3 className="font-bold text-white mb-2">Need Support?</h3>
              <p className="text-sm text-slate-300 mb-4">Open a support ticket or request a consultation with our engineering team.</p>
              <button className="w-full py-2 bg-white text-primary font-bold rounded-lg hover:bg-slate-100 transition-colors">
                Open Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
