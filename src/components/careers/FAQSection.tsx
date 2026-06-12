'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { MOCK_FAQS } from '@/data/mockCareersData';
import { trackCareersEvent } from '@/hooks/useCareers';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    const isOpening = openIndex !== index;
    trackCareersEvent('FAQ Accordion Toggled', { faqIndex: index, action: isOpening ? 'open' : 'close' });
    setOpenIndex(isOpening ? index : null);
  };

  return (
    <section className="relative py-24 px-4 md:px-8 bg-[#020205] overflow-hidden text-white border-t border-slate-900/60">
      {/* Background ambient bubble */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-purple-900/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto relative z-10 space-y-16">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-block px-3 py-1 rounded-full border border-purple-500/20 bg-purple-950/20 text-xs md:text-sm font-semibold uppercase tracking-wider text-purple-400">
            Resource Base
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading leading-tight">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Everything you need to know about our recruitment channels, continuous training stipends, remote flexibility, and internship structures.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 text-left">
          {MOCK_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/10 hover:border-slate-700/60 transition-all duration-300 overflow-hidden shadow-md"
              >
                {/* Accordion Trigger (Keyboard Navigable) */}
                <button
                  type="button"
                  id={`faq-trigger-${idx}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-content-${idx}`}
                  onClick={() => handleToggle(idx)}
                  className="w-full p-6 md:p-7 flex items-center justify-between gap-4 font-semibold text-sm md:text-base cursor-pointer focus:outline-none focus:ring-1 focus:ring-purple-500 rounded-2xl"
                >
                  <div className="flex items-center gap-3.5">
                    <HelpCircle size={18} className="text-purple-400 shrink-0" />
                    <span className="text-slate-100 hover:text-white transition-colors duration-300">
                      {faq.question}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp size={16} className="text-purple-400 shrink-0" />
                  ) : (
                    <ChevronDown size={16} className="text-slate-500 shrink-0" />
                  )}
                </button>

                {/* Accordion Expandable panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-content-${idx}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 md:px-7 md:pb-7 text-xs md:text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
