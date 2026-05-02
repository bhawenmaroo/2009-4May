import { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, Float, PerspectiveCamera } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Particles } from './Particles';
import { DNA } from './DNA';
import { SceneErrorBoundary } from './SceneErrorBoundary';

gsap.registerPlugin(ScrollTrigger);

function SceneController() {
  const { camera, scene } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 15);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });

      tl.to(camera.position, {
        z: 8,
        y: -2,
        ease: "power2.inOut"
      }, 0);

      tl.to(scene.rotation, {
        y: Math.PI * 2,
        x: 0.3,
        ease: "none"
      }, 0);

      tl.to(camera.position, {
        z: 12,
        x: 4,
        ease: "power2.inOut"
      }, 1);
    });

    return () => ctx.revert();
  }, [camera, scene]);

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 10]} intensity={1} color="#53CFCF" />
      <spotLight position={[-10, -10, -10]} intensity={0.5} color="#308282" />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group position={[0, 0, 0]}>
          <DNA />
        </group>
      </Float>

      <Particles count={1500} />

      <Environment preset="night" />
      <fog attach="fog" args={['#050A15', 10, 40]} />
    </>
  );
}

export function Scene() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0" data-testid="3d-scene-container">
      <SceneErrorBoundary>
        <Canvas
          dpr={[1, 2]}
          onCreated={({ gl }) => {
            gl.setClearColor('#050A15');
          }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={45} />
          <SceneController />
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
}
