"use client";

import React from "react";
import { HeroSection } from "@/components/organisms/home/HeroSection";
import { GlobeSection } from "@/components/organisms/home/GlobeSection";
import { MetricsSection } from "@/components/organisms/home/MetricsSection";
import { MapSection } from "@/components/organisms/home/MapSection";
import { ShowcasesSection } from "@/components/organisms/home/ShowcasesSection";
import { NewsBlogsSection } from "@/components/organisms/home/NewsBlogsSection";
import { FooterSection } from "@/components/organisms/home/FooterSection";
import { MissionSection } from "@/components/organisms/home/MissionSection";
import { VisionSection } from "@/components/organisms/home/VisionSection";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-background text-foreground selection:bg-accent/30 transition-colors duration-500">

      {/* 1. Hero Section (Overview Target) */}
      <div id="overview">
        <HeroSection />
      </div>

      {/* 2. Mission Section */}
      <MissionSection />

      {/* 3. Vision Section */}
      <VisionSection />

      {/* 4. Animated Globe (Identity Background) */}
      <GlobeSection />

      {/* 5. The Ecosystem Overview */}
      <section id="ecosystem" className="w-full border-t border-border/10 bg-background py-32 relative overflow-hidden transition-colors duration-500">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 dark:bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                <Sparkles className="w-3 h-3" />
                The GIIN Universe
              </div>
              <h2 className="text-4xl md:text-7xl font-black text-foreground tracking-tighter font-outfit">
                Powering the <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-amber-500 italic">Continental Engine</span>.
              </h2>
            </div>
            <p className="text-muted-foreground max-w-sm mb-2 font-medium">
              A multi-disciplinary stack designed to solve Africa's most complex challenges through engineering and leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Leadership Institute", desc: "Forging the next generation of visionary leaders through elite curricula.", href: "/leadership", color: "from-accent/20" },
              { title: "Technology Company", desc: "Sovereign application engineering and node infrastructure development.", href: "/technology", color: "from-primary/30" },
              { title: "Multimedia Studio", desc: "Crafting narratives that shift paradigms and represent the African future.", href: "/multimedia", color: "from-accent/20" },
              { title: "Innovation Lab", desc: "Incubating bleeding-edge concepts into market-ready technologies.", href: "/innovation", color: "from-primary/30" },
              { title: "Research Academy", desc: "Strategic data insights driving national and continental transformation.", href: "/research", color: "from-accent/20" },
              { title: "Cyber Defense", desc: "Critical infrastructure protection and SOC operations for the digital age.", href: "/cyber", color: "from-primary/30" },
            ].map((div, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={div.href} className="group relative overflow-hidden rounded-3xl border border-border/10 bg-card p-8 transition-all duration-500 hover:bg-muted/50 hover:border-primary/30 cursor-pointer block h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${div.color} to-transparent opacity-0 transition-opacity group-hover:opacity-100`} />
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors tracking-tight">{div.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground transition-colors">{div.desc}</p>
                    </div>
                    <div className="mt-10 flex items-center text-xs font-bold uppercase tracking-widest text-accent opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                      Enter System <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Impact Metrics (Journey Target) */}
      <div id="journey" className="w-full">
        <MetricsSection />
      </div>

      {/* 7. Innovation Map */}
      <MapSection />

      {/* 8. Showcases */}
      <ShowcasesSection />

      {/* 9. News & Blogs */}
      <NewsBlogsSection />

      {/* 10. Global CTA */}
      <section className="relative w-full py-48 overflow-hidden bg-background transition-colors duration-500">
        <div className="absolute inset-0 bg-accent/5 dark:bg-accent/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <h2 className="mb-8 font-heading text-6xl font-black text-foreground md:text-8xl tracking-tighter text-balance">Ready to <span className="text-accent italic">Engage?</span></h2>
            <p className="mx-auto mb-16 max-w-xl text-xl text-muted-foreground font-light leading-relaxed text-balance">
              Join the elite ecosystem of African innovators, creators, and pioneers transforming the global landscape.
            </p>
            <button className="group relative overflow-hidden rounded-2xl bg-foreground text-background px-12 py-6 text-lg font-bold transition-all hover:pr-14 active:scale-95 shadow-xl">
              Connect to Network
              <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-all" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* 11. Footer */}
      <FooterSection />
    </main>
  );
}
