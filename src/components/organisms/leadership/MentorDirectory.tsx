"use client";

import { motion } from "framer-motion";
import { mentorsData } from "@/data/leadership";

export function MentorDirectory() {
  return (
    <section className="w-full bg-[#050510] py-32 border-t border-white/10 min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="font-heading text-5xl font-bold md:text-6xl text-white mb-6">Mentorship Network</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Connect with industry veterans, former founders, and C-level executives dedicated to cultivating the next generation of global leaders.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentorsData.map((mentor, index) => (
            <motion.div
              key={mentor.id}
              className="group relative flex flex-col rounded-3xl border border-white/10 bg-white/5 p-8 overflow-hidden hover:border-primary/50 transition-colors"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl font-bold text-white uppercase">
                  {mentor.name.charAt(0)}
                </div>
                <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${mentor.availability === 'Accepting Mentees' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                  {mentor.availability}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-1">
                {mentor.name}
              </h3>
              <p className="text-primary font-medium text-sm mb-1">
                {mentor.title}
              </p>
              <p className="text-muted-foreground text-sm mb-6">
                @ {mentor.company}
              </p>

              <div className="mb-8 flex-1">
                <h4 className="text-xs font-bold uppercase text-white/50 mb-3">Core Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {mentor.expertise.map(exp => (
                    <span key={exp} className="bg-black/50 border border-white/10 rounded-md px-2 py-1 text-xs text-white/80">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full text-center py-3 bg-white/10 hover:bg-primary hover:text-white rounded-xl text-sm font-bold text-white transition-colors">
                Request Mentorship
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
