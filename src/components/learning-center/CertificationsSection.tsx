"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ShieldCheck, CheckCircle2, Search, HelpCircle, FileCheck, Check, X } from "lucide-react";

interface VerificationResult {
  valid: boolean;
  certId: string;
  recipient: string;
  course: string;
  issueDate: string;
  blockchainHash: string;
}

const mockCerts: Record<string, VerificationResult> = {
  "GIIN-CERT-9921": {
    valid: true,
    certId: "GIIN-CERT-9921",
    recipient: "Ekow Mensah",
    course: "Linux Command Line & Sovereign Networks",
    issueDate: "June 12, 2026",
    blockchainHash: "0x7a83d92fb9c2a11b654df643ef65c719e830f2824cfd81b8319cd2a2e8c205",
  },
  "GIIN-CERT-8843": {
    valid: true,
    certId: "GIIN-CERT-8843",
    recipient: "Fatima Bello",
    course: "Foundations of Civic Leadership",
    issueDate: "May 28, 2026",
    blockchainHash: "0x892aef43b901bc72afb12cd534fe6a21008d7120a84e9184df629081e7d82b",
  },
};

export function CertificationsSection() {
  const [searchVal, setSearchVal] = useState("");
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchVal.trim()) return;

    const query = searchVal.toUpperCase().trim();
    if (mockCerts[query]) {
      setResult(mockCerts[query]);
    } else {
      setResult(null);
    }
    setHasSearched(true);
  };

  return (
    <section className="py-24 bg-[#050816] text-white relative px-6 border-t border-white/5">
      {/* Light orbs */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#7C3AED]/5 blur-[120px] rounded-full pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Certifications Context */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#7C3AED] block">
              Professional Credentials
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-space-grotesk tracking-tight leading-tight">
              GIIN Professional <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">
                Certifications & Badges
              </span>
            </h2>
            <p className="text-[#A1A1AA] text-sm md:text-base font-sans font-light leading-relaxed max-w-xl">
              GIIN digital credentials allow individuals to prove real-world engineering, leadership, and operational skills. Built for direct employer validation and future-ready blockchain verification systems.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white shrink-0 mt-0.5">
                  <Award className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-space-grotesk">Digital Certificates</h3>
                  <p className="text-xs text-[#A1A1AA] font-sans font-light mt-1">
                    Downloadable high-resolution PDFs embedded with verified cryptographic credentials.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5 text-[#7C3AED]" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-space-grotesk">Skills Verification</h3>
                  <p className="text-xs text-[#A1A1AA] font-sans font-light mt-1">
                    Granular skill badges linked to completed sandbox tests and capstone project assessments.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white shrink-0 mt-0.5">
                  <FileCheck className="w-5 h-5 text-[#4F46E5]" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-space-grotesk">Employer Validation Portal</h3>
                  <p className="text-xs text-[#A1A1AA] font-sans font-light mt-1">
                    Secure registry lookup allowing hiring managers to confirm certificates instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Verification Sandbox (Interactive Portal) */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-[#0A0A12]/90 to-[#050816]/90 p-8 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-[#2563EB]/15 text-[#2563EB] border border-[#2563EB]/25">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-left font-space-grotesk">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-[#A1A1AA]">
                    Interactive Tool
                  </div>
                  <div className="text-sm font-bold text-white">
                    Credential Verification
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#A1A1AA] font-sans font-light leading-relaxed mb-6 text-left">
                Test the verification portal. Search mock certificates: <strong className="text-white">GIIN-CERT-9921</strong> or <strong className="text-white">GIIN-CERT-8843</strong>.
              </p>

              <form onSubmit={handleVerify} className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" />
                  <input
                    type="text"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    placeholder="Enter ID (e.g. GIIN-CERT-9921)"
                    className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-[#A1A1AA] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] outline-none transition-all font-sans uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#2563EB] hover:bg-[#2563EB]/90 text-white rounded-xl text-xs font-bold font-sans transition-all active:scale-95 cursor-pointer"
                >
                  Verify Cryptographic Certificate
                </button>
              </form>

              {/* Animate verification output results */}
              <AnimatePresence mode="wait">
                {hasSearched && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-6 pt-6 border-t border-white/5 text-left"
                  >
                    {result ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-green-400 font-sans text-xs font-bold">
                          <Check className="w-4.5 h-4.5 p-0.5 rounded-full bg-green-500/20" />
                          <span>Vetted & Cryptographically Secure</span>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-2.5 text-xs font-sans">
                          <div>
                            <span className="text-[#A1A1AA] block">Certificate Owner</span>
                            <span className="font-semibold text-white">{result.recipient}</span>
                          </div>
                          <div>
                            <span className="text-[#A1A1AA] block">Curriculum Program</span>
                            <span className="font-semibold text-white">{result.course}</span>
                          </div>
                          <div>
                            <span className="text-[#A1A1AA] block">Date Issued</span>
                            <span className="font-semibold text-white">{result.issueDate}</span>
                          </div>
                          <div className="pt-2 border-t border-white/5">
                            <span className="text-[10px] text-[#A1A1AA] block tracking-wide font-mono">BLOCKCHAIN REGISTRY HASH</span>
                            <span className="text-[9px] font-mono text-white/60 break-all select-all">{result.blockchainHash}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 font-sans text-xs">
                        <X className="w-4.5 h-4.5 p-0.5 rounded-full bg-red-500/20 shrink-0" />
                        <div>
                          <span className="font-bold block">Invalid Credential ID</span>
                          <span className="text-[#A1A1AA] text-[11px] font-light mt-0.5 block">No verification records matched the queried Certificate ID.</span>
                        </div>
                      </div>
                    )}
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
