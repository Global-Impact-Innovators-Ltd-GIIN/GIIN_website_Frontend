'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users } from 'lucide-react';

export default function LeadershipHero() {
    return (
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-20">
            {/* Background Decor */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse" delay-1000 />
            </div>

            <div className="container relative z-10 px-4 mx-auto">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6 text-sm font-medium">
                            <Users className="w-4 h-4" />
                            Leadership Experience
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-foreground to-white leading-tight">
                            Meet the Leaders <br />
                            <span className="text-primary italic">Building Tomorrow</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
                            GIIN is guided by visionary leaders, innovators, strategists, educators, and changemakers committed to transforming Africa through leadership, technology, innovation, and impact.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button size="lg" className="rounded-full px-8 py-6 text-lg group">
                                Meet Our Team
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg border-primary/30 hover:bg-primary/5 transition-all">
                                Explore Our Vision
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Decorative Network Graphic (Simulated) */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-30" />
        </section>
    );
}
