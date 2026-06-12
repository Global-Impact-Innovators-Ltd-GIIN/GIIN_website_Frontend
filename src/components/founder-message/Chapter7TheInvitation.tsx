"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers, Handshake, Mail, Quote, Sparkles } from "lucide-react";

export function Chapter7TheInvitation() {
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
    <section id="invitation" className="py-24 bg-background relative z-10 overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Chapter 7: The Invitation
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter font-heading mb-4">
            Become Part of the Future
          </h2>
          <p className="text-muted-foreground text-lg font-light leading-relaxed">
            Whether as an engineer, a corporate partner, or an institution—you are needed to secure Africa&apos;s digital autonomy.
          </p>
        </div>

        {/* CTA cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-20">
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

        {/* Concluding Signature Block Card */}
        <div className="p-8 md:p-12 rounded-[2.5rem] border border-border/10 bg-card/25 backdrop-blur-2xl shadow-2xl relative text-center">
          
          {/* Quote Mark Decoration */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-accent">
              <Quote className="w-5 h-5 fill-current" />
            </div>
          </div>

          {/* Closing Statement */}
          <blockquote className="text-2xl md:text-4xl font-black text-foreground tracking-tighter leading-tight font-heading mb-10 max-w-2xl mx-auto italic text-balance">
            &ldquo;The future is not something we wait for.<br />
            It is something we <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">build</span>.&rdquo;
          </blockquote>

          {/* Separator line */}
          <div className="h-px bg-gradient-to-r from-transparent via-border/25 to-transparent w-full max-w-md mx-auto mb-10" />

          {/* Signature info block */}
          <div className="flex flex-col items-center gap-4">
            
            {/* Avatar */}
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-accent shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop"
                alt="Dr. Emmanuel K. Mensah"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>

            {/* Signature SVG path */}
            <div className="py-2 opacity-90">
              <svg
                className="w-48 h-16 text-accent fill-none stroke-current stroke-[1.5]"
                viewBox="0 0 150 50"
                aria-hidden="true"
              >
                <path d="M10 25 C20 15, 30 5, 40 25 C50 45, 60 35, 70 20 C80 5, 90 15, 100 30 C110 45, 120 40, 130 30 C140 20, 145 25, 150 25 M30 20 L50 35 M90 22 L110 32" />
              </svg>
            </div>

            {/* Title details */}
            <div className="font-heading">
              <h4 className="text-xl font-bold text-foreground leading-none">Dr. Emmanuel K. Mensah</h4>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mt-2 font-light">Founder & Executive Director, GIIN</p>
            </div>

            {/* Social connection icons */}
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-border/10 bg-muted/40 text-muted-foreground hover:text-primary hover:border-primary/20 transition-all hover:scale-105"
                aria-label="LinkedIn profile"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" /></svg>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-border/10 bg-muted/40 text-muted-foreground hover:text-primary hover:border-primary/20 transition-all hover:scale-105"
                aria-label="X (Twitter) profile"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.25 2.25h6.634l4.704 6.22 5.656-6.22z" /></svg>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
