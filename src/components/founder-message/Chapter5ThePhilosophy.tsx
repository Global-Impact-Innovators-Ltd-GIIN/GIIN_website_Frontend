"use client";

import React from "react";
import { motion } from "framer-motion";
import { Eye, HeartHandshake, Lightbulb, ShieldCheck, Award, Hourglass, CheckCircle2, Sparkles } from "lucide-react";

interface PhilosophyItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  statement: string;
  detail: string;
}

interface ValueItem {
  name: string;
  definition: string;
  manifesto: string;
}

export function Chapter5ThePhilosophy() {
  const philosophies: PhilosophyItem[] = [
    {
      icon: Eye,
      title: "Vision",
      statement: "Leaders see what others cannot yet see.",
      detail: "Visualizing the future of continental software sovereignty and structural empowerment before it materializes.",
    },
    {
      icon: HeartHandshake,
      title: "Service",
      statement: "Leadership begins with serving others.",
      detail: "Steering the ecosystem with a commitment to lift the developers, entrepreneurs, and students we serve.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      statement: "Progress requires creative thinking.",
      detail: "Pushing past established paradigms to construct custom protocols, database engines, and access structures.",
    },
    {
      icon: ShieldCheck,
      title: "Integrity",
      statement: "Trust is the foundation of influence.",
      detail: "Holding ourselves to transparent reporting, zero-backdoor secure protocols, and unwavering ethical criteria.",
    },
    {
      icon: Award,
      title: "Excellence",
      statement: "Mediocrity is never the standard.",
      detail: "Refusing shortcuts. Every line of code, every UI animation, and every system integration must represent global-grade standards.",
    },
    {
      icon: Hourglass,
      title: "Legacy",
      statement: "Leadership must outlive the leader.",
      detail: "Engineering programs, training systems, and code structures built to serve the continent for generations.",
    },
  ];

  const values: ValueItem[] = [
    {
      name: "Faith",
      definition: "Belief in unseen potentials and divine alignment.",
      manifesto: "Operating with the conviction that Africa&apos;s digital sovereignty is not only possible but inevitable."
    },
    {
      name: "Integrity",
      definition: "Honesty and reliability under all circumstances.",
      manifesto: "Shaping clean data systems and transparent capital options that never exploit or compromise user security."
    },
    {
      name: "Service",
      definition: "Directing authority towards public utility.",
      manifesto: "Steering the ecosystem with humility, ensuring all engineering assets benefit the community first."
    },
    {
      name: "Excellence",
      definition: "Rejecting compromises and average results.",
      manifesto: "Refusing mediocrity. Every line of code, document page, and client integration must meet premium standards."
    },
    {
      name: "Lifelong Learning",
      definition: "Continuous research and operational training.",
      manifesto: "Remaining humble students of code, cryptography, and leadership principles to adapt to the future."
    },
    {
      name: "Discipline",
      definition: "Consistency in execution and standard preservation.",
      manifesto: "Working daily to execute the long-term roadmap, independent of external market cycles."
    }
  ];

  return (
    <section id="philosophy" className="py-24 bg-card/30 border-y border-border/10 relative overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Chapter 5: The Philosophy
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter font-heading mt-3 mb-6">
            Our Leadership Principles & Values
          </h2>
          <p className="text-muted-foreground text-lg font-light leading-relaxed">
            The values that drive decision-making and operational execution across all divisions of the GIIN Ecosystem.
          </p>
        </div>

        {/* Leadership Pillars Subtitle */}
        <div className="max-w-3xl mx-auto mb-10 text-left">
          <h3 className="text-xl font-bold font-heading text-foreground tracking-tight border-l-2 border-primary pl-4">
            The 6 Pillars of Servant Leadership
          </h3>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {philosophies.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group p-8 rounded-3xl border border-border/10 bg-background/50 hover:bg-card/70 backdrop-blur-3xl transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-2xl hover:border-primary/30"
              >
                {/* Glow layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="w-14 h-14 rounded-2xl border border-border/10 bg-muted/40 text-muted-foreground group-hover:text-accent group-hover:border-accent/40 flex items-center justify-center mb-6 transition-all duration-500 relative">
                  <Icon className="w-6 h-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
                </div>

                <h4 className="text-xl font-bold text-foreground font-heading tracking-tight mb-2">
                  {item.title}
                </h4>
                
                <p className="text-sm font-semibold text-primary group-hover:text-indigo-400 transition-colors mb-4 italic leading-normal">
                  &ldquo;{item.statement}&rdquo;
                </p>

                <p className="text-muted-foreground text-xs font-light leading-relaxed">
                  {item.detail}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Core Values Subtitle */}
        <div className="max-w-3xl mx-auto mb-10 text-left">
          <h3 className="text-xl font-bold font-heading text-foreground tracking-tight border-l-2 border-accent pl-4">
            Guiding Character Values
          </h3>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-8 rounded-3xl border border-border/15 bg-background/60 hover:border-accent/40 hover:bg-card/40 backdrop-blur-3xl transition-all duration-300 relative group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 blur-[40px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <h4 className="text-xl font-bold tracking-tight text-foreground font-heading">
                  {item.name}
                </h4>
              </div>

              <p className="text-xs font-semibold text-primary mb-3 leading-normal">
                {item.definition}
              </p>

              <div className="h-[1px] bg-border/10 w-full mb-4" />

              <p className="text-muted-foreground text-xs font-light leading-relaxed">
                {item.manifesto}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
