"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Clock, ArrowRight, ShieldCheck, GraduationCap, Cpu, Lightbulb, TrendingUp, Compass, UserCheck } from "lucide-react";

interface Program {
  id: string;
  name: string;
  academy: string;
  duration: string;
  level: string;
  certBadge: string;
  desc: string;
  gradient: string;
  icon: any;
}

const programs: Program[] = [
  {
    id: "leadership",
    name: "Leadership Academy",
    academy: "Executive Development Division",
    duration: "12 Weeks",
    level: "Advanced",
    certBadge: "Executive Leader Cert",
    desc: "Forging continental visionaries. Study governance, strategic policy, and corporate direction models tailored for African scalability.",
    gradient: "from-[#2563EB]/20 via-[#4F46E5]/10 to-transparent",
    icon: GraduationCap,
  },
  {
    id: "technology",
    name: "Technology Academy",
    academy: "Software Systems Engineering",
    duration: "16 Weeks",
    level: "Intermediate - Advanced",
    certBadge: "Architect Credential",
    desc: "Dive deep into sovereign software architectures, node design, decentralized cryptography, and AI orchestration pipelines.",
    gradient: "from-[#7C3AED]/20 via-[#4F46E5]/10 to-transparent",
    icon: Cpu,
  },
  {
    id: "innovation",
    name: "Innovation Academy",
    academy: "Labs Sandbox Program",
    duration: "8 Weeks",
    level: "All Levels",
    certBadge: "Systems Innovator Cert",
    desc: "Master execution frameworks for turning complex scientific and software concepts into functional commercial products.",
    gradient: "from-[#4F46E5]/20 via-[#2563EB]/10 to-transparent",
    icon: Lightbulb,
  },
  {
    id: "business",
    name: "Business Growth Academy",
    academy: "Operations & Scale Division",
    duration: "10 Weeks",
    level: "Intermediate",
    certBadge: "Growth Strategist Cert",
    desc: "Scale operational engines. Learn modern capital structure, multi-tenant workflows, and corporate growth strategies.",
    gradient: "from-[#2563EB]/20 via-[#7C3AED]/10 to-transparent",
    icon: TrendingUp,
  },
  {
    id: "entrepreneurship",
    name: "Entrepreneurship Academy",
    academy: "Incubation Programs",
    duration: "14 Weeks",
    level: "Beginner - Intermediate",
    certBadge: "Founder Launchpad Cert",
    desc: "From concept creation to series-funding readiness. A modular guide designed for startup pioneers launching across emerging markets.",
    gradient: "from-[#7C3AED]/20 via-[#2563EB]/10 to-transparent",
    icon: Compass,
  },
  {
    id: "consulting",
    name: "Consulting Excellence Academy",
    academy: "Professional Services division",
    duration: "8 Weeks",
    level: "Advanced",
    certBadge: "Elite Consultant Cert",
    desc: "Solve critical ecosystem bottlenecks. Learn management consulting diagnostics, data analysis, and advisory delivery frameworks.",
    gradient: "from-[#4F46E5]/20 via-[#7C3AED]/10 to-transparent",
    icon: UserCheck,
  },
];

interface FeaturedProgramsProps {
  onSelectProgram: (programId: string) => void;
}

export function FeaturedPrograms({ onSelectProgram }: FeaturedProgramsProps) {
  return (
    <section className="py-24 bg-[#050816] text-white relative px-6 border-t border-white/5">
      {/* Visual Accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#7C3AED]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-3 block">
              Flagship Curricula
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-space-grotesk tracking-tight leading-tight">
              Featured Academy <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">
                Learning Programs
              </span>
            </h2>
          </div>
          <p className="text-[#A1A1AA] text-sm md:text-base max-w-md font-sans leading-relaxed font-light">
            Our flagship programs provide structured multi-month learning paths with comprehensive project requirements, rigorous assessments, and official certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, idx) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => onSelectProgram(program.id)}
                className="group relative rounded-3xl border border-white/5 bg-[#0A0A12]/90 p-8 hover:border-[#2563EB]/40 hover:bg-[#0A0A12]/40 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between h-[450px]"
              >
                {/* Diagonal Gradient hover backdrop */}
                <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />

                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-white group-hover:text-[#2563EB] group-hover:border-[#2563EB]/30 transition-all duration-500">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-[#A1A1AA] font-sans">
                      <Clock className="w-3 h-3 text-[#2563EB]" />
                      {program.duration}
                    </div>
                  </div>

                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#A1A1AA] mb-2 block font-sans">
                    {program.academy}
                  </span>
                  <h3 className="text-xl font-bold font-space-grotesk text-white group-hover:text-[#2563EB] transition-colors mb-3 leading-snug">
                    {program.name}
                  </h3>
                  <p className="text-[#A1A1AA] text-sm font-sans font-light leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
                    {program.desc}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-6 text-xs text-white">
                    <ShieldCheck className="w-4 h-4 text-[#7C3AED]" />
                    <span className="font-semibold">{program.certBadge}</span>
                    <span className="mx-1.5 text-white/20">|</span>
                    <span className="text-[#A1A1AA] font-sans">{program.level}</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5 group-hover:border-[#2563EB]/25 transition-colors">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#A1A1AA] group-hover:text-white transition-colors font-sans">
                      Inspect Curriculum
                    </span>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#A1A1AA] group-hover:bg-[#2563EB] group-hover:text-white group-hover:border-[#2563EB]/30 transition-all duration-300">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
