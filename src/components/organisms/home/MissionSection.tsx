"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Shield, Zap, Wallet } from "lucide-react";

export function MissionSection() {
    return (
        <section id="mission" className="w-full py-28 bg-background relative overflow-hidden transition-colors duration-500">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 dark:bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/20 text-primary dark:text-secondary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                            <Target className="w-3 h-3" />
                            Strategic Mandate
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6 leading-tight font-outfit tracking-tighter text-balance">
                            Unifying Talent, Capital, and <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Software</span>.
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-light">
                            Our mission is to engineer a sovereign technological architecture for the next generation of African pioneers. By bridging the gap between raw talent and institutional capital, we create the operating system for continental transformation.
                        </p>

                        <div className="space-y-5">
                            {[
                                { icon: Shield, title: "Sovereign Infrastructure", desc: "Building localized systems that ensure data and economic independence." },
                                { icon: Zap, title: "Accelerated Deployment", desc: "Rapidly scaling high-impact software solutions across critical sectors." },
                                { icon: Wallet, title: "Financial Resilience", desc: "Providing the capital fuels required for localized innovation at scale." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center flex-shrink-0 text-primary dark:text-secondary group-hover:bg-primary/10 transition-colors">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold text-foreground mb-1 group-hover:text-primary dark:group-hover:text-secondary transition-colors">{item.title}</h4>
                                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 blur-3xl rounded-full scale-75 animate-pulse" />
                        <div className="relative aspect-square rounded-[2.5rem] border border-border/10 bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-3xl overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-40 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                            <div className="absolute bottom-8 left-8 right-8">
                                <div className="p-5 rounded-2xl bg-background/60 border border-border/20 backdrop-blur-md">
                                    <p className="text-foreground font-medium italic text-base mb-2 text-balance">"True innovation happens where legacy structures end and sovereign imagination begins."</p>
                                    <p className="text-primary dark:text-secondary text-xs font-bold uppercase tracking-widest">— GIIN Mandate</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
