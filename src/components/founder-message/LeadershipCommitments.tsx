"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Target, Heart, Layers, Globe } from "lucide-react";

interface Commitment {
  num: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  statement: string;
  details: string;
}

export function LeadershipCommitments() {
  const commitments: Commitment[] = [
    {
      num: "01",
      icon: ShieldCheck,
      title: "Develop Ethical Leaders",
      statement: "Accountability is the metric of authority.",
      details: "We commit to training leaders who reject exploitation, maintain operational transparency, and design architectures for national development."
    },
    {
      num: "02",
      icon: Target,
      title: "Promote Innovation",
      statement: "We build systems, not just features.",
      details: "We prioritize research budgets and sandbox platforms to explore emerging tech, ensuring our technology output stays at global quality standards."
    },
    {
      num: "03",
      icon: Heart,
      title: "Empower Communities",
      statement: "Growth must be distributed, not concentrated.",
      details: "We design software structures and capital programs that target low-infrastructure regions, providing access to markets and global connectivity."
    },
    {
      num: "04",
      icon: Layers,
      title: "Build Sustainable Solutions",
      statement: "Systems built to outlast their creators.",
      details: "No shortcuts. We engineer with clean code structures, reliable databases, and modular architectures designed to scale indefinitely."
    },
    {
      num: "05",
      icon: Globe,
      title: "Create Global Impact",
      statement: "Africa's voice in global technology.",
      details: "We connect local innovators with global strategic networks, demonstrating that African engineering is key to shaping the global tech layout."
    }
  ];

  return (
    <section className="py-24 bg-background relative z-10">
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[10px] font-bold text-primary uppercase tracking-[0.25em] block mb-2">Our Pledge</span>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter font-heading mb-4">
            Leadership Commitments
          </h2>
          <p className="text-muted-foreground text-lg font-light leading-relaxed">
            The concrete pledges we hold ourselves accountable to, ensuring the GIIN network acts with integrity and focus.
          </p>
        </div>

        {/* Commitment List Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {commitments.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-8 rounded-3xl border border-border/10 bg-card/20 hover:bg-card/45 backdrop-blur-xl transition-all duration-300 relative overflow-hidden"
              >
                {/* Number overlay */}
                <span className="absolute top-6 right-8 text-4xl font-black text-primary/10 group-hover:text-primary/20 transition-colors font-mono">
                  {item.num}
                </span>

                <div className="w-12 h-12 rounded-xl border border-border/10 bg-muted/40 text-primary-foreground/90 group-hover:text-accent group-hover:border-accent/40 flex items-center justify-center mb-6 transition-all duration-500">
                  <Icon className="w-5 h-5 text-accent" />
                </div>

                <h3 className="text-lg font-bold text-foreground font-heading mb-1 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-primary mb-4 italic">
                  &ldquo;{item.statement}&rdquo;
                </p>
                <p className="text-muted-foreground text-xs font-light leading-relaxed">
                  {item.details}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
