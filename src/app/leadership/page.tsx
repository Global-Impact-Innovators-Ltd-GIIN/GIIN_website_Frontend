"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  MessageSquare, Users, ShieldAlert, Heart,
  ArrowRight, Globe, Zap, Target, Quote
} from "lucide-react";
import Image from "next/image";

export default function LeadershipPage() {
  const team = [
    { name: "Executive Director", role: "Strategy & Vision", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop" },
    { name: "Chief Technology Officer", role: "Engineering & Infra", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=256&h=256&auto=format&fit=crop" },
    { name: "Head of Research", role: "Sovereign Data", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&h=256&auto=format&fit=crop" },
    { name: "Creative Director", role: "Multimedia & Narrative", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&h=256&auto=format&fit=crop" },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground pt-32 transition-colors duration-500 overflow-x-hidden">
      {/* HER0 - The Leadership Narrative */}
      <section className="container mx-auto px-6 mb-40">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              <Zap className="w-3 h-3" />
              Leadership OS
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-foreground mb-8 tracking-tighter font-outfit leading-[0.9] text-balance">
              Forging <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-amber-500">Sovereign Authority</span>.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl text-balance">
              The stewards of the GIIN network are committed to building the infrastructure that secures Africa's digital and economic future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FOUNDER MESSAGE SECTION */}
      <section id="founder" className="py-32 bg-card/30 border-y border-border/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square max-w-md mx-auto lg:mx-0 rounded-[3rem] overflow-hidden border border-border/20 shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
              alt="The Founder"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-10 left-10">
              <h3 className="text-2xl font-black text-foreground">The Founder's Desk</h3>
              <p className="text-sm font-bold text-accent uppercase tracking-widest">Strategic Direction</p>
            </div>
          </motion.div>

          <div>
            <Quote className="w-12 h-12 text-primary mb-8 opacity-50" />
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-8 tracking-tighter leading-tight">
              "Innovation is not just about building apps; it's about building <span className="text-primary italic">nations</span>."
            </h2>
            <div className="space-y-6 text-muted-foreground font-light leading-relaxed text-lg">
              <p>
                When we conceptualized GIIN, the mandate was clear: Africa must own the primary layer of its technological stack. We cannot innovate on borrowed infrastructure and expect sovereign results.
              </p>
              <p>
                Today, we are not just a company; we are an ecosystem. A network of practitioners, engineers, and visionaries unified by a singular goal—the absolute technological autonomy of our continent.
              </p>
            </div>
            <div className="mt-12 p-8 rounded-3xl bg-background border border-border/10 shadow-sm">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-2">Authenticated Signature</p>
              <div className="h-px bg-border/20 w-full mb-4" />
              <p className="font-outfit italic text-xl text-foreground">The Desk of the Founder, GIIN</p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section id="team" className="py-40 bg-background relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                <Users className="w-3 h-3" />
                The Collective
              </div>
              <h2 className="text-4xl md:text-7xl font-black text-foreground tracking-tighter">Mission <span className="text-primary">Stewardship</span>.</h2>
            </div>
            <p className="max-w-md text-muted-foreground font-light">
              Our team is composed of the brightest minds across engineering, law, and creative storytelling.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-border/10 mb-6 group-hover:border-primary/50 transition-all duration-500 shadow-sm group-hover:shadow-2xl translate-y-0 group-hover:-translate-y-2">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-8 left-8 right-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <button className="w-full py-3 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-widest shadow-xl">Bio Narrative</button>
                  </div>
                </div>
                <h3 className="text-xl font-black text-foreground mb-1">{member.name}</h3>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPLES SECTION */}
      <section id="principles" className="py-40 bg-card border-y border-border/10">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-8 tracking-tighter">Core <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-8">Principles</span>.</h2>
            <p className="text-xl text-muted-foreground font-light">The laws of the ecosystem. Non-negotiable directives that govern every line of code we ship.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { title: "Radical Sovereignty", desc: "Every system must be owned and governed by the primary operators. No dependencies that can be switched off from the outside.", icon: ShieldAlert },
              { title: "Impact Engineering", desc: "We don't build features; we build solutions for documented bottlenecks in African trade, education, and health.", icon: Target },
              { title: "Transparent Governance", desc: "The ledger of impact must be immutable. We operate with radical transparency for our partners and community.", icon: Globe },
              { title: "Future-Proof Logic", desc: "Architecture designed not for today's hardware, but for the decentralized, AI-native world of 2030 and beyond.", icon: Zap },
            ].map((item, i) => (
              <div key={i} className="flex gap-8 group">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-background border border-border/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all duration-500 shadow-sm">
                  <item.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-foreground mb-4 tracking-tighter">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT STORIES SECTION */}
      <section id="stories" className="py-40 bg-background overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                <Heart className="w-3 h-3" />
                Impact Narrative
              </div>
              <h2 className="text-4xl md:text-7xl font-black text-foreground mb-8 tracking-tighter leading-[0.9]">Human Stories, <br /> <span className="italic">Digital Infrastructure</span>.</h2>
              <p className="text-xl text-muted-foreground font-light mb-12 max-w-xl">
                From the remote researcher in Goma to the tech-scale founder in Nairobi, discover the humans within the mesh.
              </p>
              <button className="px-10 py-5 rounded-2xl bg-foreground text-background font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-4">
                Read Case Studies <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4 relative">
              <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full" />
              <div className="space-y-4 pt-12">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden relative border border-border/10 shadow-2xl scale-110 z-10">
                  <Image src="https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?q=80&w=400&auto=format&fit=crop" alt="Impact" fill className="object-cover" />
                </div>
                <div className="aspect-square rounded-3xl overflow-hidden relative border border-border/10 shadow-xl">
                  <Image src="https://images.unsplash.com/photo-1540555700478-4be289fbecee?q=80&w=400&auto=format&fit=crop" alt="Impact" fill className="object-cover" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="aspect-square rounded-3xl overflow-hidden relative border border-border/10 shadow-xl">
                  <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400&auto=format&fit=crop" alt="Impact" fill className="object-cover" />
                </div>
                <div className="aspect-[4/5] rounded-3xl overflow-hidden relative border border-border/10 shadow-2xl scale-110 z-10">
                  <Image src="https://images.unsplash.com/photo-1579389083078-4e7018379f7e?q=80&w=400&auto=format&fit=crop" alt="Impact" fill className="object-cover" />
                </div>
              </div>
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
