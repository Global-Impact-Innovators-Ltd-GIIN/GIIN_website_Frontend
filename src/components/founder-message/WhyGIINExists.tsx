"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";

interface ChallengeSolution {
  id: string;
  challengeTitle: string;
  challengeDesc: string;
  solutionTitle: string;
  solutionDesc: string;
  impactMetric: string;
}

export function WhyGIINExists() {
  const [activeCard, setActiveCard] = useState<string>("leadership");

  const pairs: ChallengeSolution[] = [
    {
      id: "leadership",
      challengeTitle: "The Leadership Gap",
      challengeDesc: "Traditional structures often prioritize short-term administrative outcomes over long-term visionary impact, leaving communities without strategic direction.",
      solutionTitle: "Leadership Development Programs",
      solutionDesc: "GIIN designs structured, high-intensity training programs that teach ethical governance, system-thinking, and decentralized management frameworks.",
      impactMetric: "Targeting 10,000+ certified leaders by 2030",
    },
    {
      id: "divide",
      challengeTitle: "The Technology Divide",
      challengeDesc: "Emerging markets rely heavily on external cloud architectures and software licensing, compromising national and continental digital sovereignty.",
      solutionTitle: "Digital Sovereign Initiatives",
      solutionDesc: "Building localized, self-healing mesh node networks and local open-source systems that guarantee absolute autonomy for public and private use.",
      impactMetric: "Zero-dependency cloud infra active",
    },
    {
      id: "innovation",
      challengeTitle: "Innovation Bottlenecks",
      challengeDesc: "Talented software engineers and scientific researchers lack access to sandboxed testing spaces and local R&D funding models.",
      solutionTitle: "GIIN Labs & Sandboxes",
      solutionDesc: "Establishing state-of-the-art developer sandboxes and hardware hubs to test, break, and refine emerging software ideas safely.",
      impactMetric: "5 core active research protocols",
    },
    {
      id: "skills",
      challengeTitle: "Skills Mismatch",
      challengeDesc: "Academic institutions teach outdated theoretical frameworks, leaving graduates unprepared for the rapid evolution of AI and distributed ledger engineering.",
      solutionTitle: "GIIN Technology Academy",
      solutionDesc: "Self-paced and cohort-driven bootcamps teaching advanced computer science, systems design, and cybersecurity protocols.",
      impactMetric: "50,000+ members in learning network",
    },
    {
      id: "capital",
      challengeTitle: "Economic Underfunding",
      challengeDesc: "Promising early-stage startups and social innovators struggle to secure capital without giving up significant control to foreign funds.",
      solutionTitle: "Sovereign Innovation Loans",
      solutionDesc: "Providing low-interest development funding and incubator frameworks that safeguard startup sovereignty and fuel local economies.",
      impactMetric: "Integrated capital dashboard live",
    },
  ];

  return (
    <section className="py-24 bg-background relative z-10">
      {/* Visual background lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            <HelpCircle className="w-3.5 h-3.5" />
            The Mandate
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter font-heading leading-tight mb-4">
            Why GIIN Exists
          </h2>
          <p className="text-muted-foreground text-lg font-light leading-relaxed">
            The fundamental problems we observed, and the direct sovereign solutions we are actively building to resolve them.
          </p>
        </div>

        {/* Tab & Interactive Panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: Buttons / Selector */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {pairs.map((item) => {
              const isActive = activeCard === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveCard(item.id)}
                  className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 text-left ${
                    isActive
                      ? "bg-primary/10 border-primary text-foreground shadow-lg"
                      : "bg-card/20 border-border/10 text-muted-foreground hover:bg-card/45 hover:border-border/20"
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                      Challenge area
                    </span>
                    <span className="text-md font-bold tracking-tight font-heading">
                      {item.challengeTitle}
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isActive ? "rotate-90 text-accent" : ""}`} />
                </button>
              );
            })}
          </div>

          {/* Right Side: Showcase Cards */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {pairs.map((item) => {
                if (item.id !== activeCard) return null;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="h-full flex flex-col justify-between p-8 md:p-10 rounded-[2.5rem] border border-border/10 bg-card/40 backdrop-blur-3xl shadow-2xl relative overflow-hidden"
                  >
                    {/* Glowing highlight corner */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/15 blur-[60px] rounded-full pointer-events-none" />

                    <div className="space-y-8">
                      {/* Challenge Card Block */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-red-500/80">
                          <ShieldAlert className="w-5 h-5" />
                          <span className="text-xs font-bold uppercase tracking-widest">The Challenge</span>
                        </div>
                        <h3 className="text-xl font-bold tracking-tight text-foreground font-heading">
                          {item.challengeTitle}
                        </h3>
                        <p className="text-muted-foreground text-sm font-light leading-relaxed">
                          {item.challengeDesc}
                        </p>
                      </div>

                      {/* Divider with a glow */}
                      <div className="h-px bg-gradient-to-r from-red-500/10 via-primary/30 to-emerald-500/10 w-full" />

                      {/* Solution Card Block */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-emerald-500/90">
                          <CheckCircle2 className="w-5 h-5 text-accent" />
                          <span className="text-xs font-bold uppercase tracking-widest">The GIIN Solution</span>
                        </div>
                        <h3 className="text-xl font-bold tracking-tight text-foreground font-heading">
                          {item.solutionTitle}
                        </h3>
                        <p className="text-muted-foreground text-sm font-light leading-relaxed">
                          {item.solutionDesc}
                        </p>
                      </div>
                    </div>

                    {/* Bottom details / metrics block */}
                    <div className="mt-8 pt-6 border-t border-border/5 flex flex-wrap justify-between items-center gap-4">
                      <div>
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block">
                          PROJECTED IMPACT
                        </span>
                        <span className="text-xs font-bold text-accent">
                          {item.impactMetric}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                        Ecosystem Verified
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
