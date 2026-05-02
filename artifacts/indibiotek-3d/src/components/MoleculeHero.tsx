import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useCursorParallax } from "./CursorParallax";

/* A premium, calm, slowly rotating molecule:
   nodes on a fibonacci sphere connected by short edges.
   Subtle mouse parallax tilt. */
export function MoleculeHero({
  radius = 3.6,
  nodes = 80,
  position = [0, 0, 0],
}: {
  radius?: number;
  nodes?: number;
  position?: [number, number, number];
}) {
  const group = useRef<THREE.Group>(null);
  const { getOffset } = useCursorParallax();

  const { points, edges } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const phi = Math.PI * (Math.sqrt(5) - 1);
    for (let i = 0; i < nodes; i++) {
      const y = 1 - (i / (nodes - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      pts.push(
        new THREE.Vector3(
          Math.cos(theta) * r * radius,
          y * radius,
          Math.sin(theta) * r * radius,
        ),
      );
    }
    // build edges to nearest 2-3 neighbours
    const eds: [THREE.Vector3, THREE.Vector3][] = [];
    pts.forEach((p, i) => {
      const dists = pts
        .map((q, j) => ({ j, d: p.distanceTo(q) }))
        .filter((x) => x.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 3);
      dists.forEach(({ j }) => {
        if (j > i) eds.push([p, pts[j]]);
      });
    });
    return { points: pts, edges: eds };
  }, [nodes, radius]);

  const lineGeom = useMemo(() => {
    const positions = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], idx) => {
      positions.set([a.x, a.y, a.z, b.x, b.y, b.z], idx * 6);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [edges]);

  useFrame((state, dt) => {
    if (!group.current) return;
    const off = getOffset();
    const targetRotY = state.clock.elapsedTime * 0.12 + off.x * 0.35;
    const targetRotX = -off.y * 0.25;
    group.current.rotation.y += (targetRotY - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (targetRotX - group.current.rotation.x) * 0.05;
    // gentle breathing
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.6) * 0.02;
    group.current.scale.setScalar(s);
  });

  return (
    <group ref={group} position={position}>
      {/* Nodes */}
      {points.map((p, i) => {
        const accent = i % 7 === 0;
        return (
          <mesh key={i} position={p}>
            <sphereGeometry args={[accent ? 0.14 : 0.085, 14, 14]} />
            <meshStandardMaterial
              color={accent ? "#7AFFD4" : "#3EE6A8"}
              emissive={accent ? "#5AC8FF" : "#3EE6A8"}
              emissiveIntensity={accent ? 2.2 : 1.4}
              roughness={0.2}
              metalness={0.1}
            />
          </mesh>
        );
      })}

      {/* Edges */}
      <lineSegments geometry={lineGeom}>
        <lineBasicMaterial
          color="#3EE6A8"
          transparent
          opacity={0.32}
          linewidth={1}
        />
      </lineSegments>

      {/* Inner glowing core */}
      <mesh>
        <sphereGeometry args={[radius * 0.55, 32, 32]} />
        <meshStandardMaterial
          color="#0E2A1C"
          emissive="#1E5C40"
          emissiveIntensity={0.6}
          transparent
          opacity={0.35}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}
