"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, ShieldCheck } from "lucide-react";

export default function ResearchNewsletter() {
    return (
        <section className="py-20 bg-[#050816] relative border-b border-white/5">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-[#2563EB]/10 to-[#7C3AED]/10 rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden"
                >
                    {/* Decorative shapes */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#2563EB]/20 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 mb-6 text-[#2563EB]">
                            <Mail className="w-6 h-6" />
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-4 font-[Space Grotesk]">
                            Research & Knowledge Updates
                        </h2>

                        <p className="text-zinc-300 mb-8 max-w-xl mx-auto text-lg">
                            Subscribe to receive the latest research releases, publication updates, industry reports, and evidence-based innovation insights directly to your inbox.
                        </p>

                        <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-6">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="flex-1 bg-[#0A0E27] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all min-w-[150px]"
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="flex-[2] bg-[#0A0E27] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
                            />
                            <button
                                type="button"
                                className="px-8 py-3 bg-white text-[#050816] hover:bg-zinc-200 rounded-xl font-bold transition-colors whitespace-nowrap"
                            >
                                Subscribe
                            </button>
                        </form>

                        <div className="flex items-center justify-center space-x-2 text-xs text-zinc-500">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            <span>Your data is protected and used solely to distribute knowledge resources.</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
