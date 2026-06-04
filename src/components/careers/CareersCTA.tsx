'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Users } from 'lucide-react';
import { trackCareersEvent } from '@/hooks/useCareers';

interface CareersCTAProps {
  onScrollToPositions: () => void;
  onOpenTalentNetwork: () => void;
}

export function CareersCTA({ onScrollToPositions, onOpenTalentNetwork }: CareersCTAProps) {
  
  const handlePositionsClick = () => {
    trackCareersEvent('CTA Clicks', { destination: 'open_positions', location: 'careers_cta' });
    onScrollToPositions();
  };

  const handleTalentClick = () => {
    trackCareersEvent('CTA Clicks', { destination: 'talent_network', location: 'careers_cta' });
    onOpenTalentNetwork();
  };

  const handleContactClick = () => {
    trackCareersEvent('CTA Clicks', { destination: 'contact_recruitment', location: 'careers_cta' });
    if (typeof window !== 'undefined') {
      window.location.href = 'mailto:recruitment@giin.org?subject=GIIN Careers Enquiry';
    }
  };

  return (
    <section className="relative py-24 px-4 md:px-8 bg-[#04040a] overflow-hidden text-white border-t border-slate-900/60">
      {/* Immersive Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-purple-600/10 to-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl w-full mx-auto relative z-10">
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950 p-8 md:p-16 text-center space-y-8 relative overflow-hidden shadow-2xl">
          {/* Inner details glow lines */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-purple-500/20 via-blue-500/30 to-teal-500/10 pointer-events-none" />

          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading leading-tight">
              Ready to{' '}
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
                Build the Future?
              </span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
              Join an elite collective designed to shape lives, build ecosystems, and nurture leaders. Explore open slots or synchronize with our team.
            </p>
          </div>

          {/* Action triggers */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-xl mx-auto">
            {/* View positions */}
            <button
              onClick={handlePositionsClick}
              className="w-full sm:flex-1 py-4 rounded-xl font-semibold tracking-wide text-black bg-gradient-to-r from-purple-400 to-blue-500 hover:from-purple-300 hover:to-blue-400 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-purple-500/15 cursor-pointer flex items-center justify-center gap-2"
            >
              Apply Today
              <ArrowRight size={16} />
            </button>

            {/* Join network */}
            <button
              onClick={handleTalentClick}
              className="w-full sm:flex-1 py-4 rounded-xl font-semibold tracking-wide border border-slate-800 hover:border-purple-500/50 bg-slate-950/60 backdrop-blur-md hover:bg-slate-950 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex items-center justify-center gap-2"
            >
              <Users size={16} className="text-purple-400" />
              Join Talent Network
            </button>
          </div>

          <div className="pt-6 border-t border-white/5 max-w-sm mx-auto flex items-center justify-center">
            <button
              onClick={handleContactClick}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              <Mail size={14} className="text-blue-400" />
              Contact Recruitment Team
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
