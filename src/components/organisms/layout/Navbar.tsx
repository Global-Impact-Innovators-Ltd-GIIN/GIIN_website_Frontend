"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

import Image from "next/image";

import { Logo } from "@/components/ui/logo";

interface NavbarProps {
  user: { email: string; role: string } | null;
}

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-6 py-4 border-b border-border bg-background/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo size="md" />

        <div className="flex items-center gap-6">
          <Link href="/leadership" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Leadership
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              {user.role === "ADMIN" && (
                <Link href="/admin" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                  Command Center
                </Link>
              )}
              <span className="text-sm text-muted-foreground border-l border-border pl-4">
                {user.email}
              </span>
              <button 
                onClick={handleLogout} 
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors text-sm font-medium border border-red-500/20"
              >
                <LogOut className="w-4 h-4" /> Disconnect
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/auth/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Login
              </Link>
              <Link href="/auth/register" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)]">
                Initialize Access
              </Link>
            </div>
          )}
          
          <div className="pl-2 border-l border-border flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
