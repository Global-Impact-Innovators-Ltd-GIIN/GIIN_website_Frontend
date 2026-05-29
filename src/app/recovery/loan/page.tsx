"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    ShieldAlert,
    Phone,
    CheckCircle2,
    Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OverdueLoan {
    id: string;
    dueDate: string;
    status: string;
    outstandingBalance: number;
    totalRepayment: number;
    borrower: {
        fullName: string;
        phone: string;
    };
}

export default function RecoveryDashboard() {
    const [overdueLoans, setOverdueLoans] = useState<OverdueLoan[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOverdue = async () => {
        try {
            const res = await fetch("/api/loan/active");
            const data = await res.json();
            if (data.success) {
                setOverdueLoans(data.loans.filter((l: { status: string }) => l.status === "OVERDUE" || l.status === "PARTIAL"));
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchOverdue();
    }, []);

    return (
        <div className="p-10 space-y-12">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter uppercase text-white">Recovery <span className="text-red-500 italic">Operations</span></h1>
                    <p className="text-zinc-500 text-sm mt-1">Strategic asset retrieval and risk mitigation intelligence.</p>
                </div>
                <div className="flex gap-4">
                    <div className="px-6 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex flex-col items-end">
                        <span className="text-[10px] font-black uppercase tracking-widest leading-none">Capital at Risk</span>
                        <span className="text-2xl font-black tracking-tighter leading-none mt-1 uppercase">2.1M RWF</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {overdueLoans.map((loan) => (
                    <motion.div
                        key={loan.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-8 rounded-[2rem] bg-[#111] border border-red-500/10 hover:border-red-500/30 transition-all group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <ShieldAlert size={100} className="text-red-500" />
                        </div>

                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-500 font-black">
                                {loan.borrower.fullName.charAt(0)}
                            </div>
                            <div className="text-right">
                                <span className={cn(
                                    "px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-[0.2em]",
                                    loan.status === "OVERDUE" ? "bg-red-500 text-white" : "bg-amber-500 text-black"
                                )}>
                                    {loan.status}
                                </span>
                                <p className="text-xs text-zinc-600 mt-1 font-bold">DUE {new Date(loan.dueDate).toLocaleDateString()}</p>
                            </div>
                        </div>

                        <div className="space-y-6 relative z-10">
                            <div>
                                <h3 className="text-lg font-black tracking-tight text-white uppercase">{loan.borrower.fullName}</h3>
                                <div className="flex items-center gap-2 text-zinc-500 text-xs mt-1">
                                    <Phone className="w-3 h-3" /> {loan.borrower.phone}
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-black border border-white/5 space-y-3">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-zinc-600 font-bold uppercase tracking-wider">Outstanding</span>
                                    <span className="text-red-500 font-black tracking-tight">{loan.outstandingBalance.toLocaleString()} RWF</span>
                                </div>
                                <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                                    <div
                                        className="bg-red-500 h-full"
                                        style={{ width: `${(loan.outstandingBalance / (loan.totalRepayment || 1)) * 100}%` }}
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Action Required</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <Button variant="outline" className="h-10 text-[10px] border-zinc-800 bg-zinc-900 font-bold hover:bg-zinc-800">
                                        <Activity className="w-3.5 h-3.5 mr-2" /> Log Contact
                                    </Button>
                                    <Button className="h-10 text-[10px] bg-red-600 hover:bg-red-500 font-bold uppercase tracking-widest shadow-lg shadow-red-600/20">
                                        Locate Asset
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {overdueLoans.length === 0 && !loading && (
                <div className="p-40 text-center rounded-[3rem] border-2 border-dashed border-zinc-900 flex flex-col items-center gap-6">
                    <CheckCircle2 size={100} className="text-zinc-800" />
                    <div>
                        <h3 className="text-zinc-600 font-black text-2xl uppercase tracking-tighter">Everything Correct</h3>
                        <p className="text-zinc-700 max-w-sm mx-auto mt-2 italic text-sm">No loans currently meet the risk threshold for recovery operations.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
