"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building, Send } from "lucide-react";

export default function CollaborationHub() {
    return (
        <section className="py-24 bg-[#0A0E27] relative overflow-hidden" id="collaboration">
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#2563EB]/10 via-transparent to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
                            <Building className="w-4 h-4 text-[#7C3AED]" />
                            <span className="text-sm font-medium text-zinc-300 uppercase tracking-wider">Research Partnerships</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-[Space Grotesk] leading-tight">
                            Research <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">
                                Collaboration Hub
                            </span>
                        </h2>

                        <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                            We invite universities, governments, NGOs, corporations, and independent researchers to partner with the GIIN ecosystem. Together, we can construct impactful knowledge bases and deploy empirical solutions to humanity's critical challenges.
                        </p>

                        <ul className="space-y-4 mb-8 text-zinc-300">
                            <li className="flex items-start space-x-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2 shrink-0" />
                                <span>Co-author high-impact industry reports and studies.</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-2 shrink-0" />
                                <span>Access global data ecosystems and empirical testing environments.</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] mt-2 shrink-0" />
                                <span>Develop strategic frameworks for policy and institutional reform.</span>
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-[#050816] p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative"
                    >
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#2563EB] to-[#7C3AED] rounded-full blur-2xl opacity-30 pointer-events-none" />

                        <h3 className="text-2xl font-bold text-white mb-8 font-[Space Grotesk]">
                            Initiate Collaboration
                        </h3>

                        <form className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-2">Organization</label>
                                    <input type="text" className="w-full bg-[#0A0E27] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all" placeholder="University/Company" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-2">Contact Person</label>
                                    <input type="text" className="w-full bg-[#0A0E27] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all" placeholder="Full Name" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
                                    <input type="email" className="w-full bg-[#0A0E27] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all" placeholder="academic@institution.edu" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-2">Research Area</label>
                                    <select className="w-full bg-[#0A0E27] border border-white/10 rounded-lg px-4 py-3 text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all appearance-none cursor-pointer">
                                        <option>Leadership & Future of Work</option>
                                        <option>Technology & AI Policy</option>
                                        <option>Global Innovation Studies</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Project Description</label>
                                <textarea rows={4} className="w-full bg-[#0A0E27] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all resize-none" placeholder="Briefly describe your proposed research partnership..." />
                            </div>

                            <button type="button" className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-[#2563EB] to-[#4F46E5] hover:to-[#7C3AED] text-white py-4 rounded-lg font-bold transition-all shadow-lg hover:shadow-[#2563EB]/20">
                                <span>Submit Proposal</span>
                                <Send className="w-4 h-4 ml-2" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
