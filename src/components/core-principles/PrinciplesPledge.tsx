"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Clipboard, Compass, Users, Sparkles } from "lucide-react";

export default function PrinciplesPledge() {
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [checked, setChecked] = useState(false);
  const [isSigned, setIsSigned] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && checked) {
      setIsSigned(true);
    }
  };

  const currentDate = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section id="pledge" className="py-32 bg-[#04040a] relative overflow-hidden border-t border-white/5">
      {/* Aurora glow accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
        
        {/* Title Elements */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-bold uppercase tracking-[0.2em] mb-8">
            The Covenant
          </div>
          <h2 className="text-3xl md:text-6xl font-black text-white tracking-tighter leading-tight font-outfit mb-6">
            Principles Before Progress.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-400 to-accent">
              Character Before Achievement.
            </span>
          </h2>
          <p className="text-lg text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
            The GIIN Ecosystem is committed to sustainable scale. We grow, design, and collaborate with absolute fidelity to our constitutional rules.
          </p>
        </div>

        {/* Interactive Pledge Frame */}
        <div className="max-w-2xl mx-auto mb-20 p-8 md:p-12 rounded-3xl backdrop-blur-md bg-white/[0.02] border border-white/10 shadow-2xl relative text-left">
          {/* Subtle neon grid background in card */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(127,76,165,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(127,76,165,0.02)_1px,transparent_1px)] bg-[size:2rem_2rem] rounded-3xl pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {!isSigned ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit}
                className="space-y-6 relative z-10"
              >
                <h3 className="text-xl font-bold text-white font-outfit mb-4">
                  Sign The Stewardship Pledge
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="pledge-name" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                      Full Name
                    </label>
                    <input
                      id="pledge-name"
                      type="text"
                      required
                      placeholder="e.g. Adebayo Vance"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="pledge-org" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                      Organization (Optional)
                    </label>
                    <input
                      id="pledge-org"
                      type="text"
                      placeholder="e.g. sovereign builders"
                      value={org}
                      onChange={(e) => setOrg(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3 mt-4">
                  <input
                    id="pledge-check"
                    type="checkbox"
                    required
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-white/10 bg-white/5 text-primary accent-primary outline-none focus:ring-offset-0 focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="pledge-check" className="text-xs text-slate-400 font-light leading-relaxed cursor-pointer select-none">
                    I pledge to align with the core values of GIIN, protect collaborative standards, uphold transparency, and build sustainable impact in my sphere of influence.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!name.trim() || !checked}
                  className="w-full py-4 mt-6 rounded-xl bg-primary text-white font-bold text-sm uppercase tracking-widest shadow-lg hover:bg-primary/80 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                  Sign Pledge
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="certificate"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center py-6 relative z-10 flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-primary mb-6 shadow-xl shadow-primary/10">
                  <Check className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-black text-white font-outfit mb-3">
                  Pledge Authenticated
                </h3>
                
                <p className="text-xs text-slate-400 uppercase tracking-widest font-mono mb-8">
                  Ecosystem Ledger ID: {Math.random().toString(36).substring(2, 11).toUpperCase()}
                </p>

                <div className="w-full max-w-md p-6 border border-white/10 rounded-2xl bg-[#090912] shadow-inner text-left font-serif relative">
                  <div className="absolute top-3 right-4 font-mono text-[9px] uppercase text-primary tracking-widest font-bold">
                    GIIN Official
                  </div>
                  <p className="text-sm italic text-slate-300 leading-relaxed mb-6 font-light">
                    &ldquo;This document attests that {name} {org ? `of ${org}` : ""} has pledged to uphold the values of Leadership, Integrity, and Impact, prioritizing character before achievement in the expansion of sovereign infrastructure.&rdquo;
                  </p>
                  <div className="border-t border-white/5 pt-4 flex justify-between items-end">
                    <div>
                      <div className="text-[10px] font-sans font-bold text-slate-500 uppercase tracking-widest mb-1">
                        Date Signed
                      </div>
                      <div className="text-xs text-slate-300 font-sans">
                        {currentDate}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-outfit italic text-base text-primary font-bold">
                        GIIN Stewardship
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsSigned(false)}
                  className="mt-8 text-xs text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest font-bold underline underline-offset-4"
                >
                  Sign another pledge
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Pathways */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="/community"
            className="group p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-primary/30 hover:bg-white/[0.03] transition-all duration-300 flex flex-col items-center"
          >
            <Users className="w-6 h-6 text-primary group-hover:scale-110 transition-transform mb-3" />
            <h4 className="font-bold text-white mb-1 font-outfit">Join the GIIN Community</h4>
            <p className="text-xs text-slate-500">Collaborate with developers and practitioners worldwide.</p>
          </a>
          <a
            href="/leadership/programs"
            className="group p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-primary/30 hover:bg-white/[0.03] transition-all duration-300 flex flex-col items-center"
          >
            <Compass className="w-6 h-6 text-primary group-hover:scale-110 transition-transform mb-3" />
            <h4 className="font-bold text-white mb-1 font-outfit">Explore Leadership Programs</h4>
            <p className="text-xs text-slate-500">Access structured cohort training and academy tracks.</p>
          </a>
          <a
            href="/support"
            className="group p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-primary/30 hover:bg-white/[0.03] transition-all duration-300 flex flex-col items-center"
          >
            <Clipboard className="w-6 h-6 text-primary group-hover:scale-110 transition-transform mb-3" />
            <h4 className="font-bold text-white mb-1 font-outfit">Partner With GIIN</h4>
            <p className="text-xs text-slate-500">Leverage and scale sovereign infrastructure integrations.</p>
          </a>
        </div>
      </div>
    </section>
  );
}
