"use client";

import React from "react";
import { motion } from "framer-motion";

const areas = [
    "Leadership Development",
    "Innovation Ecosystems",
    "Technology Transformation",
    "Digital Economy",
    "Entrepreneurship",
    "Education Innovation",
    "Sustainable Development",
    "Community Impact"
];

export default function ResearchAreas() {
    return (
        <section className="py-24 bg-[#050816] relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    <div className="lg:w-1/3">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-[Space Grotesk]">
                            Core Research Focus Areas
                        </h2>
                        <p className="text-zinc-400 mb-8 text-lg">
                            Our long-term research interests are aligned with the critical needs of evolving global ecosystems, shaping pathways to meaningful advancement.
                        </p>
                        <button className="px-6 py-3 bg-white/5 border border-[#2563EB]/30 hover:bg-[#2563EB]/10 text-[#2563EB] rounded-full transition-colors font-medium">
                            View Detailed Methodologies
                        </button>
                    </div>

                    <div className="lg:w-2/3 flex flex-wrap gap-4 justify-center lg:justify-start">
                        {areas.map((area, index) => (
                            <motion.div
                                key={area}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="group relative px-6 py-4 bg-[#0A0E27] border border-white/10 rounded-full hover:border-[#2563EB]/50 transition-all duration-300 cursor-pointer overflow-hidden shadow-lg"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/0 to-[#2563EB]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="relative z-10 text-zinc-300 group-hover:text-white font-medium transition-colors">
                                    {area}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
