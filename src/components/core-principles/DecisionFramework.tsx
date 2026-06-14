"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass, Eye, Users, Cpu,
  TrendingUp, CheckSquare
} from "lucide-react";

interface DecisionStep {
  step: string;
  title: string;
  query: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function DecisionFramework() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: DecisionStep[] = [
    {
      step: "01",
      title: "Mission Alignment",
      query: "Does this action serve the sovereign technological independence of our target communities?",
      description: "Every deployment, program, or partnership must directly align with the core GIIN directive: securing decentralized, sovereign, and self-sufficient technological ecosystems.",
      icon: Compass,
    },
    {
      step: "02",
      title: "Ethical Evaluation",
      query: "Does this action align with absolute transparency, honesty, and institutional integrity?",
      description: "We verify that there are no hidden backdoors, deceptive structures, or compromises of trust. Integrity remains immutable.",
      icon: Eye,
    },
    {
      step: "03",
      title: "Stakeholder Impact",
      query: "How will this affect our engineers, operators, partners, and community members?",
      description: "We run impact analysis to ensure our products empower the collective, rather than centralizing power or extracting value unsustainably.",
      icon: Users,
    },
    {
      step: "04",
      title: "Innovation Potential",
      query: "Does this solution advance current systems or merely replicate existing patterns?",
      description: "We require every product or codebase to represent a step forward. If we are copy-pasting standard systems, we iterate until we add genuine ecosystem value.",
      icon: Cpu,
    },
    {
      step: "05",
      title: "Long-Term Sustainability",
      query: "Can this system run efficiently, scale gracefully, and be maintained over the next decade?",
      description: "We avoid short-term hacks. Code must be highly documentable, modular, and performant; agreements must be robust; and models must be resilient.",
      icon: TrendingUp,
    },
    {
      step: "06",
      title: "Execution Excellence",
      query: "Do we have the capacity, quality control, and testing setup to ship this as a masterpiece?",
      description: "No project goes live without passing thorough testing, security review, and design alignment. If the standard is not met, execution is paused.",
      icon: CheckSquare,
    },
  ];

  return (
    <section className="py-24 bg-[#04040a] relative overflow-hidden">
      {/* Light gradient beam background overlay */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 z-10 relative">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-xs font-bold text-primary uppercase tracking-[0.25em] mb-4">
            Decision Protocols
          </h2>
          <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6 font-outfit">
            How GIIN Makes Decisions
          </h3>
          <p className="text-lg text-slate-400 font-light leading-relaxed">
            Our governance model relies on a systematic verification funnel. We screen opportunities and decisions through six strict criteria.
          </p>
        </div>

        {/* Dynamic Interactive Node Framework */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Step selection nodes */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeStep === idx;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 group cursor-pointer ${
                    isActive
                      ? "bg-primary/10 border-primary text-white shadow-lg shadow-primary/10"
                      : "bg-white/[0.01] border-white/5 text-slate-400 hover:border-white/10 hover:bg-white/[0.02]"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs transition-colors duration-300 ${
                      isActive
                        ? "bg-primary text-white"
                        : "bg-white/5 text-slate-300 group-hover:bg-white/10"
                    }`}
                  >
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-base font-outfit group-hover:text-white transition-colors">
                      {item.title}
                    </h4>
                  </div>
                  <Icon
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isActive ? "text-primary scale-110" : "text-slate-500 group-hover:text-slate-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right: Display active detail card */}
          <div className="lg:col-span-7 h-full flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="p-10 rounded-3xl backdrop-blur-md bg-white/[0.02] border border-white/10 shadow-2xl relative"
              >
                {/* Accent glow corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-2xl rounded-full" />

                <div className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4">
                  Step {steps[activeStep].step} — {steps[activeStep].title}
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight font-outfit mb-6">
                  {steps[activeStep].query}
                </h3>

                <p className="text-slate-300 font-light leading-relaxed text-base">
                  {steps[activeStep].description}
                </p>

                <div className="mt-8 p-6 rounded-2xl bg-[#090912] border border-white/5 flex gap-4 items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shrink-0" />
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    Required approval threshold: 100% Core Values Compliance
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
