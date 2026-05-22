import React from "react";
import { cookies } from "next/headers";
import { JWTService } from "@/lib/security/jwt";
import { redirect } from "next/navigation";
import { PenTool, BrainCircuit, FileText, FlaskConical, Network } from "lucide-react";

import prisma from "@/lib/prisma";

export default async function ResearcherDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("next-auth.session-token");
  
  if (!token) redirect("/auth/login");

  const payload = await JWTService.verify(token.value);
  if (!payload || !payload.email) redirect("/auth/login");

  const user = await prisma.user.findUnique({
    where: { email: payload.email as string },
    include: { 
      authoredPapers: { include: { paper: true } },
      ledResearch: true
    }
  });

  if (!user) redirect("/auth/login");

  const papers = user.authoredPapers.map(p => p.paper);
  const projects = user.ledResearch;

  return (
    <div className="min-h-screen bg-[#020205] text-slate-200 pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white font-heading">Researcher Workspace</h1>
            <p className="text-slate-400 mt-2">Manage your publications, virtual labs, and AI-assisted workflows.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_-3px_rgba(37,99,235,0.5)]">
              Submit Paper
            </button>
            <button className="px-4 py-2 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 text-violet-400 rounded-lg text-sm font-bold transition-all flex items-center gap-2">
              <BrainCircuit className="w-4 h-4" /> AI Assistant
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <PenTool className="w-5 h-5 text-blue-400" /> My Publications
              </h2>
            </div>
            
            {papers.length === 0 ? (
              <div className="p-8 border border-white/5 bg-white/5 rounded-2xl text-center backdrop-blur-xl">
                <p className="text-slate-400">You haven't submitted any research papers.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {papers.map(paper => (
                  <div key={paper.id} className="p-6 border border-white/10 bg-black/40 rounded-2xl backdrop-blur-xl transition-all hover:border-blue-500/30">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-white">{paper.title}</h3>
                      <span className="px-3 py-1 bg-white/10 text-white rounded-full text-xs font-bold uppercase tracking-wider">
                        {paper.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 line-clamp-3">{paper.abstract}</p>
                    <div className="mt-4 flex gap-4 text-xs text-slate-500">
                      {paper.doi && <span>DOI: {paper.doi}</span>}
                      <span>Published: {paper.publishedAt ? new Date(paper.publishedAt).toLocaleDateString() : 'N/A'}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-8">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                <FlaskConical className="w-5 h-5 text-violet-400" /> Virtual Lab Projects
              </h2>
              {projects.length === 0 ? (
                <div className="p-6 border border-white/5 bg-white/5 rounded-xl text-center">
                  <p className="text-slate-400 text-sm">No active virtual lab projects.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {projects.map(proj => (
                    <div key={proj.id} className="p-4 border border-white/10 bg-black/40 rounded-xl">
                      <h4 className="font-bold text-white">{proj.title}</h4>
                      <p className="text-sm text-slate-400 mt-1">{proj.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/20 to-black border border-blue-500/20 backdrop-blur-md">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-blue-400" /> AI Citation Engine
              </h3>
              <p className="text-sm text-slate-300 mb-4">Paste your bibliography or DOIs to generate formatted citations instantly.</p>
              <textarea 
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500" 
                rows={4} 
                placeholder="Enter DOI, URL, or plain text reference..."
              />
              <button className="mt-3 w-full py-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 border border-blue-500/30 font-bold rounded-lg transition-colors text-sm">
                Generate Citations
              </button>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Network className="w-5 h-5 text-slate-300" /> Peer Review Pipeline
              </h3>
              <div className="p-4 bg-black/40 border border-white/5 rounded-xl">
                <p className="text-sm text-slate-400 text-center">No pending reviews assigned to you.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
