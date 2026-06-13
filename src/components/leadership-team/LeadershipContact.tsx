'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, Mail, Handshake, Mic, MessageSquare } from 'lucide-react';

const contactTypes = [
    { label: "General Inquiries", icon: Mail, desc: "General questions about leadership." },
    { label: "Partnership Discussions", icon: Handshake, desc: "Collaborate on strategic initiatives." },
    { label: "Speaking Engagements", icon: Mic, desc: "Request leadership for your event." },
    { label: "Strategic Consultations", icon: Calendar, desc: "One-on-one leadership consultation." },
    { label: "Media Requests", icon: MessageSquare, desc: "Inquiries related to press and media." }
];

export default function LeadershipContact() {
    return (
        <section className="py-24 bg-primary/5 rounded-[3rem] mx-4 mb-24 overflow-hidden border border-primary/10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-primary font-bold tracking-widest uppercase mb-4 block">Connect with our visionaries</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to engage with GIIN Leadership?</h2>
                        <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                            We are open to strategic collaborations, speaking opportunities, and consultative engagements that align with our mission to transform Africa.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" className="rounded-full px-8 py-6 text-lg">
                                Schedule Consultation
                            </Button>
                            <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg">
                                Contact Leadership Team
                            </Button>
                        </div>

                        <div className="mt-8">
                            <p className="text-sm text-accent font-medium flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                Response time: Typically within 48 hours
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {contactTypes.map((type) => (
                            <motion.div
                                key={type.label}
                                whileHover={{ x: 5 }}
                                className="p-6 rounded-2xl bg-background border border-primary/5 hover:border-primary/30 transition-all cursor-pointer"
                            >
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                                    <type.icon className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold mb-2">{type.label}</h3>
                                <p className="text-xs text-muted-foreground">{type.desc}</p>
                            </motion.div>
                        ))}
                        <div className="p-6 rounded-2xl bg-primary flex flex-col justify-center text-white cursor-pointer group">
                            <h3 className="font-bold mb-2">Become a Partner</h3>
                            <p className="text-xs opacity-80 mb-4">Join our network of impact.</p>
                            <div className="text-sm font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                                Get Started <div className="h-0.5 w-4 bg-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
