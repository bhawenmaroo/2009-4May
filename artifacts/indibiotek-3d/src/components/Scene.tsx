import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SporeCloud, BioParticles } from './Particles';
import { DNA } from './DNA';
import { HexGrid } from './HexGrid';
import { SceneErrorBoundary } from './SceneErrorBoundary';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

/* ── Ember sparks flying off the DNA ── */
function EmberSparks({ count = 120 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      vel[i * 3 + 0] = (Math.random() - 0.5) * 0.012;
      vel[i * 3 + 1] = 0.005 + Math.random() * 0.015; // drift upward
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.012;
    }
    return { positions: pos, velocities: vel };
  }, [count]);

  useFrame(() => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      pos.array[i * 3 + 0] += velocities[i * 3 + 0];
      pos.array[i * 3 + 1] += velocities[i * 3 + 1];
      pos.array[i * 3 + 2] += velocities[i * 3 + 2];
      // wrap when too high
      if (pos.array[i * 3 + 1] > 16) pos.array[i * 3 + 1] = -16;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.12} color="#FF9A00" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

/* ── Scroll-driven camera ── */
function SceneController() {
  const { camera, scene } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 14);
    // Warm near-black fog — no blue tint
    scene.fog = new THREE.FogExp2(0x060300, 0.020);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2.5,
        },
      });
      tl.to(camera.position, { z: 26, y: -8, x: -5, ease: 'power1.inOut' }, 0);
      tl.to(camera.position, { z: 18, y: 10, x: 6,  ease: 'power1.inOut' }, 0.5);
      tl.to(camera.position, { z: 22, y: 0,  x: 0,  ease: 'power1.inOut' }, 1);
    });

    return () => ctx.revert();
  }, [camera, scene]);

  return null;
}

export function Scene() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0" data-testid="3d-scene-container">
      <SceneErrorBoundary>
        <Canvas
          dpr={[1, 2]}
          gl={{
            alpha: false,
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
          }}
          style={{ background: '#060300' }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 14]} fov={58} near={0.1} far={250} />
          <SceneController />

          {/* ── Lighting — warm, dramatic ── */}
          <ambientLight intensity={0.05} />

          {/* Main fire spotlight on DNA */}
          <spotLight position={[2, 25, 10]} angle={0.35} penumbra={0.7} intensity={150} color="#FF8800" />
          {/* Orange key from left */}
          <pointLight position={[-10, 5, 6]} intensity={20} color="#FF6A00" distance={60} />
          {/* Amber fill from right */}
          <pointLight position={[14, -4, 4]} intensity={14} color="#FF9A00" distance={55} />
          {/* Deep warm back rim */}
          <pointLight position={[0, -6, -12]} intensity={10} color="#441500" distance={70} />
          {/* Green bioluminescent accent — far background */}
          <pointLight position={[-20, 0, -20]} intensity={12} color="#44FF00" distance={60} />
          <pointLight position={[20, 0, -20]} intensity={8} color="#88FF44" distance={50} />

          {/* ── Hex lab grid — very faint warm tone ── */}
          <HexGrid
            cols={28} rows={20}
            hexRadius={2.4} opacity={0.07}
            color="#FF8800"
            position={[0, -18, -28]}
            rotation={[-0.44, 0, 0]}
          />

          {/* ── DNA — fire/amber, centre stage ── */}
          <DNA position={[1, 0, 0]} rotation={[0.1, 0, 0.05]} speed={0.07} scale={1} />

          {/* ── Ember sparks rising off DNA ── */}
          <EmberSparks count={120} />

          {/* ── Bioluminescent organisms ── */}
          <BioParticles count={280} />

          {/* ── Spore/dust cloud ── */}
          <SporeCloud count={1200} />

          {/* ── Stars in far background ── */}
          <Stars radius={90} depth={50} count={1500} factor={3} saturation={0.3} fade speed={0.2} />

          {/* ── Post-processing ── */}
          <EffectComposer>
            <Bloom intensity={2.5} luminanceThreshold={0.12} luminanceSmoothing={0.9} radius={0.92} />
            <Vignette eskil={false} offset={0.12} darkness={0.85} />
          </EffectComposer>
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
}
