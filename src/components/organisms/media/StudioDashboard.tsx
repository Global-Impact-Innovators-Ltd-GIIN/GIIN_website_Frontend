"use client";

import { motion } from "framer-motion";
import { studioStatsData } from "@/data/media";

export function StudioDashboard() {
  return (
    <div className="p-8 md:p-12 w-full max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row gap-8 items-start justify-between border-b border-white/10 pb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Content Studio</h1>
          <p className="text-muted-foreground text-lg">Manage live streams, video assets, and global distribution.</p>
        </div>
        <button className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary/80 transition-colors shadow-[0_0_20px_rgba(79,70,229,0.3)]">
          + New Upload
        </button>
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div className="bg-white/5 border border-white/10 p-6 rounded-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-white/50 text-sm font-bold uppercase tracking-widest mb-2">Total Network Views</div>
          <div className="text-4xl font-extrabold text-white">{studioStatsData.totalViews}</div>
        </motion.div>
        <motion.div className="bg-white/5 border border-white/10 p-6 rounded-2xl border-l-4 border-l-red-500" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="text-white/50 text-sm font-bold uppercase tracking-widest mb-2">Active Live Streams</div>
          <div className="text-4xl font-extrabold text-red-500 flex items-center gap-3">
            {studioStatsData.activeStreams} <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
          </div>
        </motion.div>
        <motion.div className="bg-white/5 border border-white/10 p-6 rounded-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="text-white/50 text-sm font-bold uppercase tracking-widest mb-2">Storage Used</div>
          <div className="text-4xl font-extrabold text-white">{studioStatsData.storageUsed}</div>
        </motion.div>
      </div>

      {/* Recent Uploads Grid */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6">Recent Assets</h2>
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-black/50">
                <th className="p-4 text-xs uppercase tracking-widest text-white/50 font-bold">Asset Name</th>
                <th className="p-4 text-xs uppercase tracking-widest text-white/50 font-bold">Category</th>
                <th className="p-4 text-xs uppercase tracking-widest text-white/50 font-bold">Duration</th>
                <th className="p-4 text-xs uppercase tracking-widest text-white/50 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {studioStatsData.recentUploads.map((asset, i) => (
                <tr key={asset.id} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${i === studioStatsData.recentUploads.length -1 ? 'border-b-0' : ''}`}>
                  <td className="p-4 font-semibold text-white flex items-center gap-4">
                    <div className={`w-12 h-8 rounded-md ${asset.thumbnail} bg-gradient-to-br`} />
                    {asset.title}
                  </td>
                  <td className="p-4 text-sm text-white/70">{asset.category}</td>
                  <td className="p-4 text-sm text-white/70">{asset.duration}</td>
                  <td className="p-4 text-right">
                    <button className="text-primary hover:text-white transition-colors text-sm font-medium mr-4">Edit</button>
                    <button className="text-white/30 hover:text-red-500 transition-colors text-sm font-medium">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
