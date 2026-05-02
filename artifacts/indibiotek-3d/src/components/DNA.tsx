import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Tube } from '@react-three/drei';
import * as THREE from 'three';

interface DNAProps {
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  speed?: number;
}

// Real fluorescence microscopy colors:
// Blue = DAPI stain, Green = FITC, Red/Orange = Cy3/TRITC, Yellow = overlap
const FLUORO = {
  blue:   { color: '#4488FF', emissive: '#2266DD' },
  green:  { color: '#39FF88', emissive: '#00CC55' },
  red:    { color: '#FF4466', emissive: '#CC2244' },
  yellow: { color: '#FFD700', emissive: '#CCAA00' },
  cyan:   { color: '#00FFCC', emissive: '#00BBAA' },
};

export function DNA({
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  speed = 0.1,
}: DNAProps) {
  const group = useRef<THREE.Group>(null);

  const radius = 2.5 * scale;
  const height = 44 * scale;
  const turns  = 6;
  const NUM_PAIRS = 80;

  const { strand1Curve, strand2Curve, pairs } = useMemo(() => {
    const s1: THREE.Vector3[] = [];
    const s2: THREE.Vector3[] = [];
    for (let i = 0; i <= 300; i++) {
      const t = i / 300;
      const a = t * Math.PI * 2 * turns;
      const y = t * height - height / 2;
      s1.push(new THREE.Vector3(Math.cos(a) * radius, y, Math.sin(a) * radius));
      s2.push(new THREE.Vector3(Math.cos(a + Math.PI) * radius, y, Math.sin(a + Math.PI) * radius));
    }
    const pairs = Array.from({ length: NUM_PAIRS }, (_, i) => {
      const t = i / NUM_PAIRS;
      const a = t * Math.PI * 2 * turns;
      const y = t * height - height / 2;
      return {
        p1: new THREE.Vector3(Math.cos(a) * radius, y, Math.sin(a) * radius),
        p2: new THREE.Vector3(Math.cos(a + Math.PI) * radius, y, Math.sin(a + Math.PI) * radius),
      };
    });
    return {
      strand1Curve: new THREE.CatmullRomCurve3(s1),
      strand2Curve: new THREE.CatmullRomCurve3(s2),
      pairs,
    };
  }, [radius, height]);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = rotation[1] + state.clock.elapsedTime * speed;
    }
  });

  const fluKeys = Object.keys(FLUORO) as (keyof typeof FLUORO)[];

  return (
    <group ref={group} position={position} rotation={rotation}>
      {/* Strand 1 — electric blue (DAPI) */}
      <Tube args={[strand1Curve, 500, 0.07, 8, false]}>
        <meshStandardMaterial color="#4488FF" emissive="#2266DD" emissiveIntensity={2.8} roughness={0.05} metalness={0.1} />
      </Tube>

      {/* Strand 2 — bright green (FITC) */}
      <Tube args={[strand2Curve, 500, 0.07, 8, false]}>
        <meshStandardMaterial color="#39FF88" emissive="#00CC55" emissiveIntensity={2.5} roughness={0.05} metalness={0.1} />
      </Tube>

      {/* Base pairs — multi-color fluorescent nodes + rungs */}
      {pairs.map((pair, i) => {
        const key = fluKeys[i % fluKeys.length];
        const f = FLUORO[key];
        const mid  = new THREE.Vector3().addVectors(pair.p1, pair.p2).multiplyScalar(0.5);
        const dir  = new THREE.Vector3().subVectors(pair.p2, pair.p1);
        const len  = dir.length();
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0), dir.normalize()
        );
        return (
          <group key={i}>
            <mesh position={pair.p1}>
              <sphereGeometry args={[0.23, 14, 14]} />
              <meshStandardMaterial color={f.color} emissive={f.emissive} emissiveIntensity={2.5} roughness={0.05} />
            </mesh>
            <mesh position={pair.p2}>
              <sphereGeometry args={[0.23, 14, 14]} />
              <meshStandardMaterial color={f.color} emissive={f.emissive} emissiveIntensity={2.5} roughness={0.05} />
            </mesh>
            <mesh position={mid} quaternion={quat}>
              <cylinderGeometry args={[0.035, 0.035, len, 6]} />
              <meshStandardMaterial color={f.color} emissive={f.emissive} emissiveIntensity={0.9} transparent opacity={0.65} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
