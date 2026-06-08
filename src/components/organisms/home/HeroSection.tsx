"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { cn } from "@/lib/utils";

// Generate particle positions once outside the component
const particleCount = 1200;
const particlePositions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
  particlePositions[i * 3] = (Math.random() - 0.5) * 10;
  particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
  particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
}

// AI Particle Environment Component with smooth slow drift animation
function ParticleEnvironment({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const particleColor = isDark ? "#8b5cf6" : "#6366f1";

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.008;
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.01) * 0.01;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 6]}>
      <Points ref={ref} positions={particlePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={particleColor}
          size={0.025}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={isDark ? 0.35 : 0.15}
        />
      </Points>
    </group>
  );
}

// Premium Typing Effect Component (Loops continuously)
function TypingText({ text, isDark }: { text: string; isDark: boolean }) {
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(80);

  useEffect(() => {
    let timer: any;

    const tick = () => {
      if (!isDeleting) {
        // Typing characters
        setCurrentText((prev) => text.slice(0, prev.length + 1));
        setSpeed(80 + Math.random() * 40); // natural variation

        if (currentText === text) {
          setIsDeleting(true);
          setSpeed(3000); // pause long enough for users to read it (3 seconds)
        }
      } else {
        // Deleting characters
        setCurrentText((prev) => prev.slice(0, -1));
        setSpeed(40); // delete faster

        if (currentText === "") {
          setIsDeleting(false);
          setSpeed(600); // pause before typing again
        }
      }
    };

    timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, text, speed]);

  const lines = currentText.split("\n");
  const line1 = lines[0] || "";
  const line2 = lines[1] || "";
  const isSecondLineTyping = currentText.includes("\n") || currentText.length > 6; // "GLOBAL" is 6 characters

  return (
    <span className="relative flex flex-col items-center justify-center text-center">
      {/* Line 1: GLOBAL */}
      <span className="flex items-center justify-center flex-wrap">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary drop-shadow-[0_0_20px_rgba(127,76,165,0.15)] italic">
          {line1}
        </span>
        {!isSecondLineTyping && (
          <span className="ml-1 inline-block w-[3px] h-[0.85em] bg-primary align-middle animate-pulse" />
        )}
      </span>

      {/* Line 2: IMPACT INNOVATORS */}
      {isSecondLineTyping && (
        <span className="flex items-center justify-center flex-wrap mt-2">
          <span className={cn(
            "italic transition-colors duration-500",
            isDark 
              ? "text-white drop-shadow-[0_10px_20px_rgba(255,255,255,0.15)]" 
              : "text-slate-900 drop-shadow-[0_5px_10px_rgba(15,23,42,0.1)]"
          )}>
            {line2}
          </span>
          <span className={cn(
            "ml-1 inline-block w-[3px] h-[0.85em] align-middle animate-pulse",
            isDark ? "bg-white" : "bg-slate-900"
          )} />
        </span>
      )}
    </span>
  );
}

const SCENES = [
  "/images/hero-bg.png",
  "/images/hero-2.png",
  "/images/hero-3.png"
];

export function HeroSection() {
  const { user } = useAuth();
  const [currentScene, setCurrentScene] = useState(0);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % SCENES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full min-w-full overflow-hidden bg-background transition-colors duration-500">
      {/* Floating Blobs Custom Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-blob-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }
        @keyframes float-blob-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, 50px) scale(1.15); }
        }
        .animate-blob-1 {
          animation: float-blob-1 20s ease-in-out infinite;
        }
        .animate-blob-2 {
          animation: float-blob-2 24s ease-in-out infinite;
        }
      ` }} />

      {/* Background Image Layer with Cross-fade & Theme Adaptive Contrast */}
      <div className="absolute inset-0 z-0 w-full h-full">
        {/* Base theme background color */}
        <div className={cn("absolute inset-0 transition-colors duration-500", isDark ? "bg-[#030308]" : "bg-slate-50")} />

        {/* Ambient Floating Color Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60 z-0">
          <div className={cn(
            "absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[130px] animate-blob-1 transition-all duration-700",
            isDark ? "bg-primary/15" : "bg-primary/8"
          )} />
          <div className={cn(
            "absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full blur-[130px] animate-blob-2 transition-all duration-700",
            isDark ? "bg-blue-500/10" : "bg-blue-300/8"
          )} />
        </div>
        
        {/* Soft watermark background office image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={currentScene}
            src={SCENES[currentScene]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: isDark ? 0.38 : 0.08, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/hero-bg.png";
            }}
          />
        </AnimatePresence>

        {/* Dynamic Overlays (reduces grey muddiness in light mode, enhances deep space in dark mode) */}
        <div className={cn("absolute inset-0 z-10 transition-colors duration-500", isDark ? "bg-black/35" : "bg-white/10")} />
        <div className={cn("absolute inset-0 z-20 bg-gradient-to-b via-transparent transition-colors duration-500", isDark ? "from-black/15 to-[#030308]" : "from-white/15 to-slate-50")} />
      </div>

      {/* 3D Particle Layer */}
      <div className="absolute inset-0 z-40 pointer-events-none opacity-40">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ParticleEnvironment isDark={isDark} />
        </Canvas>
      </div>

      {/* Subtle Digital Grid Overlay */}
      <div
        className={cn(
          "absolute inset-0 z-0 pointer-events-none transition-opacity duration-500",
          isDark ? "opacity-[0.12]" : "opacity-[0.05]"
        )}
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(127, 76, 165, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(127, 76, 165, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "5rem 5rem",
          maskImage: "radial-gradient(circle at center, black 40%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 95%)"
        }}
      />

      {/* Overlay Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-50 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary dark:text-secondary backdrop-blur-md shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-secondary animate-ping" />
            The Future of African Innovation
          </span>
        </motion.div>

        <motion.h1
          className="mb-6 font-heading text-5xl font-black tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl leading-[1.1] drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <span className="block min-h-[2.25em] w-full">
            <TypingText text={"GLOBAL\nIMPACT INNOVATORS"} isDark={isDark} />
          </span>
        </motion.h1>

        <motion.p
          className={cn(
            "mx-auto max-w-2xl text-lg sm:text-xl md:text-2xl font-medium transition-colors duration-500",
            isDark ? "text-white/80 drop-shadow-md" : "text-slate-600"
          )}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          Leading Innovation. Transforming Nations.
          <br className="hidden sm:inline" /> Building the ecosystem for the next generation of pioneers.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          <Link
            href={user ? "/loan" : "/auth/register"}
            className="group relative px-8 py-4 bg-primary text-white font-black uppercase tracking-widest text-[10px] rounded-2xl overflow-hidden shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            <span className="relative z-10 flex items-center gap-2">
              {user ? "Access Capital" : "Sign Up"}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Link>

          {!user && (
            <Link
              href="/auth/login"
              className="px-8 py-4 border border-foreground/10 bg-foreground/5 hover:bg-foreground/10 text-foreground dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:text-white font-black uppercase tracking-widest text-[10px] rounded-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95"
            >
              Sign In
            </Link>
          )}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <Link href="#mission" className="flex flex-col items-center gap-2 group cursor-pointer">
          <span className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground group-hover:text-primary dark:group-hover:text-secondary transition-colors duration-300">Discover</span>
          <div className="h-8 w-px bg-gradient-to-b from-primary via-secondary to-transparent group-hover:h-12 transition-all duration-300" />
        </Link>
      </motion.div>
    </section >
  );
}
