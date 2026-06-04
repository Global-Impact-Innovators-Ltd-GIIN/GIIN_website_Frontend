"use client";

import React, { useState, useEffect } from "react";
import {
    Calendar,
    Search,
    Plus,
    Filter,
    Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ActiveLoan {
    id: string;
    amount: number;
    currency: string;
    interestRate: number;
    outstandingBalance: number;
    dueDate: string;
    status: string;
    borrower: {
        fullName: string;
        nationalId: string;
    };
}

export default function ActiveLoansPage() {
    const [loans, setLoans] = useState<ActiveLoan[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchActiveLoans = async () => {
        try {
            const res = await fetch("/api/loan/active");
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
        fetchActiveLoans();
    }, []);

    const filteredLoans = loans.filter(l =>
        l.borrower.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.borrower.nationalId.includes(searchQuery)
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case "ACTIVE": return "text-emerald-500 bg-emerald-500/10";
            case "PARTIAL": return "text-amber-500 bg-amber-500/10";
            case "OVERDUE": return "text-red-500 bg-red-500/10";
            default: return "text-zinc-500 bg-zinc-500/10";
        }
    };

    return (
        <div className="space-y-8 p-10">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter uppercase text-white">Active <span className="text-primary italic">Portfolio</span></h1>
                    <p className="text-zinc-500 text-sm mt-1">Live tracking of all outstanding innovation capital.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-border/10">
                        <Download className="w-4 h-4 mr-2" /> Export
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90">
                        <Plus className="w-4 h-4 mr-2" /> Manual Entry
                    </Button>
                </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-[#111] border border-zinc-800">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <Input
                        placeholder="Search by borrower name, national ID..."
                        className="pl-10 h-10 bg-black border-zinc-900 focus:border-primary/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Button variant="outline" className="border-zinc-800 bg-black">
                    <Filter className="w-4 h-4 mr-2 text-zinc-500" /> Filter
                </Button>
            </div>

            <div className="bg-[#111] border border-zinc-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse text-sm">
                    <thead>
                        <tr className="border-b border-zinc-800 bg-[#0a0a0a]">
                            <th className="p-4 text-zinc-500 font-bold uppercase text-[10px] tracking-widest">Borrower</th>
                            <th className="p-4 text-zinc-500 font-bold uppercase text-[10px] tracking-widest">Principal</th>
                            <th className="p-4 text-zinc-500 font-bold uppercase text-[10px] tracking-widest">Balance</th>
                            <th className="p-4 text-zinc-500 font-bold uppercase text-[10px] tracking-widest">Due Date</th>
                            <th className="p-4 text-zinc-500 font-bold uppercase text-[10px] tracking-widest text-center">Status</th>
                            <th className="p-4 text-zinc-500 font-bold uppercase text-[10px] tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLoans.map((loan) => (
                            <tr key={loan.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/40 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold">
                                            {loan.borrower.fullName.charAt(0)}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-white font-bold">{loan.borrower.fullName}</span>
                                            <span className="text-[10px] text-zinc-500 tracking-wider">ID: {loan.borrower.nationalId}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-col">
                                        <span className="text-zinc-300 font-medium">{loan.amount.toLocaleString()} RWF</span>
                                        <span className="text-[10px] text-zinc-600">Rate: {(loan.interestRate * 100).toFixed(0)}%</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="text-primary font-black tracking-tight">{loan.outstandingBalance.toLocaleString()} RWF</span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2 text-zinc-300">
                                        <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                                        {new Date(loan.dueDate).toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="p-4 text-center">
                                    <span className={cn("px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest", getStatusColor(loan.status))}>
                                        {loan.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button size="sm" variant="outline" className="h-8 border-zinc-800 hover:bg-zinc-900">Details</Button>
                                        <Button size="sm" className="h-8 bg-zinc-800 hover:bg-zinc-700">Record Payment</Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {loading && (
                            <tr>
                                <td colSpan={6} className="p-20 text-center text-zinc-500 italic uppercase tracking-widest text-[10px]">Syncing ledger...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
