import React, { useState, useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleSphere() {
  const ref = useRef<THREE.Points>(null);
  
  // Create a sphere of random points
  const points = useMemo(() => {
    const tempPoints = [];
    const count = 600; // Low particle count for premium performance
    const radius = 1.3;
    
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      tempPoints.push(x, y, z);
    }
    return new Float32Array(tempPoints);
  }, []);

  // Animating the particles (slow rotation and wave morphing)
  useFrame((state) => {
    if (!ref.current) return;
    
    // Slow rotational drift
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.03;
    
    // Gentle expansion/contraction pulse
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();
    
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];
      
      const len = Math.sqrt(x*x + y*y + z*z);
      if (len === 0) continue;
      
      const wave = Math.sin(time + len * 1.5) * 0.015;
      positions[i] = (x / len) * (1.3 + wave);
      positions[i + 1] = (y / len) * (1.3 + wave);
      positions[i + 2] = (z / len) * (1.3 + wave);
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[points, 3]}
          />
        </bufferGeometry>
        <PointMaterial
          transparent
          color="#00d2ff"
          size={0.025}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </points>
    </group>
  );
}

export default function Orb3D() {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const support = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      if (!support) setHasError(true);
    } catch (e) {
      setHasError(true);
    }
  }, []);

  if (hasError) {
    return <CSSFallbackOrb />;
  }

  return (
    <div className="w-full h-full relative flex items-center justify-center bg-transparent pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 2.5] }}
      >
        <ambientLight intensity={0.4} />
        <ParticleSphere />
      </Canvas>
      
      {/* Soft overlay gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#050816_95%)] pointer-events-none" />
    </div>
  );
}

function CSSFallbackOrb() {
  return (
    <div className="w-64 h-64 rounded-full relative flex items-center justify-center pointer-events-none">
      <div className="absolute w-56 h-56 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute w-44 h-44 rounded-full border border-primary/20 border-dashed animate-spin duration-15000" />
      <div className="absolute w-36 h-36 rounded-full border border-indigo-500/10 animate-reverse-spin" />
    </div>
  );
}
