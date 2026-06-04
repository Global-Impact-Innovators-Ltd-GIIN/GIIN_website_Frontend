"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, Eye, ShieldCheck } from "lucide-react";

export function MissionVisionPurpose() {
  const pillars = [
    {
      icon: Compass,
      title: "Our Mission",
      subtitle: "WHAT WE DO TODAY",
      desc: "To equip individuals, organizations, and institutions with the tools, skills, and networks required to drive leadership excellence, design native technological solutions, and pioneer new industrial models.",
      glow: "rgba(127, 76, 165, 0.15)",
      accentColor: "from-primary/30 to-transparent",
      iconBg: "bg-primary/10 text-primary",
    },
    {
      icon: Eye,
      title: "Our Vision",
      subtitle: "WHAT WE WILL BECOME",
      desc: "To establish a sovereign, pan-African innovation network that serves as a global benchmark for multi-disciplinary impact, digital sovereignty, and high-integrity governance.",
      glow: "rgba(59, 130, 246, 0.15)",
      accentColor: "from-blue-500/20 to-transparent",
      iconBg: "bg-blue-500/10 text-blue-400",
    },
    {
      icon: ShieldCheck,
      title: "Our Purpose",
      subtitle: "WHY WE EXIST",
      desc: "To build a self-sustaining continental engine where technology, leadership, and media converge to unleash human potential, secure sovereign development, and drive global competitiveness.",
      glow: "rgba(245, 158, 11, 0.15)",
      accentColor: "from-accent/20 to-transparent",
      iconBg: "bg-accent/10 text-accent",
    },
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-[#020205] border-t border-border/10">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/5 border border-secondary/20 text-secondary text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            Core Blueprint
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter font-outfit">
            The Pillars of{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
              Our Identity
            </span>
          </h2>
        </div>

        {/* Three Glassmorphism Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-3xl border border-border/10 bg-card/40 p-8 md:p-10 backdrop-blur-2xl transition-all duration-300 flex flex-col h-full hover:border-border/30 hover:bg-card/60"
              style={{
                boxShadow: `0 20px 40px -15px ${pillar.glow}`,
              }}
            >
              {/* Border overlay and gradient glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${pillar.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none`} />

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon wrapper */}
                <div className={`w-14 h-14 rounded-2xl ${pillar.iconBg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                  <pillar.icon className="w-7 h-7" />
                </div>

                <span className="text-[10px] font-bold text-muted-foreground tracking-[0.25em] uppercase mb-2">
                  {pillar.subtitle}
                </span>

                <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight">
                  {pillar.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed font-light text-sm md:text-base flex-grow">
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
