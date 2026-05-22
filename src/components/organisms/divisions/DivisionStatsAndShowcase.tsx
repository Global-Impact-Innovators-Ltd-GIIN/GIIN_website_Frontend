"use client";

import { motion } from "framer-motion";
import { DivisionData } from "@/data/divisions";

interface Props {
  data: DivisionData;
}

export function DivisionStatsAndShowcase({ data }: Props) {
  return (
    <section className="w-full bg-[#050510] py-32 overflow-hidden">
      <div className="container mx-auto px-6 space-y-32">
        
        {/* Statistics */}
        <div>
          <h2 className="mb-16 font-heading text-3xl font-bold text-white text-center uppercase tracking-widest opacity-50">Impact Metrics</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {data.statistics.map((stat, i) => (
              <motion.div 
                key={i} 
                className="flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-white/5 border border-white/10"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="text-5xl font-extrabold text-white mb-4">{stat.value}</div>
                <div className="text-sm font-semibold tracking-widest text-primary uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Case Studies */}
        <div>
          <h2 className="mb-12 font-heading text-4xl font-bold text-white">Case Studies</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {data.caseStudies.map((study, i) => (
              <motion.div 
                key={i} 
                className="group p-8 rounded-2xl bg-black border border-white/10 hover:border-white/30 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <h3 className="text-2xl font-bold text-white mb-2">{study.title}</h3>
                <p className="text-muted-foreground mb-6">Client: <span className="text-white">{study.client}</span></p>
                <div className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary font-medium">
                  Impact: {study.impact}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h2 className="mb-12 font-heading text-4xl font-bold text-white text-center">What They Say</h2>
          <div className="max-w-4xl mx-auto text-center">
            {data.testimonials.map((test, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-2xl md:text-4xl font-light text-white italic mb-8">&quot;{test.quote}&quot;</p>
                <div className="text-primary font-bold text-lg">{test.author}</div>
                <div className="text-muted-foreground">{test.role}</div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
