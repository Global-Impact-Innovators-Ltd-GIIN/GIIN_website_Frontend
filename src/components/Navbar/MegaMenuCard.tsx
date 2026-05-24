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
        "group relative overflow-hidden rounded-xl border border-border/10 bg-card/50 p-4 transition-all duration-300 hover:border-primary/30 hover:bg-card cursor-pointer shadow-sm"
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
          background: `radial-gradient(180px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(127, 76, 165, 0.08), transparent 80%)`
        }}
      />

      {/* Border Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
        style={{
          background: `radial-gradient(100px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(127, 76, 165, 0.15), transparent 80%)`,
          padding: "1px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude"
        }}
      />

      <Link href={item.href} className="flex gap-4 items-start relative z-10">
        <div className="flex-shrink-0 p-2.5 rounded-lg border border-border/10 bg-background text-muted-foreground group-hover:text-primary group-hover:border-primary/20 group-hover:shadow-[0_0_15px_rgba(127,76,165,0.1)] transition-all">
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold font-heading text-foreground group-hover:text-primary transition-colors truncate">
              {item.label}
            </h4>
            {item.badge && (
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary bg-primary/5 px-1.5 py-0.2 rounded border border-primary/10">
                {item.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2 mt-1 leading-normal font-light">
            {item.description}
          </p>
        </div>
      </Link>
    </div>
  );
}
