import Link from "next/link";
import { chatHistory, aiPersonas } from "@/data/ai";

export default function AILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#050510]">
      {/* AI Memory Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-black hidden md:flex flex-col fixed h-full z-50">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="font-heading text-xl font-bold text-white tracking-widest flex items-center gap-2">
            GIIN <span className="text-primary flex items-center gap-2">AI <div className="w-2 h-2 rounded-full bg-primary animate-pulse"/></span>
          </Link>
        </div>
        
        {/* Navigation */}
        <div className="p-4 border-b border-white/10 space-y-2">
          <Link href="/ai" className="block px-4 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
            Hub Overview
          </Link>
          <Link href="/ai/document" className="block px-4 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
            Document Analyzer
          </Link>
          <Link href="/ai/voice" className="block px-4 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
            Voice Assistant
          </Link>
        </div>

        {/* Chat Memory */}
        <div className="flex-1 overflow-y-auto p-4">
          <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4 px-2">Chat Memory</h4>
          <div className="space-y-1">
            {chatHistory.map(session => {
              const persona = aiPersonas.find(p => p.id === session.personaId);
              return (
                <Link key={session.id} href={`/ai/chat/${session.personaId}`} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors group">
                  <span className="text-sm opacity-50 group-hover:opacity-100 transition-opacity">{persona?.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white/70 group-hover:text-white truncate transition-colors">{session.title}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* User Profile Hook */}
        <div className="p-4 border-t border-white/10">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
            Clear Context
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 relative min-h-screen flex flex-col h-screen overflow-hidden">
        {children}
      </main>
    </div>
  );
}
