"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Compass, ArrowRight, Layers, ShieldCheck, GraduationCap, Cpu, Lightbulb, CheckCircle2 } from "lucide-react";

interface PathPhase {
  stage: string;
  title: string;
  desc: string;
  duration: string;
  skills: string[];
}

interface Path {
  id: string;
  title: string;
  icon: any;
  color: string;
  badgeColor: string;
  lineColor: string;
  phases: PathPhase[];
}

const paths: Path[] = [
  {
    id: "future-leaders",
    title: "Future Leaders Path",
    icon: GraduationCap,
    color: "from-[#2563EB]/25 to-[#4F46E5]/10",
    badgeColor: "bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20",
    lineColor: "bg-[#2563EB]",
    phases: [
      {
        stage: "Phase 1: Beginner",
        title: "Foundations of Civic Leadership",
        desc: "Master critical self-governance, communication protocols, time frameworks, and ethical community leadership.",
        duration: "4 Weeks",
        skills: ["Self-Governance", "Civic Responsibility", "Active Listening", "Ethics"],
      },
      {
        stage: "Phase 2: Intermediate",
        title: "Organizational Orchestration",
        desc: "Scale operational capabilities. Study group mechanics, budget structures, policy creation, and crisis mitigation.",
        duration: "6 Weeks",
        skills: ["Operations", "Strategic Planning", "Mitigation", "Resource Allocation"],
      },
      {
        stage: "Phase 3: Advanced",
        title: "Continental Policy & Vision",
        desc: "Lead at state or pan-African scales. Design macro-economic initiatives, policy blueprints, and global trade collaborations.",
        duration: "8 Weeks",
        skills: ["Macroeconomics", "Sovereign Blueprints", "Trade Policies", "Global Relations"],
      },
    ],
  },
  {
    id: "tech-professional",
    title: "Technology Professional Path",
    icon: Cpu,
    color: "from-[#7C3AED]/25 to-[#4F46E5]/10",
    badgeColor: "bg-[#7C3AED]/10 text-[#7C3AED] border-[#7C3AED]/20",
    lineColor: "bg-[#7C3AED]",
    phases: [
      {
        stage: "Phase 1: Foundations",
        title: "Algorithms & Sovereign Systems",
        desc: "Master system command bases, logic syntax, database foundations, and networking protocols.",
        duration: "6 Weeks",
        skills: ["Linux Shell", "Relational DBs", "HTTP/TCP Protocols", "Core Security"],
      },
      {
        stage: "Phase 2: Practitioner",
        title: "Distributed Applications",
        desc: "Learn to build multi-tenant, micro-service architectures, node systems, and automated test deployments.",
        duration: "8 Weeks",
        skills: ["Microservices", "API Gateways", "Next.js", "Docker & Kubernetes"],
      },
      {
        stage: "Phase 3: Specialist",
        title: "Autonomous Cryptographic Networks",
        desc: "Design zero-trust cybersecurity networks, local LLM integrations, and blockchain consensus layers.",
        duration: "10 Weeks",
        skills: ["Zero-Trust Architectures", "LLM Finetuning", "Smart Contracts", "Cryptographic Auditing"],
      },
    ],
  },
  {
    id: "innovation-leader",
    title: "Innovation Leader Path",
    icon: Lightbulb,
    color: "from-[#4F46E5]/25 to-[#2563EB]/10",
    badgeColor: "bg-[#4F46E5]/10 text-[#4F46E5] border-[#4F46E5]/20",
    lineColor: "bg-[#4F46E5]",
    phases: [
      {
        stage: "Phase 1: Basics",
        title: "Design Thinking & Sandbox Ideation",
        desc: "Identify critical continental bottlenecks, master agile design research, and build quick visual prototypes.",
        duration: "4 Weeks",
        skills: ["Agile Ideation", "Visual Prototyping", "User Research", "Systems Mapping"],
      },
      {
        stage: "Phase 2: Systems",
        title: "R&D Architecture & Lab Execution",
        desc: "Structure laboratory workflows, integrate hardware-software modules, and execute technical validation checks.",
        duration: "6 Weeks",
        skills: ["R&D Methodologies", "Hardware Sandboxing", "Vetting Protocols", "Lab Safety"],
      },
      {
        stage: "Phase 3: Strategy",
        title: "IP Strategy & Scale Systems",
        desc: "Formulate patent strategies, license intellectual properties, and steer strategic commercial integrations.",
        duration: "6 Weeks",
        skills: ["Patent Drafting", "Licensing Blueprints", "Market Insertion", "Global Scale"],
      },
    ],
  },
  {
    id: "entrepreneur",
    title: "Entrepreneur Path",
    icon: Compass,
    color: "from-[#2563EB]/25 to-[#7C3AED]/10",
    badgeColor: "bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20",
    lineColor: "bg-[#2563EB]",
    phases: [
      {
        stage: "Phase 1: Idea",
        title: "Ecosystem Assessment & MVP Formulation",
        desc: "Validate user demand, design clean business model canvases, and release early functional tests.",
        duration: "4 Weeks",
        skills: ["MVP Testing", "Customer Discovery", "Canvas Design", "Unit Economics"],
      },
      {
        stage: "Phase 2: Startup",
        title: "Operational Engineering & Seed Vetting",
        desc: "Form core teams, manage financial ledgers, configure marketing channels, and secure angel capital investments.",
        duration: "8 Weeks",
        skills: ["Team Operations", "Growth Marketing", "Financial Ledgers", "Pitch Engineering"],
      },
      {
        stage: "Phase 3: Scale",
        title: "System Expansion & Institutional Capital",
        desc: "Enter global trade regions, scale server engines, structure corporate boards, and close institutional series funding.",
        duration: "10 Weeks",
        skills: ["Ecosystem Mergers", "Corporate Boards", "Global Compliance", "Series-A Funding"],
      },
    ],
  },
];

