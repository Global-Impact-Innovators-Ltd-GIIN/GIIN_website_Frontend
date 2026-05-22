"use client";

import { motion } from "framer-motion";
import { ContentItem } from "@/data/leadership";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  items: ContentItem[];
}

export function EventCalendar({ title, description, items }: Props) {
  return (
    <section className="w-full bg-[#050510] py-32 border-t border-white/10 min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="font-heading text-5xl font-bold md:text-6xl text-white mb-6">{title}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="space-y-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className="group flex flex-col md:flex-row items-center rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-primary/50 transition-colors gap-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {/* Date Box */}
              <div className="bg-primary/20 border border-primary/30 rounded-2xl p-4 min-w-[120px] text-center flex flex-col justify-center">
                <span className="text-sm font-bold uppercase tracking-widest text-primary mb-1">
                  {item.category}
                </span>
                <span className="text-lg font-extrabold text-white">
                  {item.date}
                </span>
              </div>

              {/* Event Details */}
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {item.excerpt}
                </p>
                <div className="flex items-center text-sm font-medium text-white/50">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {item.location}
                </div>
              </div>

              {/* Action */}
              <div className="w-full md:w-auto">
                <Link href="#" className="block w-full text-center px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold text-white transition-colors">
                  Register
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
