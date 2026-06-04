"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Lightbulb, UserCheck, Flame } from "lucide-react";

export function WhyGIINExists() {
  const sections = [
    {
      icon: Globe,
      letter: "A",
      title: "Why Africa?",
      subtitle: "The Frontier of Ingenuity",
      desc: "Africa possesses the world's youngest population and a highly resilient, adaptive talent pool. Traditional global frameworks fail to address the unique complexities of the continent. We do not view Africa as a market to be aided, but as the world's most critical hub for native, ground-up innovation.",
      accent: "from-primary/30 to-transparent",
      tagColor: "text-primary border-primary/20 bg-primary/5",
    },
    {
      icon: Lightbulb,
      letter: "I",
      title: "Why Innovation?",
      subtitle: "Leapfrogging Legacy Systems",
      desc: "Linear progress is insufficient to match the speed of continental demands. We require exponential leaps. By investing in native research, sovereign cloud infrastructure, and AI, we bypass legacy paradigms to deploy digital-first platforms that scale instantly.",
      accent: "from-blue-500/20 to-transparent",
      tagColor: "text-blue-400 border-blue-500/20 bg-blue-500/5",
    },
    {
      icon: UserCheck,
      letter: "L",
      title: "Why Leadership?",
      subtitle: "The Integrity Catalyst",
      desc: "Innovation without high-integrity governance is short-lived. Resilient systems are built by resilient minds. We combine high-end technology solutions with rigorous leadership training to ensure that the institutions we scale are led by visionaries who hold themselves accountable.",
      accent: "from-accent/20 to-transparent",
      tagColor: "text-accent border-accent/20 bg-accent/5",
    },
    {
      icon: Flame,
      letter: "N",
      title: "Why Now?",
      subtitle: "Securing Digital Sovereignty",
      desc: "The global geopolitical and technology landscape is undergoing a massive shift. The decisions we make in this decade will cement Africa's place in the digital economy. Establishing self-reliance in tech, leadership models, and business architectures is no longer optional—it is urgent.",
      accent: "from-purple-500/25 to-transparent",
      tagColor: "text-purple-400 border-purple-500/20 bg-purple-500/5",
    },
  ];

  return (
    <section className="py-24 px-6 relative bg-[#020205] border-t border-border/10">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[800px] bg-primary/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            Our Purpose
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter font-outfit mb-6">
            The Reason{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent italic">
              Behind GIIN
            </span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed font-light">
            We exist to dismantle systemic barriers by combining the driving forces of modern growth: sovereign technology, visionary leadership, and market-ready consulting.
          </p>
        </div>

        {/* Alternate Rows */}
        <div className="space-y-24 md:space-y-32">
          {sections.map((sec, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={sec.title}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center`}
              >
                {/* Visual / Huge Letter Side */}
                <div
                  className={`lg:col-span-5 flex justify-center items-center ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="relative w-64 h-64 md:w-80 md:h-80 rounded-[3.5rem] border border-border/10 bg-[#07070F] overflow-hidden flex items-center justify-center shadow-2xl group"
                  >
                    {/* Glowing background */}
                    <div className={`absolute inset-0 bg-gradient-to-tr ${sec.accent} opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
                    
                    {/* Floating Wireframe overlay */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

                    {/* Styled Large Letter */}
                    <span className="text-[120px] md:text-[180px] font-black text-foreground/5 font-outfit select-none select-none tracking-tighter absolute">
                      {sec.letter}
                    </span>

                    {/* Icon */}
                    <div className="relative z-10 p-5 rounded-3xl bg-card border border-border/15 shadow-xl">
                      <sec.icon className="w-10 h-10 text-foreground group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </motion.div>
                </div>

                {/* Text Side */}
                <div
                  className={`lg:col-span-7 space-y-6 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Tag */}
                    <span className={`inline-flex items-center px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest ${sec.tagColor} mb-4`}>
                      {sec.title}
                    </span>

                    {/* Subtitle */}
                    <h3 className="text-2xl md:text-4xl font-extrabold text-foreground tracking-tight font-outfit mb-4">
                      {sec.subtitle}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed font-light text-base md:text-lg">
                      {sec.desc}
                    </p>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
