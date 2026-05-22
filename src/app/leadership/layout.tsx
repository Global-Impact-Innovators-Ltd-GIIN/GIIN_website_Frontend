export default function LeadershipLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#020205] text-slate-200 font-sans selection:bg-indigo-500/30">
      {/* 
        The Leadership Ecosystem utilizes a deep, dark glassmorphic theme 
        to convey an elite institutional feel. 
      */}
      <main className="relative z-10 flex flex-col w-full h-full">
        {children}
      </main>
    </div>
  );
}
