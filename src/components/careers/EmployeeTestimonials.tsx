'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageSquare, TrendingUp } from 'lucide-react';
import { MOCK_TESTIMONIALS } from '@/data/mockCareersData';
import { trackCareersEvent } from '@/hooks/useCareers';

export function EmployeeTestimonials() {
  const [index, setIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1); // 1 = right, -1 = left

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % MOCK_TESTIMONIALS.length);
    trackCareersEvent('Testimonials Clicked', { direction: 'next' });
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + MOCK_TESTIMONIALS.length) % MOCK_TESTIMONIALS.length);
    trackCareersEvent('Testimonials Clicked', { direction: 'prev' });
  };

  const current = MOCK_TESTIMONIALS[index];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' as const },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      transition: { duration: 0.4, ease: 'easeIn' as const },
    }),
  };

  return (
    <section className="relative py-24 px-4 md:px-8 bg-[#04040a] overflow-hidden text-white border-t border-slate-900/60">
      {/* Background glow overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl w-full mx-auto relative z-10 space-y-16">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-block px-3 py-1 rounded-full border border-purple-500/20 bg-purple-950/20 text-xs md:text-sm font-semibold uppercase tracking-wider text-purple-400">
            Real Stories
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading leading-tight">
            Employee{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Testimonials
            </span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Discover how global changemakers, expert engineers, and strategic strategists accelerate their growth trajectories and impact inside GIIN.
          </p>
        </div>

        {/* Carousel Area */}
        <div className="relative rounded-3xl border border-slate-800 bg-slate-900/10 backdrop-blur-xl p-6 md:p-12 shadow-2xl min-h-[460px] md:min-h-[420px] flex flex-col justify-between overflow-hidden text-left">
          {/* Quote mark visual background */}
          <div className="absolute top-6 left-6 text-[120px] font-serif leading-none text-purple-500/10 pointer-events-none">
            “
          </div>

          <div className="relative flex-1">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left Profile and Promotion Map Column */}
                <div className="lg:col-span-4 space-y-5 text-center lg:text-left flex flex-col items-center lg:items-start shrink-0">
                  <div className="relative h-24 w-24 rounded-2xl overflow-hidden border-2 border-purple-500/40 p-0.5 bg-slate-950 shadow-lg">
                    <img
                      src={current.avatar}
                      alt={current.name}
                      className="h-full w-full object-cover rounded-xl"
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg md:text-xl font-bold font-heading">{current.name}</h3>
                    <p className="text-purple-400 text-xs font-semibold tracking-wide uppercase">
                      {current.role}
                    </p>
                  </div>
                  
                  {/* Duration count badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-800 bg-slate-950/60 text-xs text-slate-400">
                    <span>Tenure: <span className="text-white font-bold">{current.yearsWithGIIN}</span></span>
                  </div>
                </div>

                {/* Right Narrative Quote & Career Milestones Column */}
                <div className="lg:col-span-8 space-y-6 text-left relative">
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed leading-relaxed font-medium">
                    {current.quote}
                  </p>

                  {/* Career pathway tracking tree inside testimonial */}
                  <div className="p-4 rounded-xl border border-white/5 bg-slate-950/40 space-y-2">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <TrendingUp size={12} className="text-blue-400" />
                      Promotion Pathway Track
                    </h4>
                    <p className="text-slate-300 text-xs font-semibold">
                      {current.promotions}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls footer */}
          <div className="pt-8 border-t border-slate-900/60 mt-8 flex items-center justify-between">
            {/* Dots */}
            <div className="flex gap-2">
              {MOCK_TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    index === i ? 'w-8 bg-purple-500' : 'w-2.5 bg-slate-800 hover:bg-slate-700'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Triggers */}
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="h-10 w-10 rounded-full border border-slate-800 hover:border-white text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors duration-300"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="h-10 w-10 rounded-full border border-slate-800 hover:border-white text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors duration-300"
                aria-label="Next Testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
