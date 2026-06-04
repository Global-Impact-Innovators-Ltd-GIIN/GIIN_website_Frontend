"use client";

import React from "react";
import { motion } from "framer-motion";
import { Network, Users2, ShieldAlert, Award, Globe } from "lucide-react";

export function FutureRoadmap() {
  const milestones = [
    {
      icon: Network,
      phase: "PHASE 01",
      title: "Pan-African Innovation Ecosystem",
      desc: "Deploying physical GIIN innovation nodes in West, East, North, and Southern Africa. Establishing localized deep tech labs and high-speed computing facilities to anchor native builders.",
      date: "2026 - 2027",
      color: "text-primary",
      glow: "rgba(127, 76, 165, 0.2)",
    },
    {
      icon: Users2,
      phase: "PHASE 02",
      title: "Leadership Transformation",
      desc: "Accelerating the GIIN Leadership Fellowship to train 50,000 fellows. Inserting skilled, high-integrity governance pioneers into critical business, public, and institutional sectors.",
      date: "2027 - 2028",
      color: "text-blue-400",
      glow: "rgba(59, 130, 246, 0.2)",
    },
    {
      icon: ShieldAlert,
      phase: "PHASE 03",
      title: "Technology Sovereignty",
      desc: "Scaling sovereign cloud and zero-trust mesh infrastructure to protect critical enterprise databases, municipal networks, and financial gateways from global cyber-threats.",
      date: "2028 - 2029",
      color: "text-emerald-400",
      glow: "rgba(16, 185, 129, 0.2)",
    },
    {
      icon: Award,
      phase: "PHASE 04",
      title: "SME & Enterprise Empowerment",
      desc: "Launching our decentralized venture capital and advisory stack to support over 5,000 high-growth startup enterprises and mid-market firms across emerging trade corridors.",
      date: "2029 - 2030",
      color: "text-accent",
      glow: "rgba(245, 158, 11, 0.2)",
    },
    {
      icon: Globe,
      phase: "PHASE 05",
      title: "Global Collaboration",
      desc: "Linking the pan-African nodes to a global consortium of universities, policy councils, and investment funds to position African talent as a key global exporter of intellect.",
      date: "2030+",
      color: "text-teal-400",
      glow: "rgba(6, 182, 212, 0.2)",
    },
  ];

  return (
    <section className="py-24 px-6 relative bg-[#020205] border-t border-border/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            Roadmap
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter font-outfit mb-6">
            Our Vision for the{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
              Next Decade
            </span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed font-light">
            An ambitious blueprint to build continental self-reliance, expand digital sovereignty, and accelerate long-term systemic impact.
          </p>
        </div>

        {/* Timeline representation */}
        <div className="relative">
          {/* Central Line Track */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-border/10 -translate-x-1/2" />

          <div className="space-y-12 relative">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.phase}
                  className="flex flex-col md:flex-row items-start md:items-center relative"
                >
                  {/* Left / Right Placement container */}
                  <div className={`w-full md:w-1/2 flex ${isEven ? "md:justify-end" : "md:justify-start"} pl-12 md:pl-0 pr-0 md:px-12`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6 }}
                      className="group relative rounded-3xl border border-border/10 bg-[#07070F] p-8 hover:border-border/30 transition-all duration-300 shadow-xl max-w-md w-full"
                      style={{
                        boxShadow: `0 15px 30px -10px ${item.glow}`,
                      }}
                    >
                      {/* Background accent */}
                      <div className="absolute top-4 right-4 text-[10px] font-bold text-muted-foreground font-mono tracking-widest">
                        {item.date}
                      </div>

                      <span className="text-[10px] font-bold text-secondary tracking-widest uppercase mb-2 block">
                        {item.phase}
                      </span>
                      
                      <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-muted-foreground text-xs leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </motion.div>
                  </div>

                  {/* Central Node Circle */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      className="w-10 h-10 rounded-full bg-[#0A0A12] border border-border/20 flex items-center justify-center shadow-lg group hover:border-primary transition-colors cursor-pointer"
                    >
                      <item.icon className={`w-4 h-4 ${item.color} group-hover:scale-110 transition-transform`} />
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
