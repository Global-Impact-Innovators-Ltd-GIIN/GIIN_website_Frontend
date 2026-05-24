"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Mail, Lock, ShieldCheck, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      // Route based on role
      if (data.user.isSuperAdmin) {
        router.push("/admin");
      } else {
        router.push("/leadership");
      }

      router.refresh();

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-card/80 backdrop-blur-2xl border border-border/10 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden"
    >
      {/* Decorative inner elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 blur-3xl rounded-full -ml-16 -mb-16 pointer-events-none" />

      <div className="relative z-10">
        <div className="mb-8 overflow-hidden">
          <h2 className="text-xl font-bold text-foreground mb-2">Initialize Identity</h2>
          <p className="text-muted-foreground text-sm">Enter your enterprise credentials to access the ecosystem.</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="space-y-2 group">
            <label className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest pl-1">Enterprise Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-muted/50 border border-border/10 rounded-2xl pl-12 pr-4 py-4 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:bg-background transition-all"
                placeholder="identity@giin.tech"
                required
              />
            </div>
          </div>

          <div className="space-y-2 group">
            <div className="flex items-center justify-between pl-1">
              <label className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">Secret Keyword</label>
              <Link href="/auth/forgot" className="text-[10px] font-bold text-muted-foreground/40 hover:text-primary uppercase tracking-tighter transition-colors">Recover Access</Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-muted/50 border border-border/10 rounded-2xl pl-12 pr-4 py-4 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:bg-background transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2 px-1">
            <div className="w-4 h-4 rounded border border-border/20 bg-muted flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
              <div className="w-2 h-2 rounded-sm bg-primary opacity-0" />
            </div>
            <span className="text-xs text-muted-foreground font-medium select-none">Remember this terminal session</span>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-destructive/5 border border-destructive/20 rounded-2xl text-destructive text-xs font-medium flex items-center gap-3"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group relative mt-2 w-full overflow-hidden rounded-2xl p-[1px] transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary" />
            <div className="relative flex items-center justify-center gap-2 bg-card rounded-[calc(1rem-1px)] py-4 transition-all group-hover:bg-transparent">
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              ) : (
                <>
                  <span className="text-sm font-bold text-foreground uppercase tracking-widest group-hover:text-primary-foreground transition-colors">Connect to Network</span>
                  <ShieldCheck className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </>
              )}
            </div>
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground font-medium">
            New to the ecosystem?{" "}
            <Link href="/auth/register" className="text-primary hover:text-primary/80 transition-colors font-bold uppercase tracking-tight">
              Request Onboarding
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
