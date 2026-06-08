"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, QuadraticBezierLine } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

interface OrbitNodeProps {
  radius: number;
  speed: number;
  color: string;
  offset: number;
  tilt: number;
}

const orbitNodes: OrbitNodeProps[] = [
  { radius: 2.2, speed: 0.15, color: "#a855f7", offset: 0, tilt: 0.5 },      // Purple
  { radius: 2.5, speed: -0.12, color: "#ec4899", offset: 2.0, tilt: -0.3 },   // Pink
  { radius: 2.3, speed: 0.20, color: "#3b82f6", offset: 4.0, tilt: 0.8 },    // Blue
  { radius: 2.7, speed: -0.08, color: "#10b981", offset: 1.5, tilt: 1.2 },    // Emerald
  { radius: 2.1, speed: 0.25, color: "#f59e0b", offset: 3.0, tilt: -0.7 },   // Amber
  { radius: 2.6, speed: -0.18, color: "#06b6d4", offset: 5.0, tilt: 0.2 },    // Cyan
];

const connections = [
  { start: [-1.2, 1.2, 1.2], end: [1.4, 0.4, 1.4], color: "#a855f7" },       // NY to Lagos (Purple)
  { start: [0.8, 1.7, 0.8], end: [1.6, -0.2, 1.5], color: "#3b82f6" },       // London to Nairobi (Blue)
  { start: [1.4, 0.4, 1.4], end: [1.6, -0.2, 1.5], color: "#10b981" },       // Lagos to Nairobi (Green)
  { start: [-1.2, 1.2, 1.2], end: [-1.2, -1.2, 1.2], color: "#f59e0b" },     // NY to Sao Paulo (Amber)
  { start: [1.6, -0.2, 1.5], end: [1.2, -1.5, -1.2], color: "#ec4899" },     // Nairobi to Sydney (Pink)
  { start: [0.8, 0.8, -2.0], end: [1.6, -0.2, 1.5], color: "#06b6d4" }        // Tokyo to Nairobi (Cyan)
];

const getMidPoint = (start: [number, number, number], end: [number, number, number]): [number, number, number] => {
  const midX = (start[0] + end[0]) / 2;
  const midY = (start[1] + end[1]) / 2;
  const midZ = (start[2] + end[2]) / 2;
  const length = Math.sqrt(midX * midX + midY * midY + midZ * midZ);
  const archFactor = 2.4; // Arch height above globe radius 2.0
  return [
    (midX / length) * archFactor,
    (midY / length) * archFactor,
    (midZ / length) * archFactor
  ];
};

function ConnectionNode({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.045, 16, 16]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
}

function TravelingPacket({ start, end, mid, color }: { start: [number, number, number]; end: [number, number, number]; mid: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = (state.clock.getElapsedTime() * 0.35) % 1.0;
      // Quadratic Bezier Formula
      const x = Math.pow(1 - time, 2) * start[0] + 2 * (1 - time) * time * mid[0] + Math.pow(time, 2) * end[0];
      const y = Math.pow(1 - time, 2) * start[1] + 2 * (1 - time) * time * mid[1] + Math.pow(time, 2) * end[1];
      const z = Math.pow(1 - time, 2) * start[2] + 2 * (1 - time) * time * mid[2] + Math.pow(time, 2) * end[2];
      meshRef.current.position.set(x, y, z);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
}

function OrbitingNode({ radius, speed, color, offset, tilt }: OrbitNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() * speed + offset;
      const x = Math.cos(time) * radius;
      const z = Math.sin(time) * radius;
      const y = Math.sin(time) * radius * Math.sin(tilt);
      
      meshRef.current.position.set(x, y, z);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.045, 16, 16]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
}

