"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Rocket, ShieldUser, Landmark, Share2, Globe2 } from "lucide-react";

interface CounterProps {
  value: number;
  suffix?: string;
}

function Counter({ value, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = value;
    const duration = 1500; // 1.5s
    const stepTime = 16; // ~60fps
    const steps = duration / stepTime;
    const increment = end / steps;
    let currentStep = 0;
    let timer: NodeJS.Timeout;

    const run = () => {
      currentStep++;
      start += increment;
      if (currentStep >= steps) {
        setCount(end);
      } else {
        setCount(Math.floor(start));
        timer = setTimeout(run, stepTime);
      }
    };
    run();

    return () => clearTimeout(timer);
  }, [isInView, value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export function ImpactGrowth() {
  const stats = [
    {
      icon: Rocket,
      value: 240,
      suffix: "+",
      label: "Projects Delivered",
      desc: "High-impact deployments in enterprise software, policy research, and advisory services.",
      color: "text-primary",
      glow: "from-primary/10 to-transparent",
    },
    {
      icon: ShieldUser,
      value: 15000,
      suffix: "+",
      label: "Leaders Trained",
      desc: "Graduates of our advanced leadership curriculum directing organizations across sectors.",
      color: "text-blue-400",
      glow: "from-blue-500/10 to-transparent",
    },
    {
      icon: Landmark,
      value: 850,
      suffix: "+",
      label: "Businesses Supported",
      desc: "Startups and SMEs accelerated through capital consulting and technology frameworks.",
      color: "text-emerald-400",
      glow: "from-emerald-500/10 to-transparent",
    },
    {
      icon: Share2,
      value: 60,
      suffix: "+",
      label: "Strategic Partnerships",
      desc: "Active alliances with global institutions, universities, and continental governments.",
      color: "text-accent",
      glow: "from-accent/10 to-transparent",
    },
    {
      icon: Globe2,
      value: 28,
      suffix: "",
      label: "Countries Reached",
      desc: "Pan-African expansion driving digital solutions and policy transformations in active hubs.",
      color: "text-teal-400",
      glow: "from-teal-500/10 to-transparent",
    },
  ];

  return (
    <section className="py-24 px-6 relative bg-[#020205] border-t border-border/10">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            Ecosystem Metrics
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter font-outfit mb-6">
            Our Growing{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-accent italic">
              Continental Footprint
            </span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed font-light">
            We measure our success not just in revenue, but in the structural capacity we construct and the sovereign ecosystems we nurture.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-3xl border border-border/10 bg-card p-6 flex flex-col justify-between hover:bg-muted/40 hover:border-border/30 transition-all duration-300 shadow-xl"
            >
              {/* Inner glow on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none`} />

              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-6 p-3 rounded-2xl bg-card border border-border/10 w-fit">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>

                {/* Counter */}
                <h3 className="text-3xl md:text-4xl font-black text-foreground mb-2 tracking-tight font-outfit">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </h3>

                {/* Label */}
                <h4 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider group-hover:text-primary transition-colors duration-300">
                  {stat.label}
                </h4>

                {/* Description */}
                <p className="text-muted-foreground text-xs leading-relaxed font-light">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
