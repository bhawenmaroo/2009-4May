import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function randomSphere(radius: number) {
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi)
  );
}

export function MolecularNetwork({ nodeCount = 40, spread = 18 }: { nodeCount?: number; spread?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const { nodes, edges } = useMemo(() => {
    const nodes = Array.from({ length: nodeCount }, () => randomSphere(spread / 2));

    const edges: { a: THREE.Vector3; b: THREE.Vector3 }[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 6) {
          edges.push({ a: nodes[i], b: nodes[j] });
        }
      }
    }
    return { nodes, edges };
  }, [nodeCount, spread]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.04;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <mesh key={`n-${i}`} position={pos}>
          <sphereGeometry args={[0.22, 10, 10]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? '#53CFCF' : i % 3 === 1 ? '#40D9A0' : '#7EE8FA'}
            emissive={i % 3 === 0 ? '#53CFCF' : i % 3 === 1 ? '#40D9A0' : '#7EE8FA'}
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.5}
          />
        </mesh>
      ))}

      {edges.map(({ a, b }, i) => {
        const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
        const dir = new THREE.Vector3().subVectors(b, a);
        const len = dir.length();
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir.clone().normalize()
        );
        return (
          <mesh key={`e-${i}`} position={mid} quaternion={quat}>
            <cylinderGeometry args={[0.02, 0.02, len, 4]} />
            <meshStandardMaterial color="#53CFCF" emissive="#53CFCF" emissiveIntensity={0.4} transparent opacity={0.35} />
          </mesh>
        );
      })}
    </group>
  );
}
