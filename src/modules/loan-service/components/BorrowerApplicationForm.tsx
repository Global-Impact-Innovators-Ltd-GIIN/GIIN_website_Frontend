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

interface LoanFormData {
    fullName: string;
    nationalId: string;
    passportNumber: string;
    studentId: string;
    gender: string;
    dob: string;
    phone: string;
    altPhone: string;
    email: string;
    address: string;
    occupation: string;
    requestedAmount: number;
    currency: string;
    loanDuration: number;
    purpose: string;
    collateralType: string;
    brand: string;
    model: string;
    serialNumber: string;
    devicePassword: string;
    estimatedValue: number;
    condition: string;
    evidence: {
        front: string | null;
        rear: string | null;
        sides: string | null;
        accessories: string | null;
    };
    signedName: string;
    agreedToTerms: boolean;
}

export function BorrowerApplicationForm() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [appCode, setAppCode] = useState("");
    const [error, setError] = useState("");
    const [uploading, setUploading] = useState<string | null>(null);

    const [formData, setFormData] = useState<LoanFormData>({
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
        requestedAmount: 50000,
        currency: "RWF",
        loanDuration: 1,
        purpose: "",
        collateralType: "SMARTPHONE",
        brand: "",
        model: "",
        serialNumber: "",
        devicePassword: "",
        estimatedValue: 0,
        condition: "GOOD",
        evidence: {
            front: null,
            rear: null,
            sides: null,
            accessories: null,
        },
        signedName: "",
        agreedToTerms: false,
    });

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

    const updateForm = (fields: Partial<LoanFormData>) => {
        setFormData(prev => ({ ...prev, ...fields }));
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    const handleImageUpload = async (slot: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) {
            setError("Image size exceeds 10MB limit.");
            return;
        }

        setUploading(slot);

        try {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 1200;
                    const MAX_HEIGHT = 1200;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);

                    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                    setFormData(prev => ({
                        ...prev,
                        evidence: { ...prev.evidence, [slot]: dataUrl }
                    }));
                    setUploading(null);
                };
                img.src = reader.result as string;
            };
            reader.readAsDataURL(file);
        } catch (err) {
            setError("Failed to process image protocol.");
            setUploading(null);
        }
    };

    const removeImage = (slot: string) => {
        setFormData(prev => ({
            ...prev,
            evidence: { ...prev.evidence, [slot]: null }
        }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError("");
        try {
            const images = Object.values(formData.evidence).filter(v => v !== null) as string[];

            const response = await fetch("/api/loan/apply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    images: images.length > 0 ? images : ["/placeholder.png"]
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setAppCode(data.applicationCode);
                setIsSuccess(true);
            } else {
                setError(`${data.error || "Submission Failed"} ${data.details ? `(Target: ${JSON.stringify(data.details)})` : ""}`);
            }
        } catch (err) {
            setError("Network protocol failure. Payload may be oversized or server connection lost.");
        } finally {
            setIsSubmitting(false);
        }
    };

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
                                <Input placeholder="Amina Keita" value={formData.fullName} onChange={(e) => updateForm({ fullName: e.target.value })} className="bg-white/5 border-white/5 h-14 rounded-2xl" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Email Address</Label>
                                <Input type="email" placeholder="amina@giin.tech" value={formData.email} onChange={(e) => updateForm({ email: e.target.value })} className="bg-white/5 border-white/5 h-14 rounded-2xl" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">National ID (NID)</Label>
                                <Input placeholder="1 0000 0 0000000 00" value={formData.nationalId} onChange={(e) => updateForm({ nationalId: e.target.value })} className="bg-white/5 border-white/5 h-14 rounded-2xl" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Primary Phone</Label>
                                <Input placeholder="+250 780 000 000" value={formData.phone} onChange={(e) => updateForm({ phone: e.target.value })} className="bg-white/5 border-white/5 h-14 rounded-2xl" />
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
                                                    "p-6 rounded-2xl border transition-all text-left",
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
                            <div className="bg-white/5 rounded-3xl p-8 border border-white/5 flex flex-col justify-between">
                                <div className="space-y-4">
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
                                        <span>Repayment Due: <strong className="text-white">{calculations.dueDate}</strong></span>
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
                                <Input value={formData.brand} onChange={(e) => updateForm({ brand: e.target.value })} className="bg-white/5 border-white/5 h-14 rounded-2xl" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Serial / IMEI</Label>
                                <Input value={formData.serialNumber} onChange={(e) => updateForm({ serialNumber: e.target.value })} className="bg-white/5 border-white/5 h-14 rounded-2xl" />
                            </div>
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        <div className="text-left mb-8">
                            <h3 className="text-xl font-bold uppercase tracking-tight font-outfit italic">Visual Evidence</h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.keys(formData.evidence).map((key) => {
                                const slot = key as keyof typeof formData.evidence;
                                return (
                                    <div key={slot} className="relative aspect-square">
                                        {formData.evidence[slot] ? (
                                            <div className="group relative w-full h-full rounded-2xl overflow-hidden border-2 border-primary">
                                                <img src={formData.evidence[slot]!} className="w-full h-full object-cover" />
                                                <button onClick={() => removeImage(slot)} className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                                    <AlertCircle className="text-red-500" />
                                                </button>
                                            </div>
                                        ) : (
                                            <label className="flex flex-col items-center justify-center w-full h-full rounded-2xl border-2 border-dashed border-white/10 bg-white/5 hover:border-primary/50 cursor-pointer transition-all">
                                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(slot, e)} />
                                                {uploading === slot ? <Loader2 className="animate-spin text-primary" /> : <Camera className="text-muted-foreground" />}
                                                <span className="text-[8px] mt-2 uppercase font-black">{slot}</span>
                                            </label>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                );
            case 4:
                return (
                    <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                        <div className="bg-white/5 border border-white/5 rounded-3xl p-8 space-y-4">
                            <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground italic">Principal Request</span>
                                <span className="font-bold font-mono">{formData.requestedAmount.toLocaleString()} RWF</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground italic">Total Liability</span>
                                <span className="font-bold text-primary font-mono">{calculations.totalRepayment.toLocaleString()} RWF</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground italic">Pledged Asset</span>
                                <span className="font-bold uppercase">{formData.brand} {formData.model}</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <Label className="text-[10px] font-black uppercase text-primary">Final Signature Auth</Label>
                            <Input placeholder="Type Name to Sign" value={formData.signedName} onChange={(e) => updateForm({ signedName: e.target.value })} className="h-16 rounded-2xl bg-white/5 text-xl italic text-primary" />
                            <div className="flex gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                                <input type="checkbox" checked={formData.agreedToTerms} onChange={(e) => updateForm({ agreedToTerms: e.target.checked })} />
                                <span className="text-[10px] text-muted-foreground">I agree to the GIIN Sovereign Financial Protocols and authorize collateral inspection.</span>
                            </div>
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    if (isSuccess) {
        return (
            <div className="text-center p-20 bg-card rounded-[3rem] border border-white/5 shadow-2xl">
                <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 italic">Injection Success</h2>
                <div className="bg-primary/10 p-4 rounded-xl mb-6">
                    <span className="text-primary font-mono font-bold text-xl">{appCode}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-8">Protocol active. Proceed to physical inspection terminal.</p>
                <Link href="/loan"><Button className="rounded-xl px-12 uppercase font-black text-xs">Return to Home</Button></Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-12">
            <div className="flex justify-between mb-12 relative px-4">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -z-10" />
                {STEPS.map((s, i) => (
                    <div key={s.id} className={cn("px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest border transition-all", i <= currentStep ? "bg-primary border-primary text-white" : "bg-background border-white/5 text-muted-foreground")}>
                        {s.title}
                    </div>
                ))}
            </div>

            <div className="bg-card/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
                <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

                {error && <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[10px] uppercase font-bold">{error}</div>}

                <div className="flex justify-between mt-12 pt-12 border-t border-white/5">
                    <Button variant="ghost" onClick={prevStep} disabled={currentStep === 0 || isSubmitting} className="uppercase font-black text-[10px]">Back</Button>
                    {currentStep === STEPS.length - 1 ? (
                        <Button onClick={handleSubmit} disabled={!formData.agreedToTerms || !formData.signedName || isSubmitting} className="px-12 rounded-xl uppercase font-black text-[10px]">
                            {isSubmitting ? <Loader2 className="animate-spin" /> : "Authorize"}
                        </Button>
                    ) : (
                        <Button onClick={nextStep} className="px-12 rounded-xl uppercase font-black text-[10px]">Next Protocol</Button>
                    )}
                </div>
            </div>
        </div>
    );
}
