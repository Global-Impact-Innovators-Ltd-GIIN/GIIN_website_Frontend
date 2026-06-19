"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Network, Database, Atom } from "lucide-react";
import Link from "next/link";

export default function ResearchHero() {
    return (
        <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#050816]">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2563EB]/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7C3AED]/20 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl">
                    {/* Abstract Network Graphic */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4F46E5] via-transparent to-transparent" />
                    <svg className="absolute w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 50 Q 50 10 100 50 T 200 50" stroke="#2563EB" strokeWidth="0.5" fill="none" className="animate-pulse" />
                        <path d="M0 70 Q 50 30 100 70 T 200 70" stroke="#7C3AED" strokeWidth="0.5" fill="none" className="animate-pulse" style={{ animationDelay: '1s' }} />
                    </svg>
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8 backdrop-blur-sm"
                >
                    <Network className="w-4 h-4 text-[#2563EB]" />
                    <span className="text-sm font-medium text-zinc-300 tracking-wide uppercase">GIIN Knowledge Repository</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 font-[Space Grotesk]"
                >
                    Research That Drives <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">
                        Transformation
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="max-w-2xl text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed font-inter"
                >
                    Explore evidence-based insights, innovation studies, leadership research, strategic reports, and knowledge resources designed to shape the future of organizations, communities, and nations.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
                >
                    <Link href="#research-library" className="group">
                        <div className="flex items-center justify-center space-x-2 bg-[#2563EB] hover:bg-[#4F46E5] text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#2563EB]/25">
                            <span>Explore Research</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                    <Link href="#whitepapers" className="group">
                        <div className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-full font-medium transition-all duration-300 backdrop-blur-sm">
                            <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                            <span>Download Publications</span>
                        </div>
                    </Link>
                </motion.div>
            </div>

            {/* Decorative Bottom Gradient */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050816] to-transparent z-10" />
        </section>
    );
}
