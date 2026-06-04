"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Mail, HeartHandshake } from "lucide-react";

interface FinalCTAProps {
  onPartnerClick: () => void;
  onExploreClick: () => void;
  onContactClick: () => void;
}

export function FinalCTA({ onPartnerClick, onExploreClick, onContactClick }: FinalCTAProps) {
  return (
    <section className="py-32 px-6 relative bg-[#020205] overflow-hidden">
      {/* Background glow matrix */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[600px] md:h-[900px] bg-primary/10 rounded-full blur-[150px] animate-glow-pulse" />
        <div className="absolute -bottom-20 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[3.5rem] border border-border/10 bg-[#07070F]/80 backdrop-blur-2xl p-8 md:p-20 text-center overflow-hidden shadow-2xl"
        >
          {/* Inner mesh background overlay */}
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            {/* Sparkle Icon */}
            <div className="flex justify-center">
              <div className="p-4 rounded-3xl bg-card border border-border/15 text-accent shadow-lg animate-bounce">
                <HeartHandshake className="w-8 h-8" />
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-3xl md:text-6xl font-black text-foreground tracking-tighter font-outfit leading-[1.05] text-balance">
              Join the Movement <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent italic">
                Building Africa's Future
              </span>
            </h2>

            {/* Paragraph */}
            <p className="text-muted-foreground text-base md:text-xl font-light leading-relaxed text-balance">
              We are actively seeking forward-thinking partners, corporate co-investors, institutional clients, 
              and elite builders to expand this sovereign continental blueprint. 
              Let's build the tomorrow we want to see.
            </p>

            {/* CTA Actions */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <button
                onClick={onPartnerClick}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl hover:opacity-90 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
              >
                Partner With Us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-4 bg-[#0A0A12] border border-border/10 hover:border-secondary/30 text-foreground font-bold rounded-2xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Explore GIIN Ecosystem
              </button>

              <button
                onClick={onContactClick}
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-transparent hover:border-border/10 text-muted-foreground hover:text-white font-bold rounded-2xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                Contact Us
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
