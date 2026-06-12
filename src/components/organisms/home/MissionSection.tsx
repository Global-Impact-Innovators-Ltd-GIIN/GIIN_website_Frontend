"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Shield, Zap, Wallet } from "lucide-react";

export function MissionSection() {
    return (
        <section id="mission" className="w-full py-28 bg-section-gradient relative overflow-hidden transition-colors duration-500">

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
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Ambient glow backdrops */}
                        <div className="absolute -top-10 -left-10 w-72 h-72 bg-primary/10 dark:bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
                        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-secondary/10 dark:bg-secondary/20 blur-[100px] rounded-full pointer-events-none" />

                        {/* Image Container with premium frame and drop shadow */}
                        <div className="relative aspect-square rounded-[2.5rem] border border-border/15 bg-gradient-to-br from-card to-background shadow-2xl shadow-primary/5 dark:shadow-black/50 overflow-hidden group">
                            
                            {/* Color Globe Image with smooth zoom transition */}
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-85 group-hover:opacity-100 transition-all duration-700 scale-100 group-hover:scale-105" />
                            
                            {/* Dark vignette to ensure readability across all lighting conditions */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 transition-opacity duration-500 group-hover:opacity-90" />

                            {/* Floating Glassmorphic Quote Card */}
                            <div className="absolute bottom-6 left-6 right-6 translate-y-0 group-hover:-translate-y-2 transition-all duration-500 ease-out">
                                <div className="p-6 rounded-2xl bg-background/90 dark:bg-black/70 border border-white/20 dark:border-white/10 backdrop-blur-xl shadow-xl relative overflow-hidden">
                                    {/* Stylized background quote mark */}
                                    <div className="absolute -top-3 -right-2 text-primary/10 dark:text-white/5 font-serif text-8xl leading-none select-none pointer-events-none">
                                        “
                                    </div>
                                    
                                    <div className="relative z-10 flex gap-4">
                                        {/* Brand gradient vertical line */}
                                        <div className="w-1 rounded-full bg-gradient-to-b from-primary to-secondary flex-shrink-0" />
                                        
                                        <div className="flex flex-col gap-3">
                                            <p className="text-foreground dark:text-white font-medium italic text-sm md:text-base leading-relaxed tracking-tight text-balance">
                                                "True innovation happens where legacy structures end and sovereign imagination begins."
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                <p className="text-primary dark:text-secondary text-[10px] font-bold uppercase tracking-[0.2em]">
                                                    — GIIN Mandate
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
