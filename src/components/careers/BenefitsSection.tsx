'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { MOCK_BENEFITS } from '@/data/mockCareersData';

export function BenefitsSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative py-24 px-4 md:px-8 bg-[#020205] overflow-hidden text-white border-t border-slate-900/60">
      {/* Background glow balls */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-purple-900/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10 space-y-16">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-block px-3 py-1 rounded-full border border-purple-500/20 bg-purple-950/20 text-xs md:text-sm font-semibold uppercase tracking-wider text-purple-400">
            Ecosystem Compensation
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading leading-tight">
            Comprehensive{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Employee Benefits
            </span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            We provide everything you need to fuel your focus, secure your resilience, level-up your intelligence, and enjoy flexible autonomy.
          </p>
        </div>

        {/* Benefits Grid Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-12 text-left"
        >
          {MOCK_BENEFITS.map((cat, catIdx) => (
            <div key={catIdx} className="space-y-6">
              {/* Category Subtitle */}
              <h3 className="text-xl font-bold font-heading border-l-2 border-purple-500 pl-3 tracking-wide">
                {cat.category}
              </h3>

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cat.items.map((item, itemIdx) => {
                  const Icon = Icons[item.icon as keyof typeof Icons] as React.ComponentType<any>;
                  return (
                    <motion.div
                      key={itemIdx}
                      variants={itemVariants}
                      whileHover={{ scale: 1.01, y: -2 }}
                      className="p-6 rounded-2xl border border-slate-800 bg-slate-900/10 hover:border-slate-700/60 hover:bg-slate-900/30 backdrop-blur-md transition-all duration-300 relative group flex gap-5"
                    >
                      {/* Left Icon Panel */}
                      <div className="inline-flex h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 items-center justify-center shrink-0 shadow-md group-hover:bg-purple-500 group-hover:text-black group-hover:border-purple-500 transition-all duration-500">
                        {Icon && <Icon size={22} />}
                      </div>

                      {/* Right Details */}
                      <div className="space-y-1.5">
                        <h4 className="text-lg font-bold font-heading group-hover:text-purple-300 transition-colors duration-300">
                          {item.title}
                        </h4>
                        <p className="text-gray-400 text-xs md:text-sm leading-relaxed leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Micro glowing line accent on left border */}
                      <div className="absolute top-4 bottom-4 left-0 w-[1.5px] bg-gradient-to-b from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
