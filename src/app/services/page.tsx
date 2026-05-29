"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Cpu, Globe, GraduationCap, ShieldAlert, Sparkles } from "lucide-react";

const SERVICES = [
    {
        title: "Technology Solutions",
        desc: "Enterprise application engineering and system integrations.",
        href: "/technology",
        icon: Cpu
    },
    {
        title: "Capital & Loans",
        desc: "Sovereign innovation funding and micro-credit ecosystem.",
        href: "/loan",
        icon: Sparkles
    },
    {
        title: "Leadership Academy",
        desc: "Elite training programs for the next generation of pioneers.",
        href: "/leadership",
        icon: GraduationCap
    },
    {
        title: "Cyber Defense",
        desc: "Critical infrastructure protection and security operations.",
        href: "/cyber",
        icon: ShieldAlert
    },
    {
        title: "Research & Data",
        desc: "Strategic insights driving continental transformation.",
        href: "/research",
        icon: Globe
    }
];

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-20">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mb-20">
                    <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6">
                        Our Solutions
                    </span>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 italic">
                        SOVEREIGN <br /> SYSTEMS.
                    </h1>
                    <p className="text-xl text-muted-foreground font-light max-w-2xl leading-relaxed">
                        GIIN provides a multi-disciplinary stack of services designed to solve Africa's most complex challenges through engineering and leadership.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SERVICES.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link
                                href={service.href}
                                className="group block p-8 rounded-[2.5rem] bg-card border border-border/10 hover:border-primary/50 transition-all h-full relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-8 text-primary/5 group-hover:text-primary/20 transition-colors">
                                    <service.icon className="w-24 h-24" />
                                </div>
                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                        <service.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 tracking-tight">{service.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                                        {service.desc}
                                    </p>
                                    <div className="flex items-center text-xs font-black uppercase tracking-widest text-primary gap-2">
                                        Explore Solution <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
