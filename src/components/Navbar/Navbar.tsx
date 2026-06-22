"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ChevronDown, LogOut, ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { navigationConfig, NavItem, NavLink, MegaMenuSection } from "./NavigationConfig";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { AnimatedUnderline } from "./AnimatedUnderline";

interface NavbarProps {
  user: { email: string; role: string } | null;
}

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [hoveredHeader, setHoveredHeader] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRefs = useRef<Record<string, HTMLButtonElement | HTMLAnchorElement | null>>({});
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = (menuLabel: string, isLink: boolean) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (!isLink) {
      setActiveMenu(menuLabel);
    } else {
      setActiveMenu(null);
    }
    setHoveredHeader(menuLabel);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setHoveredHeader(null);
    }, 200);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
        if (activeMenu && headerRefs.current[activeMenu]) {
          headerRefs.current[activeMenu]?.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeMenu]);

  const isRouteActive = (item: NavItem) => {
    if (item.href === "/" && pathname === "/") return true;
    if (item.href && item.href !== "/" && pathname.startsWith(item.href)) return true;
    if (item.items) {
      if (item.type === "megamenu") {
        return (item.items as MegaMenuSection[]).some(sec =>
          sec.items.some(link => link.href !== "/" && pathname.startsWith(link.href))
        );
      } else {
        return (item.items as NavLink[]).some(link => link.href !== "/" && pathname.startsWith(link.href));
      }
    }
    return false;
  };

  const handleHeaderKeyDown = (e: React.KeyboardEvent, item: NavItem) => {
    const currentIndex = navigationConfig.indexOf(item);
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (item.type !== "link") {
        setActiveMenu(item.label);
        setTimeout(() => {
          const dropdown = dropdownRefs.current[item.label];
          const firstLink = dropdown?.querySelector("a, button") as HTMLElement;
          firstLink?.focus();
        }, 100);
      }
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextItem = navigationConfig[currentIndex + 1];
      if (nextItem) headerRefs.current[nextItem.label]?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevItem = navigationConfig[currentIndex - 1];
      if (prevItem) headerRefs.current[prevItem.label]?.focus();
    }
  };

  const handleDropdownKeyDown = (e: React.KeyboardEvent, label: string) => {
    const focusable = Array.from(
      dropdownRefs.current[label]?.querySelectorAll("a, button") || []
    ) as HTMLElement[];
    const active = document.activeElement as HTMLElement;
    const activeIdx = focusable.indexOf(active);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = focusable[activeIdx + 1] || focusable[0];
      next?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = focusable[activeIdx - 1] || focusable[focusable.length - 1];
      prev?.focus();
    } else if (e.key === "Tab") {
      setTimeout(() => {
        if (!dropdownRefs.current[label]?.contains(document.activeElement)) {
          setActiveMenu(null);
        }
      }, 50);
    }
  };

  const getIcon = (name?: string) => {
    if (!name) return Icons.HelpCircle;
    const IconComponent = (Icons as any)[name];
    return IconComponent || Icons.HelpCircle;
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 py-4",
        scrolled
          ? "bg-background/80 border-b border-border/10 backdrop-blur-[16px] py-3 shadow-lg"
          : "bg-transparent border-b border-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo size="md" className={cn("transition-transform duration-300 hover:scale-[1.02]", scrolled ? "text-foreground" : "text-white")} />

        <nav className="hidden md:flex items-center gap-1.5">
          {navigationConfig.map((item) => {
            const isActive = isRouteActive(item);
            const isMenuOpen = activeMenu === item.label;
            const isHovered = hoveredHeader === item.label;

            return (
              <div key={item.label} className="relative" onMouseEnter={() => handleMouseEnter(item.label, item.type === "link")} onMouseLeave={handleMouseLeave}>
                {item.type === "link" ? (
                  <Link
                    href={item.href || "/"}
                    ref={(el) => { headerRefs.current[item.label] = el; }}
                    onKeyDown={(e) => handleHeaderKeyDown(e, item)}
                    className={cn(
                      "relative px-4 py-2 text-sm font-bold tracking-wide rounded-lg transition-colors duration-300 flex items-center gap-1.5",
                      scrolled 
                        ? "text-muted-foreground hover:text-foreground" 
                        : "text-white/80 hover:text-white"
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive && <AnimatedUnderline layoutId="desktopActiveUnderline" />}
                  </Link>
                ) : (
                  <button
                    ref={(el) => { headerRefs.current[item.label] = el; }}
                    aria-haspopup="true"
                    aria-expanded={isMenuOpen}
                    onKeyDown={(e) => handleHeaderKeyDown(e, item)}
                    className={cn(
                      "relative px-4 py-2 text-sm font-bold tracking-wide rounded-lg transition-colors duration-300 flex items-center gap-1.5 focus:outline-none",
                      scrolled 
                        ? "text-muted-foreground hover:text-foreground" 
                        : "text-white/80 hover:text-white"
                    )}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", isMenuOpen && "rotate-180 text-primary")} />
                    {isActive && <AnimatedUnderline layoutId="desktopActiveUnderline" />}
                    {isHovered && <motion.span layoutId="headerHoverBg" className="absolute inset-0 bg-primary/5 rounded-lg -z-10 border border-primary/10" transition={{ type: "spring", stiffness: 350, damping: 28 }} />}
                  </button>
                )}

                <AnimatePresence>
                  {isMenuOpen && item.type === "dropdown" && (
                    <motion.div
                      key={item.label}
                      ref={(el) => { dropdownRefs.current[item.label] = el; }}
                      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 pt-3 w-80 z-[100] pointer-events-auto"
                    >
                      <div className="rounded-xl border border-border/10 shadow-xl backdrop-blur-[25px] overflow-hidden p-3 flex flex-col gap-1 bg-card/90">
                        {(item.items as NavLink[]).map((subLink, subIdx) => {
                          const DropdownIcon = getIcon(subLink.iconName);
                          return (
                            <Link key={subIdx} href={subLink.href} className="group/item flex gap-3.5 items-start p-2.5 rounded-lg border border-transparent hover:border-primary/10 hover:bg-primary/5 transition-all duration-300 relative z-10">
                              <div className="p-1.5 rounded-md border border-border/10 bg-muted/50 text-muted-foreground group-hover/item:text-primary group-hover/item:border-primary/20 transition-all">
                                <DropdownIcon className="w-4 h-4" />
                              </div>
                              <div className="flex flex-col min-w-0 font-outfit">
                                <span className="text-sm font-semibold text-foreground/80 group-hover/item:text-foreground transition-colors">{subLink.label}</span>
                                {subLink.description && <span className="text-xs text-muted-foreground mt-0.5 line-clamp-1 leading-normal font-light">{subLink.description}</span>}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <AnimatePresence>
          {activeMenu === "Ecosystem" && (
            <div className="hidden md:block absolute top-full left-0 right-0 pointer-events-none z-40 pt-1" onMouseEnter={() => handleMouseEnter("Ecosystem", false)} onMouseLeave={handleMouseLeave}>
              <div className="pointer-events-auto">
                <MegaMenu sections={(navigationConfig.find((n) => n.label === "Ecosystem")?.items as MegaMenuSection[]) || []} onClose={() => setActiveMenu(null)} />
              </div>
            </div>
          )}
        </AnimatePresence>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2 pr-4 border-r border-border/10">
            {/* Social links have been moved to the Footer */}
          </div>

          {!user ? (
            <div className="flex items-center gap-3">
              <Link 
                href="/auth/login" 
                className={cn(
                  "text-sm font-semibold px-3 py-2 transition-colors",
                  scrolled 
                    ? "text-muted-foreground hover:text-foreground" 
                    : "text-white/80 hover:text-white"
                )}
              >
                Login
              </Link>
              <Link href="/auth/register" className="group/cta relative inline-flex items-center gap-1.5 text-sm font-bold bg-accent text-accent-foreground px-5 py-2.5 rounded-xl hover:bg-accent/90 transition-all shadow-xl">
                <span>Sign Up</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-0.5" />
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {user.role === "ADMIN" && <Link href="/admin" className="text-xs font-semibold uppercase text-primary bg-primary/10 px-3.5 py-2 rounded-lg">Command Center</Link>}
              <button onClick={handleLogout} className="px-3 py-2 rounded-lg bg-red-500/10 text-red-500 text-xs font-bold uppercase"><LogOut className="w-3.5 h-3.5" /></button>
            </div>
          )}
          <ThemeToggle />
        </div>

        <div className="flex md:hidden items-center gap-3">
          <button 
            onClick={() => setIsMobileOpen(true)} 
            className={cn(
              "p-2 rounded-lg transition-colors",
              scrolled 
                ? "border border-border/10 text-muted-foreground hover:text-foreground" 
                : "border border-white/20 text-white/80 hover:text-white hover:border-white/40"
            )}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} user={user} onLogout={handleLogout} />
    </header>
  );
}
