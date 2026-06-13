'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const advisors = [
    {
        name: "Sir Richard Branson",
        role: "Strategic Global Advisor",
        note: "Providing cross-border innovation insights and entrepreneurial mentorship.",
        company: "Virgin Group"
    },
    {
        name: "Dr. Ngozi Okonjo-Iweala",
        role: "Economic & Impact Council",
        note: "Advising on large-scale economic transformation and international trade.",
        company: "WTO"
    },
    {
        name: "Elon Musk",
        role: "Technology Innovation Board",
        note: "Consulting on AI development and space-tech integration in Africa.",
        company: "SpaceX / Tesla"
    }
];

export default function AdvisoryBoard() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Advisory Board & Council</h2>
                    <p className="text-muted-foreground max-w-2xl">
                        Our strategic council consists of world-class leaders and experts who provide high-level guidance to GIIN&apos;s executive team.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {advisors.map((advisor, index) => (
                        <motion.div
                            key={advisor.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 rounded-3xl bg-secondary/5 border border-secondary/10 hover:border-secondary/30 transition-all relative group"
                        >
                            <Quote className="absolute top-6 right-8 w-12 h-12 text-secondary/10 group-hover:text-secondary/20 transition-colors" />

                            <div className="mb-6">
                                <h3 className="text-xl font-bold mb-1">{advisor.name}</h3>
                                <p className="text-sm text-secondary font-semibold">{advisor.role}</p>
                                <p className="text-xs text-muted-foreground uppercase tracking-widest">{advisor.company}</p>
                            </div>

                            <p className="text-muted-foreground italic leading-relaxed text-sm">
                                &quot;{advisor.note}&quot;
                            </p>

                            <div className="mt-8 flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <div key={star} className="w-1.5 h-1.5 rounded-full bg-secondary/30" />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 p-8 rounded-2xl border border-dashed border-primary/20 text-center">
                    <p className="text-muted-foreground text-sm">
                        We are continuously expanding our council with global industry experts. <span className="text-primary font-semibold cursor-pointer hover:underline">Apply to join our advisory board.</span>
                    </p>
                </div>
            </div>
        </section>
    );
}
