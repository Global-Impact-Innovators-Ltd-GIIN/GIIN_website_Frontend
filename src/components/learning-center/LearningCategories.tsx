"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Cpu, 
  Lightbulb, 
  Rocket, 
  Compass, 
  Search, 
  Sparkles, 
  Building2,
  ArrowRight
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  desc: string;
  courseCount: number;
  icon: any;
  color: string;
}

const categories: Category[] = [
  {
    id: "leadership",
    name: "Leadership Development",
    desc: "Strategic guidance, corporate management, governance principles, and political ethics.",
    courseCount: 6,
    icon: Users,
    color: "text-[#2563EB] bg-[#2563EB]/10 border-[#2563EB]/20",
  },
  {
    id: "technology",
    name: "Technology",
    desc: "Enterprise architecture, web operations, deep computing, systems infrastructure, and AI engineering.",
    courseCount: 9,
    icon: Cpu,
    color: "text-[#7C3AED] bg-[#7C3AED]/10 border-[#7C3AED]/20",
  },
  {
    id: "innovation",
    name: "Innovation",
    desc: "Design thinking, ecosystem mapping, patent creation, R&D execution, and agile management models.",
    courseCount: 5,
    icon: Lightbulb,
    color: "text-[#4F46E5] bg-[#4F46E5]/10 border-[#4F46E5]/20",
  },
  {
    id: "entrepreneurship",
    name: "Entrepreneurship",
    desc: "Capital diagnostics, startup operations, marketing pathways, scaling directives, and seed-funding models.",
    courseCount: 8,
    icon: Rocket,
    color: "text-[#2563EB] bg-[#2563EB]/10 border-[#2563EB]/20",
  },
  {
    id: "consulting",
    name: "Consulting",
    desc: "Diagnostic frameworks, data analysis systems, presentation design, and professional advisory guidelines.",
    courseCount: 4,
    icon: Compass,
    color: "text-[#7C3AED] bg-[#7C3AED]/10 border-[#7C3AED]/20",
  },
  {
    id: "research",
    name: "Research",
    desc: "Academic writing, database architecture, methodology design, economic analysis, and case reporting.",
    courseCount: 5,
    icon: Search,
    color: "text-[#4F46E5] bg-[#4F46E5]/10 border-[#4F46E5]/20",
  },
  {
    id: "professional-dev",
    name: "Professional Development",
    desc: "Soft skills, communication tools, career design, and strategic personal development frameworks.",
    courseCount: 7,
    icon: Sparkles,
    color: "text-[#2563EB] bg-[#2563EB]/10 border-[#2563EB]/20",
  },
  {
    id: "organizational-dev",
    name: "Organizational Development",
    desc: "Human resources, change workflows, system auditing, corporate policy, and group dynamic studies.",
    courseCount: 4,
    icon: Building2,
    color: "text-[#7C3AED] bg-[#7C3AED]/10 border-[#7C3AED]/20",
  },
];

interface LearningCategoriesProps {
  onSelectCategory: (categoryId: string) => void;
  activeCategory?: string;
}

export function LearningCategories({ onSelectCategory, activeCategory }: LearningCategoriesProps) {
  return (
    <section className="py-24 bg-[#050816] text-white relative px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#7C3AED]">
            Interactive Frameworks
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-space-grotesk tracking-tight">
            Explore by{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED]">
              Learning Categories
            </span>
          </h2>
          <p className="text-[#A1A1AA] text-sm md:text-base font-sans font-light max-w-xl mx-auto leading-relaxed">
            Filter courses and learning materials by selecting a specific focus area. Empower your personal or organizational learning engine.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => onSelectCategory(cat.id)}
                className={`group cursor-pointer rounded-2xl border p-6 flex flex-col justify-between h-[250px] transition-all duration-300 ${
                  isActive 
                    ? "bg-[#2563EB]/10 border-[#2563EB] shadow-lg shadow-[#2563EB]/10" 
                    : "bg-[#0A0A12]/80 border-white/5 hover:border-white/10 hover:bg-[#0A0A12]/40"
                }`}
              >
                <div>
                  <div className={`p-3 rounded-xl inline-flex border mb-5 transition-transform duration-300 group-hover:scale-110 ${cat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold font-space-grotesk text-white group-hover:text-[#2563EB] transition-colors mb-2 leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#A1A1AA] font-sans font-light leading-relaxed line-clamp-3">
                    {cat.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-4">
                  <span className="text-[11px] font-bold font-sans text-[#2563EB] bg-[#2563EB]/5 px-2.5 py-1 rounded-md border border-[#2563EB]/10">
                    {cat.courseCount} Courses
                  </span>
                  <span className="text-[#A1A1AA] group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
