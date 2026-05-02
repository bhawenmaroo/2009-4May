import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Realistic glass test tube ── */
function TestTube({
  position, rotation, scale = 1, liquidColor = '#00FFCC',
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  liquidColor?: string;
}) {
  const ref = useRef<THREE.Group>(null);
  const speed = useMemo(() => 0.08 + Math.random() * 0.12, []);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  const origY = position[1];

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = origY + Math.sin(state.clock.elapsedTime * speed + phase) * 0.5;
      ref.current.rotation.z = rotation[2] + Math.sin(state.clock.elapsedTime * speed * 0.6 + phase) * 0.07;
    }
  });

  return (
    <group ref={ref} position={position} rotation={rotation} scale={scale}>
      {/* glass body — physical material with transmission */}
      <mesh>
        <cylinderGeometry args={[0.22, 0.22, 2.6, 20, 1, true]} />
        <meshPhysicalMaterial
          color="#aaffff"
          transmission={0.92}
          roughness={0.02}
          metalness={0.0}
          ior={1.5}
          thickness={0.3}
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* glass bottom cap */}
      <mesh position={[0, -1.3, 0]}>
        <sphereGeometry args={[0.22, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial
          color="#aaffff"
          transmission={0.9}
          roughness={0.02}
          ior={1.5}
          thickness={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>
      {/* top rim glow ring */}
      <mesh position={[0, 1.3, 0]}>
        <torusGeometry args={[0.22, 0.03, 10, 24]} />
        <meshStandardMaterial color="#53CFCF" emissive="#53CFCF" emissiveIntensity={2.0} />
      </mesh>
      {/* glowing liquid inside */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.17, 0.17, 1.2, 16]} />
        <meshStandardMaterial
          color={liquidColor}
          emissive={liquidColor}
          emissiveIntensity={2.5}
          transparent
          opacity={0.75}
          roughness={0.0}
        />
      </mesh>
      {/* meniscus top of liquid */}
      <mesh position={[0, 0.01, 0]}>
        <sphereGeometry args={[0.17, 16, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 8]} />
        <meshStandardMaterial color={liquidColor} emissive={liquidColor} emissiveIntensity={3.0} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

/* ── Petri dish with glowing culture ── */
function PetriDish({
  position, rotation,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  const ref = useRef<THREE.Group>(null);
  const speed = useMemo(() => 0.04 + Math.random() * 0.06, []);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * speed + phase;
    }
  });

  return (
    <group ref={ref} position={position} rotation={rotation}>
      {/* dish base */}
      <mesh>
        <cylinderGeometry args={[1.6, 1.6, 0.18, 40]} />
        <meshPhysicalMaterial
          color="#aaffff" transmission={0.85} roughness={0.0} ior={1.5} thickness={0.2}
          transparent opacity={0.15} side={THREE.DoubleSide}
        />
      </mesh>
      {/* outer glowing rim */}
      <mesh position={[0, 0.09, 0]}>
        <torusGeometry args={[1.6, 0.04, 10, 60]} />
        <meshStandardMaterial color="#53CFCF" emissive="#53CFCF" emissiveIntensity={1.5} />
      </mesh>
      {/* culture medium — glowing circular fill */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[1.45, 1.45, 0.06, 40]} />
        <meshStandardMaterial color="#00FFCC" emissive="#00FFCC" emissiveIntensity={1.0} transparent opacity={0.35} />
      </mesh>
      {/* culture colonies — small glowing dots */}
      {Array.from({ length: 7 }, (_, i) => {
        const ang = (i / 7) * Math.PI * 2;
        const r = 0.6 + Math.random() * 0.5;
        return (
          <mesh key={i} position={[Math.cos(ang) * r, 0.1, Math.sin(ang) * r]}>
            <cylinderGeometry args={[0.08 + Math.random() * 0.1, 0.08 + Math.random() * 0.1, 0.05, 12]} />
            <meshStandardMaterial color="#53CFCF" emissive="#53CFCF" emissiveIntensity={2.5} />
          </mesh>
        );
      })}
    </group>
  );
}

