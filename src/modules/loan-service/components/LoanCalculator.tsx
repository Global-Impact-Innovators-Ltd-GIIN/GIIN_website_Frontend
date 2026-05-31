"use client";

import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Calculator, TrendingUp, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

export function LoanCalculator({ className }: { className?: string }) {
    const [amount, setAmount] = useState<number>(50000);
    const [duration, setDuration] = useState<number>(1); // weeks
    const [currency, setCurrency] = useState<string>("RWF");

    // Rates logic
    const getRate = (weeks: number) => {
        if (weeks === 1) return 0.15;
        if (weeks === 2) return 0.25;
        // Linear interpolation or custom logic for more weeks
        return 0.25 + (weeks - 2) * 0.05;
    };

    const rate = getRate(duration);
    const interest = amount * rate;
    const totalRepayment = amount + interest;

    return (
        <div className={cn("p-8 rounded-3xl border border-primary/20 bg-card/50 backdrop-blur-md shadow-2xl", className)}>
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                    <Calculator className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xl font-bold">Repayment Calculator</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mt-0.5">Live Estimates</p>
                </div>
            </div>

            <div className="space-y-8">
                {/* Currency & Amount */}
                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Principal Amount</Label>
                        <div className="flex items-center gap-2">
                            <Select value={currency} onValueChange={setCurrency}>
                                <SelectTrigger className="w-[80px] h-8 text-xs font-bold border-primary/20 bg-primary/5">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="RWF">RWF</SelectItem>
                                    <SelectItem value="USD">USD</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">
                            {currency === "USD" ? "$" : ""}
                        </div>
                        <Input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className={cn(
                                "h-14 text-2xl font-black border-primary/20 bg-background/50 focus-visible:ring-primary/30",
                                currency === "USD" ? "pl-8" : "pl-4"
                            )}
                        />
                    </div>

                    <Slider
                        value={[amount]}
                        min={10000}
                        max={currency === "USD" ? 5000 : 1000000}
                        step={currency === "USD" ? 100 : 5000}
                        onValueChange={(val) => setAmount(val[0])}
                        className="py-4"
                    />
                </div>

                {/* Duration */}
                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Loan Duration</Label>
                        <span className="text-lg font-black text-primary">{duration} {duration === 1 ? 'Week' : 'Weeks'}</span>
                    </div>

                    <Slider
                        value={[duration]}
                        min={1}
                        max={12}
                        step={1}
                        onValueChange={(val) => setDuration(val[0])}
                        className="py-4"
                    />

                    <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 4, 8].map((w) => (
                            <button
                                key={w}
                                onClick={() => setDuration(w)}
                                className={cn(
                                    "py-2 rounded-lg text-xs font-bold transition-all border",
                                    duration === w
                                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                                        : "bg-muted/50 text-muted-foreground border-transparent hover:border-primary/20"
                                )}
                            >
                                {w}W
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Panel */}
                <div className="pt-6 border-t border-border/10 space-y-4">
                    <div className="flex justify-between items-center px-4 py-3 rounded-xl bg-primary/5 border border-primary/10">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm font-medium">Interest Rate</span>
                        </div>
                        <span className="font-bold">{(rate * 100).toFixed(0)}%</span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <DollarSign size={100} />
                        </div>

                        <div className="flex flex-col gap-1 relative z-10">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Total Repayment</span>
                            <span className="text-3xl font-black tracking-tighter">
                                {currency === "USD" ? "$" : ""}{totalRepayment.toLocaleString()} {currency === "RWF" ? "RWF" : ""}
                            </span>
                        </div>

                        <div className="flex justify-between items-center text-sm pt-3 border-t border-primary/20 relative z-10">
                            <span className="text-muted-foreground font-medium">Interest Amount:</span>
                            <span className="font-semibold">{currency === "USD" ? "$" : ""}{interest.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest font-medium opacity-60">
                    * Terms and conditions apply. Actual rates may vary based on risk assessment.
                </p>
            </div>
        </div>
    );
}
