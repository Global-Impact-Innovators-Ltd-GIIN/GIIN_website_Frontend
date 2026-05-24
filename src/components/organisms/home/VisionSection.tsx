"use client";

import React from "react";
import { motion } from "framer-motion";
import { Eye, Globe, Cpu, Network } from "lucide-react";

export function VisionSection() {
    return (
        <section id="vision" className="w-full py-32 bg-background relative overflow-hidden transition-colors duration-500">
            {/* Background decoration */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 dark:bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                        <Eye className="w-3 h-3" />
                        Strategic Vision
                    </div>
                    <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter font-outfit text-balance">
                        A Blueprint for <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-amber-500">Continental Sovereignty</span>.
                    </h2>
                    <p className="text-xl text-slate-400 leading-relaxed font-light text-balance">
                        We envision a connected Africa where every nation operates on a unified, secure, and high-performance digital layer. Our vision transcends borders, building the systems that allow African intelligence to solve global challenges.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Globe,
                            title: "Unified Ecosystem",
                            desc: "A singular network connecting innovators, researchers, and venture capital from Cairo to Cape Town.",
                            color: "text-accent",
                            bg: "bg-accent/5"
                        },
                        {
                            icon: Cpu,
                            title: "Technological Autonomy",
                            desc: "Building proprietary AI models and server infrastructures that keep African data and decision-making sovereign.",
                            color: "text-primary",
                            bg: "bg-primary/10"
                        },
                        {
                            icon: Network,
                            title: "Socio-Economic Mesh",
                            desc: "Integrating fintech, edtech, and agrotech into a primary system that drives nationwide transformations.",
                            color: "text-accent",
                            bg: "bg-accent/5"
                        }
                    ].map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="group p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-accent/30 transition-all duration-500 text-left relative overflow-hidden"
                        >
                            <div className={cn("inline-flex w-14 h-14 rounded-2xl items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg", card.bg, card.color)}>
                                <card.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent transition-colors tracking-tight">{card.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-400 transition-colors">{card.desc}</p>

                            {/* Subtle hover reveal element */}
                            <div className="absolute bottom-0 left-0 h-1 w-0 bg-accent group-hover:w-full transition-all duration-700" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Helper to handle class merging
function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
