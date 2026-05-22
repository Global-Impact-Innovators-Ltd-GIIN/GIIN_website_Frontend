"use client";

import { motion } from "framer-motion";
import { documentariesData } from "@/data/media";
import Link from "next/link";

export function CinematicGrid() {
  return (
    <section className="w-full bg-[#050510] py-24 border-t border-white/10 overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Original Documentaries</h2>
        <p className="text-muted-foreground text-lg">Cinematic explorations of global innovation.</p>
      </div>

      <div className="flex gap-6 px-6 overflow-x-auto pb-8 snap-x hide-scrollbar">
        {documentariesData.map((doc, index) => (
          <motion.div
            key={doc.id}
            className="snap-start shrink-0 w-[300px] md:w-[400px] group relative rounded-2xl overflow-hidden cursor-pointer"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className={`w-full aspect-[4/5] ${doc.thumbnail} bg-gradient-to-br relative transition-transform duration-500 group-hover:scale-105`}>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
              
              {doc.isNew && (
                <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full z-10">
                  New
                </div>
              )}

              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent z-10">
                <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">{doc.category}</span>
                <h3 className="text-xl font-bold text-white mb-2 leading-tight">{doc.title}</h3>
                <p className="text-sm text-white/70 line-clamp-2 mb-4">{doc.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white/50">{doc.duration}</span>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
