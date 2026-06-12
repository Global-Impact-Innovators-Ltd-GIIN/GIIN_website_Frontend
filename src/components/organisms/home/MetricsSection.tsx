"use client";

import { motion } from "framer-motion";

const metrics = [
  { value: "$500M+", label: "Venture Capital Raised" },
  { value: "50,000+", label: "Leaders Trained" },
  { value: "120+", label: "Enterprise Partners" },
  { value: "45", label: "African Nations Reached" },
];

export function MetricsSection() {
  return (
    <section className="w-full border-t border-border/50 bg-section-gradient py-24">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          className="mb-16 font-heading text-4xl font-black md:text-6xl text-foreground tracking-tighter"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Impact at <span className="text-primary italic">Scale</span>
        </motion.h2>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center justify-center space-y-2 p-10 rounded-[2.5rem] bg-card border border-border/20 dark:border-border/10 group hover:border-primary/40 transition-all duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-5xl font-black text-foreground md:text-7xl group-hover:text-primary transition-colors">{metric.value}</h3>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
