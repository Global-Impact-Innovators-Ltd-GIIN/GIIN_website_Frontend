'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Globe, Rocket } from 'lucide-react';

const stats = [
    { label: "Leadership Projects", value: "150+", icon: Rocket },
    { label: "Professionals Trained", value: "10k+", icon: Users },
    { label: "Strategic Partners", value: "25+", icon: Globe },
    { label: "Industry Awards", value: "12", icon: Trophy }
];

const milestones = [
    { year: "2023", title: "Global Innovation Summit", description: "Successfully hosted GIIN's first pan-African innovation flagship event." },
    { year: "2024", title: "Tech-Empower Initiative", description: "Launched the region's largest digital literacy program for leaders." },
    { year: "2025", title: "Ecosystem Expansion", description: "Expanded GIIN presence to 10+ countries across the continent." }
];

export default function AchievementsSection() {
    return (
        <section className="py-24 bg-primary/5 relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Leadership Achievements</h2>
                    <p className="text-muted-foreground">Building credibility through proven impact and milestones.</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center p-8 rounded-3xl bg-background border border-primary/10 shadow-xl"
                        >
                            <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <stat.icon className="w-8 h-8 text-primary" />
                            </div>
                            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
                                {stat.value}
                            </p>
                            <p className="text-muted-foreground font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        {/* Timeline Vertical Line */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent md:block hidden" />

                        <div className="space-y-12">
                            {milestones.map((ms, i) => (
                                <motion.div
                                    key={ms.year}
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className={`relative flex items-center justify-between ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col gap-8`}
                                >
                                    <div className="md:w-5/12 w-full p-6 rounded-2xl bg-card border border-primary/5 shadow-lg">
                                        <span className="text-primary font-bold text-lg mb-2 block">{ms.year}</span>
                                        <h3 className="text-xl font-bold mb-3">{ms.title}</h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">{ms.description}</p>
                                    </div>

                                    {/* Point on timeline */}
                                    <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background z-10 md:block hidden shadow-[0_0_15px_rgba(127,76,165,0.5)]" />

                                    <div className="md:w-5/12 w-0" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
