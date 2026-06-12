"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MegaMenuSection, NavLink } from "./NavigationConfig";
import { MegaMenuCard } from "./MegaMenuCard";
import { NavPreviewPanel } from "./NavPreviewPanel";

interface MegaMenuProps {
  sections: MegaMenuSection[];
  onClose: () => void;
}

export function MegaMenu({ sections, onClose }: MegaMenuProps) {
  const [activeItem, setActiveItem] = useState<NavLink | null>(null);

  // Group columns for a layout
  // Column 1: Innovation Platforms (Index 0)
  // Column 2: Leadership Ecosystem (Index 1)
  // Column 3: Technology Division (Index 2)
  // Column 4: Media Division (Index 3) + Community & Impact (Index 4)
  const col1 = sections[0];
  const col2 = sections[1];
  const col3 = sections[2];
  const col4 = [sections[3], sections[4]];

  // Framer Motion staggered grid entrance
  const containerVariants: any = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // Custom easing for premium slide-in
        staggerChildren: 0.04, // 40ms sequential staggered delay
      },
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative mt-4 mx-auto max-w-7xl rounded-2xl border border-border/10 shadow-xl backdrop-blur-[25px] overflow-hidden z-50 bg-card/80"
      onMouseLeave={() => setActiveItem(null)}
    >
      {/* Immersive background aura */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 p-8 gap-8">

        {/* Left 4 Columns of Grid */}
        <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* Column 1: Innovation Platforms */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h3 className="text-xs uppercase font-mono tracking-widest text-primary font-bold border-b border-border/10 pb-2">
              {col1.title}
            </h3>
            <div className="flex flex-col gap-3">
              {col1.items.map((item, idx) => (
                <MegaMenuCard
                  key={idx}
                  item={item}
                  onHover={setActiveItem}
                  onLeave={() => { }}
                  onClick={onClose}
                />
              ))}
            </div>
          </motion.div>

          {/* Column 2: Leadership Ecosystem */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h3 className="text-xs uppercase font-mono tracking-widest text-primary font-bold border-b border-border/10 pb-2">
              {col2.title}
            </h3>
            <div className="flex flex-col gap-3">
              {col2.items.map((item, idx) => (
                <MegaMenuCard
                  key={idx}
                  item={item}
                  onHover={setActiveItem}
                  onLeave={() => { }}
                  onClick={onClose}
                />
              ))}
            </div>
          </motion.div>

          {/* Column 3: Technology Division */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h3 className="text-xs uppercase font-mono tracking-widest text-primary font-bold border-b border-border/10 pb-2">
              {col3.title}
            </h3>
            <div className="flex flex-col gap-3">
              {col3.items.map((item, idx) => (
                <MegaMenuCard
                  key={idx}
                  item={item}
                  onHover={setActiveItem}
                  onLeave={() => { }}
                  onClick={onClose}
                />
              ))}
            </div>
          </motion.div>

          {/* Column 4: Media Division + Community & Impact (Stacked) */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">

            {/* Media Division */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs uppercase font-mono tracking-widest text-primary font-bold border-b border-border/10 pb-2">
                {col4[0].title}
              </h3>
              <div className="flex flex-col gap-3">
                {col4[0].items.map((item, idx) => (
                  <MegaMenuCard
                    key={idx}
                    item={item}
                    onHover={setActiveItem}
                    onLeave={() => { }}
                    onClick={onClose}
                  />
                ))}
              </div>
            </div>

            {/* Community & Impact */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs uppercase font-mono tracking-widest text-primary font-bold border-b border-border/10 pb-2">
                {col4[1].title}
              </h3>
              <div className="flex flex-col gap-3">
                {col4[1].items.map((item, idx) => (
                  <MegaMenuCard
                    key={idx}
                    item={item}
                    onHover={setActiveItem}
                    onLeave={() => { }}
                    onClick={onClose}
                  />
                ))}
              </div>
            </div>

          </motion.div>

        </div>

        {/* Right 5th Column: Preview Panel */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-1 border-t lg:border-t-0 pt-6 lg:pt-0"
        >
          <NavPreviewPanel activeItem={activeItem} />
        </motion.div>

      </div>
    </motion.div>
  );
}
