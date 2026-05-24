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
      className="bg-[#0a0a12]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden"
    >
      {/* Decorative inner elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full -ml-16 -mb-16 pointer-events-none" />

      <div className="relative z-10">
        <div className="mb-8 overflow-hidden">
          <h2 className="text-xl font-bold text-white mb-2">Initialize Identity</h2>
          <p className="text-slate-400 text-sm">Enter your enterprise credentials to access the ecosystem.</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="space-y-2 group">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Enterprise Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                placeholder="identity@giin.tech"
                required
              />
            </div>
          </div>

          <div className="space-y-2 group">
            <div className="flex items-center justify-between pl-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Secret Keyword</label>
              <Link href="/auth/forgot" className="text-[10px] font-bold text-slate-600 hover:text-blue-400 uppercase tracking-tighter transition-colors">Recover Access</Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2 px-1">
            <div className="w-4 h-4 rounded border border-white/10 bg-white/5 flex items-center justify-center cursor-pointer hover:border-blue-500/50 transition-colors">
              <div className="w-2 h-2 rounded-sm bg-blue-500 opacity-0" />
            </div>
            <span className="text-xs text-slate-500 font-medium select-none">Remember this terminal session</span>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-red-500/5 border border-red-500/20 rounded-2xl text-red-400 text-xs font-medium flex items-center gap-3"
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
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600" />
            <div className="relative flex items-center justify-center gap-2 bg-[#0a0a12] rounded-[calc(1rem-1px)] py-4 transition-all group-hover:bg-transparent">
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
              ) : (
                <>
                  <span className="text-sm font-bold text-white uppercase tracking-widest">Connect to Network</span>
                  <ShieldCheck className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" />
                </>
              )}
            </div>
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500 font-medium">
            New to the ecosystem?{" "}
            <Link href="/auth/register" className="text-blue-400 hover:text-blue-300 transition-colors font-bold uppercase tracking-tight">
              Request Onboarding
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
