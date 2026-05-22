export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#020205] text-slate-200 font-sans selection:bg-primary/30 flex flex-col justify-center relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none z-0" />
      <div className="absolute top-1/4 -right-64 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 -left-64 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[150px] pointer-events-none z-0" />
      
      <main className="relative z-10 w-full max-w-md mx-auto p-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 mb-4 backdrop-blur-xl">
            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white font-outfit tracking-tight">GIIN Ecosystem</h1>
          <p className="text-slate-400 text-sm mt-1">Secure Enterprise Access Portal</p>
        </div>
        
        {children}
      </main>
    </div>
  );
}
