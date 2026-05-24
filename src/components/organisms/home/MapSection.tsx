"use client";

import { motion } from "framer-motion";

export function MapSection() {
  return (
    <section className="relative w-full border-t border-border/50 bg-background py-32 overflow-hidden transition-colors duration-500">
      {/* Stylized background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 dark:bg-primary/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.h2
          className="mb-6 font-heading text-4xl font-black md:text-7xl text-foreground tracking-tighter"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Innovation Map of <span className="text-primary italic">Africa</span>
        </motion.h2>

        <motion.p
          className="mx-auto mb-16 max-w-2xl text-lg text-muted-foreground font-light text-balance"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Visualizing our footprint across the continent. From bustling tech hubs in Lagos and Nairobi to emerging ecosystems in Kigali and Accra.
        </motion.p>

        {/* Map Placeholder */}
        <motion.div
          className="relative mx-auto max-w-5xl aspect-video rounded-[3rem] border border-border/10 bg-card backdrop-blur-md flex items-center justify-center overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {/* Simulated glowing nodes */}
          <div className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-accent shadow-[0_0_20px_4px_var(--accent-glow)] animate-pulse" />
          <div className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full bg-primary shadow-[0_0_20px_4px_var(--primary-glow)] animate-pulse delay-75" />
          <div className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-accent shadow-[0_0_20px_4px_var(--accent-glow)] animate-pulse delay-150" />
          <div className="absolute bottom-1/3 right-1/4 w-5 h-5 rounded-full bg-primary shadow-[0_0_20px_4px_var(--primary-glow)] animate-pulse delay-300" />

          <h3 className="text-2xl font-black text-foreground/10 uppercase tracking-widest italic">Interactive Map Layer</h3>
        </motion.div>
      </div>
    </section>
  );
}
