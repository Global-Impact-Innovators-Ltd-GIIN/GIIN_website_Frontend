"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Cpu, BarChart3, GraduationCap, Play, Atom, HeartCircuit } from "lucide-react";

interface Node {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  coords: { x: number; y: number };
  realization: string;
  synergy: string;
}

export function Chapter3TheAwakening() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("tech");

  const nodes: Node[] = [
    {
      id: "leadership",
      name: "Leadership Development",
      icon: Crown,
      color: "#A855F7",
      coords: { x: 50, y: 15 },
      realization: "Software and capital are useless without high-integrity stewardship. We realized that true transformation must start with preparing ethical leaders who think systematically.",
      synergy: "Establishes structural integrity and leadership standards across Tech deployment and Consulting projects."
    },
    {
      id: "tech",
      name: "Technology Solutions",
      icon: Cpu,
      color: "#3B82F6",
      coords: { x: 80, y: 32 },
      realization: "Africa cannot innovate on borrowed systems. If we do not own the database layer and server nodes, we are vulnerable to external shutdowns. Sovereign tech is non-negotiable.",
      synergy: "Engineers the secure tools, nodes, and platforms utilized by our Education hubs and Capital access portals."
    },
    {
      id: "business",
      name: "Business Consulting",
      icon: BarChart3,
      color: "#10B981",
      coords: { x: 80, y: 68 },
      realization: "Startups and ministries fail when strategy and market constraints are neglected. Innovation must be backed by structural growth paths and regulatory compliance.",
      synergy: "Bridges GIIN Labs' innovations with corporate markets and national policy directors."
    },
    {
      id: "education",
      name: "Education & Training",
      icon: GraduationCap,
      color: "#F59E0B",
      coords: { x: 50, y: 85 },
      realization: "Traditional universities produce theorists. To bridge the divide, we must train practical builders in advanced systems architecture, AI, and cybersecurity on real-world projects.",
      synergy: "Feeds fresh, highly capable developer talent directly into GIIN Labs and external software projects."
    },
    {
      id: "media",
      name: "Multimedia & Content",
      icon: Play,
      color: "#EF4444",
      coords: { x: 20, y: 68 },
      realization: "Sovereignty requires control of the narrative. If we do not tell our own success stories, others will frame them. High-fidelity cinematic storytelling builds cultural trust.",
      synergy: "Amplifies research papers, impact reports, and startup announcements to global investors."
    },
    {
      id: "research",
      name: "Innovation & Research",
      icon: Atom,
      color: "#06B6D4",
      coords: { x: 20, y: 32 },
      realization: "Building for 2030 requires deep R&D today. By investing in indigenous AI and decentralized systems research, we build standard models that leapfrog legacy technologies.",
      synergy: "Outputs technical blueprints that shape the Academy's course curricula and upcoming software structures."
    }
  ];

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  return (
    <section id="awakening" className="py-24 bg-background relative z-10">
      {/* Background radial spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-foreground/90 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            <HeartCircuit className="w-3.5 h-3.5 text-accent animate-pulse" />
            Chapter 3: The Awakening
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter font-heading mb-4">
            The Awakening of <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Ecosystem Thinking</span>
          </h2>
          <p className="text-muted-foreground text-lg font-light leading-relaxed">
            We realized that isolated projects always fall short. Meaningful transformation requires a self-sustaining network where all divisions strengthen one another.
          </p>
        </div>

        {/* Interactive Network Graph and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Node Graph Column */}
          <div className="lg:col-span-7 flex justify-center items-center relative aspect-square max-w-[480px] mx-auto w-full">
            <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 select-none overflow-visible">
              <defs>
                <filter id="mesh-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Connecting Lines: Outer Ring */}
              {nodes.map((node, i) => {
                const nextNode = nodes[(i + 1) % nodes.length];
                const isLineActive = selectedNodeId === node.id || selectedNodeId === nextNode.id;

                return (
                  <motion.line
                    key={`outer-${i}`}
                    x1={node.coords.x}
                    y1={node.coords.y}
                    x2={nextNode.coords.x}
                    y2={nextNode.coords.y}
                    stroke={isLineActive ? "#7F4CA5" : "rgba(127, 76, 165, 0.12)"}
                    strokeWidth={isLineActive ? "0.6" : "0.25"}
                    strokeDasharray={isLineActive ? "2 1" : "none"}
                    animate={isLineActive ? { strokeDashoffset: [0, -10] } : { strokeDashoffset: 0 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  />
                );
              })}

              {/* Connecting Lines: Central node relations */}
              {nodes.map((node, i) => {
                const isLineSelected = selectedNodeId === node.id;

                return (
                  <motion.line
                    key={`core-${i}`}
                    x1="50"
                    y1="50"
                    x2={node.coords.x}
                    y2={node.coords.y}
                    stroke={isLineSelected ? node.color : "rgba(255, 255, 255, 0.08)"}
                    strokeWidth={isLineSelected ? "0.8" : "0.25"}
                    strokeDasharray={isLineSelected ? "1.5 1" : "none"}
                    animate={isLineSelected ? { strokeDashoffset: [0, 8] } : { strokeDashoffset: 0 }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  />
                );
              })}

              {/* Central Core GIIN Hub */}
              <g className="cursor-pointer" onClick={() => setSelectedNodeId("tech")}>
                <circle
                  cx="50"
                  cy="50"
                  r="7"
                  fill="#0A0A12"
                  stroke="#7F4CA5"
                  strokeWidth="0.8"
                  filter="url(#mesh-glow)"
                />
                <text
                  x="50"
                  y="51.2"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="2"
                  fontWeight="bold"
                  className="font-outfit"
                >
                  GIIN
                </text>
              </g>

              {/* Outer nodes */}
              {nodes.map((node) => {
                const isSelected = selectedNodeId === node.id;

                return (
                  <g key={node.id} className="cursor-pointer" onClick={() => setSelectedNodeId(node.id)}>
                    <motion.circle
                      cx={node.coords.x}
                      cy={node.coords.y}
                      r="6"
                      fill="transparent"
                      stroke={isSelected ? node.color : "transparent"}
                      strokeWidth="0.8"
                      animate={isSelected ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                      transition={{ duration: 2.5, repeat: isSelected ? Infinity : 0 }}
                      style={{ transformOrigin: `${node.coords.x}px ${node.coords.y}px` }}
                    />
                    <circle
                      cx={node.coords.x}
                      cy={node.coords.y}
                      r="4.5"
                      fill="#0A0A12"
                      stroke={isSelected ? node.color : "rgba(255, 255, 255, 0.2)"}
                      strokeWidth="0.4"
                    />
                    <text
                      x={node.coords.x}
                      y={node.coords.y + 7.5}
                      textAnchor="middle"
                      fill={isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.55)"}
                      fontSize="1.6"
                      fontWeight={isSelected ? "bold" : "normal"}
                      className="font-sans tracking-wide"
                    >
                      {node.name.split(" ")[0]}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Absolute overlay icons for perfect touch fallback */}
            {nodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const NodeIcon = node.icon;
              return (
                <button
                  key={`btn-node-${node.id}`}
                  onClick={() => setSelectedNodeId(node.id)}
                  className="absolute p-2.5 rounded-full border bg-[#07070F] z-20 transition-all duration-300 pointer-events-auto"
                  style={{
                    top: `${node.coords.y}%`,
                    left: `${node.coords.x}%`,
                    transform: "translate(-50%, -50%)",
                    borderColor: isSelected ? node.color : "rgba(255, 255, 255, 0.1)",
                    color: isSelected ? node.color : "rgba(255, 255, 255, 0.55)",
                    boxShadow: isSelected ? `0 0 15px ${node.color}25` : "none",
                  }}
                  aria-label={node.name}
                >
                  <NodeIcon className="w-4.5 h-4.5" />
                </button>
              );
            })}
          </div>

          {/* Details Column */}
          <div className="lg:col-span-5 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8 rounded-3xl border border-border/10 bg-card/25 backdrop-blur-2xl relative overflow-hidden shadow-2xl"
                style={{
                  borderLeftColor: selectedNode.color,
                  borderLeftWidth: "4px"
                }}
              >
                <div
                  className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-[40px] pointer-events-none opacity-20"
                  style={{ backgroundColor: selectedNode.color }}
                />

                <span className="text-[10px] font-bold text-muted-foreground tracking-[0.25em] uppercase mb-2 block">
                  Ecosystem Awakening Realization
                </span>
                
                <h3 className="text-2xl font-black text-foreground mb-4 font-outfit tracking-tight leading-tight">
                  {selectedNode.name}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed text-sm font-light mb-6">
                  {selectedNode.realization}
                </p>

                <div className="pt-6 border-t border-border/10">
                  <span className="text-[10px] font-bold text-foreground/80 tracking-widest uppercase mb-2 block">
                    DIVISION SYNERGY
                  </span>
                  <p className="text-xs text-muted-foreground/85 leading-relaxed italic font-light">
                    {selectedNode.synergy}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Mobile selection tabs */}
            <div className="flex flex-wrap gap-2 mt-6 lg:hidden justify-center">
              {nodes.map((n) => {
                const isSelected = selectedNodeId === n.id;
                return (
                  <button
                    key={`mob-${n.id}`}
                    onClick={() => setSelectedNodeId(n.id)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300"
                    style={{
                      backgroundColor: isSelected ? `${n.color}15` : "transparent",
                      borderColor: isSelected ? n.color : "rgba(255, 255, 255, 0.1)",
                      color: isSelected ? n.color : "rgba(255, 255, 255, 0.6)"
                    }}
                  >
                    {n.name.split(" ")[0]}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
