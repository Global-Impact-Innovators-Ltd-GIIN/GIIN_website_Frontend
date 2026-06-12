"use client";

import React, { useRef } from "react";
import { PageTransition } from "@/components/ui/PageTransition";
import { Chapter1MeetFounder } from "@/components/founder-message/Chapter1MeetFounder";
import { Chapter2TheProblem } from "@/components/founder-message/Chapter2TheProblem";
import { Chapter3TheAwakening } from "@/components/founder-message/Chapter3TheAwakening";
import { Chapter4TheMission } from "@/components/founder-message/Chapter4TheMission";
import { Chapter5ThePhilosophy } from "@/components/founder-message/Chapter5ThePhilosophy";
import { Chapter6TheFuture } from "@/components/founder-message/Chapter6TheFuture";
import { Chapter7TheInvitation } from "@/components/founder-message/Chapter7TheInvitation";

export default function FounderMessagePage() {
  // Ref to scroll to the Mission chapter
  const missionSectionRef = useRef<HTMLDivElement>(null);

  const handleExploreNarrative = () => {
    missionSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <PageTransition>
      {/* Head Tags for Title and Meta SEO */}
      <title>Founder&apos;s Desk | GIIN Vision & Leadership</title>
      <meta
        name="description"
        content="Enter the mind of GIIN's Founder. Explore the 7 chapters of our narrative: Meet the Founder, The Problem, The Awakening, The Mission, The Philosophy, The Future, and The Invitation."
      />

      <main className="min-h-screen bg-[#020205] text-slate-200 selection:bg-primary/30 relative overflow-x-hidden pt-20">
        
        {/* Dynamic ambient background shapes */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-primary/5 via-indigo-950/5 to-transparent blur-3xl" />
          <div className="absolute top-[20%] right-[-100px] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px] opacity-40" />
          <div className="absolute bottom-[30%] left-[-150px] w-[700px] h-[700px] bg-indigo-500/5 rounded-full blur-[180px] opacity-30" />
        </div>

        {/* Outer container for content positioning */}
        <div className="relative z-10 w-full">
          
          {/* Chapter 1: Meet the Founder */}
          <Chapter1MeetFounder onExploreClick={handleExploreNarrative} />

          {/* Chapter 2: The Problem Gaps */}
          <Chapter2TheProblem />

          {/* Chapter 3: The Awakening Ecosystem Node Mesh */}
          <Chapter3TheAwakening />

          {/* Chapter 4: The Mission (Anchor for scrolling) */}
          <div ref={missionSectionRef} className="scroll-mt-24">
            <Chapter4TheMission />
          </div>

          {/* Chapter 5: Philosophy & Values */}
          <Chapter5ThePhilosophy />

          {/* Chapter 6: The Future Roadmap */}
          <Chapter6TheFuture />

          {/* Chapter 7: The Invitation Call-to-Actions & Signature Outro */}
          <Chapter7TheInvitation />

        </div>

      </main>
    </PageTransition>
  );
}
