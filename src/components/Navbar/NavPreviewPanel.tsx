"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";
import { NavLink } from "./NavigationConfig";

interface NavPreviewPanelProps {
  activeItem: NavLink | null;
}

export function NavPreviewPanel({ activeItem }: NavPreviewPanelProps) {
  // Gracefully fallback to Lucide components, default to HelpCircle if not found
  const getIcon = (name?: string) => {
    if (!name) return Icons.HelpCircle;
    const IconComponent = (Icons as any)[name];
    return IconComponent || Icons.HelpCircle;
  };

  const ActiveIcon = activeItem ? getIcon(activeItem.iconName) : Icons.HelpCircle;

  return (
    <div className="relative h-full w-full flex flex-col justify-between border-l border-border/10 pl-8 pr-4 py-2">
      <AnimatePresence mode="wait">
        {activeItem ? (
          <motion.div
            key={activeItem.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex flex-col h-full justify-between gap-6"
          >
            {/* Visual Card */}
            <div className="relative h-44 w-full rounded-xl overflow-hidden border border-border/10 bg-muted/20 p-4 flex items-center justify-center">
              {/* Dynamic Scanning Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:14px_24px] opacity-20" />

              {/* Glow spots */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute top-12 right-12 w-12 h-12 bg-secondary/15 rounded-full blur-xl animate-pulse" />

              {/* Laser Scanning Bar */}
              <motion.div
                animate={{ y: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              />

              {/* Animated Floating Nodes inside visual card */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-full h-full opacity-45" viewBox="0 0 200 120">
                  <motion.circle
                    cx="40"
                    cy="30"
                    r="3"
                    className="fill-primary"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}
                  />
                  <motion.circle
                    cx="160"
                    cy="80"
                    r="4"
                    className="fill-secondary"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
                  />
                  <motion.circle
                    cx="100"
                    cy="60"
                    r="5"
                    className="fill-accent"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ repeat: Infinity, duration: 3, delay: 0.8 }}
                  />
                  <line x1="40" y1="30" x2="100" y2="60" className="stroke-border/20 stroke-1" />
                  <line x1="160" y1="80" x2="100" y2="60" className="stroke-border/20 stroke-1" />
                </svg>
              </div>

              {/* Central Glowing Icon */}
              <div className="relative z-10 p-4 rounded-full border border-primary/30 bg-background/80 shadow-[0_0_20px_var(--primary-glow)]">
                <ActiveIcon className="w-8 h-8 text-primary animate-pulse" />
              </div>
            </div>

            {/* Info details */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs uppercase font-mono tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                    System Hub
                  </span>
                  {activeItem.badge && (
                    <span className="text-xs uppercase font-mono tracking-widest text-secondary bg-secondary/10 px-2 py-0.5 rounded border border-secondary/20">
                      {activeItem.badge}
                    </span>
                  )}
                </div>
                <h4 className="text-xl font-bold font-heading text-foreground mb-2 tracking-wide">
                  {activeItem.label}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  {activeItem.description}
                </p>
              </div>

              <Link
                href={activeItem.href}
                className="group/btn inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary/80 border border-primary/20 hover:border-primary/40 transition-all font-medium text-sm self-start"
              >
                <span>{activeItem.ctaText || "Initialize"}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full text-center py-12"
          >
            <div className="p-4 rounded-full border border-dashed border-border/20 mb-4">
              <Icons.Activity className="w-8 h-8 text-muted-foreground animate-pulse" />
            </div>
            <p className="text-sm text-muted-foreground font-mono tracking-wider">
              HOVER A NODE TO ACTIVATE INTERFACE
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
