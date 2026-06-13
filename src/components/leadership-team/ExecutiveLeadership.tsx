'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Linkedin, Twitter, Mail, ExternalLink } from 'lucide-react';

const leaders = [
    {
        name: "Dr. Mensah Q. Suku Jr",
        role: "Founder / Chairperson",
        expertise: "Visionary Leadership & Innovation",
        bio: "A transformational leader dedicated to building Africa's innovation ecosystem through strategic empowerment and technology.",
        image: "/images/leaders/founder.png",
        links: { linkedin: "#", twitter: "#", email: "mensah@giin.africa" }
    },
    {
        name: "Aisha Kamara",
        role: "Managing Director",
        expertise: "Operations & Business Strategy",
        bio: "Driving organizational excellence and operational growth across GIIN's diverse divisions with a focus on sustainable impact.",
        image: "/images/leaders/md.png",
        links: { linkedin: "#", twitter: "#", email: "aisha@giin.africa" }
    },
    {
        name: "Samuel Osei",
        role: "Chief Technology Officer",
        expertise: "Technology & Software Architecture",
        bio: "Spearheading the technological evolution of GIIN's digital ecosystem, from AI agents to advanced web platforms.",
        image: "/images/leaders/cto.png",
        links: { linkedin: "#", twitter: "#", email: "samuel@giin.africa" }
    }
];

export default function ExecutiveLeadership() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Executive Leadership</h2>
                    <div className="h-1 w-20 bg-primary rounded-full mb-6" />
                    <p className="text-muted-foreground max-w-2xl">
                        Meet the pioneering minds steering GIIN towards its mission of global impact and collective innovation.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {leaders.map((leader, index) => (
                        <motion.div
                            key={leader.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="relative overflow-hidden rounded-2xl bg-card border border-primary/10 hover:border-primary/30 transition-all duration-500 backdrop-blur-sm">
                                {/* Image Wrap */}
                                <div className="relative h-[400px] w-full overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                                    <Image
                                        src={leader.image}
                                        alt={leader.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="bg-background/80 backdrop-blur-md p-6 rounded-xl border border-white/5 shadow-2xl">
                                        <span className="text-primary text-sm font-semibold mb-2 block">{leader.role}</span>
                                        <h3 className="text-xl font-bold mb-1">{leader.name}</h3>
                                        <p className="text-xs text-accent mb-4 font-medium uppercase tracking-wider">{leader.expertise}</p>

                                        <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                                            <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                                                {leader.bio}
                                            </p>

                                            <div className="flex items-center gap-4">
                                                <a href={leader.links.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
                                                    <Linkedin className="w-5 h-5" />
                                                </a>
                                                <a href={leader.links.twitter} className="text-muted-foreground hover:text-primary transition-colors">
                                                    <Twitter className="w-5 h-5" />
                                                </a>
                                                <a href={`mailto:${leader.links.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                                                    <Mail className="w-5 h-5" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Glow Effect */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500 z-0" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
