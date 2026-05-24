"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "./NavigationConfig";

interface MegaMenuCardProps {
  item: NavLink;
  onHover: (item: NavLink) => void;
  onLeave: () => void;
}

export function MegaMenuCard({ item, onHover, onLeave }: MegaMenuCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const getIcon = (name?: string) => {
    if (!name) return Icons.HelpCircle;
    const IconComponent = (Icons as any)[name];
    return IconComponent || Icons.HelpCircle;
  };

  const Icon = getIcon(item.iconName);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Spotlight glow tracking coordinates
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    // Subtle 3D tilt card calculation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const currentRotateY = ((x - centerX) / centerX) * 4; // Max 4 degrees tilt
    const currentRotateX = -((y - centerY) / centerY) * 4;
    setRotateX(currentRotateX);
    setRotateY(currentRotateY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    onLeave();
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover(item)}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.04] cursor-pointer"
      )}
      style={{
        transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: rotateX === 0 && rotateY === 0 ? "all 0.5s ease" : "transform 0.1s ease, border-color 0.3s ease, background-color 0.3s ease",
      }}
    >
      {/* Background Spotlight Glow (Powered by CSS Variables) */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
        style={{
          background: `radial-gradient(180px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(59, 130, 246, 0.12), transparent 80%)`
        }}
      />
      
      {/* Border Spotlight Glow */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
        style={{
          background: `radial-gradient(100px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(59, 130, 246, 0.25), transparent 80%)`,
          padding: "1px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude"
        }}
      />

      <Link href={item.href} className="flex gap-4 items-start relative z-10">
        <div className="flex-shrink-0 p-2.5 rounded-lg border border-white/5 bg-slate-900/60 text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/20 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all">
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold font-heading text-slate-200 group-hover:text-white transition-colors truncate">
              {item.label}
            </h4>
            {item.badge && (
              <span className="text-[10px] uppercase font-mono tracking-widest text-purple-400 bg-purple-500/10 px-1.5 py-0.2 rounded border border-purple-500/20">
                {item.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors line-clamp-2 mt-1 leading-normal font-light">
            {item.description}
          </p>
        </div>
      </Link>
    </div>
  );
}
