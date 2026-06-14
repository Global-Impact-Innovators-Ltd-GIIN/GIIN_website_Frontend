"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, Zap, ArrowRight, Shield } from "lucide-react";

interface PrinciplesHeroProps {
  onExploreClick: () => void;
  onCultureClick: () => void;
}

export default function PrinciplesHero({ onExploreClick, onCultureClick }: PrinciplesHeroProps) {
  // Decorative node positions for the background mesh
  const nodes = [
    { x: "15%", y: "25%", delay: 0 },
    { x: "75%", y: "20%", delay: 0.5 },
    { x: "85%", y: "65%", delay: 1 },
    { x: "20%", y: "70%", delay: 1.5 },
    { x: "50%", y: "45%", delay: 2 },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute inset-0 bg-[#020205]" />
      
      {/* Cybernetic Aura Gradient glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[450px] h-[450px] rounded-full bg-blue-500/10 blur-[130px] pointer-events-none" />

      {/* Interactive Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(127,76,165,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(127,76,165,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Animated SVG Value Nodes Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <svg className="w-full h-full opacity-40">
          <motion.path
            d="M 15 25 L 50 45 L 75 20 M 50 45 L 85 65 M 50 45 L 20 70"
            stroke="rgba(127, 76, 165, 0.15)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </svg>

        {nodes.map((node, index) => (
          <motion.div
            key={index}
            className="absolute w-2 h-2 rounded-full bg-primary-glow border border-primary/40 shadow-[0_0_12px_rgba(127,76,165,0.6)]"
            style={{ left: node.x, top: node.y }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: node.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-8">
            <Shield className="w-3.5 h-3.5 text-primary" />
            The Constitutional Blueprint
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] mb-8 font-outfit text-white">
            Principles That Guide <br className="hidden md:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-400 to-accent">
              Every Decision
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-2xl text-slate-400 font-light leading-relaxed max-w-3xl mx-auto mb-12 text-balance">
            Great organizations are not built solely by talent or technology. They are built upon values, principles, and standards that consistently guide action and decision-making.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-white font-bold text-sm uppercase tracking-widest shadow-lg hover:bg-primary/80 transition-all duration-300 flex items-center justify-center gap-2 border border-primary/30 group"
              aria-label="Explore Our Principles"
            >
              Explore Our Principles
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onCultureClick}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 text-slate-300 font-bold text-sm uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 border border-white/10"
              aria-label="Discover Our Culture"
            >
              <Compass className="w-4 h-4 text-accent" />
              Discover Our Culture
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-bold">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-1.5 h-6 rounded-full bg-gradient-to-b from-primary to-accent"
        />
      </div>
    </section>
  );
}
