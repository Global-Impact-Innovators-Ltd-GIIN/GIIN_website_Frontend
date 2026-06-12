'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

interface ValueProp {
  icon: keyof typeof Icons;
  title: string;
  description: string;
  color: string;
}

const VALUES: ValueProp[] = [
  {
    icon: 'Cpu',
    title: 'Innovation-Driven Culture',
    description: 'We build at the bleeding edge. Experiment with advanced AI nodes, high-fidelity user frameworks, and decentralized infrastructures that disrupt traditional ecosystems.',
    color: 'from-purple-500/20 to-blue-500/5 border-purple-500/20 hover:border-purple-500/50',
  },
  {
    icon: 'TrendingUp',
    title: 'Leadership Development',
    description: 'We don’t manage people; we accelerate leaders. Build strategic vision, direct key regional cells, and present directly to governments and institutional partners.',
    color: 'from-blue-500/20 to-cyan-500/5 border-blue-500/20 hover:border-blue-500/50',
  },
  {
    icon: 'Award',
    title: 'Career Advancement',
    description: 'Accelerated, objective mobility channels. We track outcome metrics and empower you to pivot or scale your career across technology, consulting, design, or research tracks.',
    color: 'from-purple-500/20 to-pink-500/5 border-pink-500/20 hover:border-pink-500/50',
  },
  {
    icon: 'Globe',
    title: 'Flexible Work Environment',
    description: 'Distributed-first design that respects your personal cadence. Choose full remote or hybrid structures. High-end hardware setup and remote stipends included.',
    color: 'from-emerald-500/20 to-teal-500/5 border-emerald-500/20 hover:border-emerald-500/50',
  },
  {
    icon: 'BookOpen',
    title: 'Learning & Development',
    description: 'We fuel your intelligence. Enjoy a personal $3,500 annual training allowance, weekly expert knowledge sharing sessions, and direct mentorship from industry authorities.',
    color: 'from-amber-500/20 to-orange-500/5 border-amber-500/20 hover:border-amber-500/50',
  },
  {
    icon: 'Heart',
    title: 'Purpose-Driven Work',
    description: 'Align your coding, strategy, or writing with systemic change. Every initiative we launch targets social equity, sustainable micro-finance, and digital training models.',
    color: 'from-rose-500/20 to-purple-500/5 border-rose-500/20 hover:border-rose-500/50',
  },
];

export function WhyJoinGIIN() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative py-24 px-4 md:px-8 bg-[#04040a] overflow-hidden text-white">
      {/* Background radial soft light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-3 py-1 rounded-full border border-purple-500/20 bg-purple-950/20 text-xs md:text-sm font-semibold uppercase tracking-wider text-purple-400"
          >
            The GIIN Advantage
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading leading-tight"
          >
            Why Innovators{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Choose GIIN
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg leading-relaxed"
          >
            We curate a premium environment where top strategic minds, technology developers, and creative visionaries thrive.
          </motion.p>
        </div>

        {/* Responsive Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {VALUES.map((val, idx) => {
            const IconComponent = Icons[val.icon] as React.ComponentType<any>;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`relative group p-8 rounded-2xl border bg-gradient-to-br ${val.color} backdrop-blur-md transition-all duration-300 shadow-xl overflow-hidden`}
              >
                {/* Micro-glow hovering lighting */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-500/5 to-blue-500/5 transition-opacity duration-500 pointer-events-none" />

                <div className="space-y-6">
                  {/* Icon Frame */}
                  <div className="inline-flex h-12 w-12 rounded-xl bg-white/5 border border-white/10 items-center justify-center text-purple-400 group-hover:text-white group-hover:bg-gradient-to-tr group-hover:from-purple-500 group-hover:to-blue-500 transition-all duration-500 shadow-md">
                    {IconComponent && <IconComponent size={24} />}
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold font-heading group-hover:text-purple-300 transition-colors duration-300">
                      {val.title}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {val.description}
                    </p>
                  </div>
                </div>

                {/* Bottom line accent */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
