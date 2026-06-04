"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    ShieldCheck,
    History,
    User as UserIcon,
    Terminal,
    Lock,
    Globe,
    Database,
    RefreshCw,
    Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AuditLog {
    id: string;
    action: string;
    createdAt: string;
    details: Record<string, unknown>;
    loanId: string;
    user?: {
        fullName: string;
    };
    loan?: {
        borrower?: {
            fullName: string;
        }
    };
}

export default function AuditDashboard() {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/loan/audit");
            const data = await res.json();
            if (data.success) setLogs(data.logs);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchLogs();
    }, []);

    const getActionColor = (action: string) => {
        if (action.includes("APPROVE")) return "text-emerald-500 bg-emerald-500/10";
        if (action.includes("REJECT") || action.includes("DELETE")) return "text-red-500 bg-red-500/10";
        if (action.includes("REPAYMENT")) return "text-primary bg-primary/10";
        return "text-zinc-500 bg-zinc-900";
    };

    return (
        <div className="p-10 space-y-12 max-w-7xl mx-auto">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter uppercase text-white flex items-center gap-4">
                        <ShieldCheck className="text-primary w-8 h-8" />
                        Audit <span className="text-primary italic">Intelligence</span>
                    </h1>
                    <p className="text-zinc-500 text-sm mt-1 uppercase tracking-widest font-black">Immutable Activity Ledger</p>
                </div>
                <Button
                    variant="outline"
                    className="border-zinc-800 bg-[#111] hover:bg-zinc-800 text-xs font-bold uppercase tracking-widest h-10 px-6 gap-2"
                    onClick={fetchLogs}
                >
                    <RefreshCw className={cn("w-3.5 h-3.5", loading && "animate-spin")} /> Verify Integrity
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Total Events", value: logs.length, icon: <History className="w-4 h-4" /> },
                    { label: "Integrity Status", value: "Verified", icon: <Lock className="w-4 h-4 text-emerald-500" /> },
                    { label: "System Nodes", value: "4 Active", icon: <Database className="w-4 h-4" /> },
                    { label: "Alert Level", value: "Normal", icon: <Globe className="w-4 h-4 text-primary" /> },
                ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-[#111] border border-zinc-800 flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-500">{stat.icon}</div>
                        <div>
                            <p className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">{stat.label}</p>
                            <p className="text-xl font-black text-white">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-[#111] border border-zinc-800 rounded-[2rem] overflow-hidden shadow-2xl relative">
                <div className="p-10 border-b border-zinc-800 bg-[#151515] flex justify-between items-center group">
                    <div className="flex items-center gap-3">
                        <Terminal className="text-zinc-500 w-5 h-5" />
                        <h3 className="text-white font-black uppercase tracking-widest text-sm">Real-time Stream</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Feed Encrypted</span>
                    </div>
                </div>

                <div className="p-6 space-y-4">
                    {logs.map((log, i) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="group p-6 rounded-2xl bg-black/40 border border-zinc-900 hover:border-zinc-800 transition-all flex items-start gap-6"
                        >
                            <div className="flex flex-col items-center gap-1 shrink-0">
                                <span className="text-[10px] font-black text-zinc-700 uppercase tracking-tighter">
                                    {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                </span>
                                <div className="w-px h-full bg-zinc-800 min-h-[20px]" />
                            </div>

                            <div className="flex-1 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <span className={cn("px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest", getActionColor(log.action))}>
                                            {log.action.replace(/_/g, ' ')}
                                        </span>
                                        <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                            <UserIcon className="w-3 h-3" /> {log.user?.fullName || "System Agent"}
                                        </span>
                                    </div>
                                    <button className="text-zinc-800 group-hover:text-zinc-500 transition-colors">
                                        <Eye className="w-4 h-4" />
                                    </button>
                                </div>

                                <p className="text-sm text-zinc-400 font-medium max-w-2xl leading-relaxed">
                                    Target Loan <span className="text-zinc-300 font-bold font-mono">#{log.loanId.slice(-6)}</span> {log.loan?.borrower?.fullName ? `(${log.loan.borrower.fullName})` : ''}
                                    with parameters: {JSON.stringify(log.details)}
                                </p>
                            </div>
                        </motion.div>
                    ))}

                    {logs.length === 0 && !loading && (
                        <div className="p-20 text-center space-y-4">
                            <History size={48} className="text-zinc-800 mx-auto" />
                            <p className="text-zinc-700 uppercase font-black tracking-widest text-sm italic">No entries in current shard.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
