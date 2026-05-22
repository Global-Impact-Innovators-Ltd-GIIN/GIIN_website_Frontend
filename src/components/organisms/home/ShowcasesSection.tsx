"use client";

import { motion } from "framer-motion";

export function ShowcasesSection() {
  const showcases = [
    { title: "Client Showcase", subtitle: "Transforming Enterprises", items: ["IBM", "Tesla", "Stripe", "OpenAI"] },
    { title: "Research Showcase", subtitle: "Data-driven Paradigms", items: ["AI in Africa 2026", "The Future of Fintech", "Sustainable Tech Ecosystems"] },
    { title: "Podcast Showcase", subtitle: "Voices of Innovation", items: ["Episode 42: The Leapfrog", "Episode 43: Next-Gen Leaders", "Episode 44: Scaling Impact"] },
  ];

  return (
    <section className="w-full bg-background py-24">
      <div className="container mx-auto px-6 space-y-32">
        {showcases.map((showcase, index) => (
          <div key={index} className="flex flex-col space-y-12">
            <motion.div 
              className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-border/50 pb-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <h3 className="text-sm font-semibold tracking-widest text-primary uppercase">{showcase.subtitle}</h3>
                <h2 className="mt-2 font-heading text-4xl font-bold md:text-5xl text-white">{showcase.title}</h2>
              </div>
              <button className="mt-4 md:mt-0 text-sm font-medium text-white hover:text-accent transition-colors flex items-center gap-2">
                View All <span aria-hidden="true">&rarr;</span>
              </button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {showcase.items.map((item, i) => (
                <motion.div 
                  key={i}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 flex items-end cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                  <h4 className="relative z-10 text-2xl font-bold text-white group-hover:text-primary transition-colors">{item}</h4>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
