"use client";

import { motion } from "framer-motion";
import { DivisionData } from "@/data/divisions";

interface Props {
  data: DivisionData;
}

export function DivisionServices({ data }: Props) {
  return (
    <section className="w-full border-t border-border/50 bg-black py-24">
      <div className="container mx-auto px-6">
        <h2 className="mb-16 font-heading text-4xl font-bold md:text-5xl text-white text-center">
          Core <span className="text-white/50">Services</span>
        </h2>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {data.services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all hover:bg-white/10 cursor-pointer min-h-[250px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${data.themeColor} opacity-0 transition-opacity group-hover:opacity-100`} />
              <div className="relative z-10">
                <div className="mb-6 h-12 w-12 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <h3 className="mb-3 text-2xl font-bold text-white">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
