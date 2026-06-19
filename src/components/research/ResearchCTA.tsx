"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Users } from "lucide-react";
import Link from "next/link";

export default function ResearchCTA() {
    return (
        <section className="py-24 bg-[#050816] relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-[#2563EB]/20 to-transparent rounded-t-[100%] blur-[120px]" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight font-[Space Grotesk]"
                >
                    Knowledge Creates <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">
                        Sustainable Impact
                    </span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto font-inter"
                >
                    Explore empirical insights, build strategic global partnerships, or stay updated on the latest transformational frameworks from the GIIN Ecosystem.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row justify-center items-center gap-4"
                >
                    <Link href="#research-library">
                        <div className="flex items-center justify-center space-x-2 bg-[#2563EB] hover:bg-[#4F46E5] text-white px-8 py-4 rounded-full font-medium transition-all w-full sm:w-auto shadow-lg shadow-[#2563EB]/25">
                            <span>Explore Publications</span>
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                    </Link>

                    <Link href="#collaboration">
                        <div className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-full font-medium transition-all w-full sm:w-auto backdrop-blur-sm">
                            <Users className="w-4 h-4 mr-2" />
                            <span>Collaborate With GIIN</span>
                        </div>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
