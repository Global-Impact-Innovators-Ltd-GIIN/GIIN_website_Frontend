"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    CreditCard,
    Package,
    Camera,
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
    ShieldCheck,
    FileText,
    Loader2,
    AlertCircle,
    Info,
    Smartphone,
    Laptop,
    Watch,
    Mic,
    Gamepad,
    Box
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Link from "next/link";

const STEPS = [
    { id: "personal", title: "Identity", icon: <User className="w-4 h-4" /> },
    { id: "loan", title: "Finance", icon: <CreditCard className="w-4 h-4" /> },
    { id: "collateral", title: "Asset", icon: <Package className="w-4 h-4" /> },
    { id: "images", title: "Evidence", icon: <Camera className="w-4 h-4" /> },
    { id: "review", title: "Protocol", icon: <FileText className="w-4 h-4" /> },
];

const COLLATERAL_TYPES = [
    { value: "LAPTOP", label: "Laptop", icon: <Laptop className="w-4 h-4" /> },
    { value: "SMARTPHONE", label: "Smartphone", icon: <Smartphone className="w-4 h-4" /> },
    { value: "TABLET", label: "Tablet", icon: <Box className="w-4 h-4" /> },
    { value: "CAMERA", label: "Camera", icon: <Mic className="w-4 h-4" /> },
    { value: "GAMING_CONSOLE", label: "Gaming Console", icon: <Gamepad className="w-4 h-4" /> },
    { value: "OTHER", label: "Other Electronics", icon: <Box className="w-4 h-4" /> },
];

