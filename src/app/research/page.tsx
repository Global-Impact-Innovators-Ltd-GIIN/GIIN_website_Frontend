"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Microscope, Library, FileText, FileSearch, LineChart, Cpu, Network } from "lucide-react";
import { motion } from "framer-motion";

export default function ResearchAcademyPage() {
  return (
    <main className="min-h-screen bg-[#020205] text-slate-200 overflow-hidden pt-24">
      {/* Background aesthetics */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
        <div className="absolute -top-32 right-0 w-[800px] h-[800px] bg-violet-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 -left-64 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-32"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-sm font-medium mb-6">
            Ecosystem Division 5
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-br from-white to-violet-200">
            Knowledge Drives Transformation
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            GIIN Research and Academy is a premier knowledge hub, engineering white papers, certifications, and deep-tech curricula for global advancement.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/research/dashboards/student" className="px-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium flex items-center gap-2 transition-all shadow-[0_0_30px_-5px_rgba(124,58,237,0.5)]">
              Student Portal <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/research/dashboards/researcher" className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-all">
              Researcher Workspace
            </Link>
          </div>
        </motion.div>

        {/* Core Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {[
            { icon: <GraduationCap />, title: "Course Systems", desc: "Rigorous academic pathways and modules." },
            { icon: <Library />, title: "Research Repository", desc: "Centralized database of GIIN publications." },
            { icon: <FileText />, title: "Publications", desc: "Peer-reviewed articles on African innovation." },
            { icon: <BookOpen />, title: "Certifications", desc: "Verifiable credentials on the blockchain." },
            { icon: <Network />, title: "Learning Platform", desc: "Next-gen LMS for immersive education." },
            { icon: <FileSearch />, title: "White Papers", desc: "Strategic documents advising national policy." },
            { icon: <Microscope />, title: "Virtual Labs", desc: "Simulated environments for deep-tech experiments." },
            { icon: <LineChart />, title: "Academic Journals", desc: "Quarterly reviews of continental progress." },
            { icon: <Cpu />, title: "Research Collaboration", desc: "Cross-border academic partnerships." }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-violet-500/30 transition-all backdrop-blur-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Academic Intelligence */}
        <div className="border border-white/10 rounded-3xl overflow-hidden bg-black/40 backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 lg:p-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px]" />
              <h2 className="text-3xl font-bold text-white mb-4 relative z-10">AI Research Assistant</h2>
              <p className="text-slate-400 mb-8 relative z-10">Accelerate your academic work. Our language models are trained on millions of peer-reviewed papers to assist in drafting, citation, and literature reviews.</p>
              <ul className="space-y-4 mb-8 relative z-10">
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Automated Citation Generator (APA/MLA/Chicago)
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Academic Recommendation Engine
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Literature Gap Analysis
                </li>
              </ul>
            </div>
            
            <div className="p-12 lg:p-20 flex flex-col justify-center bg-white/5 relative">
              <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Knowledge Hub</h2>
              <p className="text-slate-400 mb-8 relative z-10">Access the definitive repository of GIIN-funded research, doctoral theses, and open-source data models.</p>
              <ul className="space-y-4 mb-8 relative z-10">
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400" /> Peer-Review Management
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400" /> Virtual Lab Access
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400" /> Course Analytics Dashboard
                </li>
              </ul>
              <Link href="/research/dashboards/researcher" className="inline-flex w-max items-center gap-2 text-violet-400 font-medium hover:underline relative z-10">
                Enter Researcher Workspace <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
