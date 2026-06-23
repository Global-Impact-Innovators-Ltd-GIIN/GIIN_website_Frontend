"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Award, BookOpen, Clock, Globe, Network } from "lucide-react";

interface Metric {
  target: number;
  suffix: string;
  label: string;
  desc: string;
  icon: any;
  color: string;
}

const metrics: Metric[] = [
  {
    target: 25,
    suffix: "+",
    label: "Courses Offered",
    desc: "Rigorous digital learning modules across engineering and policy focus fields.",
    icon: BookOpen,
    color: "text-[#2563EB] bg-[#2563EB]/10",
  },
  {
    target: 15000,
    suffix: "+",
    label: "Learners Trained",
    desc: "Pioneers, developers, and civic leaders accessing sovereign GIIN channels.",
    icon: GraduationCap,
    color: "text-[#7C3AED] bg-[#7C3AED]/10",
  },
  {
    target: 3800,
    suffix: "+",
    label: "Certificates Issued",
    desc: "Cryptographically verified digital badges claimed on public ledger systems.",
    icon: Award,
    color: "text-[#4F46E5] bg-[#4F46E5]/10",
  },
  {
    target: 42,
    suffix: "",
    label: "Countries Reached",
    desc: "Widespread student chapter networks expanding continental development.",
    icon: Globe,
    color: "text-[#2563EB] bg-[#2563EB]/10",
  },
  {
    target: 6,
    suffix: " Flagship",
    label: "Academies Delivered",
    desc: "Vetted training centers specialized in code, media, and venture diagnostics.",
    icon: Network,
    color: "text-[#7C3AED] bg-[#7C3AED]/10",
  },
  {
    target: 120000,
    suffix: "+",
    label: "Learning Hours Completed",
    desc: "Total sandbox testing hours and project compile runs logged.",
    icon: Clock,
    color: "text-[#4F46E5] bg-[#4F46E5]/10",
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 1.5; // seconds
    const startTime = performance.now();

    const updateCount = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad formula
      const easeProgress = progress * (2 - progress);
      const current = Math.floor(start + (end - start) * easeProgress);
      
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCount);
  }, [value, isInView]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return num.toLocaleString();
    }
    return num.toString();
  };

  return (
    <span ref={ref} className="font-space-grotesk text-3xl sm:text-4xl md:text-5xl font-black text-white leading-none">
      {formatNumber(count)}
      {suffix}
    </span>
  );
}

export function ImpactMetrics() {
  return (
    <section className="py-24 bg-[#050816] text-white relative px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">
            Continental Influence
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-space-grotesk tracking-tight">
            Ecosystem{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">
              Impact Metrics
            </span>
          </h2>
          <p className="text-[#A1A1AA] text-sm md:text-base font-sans font-light max-w-xl mx-auto leading-relaxed">
            Tangible progress logged in real time. We audit and trace all learning completions to support public accountability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-6 rounded-3xl border border-white/5 bg-[#0A0A12]/90 flex flex-col justify-between items-start gap-6 hover:border-[#2563EB]/25 transition-all duration-300"
              >
                <div className="space-y-4 text-left">
                  <div className={`p-3 rounded-2xl inline-flex text-white ${m.color}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider block font-space-grotesk mb-1">
                      {m.label}
                    </span>
                    <p className="text-xs text-[#A1A1AA] font-sans font-light leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </div>

                <div className="w-full border-t border-white/5 pt-4">
                  <AnimatedCounter value={m.target} suffix={m.suffix} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
