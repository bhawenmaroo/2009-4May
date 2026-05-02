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

export function DNA({
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  speed = 0.07,
}: DNAProps) {
  const group = useRef<THREE.Group>(null);

  const radius = 2.4 * scale;
  const height = 46 * scale;
  const turns = 6;
  const NUM_PAIRS = 90;

  const { strand1Curve, strand2Curve, pairs } = useMemo(() => {
    const s1: THREE.Vector3[] = [];
    const s2: THREE.Vector3[] = [];
    for (let i = 0; i <= 350; i++) {
      const t = i / 350;
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

  // Fire/ember palette — like molten metal / fluorescent staining
  const fireColors = [
    { color: '#FF6A00', emissive: '#FF4400' }, // deep orange
    { color: '#FF9A00', emissive: '#FF7700' }, // amber
    { color: '#FFD000', emissive: '#FFB000' }, // gold
    { color: '#FF4500', emissive: '#DD2200' }, // red-orange
    { color: '#FFA040', emissive: '#FF8020' }, // warm orange
  ];

  return (
    <group ref={group} position={position} rotation={rotation}>
      {/* Strand 1 — deep orange */}
      <Tube args={[strand1Curve, 500, 0.075, 8, false]}>
        <meshStandardMaterial
          color="#FF6A00" emissive="#FF4400" emissiveIntensity={3.0}
          roughness={0.05} metalness={0.1}
        />
      </Tube>

      {/* Strand 2 — golden amber */}
      <Tube args={[strand2Curve, 500, 0.075, 8, false]}>
        <meshStandardMaterial
          color="#FF9A00" emissive="#FF7700" emissiveIntensity={2.8}
          roughness={0.05} metalness={0.1}
        />
      </Tube>

      {/* Base pairs */}
      {pairs.map((pair, i) => {
        const fc = fireColors[i % fireColors.length];
        const mid = new THREE.Vector3().addVectors(pair.p1, pair.p2).multiplyScalar(0.5);
        const dir = new THREE.Vector3().subVectors(pair.p2, pair.p1);
        const len = dir.length();
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0), dir.normalize()
        );
        return (
          <group key={i}>
            <mesh position={pair.p1}>
              <sphereGeometry args={[0.24, 14, 14]} />
              <meshStandardMaterial color={fc.color} emissive={fc.emissive} emissiveIntensity={2.8} roughness={0.05} />
            </mesh>
            <mesh position={pair.p2}>
              <sphereGeometry args={[0.24, 14, 14]} />
              <meshStandardMaterial color={fc.color} emissive={fc.emissive} emissiveIntensity={2.8} roughness={0.05} />
            </mesh>
            <mesh position={mid} quaternion={quat}>
              <cylinderGeometry args={[0.04, 0.04, len, 6]} />
              <meshStandardMaterial color={fc.color} emissive={fc.emissive} emissiveIntensity={1.0} transparent opacity={0.6} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
