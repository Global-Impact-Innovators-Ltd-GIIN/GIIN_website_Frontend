"use client";

import React from "react";
import { motion } from "framer-motion";
import { Info, Target, Users, Globe, ShieldCheck, Zap } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background text-foreground pt-32 pb-20 overflow-hidden selection:bg-accent/30 transition-colors duration-500">
            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-accent/5 dark:bg-accent/10 rounded-full blur-[150px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Hero Section */}
                <div className="max-w-4xl mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                            <Info className="w-3 h-3" />
                            Organizational Blueprint
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black text-foreground mb-8 tracking-tighter font-outfit leading-[0.9] text-balance">
                            The Story of <br /> <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">GIIN Ecosystem</span>.
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl text-balance">
                            Founded on the principles of technological sovereignty and continental unity, GIIN is more than an organization—it's Africa's collective response to the digital age.
                        </p>
                    </motion.div>
                </div>

                {/* Core Narrative */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-40">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h2 className="text-3xl font-bold text-foreground tracking-tight">A Journey of Connectivity</h2>
                        <div className="space-y-6 text-muted-foreground leading-relaxed font-light text-lg">
                            <p>
                                Our story began with a simple but radical premise: Africa does not just need more software; it needs a sovereign infrastructure that belongs to its people. We realized that by unifying top-tier talent, localized capital, and advanced engineering, we could create a network effect that standard investment models couldn't achieve.
                            </p>
                            <p>
                                From our first laboratory in Lagos to our strategic hubs in Nairobi and Cairo, GIIN has evolved into a multi-disciplinary powerhouse spanning leadership, technology, media, and defense.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-6"
                    >
                        {[
                            { icon: Target, title: "Our Mission", count: "Scale 1000+ Startups" },
                            { icon: Users, title: "Our Network", count: "50k+ Members" },
                            { icon: Globe, title: "Our Reach", count: "45 Nations" },
                            { icon: ShieldCheck, title: "Our Security", count: "Zero-Trust Mesh" },
                        ].map((item, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-card border border-border/10 backdrop-blur-3xl hover:bg-muted transition-colors group">
                                <item.icon className="w-8 h-8 text-accent mb-6 group-hover:scale-110 transition-transform" />
                                <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">{item.title}</h4>
                                <p className="text-foreground font-bold text-lg">{item.count}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Global Blueprint Section */}
                <section className="py-32 rounded-[3.5rem] bg-gradient-to-br from-primary/10 to-transparent border border-border/10 relative overflow-hidden text-center transition-colors">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[100px] rounded-full" />
                    <div className="relative z-10 max-w-3xl mx-auto px-6">
                        <h2 className="text-4xl md:text-6xl font-black text-foreground mb-8 tracking-tighter">Join the Narrative.</h2>
                        <p className="text-xl text-muted-foreground mb-12 font-light text-balance">
                            We are looking for the boldest minds across the continent to help us write the next chapters of African sovereignty.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <button className="px-10 py-5 bg-foreground text-background font-bold rounded-2xl hover:scale-105 transition-transform shadow-xl">View Careers</button>
                            <button className="px-10 py-5 bg-accent/10 border border-accent/20 text-accent font-bold rounded-2xl hover:bg-accent/20 transition-all">Investment Inquiries</button>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
