"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Loader2,
    Mail,
    HelpCircle,
    AlertCircle,
    CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Mocking for now as we don't have a forgot password API yet
            await new Promise(resolve => setTimeout(resolve, 2000));
            if (!email.includes("@")) throw new Error("Invalid network identifier format");
            setIsSuccess(true);
        } catch (err: any) {
            setError(err.message || "Unable to process request. Please contact GIIN support.");
        } finally {
            setLoading(false);
        }
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    if (isSuccess) {
        return (
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-card/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-10 text-center space-y-8"
            >
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <div className="space-y-4">
                    <h2 className="text-3xl font-black text-foreground tracking-tighter uppercase italic">Link <span className="text-primary not-italic">Broadcasted</span></h2>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-[280px] mx-auto">
                        Recovery instructions have been dispatched to {email}. Check your terminal for further action.
                    </p>
                </div>
                <div className="pt-4">
                    <Link href="/auth/login" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:text-white transition-all group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Authentication
                    </Link>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-card/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] relative overflow-hidden group"
        >
            <div className="relative z-10">
                <motion.div variants={itemVariants} className="mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                        <HelpCircle className="w-3 h-3" />
                        Identity Recovery
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3 tracking-tighter italic font-outfit uppercase">
                        Recover <span className="text-accent not-italic">Access</span>
                    </h2>
                    <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-[280px]">
                        Provide your network identifier to receive a secure recovery sequence.
                    </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <motion.div variants={itemVariants} className="space-y-2 group">
                        <label className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.2em] pl-1">Command Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-accent transition-all duration-300">
                                <Mail className="w-5 h-5" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-14 pr-5 py-5 text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:border-accent/40 focus:bg-white/[0.05] transition-all duration-300 shadow-inner"
                                placeholder="operator@giin.tech"
                                required
                            />
                        </div>
                    </motion.div>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="p-4 bg-destructive/10 border border-destructive/20 rounded-2xl text-destructive text-xs font-bold flex items-center gap-4"
                            >
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.button
                        variants={itemVariants}
                        type="submit"
                        disabled={loading}
                        className="group relative w-full h-16 overflow-hidden rounded-[1.25rem] transition-all active:scale-95 disabled:opacity-50"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary" />
                        <div className="relative h-full flex items-center justify-center gap-3 bg-card/60 backdrop-blur-md m-[1px] rounded-[calc(1.25rem-1px)] transition-all group-hover:bg-transparent">
                            {loading ? (
                                <div className="flex items-center gap-3">
                                    <Loader2 className="w-5 h-5 animate-spin text-accent" />
                                    <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">Broadcasting...</span>
                                </div>
                            ) : (
                                <span className="text-xs font-black text-foreground uppercase tracking-[0.3em] group-hover:text-white transition-colors">Dispatch Recovery</span>
                            )}
                        </div>
                    </motion.button>
                </form>

                <motion.div variants={itemVariants} className="mt-12 text-center">
                    <Link href="/auth/login" className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] hover:text-white transition-colors flex items-center justify-center gap-2">
                        <ArrowLeft className="w-3 h-3" />
                        Wait, I remember my passkey
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    );
}
