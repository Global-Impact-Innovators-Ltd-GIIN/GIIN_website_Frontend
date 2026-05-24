import { Logo } from "@/components/ui/logo";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#020205] text-slate-200 font-sans selection:bg-blue-500/30 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Premium Background Architecture */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#1e1b4b,transparent_50%)] opacity-50" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_120%,#1e1b4b,transparent_50%)] opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Animated Noise Texture Overlay */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <main className="relative z-10 w-full max-w-[440px] px-6 py-12">
        <div className="text-center mb-10 group cursor-default">
          <Link href="/" className="inline-flex flex-col items-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full scale-150 group-hover:scale-[2] transition-transform duration-700" />
              <Logo size="lg" className="relative z-10 scale-110" showText={false} />
            </div>
            <h1 className="text-3xl font-bold text-white font-outfit tracking-tight flex items-center gap-2">
              GIIN <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">ECOSYSTEM</span>
            </h1>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mt-3 mb-2" />
            <p className="text-slate-400 text-sm font-medium tracking-wide uppercase">Secure Intelligence Access</p>
          </Link>
        </div>

        <div className="relative group">
          {/* Card Outer Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-b from-blue-500/20 to-transparent rounded-[2.5rem] blur opacity-75 group-hover:opacity-100 transition duration-1000" />

          <div className="relative">
            {children}
          </div>
        </div>

        <footer className="mt-12 text-center">
          <p className="text-xs text-slate-500 font-medium tracking-widest uppercase">
            &copy; 2026 Global Impact Innovators Ltd.
          </p>
          <div className="mt-4 flex items-center justify-center gap-6">
            <Link href="/privacy" className="text-[10px] text-slate-600 hover:text-blue-400 transition-colors uppercase tracking-widest">Privacy</Link>
            <div className="w-1 h-1 rounded-full bg-slate-800" />
            <Link href="/terms" className="text-[10px] text-slate-600 hover:text-blue-400 transition-colors uppercase tracking-widest">Terms</Link>
            <div className="w-1 h-1 rounded-full bg-slate-800" />
            <Link href="/support" className="text-[10px] text-slate-600 hover:text-blue-400 transition-colors uppercase tracking-widest">Support</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
