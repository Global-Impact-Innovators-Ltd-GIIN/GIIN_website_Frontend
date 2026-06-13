'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, Heart, Lightbulb, TrendingUp, Shield } from 'lucide-react';

const cultureItems = [
    {
        title: "Leading by Example",
        icon: Shield,
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800", // Generic placeholder for culture
        description: "Our leaders are on the front lines, embodying the values they preach."
    },
    {
        title: "Empowering Others",
        icon: Users,
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
        description: "We don't just lead; we create platforms for others to rise and shine."
    },
    {
        title: "Driving Innovation",
        icon: Lightbulb,
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
        description: "A culture that celebrates curiosity and rewards bold experimentation."
    }
];

export default function LeadershipCulture() {
    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-4">
                <div className="mb-16">
                    <h2 className="text-4xl font-bold mb-4">Leadership Culture</h2>
                    <p className="text-muted-foreground text-lg">What leadership truly means within the GIIN ecosystem.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {cultureItems.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
                        >
                            {/* Image Background */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${item.image})` }}
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#06040d] via-[#06040d]/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                            {/* Content */}
                            <div className="absolute inset-0 p-10 flex flex-col justify-end">
                                <div className="w-14 h-14 rounded-2xl bg-primary/20 backdrop-blur-md flex items-center justify-center mb-6 border border-white/10 group-hover:bg-primary transition-colors">
                                    <item.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold mb-4 leading-tight">{item.title}</h3>
                                <p className="text-muted-foreground group-hover:text-white transition-colors">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { icon: Sparkles, label: "Creating Opportunities" },
                        { icon: Heart, label: "Serving Communities" },
                        { icon: TrendingUp, label: "Building Future Leaders" }
                    ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-primary/5">
                            <div className="p-3 rounded-xl bg-accent/10 text-accent">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <span className="font-bold text-lg">{feature.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
