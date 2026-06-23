"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Users } from "lucide-react";

interface LearningCTAProps {
  onExploreCourses: () => void;
  onJoinCommunity: () => void;
  onStartToday: () => void;
}

export function LearningCTA({ onExploreCourses, onJoinCommunity, onStartToday }: LearningCTAProps) {
  return (
    <section className="relative py-32 bg-[#050816] text-white overflow-hidden border-t border-white/5 px-6">
      {/* Dynamic colorful gradients backdrop */}
      <div className="absolute inset-0 bg-[#050816] -z-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#2563EB]/15 via-[#7C3AED]/15 to-transparent blur-[160px] rounded-full pointer-events-none -z-10 animate-pulse duration-[10000ms]" />

      <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/25 px-4.5 py-1.5 rounded-full inline-flex font-sans">
            Ready to Begin?
          </span>
          
          <h2 className="text-4xl md:text-6xl font-black font-space-grotesk tracking-tight leading-none">
            Your Future Starts <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED]">
              With Learning
            </span>
          </h2>
          
          <p className="text-[#A1A1AA] text-base md:text-xl font-sans font-light max-w-xl mx-auto leading-relaxed">
            Join thousands of professionals, innovators, entrepreneurs, and leaders shaping the future through continuous learning.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={onStartToday}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#2563EB] hover:to-[#4F46E5] text-white px-8 py-4.5 text-sm font-bold transition-all hover:pr-10 shadow-xl shadow-[#2563EB]/10 hover:shadow-[#7C3AED]/20 active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <span>Start Learning Today</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onExploreCourses}
            className="px-6 py-4.5 text-sm font-bold bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl text-white transition-all active:scale-95 cursor-pointer flex items-center gap-2 backdrop-blur-md"
          >
            <BookOpen className="w-4 h-4 text-[#A1A1AA]" />
            <span>Explore Courses</span>
          </button>

          <button
            onClick={onJoinCommunity}
            className="px-6 py-4.5 text-sm font-bold bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl text-white transition-all active:scale-95 cursor-pointer flex items-center gap-2 backdrop-blur-md"
          >
            <Users className="w-4 h-4 text-[#A1A1AA]" />
            <span>Join Learning Community</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
