import Link from "next/link";

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#050510]">
      {/* Academy Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-black flex flex-col hidden md:flex fixed h-full z-50">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="font-heading text-xl font-bold text-white tracking-widest">
            GIIN <span className="text-primary">Academy</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/academy" className="block px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
            Course Catalog
          </Link>
          <Link href="/academy/dashboard" className="block px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
            My Dashboard
          </Link>
          <Link href="/academy/certificates" className="block px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
            Certificates
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-primary rounded-xl hover:bg-primary/80 transition-colors">
            Sign In / Auth Shell
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 relative min-h-screen">
        {children}
      </main>
    </div>
  );
}
