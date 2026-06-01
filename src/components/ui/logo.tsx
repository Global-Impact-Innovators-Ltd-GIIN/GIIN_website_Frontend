"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
}

export function Logo({ className, showText = true, size = "md", href = "/" }: LogoProps) {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-20 h-20",
    xl: "w-32 h-32",
  };

  const textClasses = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-5xl",
    xl: "text-6xl",
  };

  return (
    <Link href={href} className={cn("flex items-center gap-5 group", className)}>
      <div className={cn("relative flex-shrink-0", sizeClasses[size])}>
        {/* Constant Animated Orbital Glow */}
        <div className="absolute inset--3 rounded-full bg-gradient-to-tr from-primary/30 via-accent/20 to-secondary/30 blur-2xl animate-spin-slow opacity-60" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 to-transparent blur-lg animate-glow-pulse" />

        <div className="relative z-10 w-full h-full flex items-center justify-center p-1">
          <Image
            src="/logo.png"
            alt="GIIN Logo"
            fill
            className="object-contain transition-all duration-700 group-hover:scale-110 drop-shadow-lg"
            priority
          />
        </div>
      </div>
      {showText && (
        <span className={cn("font-black tracking-tighter text-foreground selection:bg-accent/30 hidden sm:block font-outfit", textClasses[size])}>
          GIIN <span className="text-accent italic font-light">Ecosystem</span>
        </span>
      )}
    </Link>
  );
}
