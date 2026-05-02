import { useMemo } from 'react';
import * as THREE from 'three';

function hexPoints(r: number): number[] {
  const pts: number[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    pts.push(Math.cos(angle) * r, Math.sin(angle) * r, 0);
  }
  return pts;
}

export function HexGrid({
  cols = 24,
  rows = 18,
  hexRadius = 2.2,
  gap = 0.12,
  color = '#53CFCF',
  opacity = 0.12,
  position = [0, -14, -30] as [number, number, number],
  rotation = [-0.5, 0, 0] as [number, number, number],
}) {
  const lineSegments = useMemo(() => {
    const r = hexRadius - gap;
    const dx = hexRadius * Math.sqrt(3);
    const dy = hexRadius * 1.5;
    const points: number[] = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * dx + (row % 2) * dx * 0.5 - (cols * dx) / 2;
        const y = row * dy - (rows * dy) / 2;

        const pts = hexPoints(r);
        for (let i = 0; i < 6; i++) {
          const next = (i + 1) % 6;
          points.push(pts[i * 3] + x, pts[i * 3 + 1] + y, 0);
          points.push(pts[next * 3] + x, pts[next * 3 + 1] + y, 0);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(points), 3));
    return geo;
  }, [cols, rows, hexRadius, gap]);

  return (
    <group position={position} rotation={rotation}>
      <lineSegments geometry={lineSegments}>
        <lineBasicMaterial color={color} transparent opacity={opacity} />
      </lineSegments>
    </group>
  );
}
