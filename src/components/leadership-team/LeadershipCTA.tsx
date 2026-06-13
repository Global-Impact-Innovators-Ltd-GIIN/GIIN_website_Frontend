'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe, Users, Phone } from 'lucide-react';

export default function LeadershipCTA() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Dynamic Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-primary/10 blur-[150px] rounded-full opacity-30" />

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                        Leadership Creates the <span className="text-primary italic">Future</span>
                    </h2>
                    <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                        Our leadership team is just the beginning. Join us in our mission to reshape the innovation landscape and deliver transformational impact across Africa.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Button size="lg" className="rounded-full px-10 py-8 text-xl font-bold group bg-primary hover:bg-primary/90">
                            <Globe className="mr-3 w-6 h-6" />
                            Explore Ecosystem
                            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </Button>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" variant="outline" className="rounded-full px-8 py-7 border-primary/30 hover:bg-primary/5">
                                <Users className="mr-2 w-5 h-5" />
                                Partner With Us
                            </Button>
                            <Button size="lg" variant="ghost" className="rounded-full px-8 py-7 text-muted-foreground hover:text-primary">
                                <Phone className="mr-2 w-5 h-5" />
                                Contact GIIN
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
