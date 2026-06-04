'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Cpu, Compass, Network, Tv, BookOpen, Clock, Target } from 'lucide-react';
import { MOCK_CAREER_PATHS } from '@/data/mockCareersData';
import { trackCareersEvent } from '@/hooks/useCareers';

type PathCategory = 'Technology' | 'Leadership' | 'Consulting' | 'Media' | 'Education';

const ICONS = {
  Technology: Cpu,
  Leadership: Compass,
  Consulting: Network,
  Media: Tv,
  Education: BookOpen,
};

export function CareerPaths() {
  const [activeCategory, setActiveCategory] = useState<PathCategory>('Technology');

  const categories = Object.keys(MOCK_CAREER_PATHS) as PathCategory[];
  const activeNodes = MOCK_CAREER_PATHS[activeCategory];

  const handleCategorySelect = (cat: PathCategory) => {
    trackCareersEvent('Career Path Category Clicked', { category: cat });
    setActiveCategory(cat);
  };

  return (
    <section className="relative py-24 px-4 md:px-8 bg-[#020205] overflow-hidden text-white border-t border-slate-900/60">
      {/* Floating background gradient light */}
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-purple-900/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-block px-3 py-1 rounded-full border border-purple-500/20 bg-purple-950/20 text-xs md:text-sm font-semibold uppercase tracking-wider text-purple-400">
            Professional Trajectories
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading leading-tight">
            Design Your{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Growth Path
            </span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            We don’t believe in static positions. Choose a professional division and explore how we accelerate your journey from entry-level to principal roles.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {categories.map((cat) => {
            const Icon = ICONS[cat];
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-5 py-3 rounded-xl border text-sm font-semibold tracking-wide flex items-center gap-2.5 transition-all duration-300 backdrop-blur-md cursor-pointer ${
                  isActive
                    ? 'border-purple-500 bg-purple-950/30 text-white shadow-lg shadow-purple-500/10'
                    : 'border-slate-800 bg-slate-900/30 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {Icon && <Icon size={16} />}
                {cat}
              </button>
            );
          })}
        </div>

        {/* Pathway Node Nodes Visual */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch relative">
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-[68px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-purple-500/20 via-blue-500/30 to-teal-500/20 pointer-events-none z-0" />

          {activeNodes.map((node, index) => {
            const isLast = index === activeNodes.length - 1;
            return (
              <motion.div
                key={node.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group p-6 rounded-2xl border border-slate-800/80 bg-slate-900/10 hover:border-slate-700 hover:bg-slate-900/30 backdrop-blur-md transition-all duration-300 flex flex-col justify-between text-left h-full shadow-lg z-10 hover:shadow-purple-500/5"
              >
                <div className="space-y-4">
                  {/* Step Count Badge & Time */}
                  <div className="flex items-center justify-between">
                    <span className="h-8 w-8 rounded-lg bg-gradient-to-tr from-purple-500/10 to-blue-500/20 border border-purple-500/25 flex items-center justify-center font-bold text-xs text-purple-400 group-hover:bg-purple-500 group-hover:text-black group-hover:border-purple-500 transition-all duration-300">
                      0{index + 1}
                    </span>
                    <span className="inline-flex items-center gap-1 text-slate-400 text-xs font-semibold">
                      <Clock size={12} className="text-blue-400" />
                      {node.time}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold font-heading group-hover:text-purple-300 transition-colors duration-300">
                      {node.title}
                    </h3>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed leading-relaxed">
                      {node.focus}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 mt-6 text-[10px] text-slate-500 uppercase tracking-wider font-semibold flex items-center gap-2">
                  <Target size={12} className="text-teal-400" />
                  Key Milestone Stage
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
