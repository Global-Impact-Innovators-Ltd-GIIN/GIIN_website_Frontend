"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function CultureManifesto() {
  const statements = [
    "We choose excellence over convenience.",
    "We value contribution over position.",
    "We innovate with purpose.",
    "We build people before products.",
    "We solve problems, not create excuses.",
    "We act with integrity even when no one is watching.",
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section id="culture" className="py-32 bg-[#020205] relative overflow-hidden border-t border-white/5">
      {/* Absolute deep glowing nodes in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-20">
            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <Quote className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-xs font-bold text-accent uppercase tracking-[0.25em] mb-4">
              Our Manifesto
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4 font-outfit">
              The Culture We Protect
            </h3>
            <p className="text-base text-slate-400 font-light max-w-xl">
              These standards define our operational climate. They are checked and reinforced daily.
            </p>
          </div>

          {/* Large Typographic list */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8 md:space-y-12"
          >
            {statements.map((stmt, idx) => (
              <motion.div
                key={idx}
                variants={lineVariants}
                className="group relative flex items-start gap-6 border-b border-white/5 pb-8 md:pb-12 hover:border-primary/30 transition-colors duration-300"
              >
                <span className="font-mono text-xs text-primary font-bold pt-2 shrink-0 md:text-sm">
                  {`[0${idx + 1}]`}
                </span>
                <h4 className="text-2xl md:text-5xl font-bold tracking-tight text-slate-200 group-hover:text-white group-hover:translate-x-2 transition-all duration-300 font-outfit text-balance">
                  {stmt}
                </h4>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
