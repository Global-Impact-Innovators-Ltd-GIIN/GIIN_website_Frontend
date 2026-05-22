"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Code2, Server, Database, Cloud, ShieldCheck, Laptop, Cpu, Network, Settings } from "lucide-react";
import { motion } from "framer-motion";

export default function TechnologyEcosystemPage() {
  return (
    <main className="min-h-screen bg-[#020205] text-slate-200 overflow-hidden pt-24">
      {/* Background aesthetics */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
        <div className="absolute top-1/4 -right-32 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -left-32 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-32"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-6">
            Ecosystem Division 2
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-br from-white to-blue-200">
            Building Scalable Systems For Africa's Future
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            GIIN Technology Company builds enterprise-grade software, AI systems, and cloud infrastructure for the next billion users.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/technology/dashboards/client" className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center gap-2 transition-all shadow-[0_0_30px_-5px_rgba(37,99,235,0.5)]">
              Client Portal <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/technology/dashboards/developer" className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-all">
              Developer Environment
            </Link>
          </div>
        </motion.div>

        {/* Core Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
            {[
              { icon: <Code2 />, title: "Software Engineering", desc: "Custom full-stack enterprise applications." },
              { icon: <Cpu />, title: "AI Development", desc: "Machine learning and algorithmic recommendation systems." },
              { icon: <Server />, title: "Enterprise Systems", desc: "ERP, CRM, and internal institutional software." },
              { icon: <Laptop />, title: "Web Applications", desc: "High-performance React and Next.js platforms." },
              { icon: <Database />, title: "Mobile Applications", desc: "Native iOS and Android scalable ecosystems." },
              { icon: <Cloud />, title: "Cloud Systems", desc: "AWS, Azure, and Vercel infrastructure deployment." },
              { icon: <Settings />, title: "Digital Transformation", desc: "Modernizing legacy African institutions." },
              { icon: <Network />, title: "Network Solutions", desc: "Microservice and API-first architectural design." },
              { icon: <ShieldCheck />, title: "Technology Research", desc: "R&D into blockchain, Web3, and sovereign compute." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all backdrop-blur-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
        </div>

        {/* Portals Showcase */}
        <div className="border border-white/10 rounded-3xl overflow-hidden bg-black/40 backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 lg:p-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10">
              <h2 className="text-3xl font-bold text-white mb-4">Client Dashboard</h2>
              <p className="text-slate-400 mb-8">Access real-time project status, view transparent quotations, approve proposals, and track development workflow dynamically.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Real-time Project Status
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Proposal Generation Engine
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Ticketing & Support System
                </li>
              </ul>
              <Link href="/technology/dashboards/client" className="inline-flex w-max items-center gap-2 text-primary font-medium hover:underline">
                Enter Client Portal <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="p-12 lg:p-20 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-white mb-4">Developer Workflow</h2>
              <p className="text-slate-400 mb-8">An elite command center for software engineers. Manage repositories, track Jira-style tasks, and build the future.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Code Showcase & Repositories
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Team Collaboration
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> AI Solution Architect
                </li>
              </ul>
              <Link href="/technology/dashboards/developer" className="inline-flex w-max items-center gap-2 text-cyan-400 font-medium hover:underline">
                Enter Developer Workspace <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
