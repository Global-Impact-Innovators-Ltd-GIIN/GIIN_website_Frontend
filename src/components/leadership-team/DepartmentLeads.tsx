'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3,
    Code2,
    Lightbulb,
    GraduationCap,
    Megaphone,
    Microscope,
    ArrowRight
} from 'lucide-react';

const departments = [
    {
        name: "Leadership Development",
        lead: "Sarah Jenkins",
        icon: Lightbulb,
        responsibilities: ["Executive Mentorship", "Youth Leadership Initiatives", "Corporate Training"],
        goals: "Building 10,000 new African leaders by 2030."
    },
    {
        name: "Technology Solutions",
        lead: "Samuel Osei",
        icon: Code2,
        responsibilities: ["Digital Infrastructure", "AI & Automation", "Product Development"],
        goals: "Creating scalable platforms for socio-economic growth."
    },
    {
        name: "Business Consulting",
        lead: "Aisha Kamara",
        icon: BarChart3,
        responsibilities: ["SME Scale-up", "Market Entry Strategy", "Operational Optimization"],
        goals: "Empowering 500+ businesses across the continent."
    },
    {
        name: "Education & Training",
        icon: GraduationCap,
        lead: "Prof. Kofi Mensah",
        responsibilities: ["Curriculum Design", "Vocational Training", "Digital Academy"],
        goals: "Standardizing innovation education globally."
    },
    {
        name: "Media & Communications",
        lead: "Elena Rossi",
        icon: Megaphone,
        responsibilities: ["Brand Storytelling", "Global PR", "Digital Content Strategy"],
        goals: "Amplifying local innovations to a global audience."
    },
    {
        name: "Research & Innovation",
        lead: "Dr. David Wu",
        icon: Microscope,
        responsibilities: ["Trend Forecasting", "Impact Studies", "Novel Methodologies"],
        goals: "Providing data-driven insights for impact."
    }
];

export default function DepartmentLeads() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl font-bold mb-4">Meet Our Departments</h2>
                        <p className="text-muted-foreground text-lg">Our specialized divisions work collaboratively to deliver the full spectrum of the GIIN mission.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {departments.map((dept, index) => (
                        <motion.div
                            key={dept.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 rounded-3xl bg-card border border-primary/10 hover:border-primary/40 transition-all group flex flex-col h-full"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <dept.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">{dept.name}</h3>
                                    <p className="text-sm text-accent">Lead: {dept.lead}</p>
                                </div>
                            </div>

                            <div className="space-y-6 flex-1">
                                <div>
                                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">Key Responsibilities</h4>
                                    <ul className="space-y-2">
                                        {dept.responsibilities.map((res) => (
                                            <li key={res} className="flex items-center gap-2 text-sm">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                                                {res}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">Strategic Goals</h4>
                                    <p className="text-sm italic text-muted-foreground leading-relaxed">{dept.goals}</p>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-primary/5 flex items-center justify-between group-hover:text-primary transition-colors cursor-pointer">
                                <span className="font-semibold text-sm">Learn More</span>
                                <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
