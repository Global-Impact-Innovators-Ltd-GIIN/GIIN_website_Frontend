"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Sparkles, Zap, Globe } from "lucide-react";

export default function FoundationSection() {
  const steps = [
    {
      title: "Principles",
      tagline: "The Core Rules",
      desc: "Fundamental laws of sovereignty and engineering that govern every decision, line of code, and deployment.",
      icon: Shield,
      color: "from-purple-500/20 to-indigo-500/20",
      iconColor: "text-purple-400",
      glow: "shadow-purple-500/20",
    },
    {
      title: "Culture",
      tagline: "The Environment",
      desc: "The collective standards we protect. Value contribution over position, choosing excellence over convenience.",
      icon: Sparkles,
      color: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400",
      glow: "shadow-blue-500/20",
    },
    {
      title: "Behavior",
      tagline: "The Daily Execution",
      desc: "Action governed by accountability. We deliver excellence, serve before self, and take complete ownership.",
      icon: Zap,
      color: "from-amber-500/20 to-yellow-500/20",
      iconColor: "text-amber-400",
      glow: "shadow-amber-500/20",
    },
    {
      title: "Impact",
      tagline: "The Autonomy",
      desc: "Sovereign infrastructures securing Africa's digital, social, and economic future for generations to come.",
      icon: Globe,
      color: "from-emerald-500/20 to-teal-500/20",
      iconColor: "text-emerald-400",
      glow: "shadow-emerald-500/20",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section className="py-24 bg-card/10 border-y border-border/10 relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-xs font-bold text-primary uppercase tracking-[0.25em] mb-4">
            The Alignment Chain
          </h2>
          <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6 font-outfit">
            How Principles Shape <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-yellow-500">Sovereign Outcomes</span>
          </h3>
          <p className="text-lg text-slate-400 font-light leading-relaxed">
            Values without structure are statements. At GIIN, our principles cascade directly into sustainable real-world impact.
          </p>
        </div>

        {/* Chain Flow */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 relative"
        >
          {/* Connector lines on desktop */}
          <div className="hidden md:block absolute top-[50px] left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-purple-500/30 via-amber-500/30 to-emerald-500/30 -z-10" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group relative flex flex-col items-center text-center p-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]"
              >
                {/* Visual node badge */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} border border-white/10 flex items-center justify-center mb-6 shadow-lg ${step.glow} group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-8 h-8 ${step.iconColor}`} />
                </div>

                <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-1">
                  {step.tagline}
                </div>

                <h4 className="text-xl font-bold text-white mb-3 font-outfit">
                  {step.title}
                </h4>

                <p className="text-sm text-slate-400 font-light leading-relaxed">
                  {step.desc}
                </p>

                {/* Connecting arrow/dot for mobile */}
                {idx < steps.length - 1 && (
                  <div className="md:hidden w-px h-8 bg-gradient-to-b from-white/10 to-white/0 my-4" />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
