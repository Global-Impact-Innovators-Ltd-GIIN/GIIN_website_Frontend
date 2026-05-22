"use client";

import { motion } from "framer-motion";
import { mockDocuments } from "@/data/portal";

export function DocumentVault() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Document Vault</h1>
          <p className="text-white/50">Securely access proposals, contracts, and architecture diagrams.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white/10 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/20 transition-colors border border-white/20">
            Create Folder
          </button>
          <button className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary/80 transition-colors shadow-[0_0_20px_rgba(79,70,229,0.3)] flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            Upload File
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDocuments.map((doc, i) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#111116] border border-white/10 rounded-3xl p-6 group cursor-pointer hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                doc.type === 'Contract' ? 'bg-amber-500/20 text-amber-500' :
                doc.type === 'Proposal' ? 'bg-blue-500/20 text-blue-500' : 'bg-emerald-500/20 text-emerald-500'
              }`}>
                {doc.type === 'Contract' && <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                {doc.type === 'Proposal' && <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>}
                {doc.type === 'Report' && <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
              </div>
              <button className="text-white/30 group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
              </button>
            </div>
            
            <h3 className="font-bold text-white text-lg mb-2 truncate" title={doc.name}>{doc.name}</h3>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/50">{doc.date}</span>
              <span className="text-white/30 font-medium">{doc.size}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
