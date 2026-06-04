"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, MessageSquare, Headphones, Mail } from "lucide-react";

export default function SupportPage() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors mb-12 uppercase tracking-widest">
                    <ArrowLeft className="w-4 h-4" />
                    Return to Portal
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-12"
                >
                    <div className="space-y-4">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                            <Headphones className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-foreground">Mission <span className="text-primary not-italic">Support</span></h1>
                        <p className="text-muted-foreground text-lg font-light leading-relaxed">
                            Facing technical hurdles in the ecosystem? Our intelligence team is standing by.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-8 rounded-[2rem] bg-card border border-border/10">
                            <MessageSquare className="w-6 h-6 text-primary mb-4" />
                            <h3 className="font-bold text-lg mb-2">Live Terminal</h3>
                            <p className="text-sm text-muted-foreground mb-6">Real-time assistance for urgent infrastructure issues.</p>
                            <button className="text-[10px] font-black uppercase tracking-widest text-primary">Initialize Chat</button>
                        </div>
                        <div className="p-8 rounded-[2rem] bg-card border border-border/10">
                            <Mail className="w-6 h-6 text-accent mb-4" />
                            <h3 className="font-bold text-lg mb-2">Secure Ticket</h3>
                            <p className="text-sm text-muted-foreground mb-6">Submit a request for non-critical account services.</p>
                            <button className="text-[10px] font-black uppercase tracking-widest text-accent">Open Ticket</button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