export function LearningPaths() {
  const [activePathId, setActivePathId] = useState<string>("future-leaders");
  const [selectedPhaseIdx, setSelectedPhaseIdx] = useState<number>(0);

  const activePath = paths.find((p) => p.id === activePathId) || paths[0];

  const handlePathChange = (pathId: string) => {
    setActivePathId(pathId);
    setSelectedPhaseIdx(0);
  };

  return (
    <section className="py-24 bg-[#050816] text-white relative px-6 border-t border-white/5 overflow-hidden">
      {/* Glow shapes */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#2563EB]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#7C3AED]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">
            System Roadmaps
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-space-grotesk tracking-tight">
            Flagship{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">
              Learning Journeys
            </span>
          </h2>
          <p className="text-[#A1A1AA] text-sm md:text-base font-sans font-light max-w-xl mx-auto leading-relaxed">
            Follow structured roadmap-style curriculums designed to progress from baseline foundations to master-level operational capacity.
          </p>
        </div>

        {/* Tab Selection buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {paths.map((p) => {
            const Icon = p.icon;
            const isActive = activePathId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handlePathChange(p.id)}
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-xs font-bold tracking-wide border transition-all duration-300 active:scale-95 cursor-pointer ${
                  isActive
                    ? "bg-[#2563EB]/10 border-[#2563EB] text-white shadow-lg shadow-[#2563EB]/10"
                    : "bg-[#0A0A12]/80 border-white/5 text-[#A1A1AA] hover:text-white hover:border-white/10"
                }`}
              >
                <Icon className={`w-4.5 h-4.5 ${isActive ? "text-[#2563EB]" : "text-[#A1A1AA]"}`} />
                <span>{p.title}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Roadmaps Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Side: Timeline Progression */}
          <div className="lg:col-span-7 space-y-8 relative">
            {/* Visual Roadmap Line */}
            <div className="absolute left-[29px] top-6 bottom-6 w-[2px] bg-white/5 z-0" />
            <div 
              className={`absolute left-[29px] top-6 w-[2px] ${activePath.lineColor} z-10 transition-all duration-500`} 
              style={{
                height: `${((selectedPhaseIdx + 1) / activePath.phases.length) * 80}%`
              }}
            />

            {activePath.phases.map((phase, idx) => {
              const isSelected = selectedPhaseIdx === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedPhaseIdx(idx)}
                  className={`flex gap-6 items-start relative z-20 cursor-pointer p-5 rounded-2xl border transition-all duration-300 ${
                    isSelected
                      ? "bg-[#0A0A12]/90 border-[#2563EB]/40 shadow-lg"
                      : "bg-[#0A0A12]/30 border-transparent hover:border-white/5"
                  }`}
                >
                  <div className={`w-[20px] h-[20px] rounded-full flex items-center justify-center border-4 shrink-0 mt-1 transition-all duration-300 ${
                    isSelected 
                      ? "bg-[#2563EB] border-white/20 scale-125" 
                      : "bg-[#050816] border-white/20"
                  }`}>
                    {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>

                  <div className="text-left flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${activePath.badgeColor}`}>
                        {phase.stage}
                      </span>
                      <span className="text-xs text-[#A1A1AA] font-sans font-light">
                        {phase.duration}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold font-space-grotesk text-white">
                      {phase.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[#A1A1AA] font-sans font-light leading-relaxed mt-2 line-clamp-2">
                      {phase.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side: Phase Details Visualizer (Glassmorphic Card) */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activePathId}-${selectedPhaseIdx}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl border border-white/5 bg-gradient-to-br from-[#0A0A12]/90 to-[#050816]/90 p-8 shadow-xl relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-tr ${activePath.color} opacity-30 blur-[40px] pointer-events-none`} />

                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 text-white`}>
                    <Layers className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div className="text-left font-space-grotesk">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-[#A1A1AA]">
                      Detailed Phase Breakdown
                    </div>
                    <div className="text-sm font-bold text-white">
                      {activePath.phases[selectedPhaseIdx].stage}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold font-space-grotesk mb-4 text-white leading-tight">
                  {activePath.phases[selectedPhaseIdx].title}
                </h3>

                <p className="text-sm text-[#A1A1AA] font-sans font-light leading-relaxed mb-6 text-left">
                  {activePath.phases[selectedPhaseIdx].desc}
                </p>

                <div className="border-t border-white/5 pt-6 text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-white mb-4 block font-space-grotesk">
                    Target Skills Acquired
                  </span>

                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {activePath.phases[selectedPhaseIdx].skills.map((skill, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs text-[#A1A1AA] font-sans">
                        <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs">
                    <ShieldCheck className="w-5 h-5 text-[#2563EB]" />
                    <span className="font-medium text-white/90">
                      Earns Micro-Credential Badge
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
