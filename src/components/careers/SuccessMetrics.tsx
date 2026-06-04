'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import * as Icons from 'lucide-react';
import { SUCCESS_METRICS } from '@/data/mockCareersData';

interface CountUpProps {
  value: number;
  suffix: string;
}

function CountUp({ value, suffix }: CountUpProps) {
  const [count, setCount] = useState<number>(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(elementRef, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = value;
    const duration = 1500; // 1.5 seconds count duration
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad formula
      const easeProgress = progress * (2 - progress);
      const currentVal = Math.floor(easeProgress * (end - start) + start);
      
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export function SuccessMetrics() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative py-24 px-4 md:px-8 bg-[#020205] overflow-hidden text-white border-t border-slate-900/60">
      {/* Background ambient lighting overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10 space-y-16">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-block px-3 py-1 rounded-full border border-blue-500/20 bg-blue-950/20 text-xs md:text-sm font-semibold uppercase tracking-wider text-blue-400">
            Institutional Impact
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading leading-tight">
            Our Global Success{' '}
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              In Numbers
            </span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            We don’t just deploy technologies; we scale human potential. Review the core metrics representing GIIN’s contribution globally.
          </p>
        </div>

        {/* Counter Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 text-center"
        >
          {SUCCESS_METRICS.map((stat, idx) => {
            const Icon = Icons[stat.icon as keyof typeof Icons] as React.ComponentType<any>;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="p-6 rounded-2xl border border-slate-800 bg-slate-900/10 hover:border-slate-700/60 backdrop-blur-md transition-all duration-300 relative group flex flex-col justify-between items-center min-h-[180px] shadow-lg hover:shadow-blue-500/5"
              >
                {/* Icon Core */}
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-black group-hover:border-blue-500 transition-all duration-500 shadow-md">
                  {Icon && <Icon size={20} />}
                </div>

                <div className="space-y-1">
                  <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm font-semibold leading-tight max-w-[120px] mx-auto uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>

                {/* Micro accent dot */}
                <div className="h-1.5 w-1.5 rounded-full bg-teal-400 opacity-20 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
