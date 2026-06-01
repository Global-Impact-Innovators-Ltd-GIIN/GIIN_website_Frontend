"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedUnderlineProps {
  layoutId?: string;
  className?: string;
}

export function AnimatedUnderline({ 
  layoutId = "activeUnderline", 
  className = "absolute bottom-[-8px] left-0 right-0 h-[2px] bg-primary shadow-[0_0_12px_rgba(127,76,165,0.8)]"
}: AnimatedUnderlineProps) {
  return (
    <motion.span
      layoutId={layoutId}
      className={className}
      transition={{
        type: "spring",
        stiffness: 380,
        damping: 30
      }}
    />
  );
}
