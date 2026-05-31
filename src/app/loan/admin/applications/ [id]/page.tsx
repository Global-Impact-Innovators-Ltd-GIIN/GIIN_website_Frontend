"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft,
    ShieldCheck,
    AlertCircle,
    Clock,
    User,
    Smartphone,
    FileText,
    MessageSquare,
    CheckCircle2,
    XCircle,
    Loader2,
    Zap,
    Scale,
    Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function ApplicationReviewPage() {
    const { id } = useParams();
    const router = useRouter();
    const [app, setApp] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Assessment State
    const [assessment, setAssessment] = useState({
        riskCategory: "MEDIUM",
        liquidationValue: 0,
        notes: "",
        rejectionReason: "INSUFFICIENT_COLLATERAL"
    });

    useEffect(() => {
        fetch(`/api/loan/admin/applications/${id}`)
            .then(res => res.json())
            .then(data => {
                setApp(data);
                setAssessment(prev => ({ ...prev, liquidationValue: data.loan?.collateral?.estimatedValue || 0 }));
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    const handleAction = async (action: string) => {
        setSubmitting(true);
        try {
            const res = await fetch(`/api/loan/admin/applications/${id}/action`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action, ...assessment })
            });

            if (res.ok) {
                router.push("/loan/admin/applications");
                router.refresh();
            } else {
                alert("Protocol Action Failed. Review inputs.");
            }
        } catch (err) {
            alert("Network Error.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center bg-background"><Loader2 className="animate-spin text-primary w-10 h-10" /></div>;
    if (!app) return <div className="p-20 text-center">Application not found in verified registry.</div>;

    const loan = app.loan;
    const collateral = loan?.collateral;

    return (
        <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-white" onClick={() => router.back()}>
                        <ArrowLeft className="w-4 h-4" /> Back to Queue
                    </Button>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Status:</span>
                        <div className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                            {app.status}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT COL: Application Data */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* Borrower & Loan Profile */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-card/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400"><User className="w-5 h-5" /></div>
                                    <h3 className="font-black uppercase tracking-tight italic">Borrower Profile</h3>
                                </div>
                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="text-muted-foreground">Full Name</span>
                                        <span className="font-bold text-white">{app.borrower.fullName}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="text-muted-foreground">National ID</span>
                                        <span className="font-mono text-white tracking-widest">{app.borrower.nationalId}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="text-muted-foreground">Contact</span>
                                        <span className="font-bold text-white">{app.borrower.phoneNumber}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Occupation</span>
                                        <span className="text-white font-medium">{app.borrower.occupation}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-card/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400"><Scale className="w-5 h-5" /></div>
                                    <h3 className="font-black uppercase tracking-tight italic">Loan Specifications</h3>
                                </div>
                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="text-muted-foreground">Principal Requested</span>
                                        <span className="font-black text-2xl text-primary font-mono">{loan.principalAmount.toLocaleString()} RWF</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="text-muted-foreground">Term Requested</span>
                                        <span className="font-bold text-white uppercase">{loan.durationWeeks} Week(s)</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Purpose</span>
                                        <span className="text-white font-medium italic">"{app.purposeOfLoan}"</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Collateral & Evidence */}
                        <div className="bg-card/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-10">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400"><Smartphone className="w-5 h-5" /></div>
                                    <h3 className="font-black uppercase tracking-tight italic">Asset Evidence & Context</h3>
                                </div>
                                <div className="text-[10px] font-black uppercase text-muted-foreground tracking-widest px-4 py-1.5 rounded-full bg-white/5 border border-white/5">
                                    Type: {collateral?.itemType}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                    <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest block mb-2">Item Definition</span>
                                    <p className="font-bold text-sm text-white">{collateral?.brand} {collateral?.model}</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                    <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest block mb-2">Identifier (IMEI/SN)</span>
                                    <p className="font-mono text-xs font-bold text-white tracking-widest">{collateral?.serialNumber}</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                    <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest block mb-2">Claimed Value</span>
                                    <p className="font-bold text-sm text-emerald-400">{collateral?.estimatedValue?.toLocaleString()} RWF</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {collateral?.images?.map((img: any, i: number) => (
                                    <div key={i} className="aspect-square rounded-3xl overflow-hidden border border-white/10 relative group cursor-zoom-in">
                                        <img src={img.imageUrl} alt="Collateral" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <ImageIcon className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Audit Trail & Notes */}
                        <div className="bg-card/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-10">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400"><FileText className="w-5 h-5" /></div>
                                <h3 className="font-black uppercase tracking-tight italic">Audit Protocol Trail</h3>
                            </div>
                            <div className="space-y-6">
                                {app.loan.activityLogs.map((log: any, i: number) => (
                                    <div key={i} className="flex gap-4 items-start pl-4 border-l border-white/5">
                                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-black uppercase text-white tracking-widest">{log.actionType}</span>
                                                <span className="text-[8px] text-muted-foreground uppercase">{new Date(log.timestamp).toLocaleString()}</span>
                                            </div>
                                            <p className="text-[11px] text-muted-foreground font-medium">
                                                By: <strong className="text-white">{log.user?.firstName} {log.user?.lastName} ({log.user?.role})</strong>
                                                <br />
                                                <span className="italic">"{log.details?.notes || 'No Remarks provided'}"</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COL: Verification Controls */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-card/50 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 sticky top-32 shadow-2xl shadow-primary/5">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 rounded-2xl bg-primary/20 text-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]"><Zap className="w-5 h-5" /></div>
                                <h3 className="font-black uppercase tracking-tight italic">Protocol Controls</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Market Risk Assessment</Label>
                                    <Select value={assessment.riskCategory} onValueChange={(v) => setAssessment(prev => ({ ...prev, riskCategory: v }))}>
                                        <SelectTrigger className="h-14 bg-white/5 border-white/5 rounded-2xl">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="LOW">Low Risk (Standard)</SelectItem>
                                            <SelectItem value="MEDIUM">Medium Risk (Review Req.)</SelectItem>
                                            <SelectItem value="HIGH">High Risk (Escalate)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Estimated Liquidation Value</Label>
                                    <Input
                                        type="number"
                                        value={assessment.liquidationValue}
                                        onChange={(e) => setAssessment(prev => ({ ...prev, liquidationValue: Number(e.target.value) }))}
                                        className="h-14 bg-white/5 border-white/5 rounded-2xl text-lg font-bold font-mono"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Internal Decision Notes</Label>
                                    <Textarea
                                        placeholder="Enter mandatory review notes..."
                                        value={assessment.notes}
                                        onChange={(e) => setAssessment(prev => ({ ...prev, notes: e.target.value }))}
                                        className="min-h-[120px] bg-white/5 border-white/5 rounded-2xl text-xs leading-relaxed"
                                    />
                                </div>

                                <div className="pt-8 space-y-4">
                                    <Button
                                        onClick={() => handleAction("APPROVE")}
                                        disabled={submitting || !assessment.notes}
                                        className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-primary/20 transition-all active:scale-95"
                                    >
                                        {submitting ? <Loader2 className="animate-spin w-5 h-5" /> : <><CheckCircle2 className="w-4 h-4 mr-2" /> Authorize Migration</>}
                                    </Button>

                                    <div className="grid grid-cols-2 gap-3">
                                        <Button
                                            variant="outline"
                                            onClick={() => handleAction("REQUEST_INFO")}
                                            className="h-14 rounded-2xl border-white/5 bg-white/5 hover:bg-white/10 text-[9px] font-black uppercase tracking-widest"
                                        >
                                            Request Info
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => handleAction("REJECT")}
                                            className="h-14 rounded-2xl border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 text-[9px] font-black uppercase tracking-widest"
                                        >
                                            <XCircle className="w-4 h-4 mr-2" /> Reject
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
