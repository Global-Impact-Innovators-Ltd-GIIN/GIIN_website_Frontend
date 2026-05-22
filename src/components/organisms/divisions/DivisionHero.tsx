"use client";

import { motion } from "framer-motion";
import { DivisionData } from "@/data/divisions";

interface Props {
  data: DivisionData;
}

export function DivisionHero({ data }: Props) {
  return (
    <section className="relative flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-background px-6 pt-32 text-center">
      {/* Dynamic Theme Glow */}
      <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-tr ${data.themeColor} blur-[120px] pointer-events-none`} />

      <motion.div
        className="relative z-10 mx-auto max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <span className="mb-6 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-semibold tracking-widest text-white uppercase backdrop-blur-md">
          {data.name}
        </span>
        <h1 className="mb-6 font-heading text-5xl font-bold md:text-7xl lg:text-8xl text-white leading-tight">
          {data.hero.title}
        </h1>
        <p className="mb-10 text-xl font-light text-white/80 md:text-2xl">
          {data.hero.subtitle}
        </p>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          {data.hero.description}
        </p>
      </motion.div>
    </section>
  );
}
