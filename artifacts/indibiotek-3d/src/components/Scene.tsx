import { useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, Float, PerspectiveCamera } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Particles } from './Particles';
import { DNA } from './DNA';
import { SceneErrorBoundary } from './SceneErrorBoundary';

gsap.registerPlugin(ScrollTrigger);

function SceneController() {
  const { camera, scene, gl } = useThree();

  useEffect(() => {
    gl.setClearColor(0x000000, 0); // fully transparent — body CSS shows through
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

      tl.to(camera.position, { z: 8, y: -2, ease: "power2.inOut" }, 0);
      tl.to(scene.rotation, { y: Math.PI * 2, x: 0.3, ease: "none" }, 0);
      tl.to(camera.position, { z: 12, x: 4, ease: "power2.inOut" }, 1);
    });

    return () => ctx.revert();
  }, [camera, scene, gl]);

  return (
    <>
      <ambientLight intensity={1.8} />
      <directionalLight position={[10, 10, 10]} intensity={3} color="#53CFCF" />
      <directionalLight position={[-10, -5, 5]} intensity={1.5} color="#40D9D9" />
      <pointLight position={[0, 0, 5]} intensity={4} color="#7EEAEA" />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group position={[0, 0, 0]}>
          <DNA />
        </group>
      </Float>

      <Particles count={1500} />

      <Environment preset="dawn" />
    </>
  );
}

export function Scene() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0" data-testid="3d-scene-container">
      <SceneErrorBoundary>
        <Canvas
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={45} />
          <SceneController />
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
}
