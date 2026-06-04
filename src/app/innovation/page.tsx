"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Rocket, Lightbulb, Sparkles, Target,
  FlaskConical, Zap, ArrowRight, BarChart3,
  Cpu, Users
} from "lucide-react";

export default function InnovationPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-32 transition-colors duration-500 overflow-x-hidden">
      {/* HERO - The Innovation Mandate */}
      <section className="container mx-auto px-6 mb-40">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              <Sparkles className="w-3 h-3" />
              Innovation Lab
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-foreground mb-8 tracking-tighter font-outfit leading-[0.9] text-balance">
              The <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-amber-500">Bleeding Edge</span> of Systems.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl text-balance">
              We don't just build software; we engineer the new reality. GIIN Labs is the engine room of African technological sovereignty.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CORE DIVISIONS */}
      <section className="container mx-auto px-6 mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            {
              title: "GIIN Labs",
              tag: "R&D",
              desc: "Future-focused sandbox environment for engineering high-impact, bleeding-edge tech concepts. Our engineers focus on mesh networks, hardware-firmware integration, and localized AI.",
              icon: FlaskConical,
              accent: "text-primary"
            },
            {
              title: "Startup Incubator",
              tag: "Venture",
              desc: "Accelerating early-stage African ventures with sovereign infrastructure, seed capital, and direct mentorship from global tech leaders.",
              icon: Rocket,
              accent: "text-accent"
            },
            {
              title: "Innovation Strategy",
              tag: "Advisory",
              desc: "Defining long-term roadmaps for governments and large organizations to incorporate emerging artificial intelligence and decentralized systems.",
              icon: Target,
              accent: "text-primary"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group p-10 rounded-[3rem] bg-card border border-border/10 hover:border-accent/40 transition-all duration-500 flex flex-col items-start shadow-sm hover:shadow-2xl"
            >
              <div className={`w-14 h-14 rounded-2xl bg-background border border-border/20 flex items-center justify-center mb-8 ${item.accent} group-hover:bg-foreground group-hover:text-background transition-all duration-500`}>
                <item.icon className="w-7 h-7" />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-3xl font-black text-foreground tracking-tighter">{item.title}</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2 py-1 rounded bg-muted/50 border border-border/10">{item.tag}</span>
              </div>
              <p className="text-muted-foreground font-light leading-relaxed mb-8">{item.desc}</p>
              <button className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground group-hover:text-accent transition-colors">
                Explore <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* THE INNOVATION ENGINE */}
      <section className="py-20 mb-40 border-y border-border/10 bg-card/30 relative overflow-hidden transition-colors duration-500">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-8 tracking-tighter">AI Venture <span className="text-primary italic">Intelligence</span>.</h2>
            <p className="text-xl text-muted-foreground font-light leading-relaxed mb-10 text-balance">
              Our proprietary algorithmic scoring engine evaluates startup viability and market opportunity in milliseconds, providing founders with radical insights.
            </p>
            <div className="space-y-4">
              {[
                "Algorithmic Market Opportunity Predictor",
                "Sovereign Infrastructure Readiness Score",
                "Impact Measurement Analysis Dashboard",
                "Zero-Latency Venture Evaluation"
              ].map((li, i) => (
                <div key={i} className="flex items-center gap-4 text-foreground font-bold text-sm tracking-tight border-b border-border/10 pb-4">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  {li}
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-[4rem] bg-gradient-to-br from-primary/20 to-accent/20 border border-white/10 backdrop-blur-2xl p-12 flex items-center justify-center shadow-2xl relative z-10">
              <div className="grid grid-cols-2 gap-8 w-full">
                {[
                  { label: "Scoring engine", icon: BarChart3, val: "98.4%" },
                  { label: "AI Prediction", icon: Zap, val: "A+" },
                  { label: "Network nodes", icon: Cpu, val: "1.2k" },
                  { label: "Mentors", icon: Users, val: "250+" },
                ].map((stat, i) => (
                  <div key={i} className="p-8 rounded-3xl bg-background/50 border border-white/10 flex flex-col items-center justify-center text-center">
                    <stat.icon className="w-8 h-8 text-accent mb-4" />
                    <span className="text-2xl font-black text-foreground">{stat.val}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 blur-[60px] rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 blur-[60px] rounded-full" />
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="container mx-auto px-6 mb-40 text-center">
        <div className="max-w-3xl mx-auto p-20 rounded-[4rem] bg-foreground text-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">Build the <span className="italic">Standard</span>.</h2>
            <p className="text-lg opacity-80 mb-10 font-light text-balance">Apply for incubation or collaborate on deep-tech R&D at the heart of Africa's innovation ecosystem.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-10 py-5 rounded-2xl bg-background text-foreground font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform">Enroll in Incubator</button>
              <button className="px-10 py-5 rounded-2xl border border-white/20 text-white font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-colors">Launch Strategy Case</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
