"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function VoiceAssistantOrb() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("Tap the orb to begin speaking.");

  useEffect(() => {
    if (isListening) {
      const timeout = setTimeout(() => {
        setTranscript("Processing your query regarding GIIN enterprise solutions...");
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [isListening]);

  const displayTranscript = isListening 
    ? (transcript === "Tap the orb to begin speaking." ? "I'm listening. Please state your query..." : transcript) 
    : "Tap the orb to begin speaking.";

  return (
    <div className="flex flex-col h-full bg-[#050510] items-center justify-center relative overflow-hidden">
      {/* Background visualizer effects */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <motion.div 
          className="w-[600px] h-[600px] rounded-full border border-primary/20 absolute"
          animate={{ scale: isListening ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="w-[800px] h-[800px] rounded-full border border-primary/10 absolute"
          animate={{ scale: isListening ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.5 }}
        />
      </div>

      <div className="z-10 flex flex-col items-center justify-center">
        {/* The Orb */}
        <motion.div 
          className={`w-64 h-64 rounded-full cursor-pointer relative flex items-center justify-center transition-all duration-700 ${isListening ? 'bg-primary shadow-[0_0_100px_rgba(79,70,229,0.8)]' : 'bg-white/5 border border-white/20 hover:border-primary/50'}`}
          onClick={() => setIsListening(!isListening)}
          animate={{ 
            scale: isListening ? [1, 1.05, 0.95, 1] : 1,
          }}
          transition={{ duration: 1.5, repeat: isListening ? Infinity : 0 }}
        >
          {/* Inner core */}
          <div className={`w-32 h-32 rounded-full blur-xl transition-colors duration-700 ${isListening ? 'bg-white' : 'bg-primary/50'}`} />
          
          <div className="absolute text-white/50 flex flex-col items-center pointer-events-none">
             {!isListening && (
               <svg className="w-12 h-12 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
               </svg>
             )}
          </div>
        </motion.div>

        {/* Transcript Area */}
        <div className="mt-16 h-20 flex items-center justify-center px-6 text-center max-w-2xl">
          <motion.p 
            key={displayTranscript}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-xl md:text-2xl font-medium ${isListening ? 'text-white' : 'text-white/40'}`}
          >
            {displayTranscript}
          </motion.p>
        </div>

        {/* Voice visualizer bars (fake) */}
        {isListening && (
          <div className="flex gap-2 items-center h-12 mt-8">
            {[1,2,3,4,5,6,7,8,9,10,11,12].map((i) => {
              const heightValues = [10, (i % 4) * 10 + 15, 10];
              const durationValue = 0.5 + (i % 3) * 0.2;
              return (
                <motion.div 
                  key={i}
                  className="w-2 bg-primary rounded-full"
                  animate={{ height: heightValues }}
                  transition={{ duration: durationValue, repeat: Infinity, ease: "easeInOut" }}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
