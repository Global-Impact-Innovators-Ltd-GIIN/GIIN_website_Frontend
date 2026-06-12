'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckSquare, Sparkles, CheckCircle2 } from 'lucide-react';
import { MOCK_RECRUITMENT_PROCESS } from '@/data/mockCareersData';
import { trackCareersEvent } from '@/hooks/useCareers';

export function RecruitmentProcess() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleStepClick = (index: number) => {
    trackCareersEvent('Recruitment Stage Selected', { stageIndex: index, stageName: MOCK_RECRUITMENT_PROCESS[index].name });
    setActiveStep(index);
  };

  const current = MOCK_RECRUITMENT_PROCESS[activeStep];

  return (
    <section className="relative py-24 px-4 md:px-8 bg-[#04040a] overflow-hidden text-white border-t border-slate-900/60">
      {/* Background soft glow bubble */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-blue-900/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10 space-y-16">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-block px-3 py-1 rounded-full border border-blue-500/20 bg-blue-950/20 text-xs md:text-sm font-semibold uppercase tracking-wider text-blue-400">
            Candidate Growth Process
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading leading-tight">
            Our Recruitment{' '}
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Roadmap
            </span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            We value transparency. Click through our interactive steps to know exactly what to expect from submission to your first onboarding sprint.
          </p>
        </div>

        {/* Timeline representation nodes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
          {/* Left Navigation Milestone Nodes */}
          <div className="lg:col-span-5 relative space-y-4">
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-purple-500/20 via-blue-500/30 to-teal-500/10 pointer-events-none z-0" />
            
            {MOCK_RECRUITMENT_PROCESS.map((stage, index) => {
              const isActive = index === activeStep;
              return (
                <button
                  key={stage.id}
                  onClick={() => handleStepClick(index)}
                  className={`w-full relative z-10 p-4 rounded-xl border text-left transition-all duration-300 backdrop-blur-md flex items-center gap-4 cursor-pointer ${
                    isActive
                      ? 'border-purple-500 bg-purple-950/20 shadow-md shadow-purple-500/10'
                      : 'border-slate-800 bg-slate-900/10 hover:border-slate-700 hover:bg-slate-900/30'
                  }`}
                >
                  {/* Circle Step Number */}
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all duration-500 ${
                      isActive
                        ? 'bg-purple-500 text-black scale-110 shadow-md'
                        : 'bg-slate-950 border border-slate-800 text-slate-500'
                    }`}
                  >
                    0{index + 1}
                  </div>
                  <div>
                    <h3 className={`text-sm md:text-base font-bold font-heading transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-400'}`}>
                      {stage.name}
                    </h3>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                      {stage.estimatedDuration}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Details Panel Box */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="p-6 md:p-10 rounded-3xl border border-slate-850 bg-slate-950/60 backdrop-blur-xl shadow-2xl space-y-8 relative min-h-[380px] overflow-hidden"
              >
                {/* Decorative glows inside details box */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-tr from-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-4 border-b border-slate-900/60 pb-6">
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Active Phase Detail</span>
                  <h3 className="text-2xl font-bold font-heading">{current.name}</h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-950/15 text-xs text-blue-400">
                    <Clock size={12} />
                    <span>Estimated: <span className="font-bold">{current.estimatedDuration}</span></span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles size={12} className="text-purple-400" />
                    Overview & Target
                  </h4>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    {current.description}
                  </p>
                </div>

                {/* Candidate expectations list */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <CheckSquare size={12} className="text-blue-400" />
                    Requirements & Preparation
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {current.requirements.map((req, idx) => (
                      <li key={idx} className="flex gap-2 text-xs md:text-sm text-gray-400">
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
