"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

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
    <nav className="absolute top-0 left-0 w-full z-50 px-6 py-4 border-b border-white/5 bg-background/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
          GIIN <span className="text-primary">Ecosystem</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/leadership" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Leadership
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              {user.role === "ADMIN" && (
                <Link href="/admin" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                  Command Center
                </Link>
              )}
              <span className="text-sm text-slate-400 border-l border-white/10 pl-4">
                {user.email}
              </span>
              <button 
                onClick={handleLogout} 
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm font-medium border border-red-500/20"
              >
                <LogOut className="w-4 h-4" /> Disconnect
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/auth/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Login
              </Link>
              <Link href="/auth/register" className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)]">
                Initialize Access
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
