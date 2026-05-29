"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Shield, FileText, Lock } from "lucide-react";

export default function TermsPage() {
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
                            <FileText className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-foreground">Terms of <span className="text-primary not-italic">Service</span></h1>
                        <p className="text-muted-foreground text-lg font-light leading-relaxed">
                            Last updated: May 2026. The following terms govern your access to the GIIN Sovereign Ecosystem.
                        </p>
                    </div>

                    <div className="grid gap-12 text-muted-foreground">
                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-foreground uppercase tracking-widest">1. Network Access</h2>
                            <p>Access to GIIN nodes, intelligence services, and financial protocols is reserved for authorized personnel. Unauthorized access attempts are monitored and logged.</p>
                        </section>
                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-foreground uppercase tracking-widest">2. Data Sovereignty</h2>
                            <p>Users maintain ownership of their individual identifiers, though strategic metadata generated through platform interaction remains part of the GIIN aggregate intelligence layer.</p>
                        </section>
                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-foreground uppercase tracking-widest">3. Acceptable Use</h2>
                            <p>The network may not be used for activities that undermine continental security, violate sovereign data laws, or infringe upon the intellectual architecture of other network members.</p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
