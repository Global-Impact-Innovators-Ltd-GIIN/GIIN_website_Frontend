"use client";

import React from "react";
import { motion } from "framer-motion";
import { Eye, Heart, GraduationCap, Cpu, Layers, Sparkles } from "lucide-react";

interface Milestone {
  icon: React.ComponentType<{ className?: string }>;
  year: string;
  title: string;
  description: string;
  motivation: string;
}

export function FounderStory() {
  const milestones: Milestone[] = [
    {
      icon: Eye,
      year: "2018",
      title: "Vision Formation",
      description: "Observing systemic barriers in local tech and leadership access.",
      motivation: "Realizing that building digital solutions requires a sovereign foundation owned by African builders rather than third-party platforms.",
    },
    {
      icon: Heart,
      year: "2020",
      title: "Community Impact",
      description: "Launching regional mentorship, bootcamps, and early incubator experiments.",
      motivation: "Bridging the gap between theory and real-world implementation, training over 2,000 students in core software engineering.",
    },
    {
      icon: GraduationCap,
      year: "2022",
      title: "Leadership Development",
      description: "Structuring curricula for training next-generation public and private sector leaders.",
      motivation: "Establishing the Leadership Academy to teach governance, operational ethics, and scalable organization building.",
    },
    {
      icon: Cpu,
      year: "2024",
      title: "Technology Innovation",
      description: "Deploying proprietary AI architectures, mesh networks, and capital systems.",
      motivation: "Unifying distributed developers and deploying secure cloud instances tailored for localized trade and governance.",
    },
    {
      icon: Layers,
      year: "2026",
      title: "GIIN Ecosystem Creation",
      description: "Integrating all platforms into a single unified sovereign network.",
      motivation: "Enabling high-impact capital access, media networks, and technology solutions to operate collectively under a single banner.",
    },
  ];

  return (
    <section id="story" className="py-24 bg-card/10 border-y border-border/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            The Origin Narrative
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter font-heading leading-tight mb-6">
            The Journey Behind <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Our Conviction</span>.
          </h2>
          <p className="text-muted-foreground text-lg font-light leading-relaxed">
            Every movement has a beginning. Ours was born out of a determination to solve structural roadblocks and empower creators across Africa.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical central line for desktop, left line for mobile */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary/30 via-indigo-500/30 to-accent/30 -translate-x-[1px]" />

          <div className="space-y-16">
            {milestones.map((milestone, i) => {
              const Icon = milestone.icon;
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className={`relative flex flex-col md:flex-row ${
                    isEven ? "md:flex-row-reverse" : ""
                  } items-start md:items-center`}
                >
                  {/* Central Node Indicator */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full border-2 border-primary/50 bg-background flex items-center justify-center -translate-x-1/2 z-20 shadow-lg group">
                    <Icon className="w-4 h-4 text-accent" />
                  </div>

                  {/* Empty space for alignment on desktop */}
                  <div className="hidden md:block w-1/2" />

                  {/* Timeline Card */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                    <div className="p-8 rounded-3xl border border-border/10 bg-card/40 backdrop-blur-xl hover:border-primary/30 transition-all duration-300 shadow-xl relative hover:bg-card/60 group">
                      {/* Year Indicator */}
                      <span className="absolute top-6 right-8 text-2xl font-black text-primary/25 font-heading">
                        {milestone.year}
                      </span>
                      
                      <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary-foreground mb-6">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>

                      <h3 className="text-xl font-bold text-foreground mb-3 font-heading group-hover:text-accent transition-colors">
                        {milestone.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm font-light mb-4 leading-relaxed">
                        {milestone.description}
                      </p>

                      <div className="border-t border-border/10 pt-4 mt-4">
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">
                          CONVICTION DRIVER
                        </p>
                        <p className="text-xs text-foreground/80 font-light italic leading-normal">
                          &ldquo;{milestone.motivation}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
