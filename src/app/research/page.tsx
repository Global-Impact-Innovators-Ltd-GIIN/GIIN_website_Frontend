"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Database, BookOpen, Binary, FileText,
  ArrowRight, Search, Globe, Filter,
  FileSearch, Microscope
} from "lucide-react";

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-32 transition-colors duration-500 overflow-x-hidden">
      {/* HERO - The Knowledge Layer */}
      <section className="container mx-auto px-6 mb-40">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              <Microscope className="w-3 h-3" />
              Research Hub
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-foreground mb-8 tracking-tighter font-outfit leading-[0.9] text-balance">
              The <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">Sovereign Data</span> Layer.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl text-balance">
              A centralized vault of our scientific papers, blueprints, and national reports, designed to inform the future of continental systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* RESEARCH TOOLS */}
      <section className="container mx-auto px-6 mb-40">
        <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border/10 focus-within:border-accent/50 transition-all flex-1 max-w-md shadow-sm">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Search the research vault..." className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none" />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border/10 text-xs font-bold uppercase tracking-widest hover:bg-muted transition-colors">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform">
              Full Archive
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Whitepapers",
              count: "42 Papers",
              desc: "Deep architectural explorations into decentralized governance and sovereign AI models.",
              icon: FileSearch,
              color: "text-accent"
            },
            {
              title: "Policy Blueprints",
              count: "12 Reports",
              desc: "Regulatory frameworks and national blueprints developed for government-scale digital transformations.",
              icon: Globe,
              color: "text-primary"
            },
            {
              title: "Technical Docs",
              count: "150+ Specs",
              desc: "Comprehensive API documentation and system manuals for developers building on the network.",
              icon: Binary,
              color: "text-accent"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-10 rounded-[3rem] bg-card border border-border/10 hover:border-accent/40 transition-all duration-500 shadow-sm hover:shadow-2xl relative overflow-hidden"
            >
              <div className={`w-14 h-14 rounded-2xl bg-background border border-border/10 flex items-center justify-center mb-8 ${item.color}`}>
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-black text-foreground mb-2 tracking-tighter">{item.title}</h3>
              <p className="text-xs font-bold text-accent uppercase tracking-widest mb-6">{item.count}</p>
              <p className="text-muted-foreground font-light leading-relaxed mb-10">{item.desc}</p>
              <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground group-hover:text-accent transition-colors">
                View Collection <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED RESEARCH SECTION */}
      <section className="py-40 bg-card/30 border-y border-border/10 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-24 text-center mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-8 tracking-tighter">Featured <span className="text-primary italic">Breakthroughs</span>.</h2>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">The most impactful studies from our Research & Policy division.</p>
          </div>

          <div className="space-y-6">
            {[
              { title: "The Decentralized Mesh: Solving Continental Latency", author: "GIIN Research Team", date: "May 2026", cat: "Engineering" },
              { title: "Sovereign AI: Navigating Data Privacy in Africa", author: "Legal & Ethics Division", date: "April 2026", cat: "Policy" },
              { title: "Building Transparent Governance Layers for Finance", author: "FinTech Innovation Lab", date: "March 2026", cat: "Finance" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-8 rounded-[2rem] bg-background border border-border/10 hover:border-primary transition-all duration-500 flex items-center justify-between gap-8 flex-wrap lg:flex-nowrap"
              >
                <div className="flex gap-8 items-center">
                  <div className="w-16 h-16 rounded-2xl bg-card border border-border/10 flex items-center justify-center text-primary font-black text-xl group-hover:bg-primary group-hover:text-background transition-all">
                    0{i + 1}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-foreground group-hover:text-primary transition-colors tracking-tight mb-2">{item.title}</h3>
                    <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      <span>{item.author}</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 ml-auto">
                  <span className="px-3 py-1 rounded bg-muted text-[10px] font-bold uppercase tracking-widest text-muted-foreground border border-border/10">{item.cat}</span>
                  <button className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// Helper to handle class merging
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
