"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface ValueItem {
  name: string;
  definition: string;
  manifesto: string;
}

export function PersonalValues() {
  const values: ValueItem[] = [
    {
      name: "Faith",
      definition: "Belief in unseen potentials and divine alignment.",
      manifesto: "Operating with the conviction that Africa's digital sovereignty is not only possible but inevitable."
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
    <section className="py-24 bg-card/20 border-y border-border/10 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Strategic Compass
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter font-heading mb-4">
            Personal Values
          </h2>
          <p className="text-muted-foreground text-lg font-light leading-relaxed">
            The core ideals that guide the Founder&apos;s personal character, guiding the GIIN network&apos;s strategic trajectory.
          </p>
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
              {/* Subtle top-right golden accent glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 blur-[40px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <h3 className="text-xl font-bold tracking-tight text-foreground font-heading">
                  {item.name}
                </h3>
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
