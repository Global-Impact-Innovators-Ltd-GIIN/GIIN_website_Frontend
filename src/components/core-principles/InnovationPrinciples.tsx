"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Maximize, HelpCircle, RefreshCw, Zap,
  Layers, HelpingHand
} from "lucide-react";

interface InnovationCard {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

export default function InnovationPrinciples() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const cards: InnovationCard[] = [
    {
      title: "Think Bigger",
      desc: "We design for structural, continental, and global scale from day one. Temporary fixes are discarded in favor of foundational infrastructures.",
      icon: Maximize,
      gradient: "from-purple-500/20 to-indigo-500/0",
    },
    {
      title: "Challenge Assumptions",
      desc: "Every standard paradigm is examined. We ask why things are done a certain way and rebuild from first principles.",
      icon: HelpCircle,
      gradient: "from-blue-500/20 to-indigo-500/0",
    },
    {
      title: "Embrace Change",
      desc: "Rigid architectures crumble under pressure. We construct systems that adapt, flex, and modularize as technology evolves.",
      icon: RefreshCw,
      gradient: "from-cyan-500/20 to-blue-500/0",
    },
    {
      title: "Learn Rapidly",
      desc: "Speed of execution is proportional to speed of comprehension. We construct feedback loops into every deployment and sprint.",
      icon: Zap,
      gradient: "from-amber-500/20 to-orange-500/0",
    },
    {
      title: "Build Sustainably",
      desc: "Code efficiency is environmental and financial stewardship. We build resource-optimized software that survives constraints.",
      icon: Layers,
      gradient: "from-rose-500/20 to-pink-500/0",
    },
    {
      title: "Solve Real Problems",
      desc: "No vanity metrics or code for code's sake. We build features targeted directly at bottlenecks in real workflows.",
      icon: HelpingHand,
      gradient: "from-emerald-500/20 to-teal-500/0",
    },
  ];

  return (
    <section className="py-24 bg-card/10 border-b border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 z-10 relative">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
            The Innovation Engine
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6 font-outfit">
            Innovation With Purpose
          </h2>
          <p className="text-lg text-slate-400 font-light leading-relaxed">
            Innovation is not just a buzzword; it is a discipline. At GIIN, we align creativity with execution stability and ethical responsibility.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((item, idx) => {
            const Icon = item.icon;
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group relative p-8 rounded-3xl bg-[#090912] border border-white/5 overflow-hidden transition-all duration-300 hover:border-primary/30 hover:bg-[#0c0c16]"
              >
                {/* Spotlight background gradient follow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-opacity duration-500 pointer-events-none ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-primary transition-colors duration-300 mb-6">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 font-outfit">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
