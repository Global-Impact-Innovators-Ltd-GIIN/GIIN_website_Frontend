"use client";

import { motion } from "framer-motion";
import { mockInvoices } from "@/data/portal";

export function FinanceTable() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Finance & Invoices</h1>
          <p className="text-white/50">Manage your enterprise billing and view payment history.</p>
        </div>
        <button className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary/80 transition-colors shadow-[0_0_20px_rgba(79,70,229,0.3)]">
          Download Statement
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#111116] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
      >
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-black/50">
              <th className="p-6 text-xs uppercase tracking-widest text-white/50 font-bold">Invoice ID</th>
              <th className="p-6 text-xs uppercase tracking-widest text-white/50 font-bold">Date Issued</th>
              <th className="p-6 text-xs uppercase tracking-widest text-white/50 font-bold">Amount</th>
              <th className="p-6 text-xs uppercase tracking-widest text-white/50 font-bold">Status</th>
              <th className="p-6 text-xs uppercase tracking-widest text-white/50 font-bold text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockInvoices.map((invoice, i) => (
              <tr key={invoice.id} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${i === mockInvoices.length - 1 ? 'border-0' : ''}`}>
                <td className="p-6 font-bold text-white">{invoice.id}</td>
                <td className="p-6 text-white/70 font-medium">{invoice.date}</td>
                <td className="p-6 font-bold text-white text-lg">{invoice.amount}</td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                    invoice.status === 'Paid' ? 'bg-emerald-500/20 text-emerald-400' : 
                    invoice.status === 'Pending' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="p-6 text-right">
                  {invoice.status === "Pending" ? (
                    <button className="text-primary hover:text-white transition-colors text-sm font-bold border border-primary/50 px-4 py-2 rounded-lg hover:bg-primary">
                      Pay Now
                    </button>
                  ) : (
                    <button className="text-white/50 hover:text-white transition-colors text-sm font-medium">
                      Download PDF
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
