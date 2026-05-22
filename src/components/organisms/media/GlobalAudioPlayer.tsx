"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function GlobalAudioPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // In a real app, this would use Zustand to pull the currently playing podcast from global state
  const mockTrack = {
    title: "GIIN Voices: The CEO's Dilemma",
    speaker: "Host: David Chen",
    duration: "45:00",
    currentTime: "12:34"
  };

  // If there's no track playing, don't render the player
  // For demo purposes, we will render a minimized version
  return (
    <div className="fixed bottom-0 left-0 w-full z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full bg-black/90 backdrop-blur-xl border-t border-white/10 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
          >
            <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Track Info */}
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-md bg-blue-900 bg-gradient-to-br flex items-center justify-center relative overflow-hidden">
                   {isPlaying && <div className="absolute inset-0 bg-white/10 animate-pulse" />}
                   <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                   </svg>
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm line-clamp-1">{mockTrack.title}</h4>
                  <p className="text-white/50 text-xs">{mockTrack.speaker}</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col items-center flex-1 max-w-xl w-full">
                <div className="flex items-center gap-6 mb-2">
                  <button className="text-white/50 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg>
                  </button>
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    {isPlaying ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                    ) : (
                      <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    )}
                  </button>
                  <button className="text-white/50 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>
                  </button>
                </div>
                {/* Progress Bar */}
                <div className="w-full flex items-center gap-3">
                  <span className="text-[10px] text-white/50 font-mono">{mockTrack.currentTime}</span>
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer">
                    <div className="h-full bg-primary w-1/3" />
                  </div>
                  <span className="text-[10px] text-white/50 font-mono">{mockTrack.duration}</span>
                </div>
              </div>

              {/* Close/Minimize */}
              <div className="flex-1 flex justify-end">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/30 hover:text-white text-sm font-medium transition-colors"
                >
                  Hide Player
                </button>
              </div>

            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setIsOpen(true)}
            className="absolute bottom-6 right-6 bg-primary text-white rounded-full p-4 shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:bg-primary/80 transition-colors flex items-center gap-3"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-bold tracking-widest uppercase">Now Playing</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
