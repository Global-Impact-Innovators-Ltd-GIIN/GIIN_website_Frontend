"use client";

import React from "react";
import { motion } from "framer-motion";

interface ShowcaseItem {
  name: string;
  details: string;
}

interface ShowcaseSectionType {
  title: string;
  subtitle: string;
  type: "client" | "research" | "podcast";
  items: ShowcaseItem[];
}

export function ShowcasesSection() {
  const showcases: ShowcaseSectionType[] = [
    {
      title: "Client Showcase",
      subtitle: "Transforming Enterprises",
      type: "client",
      items: [
        { name: "IBM", details: "Enterprise Cloud Integration" },
        { name: "Tesla", details: "Autonomous Fleet Intelligence" },
        { name: "Stripe", details: "Global Financial Infrastructure" },
        { name: "OpenAI", details: "Cognitive Computing Partnerships" },
      ],
    },
    {
      title: "Research Showcase",
      subtitle: "Data-driven Paradigms",
      type: "research",
      items: [
        { name: "AI in Africa 2026", details: "Socio-Economic Deep Dive Report" },
        { name: "The Future of Fintech", details: "Decentralized Ecosystems Analysis" },
        { name: "Sustainable Tech Ecosystems", details: "Green Computing Benchmarks" },
      ],
    },
    {
      title: "Podcast Showcase",
      subtitle: "Voices of Innovation",
      type: "podcast",
      items: [
        { name: "Episode 42: The Leapfrog", details: "GIIN Podcast • 42 mins" },
        { name: "Episode 43: Next-Gen Leaders", details: "GIIN Podcast • 38 mins" },
        { name: "Episode 44: Scaling Impact", details: "GIIN Podcast • 48 mins" },
      ],
    },
  ];

  // Helper to render Client Logos
  const renderClientLogo = (name: string) => {
    switch (name) {
      case "IBM":
        return (
          <svg className="w-24 h-auto text-[#006699] dark:text-[#0f96ff] transition-transform duration-500 group-hover:scale-110" viewBox="0 0 100 40" fill="currentColor">
            {/* Letter I */}
            <rect x="5" y="4" width="12" height="3" />
            <rect x="5" y="8" width="12" height="3" />
            <rect x="5" y="12" width="12" height="3" />
            <rect x="5" y="16" width="12" height="3" />
            <rect x="5" y="20" width="12" height="3" />
            <rect x="5" y="24" width="12" height="3" />
            <rect x="5" y="28" width="12" height="3" />
            <rect x="5" y="32" width="12" height="3" />
            {/* Letter B */}
            <rect x="25" y="4" width="18" height="3" />
            <rect x="25" y="8" width="5" height="3" /><rect x="38" y="8" width="5" height="3" />
            <rect x="25" y="12" width="5" height="3" /><rect x="38" y="12" width="5" height="3" />
            <rect x="25" y="16" width="18" height="3" />
            <rect x="25" y="20" width="5" height="3" /><rect x="38" y="20" width="5" height="3" />
            <rect x="25" y="24" width="5" height="3" /><rect x="38" y="24" width="5" height="3" />
            <rect x="25" y="28" width="5" height="3" /><rect x="38" y="28" width="5" height="3" />
            <rect x="25" y="32" width="18" height="3" />
            {/* Letter M */}
            <rect x="50" y="4" width="22" height="3" />
            <rect x="50" y="8" width="4" height="3" /><rect x="59" y="8" width="4" height="3" /><rect x="68" y="8" width="4" height="3" />
            <rect x="50" y="12" width="4" height="3" /><rect x="58" y="12" width="6" height="3" /><rect x="68" y="12" width="4" height="3" />
            <rect x="50" y="16" width="4" height="3" /><rect x="57" y="16" width="2" height="3" /><rect x="63" y="16" width="2" height="3" /><rect x="68" y="16" width="4" height="3" />
            <rect x="50" y="20" width="4" height="3" /><rect x="56" y="20" width="2" height="3" /><rect x="64" y="20" width="2" height="3" /><rect x="68" y="20" width="4" height="3" />
            <rect x="50" y="24" width="4" height="3" /><rect x="68" y="24" width="4" height="3" />
            <rect x="50" y="28" width="4" height="3" /><rect x="68" y="28" width="4" height="3" />
            <rect x="50" y="32" width="4" height="3" /><rect x="68" y="32" width="4" height="3" />
          </svg>
        );
      case "Tesla":
        return (
          <svg className="w-16 h-auto text-[#e82127] transition-transform duration-500 group-hover:scale-110" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50,95 C50,95 85,25 85,25 C85,25 65,30 50,32 C35,30 15,25 15,25 C15,25 50,95 50,95 Z M50,15 C50,15 78,12 85,5 C85,5 50,10 50,10 C50,10 15,5 15,5 C22,12 50,15 50,15 Z" />
          </svg>
        );
      case "Stripe":
        return (
          <svg className="w-24 h-auto text-[#635bff] transition-transform duration-500 group-hover:scale-110" viewBox="0 0 100 41" fill="currentColor">
            <path d="M4.6 21.1c0-3.3 2.5-5.3 6.3-5.3 2.1 0 3.7.6 4.7 1.2v-3.7c0-2.3-1.6-3.4-4.2-3.4-2.1 0-4.1.7-5.5 1.5V6.7c1.7-.7 4.1-1.3 6.7-1.3 5.9 0 9.2 2.8 9.2 8.7V25c-1 1-2.9 1.7-5 1.7-4 0-6.3-2.1-6.3-5.6m11-1v-1.7c-.8-.5-2.1-.9-3.5-.9-2.1 0-3.3.9-3.3 2.3 0 1.3 1.1 2.2 3.2 2.2 1.6 0 2.9-.6 3.6-1.9M42.7 14.8v11.5h-5.9V14.8h-3v-5h3V4.3l5.9-1.8v7.3h4.6v5h-4.6M53.1 9.8c0-1.8 1.4-3.2 3.2-3.2s3.2 1.4 3.2 3.2-1.4 3.2-3.2 3.2-3.2-1.4-3.2-3.2M53.1 14.8h6.4v11.5h-6.4V14.8M72.2 14.8c1.3 0 2.5.3 3.3.7v-5.2h6v16.1h-5.9v-1.2c-.8.8-2.3 1.6-4.5 1.6-4.5 0-7.3-3.6-7.3-8.6s2.9-8.6 7.4-8.6m2 11.5c2.4 0 3.9-1.5 3.9-4v-1.5c-.7-1.5-2.2-2.5-3.9-2.5-2.3 0-3.7 1.8-3.7 4s1.4 4 3.7 4M92.2 21.1c.1 3 2.4 4.5 5.5 4.5 2 0 3.8-.4 4.9-.9V24c-1.1.5-2.7.8-4.1.8-1.9 0-3.1-.7-3.3-2.5h12.8v-1c0-5-2.8-8.6-8.2-8.6-5.1 0-8.2 3.7-8.2 8.6m.2-3.4c.4-1.8 1.9-2.8 3.9-2.8 1.8 0 3.3.9 3.5 2.8H92.4z" />
          </svg>
        );
      case "OpenAI":
        return (
          <svg className="w-16 h-auto text-black dark:text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-45" viewBox="0 0 100 100" fill="currentColor">
            <path d="M86.8 56.4c1.1-2.9 1.1-6.1 0-9c-.8-2.2-2.3-4.1-4.2-5.4 0-.1 0-.1-.1-.2.2-.4.4-.7.6-1.1 1.7-2.9 2.1-6.2 1.2-9.4-1-3.3-3.2-6-6.3-7.5-1-.5-2.1-.9-3.2-1.1-.3-.6-.7-1.2-1.1-1.7-2.9-3.3-6.9-5.1-11.2-4.9-3.4.2-6.6 1.6-9.1 3.9v-.2c-.5-.3-1-.5-1.5-.7-2.9-1.2-6.1-1.3-9-.5-2.2.6-4.2 1.9-5.6 3.7 0 .1-.1.1-.1.2-.4-.2-.8-.4-1.2-.5C44 21.1 40.8 21 37.7 22c-3.3 1-6.1 3.1-7.6 6.1-.5.9-.9 1.9-1.1 3-.6.3-1.2.6-1.8 1.1-3.3 2.9-5.1 6.9-5 11.2.1 3.4 1.5 6.6 3.8 9.1h-.2c-.3.5-.5 1-.7 1.5-1.2 2.9-1.3 6.1-.5 9 .6 2.2 1.9 4.2 3.7 5.6 0 .1.1.1.2.1-.2.4-.4.8-.5 1.2-1.2 3.1-1.1 6.3-.1 9.4 1 3.3 3.1 6.1 6.1 7.6.9.5 1.9.9 3 1.1.3.6.6 1.2 1.1 1.8 2.9 3.3 6.9 5.1 11.2 5 3.4-.1 6.6-1.5 9.1-3.8v.2c.5.3 1 .5 1.5.7 2.9 1.2 6.1 1.3 9 .5 2.2-.6 4.2-1.9 5.6-3.7 0-.1.1-.1.1-.2.4.2.8.4 1.2.5 3.1 1.2 6.3 1.3 9.4.3 3.3-1 6.1-3.1 7.6-6.1.5-.9.9-1.9 1.1-3 .6-.3 1.2-.6 1.8-1.1 3.3-2.9 5.1-6.9 5-11.2-.1-3.4-1.5-6.6-3.8-9.1zM50 8c2.9 0 5.6 1.1 7.6 3l.2.2c-.8.5-2.3 1.3-3.6 2.1l-14 8.1c-.8.5-1.3 1.3-1.3 2.2v16.1l-5.6 3.2V19.7c0-.1 0-.2-.1-.2V19c0-6 4.9-11 11-11zm-21.7 8.3c1.5-.9 3.2-1.3 4.9-1.3 1.4 0 2.8.3 4.1.9l.2.1c-.8.5-2.4 1.3-3.7 2l-14 8.1c-.8.5-1.3 1.3-1.3 2.2v16.1l-5.6 3.2V28c0-5 3.4-9.3 8.2-10.4l.2-.1c2-.4 4.1-.1 5.9.8zm-11 32c0-2.9 1.1-5.6 3-7.6l.2-.2c.5.8 1.3 2.3 2.1 3.6l8.1 14c.5.8 1.3 1.3 2.2 1.3H47l-3.2 5.6H28.3c-.1 0-.2 0-.2.1h-.7c-6 0-11-4.9-11-11zm8.3 21.7c-.9-1.5-1.3-3.2-1.3-4.9c0-1.4.3-2.8.9-4.1l.1-.2c.5.8 1.3 2.4 2 3.7l8.1 14c.5.8 1.3 1.3 2.2 1.3H47l-3.2 5.6H31.7c-5 0-9.3-3.4-10.4-8.2l-.1-.2c-.4-2-.1-4.1.8-5.9zm32 11c0 2.9-1.1 5.6-3 7.6l-.2.2c-.5-.8-1.3-2.3-2.1-3.6l-8.1-14c-.5-.8-1.3-1.3-2.2-1.3H47l3.2-5.6h15.5c.1 0 .2 0 .2-.1h.7c6 0 11 4.9 11 11zm21.7-8.3c-1.5.9-3.2 1.3-4.9 1.3c-1.4 0-2.8-.3-4.1-.9l-.2-.1c.8-.5 2.4-1.3 3.7-2l14-8.1c.8-.5 1.3-1.3 1.3-2.2V41.7l5.6-3.2V56c0 5-3.4 9.3-8.2 10.4l-.2.1c-2 .4-4.1.1-5.9-.8zm11-32c0 2.9-1.1 5.6-3 7.6l-.2.2c-.5-.8-1.3-2.3-2.1-3.6l-8.1-14c-.5-.8-1.3-1.3-2.2-1.3H53l3.2-5.6h15.5c.1 0 .2 0 .2-.1h.7c6 0 11 4.9 11 11zm-8.3-21.7c.9 1.5 1.3 3.2 1.3 4.9c0 1.4-.3 2.8-.9 4.1l-.1.2c-.5-.8-1.3-2.4-2-3.7l-8.1-14c-.5-.8-1.3-1.3-2.2-1.3H53l3.2-5.6h15.1c5 0 9.3 3.4 10.4 8.2l.1.2c.4 2 .1 4.1-.8 5.9z" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Helper to render Research graphics
  const renderResearchGraphic = (name: string) => {
    switch (name) {
      case "AI in Africa 2026":
        return (
          <svg className="w-16 h-16 text-primary dark:text-[#a855f7] transition-transform duration-500 group-hover:scale-110" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M35,25 C38,22 45,20 52,22 C60,25 65,30 68,36 C70,40 68,44 65,47 C62,50 64,53 66,56 C68,60 62,68 58,72 C54,76 50,80 48,85 C46,88 44,90 42,90 C40,90 39,85 39,81 C39,78 35,74 33,70 C31,66 30,62 30,58 C30,55 31,52 30,49 C28,45 28,40 30,36 C32,32 32,28 35,25 Z" strokeDasharray="3 3" />
            <circle cx="45" cy="30" r="3.5" className="fill-primary dark:fill-[#a855f7] animate-pulse" />
            <circle cx="55" cy="40" r="3.5" className="fill-accent animate-pulse" />
            <circle cx="48" cy="55" r="3.5" className="fill-secondary animate-pulse" />
            <circle cx="40" cy="70" r="3.5" className="fill-primary dark:fill-[#a855f7] animate-pulse" />
            <line x1="45" y1="30" x2="55" y2="40" stroke="currentColor" strokeWidth="1" className="opacity-50" />
            <line x1="55" y1="40" x2="48" y2="55" stroke="currentColor" strokeWidth="1" className="opacity-50" />
            <line x1="48" y1="55" x2="40" y2="70" stroke="currentColor" strokeWidth="1" className="opacity-50" />
            <line x1="45" y1="30" x2="48" y2="55" stroke="currentColor" strokeWidth="1" className="opacity-50" />
          </svg>
        );
      case "The Future of Fintech":
        return (
          <svg className="w-16 h-16 text-secondary dark:text-accent transition-transform duration-500 group-hover:scale-110" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="10" y1="80" x2="90" y2="80" stroke="currentColor" strokeWidth="1" className="opacity-20" />
            <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1" className="opacity-10" />
            <line x1="10" y1="20" x2="90" y2="20" stroke="currentColor" strokeWidth="1" className="opacity-10" />
            <path d="M15,75 Q35,65 50,45 T85,15" stroke="currentColor" strokeWidth="3" className="stroke-accent dark:stroke-secondary" />
            <circle cx="15" cy="75" r="4" className="fill-background" stroke="currentColor" />
            <circle cx="42.5" cy="55" r="4" className="fill-background" stroke="currentColor" />
            <circle cx="85" cy="15" r="4.5" className="fill-accent dark:fill-secondary" stroke="currentColor" />
            <rect x="25" y="22" width="12" height="12" rx="2" className="opacity-30" />
            <rect x="55" y="22" width="12" height="12" rx="2" className="opacity-30" />
            <line x1="37" y1="28" x2="55" y2="28" stroke="currentColor" strokeDasharray="2 2" />
          </svg>
        );
      case "Sustainable Tech Ecosystems":
        return (
          <svg className="w-16 h-16 text-emerald-500 transition-transform duration-500 group-hover:scale-110" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M50,15 C65,35 65,65 50,85 C35,65 35,35 50,15 Z" stroke="currentColor" strokeWidth="2.5" />
            <line x1="50" y1="15" x2="50" y2="85" stroke="currentColor" />
            <path d="M50,35 Q60,30 63,33" />
            <circle cx="63" cy="33" r="2" fill="currentColor" />
            <path d="M50,45 Q40,40 37,43" />
            <circle cx="37" cy="43" r="2" fill="currentColor" />
            <path d="M50,55 Q60,50 63,53" />
            <circle cx="63" cy="53" r="2" fill="currentColor" />
            <path d="M50,65 Q40,60 37,63" />
            <circle cx="37" cy="63" r="2" fill="currentColor" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className="w-full bg-section-gradient py-20 relative overflow-hidden">
      {/* Soundwave animation styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-wave {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }
        .animate-wave-bar {
          transform-origin: bottom;
          animation: pulse-wave 1.2s ease-in-out infinite;
        }
      ` }} />

      <div className="container mx-auto px-6 space-y-24 relative z-10">
        {showcases.map((showcase, index) => (
          <div key={index} className="flex flex-col space-y-10">
            <motion.div
              className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-border/50 pb-5"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <h3 className="text-xs font-semibold tracking-widest text-primary dark:text-secondary uppercase">{showcase.subtitle}</h3>
                <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl text-foreground">{showcase.title}</h2>
              </div>
              <button className="mt-4 md:mt-0 text-sm font-bold text-foreground hover:text-primary dark:hover:text-secondary transition-colors flex items-center gap-2">
                View All <span aria-hidden="true">&rarr;</span>
              </button>
            </motion.div>

            <div className={`grid grid-cols-1 md:grid-cols-${showcase.items.length === 4 ? '4' : '3'} gap-8`}>
              {showcase.items.map((item, i) => (
                <motion.div
                  key={i}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-card border border-border/10 p-6 flex flex-col justify-between cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                >
                  {/* Subtle hover gradient border overlay */}
                  <div className="absolute inset-0 border border-transparent group-hover:border-primary/20 dark:group-hover:border-secondary/20 rounded-2xl pointer-events-none transition-colors duration-500 z-20" />
                  
                  {/* Card category pill */}
                  <div className="relative z-10 flex justify-between items-center">
                    <span className="text-[10px] uppercase font-mono tracking-widest font-bold px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/10">
                      {showcase.type === "client" ? "Partner Case Study" : showcase.type === "research" ? "Research Brief" : "Audio Playback"}
                    </span>
                  </div>

                  {/* Dynamic Graphic Centerpiece */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 pb-12">
                    {showcase.type === "client" && (
                      <div className="relative w-full h-full flex items-center justify-center">
                        {/* Dotted grid background for client cards */}
                        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.2px,transparent_1.2px)] dark:bg-[radial-gradient(#1e293b_1.2px,transparent_1.2px)] [background-size:16px_16px] opacity-40 rounded-2xl" />
                        <div className="relative z-10 flex items-center justify-center p-8 bg-card/60 backdrop-blur-[2px] rounded-xl">
                          {renderClientLogo(item.name)}
                        </div>
                      </div>
                    )}

                    {showcase.type === "research" && (
                      <div className="relative w-full h-full flex items-center justify-center">
                        {/* Soft ambient glowing background mesh */}
                        <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-2xl group-hover:scale-125 transition-transform duration-700" />
                        <div className="relative z-10">
                          {renderResearchGraphic(item.name)}
                        </div>
                      </div>
                    )}

                    {showcase.type === "podcast" && (
                      <div className="relative w-full h-full flex flex-col justify-between p-6 pt-16">
                        {/* Play button indicator overlay */}
                        <div className="flex justify-center items-center flex-1">
                          <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/40 shadow-sm">
                            <svg className="w-5 h-5 fill-primary text-primary translate-x-0.5" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>

                        {/* Animated waveform container */}
                        <div className="flex items-end justify-center gap-1.5 h-8 w-full opacity-50 group-hover:opacity-85 transition-opacity duration-300">
                          <div className="w-1.5 bg-primary/70 rounded-full animate-wave-bar" style={{ height: "100%", animationDelay: "0.1s" }} />
                          <div className="w-1.5 bg-secondary/70 rounded-full animate-wave-bar" style={{ height: "100%", animationDelay: "0.3s" }} />
                          <div className="w-1.5 bg-accent/70 rounded-full animate-wave-bar" style={{ height: "100%", animationDelay: "0.5s" }} />
                          <div className="w-1.5 bg-primary/70 rounded-full animate-wave-bar" style={{ height: "100%", animationDelay: "0.2s" }} />
                          <div className="w-1.5 bg-secondary/70 rounded-full animate-wave-bar" style={{ height: "100%", animationDelay: "0.4s" }} />
                          <div className="w-1.5 bg-accent/70 rounded-full animate-wave-bar" style={{ height: "100%", animationDelay: "0.6s" }} />
                          <div className="w-1.5 bg-primary/70 rounded-full animate-wave-bar" style={{ height: "100%", animationDelay: "0.15s" }} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Gradient overlay for readability */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/70 to-transparent opacity-90 z-10" />

                  {/* Title and details at bottom */}
                  <div className="mt-auto relative z-10 font-outfit">
                    <h4 className="text-lg font-extrabold text-foreground group-hover:text-primary dark:group-hover:text-secondary transition-colors tracking-tight leading-tight">
                      {item.name}
                    </h4>
                    <p className="text-xs text-muted-foreground font-light mt-1.5 flex items-center gap-1">
                      {item.details}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
