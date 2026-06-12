"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  UserCheck, ShieldAlert, Award, MessageSquare,
  ClipboardList, CheckCircle, LineChart, Target
} from "lucide-react";

interface StandardItem {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function LeadershipStandards() {
  const standards: StandardItem[] = [
    {
      title: "Lead by Example",
      desc: "Actions define leadership. We never demand a standard from others that we fail to model ourselves.",
      icon: UserCheck,
    },
    {
      title: "Serve Before Self",
      desc: "Authority is stewardship. Our main focus is serving the ecosystem, empowering team members and partners first.",
      icon: ShieldAlert,
    },
    {
      title: "Build Others",
      desc: "True leaders breed leaders. We actively train, mentor, and transfer knowledge to scale capability.",
      icon: Award,
    },
    {
      title: "Communicate Clearly",
      desc: "Transparency minimizes noise. We specify intentions, define clear rules, and communicate with absolute integrity.",
      icon: MessageSquare,
    },
    {
      title: "Take Responsibility",
      desc: "Total ownership of failures. We run toward errors to remediate them, never shifting blame to external factors.",
      icon: ClipboardList,
    },
    {
      title: "Deliver Excellence",
      desc: "Zero tolerance for mediocrity. Every artifact, codebase, and relationship must represent institutional-grade quality.",
      icon: CheckCircle,
    },
    {
      title: "Think Long-Term",
      desc: "Sacrificing temporary gain for permanent systems. We design architectures that secure the next decade.",
      icon: LineChart,
    },
    {
      title: "Create Impact",
      desc: "Metrics that matter. We do not value empty actions; we measure concrete, verified impact outcomes.",
      icon: Target,
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section className="py-24 bg-card/30 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 z-10 relative">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
            Institutional Standards
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6 font-outfit">
            The Standard of Leadership
          </h2>
          <p className="text-lg text-slate-400 font-light leading-relaxed">
            Stewardship within the GIIN Ecosystem is governed by strict, non-negotiable operational principles. We do not just build tech—we develop world-class leaders.
          </p>
        </div>

        {/* Glassmorphic Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {standards.map((std, idx) => {
            const Icon = std.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="group relative p-8 rounded-3xl backdrop-blur-md bg-white/[0.02] border border-white/5 shadow-sm transition-all duration-500 hover:bg-white/[0.04] hover:border-primary/30 hover:-translate-y-2"
              >
                {/* Accent glow on top edge */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent group-hover:w-3/4 transition-all duration-500" />

                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 mb-6">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 font-outfit">
                  {std.title}
                </h3>

                <p className="text-sm text-slate-400 font-light leading-relaxed">
                  {std.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
