"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users, Award, Cpu, ShieldAlert,
  Shuffle, Sparkles
} from "lucide-react";

interface Commitment {
  title: string;
  metric: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function OrganizationalCommitments() {
  const commitments: Commitment[] = [
    {
      title: "Develop Leaders",
      metric: "10,000+ Leaders Targeted",
      desc: "Providing rigorous training, structured fellowships, and technical cohorts to prepare leaders for governance roles.",
      icon: Award,
    },
    {
      title: "Empower Communities",
      metric: "Open Source Access",
      desc: "Delivering primary frameworks, software documentation, and educational materials to local communities.",
      icon: Users,
    },
    {
      title: "Advance Innovation",
      metric: "Sovereign Tech R&D",
      desc: "Investing in primary research, cryptography frameworks, and high-performance databases tailored to regional constraints.",
      icon: Cpu,
    },
    {
      title: "Promote Ethical Leadership",
      metric: "Radical Governance Index",
      desc: "Advocating for strict security, transparent balance books, and integrity frameworks across our partnerships.",
      icon: ShieldAlert,
    },
    {
      title: "Support Transformation",
      metric: "Direct Infrastructure Grants",
      desc: "Funding and building core layers of healthcare, trading pipelines, and identity databases for partner institutions.",
      icon: Shuffle,
    },
    {
      title: "Create Sustainable Impact",
      metric: "Decade-Scale Audits",
      desc: "Evaluating the outcomes of our solutions over long timelines to guarantee permanent, positive transformations.",
      icon: Sparkles,
    },
  ];

  return (
    <section className="py-24 bg-[#04040a] relative overflow-hidden border-b border-white/5">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 z-10 relative">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
            Institutional Promises
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6 font-outfit">
            Our Commitments
          </h2>
          <p className="text-lg text-slate-400 font-light leading-relaxed">
            These commitments guide our resource allocation, focus our hiring, and bind our collaborative models. They are our promises to the global community.
          </p>
        </div>

        {/* 2-Column Commitment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {commitments.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group p-8 rounded-3xl bg-[#090912] border border-white/5 flex gap-6 hover:border-primary/20 hover:bg-[#0c0c16] transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white font-outfit">
                      {item.title}
                    </h3>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent px-2 py-0.5 rounded-md bg-accent/10 border border-accent/20">
                      {item.metric}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
