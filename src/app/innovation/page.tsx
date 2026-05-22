"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Rocket, Trophy, Lightbulb, TrendingUp, FlaskConical, Target, Banknote, Briefcase, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function InnovationLabPage() {
  return (
    <main className="min-h-screen bg-[#020205] text-slate-200 overflow-hidden pt-24">
      {/* Background aesthetics */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
        <div className="absolute top-1/4 -right-32 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -left-32 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-32"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
            Ecosystem Division 4
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-br from-white to-emerald-200">
            Ideas Become Systems
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            GIIN Innovation Lab is Africa's premier startup incubator, venture matching engine, and deep-tech hackathon ecosystem.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/innovation/dashboards/founder" className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-2 transition-all shadow-[0_0_30px_-5px_rgba(16,185,129,0.5)]">
              Founder Portal <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/innovation/dashboards/investor" className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-all">
              Investor Dashboard
            </Link>
          </div>
        </motion.div>

        {/* Core Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
            {[
              { icon: <Rocket />, title: "Startup Incubation", desc: "Rigorous acceleration for pre-seed ventures." },
              { icon: <Trophy />, title: "Innovation Competitions", desc: "Continental pitch events." },
              { icon: <Zap />, title: "Hackathons", desc: "48-hour deep-tech building sprints." },
              { icon: <TrendingUp />, title: "Venture Development", desc: "Scaling operations and market entry." },
              { icon: <FlaskConical />, title: "Research Projects", desc: "Applied science and engineering R&D." },
              { icon: <Target />, title: "Prototype Development", desc: "From whiteboard to minimum viable product." },
              { icon: <Banknote />, title: "Innovation Grants", desc: "Zero-equity funding for revolutionary ideas." },
              { icon: <Briefcase />, title: "Investor Matching", desc: "Connecting founders with global VC capital." },
              { icon: <Lightbulb />, title: "Startup Mentoring", desc: "Guidance from exited founders." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/30 transition-all backdrop-blur-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
        </div>

        {/* AI Venture Intelligence */}
        <div className="border border-white/10 rounded-3xl overflow-hidden bg-black/40 backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 lg:p-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px]" />
              <h2 className="text-3xl font-bold text-white mb-4 relative z-10">AI Venture Intelligence</h2>
              <p className="text-slate-400 mb-8 relative z-10">GIIN operates a proprietary algorithmic scoring engine that evaluates startup viability, business models, and market opportunity in milliseconds.</p>
              <ul className="space-y-4 mb-8 relative z-10">
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Startup Evaluator & Scoring Engine
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Business Model Analyzer
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Market Opportunity Predictor
                </li>
              </ul>
            </div>
            
            <div className="p-12 lg:p-20 flex flex-col justify-center bg-white/5 relative">
              <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Founder Workspace</h2>
              <p className="text-slate-400 mb-8 relative z-10">The command center for GIIN-incubated founders. Refine your pitch, apply for grants, and secure capital.</p>
              <ul className="space-y-4 mb-8 relative z-10">
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> AI Pitch Assistant
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Grant Applications
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Investor Matching Hub
                </li>
              </ul>
              <Link href="/innovation/dashboards/founder" className="inline-flex w-max items-center gap-2 text-emerald-400 font-medium hover:underline relative z-10">
                Enter Founder Portal <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
