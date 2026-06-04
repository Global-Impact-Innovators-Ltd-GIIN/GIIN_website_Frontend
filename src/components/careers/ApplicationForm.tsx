'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, ArrowLeft, FileText, AlertCircle } from 'lucide-react';
import { Job } from '@/interfaces/careers';
import { ApplicationService } from '@/services/careers';
import { trackCareersEvent } from '@/hooks/useCareers';
import { ExperienceLevel } from '@/types/careers';

interface ApplicationFormProps {
  job: Job;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

type StepIndex = 1 | 2 | 3;

export function ApplicationForm({ job, onClose, onSubmitSuccess }: ApplicationFormProps) {
  const [step, setStep] = useState<StepIndex>(1);

  // Form Fields State
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('Mid-level');
  const [portfolioUrl, setPortfolioUrl] = useState<string>('');
  const [linkedinUrl, setLinkedinUrl] = useState<string>('');
  const [resumeName, setResumeName] = useState<string | null>(null);

  const [whyJoin, setWhyJoin] = useState<string>('');
  const [skillsSummary, setSkillsSummary] = useState<string>('');
  const [achievements, setAchievements] = useState<string>('');

  // UI state
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const resumeInputRef = useRef<HTMLInputElement>(null);

  const handleResumeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg('Resume file exceeds the 5MB size limit.');
        setResumeName(null);
      } else {
        setErrorMsg(null);
        setResumeName(file.name);
      }
    }
  };

  const handleNextStep = () => {
    setErrorMsg(null);
    if (step === 1) {
      if (!firstName.trim() || !lastName.trim() || !email.trim()) {
        setErrorMsg('First Name, Last Name, and Email are strictly required fields.');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrorMsg('Please specify a valid email address.');
        return;
      }
      trackCareersEvent('Application Starts', { jobId: job.id, step: 1 });
      setStep(2);
    } else if (step === 2) {
      if (!resumeName) {
        setErrorMsg('Please attach a valid resume profile before moving forward.');
        return;
      }
      if (portfolioUrl && !portfolioUrl.includes('://')) {
        setErrorMsg('Portfolio URL must contain a valid HTTP protocol (https://...).');
        return;
      }
      if (linkedinUrl && !linkedinUrl.includes('linkedin.com/')) {
        setErrorMsg('LinkedIn URL must contain a valid domain (linkedin.com/in/...).');
        return;
      }
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    setErrorMsg(null);
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    if (!whyJoin.trim() || !skillsSummary.trim() || !achievements.trim()) {
      setErrorMsg('All vision and professional achievement questions must be answered.');
      setSubmitting(false);
      return;
    }

    try {
      await ApplicationService.submitApplication({
        jobId: job.id,
        jobTitle: job.title,
        candidate: {
          id: `cand-${Math.random().toString(36).substr(2, 9)}`,
          firstName,
          lastName,
          email,
          phone: phone || undefined,
          linkedinUrl: linkedinUrl || undefined,
          portfolioUrl: portfolioUrl || undefined,
          experienceLevel,
          skills: skillsSummary.split(',').map(s => s.trim()).filter(Boolean),
        },
        resumeUrl: resumeName || undefined,
        customAnswers: {
          whyJoin,
          achievements,
          skillsSummary,
        },
      });

      trackCareersEvent('Application Completions', { jobId: job.id, jobTitle: job.title });
      onSubmitSuccess();
    } catch (err: any) {
      setErrorMsg(err.message || 'Submission failed. Please adjust fields.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      {/* Dimmer backdrop */}
      <div className="absolute inset-0 cursor-default" onClick={onClose} />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative z-10 w-full max-w-2xl rounded-3xl border border-slate-800 bg-[#06060c] text-white p-6 md:p-8 shadow-2xl flex flex-col justify-between overflow-y-auto max-h-[92vh] text-left"
      >
        {/* Form Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-900/60">
          <div className="space-y-1">
            <h3 className="text-xl md:text-2xl font-bold font-heading">Complete Application</h3>
            <p className="text-xs text-purple-400 font-semibold tracking-wide">
              Applying for: <span className="text-white">{job.title}</span> ({job.department})
            </p>
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full border border-slate-800 hover:border-white text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors duration-300"
          >
            <X size={18} />
          </button>
        </div>

        {/* Multi-step progress tracker */}
        <div className="flex items-center justify-between gap-2 py-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div
                className={`h-6 w-6 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${
                  step === s
                    ? 'bg-purple-500 text-black shadow-md'
                    : step > s
                    ? 'bg-emerald-500 text-black'
                    : 'bg-slate-900 border border-slate-800 text-slate-500'
                }`}
              >
                {step > s ? <Check size={10} /> : s}
              </div>
              <div
                className={`h-1 w-full rounded-full ${
                  step > s ? 'bg-emerald-500' : 'bg-slate-900'
                }`}
              />
            </div>
          ))}
          <span className="text-xs text-slate-500 shrink-0 uppercase tracking-widest font-bold">
            Step {step} of 3
          </span>
        </div>

        {/* Input panels */}
        <form onSubmit={handleSubmit} className="space-y-6 pt-4 flex-1">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4 text-left"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="app-first" className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                      First Name *
                    </label>
                    <input
                      id="app-first"
                      type="text"
                      required
                      placeholder="e.g. John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 focus:border-purple-500/60 bg-slate-950/60 text-sm outline-none placeholder-slate-650"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="app-last" className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                      Last Name *
                    </label>
                    <input
                      id="app-last"
                      type="text"
                      required
                      placeholder="e.g. Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 focus:border-purple-500/60 bg-slate-950/60 text-sm outline-none placeholder-slate-650"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="app-email" className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                      Email Address *
                    </label>
                    <input
                      id="app-email"
                      type="email"
                      required
                      placeholder="e.g. john.doe@venture.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 focus:border-purple-500/60 bg-slate-950/60 text-sm outline-none placeholder-slate-650"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="app-phone" className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                      Phone Number
                    </label>
                    <input
                      id="app-phone"
                      type="tel"
                      placeholder="e.g. +1 555-0199"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 focus:border-purple-500/60 bg-slate-950/60 text-sm outline-none placeholder-slate-650"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4 text-left"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="app-experience" className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                      Experience Level
                    </label>
                    <select
                      id="app-experience"
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/60 text-sm outline-none cursor-pointer focus:border-purple-500/60"
                    >
                      <option value="Entry-level">Entry-level</option>
                      <option value="Mid-level">Mid-level</option>
                      <option value="Senior">Senior</option>
                      <option value="Lead">Lead</option>
                      <option value="Executive">Executive</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="app-linkedin" className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                      LinkedIn URL
                    </label>
                    <input
                      id="app-linkedin"
                      type="url"
                      placeholder="linkedin.com/in/username"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 focus:border-purple-500/60 bg-slate-950/60 text-sm outline-none placeholder-slate-650"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="app-portfolio" className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                    Portfolio / Website URL
                  </label>
                  <input
                    id="app-portfolio"
                    type="url"
                    placeholder="https://github.com or personal domain"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 focus:border-purple-500/60 bg-slate-950/60 text-sm outline-none placeholder-slate-650"
                  />
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block">
                    Resume Upload *
                  </span>
                  <input
                    type="file"
                    ref={resumeInputRef}
                    onChange={handleResumeSelect}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                  <div
                    onClick={() => resumeInputRef.current?.click()}
                    className="w-full p-6 rounded-xl border border-dashed border-slate-800 hover:border-purple-500/60 bg-slate-950/40 hover:bg-slate-950/80 text-center transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-2"
                  >
                    <FileText size={24} className="text-slate-500" />
                    <span className="text-xs text-slate-400 font-semibold">
                      {resumeName ? `Attached: ${resumeName}` : 'Upload PDF / Word profile (Max 5MB)'}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4 text-left"
              >
                <div className="space-y-1.5">
                  <label htmlFor="app-why" className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                    Why do you want to build the future with GIIN? *
                  </label>
                  <textarea
                    id="app-why"
                    required
                    rows={3}
                    placeholder="Express your vision, aspirations, and dedication to social impact..."
                    value={whyJoin}
                    onChange={(e) => setWhyJoin(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 focus:border-purple-500/60 bg-slate-950/60 text-sm outline-none placeholder-slate-650 resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="app-skills" className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                    List your core skills * (Comma separated)
                  </label>
                  <input
                    id="app-skills"
                    type="text"
                    required
                    placeholder="e.g. Next.js, Framer Motion, TypeScript, Leadership, public speaking"
                    value={skillsSummary}
                    onChange={(e) => setSkillsSummary(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 focus:border-purple-500/60 bg-slate-950/60 text-sm outline-none placeholder-slate-650"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="app-achievements" className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                    Describe 1-2 major professional achievements *
                  </label>
                  <textarea
                    id="app-achievements"
                    required
                    rows={3}
                    placeholder="Describe direct metrics, shipped architectures, or training programs you directed..."
                    value={achievements}
                    onChange={(e) => setAchievements(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 focus:border-purple-500/60 bg-slate-950/60 text-sm outline-none placeholder-slate-650 resize-none"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Errors message display */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-950/20 text-red-400 text-xs font-semibold flex items-center gap-2">
              <AlertCircle size={14} className="shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Action triggers */}
          <div className="pt-6 border-t border-slate-900/60 mt-6 flex items-center justify-between gap-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-6 py-3.5 rounded-xl border border-slate-800 bg-slate-950/40 text-slate-300 hover:text-white font-semibold text-sm transition-colors duration-300 cursor-pointer flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-3.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-black font-semibold text-sm transition-all duration-300 cursor-pointer flex items-center gap-2"
              >
                Continue
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-black font-semibold text-sm transition-all duration-300 shadow-md cursor-pointer flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="h-4 w-4 border-t-2 border-r-2 border-black rounded-full animate-spin" />
                    Submitting dossier...
                  </>
                ) : (
                  <>
                    Submit Application
                    <Check size={16} />
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}
