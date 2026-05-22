"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-[#050510] flex flex-col items-center justify-center p-6 text-center text-slate-300">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-10 flex flex-col items-center shadow-2xl"
      >
        <div className="w-20 h-20 bg-indigo-900/30 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-10 h-10 text-indigo-500" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4 font-outfit tracking-tight">System Offline</h1>
        <p className="text-slate-400 mb-8 leading-relaxed">
          It appears your connection to the GIIN Network has been severed. Please check your internet connection and try again.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-xl transition-all"
        >
          <RefreshCw className="w-5 h-5" />
          Reconnect
        </button>
        <div className="mt-6 pt-6 border-t border-slate-800/50 w-full">
          <Link href="/" className="text-sm text-slate-500 hover:text-white transition-colors">
            Return to Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
