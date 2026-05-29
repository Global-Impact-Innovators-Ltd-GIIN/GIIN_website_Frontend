"use client";

import React, { useState, useEffect } from "react";
import { AdminMetricsGrid } from "@/components/organisms/admin/AdminMetricsGrid";
import { motion, AnimatePresence } from "framer-motion";
import {
    Eye,
    Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface LoanRequest {
    id: string;
    createdAt: string;
    amount: number;
    currency: string;
    durationWeeks: number;
    borrower: {
        fullName: string;
        nationalId: string;
    };
    collateral: Array<{
        description: string;
        details?: Record<string, unknown>;
    }>;
}

export default function AdminLoanDashboard() {
    const [loans, setLoans] = useState<LoanRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedLoan, setSelectedLoan] = useState<LoanRequest | null>(null);
    const [adminNote, setAdminNote] = useState("");

    const fetchLoans = async () => {
        try {
            const res = await fetch("/api/loan/pending");
            const data = await res.json();
            if (data.success) setLoans(data.loans);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchLoans();
    }, []);

    const handleAction = async (id: string, action: string) => {
        try {
            const res = await fetch(`/api/loan/${id}/action`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action, notes: adminNote }),
            });
            if (res.ok) {
                setSelectedLoan(null);
                fetchLoans();
            }
        } catch (e) {
            console.error(e);
        }
    };

    const metrics = [
        { label: "Pending Requests", value: loans.length.toString(), trend: "+12%", color: "text-white" },
        { label: "Expected Volume", value: "8.4M RWF", trend: "+5.2%", color: "text-primary" },
        { label: "Collateral Value", value: "24.1M RWF", trend: "High Confidence", color: "text-white" },
        { label: "Risk Score", value: "92/100", trend: "Safe", color: "text-emerald-500" },
    ];

    return (
        <div className="space-y-10 p-10">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter uppercase text-white">Loan <span className="text-primary italic">Queue</span></h1>
                    <p className="text-zinc-500 text-sm mt-1">Review and process incoming capital requests.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-border/10 bg-zinc-900">Queue History</Button>
                    <Button className="bg-primary hover:bg-primary/90" onClick={fetchLoans}>Refresh System</Button>
                </div>
            </div>

            <AdminMetricsGrid metrics={metrics} />

            <div className="bg-[#111] border border-zinc-800 rounded-lg overflow-hidden">
                <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-[#151515]">
                    <h2 className="text-white font-bold text-sm tracking-widest uppercase">Incoming Requests</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="border-b border-zinc-800 bg-[#0a0a0a]">
                                <th className="p-4 text-zinc-500 font-bold tracking-wider uppercase text-[10px]">Date</th>
                                <th className="p-4 text-zinc-500 font-bold tracking-wider uppercase text-[10px]">Borrower</th>
                                <th className="p-4 text-zinc-500 font-bold tracking-wider uppercase text-[10px]">Amount</th>
                                <th className="p-4 text-zinc-500 font-bold tracking-wider uppercase text-[10px]">Duration</th>
                                <th className="p-4 text-zinc-500 font-bold tracking-wider uppercase text-[10px]">Collateral</th>
                                <th className="p-4 text-right text-zinc-500 font-bold tracking-wider uppercase text-[10px]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loans.map((loan) => (
                                <tr key={loan.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors">
                                    <td className="p-4 text-zinc-300">{new Date(loan.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span className="text-white font-bold">{loan.borrower.fullName}</span>
                                            <span className="text-[10px] text-zinc-500 tracking-wider">{loan.borrower.nationalId}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-primary font-black">{loan.amount.toLocaleString()} {loan.currency}</span>
                                    </td>
                                    <td className="p-4 text-zinc-300">{loan.durationWeeks} Weeks</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <Package className="w-3.5 h-3.5 text-zinc-500" />
                                            <span className="text-zinc-300">{loan.collateral[0]?.description || "No Data"}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        <button
                                            onClick={() => setSelectedLoan(loan)}
                                            className="text-xs bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded transition-all inline-flex items-center gap-2"
                                        >
                                            <Eye className="w-3 h-3" /> Inspect
                                        </button>
                                        <button
                                            onClick={() => handleAction(loan.id, "APPROVE")}
                                            className="text-xs bg-emerald-600/10 hover:bg-emerald-600 text-emerald-500 hover:text-white px-3 py-1.5 rounded border border-emerald-600/20 transition-all"
                                        >
                                            Approve
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {loans.length === 0 && !loading && (
                                <tr>
                                    <td colSpan={6} className="p-20 text-center text-zinc-500 italic">No pending requests found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <AnimatePresence>
                {selectedLoan && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                            onClick={() => setSelectedLoan(null)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl bg-[#0a0a0a] border border-zinc-800 rounded-[2rem] shadow-2xl overflow-hidden"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="bg-[#111] p-10 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold uppercase tracking-widest text-xs text-primary">Collateral Verification</h3>
                                        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 text-[10px] font-black tracking-widest">PENDING INSPECTION</span>
                                    </div>

                                    <div className="aspect-video bg-black rounded-2xl border border-zinc-800 flex items-center justify-center text-zinc-700 italic text-sm">
                                        Image Preview Placeholder
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between border-b border-zinc-800/50 pb-2">
                                            <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Asset</span>
                                            <span className="text-xs text-white font-bold">{selectedLoan.collateral[0]?.description}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-zinc-800/50 pb-2">
                                            <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Serial/IMEI</span>
                                            <span className="text-xs text-white font-bold">{((selectedLoan.collateral[0]?.details as Record<string, any>)?.imei as string) || "N/A"}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-10 space-y-8">
                                    <div>
                                        <h2 className="text-2xl font-black tracking-tight text-white uppercase">{selectedLoan.borrower.fullName}</h2>
                                        <p className="text-zinc-500 text-xs mt-1">Requested {selectedLoan.amount.toLocaleString()} RWF for {selectedLoan.durationWeeks} weeks.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <Label className="uppercase tracking-widest text-[10px] font-black text-zinc-500">Internal Processing Notes</Label>
                                        <textarea
                                            value={adminNote}
                                            onChange={(e) => setAdminNote(e.target.value)}
                                            placeholder="Add observations about condition, verification status..."
                                            className="w-full h-32 bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors resize-none"
                                        />
                                    </div>

                                    <div className="flex gap-4">
                                        <Button
                                            className="flex-1 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold"
                                            onClick={() => handleAction(selectedLoan.id, "APPROVE")}
                                        >
                                            Approve Loan
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            className="flex-1 h-12 rounded-xl font-bold"
                                            onClick={() => handleAction(selectedLoan.id, "REJECT")}
                                        >
                                            Reject Request
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
