"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Loader2,
  User,
  Mail,
  Lock,
  ShieldCheck,
  AlertCircle,
  Component,
  Globe2,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      router.push("/leadership/programs");
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
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-card/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] relative overflow-hidden"
    >
      {/* High-tech background accents */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full -ml-32 -mt-32 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -mr-32 -mb-32 pointer-events-none" />

      <div className="relative z-10">
        <motion.div variants={itemVariants} className="mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[9px] font-black uppercase tracking-[0.2em] mb-6">
            <Sparkles className="w-3 h-3 fill-accent" />
            Create Account
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3 tracking-tighter italic font-outfit uppercase">
            Sign <span className="text-accent not-italic">Up</span>
          </h2>
          <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-[320px]">
            Begin your journey by creating an account today.
          </p>
        </motion.div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="space-y-2 group">
              <label className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.2em] pl-1">First Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-accent transition-colors">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-11 pr-4 py-4 text-foreground placeholder:text-muted-foreground/10 focus:outline-none focus:border-accent/40 focus:bg-white/[0.05] transition-all text-sm"
                  placeholder="Amina"
                  required
                />
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-2 group">
              <label className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.2em] pl-1">Last Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-accent transition-colors">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-11 pr-4 py-4 text-foreground placeholder:text-muted-foreground/10 focus:outline-none focus:border-accent/40 focus:bg-white/[0.05] transition-all text-sm"
                  placeholder="Keita"
                  required
                />
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="space-y-2 group">
            <label className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.2em] pl-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-accent transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-11 pr-4 py-4 text-foreground placeholder:text-muted-foreground/10 focus:outline-none focus:border-accent/40 focus:bg-white/[0.05] transition-all text-sm"
                placeholder="name@example.com"
                required
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2 group">
            <label className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.2em] pl-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-accent transition-colors">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-11 pr-4 py-4 text-foreground placeholder:text-muted-foreground/10 focus:outline-none focus:border-accent/40 focus:bg-white/[0.05] transition-all text-sm"
                placeholder="••••••••••••"
                required
              />
            </div>
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-bold flex items-center gap-4"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 animate-pulse" />
                <div>
                  <span className="block text-[8px] uppercase tracking-widest opacity-60 mb-1">Registration Error</span>
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
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary animate-gradient-x" />
            <div className="relative h-full flex items-center justify-center gap-3 bg-card/70 backdrop-blur-md m-[1px] rounded-[calc(1.25rem-1px)] transition-all group-hover:bg-transparent">
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-accent" />
              ) : (
                <>
                  <span className="text-xs font-black text-foreground uppercase tracking-[0.3em] group-hover:text-white transition-colors">Sign Up</span>
                  <Globe2 className="w-6 h-6 text-accent group-hover:text-white transition-all group-hover:rotate-12" />
                </>
              )}
            </div>
          </motion.button>
        </form>

        <motion.div variants={itemVariants} className="mt-10 text-center">
          <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-accent hover:text-white transition-colors ml-2">
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
      `}</style>
    </motion.div>
  );
}