export function BorrowerApplicationForm() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [appCode, setAppCode] = useState("");
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        // Personal
        fullName: "",
        nationalId: "",
        passportNumber: "",
        studentId: "",
        gender: "MALE",
        dob: "",
        phone: "",
        altPhone: "",
        email: "",
        address: "",
        occupation: "",

        // Loan
        requestedAmount: 50000,
        currency: "RWF",
        loanDuration: 1, // weeks
        purpose: "",

        // Collateral
        collateralType: "SMARTPHONE",
        brand: "",
        model: "",
        serialNumber: "",
        devicePassword: "",
        estimatedValue: 0,
        condition: "GOOD",

        // Evidence (Mock for now)
        images: [] as string[],

        // Protocol
        signedName: "",
        agreedToTerms: false,
    });

    // Interest Calculation Logic
    const [calculations, setCalculations] = useState({
        interestRate: 0.15,
        interestAmount: 7500,
        totalRepayment: 57500,
        dueDate: ""
    });

    useEffect(() => {
        const rate = formData.loanDuration === 1 ? 0.15 : 0.25;
        const interest = formData.requestedAmount * rate;
        const total = formData.requestedAmount + interest;

        const date = new Date();
        date.setDate(date.getDate() + (formData.loanDuration * 7));

        setCalculations({
            interestRate: rate,
            interestAmount: interest,
            totalRepayment: total,
            dueDate: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
        });
    }, [formData.requestedAmount, formData.loanDuration]);

    const updateForm = (fields: Partial<typeof formData>) => {
        setFormData(prev => ({ ...prev, ...fields }));
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError("");
        try {
            const response = await fetch("/api/loan/apply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setAppCode(data.applicationCode);
                setIsSuccess(true);
            } else {
                setError(data.error || "Failed to submit application.");
            }
        } catch (err) {
            setError("Network protocol failure. Please reconnect.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-12 md:p-20 bg-card/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                    <CheckCircle2 className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-4xl font-black tracking-tighter uppercase mb-4 italic font-outfit">Application <span className="text-primary not-italic">Synchronized</span></h2>
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 max-w-sm mx-auto mb-8">
                    <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-2">Application Identifier</span>
                    <span className="text-2xl font-mono font-bold text-primary tracking-widest">{appCode}</span>
                </div>
                <p className="text-muted-foreground max-w-md mx-auto leading-relaxed text-sm mb-10">
                    Your request has been injected into the GIIN verification queue.
                    A loan officer will conduct a physical inspection of your collateral within 24 hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/loan/track">
                        <Button className="rounded-xl h-14 px-10 bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase text-xs tracking-widest">
                            Track Real-time
                        </Button>
                    </Link>
                    <Link href="/loan">
                        <Button variant="outline" className="rounded-xl h-14 px-10 border-white/10 hover:bg-white/5 font-black uppercase text-xs tracking-widest">
                            Exit Portal
                        </Button>
                    </Link>
                </div>
            </motion.div>
        );
    }

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        <div className="text-left mb-8">
                            <h3 className="text-xl font-bold uppercase tracking-tight font-outfit italic">Personnel Profile</h3>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest opacity-60">Step 01: Identification & Contact</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Full Legal Name</Label>
                                <Input placeholder="Amina Keita" value={formData.fullName} onChange={(e) => updateForm({ fullName: e.target.value })} className="bg-white/5 border-white/5 h-14 rounded-2xl focus:border-primary/40 focus:bg-white/10" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Email Address</Label>
                                <Input type="email" placeholder="amina@giin.tech" value={formData.email} onChange={(e) => updateForm({ email: e.target.value })} className="bg-white/5 border-white/5 h-14 rounded-2xl focus:border-primary/40 focus:bg-white/10" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">National ID (NID)</Label>
                                <Input placeholder="1 0000 0 0000000 00" value={formData.nationalId} onChange={(e) => updateForm({ nationalId: e.target.value })} className="bg-white/5 border-white/5 h-14 rounded-2xl focus:border-primary/40 focus:bg-white/10" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Primary Phone</Label>
                                <Input placeholder="+250 780 000 000" value={formData.phone} onChange={(e) => updateForm({ phone: e.target.value })} className="bg-white/5 border-white/5 h-14 rounded-2xl focus:border-primary/40 focus:bg-white/10" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Gender</Label>
                                <Select value={formData.gender} onValueChange={(v) => updateForm({ gender: v })}>
                                    <SelectTrigger className="h-14 bg-white/5 border-white/5 rounded-2xl">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="MALE">Male</SelectItem>
                                        <SelectItem value="FEMALE">Female</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Date of Birth</Label>
                                <Input type="date" value={formData.dob} onChange={(e) => updateForm({ dob: e.target.value })} className="bg-white/5 border-white/5 h-14 rounded-2xl" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Occupation</Label>
                                <Input placeholder="Software Engineer" value={formData.occupation} onChange={(e) => updateForm({ occupation: e.target.value })} className="bg-white/5 border-white/5 h-14 rounded-2xl" />
                            </div>
                        </div>
                    </motion.div>
                );
            case 1:
                return (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                        <div className="text-left mb-8">
                            <h3 className="text-xl font-bold uppercase tracking-tight font-outfit italic">Financial Request</h3>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest opacity-60">Step 02: Amount & Terms</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Requested Capital (RWF)</Label>
                                    <Input type="number" value={formData.requestedAmount} onChange={(e) => updateForm({ requestedAmount: Number(e.target.value) })} className="bg-white/5 border-white/5 h-16 rounded-2xl text-2xl font-bold text-primary" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Repayment Window</Label>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { label: "1 Week", value: 1, rate: "15%" },
                                            { label: "2 Weeks", value: 2, rate: "25%" }
                                        ].map((opt) => (
                                            <button
                                                key={opt.value}
                                                type="button"
                                                onClick={() => updateForm({ loanDuration: opt.value })}
                                                className={cn(
                                                    "p-6 rounded-2xl border transition-all text-left group",
                                                    formData.loanDuration === opt.value
                                                        ? "bg-primary/20 border-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]"
                                                        : "bg-white/5 border-white/5 hover:bg-white/10"
                                                )}
                                            >
                                                <span className="block text-sm font-black uppercase tracking-widest mb-1">{opt.label}</span>
                                                <span className="block text-[10px] text-muted-foreground font-bold">{opt.rate} Interest Rate</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/5 rounded-3xl p-8 border border-white/5 relative overflow-hidden flex flex-col justify-between">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Info size={120} />
                                </div>
                                <div className="space-y-4 relative z-10">
                                    <div className="flex justify-between items-center text-xs text-muted-foreground uppercase tracking-widest font-bold">
                                        <span>Interest Accrual</span>
                                        <span className="text-primary">+{calculations.interestRate * 100}%</span>
                                    </div>
                                    <div className="flex justify-between items-end border-b border-white/5 pb-4">
                                        <span className="text-[10px] uppercase font-black tracking-widest opacity-60">Total Interest</span>
                                        <span className="text-xl font-mono font-bold">{calculations.interestAmount.toLocaleString()} RWF</span>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] uppercase font-black tracking-widest text-primary">Estimated Total Repayment</span>
                                        <div className="text-4xl font-mono font-bold tracking-tighter">{calculations.totalRepayment.toLocaleString()} <span className="text-sm opacity-50">RWF</span></div>
                                    </div>
                                    <div className="pt-4 flex items-center gap-2 text-xs text-muted-foreground">
                                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                        <span>Repayment Due by: <strong className="text-white">{calculations.dueDate}</strong></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        <div className="text-left mb-8">
                            <h3 className="text-xl font-bold uppercase tracking-tight font-outfit italic">Asset Security</h3>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest opacity-60">Step 03: Collateral Specification</p>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Asset Category</Label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                                {COLLATERAL_TYPES.map((type) => (
                                    <button
                                        key={type.value}
                                        type="button"
                                        onClick={() => updateForm({ collateralType: type.value })}
                                        className={cn(
                                            "flex flex-col items-center justify-center p-4 rounded-xl border transition-all gap-2",
                                            formData.collateralType === type.value
                                                ? "bg-primary border-primary text-primary-foreground"
                                                : "bg-white/5 border-white/5 hover:bg-white/10 text-muted-foreground"
                                        )}
                                    >
                                        {type.icon}
                                        <span className="text-[8px] font-black uppercase tracking-tighter">{type.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Brand & Model</Label>
                                <Input placeholder="Apple iPhone 15 Pro Max" value={formData.brand} onChange={(e) => updateForm({ brand: e.target.value })} className="bg-white/5 border-white/5 h-14 rounded-2xl" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Serial / IMEI Number</Label>
                                <Input placeholder="Unique Product Identifier" value={formData.serialNumber} onChange={(e) => updateForm({ serialNumber: e.target.value })} className="bg-white/5 border-white/5 h-14 rounded-2xl" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Security Passcode (Optional)</Label>
                                <Input type="password" placeholder="••••••••" value={formData.devicePassword} onChange={(e) => updateForm({ devicePassword: e.target.value })} className="bg-white/5 border-white/5 h-14 rounded-2xl" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Estimated Market Value (RWF)</Label>
                                <Input type="number" placeholder="450,000" value={formData.estimatedValue} onChange={(e) => updateForm({ estimatedValue: Number(e.target.value) })} className="bg-white/5 border-white/5 h-14 rounded-2xl" />
                            </div>
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        <div className="text-left mb-8">
                            <h3 className="text-xl font-bold uppercase tracking-tight font-outfit italic">Visual Evidence</h3>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest opacity-60">Step 04: Digital Inspection Photos</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {["Front Profile", "Rear Profile", "Sides / Ports", "Accessory Set"].map((label, i) => (
                                <div key={i} className="aspect-square rounded-3xl border-2 border-dashed border-white/5 bg-white/[0.02] flex flex-col items-center justify-center gap-3 hover:bg-white/5 hover:border-primary/30 cursor-pointer transition-all group">
                                    <div className="p-3 rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
                                        <Camera className="w-6 h-6" />
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">{label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex gap-4 items-start">
                            <Info className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                            <p className="text-[11px] text-amber-200/60 leading-relaxed font-medium lowercase first-letter:uppercase">
                                images must be high resolution (max 10mb) and show the device screen active to verify hardware integrity. blurred or low-light images will result in automatic protocol rejection.
                            </p>
                        </div>
                    </motion.div>
                );
            case 4:
                return (
                    <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                        <div className="text-left mb-8">
                            <h3 className="text-xl font-bold uppercase tracking-tight font-outfit italic">Consent Protocol</h3>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest opacity-60">Step 05: Final Review & Authorization</p>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
                                <div className="px-6 py-4 bg-white/5 border-b border-white/5 flex justify-between items-center">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Application Summary</span>
                                    <ShieldCheck className="w-4 h-4 text-primary" />
                                </div>
                                <div className="p-6 space-y-3">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-muted-foreground">Principal Credit</span>
                                        <span className="font-bold text-white font-mono">{formData.requestedAmount.toLocaleString()} RWF</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-muted-foreground">Repayment Liability</span>
                                        <span className="font-bold text-primary font-mono">{calculations.totalRepayment.toLocaleString()} RWF</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-muted-foreground">Pledged Collateral</span>
                                        <span className="font-bold text-white uppercase">{formData.brand} {formData.model}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Digital Signature Auth</label>
                            <Input placeholder="Type Your Full Legal Name to Sign" value={formData.signedName} onChange={(e) => updateForm({ signedName: e.target.value })} className="bg-white/5 border-white/5 h-16 rounded-2xl text-xl font-serif italic text-primary" />

                            <div className="flex items-start gap-4 p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                                <input
                                    type="checkbox"
                                    id="consent"
                                    checked={formData.agreedToTerms}
                                    onChange={(e) => updateForm({ agreedToTerms: e.target.checked })}
                                    className="mt-1 w-5 h-5 rounded-lg border-white/10 bg-white/5 text-primary focus:ring-primary focus:ring-offset-0"
                                />
                                <Label htmlFor="consent" className="text-[11px] text-muted-foreground leading-relaxed cursor-pointer select-none">
                                    I hereby authorize GIIN Loan Service to verify my identification and inspect the pledged collateral. I understand that physical possession of the collateral is required for loan disbursement and failure to repay will result in total loss of ownership as per the
                                    <span className="text-primary font-bold ml-1 hover:underline">Sovereign Financial Agreement</span>.
                                </Label>
                            </div>
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4">
            {/* Step Indicator */}
            <div className="flex justify-between mb-16 relative">
                <div className="absolute top-7 left-0 w-full h-[1px] bg-white/5 z-0" />
                {STEPS.map((step, i) => (
                    <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
                        <div
                            className={cn(
                                "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-700 border-2",
                                i < currentStep ? "bg-primary border-primary text-primary-foreground rotate-[360deg]" :
                                    i === currentStep ? "bg-primary/20 border-primary text-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]" :
                                        "bg-background/80 border-white/5 text-muted-foreground backdrop-blur-md"
                            )}
                        >
                            {i < currentStep ? <CheckCircle2 className="w-6 h-6" /> : step.icon}
                        </div>
                        <span className={cn(
                            "text-[8px] font-black uppercase tracking-[0.2em] transition-colors duration-500",
                            i <= currentStep ? "text-primary" : "text-muted-foreground"
                        )}>
                            {step.title}
                        </span>
                    </div>
                ))}
            </div>

            {/* Container */}
            <div className="bg-card/30 backdrop-blur-3xl border border-white/5 rounded-[3.5rem] p-8 md:p-16 shadow-[0_48px_96px_-24px_rgba(0,0,0,0.6)] relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

                <AnimatePresence mode="wait">
                    {renderStep()}
                </AnimatePresence>

                {error && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-6 bg-red-500/5 border border-red-500/20 rounded-2xl flex gap-4 items-center">
                        <AlertCircle className="w-5 h-5 text-red-400" />
                        <span className="text-xs font-bold text-red-400 uppercase tracking-widest">{error}</span>
                    </motion.div>
                )}

                {/* Nav */}
                <div className="flex flex-col sm:flex-row items-center justify-between mt-16 pt-12 border-t border-white/5 gap-6">
                    <Button
                        variant="ghost"
                        onClick={prevStep}
                        disabled={currentStep === 0 || isSubmitting}
                        className="rounded-2xl h-16 px-10 font-black uppercase tracking-[0.2em] text-[10px] gap-3 hover:bg-white/5"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Abort / Return
                    </Button>

                    {currentStep === STEPS.length - 1 ? (
                        <Button
                            onClick={handleSubmit}
                            disabled={!formData.agreedToTerms || !formData.signedName || isSubmitting}
                            className="w-full sm:w-auto rounded-2xl h-16 px-16 bg-gradient-to-r from-primary to-indigo-600 hover:scale-[1.02] active:scale-95 transition-all text-white font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-primary/20"
                        >
                            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Authorize Request"}
                        </Button>
                    ) : (
                        <Button
                            onClick={nextStep}
                            className="w-full sm:w-auto rounded-2xl h-16 px-16 bg-white text-black hover:bg-white/90 font-black uppercase tracking-[0.3em] text-[10px] gap-3 group shadow-2xl active:scale-95 transition-all"
                        >
                            Next Protocol
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    )}
                </div>
            </div>

            <style jsx global>{`
                @font-face {
                    font-family: 'Outfit';
                    src: url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap');
                }
            `}</style>
        </div>
    );
}
