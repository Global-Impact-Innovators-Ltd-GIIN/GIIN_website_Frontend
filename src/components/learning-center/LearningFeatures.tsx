"use client";

import React from "react";
import { motion } from "framer-motion";
import { Video, HelpCircle, Code, Users, FileText, Bookmark, Users2, UserCheck } from "lucide-react";

interface Feature {
  title: string;
  desc: string;
  icon: any;
  gradient: string;
  color: string;
}

const features: Feature[] = [
  {
    title: "Video Lessons",
    desc: "Cinema-grade, high-fidelity lectures recorded by leading industry engineering and policy experts.",
    icon: Video,
    gradient: "from-[#2563EB]/25 to-[#4F46E5]/5",
    color: "text-[#2563EB] bg-[#2563EB]/15 border-[#2563EB]/25",
  },
  {
    title: "Interactive Exercises",
    desc: "Built-in sandbox terminals and interactive logic puzzles to validate structural coding concepts.",
    icon: Code,
    gradient: "from-[#7C3AED]/25 to-[#4F46E5]/5",
    color: "text-[#7C3AED] bg-[#7C3AED]/15 border-[#7C3AED]/25",
  },
  {
    title: "Assessments & Quizzes",
    desc: "Rigorous milestone diagnostic checkpoints ensuring deep absorption of path concepts.",
    icon: HelpCircle,
    gradient: "from-[#4F46E5]/25 to-[#2563EB]/5",
    color: "text-[#4F46E5] bg-[#4F46E5]/15 border-[#4F46E5]/25",
  },
  {
    title: "Capstone Projects",
    desc: "Design and implement production-grade projects evaluated directly by the engineering department.",
    icon: Bookmark,
    gradient: "from-[#2563EB]/25 to-[#7C3AED]/5",
    color: "text-[#2563EB] bg-[#2563EB]/15 border-[#2563EB]/25",
  },
  {
    title: "Real Case Studies",
    desc: "Review deployed operational frameworks and historical studies of African startup success stories.",
    icon: FileText,
    gradient: "from-[#7C3AED]/25 to-[#2563EB]/5",
    color: "text-[#7C3AED] bg-[#7C3AED]/15 border-[#7C3AED]/25",
  },
  {
    title: "Discussion Forums",
    desc: "Structured class bulletin threads to share codes, debug issues, and request peer checks.",
    icon: Users,
    gradient: "from-[#4F46E5]/25 to-[#7C3AED]/5",
    color: "text-[#4F46E5] bg-[#4F46E5]/15 border-[#4F46E5]/25",
  },
  {
    title: "Communities of Practice",
    desc: "Participate in regional group chapters, hackathons, and localized physical meetups.",
    icon: Users2,
    gradient: "from-[#2563EB]/25 to-[#4F46E5]/5",
    color: "text-[#2563EB] bg-[#2563EB]/15 border-[#2563EB]/25",
  },
  {
    title: "Expert Mentorship",
    desc: "Weekly advisory feedback from C-level developers, founders, and academic leaders.",
    icon: UserCheck,
    gradient: "from-[#7C3AED]/25 to-[#4F46E5]/5",
    color: "text-[#7C3AED] bg-[#7C3AED]/15 border-[#7C3AED]/25",
  },
];

export function LearningFeatures() {
  return (
    <section className="py-24 bg-[#050816] text-white relative px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">
            Learning Experience Features
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-space-grotesk tracking-tight">
            How We Transform{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">
              The Learning Journey
            </span>
          </h2>
          <p className="text-[#A1A1AA] text-sm md:text-base font-sans font-light max-w-xl mx-auto leading-relaxed">
            Unlike static platforms, the GIIN Digital Learning Ecosystem provides dynamic, verified pathways to shape real capability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative rounded-2xl border border-white/5 bg-[#0A0A12]/90 p-6 overflow-hidden transition-all duration-300 hover:border-[#2563EB]/25"
              >
                {/* Background glow hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />

                <div className={`p-3 rounded-xl border inline-flex mb-6 transition-transform duration-300 group-hover:scale-110 ${feature.color}`}>
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-base font-bold font-space-grotesk text-white mb-2 text-left">
                  {feature.title}
                </h3>
                
                <p className="text-xs text-[#A1A1AA] font-sans font-light leading-relaxed text-left group-hover:text-white/90 transition-colors">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
