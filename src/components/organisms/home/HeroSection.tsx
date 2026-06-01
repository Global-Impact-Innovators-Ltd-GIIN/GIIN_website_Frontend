"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";

// Generate particle positions once outside the component
const particleCount = 5000;
const particlePositions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
  particlePositions[i * 3] = (Math.random() - 0.5) * 10;
  particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
  particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
}

// AI Particle Environment Component
function ParticleEnvironment() {
  const ref = useRef<THREE.Points>(null);
  const { resolvedTheme } = useTheme();
  const particleColor = resolvedTheme === "dark" ? "#7F4CA5" : "#4B1C71";

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={particlePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={particleColor}
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export function HeroSection() {
  const { user } = useAuth();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background transition-colors duration-500">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" /> {/* Dark tint for visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background z-20" /> {/* Depth gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-30" /> {/* Vignette */}

        <img
          src="/images/hero-bg.png"
          alt="GIIN Innovation Team"
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      {/* 3D Particle Layer (Toned down) */}
      <div className="absolute inset-0 z-40 pointer-events-none opacity-40">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ParticleEnvironment />
        </Canvas>
      </div>

      {/* Overlay Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-50 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <span className="mb-4 inline-block rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-accent backdrop-blur-md">
            The Future of African Innovation
          </span>
        </motion.div>

        <motion.h1
          className="mb-6 font-heading text-5xl font-black tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl bg-clip-text text-transparent bg-gradient-to-br from-white via-white/90 to-primary/40 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          GLOBAL IMPACT <br className="hidden md:block" /> INNOVATORS
        </motion.h1>

        <motion.p
          className="mx-auto max-w-2xl text-lg text-white/80 sm:text-xl md:text-2xl drop-shadow-md font-medium"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          Leading Innovation. Transforming Nations.
          Building the ecosystem for the next generation of pioneers.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col sm:flex-row gap-6 items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        >
          <Link
            href={user ? "/loan" : "/auth/register"}
            className="group relative px-10 py-5 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl overflow-hidden shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all"
          >
            <span className="relative z-10 flex items-center gap-3 text-white">
              {user ? "Access Capital" : "Join the Network"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Link>

          {!user && (
            <Link
              href="/auth/login"
              className="px-10 py-5 border border-white/10 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl backdrop-blur-md transition-all"
            >
              Sign In
            </Link>
          )}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Discover</span>
          <div className="h-16 w-px bg-gradient-to-b from-primary to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
