"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Zap, ArrowDown, Users } from "lucide-react";

interface Chapter1MeetFounderProps {
  onExploreClick: () => void;
}

export function Chapter1MeetFounder({ onExploreClick }: Chapter1MeetFounderProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden z-10">
      {/* Cinematic Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-primary/10 rounded-full blur-[130px] animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[110px]" />
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">

        {/* Left Side: Dynamic Text & Hook */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary-foreground/95 text-[10px] font-bold uppercase tracking-[0.2em] w-fit">
              <Zap className="w-3.5 h-3.5 text-accent animate-pulse" />
              Chapter 1: Meet the Founder
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-foreground tracking-tighter font-heading leading-[0.9] text-balance">
              Building Leaders.<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-400 to-accent">
                Transforming Nations.
              </span><br />
              Shaping the Future.
            </h1>

            {/* Supporting Text */}
            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl text-balance">
              What began as a personal conviction to develop transformational leaders and modular digital systems has evolved into an ecosystem dedicated to empowering individuals, organizations, and communities across Africa and beyond.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onExploreClick}
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-500 text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/10 hover:scale-[1.02]"
              >
                <span>Enter The Narrative</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
              </button>

              <a
                href="/community"
                className="group inline-flex items-center gap-2 border border-border/20 bg-card/40 backdrop-blur-md hover:bg-card/75 text-foreground hover:text-white font-bold px-6 py-3.5 rounded-xl transition-all"
              >
                <span>Join The Movement</span>
                <Users className="w-4 h-4 text-accent transition-transform group-hover:scale-110" />
              </a>
            </div>

            {/* Signature & Details */}
            <div className="pt-8 flex flex-col gap-2 opacity-85">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">AUTHENTICATED DIGITAL PATH</span>
              <div className="flex items-center gap-4">
                <svg
                  className="w-36 h-12 text-accent fill-none stroke-current stroke-[1.5]"
                  viewBox="0 0 150 50"
                  aria-hidden="true"
                >
                  <path d="M10 25 C20 15, 30 5, 40 25 C50 45, 60 35, 70 20 C80 5, 90 15, 100 30 C110 45, 120 40, 130 30 C140 20, 145 25, 150 25 M30 20 L50 35 M90 22 L110 32" />
                </svg>
                <div className="border-l border-border/20 pl-4 font-heading">
                  <p className="text-sm font-bold text-foreground">Dr. Emmanuel K. Mensah</p>
                  <p className="text-[10px] text-muted-foreground">Founder & Executive Director, GIIN</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Portrait image with grayscale to color hover transition */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full max-w-[420px] aspect-[4/5] rounded-[3rem] overflow-hidden border border-border/10 shadow-2xl group"
          >
            {/* Gradient glow frame */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/5 opacity-55 z-10 pointer-events-none group-hover:opacity-80 transition-opacity duration-700" />

            <Image
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
              alt="Dr. Emmanuel K. Mensah"
              fill
              priority
              sizes="(max-w-768px) 100vw, 420px"
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[800ms] scale-100 group-hover:scale-105"
            />

            {/* Framing Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent z-20" />

            {/* Details overlay */}
            <div className="absolute bottom-8 left-8 right-8 z-30 p-5 rounded-2xl border border-border/15 bg-background/85 backdrop-blur-xl flex flex-col gap-1">
              <span className="text-[9px] font-bold text-accent tracking-[0.25em] uppercase">Ecosystem Steward</span>
              <h3 className="text-lg font-black text-foreground font-heading">Sovereign Architecture</h3>
              <p className="text-xs text-muted-foreground">Directing technology & leadership transformation from our headquarters in Accra.</p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
