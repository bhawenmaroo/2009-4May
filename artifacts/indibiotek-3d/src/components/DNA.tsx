import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Tube } from '@react-three/drei';
import * as THREE from 'three';

export function DNA() {
  const group = useRef<THREE.Group>(null);
  const numBasePairs = 60;
  const radius = 1.8;
  const height = 28;
  const turns = 5;

  const { strand1Points, strand2Points, basePairs } = useMemo(() => {
    const s1: THREE.Vector3[] = [];
    const s2: THREE.Vector3[] = [];
    const pairs: { p1: THREE.Vector3; p2: THREE.Vector3; angle: number }[] = [];

    for (let i = 0; i <= 200; i++) {
      const t = i / 200;
      const angle = t * Math.PI * 2 * turns;
      const y = t * height - height / 2;
      s1.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
      s2.push(new THREE.Vector3(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius));
    }

    for (let i = 0; i < numBasePairs; i++) {
      const t = i / numBasePairs;
      const angle = t * Math.PI * 2 * turns;
      const y = t * height - height / 2;
      pairs.push({
        p1: new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius),
        p2: new THREE.Vector3(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius),
        angle,
      });
    }

    return { strand1Points: s1, strand2Points: s2, basePairs: pairs };
  }, []);

  const strand1Curve = useMemo(() => new THREE.CatmullRomCurve3(strand1Points), [strand1Points]);
  const strand2Curve = useMemo(() => new THREE.CatmullRomCurve3(strand2Points), [strand2Points]);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={group}>
      {/* Strand 1 backbone */}
      <Tube args={[strand1Curve, 400, 0.06, 8, false]}>
        <meshStandardMaterial
          color="#53CFCF"
          emissive="#53CFCF"
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.6}
        />
      </Tube>

      {/* Strand 2 backbone */}
      <Tube args={[strand2Curve, 400, 0.06, 8, false]}>
        <meshStandardMaterial
          color="#40D9A0"
          emissive="#40D9A0"
          emissiveIntensity={1.0}
          roughness={0.1}
          metalness={0.6}
        />
      </Tube>

      {/* Base pairs — nodes + rungs */}
      {basePairs.map((pair, i) => {
        const mid = new THREE.Vector3().addVectors(pair.p1, pair.p2).multiplyScalar(0.5);
        const dir = new THREE.Vector3().subVectors(pair.p2, pair.p1);
        const len = dir.length();
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir.clone().normalize()
        );

        const colors = ['#53CFCF', '#40D9A0', '#7EE8E8', '#30B2B2'];
        const c = colors[i % colors.length];
        const emissiveInt = 0.6 + (i % 3) * 0.2;

        return (
          <group key={i}>
            {/* Node on strand 1 */}
            <mesh position={pair.p1}>
              <sphereGeometry args={[0.18, 12, 12]} />
              <meshStandardMaterial color={c} emissive={c} emissiveIntensity={emissiveInt} roughness={0.15} metalness={0.7} />
            </mesh>

            {/* Node on strand 2 */}
            <mesh position={pair.p2}>
              <sphereGeometry args={[0.18, 12, 12]} />
              <meshStandardMaterial color={c} emissive={c} emissiveIntensity={emissiveInt} roughness={0.15} metalness={0.7} />
            </mesh>

            {/* Rung */}
            <mesh position={mid} quaternion={quat}>
              <cylinderGeometry args={[0.03, 0.03, len, 6]} />
              <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.4} transparent opacity={0.7} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
