import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function DNA() {
  const group = useRef<THREE.Group>(null);
  
  const numBasePairs = 40;
  const radius = 2;
  const height = 20;
  
  const basePairs = useMemo(() => {
    const pairs = [];
    for (let i = 0; i < numBasePairs; i++) {
      const angle = (i / numBasePairs) * Math.PI * 8; // 4 full turns
      const y = (i / numBasePairs) * height - height / 2;
      pairs.push({ angle, y });
    }
    return pairs;
  }, []);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.2;
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={group} scale={[0.5, 0.5, 0.5]}>
      {basePairs.map((pair, i) => {
        const x1 = Math.cos(pair.angle) * radius;
        const z1 = Math.sin(pair.angle) * radius;
        const x2 = Math.cos(pair.angle + Math.PI) * radius;
        const z2 = Math.sin(pair.angle + Math.PI) * radius;

        return (
          <group key={i} position={[0, pair.y, 0]}>
            {/* Strand 1 */}
            <mesh position={[x1, 0, z1]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial color="#53CFCF" emissive="#53CFCF" emissiveIntensity={0.5} roughness={0.2} metalness={0.8} />
            </mesh>
            
            {/* Strand 2 */}
            <mesh position={[x2, 0, z2]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial color="#40A1A1" emissive="#40A1A1" emissiveIntensity={0.2} roughness={0.2} metalness={0.8} />
            </mesh>

            {/* Connection */}
            <mesh rotation={[0, -pair.angle, Math.PI / 2]}>
              <cylinderGeometry args={[0.05, 0.05, radius * 2, 8]} />
              <meshStandardMaterial color="#308282" transparent opacity={0.6} />
            </mesh>
          </group>
        );
      })}
      
      {/* Backbone lines could be added here using Line from drei, but this abstraction works for the visual */}
    </group>
  );
}
