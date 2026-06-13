'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Eye,
    ShieldCheck,
    Lightbulb,
    Heart,
    Search,
    Award,
    Users,
    TrendingUp
} from 'lucide-react';

const principles = [
    { title: "Visionary Leadership", icon: Eye, description: "Anticipating trends and setting bold targets for Africa's future." },
    { title: "Integrity", icon: ShieldCheck, description: "Operating with honesty, transparency, and high ethical standards." },
    { title: "Innovation", icon: Lightbulb, description: "Constantly challenging the status quo and embracing new ideas." },
    { title: "Service", icon: Heart, description: "Dedicated to the empowerment and upliftment of our communities." },
    { title: "Accountability", icon: Search, description: "Taking ownership of our actions and delivering on our promises." },
    { title: "Excellence", icon: Award, description: "Striving for the highest quality in everything we do." },
    { title: "Collaboration", icon: Users, description: "Harnessing the power of collective intelligence and partnerships." },
    { title: "Continuous Growth", icon: TrendingUp, description: "A lifelong commitment to learning and evolving as leaders." }
];

export default function LeadershipPhilosophy() {
    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                    <div>
                        <h2 className="text-4xl font-bold mb-6">Our Leadership Philosophy</h2>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            At GIIN, leadership is not about titles, but about the impact we create. Our philosophy is rooted in a set of core principles that guide our decision-making and interactions every single day.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
                        <div className="relative p-8 rounded-3xl bg-card border border-primary/10 backdrop-blur-xl">
                            <p className="text-2xl font-medium italic text-primary">
                                "Behind every transformational organization is a team of transformational leaders."
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {principles.map((p, i) => (
                        <motion.div
                            key={p.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                            className="group p-6 rounded-2xl bg-background border border-primary/5 hover:border-primary/30 transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <p.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {p.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
