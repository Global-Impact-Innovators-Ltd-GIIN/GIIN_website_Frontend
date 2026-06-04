"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, Clock, CheckCircle2, XCircle, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function TrackingPage() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState("");

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setResult(null);

        try {
            const res = await fetch(`/api/loan/track?query=${encodeURIComponent(query)}`);
            const data = await res.json();

            if (res.ok) {
                setResult(data);
            } else {
                setError(data.error || "Application not found.");
            }
        } catch (err) {
            setError("Security network failure. Retry connection.");
        } finally {
            setLoading(false);
        }
    };

    const getStatusConfig = (status: string) => {
        switch (status) {
            case "PENDING":
                return { icon: <Clock className="w-8 h-8 text-amber-500" />, label: "Under Review", bg: "bg-amber-500/10", border: "border-amber-500/20" };
            case "APPROVED":
                return { icon: <CheckCircle2 className="w-8 h-8 text-emerald-500" />, label: "Approved (Awaiting Collection)", bg: "bg-emerald-500/10", border: "border-emerald-500/20" };
            case "ACTIVE":
                return { icon: <CheckCircle2 className="w-8 h-8 text-primary" />, label: "Funds Disbursed", bg: "bg-primary/10", border: "border-primary/20" };
            case "REJECTED":
                return { icon: <XCircle className="w-8 h-8 text-red-500" />, label: "Application Rejected", bg: "bg-red-500/10", border: "border-red-500/20" };
            default:
                return { icon: <AlertCircle className="w-8 h-8 text-muted-foreground" />, label: status, bg: "bg-white/5", border: "border-white/5" };
        }
    };

    return (
        <div className="min-h-screen bg-background pt-32 pb-20 px-6">
            <div className="max-w-2xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <span className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6 inline-block">
                        Real-time Protocol Tracking
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic font-outfit mb-4">
                        Monitor Your <span className="text-primary not-italic">Capital Status</span>
                    </h1>
                    <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
                        Enter your application identifier or registered mobile number to view the current verification stage.
                    </p>
                </motion.div>

                <form onSubmit={handleSearch} className="relative group mb-16">
                    <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-0 group-focus-within:opacity-30 transition-opacity" />
                    <div className="relative flex gap-3 p-2 bg-white/5 backdrop-blur-2xl border border-white/5 rounded-3xl">
                        <div className="pl-4 flex items-center text-muted-foreground">
                            <Search className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            placeholder="GIIN-APP-2026-..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="bg-transparent border-none focus:ring-0 text-foreground flex-1 h-14 text-lg font-mono tracking-widest placeholder:text-muted-foreground/30"
                        />
                        <Button type="submit" disabled={loading} className="rounded-2xl h-14 px-8 bg-primary hover:bg-primary/90 text-white font-black uppercase text-[10px] tracking-widest">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify Status"}
                        </Button>
                    </div>
                </form>

                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="p-8 rounded-3xl border border-red-500/20 bg-red-500/5 text-red-400 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-4"
                        >
                            <AlertCircle className="w-6 h-6" />
                            {error}
                        </motion.div>
                    )}

                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={cn(
                                "p-10 rounded-[3rem] border backdrop-blur-3xl text-left relative overflow-hidden",
                                getStatusConfig(result.status).bg,
                                getStatusConfig(result.status).border
                            )}
                        >
                            <div className="flex flex-col md:flex-row justify-between gap-8 relative z-10">
                                <div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md">
                                            {getStatusConfig(result.status).icon}
                                        </div>
                                        <div>
                                            <span className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Current Protocol</span>
                                            <h2 className="text-2xl font-black tracking-tight font-outfit text-white uppercase italic">{getStatusConfig(result.status).label}</h2>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center w-full max-w-xs text-xs">
                                            <span className="text-muted-foreground uppercase tracking-widest font-bold">Applicant</span>
                                            <span className="text-white font-black">{result.borrower.fullName}</span>
                                        </div>
                                        <div className="flex justify-between items-center w-full max-w-xs text-xs">
                                            <span className="text-muted-foreground uppercase tracking-widest font-bold">Principal</span>
                                            <span className="text-white font-black">{result.principalAmount.toLocaleString()} RWF</span>
                                        </div>
                                        <div className="flex justify-between items-center w-full max-w-xs text-xs">
                                            <span className="text-muted-foreground uppercase tracking-widest font-bold">Submission</span>
                                            <span className="text-white font-black">{new Date(result.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:w-64 space-y-4">
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                        <span className="block text-[8px] font-black uppercase tracking-widest text-muted-foreground mb-2">Instructions</span>
                                        <p className="text-[10px] leading-relaxed text-muted-foreground">
                                            {result.status === "PENDING" && "Please ensure your phone is on. A loan officer will call you to schedule collateral inspection."}
                                            {result.status === "APPROVED" && "Identification verification successful. Visit our nearest branch to drop off collateral and receive funds."}
                                            {result.status === "ACTIVE" && "Loan is active. Ensure repayments are made before the due date to avoid penalties."}
                                        </p>
                                    </div>
                                    {result.status === "APPROVED" && (
                                        <Link href="/loan/branches">
                                            <Button className="w-full h-12 rounded-xl bg-white text-black font-black uppercase text-[10px] tracking-widest gap-2">
                                                Find Branch <ArrowRight className="w-3 h-3" />
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

const cn = (...classes: any) => classes.filter(Boolean).join(" ");
