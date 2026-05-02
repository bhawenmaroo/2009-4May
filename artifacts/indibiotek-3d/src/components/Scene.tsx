import { useEffect, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Stars } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Particles } from './Particles';
import { DNA } from './DNA';
import { MolecularNetwork } from './MolecularNetwork';
import { SceneErrorBoundary } from './SceneErrorBoundary';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

function FloatingRing({ radius, tube, rotation, color, speed }: {
  radius: number; tube: number; rotation: [number, number, number]; color: string; speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = rotation[0] + state.clock.elapsedTime * speed;
      ref.current.rotation.z = rotation[2] + state.clock.elapsedTime * speed * 0.7;
    }
  });
  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={[radius, tube, 16, 80]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} roughness={0.1} metalness={0.8} transparent opacity={0.5} />
    </mesh>
  );
}

function SceneController() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 2, 22);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      });

      // As user scrolls: pull back and drift sideways, then orbit around
      tl.to(camera.position, { z: 30, y: -5, x: -6, ease: 'power1.inOut' }, 0);
      tl.to(camera.position, { z: 18, y: 8, x: 8, ease: 'power1.inOut' }, 0.5);
      tl.to(camera.position, { z: 25, y: 0, x: 0, ease: 'power1.inOut' }, 1);
    });

    return () => ctx.revert();
  }, [camera]);

  return null;
}

export function Scene() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0" data-testid="3d-scene-container">
      <SceneErrorBoundary>
        <Canvas
          dpr={[1, 2]}
          gl={{ alpha: false, antialias: true }}
          style={{ background: '#050810' }}
        >
          <PerspectiveCamera makeDefault position={[0, 2, 22]} fov={55} />
          <SceneController />

          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <pointLight position={[0, 10, 5]} intensity={6} color="#53CFCF" distance={60} />
          <pointLight position={[-15, -5, -10]} intensity={4} color="#40D9A0" distance={50} />
          <pointLight position={[15, 5, 10]} intensity={3} color="#7EE8FA" distance={40} />
          <directionalLight position={[0, 20, 10]} intensity={2} color="#AAFFEE" />

          {/* Stars in the deep background */}
          <Stars radius={120} depth={60} count={4000} factor={4} saturation={0.8} fade speed={0.5} />

          {/* Main DNA helix — centre stage */}
          <group position={[0, 0, 0]}>
            <DNA />
          </group>

          {/* Molecular network — orbiting to the right */}
          <group position={[14, 0, -8]}>
            <MolecularNetwork nodeCount={35} spread={14} />
          </group>

          {/* Secondary smaller DNA — far left */}
          <group position={[-14, -4, -12]} scale={[0.45, 0.45, 0.45]} rotation={[0, 1, 0.3]}>
            <DNA />
          </group>

          {/* Floating orbital rings */}
          <FloatingRing radius={6} tube={0.06} rotation={[0.4, 0, 0]} color="#53CFCF" speed={0.08} />
          <FloatingRing radius={9} tube={0.04} rotation={[1.1, 0.3, 0]} color="#40D9A0" speed={0.05} />
          <FloatingRing radius={12} tube={0.03} rotation={[0.2, 0.8, 0.5]} color="#7EE8FA" speed={0.03} />

          {/* Particle cloud */}
          <Particles count={3000} />
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
}
