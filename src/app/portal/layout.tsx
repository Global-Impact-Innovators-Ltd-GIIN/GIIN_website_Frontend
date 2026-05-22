"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/portal", icon: "📊" },
    { name: "Projects", href: "/portal/projects", icon: "📋" },
    { name: "Finance", href: "/portal/finance", icon: "💰" },
    { name: "Support", href: "/portal/support", icon: "🎫" },
    { name: "Documents", href: "/portal/documents", icon: "📁" }
  ];

  return (
    <div className="flex min-h-screen bg-[#050510] text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-black hidden md:flex flex-col fixed h-full z-50 shadow-2xl">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="font-heading text-xl font-bold text-white tracking-widest">
            GIIN <span className="text-primary font-light">Portal</span>
          </Link>
          <div className="mt-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border border-white/20" />
            <div>
              <p className="text-sm font-bold">Acme Corp</p>
              <p className="text-xs text-white/50">Enterprise Client</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href} 
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                  isActive ? "bg-primary/20 text-primary border border-primary/30 shadow-[0_0_15px_rgba(79,70,229,0.2)]" : "text-white/70 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <span>{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white/50 hover:text-red-400 hover:bg-white/5 rounded-xl transition-colors">
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 relative min-h-screen flex flex-col">
        {/* Topbar */}
        <header className="h-20 border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8">
          <h2 className="text-xl font-bold tracking-wide">
            {navItems.find(n => n.href === pathname)?.name || "Portal"}
          </h2>
          
          <div className="flex items-center gap-6">
            <button className="text-white/70 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
            <div className="relative">
              <button 
                className="text-white/70 hover:text-white transition-colors relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border-2 border-black" />
              </button>
              
              {/* Notifications Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-4 w-80 bg-[#111116] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                  >
                    <div className="p-4 border-b border-white/10 bg-white/5">
                      <h3 className="font-bold text-sm">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      <div className="p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors">
                        <p className="text-sm font-medium">New Invoice Available</p>
                        <p className="text-xs text-white/50 mt-1">INV-2026-003 is ready for review.</p>
                      </div>
                      <div className="p-4 hover:bg-white/5 cursor-pointer transition-colors">
                        <p className="text-sm font-medium">Project Update</p>
                        <p className="text-xs text-white/50 mt-1">Backend API Integration moved to In Progress.</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
