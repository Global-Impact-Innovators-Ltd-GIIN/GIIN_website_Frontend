"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,
  CreditCard,
  Ticket,
  FolderLock,
  Bell,
  Search,
  LogOut,
  ChevronRight,
  User as UserIcon,
  Shield,
  Settings,
  Menu,
  X,
  Sparkles
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

interface UserData {
  id: string;
  email: string;
  firstName: string;
  isSuperAdmin: boolean;
  organizations: Array<{ id: string; name: string; role: string }>;
}

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          router.push("/auth/login");
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  const navItems = [
    { name: "Dashboard", href: "/portal", icon: LayoutDashboard },
    { name: "Projects", href: "/portal/projects", icon: Briefcase },
    { name: "Finance", href: "/portal/finance", icon: CreditCard },
    { name: "Support", href: "/portal/support", icon: Ticket },
    { name: "Documents", href: "/portal/documents", icon: FolderLock }
  ];

  if (loading) {
    return (
      <div className="h-screen w-full bg-[#020205] flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-t-2 border-blue-500 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full blur-md animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // Determine portal type (Experience) based on role
  const portalType = user?.isSuperAdmin
    ? { label: "Command Center", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" }
    : user?.organizations?.[0]?.role === "ORG_ADMIN"
      ? { label: "Executive Suite", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" }
      : { label: "Client Portal", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" };

  return (
    <div className="min-h-screen bg-[#020205] text-slate-200 selection:bg-blue-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {isSidebarOpen && (
            <motion.aside
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-72 bg-[#05050a]/80 backdrop-blur-3xl border-r border-white/5 flex flex-col fixed h-full z-50 overflow-hidden"
            >
              {/* Sidebar Header */}
              <div className="p-8 pb-4">
                <Link href="/" className="flex items-center gap-3 group">
                  <Logo size="sm" className="transition-transform group-hover:scale-110" />
                  <span className="font-bold text-lg tracking-tighter text-white">GIIN <span className="text-blue-500 font-light">SYSTEMS</span></span>
                </Link>

                <div className="mt-8 relative group">
                  <div className={cn("absolute inset-0 blur-md opacity-20 -z-10", portalType.bg)} />
                  <div className={cn("rounded-2xl border p-4 transition-all duration-300", portalType.bg, portalType.border)}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border border-white/10 flex items-center justify-center text-xs font-bold ring-2 ring-white/5 ring-offset-2 ring-offset-[#05050a]">
                        {user?.firstName?.[0] || user?.email[0].toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">{user?.firstName || "Operator"}</p>
                        <p className={cn("text-[10px] font-bold uppercase tracking-widest", portalType.color)}>
                          {portalType.label}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-6 space-y-2 mt-4">
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] mb-4 pl-2">Navigation Terminal</p>
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-300 relative",
                        isActive
                          ? "bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_4px_20px_rgba(59,130,246,0.1)]"
                          : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                      )}
                    >
                      <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive ? "text-blue-400" : "text-slate-500 group-hover:text-blue-400")} />
                      <span className="flex-1">{item.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="active-indicator"
                          className="absolute right-3 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"
                        />
                      )}
                    </Link>
                  );
                })}

                <div className="pt-8">
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] mb-4 pl-2">System Config</p>
                  <Link href="/portal/settings" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                    <Settings className="w-5 h-5" />
                    Settings
                  </Link>
                </div>
              </nav>

              {/* Sidebar Footer */}
              <div className="p-6 border-t border-white/5">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-slate-500 hover:text-red-400 hover:bg-red-500/5 rounded-2xl transition-all border border-transparent hover:border-red-500/20"
                >
                  <LogOut className="w-4 h-4" />
                  Terminate Session
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className={cn(
          "flex-1 relative min-h-screen flex flex-col transition-all duration-500 ease-in-out",
          isSidebarOpen ? "md:ml-72" : "ml-0"
        )}>
          {/* Top Header Bar */}
          <header className="h-24 px-10 flex items-center justify-between sticky top-0 z-40 bg-[#020205]/60 backdrop-blur-xl border-b border-white/5">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/5"
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">System Online</span>
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {navItems.find(n => n.href === pathname)?.name || "Control Center"}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center bg-white/5 border border-white/5 rounded-2xl px-4 py-2 focus-within:border-blue-500/50 transition-all">
                <Search className="w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Universal Research..."
                  className="bg-transparent border-none text-sm px-3 focus:outline-none w-48 lg:w-64 placeholder:text-slate-600"
                />
              </div>

              <div className="relative">
                <button
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/5 relative group",
                    showNotifications && "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  )}
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-blue-500 border-2 border-[#020205] group-hover:scale-110 transition-transform" />
                </button>

                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-96 bg-[#0a0a14]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-50"
                    >
                      <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
                        <h3 className="font-bold text-sm text-white flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-blue-400" />
                          Activity Stream
                        </h3>
                        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2 py-1 rounded-md">3 New</span>
                      </div>
                      <div className="max-h-[420px] overflow-y-auto custom-scrollbar">
                        {[
                          { title: "Security Protocols Active", desc: "Enterprise-grade encryption verified across all nodes.", time: "2 min ago", icon: Shield, color: "text-blue-400", bg: "bg-blue-500/10" },
                          { title: "New Documentation Artifact", desc: "Project 'Nexus-X' technical brief has been uploaded.", time: "1 hour ago", icon: FolderLock, color: "text-purple-400", bg: "bg-purple-500/10" },
                          { title: "Financial Assessment Ready", desc: "Monthly infrastructure ROI report is now available.", time: "4 hours ago", icon: CreditCard, color: "text-emerald-400", bg: "bg-emerald-500/10" }
                        ].map((notif, i) => (
                          <div key={i} className="p-5 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors group flex gap-4">
                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110", notif.bg, notif.color)}>
                              <notif.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-0.5">
                                <p className="text-sm font-bold text-white leading-tight">{notif.title}</p>
                                <span className="text-[10px] text-slate-600 font-medium whitespace-nowrap ml-2">{notif.time}</span>
                              </div>
                              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{notif.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 bg-[#05050a] flex items-center justify-center">
                        <button className="text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-[0.2em] transition-colors">Clear All History</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="h-10 w-px bg-white/5 mx-2" />

              <button className="flex items-center gap-3 pl-2 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 border border-white/10 shadow-[0_4px_12px_rgba(99,102,241,0.2)]" />
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-bold text-white leading-none mb-1">Secure Session</p>
                  <p className="text-[10px] font-medium text-slate-500 uppercase tracking-tighter">ID: terminal_0x442</p>
                </div>
              </button>
            </div>
          </header>

          {/* Page Content Viewport */}
          <div className="p-10 flex-1 relative overflow-hidden">
            {/* Sub-grid pattern for content */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="relative z-10 h-full">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