/* ── Floating molecule ── */
function Molecule({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  const speed = useMemo(() => 0.07 + Math.random() * 0.1, []);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  const origY = position[1];

  const bonds = useMemo(() => {
    const n = 3 + Math.floor(Math.random() * 3);
    return Array.from({ length: n }, () => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 1.4,
        (Math.random() - 0.5) * 1.4,
        (Math.random() - 0.5) * 1.4,
      ).normalize().multiplyScalar(0.7 + Math.random() * 0.4),
      color: ['#53CFCF', '#00FFCC', '#7EE8FA'][Math.floor(Math.random() * 3)],
    }));
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * speed + phase;
      ref.current.rotation.x = state.clock.elapsedTime * speed * 0.8 + phase;
      ref.current.position.y = origY + Math.sin(state.clock.elapsedTime * 0.35 + phase) * 0.6;
    }
  });

  return (
    <group ref={ref} position={position}>
      <mesh>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color="#53CFCF" emissive="#53CFCF" emissiveIntensity={3.0} roughness={0.05} />
      </mesh>
      {bonds.map((b, i) => {
        const mid = b.pos.clone().multiplyScalar(0.5);
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0), b.pos.clone().normalize()
        );
        return (
          <group key={i}>
            <mesh position={b.pos.toArray() as [number, number, number]}>
              <sphereGeometry args={[0.18, 12, 12]} />
              <meshStandardMaterial color={b.color} emissive={b.color} emissiveIntensity={2.5} />
            </mesh>
            <mesh position={mid.toArray() as [number, number, number]} quaternion={quat}>
              <cylinderGeometry args={[0.035, 0.035, b.pos.length(), 6]} />
              <meshStandardMaterial color={b.color} emissive={b.color} emissiveIntensity={1.0} transparent opacity={0.7} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* ── Microscope objective lens (decorative) ── */
function MicroscopeObjective({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });
  return (
    <group ref={ref} position={position}>
      {[2.0, 1.5, 1.1, 0.8, 0.55].map((r, i) => (
        <mesh key={i} position={[0, -i * 0.5, 0]}>
          <cylinderGeometry args={[r * 0.4, r * 0.42, 0.45, 24]} />
          <meshPhysicalMaterial
            color="#1a3a3a" metalness={0.9} roughness={0.1}
            emissive="#53CFCF" emissiveIntensity={0.1}
          />
        </mesh>
      ))}
      {/* lens glass */}
      <mesh position={[0, -2.6, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.15, 20]} />
        <meshPhysicalMaterial color="#aaffff" transmission={0.95} roughness={0.0} ior={1.7} thickness={0.5} />
      </mesh>
      {/* lens glow ring */}
      <mesh position={[0, -2.55, 0]}>
        <torusGeometry args={[0.22, 0.025, 8, 24]} />
        <meshStandardMaterial color="#53CFCF" emissive="#53CFCF" emissiveIntensity={2.5} />
      </mesh>
    </group>
  );
}

export function LabElements() {
  return (
    <group>
      {/* Test tubes */}
      <TestTube position={[-11, 3, -6]} rotation={[0.15, 0.4, 0.25]} scale={1.3} liquidColor="#00FFCC" />
      <TestTube position={[13, -1, -8]} rotation={[-0.1, -0.3, -0.18]} scale={1.0} liquidColor="#53CFCF" />
      <TestTube position={[-15, -3, -14]} rotation={[0.2, 0.7, 0.3]} scale={0.85} liquidColor="#7EE8FA" />
      <TestTube position={[17, 4, -10]} rotation={[-0.15, 1.0, -0.25]} scale={1.1} liquidColor="#00FFCC" />
      <TestTube position={[7, -7, -12]} rotation={[0.1, 0.2, 0.45]} scale={0.75} liquidColor="#53CFCF" />

      {/* Petri dishes */}
      <PetriDish position={[-13, -9, -16]} rotation={[0.85, 0, 0]} />
      <PetriDish position={[15, -7, -18]} rotation={[0.9, 0.3, 0.1]} />
      <PetriDish position={[0, -13, -20]} rotation={[0.75, 0, 0.15]} />
      <PetriDish position={[-8, 9, -14]} rotation={[1.1, 0.4, 0]} />

      {/* Floating molecules */}
      <Molecule position={[-17, 5, -4]} />
      <Molecule position={[19, -2, -7]} />
      <Molecule position={[-9, -9, -5]} />
      <Molecule position={[11, 7, -4]} />
      <Molecule position={[-19, -1, -9]} />
      <Molecule position={[5, 11, -6]} />

      {/* Microscope objectives — suggestions of lab gear */}
      <MicroscopeObjective position={[-22, 12, -18]} />
      <MicroscopeObjective position={[24, 8, -16]} />
    </group>
  );
}
