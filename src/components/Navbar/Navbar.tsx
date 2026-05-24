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

  // Clean up hover timeout on unmount
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

  // Detect scroll to style navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  // Keyboard navigation & accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
        // Focus active menu trigger
        if (activeMenu && headerRefs.current[activeMenu]) {
          headerRefs.current[activeMenu]?.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeMenu]);

  // Check if link or nested item matches pathname to determine if active
  const isRouteActive = (item: NavItem) => {
    if (item.href === "/" && pathname === "/") return true;
    if (item.href && item.href !== "/" && pathname.startsWith(item.href)) return true;

    // Check nested links
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
        // Focus first element in dropdown after frame
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
      // Let tab behavior execute but close if out of boundary
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

        {/* LOGO */}
        <Logo size="md" className="transition-transform duration-300 hover:scale-[1.02]" />

        {/* DESKTOP MENU BUTTONS */}
        <nav
          className="hidden md:flex items-center gap-1.5"
          onMouseLeave={handleMouseLeave}
        >
          {navigationConfig.map((item) => {
            const isActive = isRouteActive(item);
            const isMenuOpen = activeMenu === item.label;
            const isHovered = hoveredHeader === item.label;

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label, item.type === "link")}
              >
                {item.type === "link" ? (
                  <Link
                    href={item.href || "/"}
                    ref={(el) => { headerRefs.current[item.label] = el; }}
                    onKeyDown={(e) => handleHeaderKeyDown(e, item)}
                    className={cn(
                      "relative px-4 py-2 text-sm font-bold tracking-wide rounded-lg text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-1.5"
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <AnimatedUnderline layoutId="desktopActiveUnderline" />
                    )}
                  </Link>
                ) : (
                  <button
                    ref={(el) => { headerRefs.current[item.label] = el; }}
                    aria-haspopup="true"
                    aria-expanded={isMenuOpen}
                    aria-label={`${item.label} menu`}
                    onKeyDown={(e) => handleHeaderKeyDown(e, item)}
                    className={cn(
                      "relative px-4 py-2 text-sm font-bold tracking-wide rounded-lg text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-1.5 focus:outline-none"
                    )}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 transition-transform duration-300",
                        isMenuOpen && "rotate-180 text-primary"
                      )}
                    />

                    {/* Route Active Underline */}
                    {isActive && (
                      <AnimatedUnderline layoutId="desktopActiveUnderline" />
                    )}

                    {/* Header Hover Glow */}
                    {isHovered && (
                      <motion.span
                        layoutId="headerHoverBg"
                        className="absolute inset-0 bg-primary/5 rounded-lg -z-10 border border-primary/10"
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}
                  </button>
                )}

                {/* Standard Dropdown Panels */}
                <AnimatePresence>
                  {isMenuOpen && item.type === "dropdown" && (
                    <motion.div
                      ref={(el) => { dropdownRefs.current[item.label] = el; }}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      onKeyDown={(e) => handleDropdownKeyDown(e, item.label)}
                      className="absolute top-full left-0 mt-3 w-80 rounded-xl border border-border/10 shadow-xl backdrop-blur-[25px] overflow-hidden z-50 p-3 flex flex-col gap-1 bg-card/90"
                    >
                      {/* Ambient background accent */}
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-primary/5 to-transparent" />

                      {(item.items as NavLink[]).map((subLink, subIdx) => {
                        const DropdownIcon = getIcon(subLink.iconName);
                        return (
                          <Link
                            key={subIdx}
                            href={subLink.href}
                            className="group/item flex gap-3.5 items-start p-2.5 rounded-lg border border-transparent hover:border-primary/10 hover:bg-primary/5 transition-all duration-300 relative z-10"
                          >
                            <div className="p-1.5 rounded-md border border-border/10 bg-muted/50 text-muted-foreground group-hover/item:text-primary group-hover/item:border-primary/20 transition-all">
                              <DropdownIcon className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-sm font-semibold text-foreground/80 group-hover/item:text-foreground transition-colors">
                                {subLink.label}
                              </span>
                              {subLink.description && (
                                <span className="text-xs text-muted-foreground group-hover/item:text-muted-foreground/80 transition-colors mt-0.5 line-clamp-1 leading-normal font-light">
                                  {subLink.description}
                                </span>
                              )}
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

        {/* Flagship Mega Menu Container Overlay (Ecosystem Item) */}
        <AnimatePresence>
          {activeMenu === "Ecosystem" && (
            <div
              className="hidden md:block absolute top-full left-0 right-0 pointer-events-none z-40"
              onMouseEnter={() => {
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                  timeoutRef.current = null;
                }
                setActiveMenu("Ecosystem");
              }}
              onMouseLeave={handleMouseLeave}
            >
              <div className="pointer-events-auto">
                <MegaMenu
                  sections={
                    (navigationConfig.find((n) => n.label === "Ecosystem")
                      ?.items as MegaMenuSection[]) || []
                  }
                  onClose={() => setActiveMenu(null)}
                />
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* DESKTOP CONTROLS & AUTH */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              {user.role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="group/admin relative flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors duration-300 bg-primary/10 border border-primary/20 px-3.5 py-2 rounded-lg hover:bg-primary/20"
                >
                  <span>Command Center</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/admin:translate-x-0.5" />
                </Link>
              )}
              <span className="text-sm text-muted-foreground font-mono pl-4 border-l border-border/10 max-w-[140px] truncate">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 transition-all text-xs font-semibold uppercase tracking-wider"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="text-sm font-semibold tracking-wide text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="group/cta relative inline-flex items-center gap-1.5 text-sm font-bold tracking-wide bg-accent text-accent-foreground px-5 py-2.5 rounded-xl hover:bg-accent/90 transition-all shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_-5px_rgba(245,158,11,0.6)]"
              >
                <span>Initialize Access</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-0.5" />
              </Link>
            </div>
          )}

          <div className="pl-4 border-l border-border/10">
            <ThemeToggle />
          </div>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 rounded-lg border border-border/10 bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Open mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* FULL SCREEN ECOSYSTEM MOBILE MENU */}
      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        user={user}
        onLogout={handleLogout}
      />
    </header>
  );
}
