"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Download, Bookmark, Share2, ChevronRight } from "lucide-react";

const libraryItems = [
    {
        id: 1,
        title: "AI Governance Frameworks for Public Sector",
        abstract: "Evaluating the readiness of governmental institutions in adopting safe, ethical, and progressive AI regulations.",
        authors: ["Dr. Mensah Q. Suku Jr"],
        year: "2026",
        category: "Policy & Governance",
        tags: ["AI", "Public Sector", "Ethics"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "The Economics of Digital Identity",
        abstract: "A quantitative study on how decentralized identity solutions impact financial inclusion in sub-Saharan Africa.",
        authors: ["K. Osei", "Dr. A. Mensah"],
        year: "2025",
        category: "Technology Research",
        tags: ["Digital ID", "Fintech", "Africa"],
        image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Resilient Supply Chains in Era of Disruption",
        abstract: "Strategic frameworks for building anti-fragile supply networks using predictive analytics algorithms.",
        authors: ["Prof. E. L. Mercer"],
        year: "2025",
        category: "Business & Strategy",
        tags: ["Supply Chain", "Analytics"],
        image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c82649?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "Transformative Education Models via EdTech",
        abstract: "An impact assessment of adaptive learning platforms on STEM curriculum comprehension among high school demographics.",
        authors: ["Dr. S. K. Jenkins"],
        year: "2024",
        category: "Education & Training",
        tags: ["EdTech", "STEM", "Learning Models"],
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop"
    }
];

export default function ResearchLibrary() {
    return (
        <section className="py-20 bg-[#050816]" id="research-library">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2 font-[Space Grotesk]">
                            Research Library
                        </h2>
                        <p className="text-zinc-400">
                            Browse our comprehensive database of studies and insights.
                        </p>
                    </div>
                    <div className="hidden sm:flex text-sm text-zinc-500">
                        Showing <span className="text-white mx-1 font-medium text-lg">1,245</span> Publications
                    </div>
                </div>

                <div className="space-y-6">
                    {libraryItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="group bg-[#0A0E27] border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all duration-300 flex flex-col md:flex-row gap-6 items-start"
                        >
                            {/* Thumbnail */}
                            <div className="w-full md:w-48 h-48 md:h-32 rounded-xl overflow-hidden shrink-0 relative bg-zinc-900">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-100"
                                />
                                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-semibold text-white uppercase tracking-wider">
                                    {item.year}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 text-xs text-[#2563EB] mb-2 font-medium uppercase tracking-wider">
                                    <FileText className="w-3 h-3" />
                                    <span>{item.category}</span>
                                </div>

                                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#4F46E5] transition-colors font-[Space Grotesk] truncate">
                                    {item.title}
                                </h3>

                                <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                                    {item.abstract}
                                </p>

                                <div className="flex flex-wrap gap-2 text-sm">
                                    {item.authors.map((author, i) => (
                                        <span key={i} className="text-zinc-300 bg-white/5 px-2 py-1 rounded-md">
                                            {author}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-row md:flex-col gap-3 shrink-0 w-full md:w-auto md:ml-auto items-center md:items-end justify-between border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
                                <div className="flex space-x-2">
                                    <button className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors" title="Bookmark">
                                        <Bookmark className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors" title="Share">
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="flex space-x-3">
                                    <button className="flex items-center space-x-2 px-4 py-2 border border-[#2563EB]/50 text-[#2563EB] hover:bg-[#2563EB] hover:text-white rounded-lg transition-colors text-sm font-medium">
                                        <span>Abstract</span>
                                    </button>
                                    <button className="flex items-center space-x-2 px-4 py-2 bg-[#2563EB] hover:bg-[#4F46E5] text-white rounded-lg transition-colors text-sm font-medium">
                                        <Download className="w-4 h-4" />
                                        <span className="hidden sm:inline">Download</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <button className="inline-flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors">
                        <span>Load More Publications</span>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}
