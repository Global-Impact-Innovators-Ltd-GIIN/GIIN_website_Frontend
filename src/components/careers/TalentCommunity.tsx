'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check, AlertCircle, FileText, Send } from 'lucide-react';
import { TalentNetworkService } from '@/services/careers';
import { trackCareersEvent } from '@/hooks/useCareers';
import { JobDepartment } from '@/types/careers';

export function TalentCommunity() {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [areaOfInterest, setAreaOfInterest] = useState<JobDepartment>('Technology');
  const [linkedinUrl, setLinkedinUrl] = useState<string>('');
  const [resumeName, setResumeName] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // States
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg('File size exceeds the 5MB limit.');
        setResumeName(null);
      } else {
        setErrorMsg(null);
        setResumeName(file.name);
      }
    }
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    // Basic Client Validations
    if (!fullName.trim() || !email.trim()) {
      setErrorMsg('Full Name and Email Address are strictly required.');
      setSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please submit a valid email address.');
      setSubmitting(false);
      return;
    }

    if (linkedinUrl && !linkedinUrl.includes('linkedin.com/')) {
      setErrorMsg('LinkedIn URL must contain a valid domain (linkedin.com/in/...).');
      setSubmitting(false);
      return;
    }

    try {
      trackCareersEvent('Talent Network Submission Started', { areaOfInterest });
      await TalentNetworkService.joinTalentNetwork({
        fullName,
        email,
        areaOfInterest,
        linkedinUrl: linkedinUrl || undefined,
        resumeUrl: resumeName || undefined,
      });

      trackCareersEvent('Talent Network Signups', { areaOfInterest });
      setSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Verification failed. Try adjusting input fields.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative py-24 px-4 md:px-8 bg-[#04040a] overflow-hidden text-white border-t border-slate-900/60">
      {/* Glow ambient background lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center text-left">
        {/* Left narrative details */}
        <div className="md:col-span-5 space-y-6">
          <div className="inline-block px-3 py-1 rounded-full border border-blue-500/20 bg-blue-950/20 text-xs font-semibold uppercase tracking-wider text-blue-400">
            Talent Community
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading leading-tight">
            Join Our <br />
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Talent Network
            </span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Don’t see an open role that matches your specific expertise today? Join our private talent database. We routinely review the pool for upcoming strategic initiatives and ecosystem expansions.
          </p>

          <div className="space-y-4 pt-2 text-xs md:text-sm text-slate-400">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Check size={12} />
              </div>
              <span>Priority access to unlisted roles</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Check size={12} />
              </div>
              <span>Periodic tech & design newsletters</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Check size={12} />
              </div>
              <span>Exclusive invites to summits & sprints</span>
            </div>
          </div>
        </div>

        {/* Right Form Container Card */}
        <div className="md:col-span-7 rounded-3xl border border-slate-800 bg-slate-900/10 hover:border-slate-700/60 backdrop-blur-md p-6 md:p-8 shadow-2xl transition-colors duration-350">
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                {/* Full name field */}
                <div className="space-y-1.5">
                  <label htmlFor="talent-name" className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                    Full Name *
                  </label>
                  <input
                    id="talent-name"
                    type="text"
                    required
                    placeholder="e.g. Marcus Vance"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 focus:border-blue-500/60 bg-slate-950/60 text-sm outline-none placeholder-slate-600 transition-colors duration-300"
                  />
                </div>

                {/* Email address field */}
                <div className="space-y-1.5">
                  <label htmlFor="talent-email" className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                    Email Address *
                  </label>
                  <input
                    id="talent-email"
                    type="email"
                    required
                    placeholder="e.g. marcus@venture.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 focus:border-blue-500/60 bg-slate-950/60 text-sm outline-none placeholder-slate-600 transition-colors duration-300"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Area of Interest Selector */}
                  <div className="space-y-1.5">
                    <label htmlFor="talent-dept" className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                      Area of Interest
                    </label>
                    <select
                      id="talent-dept"
                      value={areaOfInterest}
                      onChange={(e) => setAreaOfInterest(e.target.value as JobDepartment)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/60 text-sm outline-none cursor-pointer focus:border-blue-500/60 transition-colors duration-300"
                    >
                      <option value="Technology">Technology</option>
                      <option value="Leadership">Leadership</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Media">Media</option>
                      <option value="Education">Education</option>
                    </select>
                  </div>

                  {/* LinkedIn URL field */}
                  <div className="space-y-1.5">
                    <label htmlFor="talent-linkedin" className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                      LinkedIn Profile URL
                    </label>
                    <input
                      id="talent-linkedin"
                      type="url"
                      placeholder="linkedin.com/in/username"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 focus:border-blue-500/60 bg-slate-950/60 text-sm outline-none placeholder-slate-600 transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Resume upload panel placeholder */}
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block">
                    Resume / Portfolio Profile
                  </span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                  <div
                    onClick={handleTriggerUpload}
                    className="w-full p-4 rounded-xl border border-dashed border-slate-800 hover:border-blue-500/65 bg-slate-950/40 hover:bg-slate-950/80 text-center transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-2"
                  >
                    <FileText size={20} className="text-slate-500 group-hover:text-blue-400" />
                    <span className="text-xs text-slate-400 font-medium">
                      {resumeName ? `Attached: ${resumeName}` : 'Upload PDF (Maximum file size 5MB)'}
                    </span>
                  </div>
                </div>

                {/* Error Notifications */}
                {errorMsg && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="p-3.5 rounded-xl border border-red-500/30 bg-red-950/20 text-red-400 text-xs font-semibold flex items-center gap-2"
                  >
                    <AlertCircle size={14} className="shrink-0" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-400 hover:to-teal-400 text-black font-semibold text-sm transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="h-4 w-4 border-t-2 border-r-2 border-black rounded-full animate-spin" />
                      Adding Profile...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Submit to Talent Network
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-12 space-y-6"
              >
                {/* Check animation badge */}
                <div className="inline-flex h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 items-center justify-center shadow-lg shadow-emerald-500/5 animate-pulse">
                  <Check size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold font-heading text-white">Connection Locked</h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
                    Excellent choice, <span className="text-purple-400 font-bold">{fullName}</span>! Your profile has been integrated. Our recruiters will examine details and follow up on unlisted strategic match points.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSuccess(false);
                    setFullName('');
                    setEmail('');
                    setLinkedinUrl('');
                    setResumeName(null);
                  }}
                  className="px-6 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
                >
                  Add Another Profile
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
