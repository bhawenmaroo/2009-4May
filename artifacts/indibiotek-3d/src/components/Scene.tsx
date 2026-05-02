import { useEffect, useRef, useMemo } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Stars, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Particles } from './Particles';
import { DNA } from './DNA';
import { HexGrid } from './HexGrid';
import { LabElements } from './LabElements';
import { SceneErrorBoundary } from './SceneErrorBoundary';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

/* ── Slowly drifting microscope dust motes ── */
function DustMotes() {
  const ref = useRef<THREE.Points>(null);
  const count = 500;

  const basePositions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 36;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 36;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 28 - 6;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const base = basePositions[i * 3 + 1];
      pos.array[i * 3 + 1] = base + Math.sin(t * 0.12 + i * 0.3) * 0.5 + ((t * 0.04 * (i % 3 + 1)) % 18) - 9;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[basePositions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#53CFCF" transparent opacity={0.45} sizeAttenuation />
    </points>
  );
}

/* ── Scroll-driven camera + scene fog ── */
function SceneController() {
  const { camera, scene } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 13);
    scene.fog = new THREE.FogExp2(0x010608, 0.022);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2.5,
        },
      });
      tl.to(camera.position, { z: 24, y: -7, x: -6, ease: 'power1.inOut' }, 0);
      tl.to(camera.position, { z: 17, y: 9,  x: 8,  ease: 'power1.inOut' }, 0.5);
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
            toneMappingExposure: 1.4,
          }}
          style={{ background: '#010608' }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 13]} fov={58} near={0.1} far={250} />
          <SceneController />

          {/* Studio environment — realistic reflections on glass test tubes */}
          <Environment preset="studio" />

          {/* ── Lighting ── */}
          <ambientLight intensity={0.08} />

          {/* Microscope-style top beam on DNA */}
          <spotLight
            position={[2, 22, 8]}
            angle={0.4}
            penumbra={0.6}
            intensity={120}
            color="#ffffff"
          />
          {/* Teal key from left */}
          <pointLight position={[-12, 6, 6]} intensity={18} color="#53CFCF" distance={60} />
          {/* Cyan fill from right */}
          <pointLight position={[14, -4, 4]} intensity={12} color="#00FFCC" distance={55} />
          {/* Back rim — deep teal */}
          <pointLight position={[0, -6, -12]} intensity={10} color="#0a4040" distance={70} />
          {/* Cold under light for depth */}
          <pointLight position={[0, -18, 0]} intensity={8} color="#004444" distance={50} />

          {/* ── Hex grid — microscope stage grid lines ── */}
          <HexGrid
            cols={32} rows={22}
            hexRadius={2.6} opacity={0.09}
            color="#53CFCF"
            position={[0, -18, -30]}
            rotation={[-0.42, 0, 0]}
          />
          <HexGrid
            cols={20} rows={16}
            hexRadius={2.0} opacity={0.05}
            color="#00FFCC"
            position={[-35, 0, -22]}
            rotation={[0, 0.55, 0]}
          />

          {/* ── Primary DNA — large, close, filling viewport ── */}
          <DNA
            position={[0.5, 0, 0]}
            rotation={[0.12, 0, 0.06]}
            speed={0.08}
            scale={1}
          />

          {/* ── Secondary DNA — deep background, fading in fog ── */}
          <DNA
            position={[-20, -6, -28]}
            rotation={[0.4, 1.0, 0.2]}
            speed={0.04}
            scale={0.45}
          />

          {/* ── Lab equipment ── */}
          <LabElements />

          {/* ── Ambient particles ── */}
          <Particles count={2000} />

          {/* ── Microscope dust motes ── */}
          <DustMotes />

          {/* ── Distant stars ── */}
          <Stars radius={90} depth={50} count={1800} factor={3} saturation={0.5} fade speed={0.25} />

          {/* ── Post-processing ── */}
          <EffectComposer>
            <Bloom
              intensity={2.2}
              luminanceThreshold={0.15}
              luminanceSmoothing={0.88}
              radius={0.9}
            />
            <Vignette eskil={false} offset={0.15} darkness={0.7} />
          </EffectComposer>
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
}
