"use client";

import React from "react";
import { HeroSection } from "@/components/organisms/home/HeroSection";
import { GlobeSection } from "@/components/organisms/home/GlobeSection";
import { MetricsSection } from "@/components/organisms/home/MetricsSection";
import { MapSection } from "@/components/organisms/home/MapSection";
import { ShowcasesSection } from "@/components/organisms/home/ShowcasesSection";
import { NewsBlogsSection } from "@/components/organisms/home/NewsBlogsSection";
import { FooterSection } from "@/components/organisms/home/FooterSection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-background text-foreground selection:bg-primary/30">
      
      {/* 1 & 3: Hero Section with AI Particle Environment */}
      <HeroSection />

      {/* 2: Animated Globe */}
      <GlobeSection />

      {/* 4 & 5: Mission & Vision */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-4xl text-center my-24 px-6"
      >
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-300 text-sm font-medium mb-8">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
          Global Command Center Online
        </div>
        <h1 className="text-6xl md:text-8xl font-bold font-heading tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-500">
          Building Africa's Operating System.
        </h1>
        <p className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl mx-auto mb-12">
          The Global Institute of Innovation Network (GIIN). 
          Unifying technology, capital, and leadership into one sovereign architecture.
        </p>
      </motion.div>

      {/* 6 & 7: GIIN Ecosystem Overview & Divisions */}
      <section className="w-full border-t border-border/50 bg-black py-24">
        <div className="container mx-auto px-6">
          <h2 className="mb-16 font-heading text-4xl font-bold md:text-6xl text-white">
            The <span className="text-primary">Ecosystem</span>
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Leadership Institute", desc: "Forging the next generation of visionary leaders.", href: "/leadership" },
              { title: "Technology Company", desc: "Building scalable software for enterprise impact.", href: "/technology" },
              { title: "Multimedia Studio", desc: "Crafting narratives that shift global paradigms.", href: "/multimedia" },
              { title: "Innovation Lab", desc: "Incubating ideas that solve complex challenges.", href: "/innovation" },
              { title: "Research Academy", desc: "Data-driven insights for strategic national transformation.", href: "/research" },
              { title: "Cyber Defense", desc: "Enterprise SOC and digital transformation consulting.", href: "/cyber" },
            ].map((div, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={div.href} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all hover:bg-white/10 hover:border-primary/50 cursor-pointer block h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{div.title}</h3>
                      <p className="text-slate-400">{div.desc}</p>
                    </div>
                    <div className="mt-8 flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Enter System <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8: Impact Metrics */}
      <MetricsSection />

      {/* 9 & 10: Innovation Map & Tech Stats */}
      <MapSection />

      {/* 11, 12, 13: Showcases */}
      <ShowcasesSection />

      {/* 17 & 18: News & Blogs */}
      <NewsBlogsSection />

      {/* 19: Global CTA */}
      <section className="relative w-full py-40 overflow-hidden bg-primary/20">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="mb-8 font-heading text-5xl font-extrabold text-white md:text-7xl">Ready to Lead?</h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-white/80">
            Join the ecosystem of African innovators, creators, and pioneers transforming the continent.
          </p>
          <button className="rounded-full bg-white px-10 py-5 text-lg font-bold text-primary transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
            Join the Ecosystem
          </button>
        </div>
      </section>

      {/* 20: Footer */}
      <FooterSection />
    </main>
  );
}
