"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass, Zap, Lock, Trophy,
  CheckCircle, Users, Heart, BookOpen,
  Plus, Minus
} from "lucide-react";

interface ValueItem {
  id: string;
  title: string;
  subtitle: string;
  short: string;
  expanded: string;
  supporting: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  glowColor: string;
}

export default function CoreValuesGrid() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const values: ValueItem[] = [
    {
      id: "leadership",
      title: "Leadership",
      subtitle: "Pioneering the Front Line",
      short: "We steer direction through courage, paving pathways for others.",
      expanded: "Leadership is not about authority; it is about taking complete responsibility for the collective direction. We design systems that outlive us and inspire others to claim their own leadership space.",
      supporting: "“To lead is to secure the foundation upon which future generations will build.”",
      icon: Compass,
      gradient: "from-purple-500/10 via-indigo-500/5 to-transparent",
      glowColor: "group-hover:border-purple-500/40",
    },
    {
      id: "innovation",
      title: "Innovation",
      subtitle: "Challenging the Default",
      short: "Creating new architectures and discarding stale paradigms.",
      expanded: "We refuse to build on fragile foundations. Innovation at GIIN is systemic—we research primary technologies, build secure APIs, and write sovereign software designed for long-term scalability.",
      supporting: "“Sovereignty requires the courage to create rather than copy.”",
      icon: Zap,
      gradient: "from-blue-500/10 via-indigo-500/5 to-transparent",
      glowColor: "group-hover:border-blue-500/40",
    },
    {
      id: "integrity",
      title: "Integrity",
      subtitle: "Immutable Transparency",
      short: "Acting with radical transparency in public and private.",
      expanded: "Trust is an immutable ledger. We build with open architectures, audit log trails, and clear governance models. We act honorably, even when the choice is invisible.",
      supporting: "“Our standards remain unchanged under pressure.”",
      icon: Lock,
      gradient: "from-cyan-500/10 via-teal-500/5 to-transparent",
      glowColor: "group-hover:border-cyan-500/40",
    },
    {
      id: "excellence",
      title: "Excellence",
      subtitle: "Zero Compromise",
      short: "Refusing convenience to deliver unmatched engineering quality.",
      expanded: "We target world-class benchmarks. Every line of code, pixel of user interface, and architectural diagram is polished. Near-enough is never enough.",
      supporting: "“We build systems that set new global standards.”",
      icon: Trophy,
      gradient: "from-amber-500/10 via-orange-500/5 to-transparent",
      glowColor: "group-hover:border-amber-500/40",
    },
    {
      id: "accountability",
      title: "Accountability",
      subtitle: "Complete Ownership",
      short: "Accepting full stewardship of outcomes, successes, and failures.",
      expanded: "The buck stops with us. When bugs occur, we resolve them. When infrastructure fails, we restore it. We hold ourselves and our partners to clear, measurable performance metrics.",
      supporting: "“Ownership means running towards the problem, never away.”",
      icon: CheckCircle,
      gradient: "from-rose-500/10 via-red-500/5 to-transparent",
      glowColor: "group-hover:border-rose-500/40",
    },
    {
      id: "collaboration",
      title: "Collaboration",
      subtitle: "Ecosystem Synergy",
      short: "Bridging capabilities across global networks.",
      expanded: "No node succeeds in isolation. We collaborate across nations, divisions, and partnerships, building a mesh network of shared intelligence and distributed resources.",
      supporting: "“We are only as secure as our weakest node.”",
      icon: Users,
      gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
      glowColor: "group-hover:border-emerald-500/40",
    },
    {
      id: "service",
      title: "Service",
      subtitle: "Contribution over Position",
      short: "Prioritizing community empowerment over individual authority.",
      expanded: "We align our efforts with the growth of the communities we support. Our software, academy courses, and programs exist to clear blockages and foster global innovation.",
      supporting: "“True authority is earned through service.”",
      icon: Heart,
      gradient: "from-indigo-500/10 via-pink-500/5 to-transparent",
      glowColor: "group-hover:border-indigo-500/40",
    },
    {
      id: "learning",
      title: "Continuous Learning",
      subtitle: "Relentless Adaptation",
      short: "Expanding knowledge reserves through constant inquiry.",
      expanded: "Technology changes weekly. We operate in a continuous cycle of research, training, and deployment. We learn from failure and adapt codebases, processes, and products iteratively.",
      supporting: "“Complacency is the precursor to systemic obsolescence.”",
      icon: BookOpen,
      gradient: "from-yellow-500/10 via-amber-500/5 to-transparent",
      glowColor: "group-hover:border-yellow-500/40",
    },
  ];

  const handleCardToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="values" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 z-10 relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-xs font-bold text-primary uppercase tracking-[0.25em] mb-4">
            The Core Pillars
          </h2>
          <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6 font-outfit">
            Our Core Values Framework
          </h3>
          <p className="text-lg text-slate-400 font-light leading-relaxed">
            These eight values govern our standards, direct our engineering, and align our leadership. Click any card to read its full constitutional mandate.
          </p>
        </div>

        {/* Dynamic Expandable Value Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {values.map((val) => {
            const Icon = val.icon;
            const isExpanded = expandedId === val.id;

            return (
              <motion.div
                layout="position"
                key={val.id}
                onClick={() => handleCardToggle(val.id)}
                className={`group relative rounded-3xl bg-[#090912] border transition-all duration-300 overflow-hidden cursor-pointer select-none ${
                  isExpanded
                    ? "border-primary/50 ring-2 ring-primary/20 lg:col-span-2 shadow-2xl"
                    : `border-white/5 hover:border-white/20 hover:bg-[#0c0c16] ${val.glowColor}`
                }`}
                tabIndex={0}
                aria-expanded={isExpanded}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardToggle(val.id);
                  }
                }}
              >
                {/* Background Gradient Accent on Hover/Active */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${val.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="p-8 relative z-10 flex flex-col h-full justify-between">
                  <div>
                    {/* Header: Icon & Toggle button */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-200 group-hover:text-primary transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                        {isExpanded ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </div>
                    </div>

                    <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                      {val.subtitle}
                    </div>

                    <h4 className="text-2xl font-black text-white tracking-tight font-outfit mb-3">
                      {val.title}
                    </h4>

                    <p className="text-sm text-slate-400 font-light leading-relaxed">
                      {val.short}
                    </p>

                    {/* Expandable Core Detail */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden mt-6 pt-6 border-t border-white/5"
                        >
                          <p className="text-sm text-slate-300 font-light leading-relaxed mb-6">
                            {val.expanded}
                          </p>

                          <div className="p-4 rounded-xl bg-primary/10 border border-primary/25">
                            <p className="text-xs italic font-semibold text-primary-foreground tracking-wide leading-relaxed">
                              {val.supporting}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
