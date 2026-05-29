"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPage() {
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
                        <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                            <Shield className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-foreground">Data <span className="text-accent not-italic">Privacy</span></h1>
                        <p className="text-muted-foreground text-lg font-light leading-relaxed">
                            Our privacy framework is built on the principle of sovereign data control.
                        </p>
                    </div>

                    <div className="grid gap-12 text-muted-foreground">
                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-foreground uppercase tracking-widest">Digital Identity</h2>
                            <p>We do not sell user data. Your enterprise identity is used exclusively to facilitate access to the services you requested.</p>
                        </section>
                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-foreground uppercase tracking-widest">Encrypted Storage</h2>
                            <p>All sensitive credentials and PII are stored using military-grade encryption protocols and distributed across our decentralized node network.</p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
