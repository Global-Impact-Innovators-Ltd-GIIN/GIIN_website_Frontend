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
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const textClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-5xl",
  };

  return (
    <Link href={href} className={cn("flex items-center gap-3", className)}>
      <div className={cn("relative flex-shrink-0", sizeClasses[size])}>
        <Image
          src="/logo.png"
          alt="GIIN Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <span className={cn("font-bold tracking-tighter text-white hidden sm:block", textClasses[size])}>
          GIIN <span className="text-accent italic font-light">Ecosystem</span>
        </span>
      )}
    </Link>
  );
}
