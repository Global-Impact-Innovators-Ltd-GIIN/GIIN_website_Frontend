"use client";

import React, { useState } from "react";
import { Search, Filter, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchDiscovery() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    return (
        <section className="py-12 bg-[#050816] sticky top-20 z-40 border-b border-white/10 backdrop-blur-md bg-[#050816]/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    {/* Main Search Bar */}
                    <div className="relative flex-1 w-full">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-zinc-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by title, author, keyword, or research area..."
                            className="block w-full pl-11 pr-4 py-4 bg-[#0A0E27] border border-white/10 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-white placeholder-zinc-500 transition-all"
                        />
                        <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className="p-2 text-zinc-400 hover:text-white bg-white/5 hover:bg-[#2563EB]/20 rounded-lg transition-colors flex items-center space-x-2"
                            >
                                <SlidersHorizontal className="h-4 w-4" />
                                <span className="text-sm font-medium hidden sm:block">Filters</span>
                            </button>
                        </div>
                    </div>

                    <button className="w-full md:w-auto px-8 py-4 bg-[#2563EB] hover:bg-[#4F46E5] text-white rounded-xl font-medium transition-colors shadow-lg shadow-[#2563EB]/20">
                        Search
                    </button>
                </div>

                {/* Collapsible Filters Setup */}
                <AnimatePresence>
                    {isFilterOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-6 mt-6 border-t border-white/10">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-white font-medium flex items-center space-x-2">
                                        <Filter className="w-4 h-4 text-[#2563EB]" />
                                        <span>Advanced Refinement</span>
                                    </h4>
                                    <button onClick={() => setIsFilterOpen(false)} className="text-zinc-500 hover:text-white">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {/* Category Filter */}
                                    <select className="bg-[#0A0E27] border border-white/10 text-zinc-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#2563EB] appearance-none">
                                        <option value="">Any Category</option>
                                        <option value="leadership">Leadership Research</option>
                                        <option value="innovation">Innovation Studies</option>
                                        <option value="tech">Technology Research</option>
                                    </select>

                                    {/* Year Filter */}
                                    <select className="bg-[#0A0E27] border border-white/10 text-zinc-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#2563EB] appearance-none">
                                        <option value="">Any Year</option>
                                        <option value="2026">2026</option>
                                        <option value="2025">2025</option>
                                        <option value="2024">2024</option>
                                    </select>

                                    {/* Type Filter */}
                                    <select className="bg-[#0A0E27] border border-white/10 text-zinc-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#2563EB] appearance-none">
                                        <option value="">Publication Type</option>
                                        <option value="whitepaper">White Paper</option>
                                        <option value="report">Industry Report</option>
                                        <option value="journal">Journal Article</option>
                                        <option value="case">Case Study</option>
                                    </select>

                                    {/* Status Filter */}
                                    <select className="bg-[#0A0E27] border border-white/10 text-zinc-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#2563EB] appearance-none">
                                        <option value="">Status</option>
                                        <option value="published">Published</option>
                                        <option value="peer-review">Under Peer Review</option>
                                        <option value="working">Working Paper</option>
                                    </select>
                                </div>

                                <div className="mt-4 flex justify-end gap-4">
                                    <button className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors">
                                        Clear Filters
                                    </button>
                                    <button className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors text-sm">
                                        Apply Filters
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
