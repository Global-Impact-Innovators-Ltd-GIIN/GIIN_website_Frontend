'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Zap,
    Lightbulb,
    TrendingUp,
    Briefcase,
    GraduationCap,
    Video,
    Search,
    Cpu
} from 'lucide-react';

const expertises = [
    {
        title: "Leadership Development",
        icon: Zap,
        description: "Empowering the next generation of African visionaries through structured mentorship and leadership frameworks.",
        color: "from-blue-500 to-cyan-500"
    },
    {
        title: "Technology & Innovation",
        icon: Cpu,
        description: "Building cutting-edge digital solutions and fostering a culture of technological excellence.",
        color: "from-purple-500 to-indigo-500"
    },
    {
        title: "Business Strategy",
        icon: TrendingUp,
        description: "Strategic planning and execution to drive sustainable growth across the GIIN ecosystem.",
        color: "from-amber-500 to-orange-500"
    },
    {
        title: "Consulting",
        icon: Briefcase,
        description: "Providing expert guidance to organizations seeking transformational impact and operational efficiency.",
        color: "from-emerald-500 to-teal-500"
    },
    {
        title: "Education & Training",
        icon: GraduationCap,
        description: "Advancing knowledge and skills through specialized training programs and educational initiatives.",
        color: "from-rose-500 to-pink-500"
    },
    {
        title: "Multimedia & Communications",
        icon: Video,
        description: "Crafting compelling narratives and visual experiences to amplify GIIN's global mission.",
        color: "from-violet-500 to-purple-500"
    },
    {
        title: "Research & Development",
        icon: Search,
        description: "Investigating new frontiers and developing innovative methodologies for social and economic impact.",
        color: "from-sky-500 to-blue-500"
    }
];

export default function ExpertiseSection() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mb-16">
                    <h2 className="text-4xl font-bold mb-6">Leadership Expertise</h2>
                    <p className="text-xl text-muted-foreground">
                        Our leadership team brings together a diverse range of expertise, working in harmony to drive innovation across all our focus areas.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {expertises.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-2xl bg-card border border-primary/10 hover:border-primary/40 transition-all group"
                        >
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} p-3 mb-6 transform group-hover:rotate-6 transition-transform shadow-lg`}>
                                <item.icon className="w-full h-full text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
