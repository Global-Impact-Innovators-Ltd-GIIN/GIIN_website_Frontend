"use client";

import React from "react";
import { motion } from "framer-motion";
import { Crown, Cpu, Award, Scale, RefreshCw, Handshake } from "lucide-react";

export function CoreValues() {
  const values = [
    {
      icon: Crown,
      title: "Leadership",
      desc: "Cultivating visionary thinkers who serve with high accountability, foresight, and continental responsibility.",
      glowColor: "group-hover:shadow-primary/10",
      borderColor: "group-hover:border-primary/30",
      iconColor: "text-primary",
    },
    {
      icon: Cpu,
      title: "Innovation",
      desc: "Pioneering native technological breakthroughs and building state-of-the-art sovereign infrastructure.",
      glowColor: "group-hover:shadow-blue-500/10",
      borderColor: "group-hover:border-blue-500/30",
      iconColor: "text-blue-400",
    },
    {
      icon: Award,
      title: "Excellence",
      desc: "Maintaining the absolute highest standards in execution, research analysis, and engineering precision.",
      glowColor: "group-hover:shadow-accent/10",
      borderColor: "group-hover:border-accent/30",
      iconColor: "text-accent",
    },
    {
      icon: Scale,
      title: "Integrity",
      desc: "Upholding trust, transparency, and deep ethical standards in all public, private, and global operations.",
      glowColor: "group-hover:shadow-green-500/10",
      borderColor: "group-hover:border-green-500/30",
      iconColor: "text-green-400",
    },
    {
      icon: RefreshCw,
      title: "Transformation",
      desc: "Accelerating the systemic transition of industries, human capability, and socio-economic systems.",
      glowColor: "group-hover:shadow-purple-500/10",
      borderColor: "group-hover:border-purple-500/30",
      iconColor: "text-purple-400",
    },
    {
      icon: Handshake,
      title: "Collaboration",
      desc: "Forging dynamic global partnerships while unifying regional talents to solve shared, complex challenges.",
      glowColor: "group-hover:shadow-teal-500/10",
      borderColor: "group-hover:border-teal-500/30",
      iconColor: "text-teal-400",
    },
  ];

  return (
    <section className="py-24 px-6 relative bg-[#020205] border-t border-border/10">
      {/* Soft Ambient Light */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Title */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            Our DNA
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter font-outfit mb-6">
            The Values That{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent italic">
              Guide Our Mission
            </span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed font-light">
            Every line of code we write, every leader we train, and every partnership we build is grounded in six immutable principles.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((val, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className={`group relative rounded-3xl border border-border/5 bg-[#07070F] p-8 transition-all duration-300 shadow-xl ${val.glowColor} ${val.borderColor}`}
            >
              {/* Subtle background gradient change on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-card/30 to-card/5 rounded-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  {/* Icon and Accent circle */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-2xl bg-card border border-border/10 group-hover:bg-muted transition-colors duration-300">
                      <val.icon className={`w-6 h-6 ${val.iconColor} group-hover:rotate-6 transition-transform duration-300`} />
                    </div>
                    {/* Micro-interaction dot */}
                    <div className="w-1.5 h-1.5 rounded-full bg-border/20 group-hover:bg-primary transition-colors duration-300" />
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
                    {val.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm font-light">
                    {val.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
