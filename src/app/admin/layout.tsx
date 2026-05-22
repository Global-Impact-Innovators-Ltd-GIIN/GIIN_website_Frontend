"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: "Super Admin", href: "/admin", icon: "🌐" },
    { name: "Users & Roles", href: "/admin/users", icon: "👥" },
    { name: "Content CMS", href: "/admin/content", icon: "📄" },
    { name: "Finance", href: "/admin/finance", icon: "📈" },
    { name: "Academy", href: "/admin/academy", icon: "🎓" },
    { name: "Media Studio", href: "/admin/media", icon: "🎬" },
    { name: "Security", href: "/admin/security", icon: "🛡️" },
    { name: "Research", href: "/admin/research", icon: "🔬" },
    { name: "AI Ecosystem", href: "/admin/ai", icon: "🧠" }
  ];

  return (
    <div className="flex min-h-screen bg-black text-white font-mono">
      {/* Dense Bloomberg-style Sidebar */}
      <aside className="w-64 border-r border-zinc-800 bg-[#0a0a0a] hidden md:flex flex-col fixed h-full z-50">
        <div className="p-4 border-b border-zinc-800">
          <Link href="/" className="font-heading text-xl font-bold tracking-widest text-white">
            GIIN <span className="text-red-500 font-mono text-sm uppercase">God_Mode</span>
          </Link>
          <div className="text-[10px] text-zinc-500 mt-1">SYS_VER 9.4.2 // ONLINE</div>
        </div>
        
        <nav className="flex-1 py-4 overflow-y-auto hide-scrollbar space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href} 
                className={`flex items-center gap-3 px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
                  isActive ? "bg-zinc-800 text-white border-l-2 border-red-500" : "text-zinc-400 hover:text-white hover:bg-zinc-900 border-l-2 border-transparent"
                }`}
              >
                <span className="opacity-70">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800 text-xs text-zinc-500">
          <div>Logged in as: <span className="text-white font-bold">D. Chen</span></div>
          <div>Clearance: <span className="text-red-500 font-bold">Lvl 9</span></div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 relative min-h-screen flex flex-col">
        {/* Topbar Command Line Mockup */}
        <header className="h-14 border-b border-zinc-800 bg-[#0a0a0a] sticky top-0 z-40 flex items-center justify-between px-6">
          <div className="flex items-center gap-2 text-sm w-1/2">
            <span className="text-green-500 font-bold">root@giin:~#</span>
            <input 
              type="text" 
              placeholder="Execute global command or search..."
              className="bg-transparent border-none text-white focus:outline-none w-full placeholder:text-zinc-600"
            />
          </div>
          <div className="flex items-center gap-4 text-xs text-zinc-400">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Nodes OK</span>
            </div>
            <span>|</span>
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
        </header>

        {/* Dense Data Area */}
        <div className="p-6 flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
