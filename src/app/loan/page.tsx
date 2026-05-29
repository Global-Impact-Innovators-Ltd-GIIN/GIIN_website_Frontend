"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoanCalculator } from "@/components/organisms/loan/LoanCalculator";

export default function LoanLandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(126,34,206,0.1),transparent_70%)]" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="text-left max-w-3xl">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider mb-6 inline-block">
                                    Sovereign Capital Solutions
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-primary/60"
                            >
                                EMPOWERING INNOVATORS WITH CAPITAL
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl"
                            >
                                Fast, secure, and transparent loan services designed for the next generation of African pioneers.
                                Get the funding you need with collateral-backed solutions tailored for your growth journey.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="flex flex-wrap items-center gap-4"
                            >
                                <Link href="/loan/apply">
                                    <Button size="lg" className="rounded-xl px-8 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold group">
                                        Apply for Loan
                                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                                <Link href="#how-it-works">
                                    <Button variant="outline" size="lg" className="rounded-xl px-8 h-12 border-primary/20 hover:bg-primary/5 font-bold">
                                        How it Works
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-3xl opacity-20 animate-pulse" />
                            <LoanCalculator />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="how-it-works" className="py-20 bg-muted/30">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Zap className="w-10 h-10 text-primary" />,
                                title: "Instant Approval",
                                description: "Automated verification system ensures your request is processed in record time."
                            },
                            {
                                icon: <ShieldCheck className="w-10 h-10 text-primary" />,
                                title: "Secure Collateral",
                                description: "Industry-standard encryption and physical security for all your pledged assets."
                            },
                            {
                                icon: <Globe className="w-10 h-10 text-primary" />,
                                title: "Flexible Currencies",
                                description: "Access funding in RWF or USD with competitive exchange rates."
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="p-8 rounded-2xl border border-border/10 bg-card/50 backdrop-blur-sm hover:border-primary/20 transition-all"
                            >
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background p-12 md:p-20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <ShieldCheck size={300} className="text-primary" />
                        </div>

                        <div className="max-w-2xl relative z-10">
                            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight uppercase">READY TO SCALE YOUR IMPACT?</h2>
                            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                                Join thousands of innovators who have used GIIN Capital to fuel their growth.
                                Transparent terms. No hidden fees. Pure innovation.
                            </p>
                            <Link href="/loan/apply">
                                <Button size="lg" className="rounded-xl px-10 h-14 bg-foreground text-background hover:bg-foreground/90 font-bold text-lg">
                                    Launch Application
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
