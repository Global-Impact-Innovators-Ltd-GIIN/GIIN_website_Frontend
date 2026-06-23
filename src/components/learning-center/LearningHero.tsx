"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, BookOpen, GraduationCap, Cpu, Network } from "lucide-react";

interface LearningHeroProps {
  onExplorePaths: () => void;
  onStartLearning: () => void;
}

export function LearningHero({ onExplorePaths, onStartLearning }: LearningHeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#050816] text-white pt-24 px-6">
      {/* Background Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#2563EB]/15 blur-[120px] rounded-full pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#7C3AED]/15 blur-[150px] rounded-full pointer-events-none animate-pulse duration-[10000ms]" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 py-12">
        {/* Left Column: Copywriting & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/35 text-[#2563EB] text-[11px] font-bold uppercase tracking-[0.2em] font-sans"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
            GIIN Digital Learning Academy
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.05] font-space-grotesk"
          >
            Learn. Grow. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED]">
              Lead. Transform.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#A1A1AA] text-base md:text-xl font-sans max-w-xl leading-relaxed font-light"
          >
            The GIIN Learning Center empowers individuals, teams, and organizations through leadership development, technology education, innovation training, and transformational learning experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 w-full"
          >
            <button
              onClick={onExplorePaths}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#2563EB] hover:to-[#4F46E5] text-white px-8 py-4.5 text-sm font-bold transition-all hover:pr-10 shadow-lg shadow-[#2563EB]/20 hover:shadow-[#7C3AED]/30 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>Explore Learning Paths</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onStartLearning}
              className="px-8 py-4.5 text-sm font-bold bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl text-white transition-all active:scale-95 cursor-pointer flex items-center gap-2 backdrop-blur-md"
            >
              <span>Start Learning</span>
              <BookOpen className="w-4 h-4 text-[#A1A1AA]" />
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pt-6 border-t border-white/5 w-full max-w-lg grid grid-cols-3 gap-6"
          >
            <div>
              <div className="text-2xl font-bold font-space-grotesk text-white">25+</div>
              <div className="text-xs text-[#A1A1AA] font-sans">Flagship Courses</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-space-grotesk text-[#2563EB]">15k+</div>
              <div className="text-xs text-[#A1A1AA] font-sans">Active Learners</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-space-grotesk text-[#7C3AED]">98%</div>
              <div className="text-xs text-[#A1A1AA] font-sans">Success Rate</div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Animated Learning Ecosystem Canvas */}
        <div className="lg:col-span-5 relative flex justify-center items-center h-[400px] sm:h-[500px]">
          {/* Main Central Sphere representing Knowledge Ecosystem */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 1.5 }}
            className="relative w-64 h-64 rounded-full bg-gradient-to-tr from-[#2563EB]/40 to-[#7C3AED]/40 border border-white/10 shadow-2xl flex items-center justify-center backdrop-blur-md"
          >
            <div className="absolute inset-2 rounded-full border border-dashed border-white/15 animate-spin-slow" />
            <div className="absolute inset-8 rounded-full bg-[#050816]/80 flex items-center justify-center border border-white/5">
              <GraduationCap className="w-16 h-16 text-white animate-pulse" />
            </div>
          </motion.div>

          {/* Node 1: Leadership */}
          <motion.div
            animate={{ 
              x: [-120, -140, -120], 
              y: [-120, -100, -120] 
            }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg flex items-center gap-3 shadow-lg"
          >
            <div className="p-2 rounded-lg bg-[#2563EB]/25 text-[#2563EB]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-left font-space-grotesk text-xs">
              <div className="font-bold text-white">Leadership</div>
              <div className="text-[10px] text-[#A1A1AA]">Academy</div>
            </div>
          </motion.div>

          {/* Node 2: Technology */}
          <motion.div
            animate={{ 
              x: [120, 140, 120], 
              y: [-80, -100, -80] 
            }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
            className="absolute p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg flex items-center gap-3 shadow-lg"
          >
            <div className="p-2 rounded-lg bg-[#7C3AED]/25 text-[#7C3AED]">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="text-left font-space-grotesk text-xs">
              <div className="font-bold text-white">Technology</div>
              <div className="text-[10px] text-[#A1A1AA]">Education</div>
            </div>
          </motion.div>

          {/* Node 3: Innovation Network */}
          <motion.div
            animate={{ 
              x: [-60, -80, -60], 
              y: [120, 140, 120] 
            }}
            transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 2 }}
            className="absolute p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg flex items-center gap-3 shadow-lg"
          >
            <div className="p-2 rounded-lg bg-[#4F46E5]/25 text-[#4F46E5]">
              <Network className="w-5 h-5" />
            </div>
            <div className="text-left font-space-grotesk text-xs">
              <div className="font-bold text-white">Innovation</div>
              <div className="text-[10px] text-[#A1A1AA]">Sandbox</div>
            </div>
          </motion.div>

          {/* Connecting SVG Lines */}
          <svg className="absolute inset-0 w-full h-full -z-10 pointer-events-none" fill="none">
            <motion.path 
              d="M 120 100 Q 180 80 250 150" 
              stroke="url(#grad1)" 
              strokeWidth="1.5" 
              strokeDasharray="5,5"
              animate={{ strokeDashoffset: [0, -20] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            />
            <motion.path 
              d="M 380 120 Q 300 200 250 150" 
              stroke="url(#grad2)" 
              strokeWidth="1.5" 
              strokeDasharray="5,5"
              animate={{ strokeDashoffset: [0, 20] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            />
            <motion.path 
              d="M 180 340 Q 200 240 250 150" 
              stroke="url(#grad3)" 
              strokeWidth="1.5" 
              strokeDasharray="5,5"
              animate={{ strokeDashoffset: [0, -20] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            />
            
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}
