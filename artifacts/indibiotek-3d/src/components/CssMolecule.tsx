import { useEffect, useRef } from "react";

/* CSS-only 3D rotating molecule — works in ANY browser, no WebGL.
   Light-theme palette: deep teal nodes with mint glow, edges in mid-green. */

type Node = { x: number; y: number; z: number };

function fibonacciSphere(n: number, r: number): Node[] {
  const pts: Node[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * i;
    pts.push({
      x: Math.cos(theta) * radius * r,
      y: y * r,
      z: Math.sin(theta) * radius * r,
    });
  }
  return pts;
}

export function CssMolecule({
  size = 420,
  nodeCount = 26,
  className = "",
}: {
  size?: number;
  nodeCount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const radius = size * 0.38;
  const nodes = fibonacciSphere(nodeCount, radius);

  // Build edges: each node connects to ~3 nearest neighbours
  const edges: { from: number; to: number; len: number; midX: number; midY: number; midZ: number; rotZ: number; rotY: number }[] = [];
  for (let i = 0; i < nodes.length; i++) {
    const dists = nodes
      .map((p, j) => ({ j, d: Math.hypot(p.x - nodes[i].x, p.y - nodes[i].y, p.z - nodes[i].z) }))
      .filter((x) => x.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 3);
    for (const { j } of dists) {
      if (j > i) {
        const a = nodes[i], b = nodes[j];
        const dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z;
        const len = Math.hypot(dx, dy, dz);
        edges.push({
          from: i, to: j, len,
          midX: (a.x + b.x) / 2,
          midY: (a.y + b.y) / 2,
          midZ: (a.z + b.z) / 2,
          rotZ: (Math.atan2(dy, dx) * 180) / Math.PI,
          rotY: (Math.atan2(dz, Math.hypot(dx, dy)) * 180) / Math.PI,
        });
      }
    }
  }

  /* Mouse-driven tilt on top of the constant rotation */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let rx = 0, ry = 0, tx = 0, ty = 0;
    let raf = 0;
    const tick = () => {
      rx += (tx - rx) * 0.05;
      ry += (ty - ry) * 0.05;
      el.style.setProperty("--mx", `${ry}deg`);
      el.style.setProperty("--my", `${-rx}deg`);
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      tx = ((e.clientY - cy) / cy) * 18;
      ty = ((e.clientX - cx) / cx) * 18;
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className={className}
      style={{
        width: size, height: size, position: "relative",
        perspective: 1200, perspectiveOrigin: "50% 50%",
        pointerEvents: "none",
      }}
      data-testid="css-molecule"
    >
      <div
        ref={ref}
        style={{
          position: "absolute", inset: 0,
          transformStyle: "preserve-3d",
          transform: "rotateX(var(--my, 0deg)) rotateY(var(--mx, 0deg))",
          animation: "molecule-spin 32s linear infinite",
        }}
      >
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          {/* Edges — mid-green, visible on light bg */}
          {edges.map((e, i) => (
            <div
              key={`e${i}`}
              style={{
                position: "absolute",
                left: "50%", top: "50%",
                width: e.len, height: 1.5,
                background: "linear-gradient(90deg, rgba(11,106,77,0.05), rgba(11,106,77,0.55), rgba(11,106,77,0.05))",
                transformOrigin: "0% 50%",
                transform: `translate3d(${e.midX - e.len / 2 - 0}px, ${e.midY}px, ${e.midZ}px) rotateY(${-e.rotY}deg) rotateZ(${e.rotZ}deg) translateX(${-e.len / 2}px) translateX(${e.len / 2}px)`,
                opacity: 0.7,
              }}
            />
          ))}
          {/* Nodes — saturated mint with deep core, glowing on light bg */}
          {nodes.map((n, i) => (
            <div
              key={`n${i}`}
              style={{
                position: "absolute",
                left: "50%", top: "50%",
                width: 14, height: 14,
                marginLeft: -7, marginTop: -7,
                borderRadius: "50%",
                background: "radial-gradient(circle at 30% 30%, #6FE7B5, #14B57E 50%, #0B6A4D 100%)",
                boxShadow: "0 0 14px rgba(20,181,126,0.55), 0 0 4px rgba(255,255,255,0.7) inset, 0 2px 4px rgba(11,106,77,0.25)",
                transform: `translate3d(${n.x}px, ${n.y}px, ${n.z}px)`,
              }}
            />
          ))}
          {/* Soft core glow */}
          <div
            style={{
              position: "absolute", left: "50%", top: "50%",
              width: 100, height: 100, marginLeft: -50, marginTop: -50,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(20,181,126,0.25), rgba(20,181,126,0) 70%)",
              filter: "blur(8px)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
