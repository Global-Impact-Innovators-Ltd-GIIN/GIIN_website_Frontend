'use client';

import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';

// Component imports
import { CareersHero } from '@/components/careers/CareersHero';
import { WhyJoinGIIN } from '@/components/careers/WhyJoinGIIN';
import { CultureSection } from '@/components/careers/CultureSection';
import { JobListings } from '@/components/careers/JobListings';
import { CareerPaths } from '@/components/careers/CareerPaths';
import { RecruitmentProcess } from '@/components/careers/RecruitmentProcess';
import { BenefitsSection } from '@/components/careers/BenefitsSection';
import { TalentCommunity } from '@/components/careers/TalentCommunity';
import { FAQSection } from '@/components/careers/FAQSection';
import { EmployeeTestimonials } from '@/components/careers/EmployeeTestimonials';
import { SuccessMetrics } from '@/components/careers/SuccessMetrics';
import { CareersCTA } from '@/components/careers/CareersCTA';

// Modal and Form structures
import { ApplicationForm } from '@/components/careers/ApplicationForm';
import { Job } from '@/interfaces/careers';

export default function CareersPage() {
  const [activeApplyJob, setActiveApplyJob] = useState<Job | null>(null);
  const [showApplyModal, setShowApplyModal] = useState<boolean>(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState<boolean>(false);

  // Scroll target element IDs
  const jobsSectionRef = useRef<HTMLDivElement>(null);
  const talentSectionRef = useRef<HTMLDivElement>(null);

  const handleScrollToJobs = () => {
    if (jobsSectionRef.current) {
      jobsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToTalent = () => {
    if (talentSectionRef.current) {
      talentSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      document.getElementById('talent-network')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleTriggerApply = (job: Job) => {
    setActiveApplyJob(job);
    setShowApplyModal(true);
  };

  const handleCloseApply = () => {
    setShowApplyModal(false);
    setActiveApplyJob(null);
  };

  const handleApplySuccess = () => {
    setShowApplyModal(false);
    setShowSuccessOverlay(true);
    setTimeout(() => {
      setShowSuccessOverlay(false);
      setActiveApplyJob(null);
    }, 4500); // Overlay displays for 4.5 seconds
  };

  return (
    <main className="min-h-screen bg-[#020205] text-white overflow-hidden relative font-sans">
      {/* Immersive Header SEO Structure */}
      <title>GIIN Careers | Build the Future with Global Impact Innovation Network</title>
      <meta name="description" content="Join a world-class team of technologists, strategists, designers, and educators to transform communities through digital innovation. Explore careers at GIIN." />

      {/* Hero section */}
      <CareersHero
        onScrollToPositions={handleScrollToJobs}
        onOpenTalentNetwork={handleScrollToTalent}
      />

      {/* Success statistics metrics */}
      <SuccessMetrics />

      {/* Why Join GIIN value card grid */}
      <WhyJoinGIIN />

      {/* Storytelling culture spotlights */}
      <CultureSection />

      {/* Growth Trajectory Pathways */}
      <CareerPaths />

      {/* Dynamic Job Opportunities board */}
      <div id="open-positions" ref={jobsSectionRef} className="scroll-mt-20">
        <JobListings onApplyClick={handleTriggerApply} />
      </div>

      {/* Recruitment stages process */}
      <RecruitmentProcess />

      {/* Benefits structured cards */}
      <BenefitsSection />

      {/* Accordion FAQ component */}
      <FAQSection />

      {/* Employees testimonials slider */}
      <EmployeeTestimonials />

      {/* Future network talent community form */}
      <div id="talent-network" ref={talentSectionRef} className="scroll-mt-20">
        <TalentCommunity />
      </div>

      {/* Final Action CTA */}
      <CareersCTA
        onScrollToPositions={handleScrollToJobs}
        onOpenTalentNetwork={handleScrollToTalent}
      />

      {/* Multi-step application modal popup */}
      <AnimatePresence>
        {showApplyModal && activeApplyJob && (
          <ApplicationForm
            job={activeApplyJob}
            onClose={handleCloseApply}
            onSubmitSuccess={handleApplySuccess}
          />
        )}
      </AnimatePresence>

      {/* Submission Success overlay */}
      <AnimatePresence>
        {showSuccessOverlay && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-md w-full p-8 md:p-10 rounded-3xl border border-emerald-500/20 bg-slate-950 text-center space-y-6 shadow-2xl"
            >
              <div className="inline-flex h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 items-center justify-center shadow-lg shadow-emerald-500/5 animate-pulse">
                <Check size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold font-heading text-white">Application Dispatched</h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  Your application has been logged inside GIIN's ATS database successfully. Our curators will review details and trigger correspondence within 5 business days. Keep an eye on your inbox!
                </p>
              </div>
              <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 4.5, ease: 'linear' }}
                  className="h-full bg-emerald-500 rounded-full absolute top-0 left-0"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
