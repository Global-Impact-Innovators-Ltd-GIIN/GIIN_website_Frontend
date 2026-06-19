"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Calendar, User, Download, Eye } from "lucide-react";
import Image from "next/image";

const featuredPublications = [
    {
        id: 1,
        title: "The Future of Organizational Leadership in a Post-Digital World",
        abstract: "A comprehensive analysis of how executive leadership structures are adapting to AI-driven organizational transformation and distributed workforces.",
        authors: ["Dr. Mensah Q. Suku Jr", "Sarah Jenkins"],
        date: "October 2025",
        category: "Leadership Research",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
        tags: ["AI", "Leadership", "Transformation"]
    },
    {
        id: 2,
        title: "Sustainable Innovation Ecosystems in Developing Economies",
        abstract: "Examining the critical role of public-private partnerships in fostering resilient innovation hubs across emerging markets.",
        authors: ["Prof. E. L. Mercer"],
        date: "August 2025",
        category: "Innovation Studies",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
        tags: ["Sustainability", "Emerging Markets"]
    }
];

export default function FeaturedResearch() {
    return (
        <section className="py-24 bg-[#050816] relative overflow-hidden" id="featured-research">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#7C3AED]/5 rounded-bl-[100%] blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center md:text-left mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-[Space Grotesk]">
                            Featured Research
                        </h2>
                        <p className="text-zinc-400 text-lg">
                            Explore our flagship publications and cornerstone studies driving innovation and leadership globally.
                        </p>
                    </div>
                    <button className="hidden md:flex items-center space-x-2 text-[#2563EB] hover:text-[#4F46E5] transition-colors font-medium">
                        <span>View All Featured</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {featuredPublications.map((pub, index) => (
                        <motion.div
                            key={pub.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="group relative bg-[#0A0E27] border border-white/10 rounded-2xl overflow-hidden hover:border-[#2563EB]/50 transition-all duration-500"
                        >
                            {/* Image Container */}
                            <div className="relative h-64 w-full overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E27] via-[#0A0E27]/50 to-transparent z-10 mix-blend-multiply" />
                                <img
                                    src={pub.image}
                                    alt={pub.title}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="bg-[#2563EB] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                                        {pub.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content Container */}
                            <div className="p-8 relative z-20 -mt-10 bg-gradient-to-b from-transparent to-[#0A0E27]">
                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#2563EB] transition-colors font-[Space Grotesk] line-clamp-2">
                                    {pub.title}
                                </h3>

                                <p className="text-zinc-400 mb-6 line-clamp-3">
                                    {pub.abstract}
                                </p>

                                <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 mb-8 border-b border-white/5 pb-6">
                                    <div className="flex items-center space-x-1 border border-white/10 rounded-full px-3 py-1 bg-white/5">
                                        <User className="w-3 h-3" />
                                        <span>{pub.authors.join(", ")}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 border border-white/10 rounded-full px-3 py-1 bg-white/5">
                                        <Calendar className="w-3 h-3" />
                                        <span>{pub.date}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex gap-2">
                                        {pub.tags.map((tag, i) => (
                                            <span key={i} className="text-xs text-zinc-400">#{tag}</span>
                                        ))}
                                    </div>

                                    <div className="flex space-x-3">
                                        <button className="p-2 bg-white/5 hover:bg-[#2563EB] text-white rounded-full transition-colors group/btn">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="flex items-center space-x-2 bg-[#2563EB] hover:bg-[#4F46E5] text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                                            <Download className="w-4 h-4" />
                                            <span>Download</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
