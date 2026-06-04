"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Wallet,
    Receipt,
    CheckCircle2,
    CreditCard,
    Banknote,
    Navigation,
    Activity,
    ArrowRight,
    Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Loan {
    id: string;
    status: string;
    amount: number;
    outstandingBalance: number;
    totalRepayment: number;
    borrower: {
        fullName: string;
        nationalId: string;
    };
}

export default function CashierDashboard() {
    const [searchId, setSearchId] = useState("");
    const [loan, setLoan] = useState<Loan | null>(null);
    const [loading, setLoading] = useState(false);
    const [repaymentAmount, setRepaymentAmount] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const lookupLoan = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/loan/active");
            const data = await res.json();
            const found = data.loans.find((l: { id: string; borrower: { nationalId: string; fullName: string } }) =>
                l.id.includes(searchId) ||
                l.borrower.nationalId.includes(searchId) ||
                l.borrower.fullName.toLowerCase().includes(searchId.toLowerCase())
            );
            setLoan(found);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleRepay = async () => {
        if (!loan || !repaymentAmount) return;
        try {
            const res = await fetch(`/api/loan/${loan.id}/repay`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: Number(repaymentAmount),
                    paymentMethod: "CASH",
                    reference: "CASH-DESK-" + Date.now()
                }),
            });
            if (res.ok) {
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    setLoan(null);
                    setSearchId("");
                    setRepaymentAmount("");
                }, 3000);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-10 space-y-12">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter uppercase text-white">Cashier <span className="text-primary italic">Terminal</span></h1>
                    <p className="text-zinc-500 text-sm mt-1">Sovereign transactions and real-time ledger settlement.</p>
                </div>
                <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 block">Session Status</span>
                    <span className="text-emerald-500 font-bold flex items-center gap-2 justify-end">
                        <Activity className="w-3 h-3" /> LIVE SETTLEMENT
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-1 space-y-6">
                    <div className="p-8 rounded-[2rem] bg-[#111] border border-zinc-800 space-y-6">
                        <h3 className="font-bold text-sm uppercase tracking-widest text-zinc-500">Loan Lookup</h3>
                        <div className="space-y-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                                <Input
                                    placeholder="ID / Name / National ID"
                                    className="pl-10 h-12 bg-black border-zinc-800 focus:border-primary/50"
                                    value={searchId}
                                    onChange={(e) => setSearchId(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && lookupLoan()}
                                />
                            </div>
                            <Button
                                onClick={lookupLoan}
                                className="w-full h-12 bg-primary hover:bg-primary/90 font-bold uppercase tracking-widest text-[10px]"
                                disabled={loading}
                            >
                                {loading ? "Searching..." : "Sync Details"}
                            </Button>
                        </div>
                    </div>

                    <div className="p-8 rounded-[2rem] bg-amber-500/5 border border-amber-500/20 text-amber-500 flex items-start gap-4">
                        <Wallet className="w-6 h-6 shrink-0 mt-1" />
                        <div>
                            <p className="text-xs font-bold leading-relaxed">
                                Ensure physical identification is verified before processing any cash transactions.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    {loan ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-10 rounded-[2.5rem] bg-[#111] border border-zinc-800 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Navigation size={200} className="text-primary" />
                            </div>

                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-zinc-800 pb-8 relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black text-2xl">
                                        {loan.borrower.fullName.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black tracking-tight text-white uppercase">{loan.borrower.fullName}</h2>
                                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{loan.borrower.nationalId}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Loan Balance</span>
                                    <p className="text-4xl font-black text-primary tracking-tighter">{loan.outstandingBalance.toLocaleString()} RWF</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-xl bg-black border border-zinc-800">
                                            <span className="text-[10px] font-bold text-zinc-600 block mb-1">LOAN ID</span>
                                            <span className="text-xs text-white font-mono break-all">{loan.id.slice(-8)}</span>
                                        </div>
                                        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                                            <span className="text-[10px] font-bold text-emerald-500/50 block mb-1">STATUS</span>
                                            <span className="text-xs text-emerald-500 font-black tracking-widest">{loan.status}</span>
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                                        <h4 className="text-xs font-black uppercase text-zinc-500 mb-4 tracking-widest">Payment Method</h4>
                                        <div className="grid grid-cols-3 gap-3">
                                            <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-primary text-primary-foreground font-bold border border-white/10">
                                                <Banknote className="w-5 h-5" />
                                                <span className="text-[10px]">CASH</span>
                                            </button>
                                            <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-black border border-zinc-800 text-zinc-500 hover:border-primary/50 transition-all font-bold">
                                                <Smartphone className="w-5 h-5" />
                                                <span className="text-[10px]">MOMO</span>
                                            </button>
                                            <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-black border border-zinc-800 text-zinc-500 hover:border-primary/50 transition-all font-bold">
                                                <CreditCard className="w-5 h-5" />
                                                <span className="text-[10px]">BANK</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Repayment Amount (RWF)</Label>
                                        <Input
                                            type="number"
                                            value={repaymentAmount}
                                            onChange={(e) => setRepaymentAmount(e.target.value)}
                                            placeholder="0.00"
                                            className="h-16 text-3xl font-black bg-black border-zinc-800 text-white focus:border-primary transition-all text-center"
                                        />
                                    </div>

                                    <Button
                                        onClick={handleRepay}
                                        disabled={!repaymentAmount || Number(repaymentAmount) <= 0}
                                        className="w-full h-16 bg-foreground text-background hover:bg-foreground/90 font-black uppercase tracking-widest text-sm shadow-2xl group"
                                    >
                                        Confirm Settlement
                                        <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </div>
                            </div>

                            <AnimatePresence>
                                {isSuccess && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute inset-0 z-20 bg-primary/95 flex flex-col items-center justify-center text-primary-foreground p-10 text-center"
                                    >
                                        <CheckCircle2 size={100} className="mb-6 animate-bounce" />
                                        <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">Payment Settled</h2>
                                        <p className="text-xl font-medium opacity-80 mb-10">Ledger successfully updated in live system.</p>
                                        <div className="flex gap-4">
                                            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 font-bold uppercase h-12 px-8">Print Receipt</Button>
                                            <Button className="bg-white text-primary hover:bg-zinc-100 font-bold uppercase h-12 px-8" onClick={() => setIsSuccess(false)}>Next Transaction</Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <div className="h-full min-h-[500px] rounded-[2.5rem] border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center gap-6 p-20 text-center">
                            <div className="p-6 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-700">
                                <Receipt size={64} />
                            </div>
                            <div>
                                <h3 className="text-zinc-500 font-bold text-xl uppercase tracking-widest">Waiting for Data Sync</h3>
                                <p className="text-zinc-700 max-w-sm mt-3">Search for a borrower on the left to begin transaction processing.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
