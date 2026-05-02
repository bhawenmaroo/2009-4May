import { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { FloatingParticles } from "./Particles";
import { SceneErrorBoundary } from "./SceneErrorBoundary";

function SceneSetup() {
  const { scene } = useThree();
  useEffect(() => {
    scene.fog = new THREE.FogExp2(0x03130a, 0.04);
  }, [scene]);
  return null;
}

/* Subtle ambient 3D layer — particles only, no central object.
   The site's visual identity comes from photography + typography,
   not from this scene. This is just atmospheric depth. */
export function Scene() {
  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1, opacity: 0.5 }}
      data-testid="3d-scene-container"
    >
      <SceneErrorBoundary>
        <Canvas
          dpr={[1, 1.5]}
          gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.0 }}
          style={{ background: "transparent" }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 14]} fov={55} near={0.1} far={120} />
          <SceneSetup />
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 8, 10]} intensity={20} color="#3EE6A8" distance={50} />
          <pointLight position={[-10, -3, 8]} intensity={14} color="#5AC8FF" distance={50} />
          <FloatingParticles count={400} />
          <EffectComposer>
            <Bloom intensity={0.7} luminanceThreshold={0.3} luminanceSmoothing={0.9} radius={0.7} />
          </EffectComposer>
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
}
