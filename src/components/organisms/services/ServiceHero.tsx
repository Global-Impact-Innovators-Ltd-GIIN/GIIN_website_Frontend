"use client";

import { motion } from "framer-motion";
import { ServiceData } from "@/data/services";

interface Props {
  data: ServiceData;
}

export function ServiceHero({ data }: Props) {
  return (
    <section className="relative flex min-h-[60vh] w-full flex-col items-center justify-center overflow-hidden bg-background px-6 pt-32 text-center border-b border-white/10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 blur-[150px] pointer-events-none rounded-full" />
      
      <motion.div
        className="relative z-10 max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="mb-6 inline-block rounded-full border border-primary/50 bg-primary/10 px-4 py-1.5 text-sm font-semibold tracking-widest text-primary uppercase backdrop-blur-md">
          Enterprise Service
        </span>
        <h1 className="mb-6 font-heading text-5xl font-bold md:text-7xl text-white">
          {data.title}
        </h1>
        <p className="mb-8 text-xl text-white/80 md:text-2xl">
          {data.subtitle}
        </p>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          {data.description}
        </p>
      </motion.div>
    </section>
  );
}
