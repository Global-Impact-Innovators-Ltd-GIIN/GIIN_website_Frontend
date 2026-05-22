import React from "react";
import { cookies } from "next/headers";
import { JWTService } from "@/lib/security/jwt";
import { redirect } from "next/navigation";
import { UploadCloud, Wand2, Scissors, History, FileVideo, LayoutGrid } from "lucide-react";

import prisma from "@/lib/prisma";

export default async function CreatorDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("next-auth.session-token");
  
  if (!token) redirect("/auth/login");

  const payload = await JWTService.verify(token.value);
  if (!payload || !payload.email) redirect("/auth/login");

  const user = await prisma.user.findUnique({
    where: { email: payload.email as string }
  });

  if (!user) redirect("/auth/login");

  // Fetch creator's assets
  const assets = await prisma.mediaAsset.findMany({
    where: { creatorId: user.id },
    include: { versions: true, organization: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-[#020205] text-slate-200 pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white font-heading">Creator Workspace</h1>
            <p className="text-slate-400 mt-2">Upload center, asset version control, and AI generation tools.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-sm font-bold transition-all flex items-center gap-2">
              <UploadCloud className="w-4 h-4" /> Upload Asset
            </button>
            <button className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-400 rounded-lg text-sm font-bold transition-all flex items-center gap-2">
              <Wand2 className="w-4 h-4" /> AI Thumbnail Gen
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-rose-500" /> Asset Portfolio & Versioning
              </h2>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
              <table className="w-full text-left text-sm">
                <thead className="bg-black/40 border-b border-white/10 text-slate-400">
                  <tr>
                    <th className="p-4 font-medium">Asset Title</th>
                    <th className="p-4 font-medium">Client / Org</th>
                    <th className="p-4 font-medium">Versions</th>
                    <th className="p-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-slate-500">No assets uploaded yet. Let's create!</td>
                    </tr>
                  ) : (
                    assets.map((asset: any) => (
                      <tr key={asset.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4 font-medium text-white flex items-center gap-3">
                          <FileVideo className="w-4 h-4 text-slate-500" />
                          {asset.title}
                        </td>
                        <td className="p-4 text-slate-400">{asset.organization.name}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <History className="w-4 h-4 text-slate-500" /> v{asset.versions.length}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 rounded bg-white/10 text-white text-xs font-bold">{asset.status}</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Scissors className="w-4 h-4 text-rose-400" /> Editing Workflow
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-black/40 rounded-lg border border-white/5 text-sm flex justify-between">
                  <span className="text-slate-300">Ingestion</span>
                  <span className="text-emerald-400 font-bold">12 OK</span>
                </div>
                <div className="p-3 bg-black/40 rounded-lg border border-white/5 text-sm flex justify-between">
                  <span className="text-slate-300">Proxy Gen</span>
                  <span className="text-amber-400 font-bold">2 Proc</span>
                </div>
                <div className="p-3 bg-black/40 rounded-lg border border-white/5 text-sm flex justify-between">
                  <span className="text-slate-300">Rendering</span>
                  <span className="text-slate-500 font-bold">0 Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
