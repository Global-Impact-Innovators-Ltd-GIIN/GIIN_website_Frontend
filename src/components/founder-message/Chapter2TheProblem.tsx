"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Cpu, GraduationCap, Coins, HelpCircle } from "lucide-react";

interface GapCard {
  icon: React.ComponentType<{ className?: string }>;
  num: string;
  title: string;
  details: string;
  implication: string;
}

export function Chapter2TheProblem() {
  const gaps: GapCard[] = [
    {
      icon: ShieldAlert,
      num: "01",
      title: "The Leadership Deficit",
      details: "Traditional training models prioritize administrative governance over long-term vision. The resulting gap leaves organizations and communities without strategic direction and ethical stewardship.",
      implication: "Decisions are driven by short-term gains, leaving future generations without resilient models of growth."
    },
    {
      icon: Cpu,
      num: "02",
      title: "The Sovereign Tech Divide",
      details: "Africa relies heavily on external cloud infrastructures and foreign software licensing. Without digital ownership of our fundamental tech stack, true independence is compromised.",
      implication: "Data sovereignty is outsourced, making regional systems vulnerable to external policies and dependencies."
    },
    {
      icon: GraduationCap,
      num: "03",
      title: "The Educational Mismatch",
      details: "Academic institutions teach outdated theoretical computer science and management practices, producing graduates unprepared for the rapid demands of AI, cryptography, and modern software engineering.",
      implication: "Top-tier talent is left under-equipped to construct the primary architecture required for modern businesses."
    },
    {
      icon: Coins,
      num: "04",
      title: "The Capital & Opportunity Gap",
      details: "Promising entrepreneurs and research groups face heavy dilution and lack of support from foreign funds. Local innovative systems fail to grow due to a lack of aligned capital.",
      implication: "High-impact continental ideas are either abandoned or forced to yield governance to foreign investment directives."
    }
  ];

  return (
    <section id="problem" className="py-24 bg-card/10 border-y border-border/10 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            <HelpCircle className="w-3.5 h-3.5" />
            Chapter 2: The Problem
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter font-heading leading-tight mb-6">
            The Gaps Inspiring <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-primary">Decisive Action</span>
          </h2>
          <p className="text-muted-foreground text-lg font-light leading-relaxed">
            True leadership begins with identifying systemic errors. We mapped the core issues holding back regional potential.
          </p>
        </div>

        {/* Gaps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {gaps.map((gap, i) => {
            const GapIcon = gap.icon;

            return (
              <motion.div
                key={gap.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-8 rounded-3xl border border-border/10 bg-card/40 hover:bg-card/75 backdrop-blur-3xl transition-all duration-300 relative overflow-hidden shadow-xl"
              >
                {/* Visual indicator corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 blur-[40px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl border border-border/10 bg-muted/40 text-red-400 group-hover:bg-red-500/10 transition-colors flex items-center justify-center">
                    <GapIcon className="w-5 h-5" />
                  </div>
                  <span className="text-4xl font-black text-red-500/15 font-mono group-hover:text-red-500/25 transition-colors">
                    {gap.num}
                  </span>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-foreground font-heading mb-3">
                  {gap.title}
                </h3>
                
                <p className="text-muted-foreground text-xs font-light leading-relaxed mb-6">
                  {gap.details}
                </p>

                <div className="border-t border-border/15 pt-4">
                  <span className="text-[9px] font-bold text-red-500/80 tracking-widest uppercase block mb-1">
                    SYSTEMIC IMPLICATION
                  </span>
                  <p className="text-xs text-foreground/80 font-light italic leading-normal">
                    &ldquo;{gap.implication}&rdquo;
                  </p>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
