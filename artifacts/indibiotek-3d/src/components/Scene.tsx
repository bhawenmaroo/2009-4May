import { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { MoleculeHero } from "./MoleculeHero";
import { FloatingParticles } from "./Particles";
import { SceneErrorBoundary } from "./SceneErrorBoundary";
import { useCursorParallax } from "./CursorParallax";
import { useFrame } from "@react-three/fiber";

function SceneSetup() {
  const { scene } = useThree();
  useEffect(() => {
    scene.fog = new THREE.FogExp2(0x051a0e, 0.028);
  }, [scene]);
  return null;
}

function CameraRig() {
  const { camera } = useThree();
  const { getOffset } = useCursorParallax();
  useFrame(() => {
    const off = getOffset();
    const tx = off.x * 0.6;
    const ty = -off.y * 0.4;
    camera.position.x += (tx - camera.position.x) * 0.04;
    camera.position.y += (ty - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export function Scene() {
  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      data-testid="3d-scene-container"
    >
      <SceneErrorBoundary>
        <Canvas
          dpr={[1, 1.8]}
          gl={{
            alpha: false,
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.05,
          }}
          style={{ background: "#03130A" }}
        >
          <PerspectiveCamera
            makeDefault
            position={[0, 0, 11]}
            fov={55}
            near={0.1}
            far={120}
          />
          <SceneSetup />
          <CameraRig />

          {/* Calm cinematic lighting */}
          <ambientLight intensity={0.18} />
          <pointLight position={[6, 6, 8]} intensity={28} color="#3EE6A8" distance={50} />
          <pointLight position={[-8, -3, 5]} intensity={20} color="#5AC8FF" distance={50} />
          <pointLight position={[0, 5, -10]} intensity={14} color="#7AFFD4" distance={60} />

          <MoleculeHero radius={3.4} nodes={70} position={[0, 0, 0]} />
          <FloatingParticles count={650} />

          <EffectComposer>
            <Bloom
              intensity={1.15}
              luminanceThreshold={0.18}
              luminanceSmoothing={0.92}
              radius={0.85}
            />
            <Vignette eskil={false} offset={0.15} darkness={0.7} />
          </EffectComposer>
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
}
