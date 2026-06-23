"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import PrinciplesHero from "./PrinciplesHero";
import FoundationSection from "./FoundationSection";
import CoreValuesGrid from "./CoreValuesGrid";
import LeadershipStandards from "./LeadershipStandards";
import DecisionFramework from "./DecisionFramework";
import CultureManifesto from "./CultureManifesto";
import InnovationPrinciples from "./InnovationPrinciples";
import OrganizationalCommitments from "./OrganizationalCommitments";
import LivingThePrinciples from "./LivingThePrinciples";
import PrinciplesPledge from "./PrinciplesPledge";

export default function CorePrinciplesContainer() {
  const valuesRef = useRef<HTMLDivElement>(null);
  const cultureRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  
  // Smooth spring physics for the scroll progress indicator
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement | null>) => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="min-h-screen bg-[#020205] text-slate-200 selection:bg-primary/30 overflow-x-hidden relative">
      {/* Scroll-linked progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-indigo-400 to-accent z-50 origin-left"
        style={{ scaleX }}
      />

      <PrinciplesHero
        onExploreClick={() => scrollToSection(valuesRef)}
        onCultureClick={() => scrollToSection(cultureRef)}
      />

      <FoundationSection />

      <div ref={valuesRef}>
        <CoreValuesGrid />
      </div>

      <LeadershipStandards />

      <DecisionFramework />

      <div ref={cultureRef}>
        <CultureManifesto />
      </div>

      <InnovationPrinciples />

      <OrganizationalCommitments />

      <LivingThePrinciples />

      <PrinciplesPledge />
    </main>
  );
}
