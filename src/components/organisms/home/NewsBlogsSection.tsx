"use client";

import { motion } from "framer-motion";

export function NewsBlogsSection() {
  const articles = [
    { type: "News", date: "May 21, 2026", title: "GIIN Announces New AI Research Initiative in Kigali" },
    { type: "Blog", date: "May 18, 2026", title: "The Architect's Guide to Building Scalable Ecosystems" },
    { type: "Event", date: "May 15, 2026", title: "Leadership Summit 2026: Key Takeaways" },
  ];

  return (
    <section className="w-full bg-[#050510] py-24">
      <div className="container mx-auto px-6">
        <motion.div 
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="font-heading text-4xl font-bold md:text-5xl text-white">
              Latest from the <span className="text-primary">Ecosystem</span>
            </h2>
          </div>
          <button className="mt-4 md:mt-0 text-sm font-medium text-white hover:text-accent transition-colors flex items-center gap-2">
            View All Updates <span aria-hidden="true">&rarr;</span>
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.div
              key={i}
              className="flex flex-col space-y-4 p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">{article.type}</span>
                <span className="text-xs font-medium text-muted-foreground">{article.date}</span>
              </div>
              <h3 className="text-xl font-bold text-white leading-tight">{article.title}</h3>
              <div className="mt-auto pt-4">
                <span className="text-sm font-medium text-white group-hover:text-primary transition-colors">Read More</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
