"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Cpu, BarChart3, GraduationCap, Play, Atom, ArrowRight } from "lucide-react";

interface Division {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  focus: string;
  initiatives: string[];
  synergies: string;
  coords: { x: number; y: number }; // Angle-based relative coords for desktop layout
}

export function EcosystemVisualization() {
  const [selectedDivId, setSelectedDivId] = useState<string>("tech");

  const divisions: Division[] = [
    {
      id: "leadership",
      name: "Leadership Development",
      icon: Crown,
      color: "#A855F7", // Purple
      focus: "Forging high-accountability, forward-looking leaders through elite curriculum development and strategic academies.",
      initiatives: ["GIIN Leadership Fellowships", "Executive Foresight Workshops", "Continental Governance Labs"],
      synergies: "Coordinates governance structures for Business Consulting and ensures high-integrity pipelines for all divisions.",
      coords: { x: 50, y: 15 }, // Top
    },
    {
      id: "tech",
      name: "Technology Solutions",
      icon: Cpu,
      color: "#3B82F6", // Blue
      focus: "Designing, engineering, and deploying sovereign software solutions, secure networks, and zero-trust computing stacks.",
      initiatives: ["Sovereign Cloud Networks", "Decentralized Registry Engines", "Enterprise Security Architecture"],
      synergies: "Acts as the software engine behind Education platforms, Business systems, and Research data analysis.",
      coords: { x: 80, y: 32 }, // Top Right
    },
    {
      id: "business",
      name: "Business Consulting",
      icon: BarChart3,
      color: "#10B981", // Emerald
      focus: "Advising governments, global corporations, and fast-growing ventures on market entry, scaling strategies, and operation optimization.",
      initiatives: ["Continental Growth Advisory", "Regulatory Strategy Audits", "Venture Acceleration Models"],
      synergies: "Connects GIIN's Innovation outputs directly to market capitalization, corporate capital, and policy decision-makers.",
      coords: { x: 80, y: 68 }, // Bottom Right
    },
    {
      id: "education",
      name: "Education & Training",
      icon: GraduationCap,
      color: "#F59E0B", // Amber
      focus: "Pioneering interactive tech education, developer bootcamps, and professional training models across the continent.",
      initiatives: ["Developer Accelerator Program", "STEM & AI Youth Academies", "Micro-Credential Certification"],
      synergies: "Nurtures the technical and administrative talent that is hired directly into Technology and Research divisions.",
      coords: { x: 50, y: 85 }, // Bottom
    },
    {
      id: "media",
      name: "Multimedia & Content Creation",
      icon: Play,
      color: "#EF4444", // Red
      focus: "Shifting global paradigms through high-end cinematic content, documentary storytelling, and premium audio/podcast networks.",
      initiatives: ["GIIN Documentary Studios", "Ecosystem Podcast Networks", "Creative Impact Campaigns"],
      synergies: "Amplifies the accomplishments, research papers, and impact metrics of all other GIIN divisions to a global audience.",
      coords: { x: 20, y: 68 }, // Bottom Left
    },
    {
      id: "research",
      name: "Innovation & Research",
      icon: Atom,
      color: "#06B6D4", // Cyan
      focus: "Incubating bleeding-edge concepts in Artificial Intelligence, data policy, and socio-economic frameworks.",
      initiatives: ["Deep Tech Incubation Labs", "Socio-Economic Policy Papers", "Applied AI Modeling"],
      synergies: "Informs the educational curricula of GIIN Academy and outlines the roadmap for upcoming software products.",
      coords: { x: 20, y: 32 }, // Top Left
    },
  ];

  const selectedDiv = divisions.find((d) => d.id === selectedDivId) || divisions[0];

  return (
    <section id="ecosystem-visual" className="py-24 px-6 relative bg-[#020205] border-t border-border/10">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            Ecosystem Matrix
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter font-outfit mb-6">
            The Connected{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary italic">
              GIIN Engine
            </span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed font-light">
            Our divisions do not operate in silos. They function as a unified, highly synergistic network, exchanging knowledge, resources, and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left / Top: SVG Node Graph (Interactive) */}
          <div className="lg:col-span-7 flex justify-center items-center relative aspect-square max-w-[500px] mx-auto w-full">
            {/* The SVG Visualization */}
            <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 select-none overflow-visible">
              <defs>
                {/* Glow Filter */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Connecting Lines: Outer Ring */}
              {divisions.map((div, i) => {
                const nextDiv = divisions[(i + 1) % divisions.length];
                const isConnectionSelected =
                  selectedDivId === div.id || selectedDivId === nextDiv.id;

                return (
                  <motion.line
                    key={`outer-${i}`}
                    x1={div.coords.x}
                    y1={div.coords.y}
                    x2={nextDiv.coords.x}
                    y2={nextDiv.coords.y}
                    stroke={isConnectionSelected ? "#7F4CA5" : "rgba(127, 76, 165, 0.15)"}
                    strokeWidth={isConnectionSelected ? "0.6" : "0.3"}
                    strokeDasharray={isConnectionSelected ? "2 1" : "none"}
                    animate={
                      isConnectionSelected
                        ? { strokeDashoffset: [0, -10] }
                        : { strokeDashoffset: 0 }
                    }
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "linear",
                    }}
                  />
                );
              })}

              {/* Connecting Lines: Core to Nodes */}
              {divisions.map((div, i) => {
                const isSelected = selectedDivId === div.id;

                return (
                  <motion.line
                    key={`core-${i}`}
                    x1="50"
                    y1="50"
                    x2={div.coords.x}
                    y2={div.coords.y}
                    stroke={isSelected ? div.color : "rgba(255, 255, 255, 0.1)"}
                    strokeWidth={isSelected ? "0.8" : "0.3"}
                    strokeDasharray={isSelected ? "1.5 1" : "none"}
                    animate={
                      isSelected
                        ? { strokeDashoffset: [0, 8] }
                        : { strokeDashoffset: 0 }
                    }
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "linear",
                    }}
                  />
                );
              })}

              {/* Center Node (Core GIIN) */}
              <motion.g
                onClick={() => setSelectedDivId("tech")}
                className="cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <circle
                  cx="50"
                  cy="50"
                  r="7.5"
                  fill="#0A0A12"
                  stroke="#7F4CA5"
                  strokeWidth="0.8"
                  filter="url(#glow)"
                  className="transition-colors duration-300"
                />
                <circle cx="50" cy="50" r="5" fill="#7F4CA5" opacity="0.3" className="animate-ping" style={{ transformOrigin: "50px 50px" }} />
                <text
                  x="50"
                  y="51.5"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="2.2"
                  fontWeight="bold"
                  letterSpacing="0.05"
                  className="font-outfit"
                >
                  GIIN
                </text>
              </motion.g>

              {/* Division Nodes */}
              {divisions.map((div) => {
                const isSelected = selectedDivId === div.id;
                const IconComponent = div.icon;

                return (
                  <g
                    key={div.id}
                    onClick={() => setSelectedDivId(div.id)}
                    className="cursor-pointer"
                  >
                    {/* Ring outer glow */}
                    <motion.circle
                      cx={div.coords.x}
                      cy={div.coords.y}
                      r="6.5"
                      fill="transparent"
                      stroke={isSelected ? div.color : "transparent"}
                      strokeWidth="0.8"
                      initial={{ scale: 0.8 }}
                      animate={isSelected ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                      transition={{ duration: 2, repeat: isSelected ? Infinity : 0 }}
                      style={{ transformOrigin: `${div.coords.x}px ${div.coords.y}px` }}
                    />
                    
                    {/* Node Base */}
                    <circle
                      cx={div.coords.x}
                      cy={div.coords.y}
                      r="5"
                      fill="#0A0A12"
                      stroke={isSelected ? div.color : "rgba(255, 255, 255, 0.2)"}
                      strokeWidth="0.5"
                      className="hover:stroke-white transition-colors duration-300"
                    />

                    {/* Render standard mini circle inside or icon index placeholder */}
                    <circle
                      cx={div.coords.x}
                      cy={div.coords.y}
                      r="3.5"
                      fill={isSelected ? div.color : "transparent"}
                      opacity={isSelected ? "0.15" : "0"}
                      className="transition-opacity duration-300"
                    />

                    {/* Small Text Label */}
                    <text
                      x={div.coords.x}
                      y={div.coords.y + 8}
                      textAnchor="middle"
                      fill={isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)"}
                      fontSize="1.8"
                      fontWeight={isSelected ? "bold" : "normal"}
                      className="pointer-events-none transition-colors duration-300 font-sans tracking-wide"
                    >
                      {div.name.split(" ")[0]}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Absolute Floating UI Icons on layout mapped to coordinates for pointer fallback */}
            {divisions.map((div) => {
              const isSelected = selectedDivId === div.id;
              const DivIcon = div.icon;
              return (
                <button
                  key={`btn-${div.id}`}
                  onClick={() => setSelectedDivId(div.id)}
                  className="absolute p-2.5 rounded-full border bg-[#07070F] z-20 hover:scale-110 active:scale-95 transition-all duration-300 pointer-events-auto"
                  style={{
                    top: `${div.coords.y}%`,
                    left: `${div.coords.x}%`,
                    transform: "translate(-50%, -50%)",
                    borderColor: isSelected ? div.color : "rgba(255, 255, 255, 0.1)",
                    color: isSelected ? div.color : "rgba(255, 255, 255, 0.6)",
                    boxShadow: isSelected ? `0 0 15px ${div.color}33` : "none",
                  }}
                  title={div.name}
                  aria-label={div.name}
                >
                  <DivIcon className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              );
            })}
          </div>

          {/* Right: Glassmorphic Details Card */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDiv.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="p-8 rounded-3xl border border-border/10 bg-[#07070F]/80 backdrop-blur-xl relative overflow-hidden shadow-2xl"
                style={{
                  borderLeftColor: selectedDiv.color,
                  borderLeftWidth: "4px",
                }}
              >
                {/* Decorative background glow */}
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[40px] pointer-events-none opacity-20"
                  style={{ backgroundColor: selectedDiv.color }}
                />

                <span className="text-[10px] font-bold text-muted-foreground tracking-[0.25em] uppercase mb-2 block">
                  DIVISION BRIEF
                </span>
                
                <h3 className="text-2xl md:text-3xl font-black text-foreground mb-4 font-outfit tracking-tight">
                  {selectedDiv.name}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-6 font-light">
                  {selectedDiv.focus}
                </p>

                {/* Key Initiatives */}
                <div className="mb-6">
                  <span className="text-[10px] font-bold text-foreground/80 tracking-widest uppercase mb-3 block">
                    KEY INITIATIVES
                  </span>
                  <ul className="space-y-2.5">
                    {selectedDiv.initiatives.map((init, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: selectedDiv.color }}
                        />
                        {init}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ecosystem Synergy */}
                <div className="pt-6 border-t border-border/10">
                  <span className="text-[10px] font-bold text-foreground/80 tracking-widest uppercase mb-2 block">
                    ECOSYSTEM SYNERGY
                  </span>
                  <p className="text-xs md:text-sm text-muted-foreground/80 leading-relaxed italic font-light">
                    {selectedDiv.synergies}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Mobile Fallback Navigation Hints */}
            <div className="flex flex-wrap gap-2.5 mt-6 lg:hidden justify-center">
              {divisions.map((div) => {
                const isSelected = selectedDivId === div.id;
                return (
                  <button
                    key={`mob-tab-${div.id}`}
                    onClick={() => setSelectedDivId(div.id)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300"
                    style={{
                      backgroundColor: isSelected ? `${div.color}15` : "transparent",
                      borderColor: isSelected ? div.color : "rgba(255, 255, 255, 0.1)",
                      color: isSelected ? div.color : "rgba(255, 255, 255, 0.6)",
                    }}
                  >
                    {div.name.split(" ")[0]}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
