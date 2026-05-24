"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Terminal, Network, Cpu, ShieldAlert,
  ArrowRight, Binary, Server, Database,
  Settings, Zap
} from "lucide-react";

export default function TechnologyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-32 transition-colors duration-500 overflow-x-hidden">
      {/* HERO - The Technology Stack */}
      <section className="container mx-auto px-6 mb-40">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              <Binary className="w-3 h-3" />
              Technology Division
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-foreground mb-8 tracking-tighter font-outfit leading-[0.9] text-balance">
              The <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Primary Layer</span> of Africa.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl text-balance">
              Engineering the decentralized backbone, secure nodes, and sovereign software that powers the continental network.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CORE TECHNOLOGY AREAS */}
      <section className="container mx-auto px-6 mb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Software Solutions",
              tag: "Engineering",
              desc: "Enterprise-grade application architecture, system integrations, and multi-tenant platforms designed for extreme scale and performance.",
              icon: Terminal,
              color: "text-primary"
            },
            {
              title: "Network Systems",
              tag: "Infrastructure",
              desc: "Designing decentralized mesh networks, node structures, and secure server farms that ensure data remains within the network's sovereignty.",
              icon: Network,
              color: "text-accent"
            },
            {
              title: "Digital Products",
              tag: "Products",
              desc: "A suite of sovereign utility tools, from government-scale registry systems to secure communications protocols.",
              icon: Settings,
              color: "text-primary"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group p-10 rounded-[3rem] bg-card border border-border/10 hover:border-primary/40 transition-all duration-500 text-left relative overflow-hidden shadow-sm hover:shadow-2xl"
            >
              <div className={cn("inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-8 bg-background border border-border/10 group-hover:bg-primary group-hover:text-white transition-all duration-500", item.color)}>
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black text-foreground mb-4 tracking-tighter">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">{item.desc}</p>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/70">{item.tag}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DEEP TECH SPECIFICATIONS */}
      <section className="py-40 bg-card/30 border-y border-border/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_var(--background)_100%)] z-10" />
        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-3xl mb-24">
            <h2 className="text-4xl md:text-7xl font-black text-foreground mb-8 tracking-tighter">Hardened <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-8">Architectures</span>.</h2>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">Built for resilience and independence. Our technology division operates under strict sovereign design protocols.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { title: "Sovereign Node Protocol", desc: "Proprietary node software that enables decentralized data custody and validation across uneven network environments.", icon: Server },
              { title: "Zero-Knowledge Encryption", desc: "Military-grade cryptographic layers ensuring absolute privacy and security for all high-value ecosystem communications.", icon: ShieldAlert },
              { title: "Distributed Database Mesh", desc: "Resilient data availability through geo-distributed, high-latency-tolerant storage architectures.", icon: Database },
              { title: "AI-Native Integration", desc: "Deeply embedded neural processing layers that optimize system performance and security in real-time.", icon: Cpu },
            ].map((item, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-background border border-border/10 group hover:border-accent shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-card border border-border/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black text-foreground tracking-tighter">{item.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="container mx-auto px-6 py-40">
        <div className="p-16 md:p-24 rounded-[4rem] bg-primary relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-accent opacity-20 blur-[100px] group-hover:scale-125 transition-transform duration-1000" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-none">Access the <br /> <span className="italic">Development</span> Portal.</h2>
              <p className="text-indigo-100 text-lg font-light mb-10 max-w-md">Connect your local nodes, inspect API documentation, and integrate with the sovereign network layers.</p>
              <button className="px-10 py-5 rounded-2xl bg-white text-primary font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-xl flex items-center gap-4">
                Inspect Documentation <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex justify-end">
              <Zap className="w-64 h-64 text-accent/20 rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
            </div>
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
