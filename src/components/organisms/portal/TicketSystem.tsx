"use client";

import { mockTickets } from "@/data/portal";
import { useState } from "react";

export function TicketSystem() {
  const [activeTicket, setActiveTicket] = useState(mockTickets[0]);

  return (
    <div className="w-full h-[calc(100vh-150px)] flex bg-[#111116] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
      
      {/* Ticket List Pane */}
      <div className="w-1/3 border-r border-white/10 flex flex-col bg-black/20">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="font-bold text-lg text-white">Support Tickets</h2>
          <button className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {mockTickets.map((ticket) => (
            <div 
              key={ticket.id}
              onClick={() => setActiveTicket(ticket)}
              className={`p-6 border-b border-white/5 cursor-pointer transition-colors ${
                activeTicket.id === ticket.id ? 'bg-primary/10 border-l-4 border-l-primary' : 'hover:bg-white/5 border-l-4 border-l-transparent'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white/50">{ticket.id}</span>
                <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-sm ${
                  ticket.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {ticket.status}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">{ticket.subject}</h4>
              <p className="text-xs text-white/40 mt-3">Updated {ticket.lastUpdate}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ticket Chat Pane */}
      <div className="w-2/3 flex flex-col bg-transparent">
        <div className="p-6 border-b border-white/10 bg-black/40 backdrop-blur-md shrink-0">
          <h2 className="font-bold text-xl text-white mb-1">{activeTicket.subject}</h2>
          <p className="text-sm text-white/50 font-medium">Ticket ID: {activeTicket.id} • Assigned to GIIN Enterprise Support</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* Mock Messages */}
          <div className="flex justify-end">
             <div className="bg-primary text-white p-4 rounded-2xl rounded-tr-sm max-w-[70%] text-sm leading-relaxed">
               Hello team, we need to update the SSL certificates on the staging environment before tomorrow&apos;s deployment. Can this be prioritized?
             </div>
          </div>
          <div className="flex justify-start gap-4">
             <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0 border border-white/20">
               <span className="text-xs font-bold text-white">GS</span>
             </div>
             <div className="bg-white/10 text-white p-4 rounded-2xl rounded-tl-sm max-w-[70%] text-sm leading-relaxed">
               Hi Acme Team. Acknowledged. Our DevOps team is currently rotating the certificates. This should be completed within the hour.
             </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-white/10 bg-black/20 shrink-0">
          <div className="relative flex items-center bg-black border border-white/10 rounded-xl p-2 focus-within:border-primary/50 transition-colors">
            <input 
              type="text" 
              placeholder="Type your message..."
              className="w-full bg-transparent text-white placeholder:text-white/30 px-4 focus:outline-none"
            />
            <button className="m-1 w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center shrink-0 hover:bg-primary/80 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
