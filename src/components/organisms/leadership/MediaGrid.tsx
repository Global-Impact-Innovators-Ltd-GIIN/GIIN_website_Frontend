"use client";

import { motion } from "framer-motion";
import { ContentItem } from "@/data/leadership";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  items: ContentItem[];
}

export function MediaGrid({ title, description, items }: Props) {
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
              className="group relative flex flex-col rounded-3xl border border-white/10 bg-white/5 overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`h-48 w-full ${item.thumbnail || 'bg-primary/20'} relative flex items-center justify-center`}>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                
                {/* Play Button Overlay */}
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md z-10 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>

                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md rounded-md px-2 py-1 text-xs font-bold text-white z-10">
                  {item.duration}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">{item.category}</span>
                  <span className="text-xs text-white/50">{item.date}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 leading-tight group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mb-6 flex-1 text-sm">
                  {item.excerpt}
                </p>
                <Link href="#" className="mt-auto w-full text-center py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold text-white transition-colors">
                  Listen Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
