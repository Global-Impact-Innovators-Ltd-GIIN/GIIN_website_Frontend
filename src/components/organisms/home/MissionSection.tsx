"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Shield, Zap } from "lucide-react";

export function MissionSection() {
    return (
        <section id="mission" className="w-full py-32 bg-background relative overflow-hidden transition-colors duration-500">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-accent/5 dark:bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                            <Target className="w-3 h-3" />
                            Strategic Mandate
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-foreground mb-8 leading-tight font-outfit tracking-tighter text-balance">
                            Unifying Talent, Capital, and <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-amber-500">Software</span>.
                        </h2>
                        <p className="text-xl text-muted-foreground mb-10 leading-relaxed font-light">
                            Our mission is to engineer a sovereign technological architecture for the next generation of African pioneers. By bridging the gap between raw talent and institutional capital, we create the operating system for continental transformation.
                        </p>

                        <div className="space-y-6">
                            {[
                                { icon: Shield, title: "Sovereign Infrastructure", desc: "Building localized systems that ensure data and economic independence." },
                                { icon: Zap, title: "Accelerated Deployment", desc: "Rapidly scaling high-impact software solutions across critical sectors." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-accent/5 border border-accent/10 flex items-center justify-center flex-shrink-0 text-accent group-hover:bg-accent/20 transition-colors">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-foreground mb-1 group-hover:text-accent transition-colors">{item.title}</h4>
                                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-accent/10 blur-3xl rounded-full scale-75 animate-pulse" />
                        <div className="relative aspect-square rounded-[3rem] border border-border/10 bg-gradient-to-br from-accent/5 to-transparent backdrop-blur-3xl overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-40 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                            <div className="absolute bottom-10 left-10 right-10">
                                <div className="p-6 rounded-2xl bg-background/60 border border-border/20 backdrop-blur-md">
                                    <p className="text-foreground font-medium italic text-lg mb-2 text-balance">"True innovation happens where legacy structures end and sovereign imagination begins."</p>
                                    <p className="text-accent text-sm font-bold uppercase tracking-widest">— GIIN Mandate</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
