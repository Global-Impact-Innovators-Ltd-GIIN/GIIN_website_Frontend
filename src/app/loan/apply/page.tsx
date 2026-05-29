"use client";

import { motion } from "framer-motion";
import { BorrowerApplicationForm } from "@/components/organisms/loan/BorrowerApplicationForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoanApplyPage() {
    return (
        <div className="min-h-screen bg-background pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Header */}
                <div className="mb-16">
                    <Link
                        href="/loan"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
                    >
                        <div className="p-2 rounded-lg bg-muted/50 border border-border/10 group-hover:border-primary/20 transition-all">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-widest">Back to Hub</span>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 uppercase">
                            Initialize <span className="text-primary italic">Capital</span> Access
                        </h1>
                        <p className="text-muted-foreground max-w-2xl text-lg">
                            Our automated system will guide you through the process of securing
                            an innovation loan. Please ensure all details are accurate.
                        </p>
                    </motion.div>
                </div>

                <BorrowerApplicationForm />
            </div>
        </div>
    );
}
