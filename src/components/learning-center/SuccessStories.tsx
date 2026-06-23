"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Play, Star, Sparkles } from "lucide-react";

interface Story {
  name: string;
  role: string;
  org: string;
  storyType: string;
  quote: string;
  impact: string;
  initials: string;
  gradient: string;
}

const stories: Story[] = [
  {
    name: "Eseosa Eke",
    role: "Fullstack Architect",
    org: "Sovereign Nodes Nigeria",
    storyType: "Technology Growth Story",
    quote: "The Technology Academy wasn't just about syntax. Masterfully designed labs pushed me to construct high-throughput distributed mesh configurations. Weeks after certifying, I was hired to anchor node engineering for a key national grid.",
    impact: "Secured Enterprise Lead Architect role within 30 days of graduation.",
    initials: "EE",
    gradient: "from-[#2563EB]/40 to-[#4F46E5]/40",
  },
  {
    name: "Moussa Sow",
    role: "Managing Director & Founder",
    org: "Sahel Ag-Tech Sandbox",
    storyType: "Entrepreneur Success Story",
    quote: "I entered the Entrepreneur Path with a vague concept for drone-based soil Diagnostics. The step-by-step MVP and scale stages forced me to establish rigorous unit metrics and board structures. We recently closed our seed capital funding.",
    impact: "Raised $450k in VC funding and scaled operations to 3 regions.",
    initials: "MS",
    gradient: "from-[#7C3AED]/40 to-[#4F46E5]/40",
  },
  {
    name: "Deborah Odhiambo",
    role: "National Policy Director",
    org: "Ecosystem Integrity Commission",
    storyType: "Leadership Transformation",
    quote: "As a government official, navigating public policy changes is extremely complex. The Future Leaders Path structured diagnostic frameworks that changed how our department designs macro-economic governance and public trust initiatives.",
    impact: "Drafted national digitalization framework approved by parliament.",
    initials: "DO",
    gradient: "from-[#4F46E5]/40 to-[#2563EB]/40",
  },
];

export function SuccessStories() {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % stories.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const activeStory = stories[activeIdx];

  return (
    <section className="py-24 bg-[#050816] text-white relative px-6 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">
            Transformational Outcomes
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-space-grotesk tracking-tight">
            Student{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">
              Success Stories
            </span>
          </h2>
          <p className="text-[#A1A1AA] text-sm md:text-base font-sans font-light max-w-xl mx-auto leading-relaxed">
            Real outcomes from real learners. Explore how GIIN courses spark career leaps, strategic investments, and structural policy updates.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto bg-[#0A0A12]/90 border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-md">
          {/* Decorative quote mark background */}
          <Quote className="absolute right-8 bottom-8 w-40 h-40 text-white/5 pointer-events-none -z-10" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left"
            >
              {/* Left Side: Avatar and Visual Badge */}
              <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
                <div className={`w-28 h-28 rounded-3xl bg-gradient-to-tr ${activeStory.gradient} p-[1px] shadow-xl mb-4 relative`}>
                  <div className="w-full h-full bg-[#0A0A12] rounded-3xl flex items-center justify-center font-space-grotesk text-3xl font-bold text-white">
                    {activeStory.initials}
                  </div>
                  
                  {/* Floating Play indicator representing future video archive attachment */}
                  <div className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-[#2563EB] text-white border border-white/10 shadow-lg cursor-pointer hover:scale-115 transition-transform">
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>

                <h3 className="text-lg font-bold font-space-grotesk text-white">
                  {activeStory.name}
                </h3>
                <div className="text-xs text-[#A1A1AA] font-sans font-light mt-0.5 leading-tight">
                  {activeStory.role} <br />
                  <span className="font-semibold text-white/80">{activeStory.org}</span>
                </div>
              </div>

              {/* Right Side: Testimony details */}
              <div className="md:col-span-8 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase font-bold tracking-wider text-[#2563EB] font-sans">
                  <Sparkles className="w-3 h-3 text-[#7C3AED]" />
                  {activeStory.storyType}
                </div>

                <div className="flex gap-1 text-[#F59E0B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-[#A1A1AA] text-base md:text-lg font-sans font-light italic leading-relaxed">
                  "{activeStory.quote}"
                </p>

                <div className="pt-6 border-t border-white/5 space-y-1">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-[#7C3AED] font-space-grotesk">
                    VERIFIED CAREER / SYSTEM IMPACT
                  </div>
                  <p className="text-sm font-semibold text-white">
                    {activeStory.impact}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider controls */}
          <div className="flex items-center justify-between mt-12 pt-6 border-t border-white/5">
            <div className="flex items-center gap-1">
              {stories.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    activeIdx === idx ? "bg-[#2563EB] w-6" : "bg-white/10"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
