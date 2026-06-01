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

// Generate particle positions once outside the component
const particleCount = 1500;
const particlePositions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
  particlePositions[i * 3] = (Math.random() - 0.5) * 10;
  particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
  particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
}

// AI Particle Environment Component with smooth slow drift animation
function ParticleEnvironment() {
  const ref = useRef<THREE.Points>(null);
  const { resolvedTheme } = useTheme();
  const particleColor = resolvedTheme === "dark" ? "#7F4CA5" : "#4B1C71";

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.01;
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.02;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 6]}>
      <Points ref={ref} positions={particlePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={particleColor}
          size={0.028}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={resolvedTheme === "dark" ? 0.4 : 0.25}
        />
      </Points>
    </group>
  );
}

// Premium Typing Effect Component (Loops continuously)
function TypingText({ text }: { text: string }) {
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

  return (
    <span className="relative inline-flex items-center">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary drop-shadow-[0_0_20px_rgba(127,76,165,0.15)] italic">
        {currentText}
      </span>
      <span className="ml-1 inline-block w-[3px] h-[0.85em] bg-primary align-middle animate-pulse" />
    </span>
  );
}

const SCENES = [
  "/images/hero-bg.png",
  "/images/hero-2.png", // Assuming user will add this or I'll use a placeholder
  "/images/hero-3.png"
];

export function HeroSection() {
  const { user } = useAuth();
  const [currentScene, setCurrentScene] = useState(0);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % SCENES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full min-w-full overflow-hidden bg-background transition-colors duration-500">
      {/* Background Image Layer with Cross-fade */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background z-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-30" />

        <AnimatePresence mode="wait">
          <motion.img
            key={currentScene}
            src={SCENES[currentScene]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.8, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              // Fallback if images don't exist
              (e.target as HTMLImageElement).src = "/images/hero-bg.png";
            }}
          />
        </AnimatePresence>
      </div>

      {/* 3D Particle Layer (Toned down) */}
      <div className="absolute inset-0 z-40 pointer-events-none opacity-40">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ParticleEnvironment />
        </Canvas>
      </div>

      {/* Subtle Digital Grid Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.06] dark:opacity-[0.12] pointer-events-none"
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

      {/* Radial Ambient Glows - Deep purple focused */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Primary Purple Core Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] rounded-full bg-[radial-gradient(circle,var(--primary-glow)_0%,transparent_70%)] opacity-90" />
        
        {/* Secondary Amethyst Soft Glow */}
        <div className="absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(127,76,165,0.08)_0%,transparent_80%)] opacity-60 blur-3xl animate-pulse [animation-duration:12s]" />
      </div>

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
          className="mb-6 font-heading text-5xl font-black tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl bg-clip-text text-transparent bg-gradient-to-br from-white via-white/90 to-primary/40 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          GLOBAL <br className="md:hidden" />
          <span className="block mt-1 min-h-[1.1em] md:inline md:mt-0 md:ml-3">
            <TypingText text="IMPACT INNOVATORS" />
          </span>
        </motion.h1>

        <motion.p
          className="mx-auto max-w-2xl text-lg text-white/80 sm:text-xl md:text-2xl drop-shadow-md font-medium"
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
              {user ? "Access Capital" : "Join the Network"}
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
    </section>
  );
}
