import { StudioDashboard } from "@/components/organisms/media/StudioDashboard";
import { FooterSection } from "@/components/organisms/home/FooterSection";
import Link from "next/link";

export default function StudioPage() {
  return (
    <div className="flex min-h-screen bg-[#050510]">
      {/* Studio Sidebar Mockup */}
      <aside className="w-64 border-r border-white/10 bg-black hidden md:flex flex-col fixed h-full z-50">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="font-heading text-xl font-bold text-white tracking-widest">
            GIIN <span className="text-red-500">Studio</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/studio" className="block px-4 py-3 text-sm font-medium text-white bg-white/10 rounded-xl transition-colors">
            Overview
          </Link>
          <Link href="#" className="block px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
            Video Assets
          </Link>
          <Link href="#" className="block px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
            Live Streaming Keys
          </Link>
          <Link href="#" className="block px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
            Analytics
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 relative min-h-screen flex flex-col">
        <div className="flex-1">
          <StudioDashboard />
        </div>
        <FooterSection />
      </main>
    </div>
  );
}
