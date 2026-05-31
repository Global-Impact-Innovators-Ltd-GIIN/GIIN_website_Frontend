"use client";

import React, { useEffect, useState } from "react";
import {
    Clock,
    CheckCircle2,
    XCircle,
    Search,
    Filter,
    ChevronRight,
    ArrowUpRight,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AdminApplicationsPage() {
    const [apps, setApps] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch("/api/loan/admin/applications")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setApps(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const filteredApps = apps.filter(app =>
        app.applicationCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.borrower.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-32 pb-20 px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter uppercase italic font-outfit">Application <span className="text-primary not-italic">Backlog</span></h1>
                        <p className="text-muted-foreground text-sm uppercase tracking-widest mt-1 font-bold">Verification Queue</p>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search code/name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-12 h-14 bg-white/5 border-white/5 rounded-2xl focus:bg-white/10 transition-all font-mono"
                            />
                        </div>
                        <Button variant="outline" className="h-14 w-14 rounded-2xl border-white/5 bg-white/5 p-0">
                            <Filter className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                <div className="bg-card/20 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60">ID / Code</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60">Applicant</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60">Details</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60">Status</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredApps.map((app) => (
                                <tr key={app.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-8 py-6">
                                        <span className="block font-mono font-bold text-primary tracking-widest mb-1">{app.applicationCode}</span>
                                        <span className="text-[10px] text-muted-foreground font-medium">{new Date(app.createdAt).toLocaleString()}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-black text-xs">
                                                {app.borrower.fullName.charAt(0)}
                                            </div>
                                            <div>
                                                <span className="block text-sm font-bold text-white">{app.borrower.fullName}</span>
                                                <span className="text-[10px] text-muted-foreground tracking-widest">{app.borrower.borrowerCode}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="block text-sm font-black font-mono text-white">{app.requestedAmount.toLocaleString()} RWF</span>
                                        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">{app.requestedDuration} Week(s) Term</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={cn(
                                            "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                            app.status === "PENDING" ? "bg-amber-500/10 border-amber-500/20 text-amber-500" :
                                                app.status === "APPROVED" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" :
                                                    "bg-white/5 border-white/5 text-muted-foreground"
                                        )}>
                                            {app.status === "PENDING" && <Clock className="w-3 h-3" />}
                                            {app.status === "APPROVED" && <CheckCircle2 className="w-3 h-3" />}
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <Link href={`/loan/admin/applications/${app.id}`}>
                                            <Button variant="ghost" className="rounded-xl hover:bg-white/5 group/btn">
                                                Inspect <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
