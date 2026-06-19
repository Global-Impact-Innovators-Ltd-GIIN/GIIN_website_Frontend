"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Download, Clock } from "lucide-react";

const documents = [
    {
        title: "Global Leadership Resilience Report 2026",
        type: "Industry Report",
        readTime: "45 min read",
        desc: "A definitive guide to leading massive decentralized organizations under macroeconomic stress."
    },
    {
        title: "The Zero-Carbon Technology Framework",
        type: "Strategic Framework",
        readTime: "30 min read",
        desc: "Implementation blueprints for migrating legacy corporate infrastructure to carbon-neutral architectures."
    },
    {
        title: "Next-Gen AI and Market Disruption",
        type: "White Paper",
        readTime: "60 min read",
        desc: "In-depth analysis of generative AI adoption curves across top Fortune 500 sectors."
    }
];

export default function WhitePapersSection() {
    return (
        <section className="py-24 bg-[#050816] relative" id="whitepapers">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-[Space Grotesk]">
                            White Papers & Strategic Reports
                        </h2>
                        <p className="text-zinc-400 text-lg">
                            High-value actionable intelligence, comprehensive frameworks, and policy blueprints for executives and policymakers.
                        </p>
                    </div>
                    <button className="text-[#2563EB] hover:text-white border border-[#2563EB] hover:bg-[#2563EB] px-6 py-3 rounded-full transition-all font-medium whitespace-nowrap">
                        View All Reports
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {documents.map((doc, index) => (
                        <motion.div
                            key={doc.title}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="bg-gradient-to-b from-[#0A0E27] to-[#050816] border border-white/10 rounded-2xl p-8 hover:shadow-lg hover:shadow-[#2563EB]/10 transition-all duration-300 relative group overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <FileText className="w-24 h-24 text-[#2563EB]" />
                            </div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="bg-[#2563EB]/20 text-[#2563EB] text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wide">
                                        {doc.type}
                                    </span>
                                    <div className="flex items-center text-xs text-zinc-500">
                                        <Clock className="w-3 h-3 mr-1" />
                                        {doc.readTime}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#4F46E5] transition-colors leading-snug font-[Space Grotesk]">
                                    {doc.title}
                                </h3>

                                <p className="text-sm text-zinc-400 mb-8 line-clamp-3">
                                    {doc.desc}
                                </p>

                                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                    <button className="text-white hover:text-[#2563EB] text-sm font-medium transition-colors">
                                        Read Preview
                                    </button>
                                    <button className="flex items-center space-x-2 bg-white/5 hover:bg-[#2563EB] text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                                        <Download className="w-4 h-4" />
                                        <span>Download PDF</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
