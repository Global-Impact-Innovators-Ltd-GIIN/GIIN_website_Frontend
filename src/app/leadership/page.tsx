"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Globe, Users, BookOpen, Lightbulb, UserCheck, Mic, Award, Building, BookMarked, Code } from "lucide-react";
import { motion } from "framer-motion";

export default function LeadershipEcosystemPage() {
  return (
    <div className="w-full relative overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-32 px-6 overflow-hidden">
        
        {/* Gradients */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none" />
        <div className="absolute top-1/4 -right-64 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 -left-64 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-32"
          >
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-medium mb-6">
              Ecosystem Division 1
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-br from-white to-amber-100">
              Forging Africa's Next Generation of Transformational Leaders
            </h1>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Developing ethical leaders equipped with innovation, technology, and strategic intelligence.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/leadership/academy/student" className="px-8 py-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-medium flex items-center gap-2 transition-all shadow-[0_0_30px_-5px_rgba(217,119,6,0.5)]">
                Enroll in Academy <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/leadership/academy/admin" className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-all">
                Trainer Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. ECOSYSTEM ARCHITECTURE */}
      <section className="py-24 px-6 relative z-10 bg-[#020205]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-outfit">The Leadership Operating System</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">A fully integrated neural network of programs, research, and community designed to rapidly accelerate executive capability.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Building />, title: "Executive Leadership", desc: "Strategic masterclasses for C-suite executives." },
              { icon: <Users />, title: "Youth Leadership", desc: "Empowering the next generation of African visionaries." },
              { icon: <Building />, title: "Corporate Leadership", desc: "Institutional culture and management systems." },
              { icon: <UserCheck />, title: "Mentorship Programs", desc: "Direct guidance from global industry veterans." },
              { icon: <BookMarked />, title: "Leadership Research", desc: "Data-driven insights on organizational behavior." },
              { icon: <Award />, title: "Certifications", desc: "Globally recognized leadership credentials." },
              { icon: <Code />, title: "Virtual Academy", desc: "AI-assisted remote learning environment." },
              { icon: <Mic />, title: "Conferences", desc: "Pan-African summits and thought-leadership." },
              { icon: <Globe />, title: "Global Partnerships", desc: "Collaborations with international institutions." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all backdrop-blur-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
