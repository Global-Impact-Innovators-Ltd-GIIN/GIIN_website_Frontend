"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Compass, Sparkles } from "lucide-react";

interface AboutHeroProps {
  onExploreClick: () => void;
  onPartnerClick: () => void;
}

export function AboutHero({ onExploreClick, onPartnerClick }: AboutHeroProps) {
  // Background particles
  const particles = Array.from({ length: 20 });

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-6 bg-[#020205]">
      {/* Immersive Background Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/10 rounded-full blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-secondary/10 rounded-full blur-[100px] animate-glow-pulse [animation-delay:1.5s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />
      </div>

      {/* Floating Particle Grid (Framer Motion) */}
      <div className="absolute inset-0 pointer-events-none z-1">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-6xl relative z-10 text-center">
        {/* Floating Innovation Elements in Hero */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 border border-border/20 text-secondary text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md shadow-2xl"
          >
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            Global Impact Innovators
          </motion.div>
        </div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-foreground mb-8 tracking-tighter font-outfit leading-[1.05] text-balance max-w-5xl mx-auto"
        >
          Building Africa's Future Through{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-blue-400">
            Leadership, Innovation
          </span>{" "}
          and{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-accent">
            Technology
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto mb-12 text-balance"
        >
          GIIN powers the critical infrastructure of tomorrow—equipping leaders, 
          deploying sovereign tech solutions, and building the transformative ecosystems 
          that drive continental growth and global competitiveness.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6"
        >
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl hover:opacity-90 active:scale-95 transition-all shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 group cursor-pointer"
          >
            Explore Our Ecosystem
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={onPartnerClick}
            className="w-full sm:w-auto px-8 py-4 bg-[#0A0A12] border border-border/20 hover:border-secondary/40 text-foreground font-bold rounded-2xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Partner With GIIN
          </button>
        </motion.div>

        {/* Decorative Grid Icons Floating */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          <motion.div
            className="absolute top-1/4 left-10 p-4 rounded-2xl bg-card/40 border border-border/10 backdrop-blur-lg text-primary"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Shield className="w-6 h-6" />
          </motion.div>
          <motion.div
            className="absolute bottom-1/4 right-10 p-4 rounded-2xl bg-card/40 border border-border/10 backdrop-blur-lg text-accent"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <Zap className="w-6 h-6" />
          </motion.div>
          <motion.div
            className="absolute top-1/3 right-1/6 p-4 rounded-2xl bg-card/40 border border-border/10 backdrop-blur-lg text-secondary"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <Compass className="w-6 h-6" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
