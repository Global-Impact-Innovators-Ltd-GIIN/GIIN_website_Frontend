"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Generate particle positions once
const particleCount = 1200;
const particlePositions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
  particlePositions[i * 3] = (Math.random() - 0.5) * 10;
  particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
  particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
}

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

export default function HeroCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ParticleEnvironment isDark={true} />
    </Canvas>
  );
}
