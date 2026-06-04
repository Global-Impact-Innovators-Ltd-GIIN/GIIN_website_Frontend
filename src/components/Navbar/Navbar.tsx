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
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4",
        scrolled
          ? "bg-background/80 border-b border-border/10 backdrop-blur-[16px] py-3 shadow-lg"
          : "bg-transparent border-b border-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo size="md" className="transition-transform duration-300 hover:scale-[1.02]" />

        <nav className="hidden md:flex items-center gap-1.5" onMouseLeave={handleMouseLeave}>
          {navigationConfig.map((item) => {
            const isActive = isRouteActive(item);
            const isMenuOpen = activeMenu === item.label;
            const isHovered = hoveredHeader === item.label;

            return (
              <div key={item.label} className="relative" onMouseEnter={() => handleMouseEnter(item.label, item.type === "link")}>
                {item.type === "link" ? (
                  <Link
                    href={item.href || "/"}
                    ref={(el) => { headerRefs.current[item.label] = el; }}
                    onKeyDown={(e) => handleHeaderKeyDown(e, item)}
                    className={cn("relative px-4 py-2 text-sm font-bold tracking-wide rounded-lg text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-1.5")}
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
                    className={cn("relative px-4 py-2 text-sm font-bold tracking-wide rounded-lg text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-1.5 focus:outline-none")}
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
                      ref={(el) => { dropdownRefs.current[item.label] = el; }}
                      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-3 w-80 rounded-xl border border-border/10 shadow-xl backdrop-blur-[25px] overflow-hidden z-50 p-3 flex flex-col gap-1 bg-card/90"
                    >
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <AnimatePresence>
          {activeMenu === "Ecosystem" && (
            <div className="hidden md:block absolute top-full left-0 right-0 pointer-events-none z-40" onMouseEnter={() => setActiveMenu("Ecosystem")} onMouseLeave={handleMouseLeave}>
              <div className="pointer-events-auto">
                <MegaMenu sections={(navigationConfig.find((n) => n.label === "Ecosystem")?.items as MegaMenuSection[]) || []} onClose={() => setActiveMenu(null)} />
              </div>
            </div>
          )}
        </AnimatePresence>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2 pr-4 border-r border-border/10">
            <Link href="https://x.com" target="_blank" className="p-2 text-muted-foreground hover:text-primary transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.25 2.25h6.634l4.704 6.22 5.656-6.22zM17.082 19.77h1.833L7.084 4.126H5.117L17.082 19.77z" /></svg>
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="p-2 text-muted-foreground hover:text-primary transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" /></svg>
            </Link>
            <Link href="https://youtube.com" target="_blank" className="p-2 text-muted-foreground hover:text-primary transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
            </Link>
            <Link href="https://instagram.com" target="_blank" className="p-2 text-muted-foreground hover:text-primary transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.669-.072-4.949-.2-4.357-2.618-6.78-6.98-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4.162 4.162 0 1 1 0-8.324A4.162 4.162 0 0 1 12 16zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
            </Link>
          </div>

          {!user ? (
            <div className="flex items-center gap-3">
              <Link href="/auth/login" className="text-sm font-semibold text-muted-foreground hover:text-foreground px-3 py-2">Login</Link>
              <Link href="/auth/register" className="group/cta relative inline-flex items-center gap-1.5 text-sm font-bold bg-accent text-accent-foreground px-5 py-2.5 rounded-xl hover:bg-accent/90 transition-all shadow-xl">
                <span>Initialize Access</span>
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
          <button onClick={() => setIsMobileOpen(true)} className="p-2 rounded-lg border border-border/10 text-muted-foreground"><Menu className="w-5 h-5" /></button>
        </div>
      </div>

      <MobileMenu isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} user={user} onLogout={handleLogout} />
    </header>
  );
}
