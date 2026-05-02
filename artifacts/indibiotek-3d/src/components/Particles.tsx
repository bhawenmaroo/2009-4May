import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useCursorParallax } from "./CursorParallax";

/* Soft floating spore/pollen cloud — calm green/cyan tones */
export function FloatingParticles({ count = 700 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { getOffset } = useCursorParallax();

  const { positions, colors, sizes, basePos } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const base = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#3EE6A8"),
      new THREE.Color("#7AFFD4"),
      new THREE.Color("#5AC8FF"),
      new THREE.Color("#B8E8C8"),
    ];
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 24;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      const z = r * Math.cos(phi);
      pos.set([x, y, z], i * 3);
      base.set([x, y, z], i * 3);
      const c = palette[i % palette.length];
      col.set([c.r, c.g, c.b], i * 3);
      siz[i] = 0.05 + Math.random() * 0.18;
    }
    return { positions: pos, colors: col, sizes: siz, basePos: base };
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const off = getOffset();
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      arr[i3 + 0] = basePos[i3 + 0] + Math.sin(t * 0.15 + i) * 0.3 + off.x * 0.4;
      arr[i3 + 1] = basePos[i3 + 1] + Math.cos(t * 0.18 + i * 0.5) * 0.3 - off.y * 0.4;
      arr[i3 + 2] = basePos[i3 + 2] + Math.sin(t * 0.12 + i * 0.7) * 0.25;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = t * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.13}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
