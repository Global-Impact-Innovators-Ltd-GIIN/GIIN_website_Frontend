"use client";

import React, { useState } from "react";
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
    FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoanCalculator } from "./LoanCalculator";
import { cn } from "@/lib/utils";
import Link from "next/link";

const STEPS = [
    { id: "personal", title: "Personal Details", icon: <User className="w-4 h-4" /> },
    { id: "loan", title: "Loan Request", icon: <CreditCard className="w-4 h-4" /> },
    { id: "collateral", title: "Collateral", icon: <Package className="w-4 h-4" /> },
    { id: "review", title: "Review & Sign", icon: <FileText className="w-4 h-4" /> },
];

export function BorrowerApplicationForm() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        nationalId: "",
        studentId: "",
        phone: "",
        email: "",
        requestedAmount: 50000,
        loanDuration: 1,
        collateralType: "DEVICE",
        deviceDetails: "",
        imei: "",
        agreedToTerms: false,
    });

    const updateForm = (fields: Partial<typeof formData>) => {
        setFormData(prev => ({ ...prev, ...fields }));
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/loan/apply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsSuccess(true);
            } else {
                alert("Failed to submit application. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-20 bg-card/50 backdrop-blur-xl border border-border/10 rounded-[2rem] shadow-2xl space-y-8"
            >
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-4xl font-black tracking-tight uppercase">Application <span className="text-primary italic">Received</span></h2>
                <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Your loan application has been successfully submitted to the GIIN review queue.
                    A loan officer will inspect your collateral details shortly.
                </p>
                <div className="pt-8">
                    <Link href="/loan">
                        <Button className="rounded-xl h-12 px-10 bg-foreground text-background font-bold tracking-widest uppercase text-xs">
                            Back to Dashboard
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
                    <motion.div
                        key="step0"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="uppercase tracking-widest text-[10px] font-black text-muted-foreground">Full Name</Label>
                                <Input
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={(e) => updateForm({ fullName: e.target.value })}
                                    className="bg-background/50 border-primary/10 h-12"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="uppercase tracking-widest text-[10px] font-black text-muted-foreground">Email Address</Label>
                                <Input
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={(e) => updateForm({ email: e.target.value })}
                                    className="bg-background/50 border-primary/10 h-12"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="uppercase tracking-widest text-[10px] font-black text-muted-foreground">National ID</Label>
                                <Input
                                    placeholder="1 1990 8 000000 0 00"
                                    value={formData.nationalId}
                                    onChange={(e) => updateForm({ nationalId: e.target.value })}
                                    className="bg-background/50 border-primary/10 h-12"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="uppercase tracking-widest text-[10px] font-black text-muted-foreground">Phone Number</Label>
                                <Input
                                    placeholder="+250 780 000 000"
                                    value={formData.phone}
                                    onChange={(e) => updateForm({ phone: e.target.value })}
                                    className="bg-background/50 border-primary/10 h-12"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="uppercase tracking-widest text-[10px] font-black text-muted-foreground">Student ID (Optional)</Label>
                            <Input
                                placeholder="REG/2026/001"
                                value={formData.studentId}
                                onChange={(e) => updateForm({ studentId: e.target.value })}
                                className="bg-background/50 border-primary/10 h-12"
                            />
                        </div>
                    </motion.div>
                );
            case 1:
                return (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4">
                            <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-sm">Flexible Financing</h4>
                                <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                                    Adjust the parameters below to see your repayment schedule.
                                    All loans are subject to a fixed weekly interest rate.
                                </p>
                            </div>
                        </div>

                        <LoanCalculator className="bg-transparent border-0 p-0 shadow-none backdrop-blur-none" />
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="space-y-2">
                            <Label className="uppercase tracking-widest text-[10px] font-black text-muted-foreground">Collateral Type</Label>
                            <Select value={formData.collateralType} onValueChange={(v: string) => updateForm({ collateralType: v })}>
                                <SelectTrigger className="h-12 bg-background/50 border-primary/10">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="DEVICE">Electronic Device (Phone/Laptop)</SelectItem>
                                    <SelectItem value="VEHICLE">Motorcycle / Vehicle</SelectItem>
                                    <SelectItem value="OTHER">Other Valuable Asset</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="uppercase tracking-widest text-[10px] font-black text-muted-foreground">Device Brand & Model</Label>
                            <Input
                                placeholder="e.g. MacBook Pro M3 or iPhone 15"
                                value={formData.deviceDetails}
                                onChange={(e) => updateForm({ deviceDetails: e.target.value })}
                                className="bg-background/50 border-primary/10 h-12"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="uppercase tracking-widest text-[10px] font-black text-muted-foreground">IMEI / Serial Number</Label>
                            <Input
                                placeholder="Unique Identifier"
                                value={formData.imei}
                                onChange={(e) => updateForm({ imei: e.target.value })}
                                className="bg-background/50 border-primary/10 h-12"
                            />
                        </div>

                        <div className="space-y-4">
                            <Label className="uppercase tracking-widest text-[10px] font-black text-muted-foreground">Upload Asset Photos</Label>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="aspect-square rounded-2xl border-2 border-dashed border-primary/20 bg-primary/5 flex flex-col items-center justify-center gap-2 hover:bg-primary/10 cursor-pointer transition-all group">
                                    <Camera className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Front View</span>
                                </div>
                                <div className="aspect-square rounded-2xl border-2 border-dashed border-primary/20 bg-primary/5 flex flex-col items-center justify-center gap-2 hover:bg-primary/10 cursor-pointer transition-all group">
                                    <Camera className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Back View</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <h4 className="font-bold text-lg uppercase tracking-tight">Review Application</h4>
                            <div className="p-6 rounded-2xl bg-muted/50 border border-border/10 space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Applicant</span>
                                    <span className="font-bold">{formData.fullName}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Amount</span>
                                    <span className="font-bold">{formData.requestedAmount.toLocaleString()} RWF</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Collateral</span>
                                    <span className="font-bold">{formData.deviceDetails}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 rounded-xl border border-primary/20 bg-primary/5">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={formData.agreedToTerms}
                                onChange={(e) => updateForm({ agreedToTerms: e.target.checked })}
                                className="mt-1 w-4 h-4 rounded border-primary bg-background focus:ring-primary"
                            />
                            <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                                I hereby declare that the information provided is accurate and I agree to the
                                <span className="text-primary font-bold hover:underline ml-1">Terms of Service</span> and
                                <span className="text-primary font-bold hover:underline ml-1">Repayment Agreement</span>.
                            </label>
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="flex justify-between mb-12 relative">
                <div className="absolute top-1/2 left-0 w-full h-px bg-border/20 -translate-y-1/2 z-0" />
                {STEPS.map((step, i) => (
                    <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
                        <div
                            className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-2",
                                i <= currentStep
                                    ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20"
                                    : "bg-background border-border/20 text-muted-foreground"
                            )}
                        >
                            {i < currentStep ? <CheckCircle2 className="w-5 h-5" /> : step.icon}
                        </div>
                        <span className={cn(
                            "text-[10px] font-black uppercase tracking-[0.2em]",
                            i <= currentStep ? "text-primary" : "text-muted-foreground"
                        )}>
                            {step.title}
                        </span>
                    </div>
                ))}
            </div>

            {/* Form Card */}
            <div className="bg-card/50 backdrop-blur-xl border border-border/10 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/30 via-primary to-primary/30 opacity-50" />

                <AnimatePresence mode="wait">
                    {renderStep()}
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-12 pt-8 border-t border-border/10">
                    <Button
                        variant="ghost"
                        onClick={prevStep}
                        disabled={currentStep === 0 || isSubmitting}
                        className="rounded-xl h-12 px-6 font-bold uppercase tracking-widest text-xs gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Button>

                    {currentStep === STEPS.length - 1 ? (
                        <Button
                            onClick={handleSubmit}
                            disabled={!formData.agreedToTerms || isSubmitting}
                            className="rounded-xl h-12 px-10 bg-primary hover:bg-primary/90 font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20"
                        >
                            {isSubmitting ? "Submitting..." : "Submit Application"}
                        </Button>
                    ) : (
                        <Button
                            onClick={nextStep}
                            className="rounded-xl h-12 px-10 bg-primary hover:bg-primary/90 font-black uppercase tracking-widest text-xs gap-2 shadow-xl shadow-primary/20 group/btn"
                        >
                            Continue
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
