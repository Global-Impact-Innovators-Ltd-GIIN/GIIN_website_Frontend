"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ChevronUp, LogOut, ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";
import { navigationConfig, NavItem, MegaMenuSection, NavLink } from "./NavigationConfig";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: { email: string; role: string } | null;
  onLogout: () => void;
}

export function MobileMenu({ isOpen, onClose, user, onLogout }: MobileMenuProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [expandedSubsections, setExpandedSubsections] = useState<Record<string, boolean>>({});

  const toggleSection = (label: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const toggleSubsection = (title: string) => {
    setExpandedSubsections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const getIcon = (name?: string) => {
    if (!name) return Icons.HelpCircle;
    const IconComponent = (Icons as any)[name];
    return IconComponent || Icons.HelpCircle;
  };

  // Framer Motion panel variants
  const panelVariants: any = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex flex-col h-screen w-screen bg-slate-950/98 backdrop-blur-2xl overflow-y-auto px-6 py-6"
        >
          {/* Ambient Glowing Background Stars/Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            <svg className="absolute inset-0 w-full h-full opacity-30">
              <circle cx="10%" cy="15%" r="1" className="fill-slate-400 animate-pulse" />
              <circle cx="85%" cy="30%" r="1.5" className="fill-slate-400 animate-pulse" />
              <circle cx="40%" cy="75%" r="1" className="fill-slate-400 animate-pulse" />
              <circle cx="70%" cy="60%" r="2" className="fill-slate-400 animate-pulse" />
            </svg>
          </div>

          {/* Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
              <span className="font-heading font-extrabold tracking-wider text-xl text-white">
                GIIN <span className="text-primary">ECOSYSTEM</span>
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={onClose}
                className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Nav List */}
          <div className="relative z-10 flex-1 flex flex-col justify-between py-8 gap-8">
            <nav className="flex flex-col gap-4">
              {navigationConfig.map((item) => {
                const isExpanded = expandedSections[item.label];

                return (
                  <motion.div key={item.label} variants={itemVariants} className="border-b border-white/5 pb-3">
                    <button
                      onClick={() => toggleSection(item.label)}
                      className="flex items-center justify-between w-full text-lg font-semibold font-heading text-slate-200 hover:text-white py-2 text-left"
                    >
                      <span>{item.label}</span>
                      {item.type !== "link" && (
                        isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-primary" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )
                      )}
                    </button>

                    {/* Section links */}
                    <AnimatePresence initial={false}>
                      {isExpanded && item.items && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden pl-4 flex flex-col gap-3 mt-2"
                        >
                          {item.type === "megamenu" ? (
                            // Mega Menu lists (nested collapsibles for Ecosystem)
                            (item.items as MegaMenuSection[]).map((subsection) => {
                              const isSubExpanded = expandedSubsections[subsection.title];

                              return (
                                <div key={subsection.title} className="mb-2">
                                  <button
                                    onClick={() => toggleSubsection(subsection.title)}
                                    className="flex items-center justify-between w-full text-sm font-medium font-mono text-primary py-1.5 hover:text-primary/85 text-left"
                                  >
                                    <span>{subsection.title}</span>
                                    {isSubExpanded ? (
                                      <ChevronUp className="w-3.5 h-3.5" />
                                    ) : (
                                      <ChevronDown className="w-3.5 h-3.5" />
                                    )}
                                  </button>

                                  <AnimatePresence initial={false}>
                                    {isSubExpanded && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="pl-3 flex flex-col gap-2 mt-1.5 border-l border-white/5 ml-1"
                                      >
                                        {subsection.items.map((subitem) => {
                                          const SubIcon = getIcon(subitem.iconName);
                                          return (
                                            <Link
                                              key={subitem.label}
                                              href={subitem.href}
                                              onClick={onClose}
                                              className="flex items-center gap-3 py-1.5 text-slate-400 hover:text-white transition-colors"
                                            >
                                              <SubIcon className="w-4 h-4 text-slate-500" />
                                              <span className="text-sm font-light">{subitem.label}</span>
                                            </Link>
                                          );
                                        })}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            })
                          ) : (
                            // Standard dropdown list items
                            (item.items as NavLink[]).map((subitem) => {
                              const SubIcon = getIcon(subitem.iconName);
                              return (
                                <Link
                                  key={subitem.label}
                                  href={subitem.href}
                                  onClick={onClose}
                                  className="flex items-center gap-3 py-2 text-slate-400 hover:text-white transition-colors"
                                >
                                  <SubIcon className="w-4 h-4 text-slate-500" />
                                  <div className="flex flex-col">
                                    <span className="text-sm font-medium">{subitem.label}</span>
                                    {subitem.description && (
                                      <span className="text-xs text-slate-500 font-light mt-0.5 line-clamp-1">
                                        {subitem.description}
                                      </span>
                                    )}
                                  </div>
                                </Link>
                              );
                            })
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </nav>

            {/* Footer with Session Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col gap-4 border-t border-white/5 pt-6">
              {user ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-xs text-slate-400 truncate max-w-[200px]">{user.email}</span>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20">
                      {user.role}
                    </span>
                  </div>
                  {user.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      onClick={onClose}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/95 transition-colors text-sm shadow-[0_0_15px_rgba(127,76,165,0.3)]"
                    >
                      Command Center
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 transition-colors text-sm"
                  >
                    <LogOut className="w-4 h-4" /> Disconnect
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    href="/auth/login"
                    onClick={onClose}
                    className="flex items-center justify-center w-full py-3 rounded-xl border border-white/10 bg-white/5 text-slate-300 font-semibold hover:bg-white/10 hover:text-white transition-all text-sm"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={onClose}
                    className="flex items-center justify-center gap-1.5 w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/95 transition-all text-sm shadow-[0_0_15px_rgba(127,76,165,0.3)]"
                  >
                    <span>Initialize</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
