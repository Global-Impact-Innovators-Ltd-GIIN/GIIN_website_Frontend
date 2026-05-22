import { Logo } from "@/components/ui/logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#020205] text-slate-200 font-sans selection:bg-primary/30 flex flex-col justify-center relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none z-0" />
      <div className="absolute top-1/4 -right-64 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 -left-64 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[150px] pointer-events-none z-0" />
      
      <main className="relative z-10 w-full max-w-md mx-auto p-6">
        <div className="text-center mb-8 flex flex-col items-center justify-center">
          <Logo size="lg" className="mb-4 flex-col gap-2" showText={false} />
          <h1 className="text-2xl font-bold text-foreground font-outfit tracking-tight">GIIN Ecosystem</h1>
          <p className="text-muted-foreground text-sm mt-1">Secure Enterprise Access Portal</p>
        </div>
        
        {children}
      </main>
    </div>
  );
}
