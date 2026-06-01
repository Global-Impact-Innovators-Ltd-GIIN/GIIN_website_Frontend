"use client";

import { motion } from "framer-motion";
import { mockTasks, mockInvoices, mockTickets } from "@/data/portal";

export function DashboardMetrics() {
  const activeProjects = mockTasks.filter(t => t.status !== "done").length;
  const pendingInvoices = mockInvoices.filter(i => i.status === "Pending").length;
  const openTickets = mockTickets.filter(t => t.status === "Open").length;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-3xl p-8 border border-white/10 relative overflow-hidden"
      >
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/30 blur-[100px] rounded-full" />
        <h1 className="text-3xl font-bold text-white mb-2 relative z-10">Welcome back, Acme Corp.</h1>
        <p className="text-white/70 text-lg relative z-10">Here is your enterprise overview for today.</p>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#111116] border border-white/10 rounded-3xl p-6"
        >
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
          </div>
          <p className="text-white/50 text-sm font-bold uppercase tracking-widest mb-1">Active Projects</p>
          <h3 className="text-4xl font-extrabold text-white">{activeProjects}</h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#111116] border border-white/10 rounded-3xl p-6"
        >
          <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <p className="text-white/50 text-sm font-bold uppercase tracking-widest mb-1">Pending Invoices</p>
          <h3 className="text-4xl font-extrabold text-white">{pendingInvoices}</h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#111116] border border-white/10 rounded-3xl p-6"
        >
          <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
          </div>
          <p className="text-white/50 text-sm font-bold uppercase tracking-widest mb-1">Open Tickets</p>
          <h3 className="text-4xl font-extrabold text-white">{openTickets}</h3>
        </motion.div>
      </div>
    </div>
  );
}