function AnimatedGlobe() {
  const groupRef = useRef<THREE.Group>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  
  const globeColor = isDark ? "#8b5cf6" : "#4c1d95";
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) - 0.5;
      mouse.current.y = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const baseRotation = state.clock.getElapsedTime() * 0.06;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, baseRotation + mouse.current.x * 0.4, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.current.y * 0.4, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Outer Wireframe Globe (Fully transparent/see-through to show back lines) */}
      <Sphere args={[1, 64, 64]} scale={2.0}>
        <MeshDistortMaterial
          color={globeColor}
          emissive={new THREE.Color(isDark ? "#a78bfa" : "#5b21b6")}
          emissiveIntensity={isDark ? 2.0 : 0.8}
          attach="material"
          distort={isDark ? 0.12 : 0.03}
          speed={1.0}
          roughness={0.2}
          metalness={0.8}
          wireframe={true}
        />
      </Sphere>

      {/* Global Connection Arcs & Packets */}
      {connections.map((conn, idx) => {
        const mid = getMidPoint(conn.start as any, conn.end as any);
        return (
          <React.Fragment key={idx}>
            <QuadraticBezierLine
              start={conn.start as any}
              end={conn.end as any}
              mid={mid}
              color={conn.color}
              lineWidth={1.5}
              transparent
              opacity={isDark ? 0.70 : 0.45}
            />
            <ConnectionNode position={conn.start as any} color={conn.color} />
            <ConnectionNode position={conn.end as any} color={conn.color} />
            <TravelingPacket start={conn.start as any} end={conn.end as any} mid={mid} color={conn.color} />
          </React.Fragment>
        );
      })}
    </group>
  );
}

function RotatingLights({ isDark }: { isDark: boolean }) {
  const light1Ref = useRef<THREE.PointLight>(null);
  const light2Ref = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (light1Ref.current) {
      light1Ref.current.position.set(
        Math.cos(time * 0.4) * 6,
        Math.sin(time * 0.2) * 6,
        Math.sin(time * 0.4) * 6
      );
    }
    if (light2Ref.current) {
      light2Ref.current.position.set(
        Math.sin(time * 0.3) * -6,
        Math.cos(time * 0.5) * 6,
        Math.cos(time * 0.3) * -6
      );
    }
  });

  return (
    <>
      <pointLight ref={light1Ref} color="#06b6d4" intensity={isDark ? 8 : 4} distance={15} />
      <pointLight ref={light2Ref} color="#ec4899" intensity={isDark ? 8 : 4} distance={15} />
    </>
  );
}

function ParticleField({ isDark }: { isDark: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 180;
  
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.012;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isDark ? 0.03 : 0.07}
        color={isDark ? "#a855f7" : "#b084fc"}
        sizeAttenuation={true}
        transparent
        opacity={isDark ? 0.6 : 0.25}
      />
    </points>
  );
}

export function GlobeSection() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section className="relative h-screen w-full bg-background flex flex-col items-center justify-center overflow-hidden border-t border-border/10 transition-colors duration-500">
      {/* Immersive centered backdrop glow aura */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08),transparent_65%)] dark:bg-[radial-gradient(circle_at_center,rgba(127,76,165,0.2),transparent_55%)] z-0" />

      {/* Background 3D Canvas */}
      <div className="absolute inset-0 z-0 opacity-60 dark:opacity-75">
        <Canvas camera={{ position: [0, 0, 5.5], fov: 60 } as any}>
          <ambientLight intensity={isDark ? 0.4 : 1.0} />
          
          <RotatingLights isDark={isDark} />
          <ParticleField isDark={isDark} />
          <AnimatedGlobe />
          
          {/* Orbit rings & traveling nodes */}
          {orbitNodes.map((node, i) => (
            <React.Fragment key={i}>
              <mesh rotation={[node.tilt, 0, 0]}>
                <torusGeometry args={[node.radius, 0.004, 8, 80]} />
                <meshBasicMaterial 
                  color={node.color} 
                  transparent 
                  opacity={isDark ? 0.25 : 0.15} 
                />
              </mesh>
              <OrbitingNode {...node} />
            </React.Fragment>
          ))}
        </Canvas>
      </div>

      {/* Floating Foreground Content */}
      <div className="relative z-10 container mx-auto px-6 text-center select-none pointer-events-none">
        <h2 className="mb-6 font-heading text-4xl font-bold md:text-6xl text-foreground tracking-tight">
          A Global <span className="text-primary font-black">Ecosystem</span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground font-light leading-relaxed">
          Bridging the gap between groundbreaking innovation and real-world impact across continents.
        </p>
      </div>
    </section>
  );
}
