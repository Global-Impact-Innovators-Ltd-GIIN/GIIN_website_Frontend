"use client";

import React, { useRef } from "react";
import { PageTransition } from "@/components/ui/PageTransition";
import { FounderHero } from "@/components/founder-message/FounderHero";
import { FounderStory } from "@/components/founder-message/FounderStory";
import { WhyGIINExists } from "@/components/founder-message/WhyGIINExists";
import { LeadershipPhilosophy } from "@/components/founder-message/LeadershipPhilosophy";
import { FounderLetter } from "@/components/founder-message/FounderLetter";
import { FutureVision } from "@/components/founder-message/FutureVision";
import { LeadershipCommitments } from "@/components/founder-message/LeadershipCommitments";
import { PersonalValues } from "@/components/founder-message/PersonalValues";
import { FounderSignature } from "@/components/founder-message/FounderSignature";
import { FounderCTA } from "@/components/founder-message/FounderCTA";

export default function FounderMessagePage() {
  // Ref to scroll to the letter section
  const letterSectionRef = useRef<HTMLDivElement>(null);

  const handleExploreVision = () => {
    letterSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <PageTransition>
      {/* Head Tags for Title and Meta SEO */}
      <title>Founder&apos;s Message | GIIN Leadership & Vision</title>
      <meta
        name="description"
        content="Read the direct personal message, core leadership philosophy, and roadmap for digital sovereignty in Africa from the Founder of GIIN."
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
          
          {/* Section 1: Hero */}
          <FounderHero onExploreVision={handleExploreVision} />

          {/* Section 2: Story (Milestones) */}
          <FounderStory />

          {/* Section 3: Why GIIN Exists (Challenges -> Solutions) */}
          <WhyGIINExists />

          {/* Section 4: Philosophy Cards */}
          <LeadershipPhilosophy />

          {/* Section 5: The centerpiece letter (Anchor for scrolling) */}
          <div ref={letterSectionRef} className="scroll-mt-24">
            <FounderLetter />
          </div>

          {/* Section 6: Future Roadmap */}
          <FutureVision />

          {/* Section 7: Commitments */}
          <LeadershipCommitments />

          {/* Section 8: Values */}
          <PersonalValues />

          {/* Section 9: Signature Closure */}
          <FounderSignature />

          {/* Section 10: Call to Actions */}
          <FounderCTA />

        </div>

      </main>
    </PageTransition>
  );
}
