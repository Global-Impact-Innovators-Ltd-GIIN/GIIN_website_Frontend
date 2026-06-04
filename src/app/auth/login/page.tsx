"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Loader2,
  Mail,
  Lock,
  ShieldCheck,
  AlertCircle,
  Fingerprint,
  Zap,
  Cpu
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

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

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-card/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] relative overflow-hidden group"
    >
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -mr-32 -mt-32 animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 blur-[100px] rounded-full -ml-32 -mb-32 animate-pulse pointer-events-none" />

      {/* Mesh lines effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative z-10">
        <motion.div variants={itemVariants} className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Zap className="w-3 h-3 fill-primary" />
            Vanguard Protocol
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3 tracking-tighter italic font-outfit uppercase">
            Initialize <span className="text-primary not-italic">Identity</span>
          </h2>
          <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-[280px]">
            Input your authorized enterprise credentials to establish a secure link.
          </p>
        </motion.div>

        <form onSubmit={handleLogin} className="space-y-6">
          <motion.div variants={itemVariants} className="space-y-2 group">
            <label className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.2em] pl-1">Command Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-all duration-300">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-14 pr-5 py-5 text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all duration-300 shadow-inner"
                placeholder="operator@giin.tech"
                required
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2 group">
            <div className="flex items-center justify-between pl-1">
              <label className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.2em]">Coded Passkey</label>
              <Link href="/auth/forgot" className="text-[10px] font-black text-primary/40 hover:text-primary uppercase tracking-widest transition-colors">Access Recovery</Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-all duration-300">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-14 pr-5 py-5 text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all duration-300 shadow-inner"
                placeholder="••••••••••••"
                required
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-3 px-1">
            <label className="relative flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-5 h-5 bg-white/5 border border-white/10 rounded-lg peer-checked:bg-primary peer-checked:border-primary transition-all" />
              <ShieldCheck className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 left-1 transition-opacity pointer-events-none" />
            </label>
            <span className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest">Maintain Station link</span>
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="p-5 bg-destructive/10 border border-destructive/20 rounded-2xl text-destructive text-xs font-bold flex items-center gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 animate-bounce">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest opacity-60 mb-1">Transmission Failure</span>
                  {error}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            variants={itemVariants}
            type="submit"
            disabled={loading}
            className="group relative mt-4 w-full h-16 overflow-hidden rounded-[1.25rem] transition-all active:scale-95 disabled:opacity-50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-size-200 group-hover:bg-pos-100 transition-all duration-500" />
            <div className="relative h-full flex items-center justify-center gap-3 bg-card/60 backdrop-blur-md m-[1px] rounded-[calc(1.25rem-1px)] transition-all group-hover:bg-transparent">
              {loading ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Encrypting...</span>
                </div>
              ) : (
                <>
                  <span className="text-xs font-black text-foreground uppercase tracking-[0.3em] group-hover:text-white transition-colors">Establish Connection</span>
                  <Fingerprint className="w-6 h-6 text-primary group-hover:text-white transition-all group-hover:scale-110" />
                </>
              )}
            </div>
          </motion.button>
        </form>

        <motion.div variants={itemVariants} className="mt-12 text-center">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent mb-8" />
          <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">
            Unidentified Personnel?{" "}
            <Link href="/auth/register" className="text-primary hover:text-accent transition-all ml-2 underline decoration-primary/20 underline-offset-4">
              Request Clearance
            </Link>
          </p>
          <div className="flex justify-center gap-8 mt-10 opacity-20 group-hover:opacity-40 transition-opacity">
            <Cpu className="w-5 h-5" />
            <Fingerprint className="w-5 h-5" />
            <Lock className="w-5 h-5" />
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .bg-size-200 { background-size: 200% 100%; }
        .bg-pos-100 { background-position: 100% 0; }
      `}</style>
    </motion.div>
  );
}
