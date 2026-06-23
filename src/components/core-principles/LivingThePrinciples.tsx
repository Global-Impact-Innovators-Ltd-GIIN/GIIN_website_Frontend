"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Shield, Eye, Flame } from "lucide-react";

interface ActionScenario {
  title: string;
  context: string;
  applied: string[];
  outcome: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function LivingThePrinciples() {
  const scenarios: ActionScenario[] = [
    {
      title: "Choosing Sovereign Tech Over Licensed Control",
      context: "A commercial vendor offered to license an enterprise database system for our regional health platform at a steep discount, proposing quick time-to-market but requiring proprietary integrations.",
      applied: ["Radical Sovereignty", "Think Long-Term"],
      outcome: "We rejected the proprietary system. Our team invested an additional six weeks to construct a highly performant, open-source distributed database. This ensured total regional data ownership, protecting health data from foreign policy and currency shifts.",
      icon: Shield,
    },
    {
      title: "Radical Post-Mortem of API Outages",
      context: "During an upgrade, our community identity server went offline for 42 minutes, disrupting access for local developer circles. The error was identified as a configuration oversight by a senior engineer.",
      applied: ["Take Responsibility", "Communicate Clearly"],
      outcome: "Instead of blaming cloud providers or hiding details behind a generic maintenance page, we published an unedited audit log post-mortem. We detailed the exact configuration mistake, shared our mitigation scripting, and held an open forum with developers to prevent repeats.",
      icon: Eye,
    },
    {
      title: "Refactoring Substandard Work",
      context: "A partner database portal was completed ahead of schedule and met all basic user acceptance requirements. However, internal architectural review revealed minor indexing defects that could impact scaling under high load.",
      applied: ["Deliver Excellence", "Excellence over Convenience"],
      outcome: "We delayed deployment by three days to refactor the database queries. Even though the client would not notice the difference immediately, we prioritized long-term codebase structural health, refusing to ship a product below our engineering standards.",
      icon: Flame,
    },
  ];

  return (
    <section id="action" className="py-24 bg-[#020205] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 z-10 relative">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
            Case Studies
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6 font-outfit">
            Principles In Action
          </h2>
          <p className="text-lg text-slate-400 font-light leading-relaxed">
            Values are not just text. Here is how GIIN engineers and leaders solve real dilemmas, prioritizing character and sovereignty over convenience.
          </p>
        </div>

        {/* 3-Column Scenario Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {scenarios.map((scen, idx) => {
            const Icon = scen.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex flex-col h-full rounded-3xl bg-[#090912] border border-white/5 overflow-hidden p-8 hover:border-primary/20 hover:bg-[#0c0c16] transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white leading-tight font-outfit">
                    {scen.title}
                  </h3>
                </div>

                {/* Context */}
                <div className="mb-6 flex-grow">
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-2">
                    The Context
                  </div>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    {scen.context}
                  </p>
                </div>

                {/* Principles Applied Tagging */}
                <div className="mb-6">
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-2">
                    Principles Enforced
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {scen.applied.map((p, pIdx) => (
                      <span
                        key={pIdx}
                        className="text-[10px] font-semibold text-primary px-2.5 py-1 rounded-full bg-primary/10 border border-primary/25 uppercase tracking-wider"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Outcome */}
                <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 mt-auto">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-white">
                      The Outcome
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {scen.outcome}
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
