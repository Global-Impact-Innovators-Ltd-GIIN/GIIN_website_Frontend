"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Sparkles } from "lucide-react";

const Linkedin = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Twitter = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

interface Member {
  name: string;
  title: string;
  roleType: "founder" | "executive" | "strategic";
  bio: string;
  linkedin: string;
  twitter: string;
  email: string;
  gradient: string;
}

export function LeadershipTeam() {
  const [activeTab, setActiveTab] = useState<"all" | "founder" | "executive" | "strategic">("all");

  const members: Member[] = [
    {
      name: "Dr. Evelyn Adebayo",
      title: "Founder & Chairperson",
      roleType: "founder",
      bio: "A visionary technologist and economist with 20+ years of experience directing national digital transformations and policy reform across emerging markets.",
      linkedin: "#",
      twitter: "#",
      email: "e.adebayo@giin.org",
      gradient: "from-primary/40 via-secondary/20 to-transparent",
    },
    {
      name: "Marcus Vance",
      title: "Executive Director, Technology Solutions",
      roleType: "executive",
      bio: "Sovereign systems architect specializing in decentralized ledger nodes, distributed database resilience, and high-performance cloud frameworks.",
      linkedin: "#",
      twitter: "#",
      email: "m.vance@giin.org",
      gradient: "from-blue-500/30 via-primary/10 to-transparent",
    },
    {
      name: "Amara Diop",
      title: "Executive Director, Leadership Institute",
      roleType: "executive",
      bio: "Renowned organizational development strategist focused on implementing cognitive leadership frameworks and high-integrity public sector training.",
      linkedin: "#",
      twitter: "#",
      email: "a.diop@giin.org",
      gradient: "from-accent/30 via-primary/10 to-transparent",
    },
    {
      name: "Dr. Tariq Al-Mansoor",
      title: "Chief of Research & Policy",
      roleType: "strategic",
      bio: "Applied AI researcher and developmental economist analyzing socio-economic datasets to publish national sovereign growth blueprints.",
      linkedin: "#",
      twitter: "#",
      email: "t.almansoor@giin.org",
      gradient: "from-teal-500/30 via-blue-500/10 to-transparent",
    },
    {
      name: "Kofi Boateng",
      title: "Director of Business Strategy",
      roleType: "strategic",
      bio: "Venture architect with extensive expertise in continental trade regulations, private equity structures, and scaling high-impact startup models.",
      linkedin: "#",
      twitter: "#",
      email: "k.boateng@giin.org",
      gradient: "from-purple-500/30 via-accent/10 to-transparent",
    },
  ];

  const filteredMembers = activeTab === "all" ? members : members.filter(m => m.roleType === activeTab);

  return (
    <section className="py-24 px-6 relative bg-[#020205] border-t border-border/10">
      {/* Background radial highlight */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              Governance & Council
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter font-outfit mb-4">
              The Minds Steering{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary italic">
                Our Mission
              </span>
            </h2>
            <p className="text-muted-foreground text-sm font-light leading-relaxed">
              Meet the global strategists, systems engineers, and impact leaders coordinating GIIN's pan-African nodes.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-card border border-border/10 w-fit backdrop-blur-lg">
            {[
              { id: "all", label: "All Council" },
              { id: "founder", label: "Founders" },
              { id: "executive", label: "Executive Directors" },
              { id: "strategic", label: "Strategic Leadership" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Members Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredMembers.map((member) => (
              <motion.div
                key={member.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-3xl border border-border/10 bg-[#07070F] overflow-hidden flex flex-col justify-between h-full hover:border-border/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div>
                  {/* Styled Avatar Placeholder with gradient overlays */}
                  <div className="h-60 w-full bg-[#0E0E18] relative flex items-center justify-center overflow-hidden border-b border-border/5">
                    {/* Animated gradient mesh behind */}
                    <div className={`absolute inset-0 bg-gradient-to-tr ${member.gradient} opacity-60 group-hover:scale-110 transition-transform duration-700`} />
                    
                    {/* Abstract Grid Overlay */}
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]" />

                    {/* Styled Avatar Silhouette */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-24 h-24 rounded-full bg-card border border-border/15 flex items-center justify-center shadow-2xl relative">
                        <Sparkles className="w-8 h-8 text-secondary/35 group-hover:text-primary transition-colors duration-300" />
                        
                        {/* Interactive Status ring */}
                        <div className="absolute inset-0 rounded-full border border-primary/20 animate-spin-slow pointer-events-none" />
                      </div>
                    </div>

                    {/* Profile Type Tag */}
                    <div className="absolute bottom-4 left-4 px-2.5 py-1 rounded-md bg-[#020205]/75 border border-border/10 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                      {member.roleType}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-foreground mb-1 tracking-tight group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <h4 className="text-xs font-bold text-secondary uppercase tracking-widest mb-4">
                      {member.title}
                    </h4>
                    <p className="text-muted-foreground text-xs leading-relaxed font-light">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Footer and Contacts */}
                <div className="px-8 pb-8 pt-4 border-t border-border/5 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-muted-foreground/60 tracking-wider font-mono">
                    {member.email}
                  </span>
                  
                  {/* Social Buttons */}
                  <div className="flex gap-2">
                    <a
                      href={member.linkedin}
                      className="p-2 rounded-lg bg-card border border-border/10 text-muted-foreground hover:text-white hover:border-secondary transition-all"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={member.twitter}
                      className="p-2 rounded-lg bg-card border border-border/10 text-muted-foreground hover:text-white hover:border-secondary transition-all"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
