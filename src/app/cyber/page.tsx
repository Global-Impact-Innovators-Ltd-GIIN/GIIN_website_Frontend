"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldAlert, RefreshCw, Lock, ShieldCheck,
  ArrowRight, Shield, Zap, Search,
  Eye, Cpu
} from "lucide-react";

export default function CyberSecurityPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-32 transition-colors duration-500 overflow-x-hidden">
      {/* HERO - The Defensive Layer */}
      <section className="container mx-auto px-6 mb-40">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              <Lock className="w-3 h-3" />
              Security Operations
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-foreground mb-8 tracking-tighter font-outfit leading-[0.9] text-balance">
              The <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-primary">Sovereign Shield</span>.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl text-balance">
              Protecting the continental network through proactive threat detection, zero-trust architectures, and cryptographic sovereignty.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECURITY SERVICES */}
      <section className="container mx-auto px-6 mb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Threat Detection",
              tag: "Real-time",
              desc: "Next-gen monitoring systems that leverage AI to identify and neutralize cyber threats before they penetrate the network layer.",
              icon: Search,
              color: "text-red-500"
            },
            {
              title: "Zero-Trust Architecture",
              tag: "Infrastructure",
              desc: "Implementing strict identity verification and data isolation protocols across every node in the ecosystem.",
              icon: ShieldCheck,
              color: "text-primary"
            },
            {
              title: "Sovereign Firewalls",
              tag: "Perimeter",
              desc: "Designing state-of-the-art security layers that ensure African data remains protected within its jurisdiction.",
              icon: Shield,
              color: "text-red-500"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group p-12 rounded-[3.5rem] bg-card border border-border/10 hover:border-red-500/40 transition-all duration-500 shadow-sm hover:shadow-2xl"
            >
              <div className={`w-14 h-14 rounded-2xl bg-background border border-border/10 flex items-center justify-center mb-10 ${item.color} group-hover:scale-110 transition-transform`}>
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-black text-foreground mb-4 tracking-tighter">{item.title}</h3>
              <p className="text-muted-foreground font-light leading-relaxed mb-10">{item.desc}</p>
              <span className="text-[10px] font-bold uppercase tracking-widest text-red-500/70">{item.tag}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SYSTEM AUDIT & TRANSFORMATION */}
      <section className="py-40 bg-card/30 border-y border-border/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-500/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-7xl font-black text-foreground mb-8 tracking-tighter">Hardened <span className="text-red-500 italic">Integrity</span>.</h2>
            <p className="text-xl text-muted-foreground font-light leading-relaxed mb-12">
              Our transformation division modernizes legacy systems into resilient, cloud-native architectures with built-in security protocols.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { title: "Network Audit", icon: Eye, val: "24/7" },
                { title: "Response Time", icon: Zap, val: "Sub-ms" },
                { title: "Encryption", icon: Lock, val: "AES-512" },
                { title: "AI Defense", icon: Cpu, val: "Active" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-4 p-6 rounded-2xl bg-background border border-border/10">
                  <div className="w-10 h-10 rounded-xl bg-card border border-border/10 flex items-center justify-center text-red-500">
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.title}</p>
                    <p className="text-lg font-black text-foreground tracking-tight">{stat.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative p-1 rounded-[3rem] bg-gradient-to-br from-red-500/20 to-primary/20">
            <div className="p-12 rounded-[2.9rem] bg-card backdrop-blur-3xl relative z-10">
              <h3 className="text-2xl font-black text-foreground mb-6 tracking-tighter">Security Readiness Audit</h3>
              <p className="text-sm text-muted-foreground mb-8 font-light">Evaluate your organizational infrastructure against the sovereign security standard.</p>

              <div className="space-y-4 mb-10">
                {[
                  "Legacy Port Inspection",
                  "Data Residency Compliance",
                  "Auth Protocol Verification",
                  "Cloud Architecture Audit"
                ].map((check, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border/10">
                    <span className="text-xs font-bold text-foreground">{check}</span>
                    <div className="w-4 h-4 rounded-full border-2 border-red-500/30 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full py-4 rounded-xl bg-red-500 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-red-500/20 hover:scale-[1.02] transition-transform">
                Request System Audit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="container mx-auto px-6 py-40">
        <div className="max-w-4xl mx-auto p-16 md:p-24 rounded-[4rem] bg-foreground text-background text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-red-500/20 to-transparent" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">Secure the <span className="italic">Future</span>.</h2>
            <p className="text-lg opacity-80 mb-10 font-light max-w-2xl mx-auto">Partner with the GIIN Security Operations center to harden your national or enterprise digital infrastructure.</p>
            <button className="px-12 py-5 rounded-2xl bg-background text-foreground font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-4 mx-auto">
              Connect with Ops <ArrowRight className="w-4 h-4" />
            </button>
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
