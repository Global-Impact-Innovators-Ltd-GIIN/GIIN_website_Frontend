"use client";

import React from "react";
import { motion } from "framer-motion";
import { Eye, Globe, Cpu, Network } from "lucide-react";
import { cn } from "@/lib/utils";

export function VisionSection() {
    return (
        <section id="vision" className="w-full py-28 bg-background relative overflow-hidden transition-colors duration-500">
            {/* Background decoration */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 dark:bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/20 text-primary dark:text-secondary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                        <Eye className="w-3 h-3" />
                        Strategic Vision
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6 tracking-tighter font-outfit text-balance">
                        A Blueprint for <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Continental Sovereignty</span>.
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed font-light text-balance">
                        We envision a connected Africa where every nation operates on a unified, secure, and high-performance digital layer. Our vision transcends borders, building the systems that allow African intelligence to solve global challenges.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Globe,
                            title: "Unified Ecosystem",
                            desc: "A singular network connecting innovators, researchers, and venture capital from Cairo to Cape Town.",
                            color: "text-primary dark:text-secondary",
                            bg: "bg-primary/5 dark:bg-primary/10"
                        },
                        {
                            icon: Cpu,
                            title: "Technological Autonomy",
                            desc: "Building proprietary AI models and server infrastructures that keep African data and decision-making sovereign.",
                            color: "text-secondary dark:text-primary",
                            bg: "bg-secondary/5 dark:bg-secondary/10"
                        },
                        {
                            icon: Network,
                            title: "Socio-Economic Mesh",
                            desc: "Integrating fintech, edtech, and agrotech into a primary system that drives nationwide transformations.",
                            color: "text-primary dark:text-secondary",
                            bg: "bg-primary/5 dark:bg-primary/10"
                        }
                    ].map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="group p-8 rounded-[2.5rem] bg-card border border-border/10 hover:border-primary/30 dark:hover:border-secondary/30 transition-all duration-500 text-left relative overflow-hidden shadow-sm hover:shadow-2xl"
                        >
                            <div className={cn("inline-flex w-12 h-12 rounded-xl items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md", card.bg, card.color)}>
                                <card.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-black text-foreground mb-3 group-hover:text-primary dark:group-hover:text-secondary transition-colors tracking-tight">{card.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground transition-colors">{card.desc}</p>

                            {/* Subtle hover reveal element */}
                            <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary dark:bg-secondary group-hover:w-full transition-all duration-700" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}


