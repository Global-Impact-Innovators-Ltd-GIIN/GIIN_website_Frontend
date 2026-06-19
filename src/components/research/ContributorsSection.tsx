"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, BookOpen } from "lucide-react";

const contributors = [
    {
        name: "Dr. Mensah Q. Suku Jr",
        role: "Lead Researcher & Chief Strategist",
        expertise: "Leadership, AI Policy, Ecosystems",
        publications: 42,
        institution: "GIIN Global Institute",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop"
    },
    {
        name: "Prof. E. L. Mercer",
        role: "Senior Innovation Fellow",
        expertise: "Sustainable Business Models",
        publications: 18,
        institution: "Partner University Consortium",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop"
    },
    {
        name: "Sarah Jenkins",
        role: "Lead Data Scientist",
        expertise: "Predictive Analytics, Healthcare",
        publications: 24,
        institution: "GIIN Technology Labs",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2661&auto=format&fit=crop"
    },
    {
        name: "Dr. Kwame Osei",
        role: "Decentralized Systems Expert",
        expertise: "Blockchain, FinTech, Policy",
        publications: 15,
        institution: "Global Digital Trust",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop"
    }
];

export default function ContributorsSection() {
    return (
        <section className="py-24 bg-[#0A0E27] relative border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-[Space Grotesk]">
                        Researchers & Contributors
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Meet the academic minds, industry experts, and innovation leaders behind our world-class intellectual capital.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {contributors.map((person, index) => (
                        <motion.div
                            key={person.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-[#050816] rounded-2xl p-6 border border-white/5 hover:border-[#2563EB]/40 transition-colors group relative"
                        >
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-6 border-2 border-white/10 group-hover:border-[#2563EB] transition-colors relative">
                                <img
                                    src={person.image}
                                    alt={person.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>

                            <div className="text-center">
                                <h3 className="text-lg font-bold text-white mb-1 font-[Space Grotesk]">
                                    {person.name}
                                </h3>
                                <p className="text-sm text-[#2563EB] mb-3 font-medium">
                                    {person.role}
                                </p>

                                <p className="text-xs text-zinc-400 mb-4 line-clamp-2">
                                    {person.expertise}
                                </p>

                                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                                    <div className="flex items-center space-x-1 text-xs text-zinc-300">
                                        <BookOpen className="w-3 h-3 text-zinc-500" />
                                        <span>{person.publications} Pubs</span>
                                    </div>
                                    <button className="p-1.5 bg-white/5 hover:bg-[#2563EB] text-white rounded-md transition-colors" title="View Profile">
                                        <ExternalLink className="w-3 h-3" />
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
