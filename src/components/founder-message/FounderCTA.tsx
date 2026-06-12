"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Layers, Handshake, Mail } from "lucide-react";
import Link from "next/link";

export function FounderCTA() {
  const cards = [
    {
      icon: Layers,
      title: "Explore GIIN Ecosystem",
      desc: "Investigate our core software solutions, AI architectures, and academic initiatives mapping the digital sovereignty project.",
      href: "/#mission",
      cta: "Explore Ecosystem",
      color: "from-primary/20 to-indigo-500/10 border-primary/30"
    },
    {
      icon: Handshake,
      title: "Become a Partner",
      desc: "Collaborate with our teams, sponsor R&D blueprints, or integrate GIIN platform products within your organization.",
      href: "/community",
      cta: "Partner Inquiries",
      color: "from-indigo-500/20 to-accent/10 border-indigo-500/30"
    },
    {
      icon: Mail,
      title: "Contact GIIN",
      desc: "Get in touch with local executive offices, query technical configurations, or schedule strategy discussions.",
      href: "/contact",
      cta: "Send Message",
      color: "from-accent/20 to-primary/10 border-accent/30"
    }
  ];

  return (
    <section className="py-28 rounded-[3.5rem] bg-gradient-to-br from-primary/10 via-indigo-950/20 to-transparent border border-border/10 relative overflow-hidden text-center transition-all mx-6 my-16">
      {/* Glow circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] rounded-full pointer-events-none animate-glow-pulse" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tighter font-heading text-balance leading-tight">
          Join Us in Building the Future
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-16 font-light max-w-2xl mx-auto text-balance">
          Whether as an engineer, a partner, or a supporter—you are needed to secure Africa&apos;s digital autonomy.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {cards.map((card, i) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-8 rounded-3xl border bg-gradient-to-br ${card.color} backdrop-blur-3xl hover:scale-[1.02] hover:shadow-2xl transition-all flex flex-col justify-between group`}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-background/55 border border-border/10 flex items-center justify-center mb-6 text-foreground group-hover:text-accent transition-colors">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground font-heading mb-2 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-xs font-light leading-relaxed mb-8">
                    {card.desc}
                  </p>
                </div>

                <Link
                  href={card.href}
                  className="inline-flex items-center gap-2 text-xs font-bold text-foreground group-hover:text-accent transition-colors w-fit"
                >
                  <span>{card.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
