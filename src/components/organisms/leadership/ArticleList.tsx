"use client";

import { motion } from "framer-motion";
import { ContentItem } from "@/data/leadership";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  items: ContentItem[];
}

export function ArticleList({ title, description, items }: Props) {
  return (
    <section className="w-full bg-[#050510] py-32 border-t border-white/10 min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="font-heading text-5xl font-bold md:text-6xl text-white mb-6">{title}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className="group flex flex-col rounded-3xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-colors"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">{item.category}</span>
                <span className="text-xs text-white/50">{item.date}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-muted-foreground mb-8 flex-1">
                {item.excerpt}
              </p>
              {item.author && (
                <div className="text-sm font-medium text-white/70 mb-6">
                  By {item.author}
                </div>
              )}
              <Link href="#" className="mt-auto inline-flex items-center text-sm font-bold text-white group-hover:text-primary transition-colors">
                Read Article <span aria-hidden="true" className="ml-2">&rarr;</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
