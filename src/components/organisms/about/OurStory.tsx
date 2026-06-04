"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Target, ShieldAlert, Award } from "lucide-react";

export function OurStory() {
  const chapters = [
    {
      icon: ShieldAlert,
      tag: "THE CATALYST",
      title: "Addressing the Core Challenge",
      desc: "For decades, Africa's technological progress has been fragmented, relying heavily on foreign infrastructure and siloed solutions. We identified a critical gap: the absence of a unified, sovereign framework that combines elite leadership development with cutting-edge engineering and research.",
      gradient: "from-red-500/10 to-transparent",
      borderColor: "group-hover:border-red-500/30",
      iconColor: "text-red-400",
    },
    {
      icon: BookOpen,
      tag: "THE FOUNDATION",
      title: "Why GIIN Was Created",
      desc: "Global Impact Innovators Ltd (GIIN) was established as a direct answer to this continental challenge. We believe that true sovereignty and sustainable development must be built from within. By establishing a world-class network, we empower communities and institutions directly.",
      gradient: "from-primary/20 to-transparent",
      borderColor: "group-hover:border-primary/40",
      iconColor: "text-primary",
    },
    {
      icon: Target,
      tag: "THE VISION",
      title: "Shifting the Paradigm",
      desc: "Our model breaks away from traditional corporate consulting. By merging leadership development, sovereign technology solutions, research, education, and media into a single integrated ecosystem, we amplify the impact of every project, leader, and venture we back.",
      gradient: "from-secondary/20 to-transparent",
      borderColor: "group-hover:border-secondary/40",
      iconColor: "text-secondary",
    },
    {
      icon: Award,
      tag: "THE HORIZON",
      title: "Our Long-Term Mission",
      desc: "Today, GIIN operates as a multi-disciplinary engine across Africa. Our long-term mission is to establish the infrastructure and leadership pipeline required to position Africa not just as a consumer of global tech, but as a key exporter of innovation and intellectual capital.",
      gradient: "from-blue-500/10 to-transparent",
      borderColor: "group-hover:border-blue-500/30",
      iconColor: "text-blue-400",
    },
  ];

  return (
    <section className="py-24 px-6 relative bg-[#020205] border-t border-border/10">
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            Our Origin
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter font-outfit mb-6">
            A Journey of{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary italic">
              Continental Sovereignty
            </span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed font-light">
            GIIN was founded to build native capability, solve structural bottlenecks, and deliver scalable impact across Africa's high-growth sectors.
          </p>
        </div>

        {/* Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {chapters.map((chapter, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative rounded-3xl border border-border/10 bg-card p-8 md:p-10 hover:bg-muted/30 transition-all duration-500 flex flex-col justify-between h-full"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${chapter.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none`} />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-bold text-muted-foreground tracking-[0.2em] uppercase">
                    {chapter.tag}
                  </span>
                  <chapter.icon className={`w-8 h-8 ${chapter.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 tracking-tight group-hover:text-primary transition-colors duration-300">
                  {chapter.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed font-light text-sm md:text-base">
                  {chapter.desc}
                </p>
              </div>
              
              {/* Corner Glow Accent */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent blur-md rounded-br-3xl pointer-events-none" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
