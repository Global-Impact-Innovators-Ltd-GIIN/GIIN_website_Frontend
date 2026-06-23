"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, HelpCircle, Check, ArrowRight, ShieldCheck, Mail, User, Building2, BookOpen } from "lucide-react";

interface EnrollmentData {
  fullName: string;
  email: string;
  interest: string;
  level: string;
  org: string;
  goals: string;
}

export function EnrollmentHub() {
  const [formData, setFormData] = useState<EnrollmentData>({
    fullName: "",
    email: "",
    interest: "technology",
    level: "Beginner",
    org: "",
    goals: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<EnrollmentData | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please specify a valid email address";
    }
    if (!formData.goals.trim()) {
      newErrors.goals = "Please briefly write down your learning goals";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API registration delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessData(formData);
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        interest: "technology",
        level: "Beginner",
        org: "",
        goals: "",
      });
      setErrors({});
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error message when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <section id="enroll" className="py-24 bg-[#050816] text-white relative px-6 border-t border-white/5">
      {/* Light highlights */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#7C3AED]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Context guidelines */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] block">
              Enrollment Sandbox
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-space-grotesk tracking-tight leading-tight">
              Initialize Your <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">
                Learning Account
              </span>
            </h2>
            
            <p className="text-[#A1A1AA] text-sm md:text-base font-sans font-light leading-relaxed">
              Submit your interest profile today. Our admission algorithm evaluates entries weekly, placing learners in structured regional pathways with direct expert access.
            </p>

            <div className="space-y-6 pt-4">
              <div className="flex gap-4">
                <div className="p-1 rounded-full bg-white/5 border border-white/10 shrink-0 text-[#2563EB]">
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-xs text-[#A1A1AA] font-sans font-light leading-normal">
                  Unlock access to all 25+ sandbox environments.
                </p>
              </div>

              <div className="flex gap-4">
                <div className="p-1 rounded-full bg-white/5 border border-white/10 shrink-0 text-[#7C3AED]">
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-xs text-[#A1A1AA] font-sans font-light leading-normal">
                  Receive personalized learning roadmap updates matching your skills.
                </p>
              </div>

              <div className="flex gap-4">
                <div className="p-1 rounded-full bg-white/5 border border-white/10 shrink-0 text-[#4F46E5]">
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-xs text-[#A1A1AA] font-sans font-light leading-normal">
                  Claim micro-credential badges verified on the blockchain.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Enrollment Form with inline validation */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-white/5 bg-[#0A0A12]/95 p-8 shadow-xl relative min-h-[500px] flex flex-col justify-center">
              
              <AnimatePresence mode="wait">
                {!successData ? (
                  <motion.div
                    key="enroll-form"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-3 mb-8 text-left">
                      <div className="p-2.5 rounded-xl bg-[#2563EB]/15 text-[#2563EB] border border-[#2563EB]/25">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div className="font-space-grotesk">
                        <div className="text-[10px] uppercase font-bold text-[#A1A1AA] tracking-wider">
                          Ecosystem Entry
                        </div>
                        <h3 className="text-base font-bold text-white">
                          Learning Admission Form
                        </h3>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5 text-left" noValidate>
                      {/* Name */}
                      <div className="space-y-2">
                        <label htmlFor="fullName" className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider font-space-grotesk flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-[#2563EB]" />
                          Full Name *
                        </label>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Ekow Mensah"
                          aria-required="true"
                          aria-invalid={errors.fullName ? "true" : "false"}
                          className={`w-full h-11 px-4 rounded-xl bg-white/5 border text-xs text-white placeholder-[#A1A1AA] outline-none transition-all font-sans ${
                            errors.fullName ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-[#2563EB]"
                          }`}
                        />
                        {errors.fullName && (
                          <p role="alert" className="text-[10px] text-red-400 font-sans mt-1">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider font-space-grotesk flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
                          Email Address *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="ekow@giin.org"
                          aria-required="true"
                          aria-invalid={errors.email ? "true" : "false"}
                          className={`w-full h-11 px-4 rounded-xl bg-white/5 border text-xs text-white placeholder-[#A1A1AA] outline-none transition-all font-sans ${
                            errors.email ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-[#2563EB]"
                          }`}
                        />
                        {errors.email && (
                          <p role="alert" className="text-[10px] text-red-400 font-sans mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Split fields: interest & level */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="interest" className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider font-space-grotesk">
                            Learning Interest *
                          </label>
                          <select
                            id="interest"
                            name="interest"
                            value={formData.interest}
                            onChange={handleChange}
                            className="w-full h-11 px-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:border-[#2563EB] outline-none font-sans"
                          >
                            <option value="leadership">Leadership Development</option>
                            <option value="technology">Technology & Code</option>
                            <option value="innovation">Innovation Sandbox</option>
                            <option value="entrepreneurship">Entrepreneurship</option>
                            <option value="consulting">Professional Consulting</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="level" className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider font-space-grotesk">
                            Skill Level *
                          </label>
                          <select
                            id="level"
                            name="level"
                            value={formData.level}
                            onChange={handleChange}
                            className="w-full h-11 px-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:border-[#2563EB] outline-none font-sans"
                          >
                            <option value="Beginner">Beginner / Foundations</option>
                            <option value="Intermediate">Intermediate Practitioner</option>
                            <option value="Advanced">Advanced Specialist</option>
                          </select>
                        </div>
                      </div>

                      {/* Organization */}
                      <div className="space-y-2">
                        <label htmlFor="org" className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider font-space-grotesk flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-[#2563EB]" />
                          Organization (Optional)
                        </label>
                        <input
                          id="org"
                          name="org"
                          type="text"
                          value={formData.org}
                          onChange={handleChange}
                          placeholder="Ecosystem Inc."
                          className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-[#A1A1AA] focus:border-[#2563EB] outline-none transition-all font-sans"
                        />
                      </div>

                      {/* Goals */}
                      <div className="space-y-2">
                        <label htmlFor="goals" className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider font-space-grotesk">
                          What are your learning goals? *
                        </label>
                        <textarea
                          id="goals"
                          name="goals"
                          rows={3}
                          value={formData.goals}
                          onChange={handleChange}
                          placeholder="Tell us what skills or systems you plan to master..."
                          aria-required="true"
                          aria-invalid={errors.goals ? "true" : "false"}
                          className={`w-full p-4 rounded-xl bg-white/5 border text-xs text-white placeholder-[#A1A1AA] outline-none transition-all font-sans resize-none ${
                            errors.goals ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-[#2563EB]"
                          }`}
                        />
                        {errors.goals && (
                          <p role="alert" className="text-[10px] text-red-400 font-sans mt-1">
                            {errors.goals}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4.5 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#2563EB] hover:to-[#4F46E5] text-white rounded-xl text-xs font-bold font-sans transition-all active:scale-95 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
                      >
                        {isSubmitting ? (
                          <span>Vetting Profile...</span>
                        ) : (
                          <>
                            <span>Submit Admission Profile</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="enroll-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 mx-auto">
                      <ShieldCheck className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold font-space-grotesk text-white">Profile Submitted!</h3>
                      <p className="text-xs text-[#A1A1AA] font-sans font-light max-w-sm mx-auto leading-relaxed">
                        Thank you, <strong className="text-white">{successData.fullName}</strong>. Your GIIN learning center entry request has been queued.
                      </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-3 text-xs text-left max-w-sm mx-auto font-sans">
                      <div className="flex justify-between">
                        <span className="text-[#A1A1AA]">Email</span>
                        <span className="font-semibold text-white">{successData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#A1A1AA]">Target Field</span>
                        <span className="font-semibold text-white capitalize">{successData.interest}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#A1A1AA]">Skill Level</span>
                        <span className="font-semibold text-white">{successData.level}</span>
                      </div>
                      {successData.org && (
                        <div className="flex justify-between">
                          <span className="text-[#A1A1AA]">Organization</span>
                          <span className="font-semibold text-white">{successData.org}</span>
                        </div>
                      )}
                      <div className="pt-2.5 border-t border-white/5">
                        <span className="text-[10px] uppercase font-bold text-[#A1A1AA] tracking-wider block font-space-grotesk mb-1">Target Goals</span>
                        <p className="text-white/95 text-[11px] leading-relaxed font-light font-sans">{successData.goals}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSuccessData(null)}
                      className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold cursor-pointer font-sans transition-all active:scale-95"
                    >
                      Enroll Another Account
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
