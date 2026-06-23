"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Briefcase, GraduationCap, Sparkles } from "lucide-react";

interface Instructor {
  name: string;
  role: string;
  expertise: string;
  coursesCount: number;
  experienceYears: number;
  initials: string;
  gradient: string;
  bio: string;
}

const instructors: Instructor[] = [
  {
    name: "Dr. Kofi Mensah",
    role: "Director of Civic Leadership Development",
    expertise: "Policy Formulation, Public Administration, Strategic Communication",
    coursesCount: 3,
    experienceYears: 18,
    initials: "KM",
    gradient: "from-[#2563EB] to-[#4F46E5]",
    bio: "Former policy adviser to international development institutions. Dedicated to molding next-generation civic administrators in emerging states.",
  },
  {
    name: "Jean-Pierre Diallo",
    role: "Chief Network Architect",
    expertise: "Linux Kernel Development, Mesh Networking Protocols",
    coursesCount: 4,
    experienceYears: 15,
    initials: "JD",
    gradient: "from-[#7C3AED] to-[#4F46E5]",
    bio: "Pioneered community-led decentralized WiFi grids. Steers the sovereign software infrastructure labs division.",
  },
  {
    name: "Amina Jalloh",
    role: "Senior Enterprise Diagnostic Strategist",
    expertise: "Management Consulting, Diagnostic Frameworks",
    coursesCount: 3,
    experienceYears: 12,
    initials: "AJ",
    gradient: "from-[#4F46E5] to-[#2563EB]",
    bio: "Ex-MBB partner advising emerging market conglomerates. Specializes in restructuring diagnostics and operational workflows.",
  },
  {
    name: "Tunde Folawiyo",
    role: "Venture Principal & Startup Incubator Lead",
    expertise: "Seed Round Formulations, Pitch Engineering, Growth Strategies",
    coursesCount: 4,
    experienceYears: 14,
    initials: "TF",
    gradient: "from-[#7C3AED] to-[#2563EB]",
    bio: "Angel investor and business builder. Guided over 40 startup cohorts through operational staging and institutional series funding.",
  },
];

export function InstructorsSection() {
  return (
    <section className="py-24 bg-[#050816] text-white relative px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">
            Faculty & Experts
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-space-grotesk tracking-tight">
            Meet Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">
              Instructors & Faculty
            </span>
          </h2>
          <p className="text-[#A1A1AA] text-sm md:text-base font-sans font-light max-w-xl mx-auto leading-relaxed">
            Learn from verified industry developers, ex-management consulting partners, governance experts, and active venture specialists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((inst, idx) => (
            <motion.div
              key={inst.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative rounded-3xl border border-white/5 bg-[#0A0A12]/95 p-6 hover:border-[#2563EB]/25 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Visual Avatar Placeholder with premium initial gradient */}
                <div className="flex justify-center mb-6">
                  <div className={`w-24 h-24 rounded-2xl bg-gradient-to-tr ${inst.gradient} p-[1px] shadow-lg`}>
                    <div className="w-full h-full bg-[#0A0A12] rounded-2xl flex items-center justify-center font-space-grotesk text-2xl font-bold text-white group-hover:scale-[1.03] transition-transform duration-300">
                      {inst.initials}
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-1 mb-4">
                  <h3 className="text-lg font-bold font-space-grotesk text-white">
                    {inst.name}
                  </h3>
                  <div className="text-xs text-[#2563EB] font-sans font-semibold">
                    {inst.role}
                  </div>
                </div>

                <p className="text-xs text-[#A1A1AA] font-sans font-light leading-relaxed text-center mb-6 border-b border-white/5 pb-4">
                  {inst.bio}
                </p>

                <div className="space-y-2 text-left">
                  <div className="text-[10px] uppercase font-bold text-[#A1A1AA] tracking-wider mb-2 font-space-grotesk">
                    Expertise Focus
                  </div>
                  <p className="text-xs text-white/90 font-sans font-light leading-normal">
                    {inst.expertise}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4 mt-6 text-xs text-[#A1A1AA] font-sans">
                <div className="flex items-center gap-1.5 justify-center">
                  <GraduationCap className="w-4 h-4 text-[#2563EB]" />
                  <span>{inst.coursesCount} Courses</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center">
                  <Briefcase className="w-4 h-4 text-[#7C3AED]" />
                  <span>{inst.experienceYears} yrs Exp</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Future Integration Section Info */}
        <div className="mt-16 text-center">
          <p className="text-[11px] uppercase font-bold tracking-widest text-[#A1A1AA] font-space-grotesk inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
            Supporting future integration of Guest Lecturers & Institutional Partner Systems.
          </p>
        </div>
      </div>
    </section>
  );
}
