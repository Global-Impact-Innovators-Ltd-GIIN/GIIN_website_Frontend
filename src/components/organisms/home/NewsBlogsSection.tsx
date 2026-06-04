"use client";

import { motion } from "framer-motion";

export function NewsBlogsSection() {
  const articles = [
    { type: "News", date: "May 21, 2026", title: "GIIN Announces New AI Research Initiative in Kigali" },
    { type: "Blog", date: "May 18, 2026", title: "The Architect's Guide to Building Scalable Ecosystems" },
    { type: "Event", date: "May 15, 2026", title: "Leadership Summit 2026: Key Takeaways" },
  ];

  return (
    <section className="w-full bg-background py-20 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="font-heading text-3xl font-black md:text-5xl text-foreground tracking-tighter">
              Latest from the <span className="text-primary dark:text-secondary italic">Ecosystem</span>
            </h2>
          </div>
          <button className="mt-4 md:mt-0 text-sm font-bold text-foreground hover:text-primary dark:hover:text-secondary transition-colors flex items-center gap-2">
            View All Updates <span aria-hidden="true">&rarr;</span>
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.div
              key={i}
              className="flex flex-col space-y-4 p-8 rounded-3xl bg-card border border-border/10 hover:border-primary/40 dark:hover:border-secondary/40 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-xl group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary dark:text-secondary">{article.type}</span>
                <span className="text-xs font-bold text-muted-foreground">{article.date}</span>
              </div>
              <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary dark:group-hover:text-secondary transition-colors tracking-tight">{article.title}</h3>
              <div className="mt-auto pt-4 flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-foreground group-hover:text-primary dark:group-hover:text-secondary transition-colors">Read Narrative</span>
                <div className="h-px w-8 bg-border group-hover:w-12 group-hover:bg-primary dark:group-hover:bg-secondary transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
