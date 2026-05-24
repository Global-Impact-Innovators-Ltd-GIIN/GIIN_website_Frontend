"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";

import * as THREE from "three";

function AnimatedGlobe() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <Sphere ref={sphereRef} args={[1, 64, 64]} scale={2.5}>
      <MeshDistortMaterial
        color="#7F4CA5"
        attach="material"
        distort={0.2}
        speed={1.5}
        roughness={0.1}
        metalness={0.9}
        wireframe={true}
      />
    </Sphere>
  );
}

export function GlobeSection() {
  return (
    <section className="relative h-screen w-full bg-background flex flex-col items-center justify-center overflow-hidden border-t border-border/10 transition-colors duration-500">
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-60">
        <Canvas>
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <AnimatedGlobe />
        </Canvas>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <h2 className="mb-6 font-heading text-4xl font-bold md:text-6xl text-foreground">
          A Global <span className="text-primary font-black">Ecosystem</span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Bridging the gap between groundbreaking innovation and real-world impact across continents.
        </p>
      </div>
    </section>
  );
}
