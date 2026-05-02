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

export function DNA({ scale = 1, position = [0, 0, 0], rotation = [0, 0, 0], speed = 0.1 }: DNAProps) {
  const group = useRef<THREE.Group>(null);

  const numBasePairs = 80;
  const radius = 2.6 * scale;
  const height = 44 * scale;
  const turns = 6;

  const { strand1Curve, strand2Curve, basePairs } = useMemo(() => {
    const s1: THREE.Vector3[] = [];
    const s2: THREE.Vector3[] = [];

    for (let i = 0; i <= 300; i++) {
      const t = i / 300;
      const angle = t * Math.PI * 2 * turns;
      const y = t * height - height / 2;
      s1.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
      s2.push(new THREE.Vector3(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius));
    }

    const pairs: { p1: THREE.Vector3; p2: THREE.Vector3 }[] = [];
    for (let i = 0; i < numBasePairs; i++) {
      const t = i / numBasePairs;
      const angle = t * Math.PI * 2 * turns;
      const y = t * height - height / 2;
      pairs.push({
        p1: new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius),
        p2: new THREE.Vector3(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius),
      });
    }

    return {
      strand1Curve: new THREE.CatmullRomCurve3(s1),
      strand2Curve: new THREE.CatmullRomCurve3(s2),
      basePairs: pairs,
    };
  }, [radius, height]);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = rotation[1] + state.clock.elapsedTime * speed;
    }
  });

  return (
    <group ref={group} position={position} rotation={rotation}>
      {/* Strand 1 — primary teal */}
      <Tube args={[strand1Curve, 500, 0.07, 8, false]}>
        <meshStandardMaterial color="#53CFCF" emissive="#53CFCF" emissiveIntensity={2.5} roughness={0.1} metalness={0.3} />
      </Tube>

      {/* Strand 2 — cyan/green variation */}
      <Tube args={[strand2Curve, 500, 0.07, 8, false]}>
        <meshStandardMaterial color="#00FFCC" emissive="#00FFCC" emissiveIntensity={2.2} roughness={0.1} metalness={0.3} />
      </Tube>

      {/* Base pairs */}
      {basePairs.map((pair, i) => {
        const mid = new THREE.Vector3().addVectors(pair.p1, pair.p2).multiplyScalar(0.5);
        const dir = new THREE.Vector3().subVectors(pair.p2, pair.p1);
        const len = dir.length();
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir.clone().normalize()
        );

        // Alternating fluorescent colors — like real FISH staining
        const colors = ['#53CFCF', '#00FFCC', '#7EE8FA', '#39FFB0'];
        const c = colors[i % colors.length];
        const emInt = 2.0 + (i % 3) * 0.3;

        return (
          <group key={i}>
            <mesh position={pair.p1}>
              <sphereGeometry args={[0.22, 14, 14]} />
              <meshStandardMaterial color={c} emissive={c} emissiveIntensity={emInt} roughness={0.05} metalness={0.2} />
            </mesh>
            <mesh position={pair.p2}>
              <sphereGeometry args={[0.22, 14, 14]} />
              <meshStandardMaterial color={c} emissive={c} emissiveIntensity={emInt} roughness={0.05} metalness={0.2} />
            </mesh>
            {/* rung */}
            <mesh position={mid} quaternion={quat}>
              <cylinderGeometry args={[0.035, 0.035, len, 6]} />
              <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.8} transparent opacity={0.6} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
