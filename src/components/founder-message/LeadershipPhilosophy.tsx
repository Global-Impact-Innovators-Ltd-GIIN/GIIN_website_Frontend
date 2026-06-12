"use client";

import React from "react";
import { motion } from "framer-motion";
import { Eye, HeartHandshake, Lightbulb, ShieldCheck, Award, Hourglass } from "lucide-react";

interface PhilosophyItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  statement: string;
  detail: string;
}

export function LeadershipPhilosophy() {
  const philosophies: PhilosophyItem[] = [
    {
      icon: Eye,
      title: "Vision",
      statement: "Leaders see what others cannot yet see.",
      detail: "Visualizing the future of continental software sovereignty and structural empowerment before it materializes.",
    },
    {
      icon: HeartHandshake,
      title: "Service",
      statement: "Leadership begins with serving others.",
      detail: "Steering the ecosystem with a commitment to lift the developers, entrepreneurs, and students we serve.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      statement: "Progress requires creative thinking.",
      detail: "Pushing past established paradigms to construct custom protocols, database engines, and access structures.",
    },
    {
      icon: ShieldCheck,
      title: "Integrity",
      statement: "Trust is the foundation of influence.",
      detail: "Holding ourselves to transparent reporting, zero-backdoor secure protocols, and unwavering ethical criteria.",
    },
    {
      icon: Award,
      title: "Excellence",
      statement: "Mediocrity is never the standard.",
      detail: "Refusing shortcuts. Every line of code, every UI animation, and every system integration must represent global-grade standards.",
    },
    {
      icon: Hourglass,
      title: "Legacy",
      statement: "Leadership must outlive the leader.",
      detail: "Engineering programs, training systems, and code structures built to serve the continent for generations.",
    },
  ];

  return (
    <section className="py-24 bg-card/30 border-y border-border/10 relative overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-[10px] font-bold text-accent uppercase tracking-[0.25em]">THE CORE PROTOCOL</span>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter font-heading mt-3 mb-6">
            Our Leadership Philosophy
          </h2>
          <p className="text-muted-foreground text-lg font-light leading-relaxed">
            The values that drive decision-making and operational execution across all divisions of the GIIN Ecosystem.
          </p>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {philosophies.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group p-8 rounded-3xl border border-border/10 bg-background/50 hover:bg-card/70 backdrop-blur-3xl transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-2xl hover:border-primary/30"
              >
                {/* Micro-glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Animated Icon Container */}
                <div className="w-14 h-14 rounded-2xl border border-border/10 bg-muted/40 text-muted-foreground group-hover:text-accent group-hover:border-accent/40 flex items-center justify-center mb-6 transition-all duration-500 relative">
                  <Icon className="w-6 h-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
                </div>

                <h3 className="text-xl font-bold text-foreground font-heading tracking-tight mb-2">
                  {item.title}
                </h3>
                
                <p className="text-sm font-semibold text-primary group-hover:text-indigo-400 transition-colors mb-4 italic leading-normal">
                  &ldquo;{item.statement}&rdquo;
                </p>

                <p className="text-muted-foreground text-xs font-light leading-relaxed">
                  {item.detail}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
