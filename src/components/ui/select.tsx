"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const SelectValue = ({ placeholder, value }: { placeholder?: string; value?: string }) => (
    <span>{value || placeholder}</span>
);

const SelectContent = ({ children }: { children: React.ReactNode }) => <>{children}</>;

const SelectItem = ({ children, value }: { children: React.ReactNode; value: string }) => (
    <option value={value}>{children}</option>
);

const RealNativeSelect = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement> & { onValueChange?: (value: string) => void }>(
    ({ className, children, onValueChange, ...props }, ref) => (
        <div className="relative">
            <select
                ref={ref}
                onChange={(e) => onValueChange && onValueChange(e.target.value)}
                className={cn(
                    "flex h-9 w-full appearance-none rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pr-8",
                    className
                )}
                {...props}
            >
                {children}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50 pointer-events-none" />
        </div>
    )
);
RealNativeSelect.displayName = "RealNativeSelect";

export {
    RealNativeSelect as Select,
    RealNativeSelect as SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue
};
