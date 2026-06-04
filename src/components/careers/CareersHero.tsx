'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, Cpu, ArrowDown } from 'lucide-react';
import { trackCareersEvent } from '@/hooks/useCareers';

interface CareersHeroProps {
  onScrollToPositions: () => void;
  onOpenTalentNetwork: () => void;
}

export function CareersHero({ onScrollToPositions, onOpenTalentNetwork }: CareersHeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const glowVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.3, 0.45, 0.3],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };

  const handlePositionsClick = () => {
    trackCareersEvent('CTA Clicks', { destination: 'open_positions', location: 'hero' });
    onScrollToPositions();
  };

  const handleTalentClick = () => {
    trackCareersEvent('CTA Clicks', { destination: 'talent_network', location: 'hero' });
    onOpenTalentNetwork();
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#020205] text-white py-16 px-4 md:px-8">
      {/* Premium Gradient Lights / Soft Glow Effects */}
      <motion.div
        variants={glowVariants}
        animate="animate"
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-purple-600/10 blur-[100px] md:blur-[160px] pointer-events-none"
      />
      <motion.div
        variants={glowVariants}
        animate="animate"
        className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-blue-600/10 blur-[90px] md:blur-[150px] pointer-events-none"
      />

      {/* Floating Particles Simulation */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-40">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20"
            style={{
              width: Math.random() * 8 + 4,
              height: Math.random() * 8 + 4,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Hero Left Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 text-left space-y-8"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/20 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-xs md:text-sm font-semibold tracking-wider uppercase bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Global Impact Innovation Network
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-heading leading-tight">
              Build the Future <br />
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
                With GIIN
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-normal max-w-2xl leading-relaxed">
              Join an elite collective dedicated to transforming communities, businesses, and nations through digital innovation, deep technology, transformational strategy, and human-centric design. We don’t just hire employees; we build innovators and changemakers.
            </p>
          </motion.div>

          {/* Call to Actions */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={handlePositionsClick}
              className="px-8 py-4 rounded-xl font-semibold tracking-wide text-black bg-gradient-to-r from-purple-400 via-purple-500 to-blue-500 hover:from-purple-300 hover:to-blue-400 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-purple-500/20 cursor-pointer flex items-center justify-center gap-2"
            >
              View Open Positions
              <ArrowDown size={18} />
            </button>
            <button
              onClick={handleTalentClick}
              className="px-8 py-4 rounded-xl font-semibold tracking-wide border border-slate-700 hover:border-purple-500/50 bg-slate-900/60 backdrop-blur-md hover:bg-slate-900 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex items-center justify-center"
            >
              Join Our Talent Network
            </button>
          </motion.div>

          {/* Stats Badges */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800/80 max-w-lg">
            <div className="space-y-1">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">20+</h3>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Countries Reached</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">100+</h3>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Impact Designs</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">500+</h3>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Professionals Trained</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Right Visual Column - Workforce Visualization Representation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="lg:col-span-5 relative w-full aspect-square md:max-w-[480px] lg:max-w-none mx-auto flex items-center justify-center perspective-[1000px]"
        >
          {/* Outer Rotating Circles (Workforce & Ecosystem Illustration) */}
          <div className="absolute w-[80%] h-[80%] rounded-full border border-purple-500/20 animate-spin-slow pointer-events-none flex items-center justify-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-purple-500 blur-[2px]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 blur-[2px]" />
          </div>
          <div className="absolute w-[60%] h-[60%] rounded-full border border-blue-500/20 animate-[spin_12s_linear_infinite_reverse] pointer-events-none flex items-center justify-center">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-teal-400 blur-[1px]" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-purple-400 blur-[1px]" />
          </div>

          {/* Floating Technology Glassmorphic Core */}
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative w-[75%] h-[75%] rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl p-8 shadow-2xl flex flex-col justify-between overflow-hidden group"
          >
            {/* Soft inner glow */}
            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-tr from-purple-500/10 via-transparent to-blue-500/10 rounded-full pointer-events-none group-hover:scale-125 transition-transform duration-700" />
            
            <div className="flex items-center justify-between">
              <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 shadow-md">
                <Cpu size={24} />
              </div>
              <div className="h-8 w-18 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-semibold">
                LIVE POOL
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <p className="text-slate-400 text-xs font-medium tracking-wide uppercase">Core Ecosystem Engine</p>
                <h4 className="text-xl md:text-2xl font-bold tracking-tight font-heading bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Impact Sprints <span className="text-purple-400">#04</span>
                </h4>
              </div>

              {/* Progress bars inside card */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Talent Intake Target</span>
                  <span className="font-semibold text-purple-400">92%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 border-t border-white/5 pt-4 text-xs text-slate-400">
              <div className="flex -space-x-2">
                <div className="h-7 w-7 rounded-full border border-slate-900 bg-purple-600 flex items-center justify-center font-bold text-[10px] text-white">JD</div>
                <div className="h-7 w-7 rounded-full border border-slate-900 bg-blue-600 flex items-center justify-center font-bold text-[10px] text-white">MV</div>
                <div className="h-7 w-7 rounded-full border border-slate-900 bg-emerald-600 flex items-center justify-center font-bold text-[10px] text-white">AM</div>
              </div>
              <span>Join 500+ Experts</span>
            </div>
          </motion.div>

          {/* Floating Action Indicators */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -top-4 right-2 p-3.5 rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-md shadow-lg flex items-center gap-3"
          >
            <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
              <Briefcase size={16} />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Latest Role</p>
              <p className="text-xs font-semibold text-white">UI Architect</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute -bottom-4 left-2 p-3.5 rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-md shadow-lg flex items-center gap-3"
          >
            <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
              <Users size={16} />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Talent Flow</p>
              <p className="text-xs font-semibold text-white">Global Cohorts Active</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
