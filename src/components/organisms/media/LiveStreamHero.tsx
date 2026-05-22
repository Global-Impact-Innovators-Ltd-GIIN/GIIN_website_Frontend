"use client";

import { motion } from "framer-motion";
import { liveStreamData } from "@/data/media";

export function LiveStreamHero() {
  return (
    <section className="relative w-full min-h-[80vh] bg-black flex flex-col md:flex-row items-center justify-center p-6 border-b border-white/10 pt-24">
      {/* Video Container Mock */}
      <div className="flex-1 w-full max-w-5xl aspect-video bg-zinc-900 rounded-3xl overflow-hidden relative border border-white/10 shadow-2xl">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        
        {/* Mock Live Indicator */}
        {liveStreamData.status === "live" && (
          <div className="absolute top-6 left-6 flex items-center gap-3 bg-black/60 backdrop-blur-md rounded-full px-4 py-2 z-10 border border-white/10">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <span className="text-white font-bold text-sm tracking-widest uppercase">Live Now</span>
            <span className="text-white/50 text-xs font-medium ml-2">{liveStreamData.viewers.toLocaleString()} viewers</span>
          </div>
        )}

        {/* Custom YouTube UI Wrapper Mock */}
        <div className="absolute inset-0 flex items-center justify-center group cursor-pointer">
          <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md group-hover:bg-primary/80 transition-all group-hover:scale-110 shadow-[0_0_50px_rgba(79,70,229,0.3)]">
            <svg className="w-10 h-10 text-white ml-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Video Info Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{liveStreamData.title}</h1>
          <p className="text-lg text-white/80 font-medium">Featuring: {liveStreamData.speaker}</p>
        </div>
      </div>
    </section>
  );
}
