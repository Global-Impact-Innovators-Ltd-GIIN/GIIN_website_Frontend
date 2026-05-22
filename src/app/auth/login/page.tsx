"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

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
        throw new Error(data.error || "Login failed");
      }

      // Route based on role
      if (data.user.isSuperAdmin) {
        router.push("/admin");
      } else {
        router.push("/leadership");
      }
      
      // Force refresh to update navigation states
      router.refresh();
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
      
      <form onSubmit={handleLogin} className="relative z-10 flex flex-col gap-5">
        <div>
          <label className="text-sm font-medium text-slate-300 mb-1.5 block">Enterprise Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
            placeholder="ceo@enterprise.com"
            required
          />
        </div>
        
        <div>
          <label className="text-sm font-medium text-slate-300 mb-1.5 block">Secure Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
            placeholder="••••••••"
            required
          />
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading}
          className="mt-2 w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-xl transition-all shadow-[0_0_30px_-5px_rgba(79,70,229,0.4)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
            <>Access Terminal <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </form>

      <div className="relative z-10 mt-6 text-center text-sm text-slate-400">
        Don't have an enterprise account?{" "}
        <Link href="/auth/register" className="text-primary hover:underline font-medium">
          Request Access
        </Link>
      </div>
    </div>
  );
}
