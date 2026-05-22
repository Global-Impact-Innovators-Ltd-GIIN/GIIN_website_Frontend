"use client";

import { motion } from "framer-motion";
import { aiPersonas } from "@/data/ai";
import Link from "next/link";

export function AgentGrid() {
  return (
    <div className="flex-1 overflow-y-auto p-8 md:p-12 w-full max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">GIIN Consultant Personas</h1>
        <p className="text-xl text-muted-foreground">Select a specialized AI agent to assist with your enterprise objectives.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {aiPersonas.map((persona, i) => (
          <Link href={`/ai/chat/${persona.id}`} key={persona.id}>
            <motion.div
              className="group relative flex flex-col rounded-3xl border border-white/10 bg-white/5 p-8 overflow-hidden hover:border-primary/50 transition-all cursor-pointer h-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${persona.color} blur-[50px] opacity-20 group-hover:opacity-60 transition-opacity`} />
              
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-6 relative z-10 group-hover:scale-110 transition-transform">
                {persona.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2 leading-tight relative z-10">{persona.name}</h3>
              <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4 relative z-10">{persona.role}</p>
              <p className="text-muted-foreground relative z-10 mb-8 flex-1">
                {persona.description}
              </p>
              
              <div className="flex items-center text-sm font-bold text-white group-hover:text-primary transition-colors mt-auto">
                Initialize Session <span aria-hidden="true" className="ml-2">&rarr;</span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
