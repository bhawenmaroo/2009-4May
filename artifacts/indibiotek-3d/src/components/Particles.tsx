import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Bioluminescent particles — like deep-sea plankton ── */
export function BioParticles({ count = 280 }: { count?: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);

  const { matrices, phases, speeds } = useMemo(() => {
    const matrices: THREE.Matrix4[] = [];
    const phases: number[] = [];
    const speeds: number[] = [];
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      // Scatter in a wide volume around the scene
      dummy.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 40 - 10,
      );
      // Random elongation rotation
      dummy.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      );
      const s = 0.06 + Math.random() * 0.22;
      dummy.scale.set(s * 0.4, s, s * 0.4); // elongated capsule-like
      dummy.updateMatrix();
      matrices.push(dummy.matrix.clone());
      phases.push(Math.random() * Math.PI * 2);
      speeds.push(0.3 + Math.random() * 0.7);
    }
    return { matrices, phases, speeds };
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const ph = phases[i];
      const sp = speeds[i];
      // Gentle drifting motion
      dummy.matrix.copy(matrices[i]);
      dummy.position.setFromMatrixPosition(matrices[i]);
      dummy.position.y += Math.sin(t * sp * 0.4 + ph) * 0.01;
      dummy.position.x += Math.cos(t * sp * 0.3 + ph) * 0.005;
      dummy.rotation.setFromRotationMatrix(matrices[i]);
      dummy.rotation.y += 0.002 * sp;
      const s = (0.06 + (Math.sin(t * sp + ph) * 0.5 + 0.5) * 0.22);
      dummy.scale.set(s * 0.4, s, s * 0.4);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      {/* Elongated sphere = like a marine organism / diatom */}
      <capsuleGeometry args={[0.5, 1.0, 4, 8]} />
      <meshStandardMaterial
        color="#AAFF44"
        emissive="#88FF00"
        emissiveIntensity={3.5}
        roughness={0.0}
        transparent
        opacity={0.85}
      />
    </instancedMesh>
  );
}

/* ── Ambient dust/spore cloud ── */
export function SporeCloud({ count = 1500 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const green = new THREE.Color('#AAFF44');
    const amber = new THREE.Color('#FF9A00');
    const white = new THREE.Color('#FFFFFF');
    const palette = [green, green, amber, white];

    for (let i = 0; i < count; i++) {
      const r = 10 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      pos[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[i % palette.length];
      col[i * 3 + 0] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.006;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.18} vertexColors transparent opacity={0.65} sizeAttenuation />
    </points>
  );
}

/* Legacy export for backward compat */
export function Particles({ count = 1500 }: { count?: number }) {
  return <SporeCloud count={count} />;
}
