"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Users,
    Lightbulb,
    Cpu,
    Briefcase,
    GraduationCap,
    Globe2,
    Scale,
    Rocket
} from "lucide-react";

const categories = [
    {
        title: "Leadership Research",
        description: "Leadership frameworks and organizational development.",
        icon: Users,
        count: 42,
        color: "from-blue-500/20 to-blue-500/5",
        iconColor: "text-blue-500"
    },
    {
        title: "Innovation Studies",
        description: "Innovation ecosystems and emerging trends.",
        icon: Lightbulb,
        count: 36,
        color: "from-yellow-500/20 to-yellow-500/5",
        iconColor: "text-yellow-500"
    },
    {
        title: "Technology Research",
        description: "AI, cybersecurity, software, digital transformation.",
        icon: Cpu,
        count: 58,
        color: "from-purple-500/20 to-purple-500/5",
        iconColor: "text-purple-500"
    },
    {
        title: "Business & Strategy",
        description: "Growth, operations, entrepreneurship, consulting.",
        icon: Briefcase,
        count: 64,
        color: "from-emerald-500/20 to-emerald-500/5",
        iconColor: "text-emerald-500"
    },
    {
        title: "Education & Training",
        description: "Learning systems and human capital development.",
        icon: GraduationCap,
        count: 27,
        color: "from-orange-500/20 to-orange-500/5",
        iconColor: "text-orange-500"
    },
    {
        title: "Community Dev",
        description: "Social impact and transformation initiatives.",
        icon: Globe2,
        count: 31,
        color: "from-teal-500/20 to-teal-500/5",
        iconColor: "text-teal-500"
    },
    {
        title: "Policy & Governance",
        description: "Public sector insights and governance frameworks.",
        icon: Scale,
        count: 19,
        color: "from-indigo-500/20 to-indigo-500/5",
        iconColor: "text-indigo-500"
    },
    {
        title: "Future Trends",
        description: "Emerging opportunities and strategic foresight.",
        icon: Rocket,
        count: 45,
        color: "from-rose-500/20 to-rose-500/5",
        iconColor: "text-rose-500"
    }
];

export default function ResearchCategories() {
    return (
        <section className="py-20 bg-[#050816] relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-[Space Grotesk]">
                        Explore by Category
                    </h2>
                    <p className="text-zinc-400 text-lg">
                        Discover specialized insights and rigorous academic research across our core multidisciplinary domains.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="group cursor-pointer rounded-2xl bg-[#0A0E27] border border-white/5 p-6 hover:bg-white/5 hover:border-[#2563EB]/40 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-3 rounded-xl bg-black/40 border border-white/10 ${category.iconColor}`}>
                                        <category.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-xs font-semibold text-zinc-500 bg-black/30 px-2 py-1 rounded-full">
                                        {category.count} Pubs
                                    </span>
                                </div>

                                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#2563EB] transition-colors font-[Space Grotesk]">
                                    {category.title}
                                </h3>

                                <p className="text-sm text-zinc-400 line-clamp-2 group-hover:text-zinc-300 transition-colors">
                                    {category.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
