"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Lightbulb, GraduationCap, TrendingUp, Cpu, Handshake, Sparkles } from "lucide-react";

interface RoadmapItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  sub: string;
  timeline: string;
  details: string[];
}

export function Chapter6TheFuture() {
  const [activeStep, setActiveStep] = useState<string>("network");

  const steps: RoadmapItem[] = [
    {
      id: "network",
      icon: Globe,
      title: "Pan-African Leadership Network",
      sub: "Continental Coalition",
      timeline: "Phase 1: 2026 - 2027",
      details: [
        "Unifying regional leadership chapters into a single digital assembly.",
        "Deploying encrypted communication tools for executive collaboration.",
        "Establishing permanent leadership hubs in Accra, Nairobi, and Kigali."
      ]
    },
    {
      id: "hubs",
      icon: Lightbulb,
      title: "Innovation Hubs",
      sub: "Physical R&D Facilities",
      timeline: "Phase 2: 2027 - 2028",
      details: [
        "Constructing low-latency local server facilities to host GIIN node structures.",
        "Providing sandboxed hardware testing environments for AI and IoT initiatives.",
        "Collaborating with local universities to support direct research internships."
      ]
    },
    {
      id: "programs",
      icon: GraduationCap,
      title: "Tech Transformation Programs",
      sub: "Educational Scale-up",
      timeline: "Phase 3: 2028 - 2029",
      details: [
        "Deploying secondary school micro-grant and systems engineering programs.",
        "Automating developer recruitment through verified technical challenge matrices.",
        "Expanding our curriculum to include zero-knowledge proof architectures."
      ]
    },
    {
      id: "ecosystems",
      icon: TrendingUp,
      title: "Business Growth Ecosystems",
      sub: "Sovereign Marketplaces",
      timeline: "Phase 4: 2029 - 2030",
      details: [
        "Launching fully integrated startup commerce systems for continental trade.",
        "Deploying smart-contract escrow applications to secure B2B software delivery.",
        "Expanding low-interest loan caps for verified ecosystem ventures."
      ]
    },
    {
      id: "research",
      icon: Cpu,
      title: "R&D Initiatives",
      sub: "Sovereign AI & Protocols",
      timeline: "Phase 5: 2030 - 2031",
      details: [
        "Developing translation models for indigenous dialects to expand AI inclusivity.",
        "Publishing yearly continental technological readiness blueprints.",
        "Establishing local semiconductor assembly partnerships."
      ]
    },
    {
      id: "partnerships",
      icon: Handshake,
      title: "Global Strategic Partnerships",
      sub: "Sovereign Treaties",
      timeline: "Ongoing",
      details: [
        "Interconnecting with sovereign networks globally to exchange data standard models.",
        "Partnering with green-energy initiatives to power our node datacenters.",
        "Structuring framework treaties with digital ministries to deploy GIIN products."
      ]
    }
  ];

  return (
    <section id="future" className="py-24 bg-background relative z-10">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-foreground/90 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            Chapter 6: The Future
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter font-heading mb-4">
            A Vision Beyond Today
          </h2>
          <p className="text-muted-foreground text-lg font-light leading-relaxed">
            The strategic blueprint mapping GIIN&apos;s continental deployment and program expansion over the next decade.
          </p>
        </div>

        {/* Roadmap Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Timeline Nodes */}
          <div className="lg:col-span-5 flex flex-col gap-2 relative">
            <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-border/10 -z-10" />

            {steps.map((step) => {
              const isActive = activeStep === step.id;
              const StepIcon = step.icon;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-300 relative z-10 ${
                    isActive
                      ? "bg-card border-primary/45 shadow-xl text-foreground"
                      : "bg-transparent border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                    isActive
                      ? "bg-primary border-primary/20 text-white"
                      : "bg-muted/30 border-border/10 text-muted-foreground"
                  }`}>
                    <StepIcon className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex flex-col min-w-0 font-heading">
                    <span className="text-xs font-bold truncate leading-none mb-1">{step.title}</span>
                    <span className="text-[9px] text-muted-foreground/80 tracking-wider uppercase leading-none">{step.timeline}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Content View */}
          <div className="lg:col-span-7 h-full">
            <AnimatePresence mode="wait">
              {steps.map((step) => {
                if (step.id !== activeStep) return null;
                const StepIcon = step.icon;

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="p-8 md:p-10 rounded-[2rem] border border-border/10 bg-card/30 backdrop-blur-2xl shadow-2xl h-full flex flex-col justify-between"
                  >
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 text-accent flex items-center justify-center">
                          <StepIcon className="w-5 h-5" />
                        </div>
                        <div className="font-heading">
                          <h4 className="text-xs font-bold text-accent uppercase tracking-widest">{step.sub}</h4>
                          <h3 className="text-lg font-bold text-foreground leading-tight">{step.title}</h3>
                        </div>
                      </div>

                      <div className="h-px bg-border/10 w-full" />

                      <ul className="space-y-4 font-sans text-sm font-light text-muted-foreground leading-relaxed">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border/5 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                      <span>TIMELINE METRIC</span>
                      <span className="text-xs font-bold text-foreground bg-muted/40 px-3 py-1.5 rounded-full border border-border/5">
                        {step.timeline}
                      </span>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
