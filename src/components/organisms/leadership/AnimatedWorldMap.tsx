"use client";

import React from "react";
import { motion } from "framer-motion";

export function AnimatedWorldMap() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none">
      <motion.svg
        viewBox="0 0 1000 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        {/* Simplified abstract African/World map vectors */}
        <motion.path
          d="M 450 150 Q 500 100, 550 200 T 500 400 Q 400 350, 420 250 Z"
          fill="rgba(79, 70, 229, 0.1)"
          stroke="rgba(79, 70, 229, 0.4)"
          strokeWidth="1"
          animate={{
            fill: ["rgba(79, 70, 229, 0.05)", "rgba(79, 70, 229, 0.15)", "rgba(79, 70, 229, 0.05)"],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        {/* Map Dots */}
        {[...Array(20)].map((_, i) => (
          <motion.circle
            key={i}
            cx={400 + Math.random() * 200}
            cy={150 + Math.random() * 200}
            r="2"
            fill="#818cf8"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity }}
          />
        ))}
      </motion.svg>
    </div>
  );
}
