"use client";

import { motion } from "framer-motion";
import { DivisionData } from "@/data/divisions";

interface Props {
  data: DivisionData;
}

export function ConsultationForm({ data }: Props) {
  return (
    <section className="relative w-full py-32 overflow-hidden bg-background border-t border-white/10">
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-gradient-to-b ${data.themeColor} opacity-50 blur-[150px] pointer-events-none`} />
      
      <div className="container relative z-10 mx-auto px-6 max-w-3xl text-center">
        <motion.h2 
          className="mb-4 font-heading text-4xl font-bold md:text-5xl text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Partner with <span className="text-primary">GIIN</span>
        </motion.h2>
        <p className="mb-12 text-lg text-muted-foreground">
          Schedule a strategic consultation with the {data.name} team.
        </p>

        <motion.form 
          className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl text-left space-y-6"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Full Name</label>
              <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="Jane Doe" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Corporate Email</label>
              <input type="email" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="jane@enterprise.com" required />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Organization</label>
            <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="Enterprise Inc." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Project Scope & Objectives</label>
            <textarea className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors h-32 resize-none" placeholder="How can we help you scale?" required />
          </div>
          <button type="submit" className="w-full bg-primary hover:bg-primary/80 text-white font-bold py-4 rounded-xl transition-colors shadow-[0_0_20px_rgba(79,70,229,0.3)]">
            Request Consultation
          </button>
        </motion.form>
      </div>
    </section>
  );
}
