"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Lock, Activity, Search, Server, ShieldAlert, BarChart3, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function CyberDefensePage() {
  return (
    <main className="min-h-screen bg-[#020205] text-slate-200 overflow-hidden pt-24">
      {/* Background aesthetics */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
        <div className="absolute -top-32 right-32 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 -left-32 w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-32"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6">
            Security Operations & Consulting
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-cyan-200">
            Protecting Systems.<br/>Building Institutions.
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            GIIN operates an elite Security Operations Center and Business Intelligence division. We secure enterprise infrastructure and engineer digital transformations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/cyber/dashboards/client" className="px-8 py-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium flex items-center gap-2 transition-all shadow-[0_0_30px_-5px_rgba(6,182,212,0.5)]">
              Client Portal <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/cyber/dashboards/analyst" className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-all">
              SOC Analyst Workspace
            </Link>
          </div>
        </motion.div>

        {/* Core Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {[
            { icon: <ShieldCheck />, title: "Cybersecurity", desc: "Enterprise-grade infrastructure defense." },
            { icon: <Lock />, title: "Network Security", desc: "Zero-trust architecture deployment." },
            { icon: <Search />, title: "Risk Assessments", desc: "Comprehensive vulnerability scanning." },
            { icon: <ShieldAlert />, title: "Ethical Hacking", desc: "Red-team penetration testing." },
            { icon: <Server />, title: "Digital Forensics", desc: "Post-breach incident response and analysis." },
            { icon: <Activity />, title: "Real-Time Monitoring", desc: "24/7 SOC observability and alerting." },
            { icon: <TrendingUp />, title: "Business Consulting", desc: "Strategic optimization for scaling ventures." },
            { icon: <Users />, title: "Startup Consulting", desc: "Growth strategies for African deep-tech." },
            { icon: <BarChart3 />, title: "Digital Transformation", desc: "Legacy system modernization." }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-all backdrop-blur-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* AI & Automation Intelligence */}
        <div className="border border-white/10 rounded-3xl overflow-hidden bg-black/40 backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 lg:p-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 blur-[80px]" />
              <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Algorithmic Defense</h2>
              <p className="text-slate-400 mb-8 relative z-10">Our SOC utilizes proprietary AI models to predict attack vectors before they execute, isolating threats autonomously.</p>
              <ul className="space-y-4 mb-8 relative z-10">
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" /> AI Threat Prediction Engine
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" /> Automated Risk Analysis
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" /> Real-time Anomaly Detection
                </li>
              </ul>
            </div>
            
            <div className="p-12 lg:p-20 flex flex-col justify-center bg-white/5 relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px]" />
              <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Business Optimization</h2>
              <p className="text-slate-400 mb-8 relative z-10">Beyond security, GIIN consultants deploy algorithmic maturity assessments to streamline organizational operations.</p>
              <ul className="space-y-4 mb-8 relative z-10">
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Business Maturity Scoring
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Digital Transformation Mapping
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Consultation Booking Matrix
                </li>
              </ul>
              <Link href="/cyber/dashboards/client" className="inline-flex w-max items-center gap-2 text-cyan-400 font-medium hover:underline relative z-10">
                Access Client Portal <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
