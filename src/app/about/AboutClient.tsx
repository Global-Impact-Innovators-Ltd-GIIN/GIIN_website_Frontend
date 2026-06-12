"use client";

import React from "react";
import { AboutHero } from "@/components/organisms/about/AboutHero";
import { OurStory } from "@/components/organisms/about/OurStory";
import { MissionVisionPurpose } from "@/components/organisms/about/MissionVisionPurpose";
import { CoreValues } from "@/components/organisms/about/CoreValues";
import { EcosystemVisualization } from "@/components/organisms/about/EcosystemVisualization";
import { ImpactGrowth } from "@/components/organisms/about/ImpactGrowth";
import { LeadershipTeam } from "@/components/organisms/about/LeadershipTeam";
import { WhyGIINExists } from "@/components/organisms/about/WhyGIINExists";
import { FutureRoadmap } from "@/components/organisms/about/FutureRoadmap";
import { FinalCTA } from "@/components/organisms/about/FinalCTA";
import { FooterSection } from "@/components/organisms/home/FooterSection";

export default function AboutClient() {
  const handleScrollToEcosystem = () => {
    const el = document.getElementById("ecosystem-visual");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleScrollToCTA = () => {
    const el = document.getElementById("final-cta");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  const handleScrollToFooter = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#020205] text-foreground pt-20 overflow-hidden selection:bg-primary/30 transition-colors duration-500">
      {/* SECTION 1 — HERO */}
      <AboutHero
        onExploreClick={handleScrollToEcosystem}
        onPartnerClick={handleScrollToCTA}
      />

      {/* SECTION 2 — OUR STORY */}
      <OurStory />

      {/* SECTION 3 — MISSION, VISION & PURPOSE */}
      <MissionVisionPurpose />

      {/* SECTION 4 — CORE VALUES */}
      <CoreValues />

      {/* SECTION 5 — THE GIIN ECOSYSTEM */}
      <EcosystemVisualization />

      {/* SECTION 6 — IMPACT & GROWTH */}
      <ImpactGrowth />

      {/* SECTION 7 — LEADERSHIP */}
      <LeadershipTeam />

      {/* SECTION 8 — WHY GIIN EXISTS */}
      <WhyGIINExists />

      {/* SECTION 9 — FUTURE VISION */}
      <FutureRoadmap />

      {/* SECTION 10 — FINAL CTA */}
      <div id="final-cta">
        <FinalCTA
          onPartnerClick={handleScrollToFooter}
          onExploreClick={handleScrollToEcosystem}
          onContactClick={handleScrollToFooter}
        />
      </div>

      {/* FOOTER */}
      <FooterSection />
    </main>
  );
}
