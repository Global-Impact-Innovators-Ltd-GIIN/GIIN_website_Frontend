"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, MapPin, TrendingUp, Award, Zap, Heart } from "lucide-react";

export default function JourneyPage() {
    const milestones = [
        { year: "2023", title: "Foundations", desc: "GIIN Labs established in Lagos. First cohort of search-fund innovators launched." },
        { year: "2024", title: "Continental Expansion", desc: "Expansion to Kenya and Egypt. Deployed sovereign data layers for 12 enterprise partners." },
        { year: "2025", title: "Sovereign AI Deployment", desc: "First localized LLM for African policy research launched. Seed funding reached $100M+." },
        { year: "2026", title: "The OS for Africa", desc: "Currently unifying all 45 participating nations into a singular digital ecosystem." },
    ];

    return (
        <main className="min-h-screen bg-background text-foreground pt-32 pb-20 overflow-hidden transition-colors duration-500">
            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 dark:bg-accent/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[150px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                            <TrendingUp className="w-3 h-3" />
                            Impact Trajectory
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black text-foreground mb-8 tracking-tighter font-outfit leading-[0.9] text-balance">
                            The Global <br /> <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-amber-500">Impact Journey</span>.
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl text-balance">
                            From local labs to continental infrastructure, follow our documented path of transforming nations through engineering.
                        </p>
                    </motion.div>
                </div>

                {/* Timeline Section */}
                <div className="relative mb-40">
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/20 hidden lg:block" />

                    <div className="space-y-20">
                        {milestones.map((ms, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                className={`flex flex-col lg:flex-row items-center gap-10 ${i % 2 === 0 ? "lg:flex-row-reverse" : ""}`}
                            >
                                <div className="flex-1 text-center lg:text-left">
                                    <div className={`flex flex-col ${i % 2 === 0 ? "lg:items-start" : "lg:items-end"} mb-4`}>
                                        <span className="text-5xl font-black text-foreground/10">{ms.year}</span>
                                        <h3 className="text-2xl font-bold text-foreground">{ms.title}</h3>
                                    </div>
                                    <p className={`text-muted-foreground max-w-md mx-auto ${i % 2 === 0 ? "lg:mx-0 lg:text-left" : "lg:mr-0 lg:text-right"}`}>
                                        {ms.desc}
                                    </p>
                                </div>

                                <div className="w-12 h-12 rounded-full border-4 border-background bg-accent shadow-[0_0_20px_rgba(245,158,11,0.5)] z-10 flex-shrink-0" />

                                <div className="flex-1 hidden lg:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
                    {[
                        { label: "Community", value: "50,000+", desc: "Visionary innovators connected", icon: Heart, color: "text-red-400", bg: "bg-red-500/10" },
                        { label: "Sovereignty", value: "100%", desc: "Data and infrastructure autonomy", icon: Zap, color: "text-accent", bg: "bg-accent/10" },
                        { label: "Recognition", value: "24", desc: "Global innovation awards bagged", icon: Award, color: "text-amber-400", bg: "bg-amber-500/10" },
                    ].map((item, i) => (
                        <div key={i} className="p-10 rounded-[2.5rem] bg-card border border-border/10 hover:border-accent/30 transition-all duration-500 group overflow-hidden relative">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                                <item.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-4xl font-black text-foreground mb-2">{item.value}</h3>
                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">{item.label}</p>
                            <p className="text-muted-foreground font-light">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
