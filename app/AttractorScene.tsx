"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings2, X, Plus, Minus, RotateCw, Sparkles } from "lucide-react";

// --- TYPES ---
type Vec3 = { x: number; y: number; z: number };

interface ParamDef {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  default: number;
}

interface AttractorDef {
  id: string;
  name: string;
  blurb: string;
  params: ParamDef[];
  dt: { min: number; max: number; step: number; default: number };
  substeps: number;
  center: [number, number, number];
  fit: number; // characteristic extent (max axis span) — used to auto-size to the viewport
  spread: [number, number, number];
  burnIn: number;
  equation: string[];
  deriv: (p: Vec3, c: Record<string, number>) => Vec3;
}

// --- ATTRACTOR LIBRARY ---
const ATTRACTORS: AttractorDef[] = [
  {
    id: "lorenz",
    name: "Lorenz Attractor",
    blurb: "The original butterfly — atmospheric convection.",
    params: [
      { key: "sigma", label: "σ", min: 0, max: 20, step: 0.1, default: 10 },
      { key: "rho", label: "ρ", min: 0, max: 60, step: 0.1, default: 28 },
      { key: "beta", label: "β", min: 0, max: 10, step: 0.01, default: 2.667 },
    ],
    dt: { min: 0.001, max: 0.012, step: 0.0005, default: 0.006 },
    substeps: 1,
    center: [0, 0, 25],
    fit: 48,
    spread: [44, 52, 42],
    burnIn: 150,
    equation: ["ẋ = σ (y − x)", "ẏ = x (ρ − z) − y", "ż = x y − β z"],
    deriv: (p, c) => ({
      x: c.sigma * (p.y - p.x),
      y: p.x * (c.rho - p.z) - p.y,
      z: p.x * p.y - c.beta * p.z,
    }),
  },
  {
    id: "aizawa",
    name: "Aizawa Attractor",
    blurb: "A sphere pierced by a spiralling tube.",
    params: [
      { key: "a", label: "a", min: 0, max: 2, step: 0.01, default: 0.95 },
      { key: "b", label: "b", min: 0, max: 2, step: 0.01, default: 0.7 },
      { key: "c", label: "c", min: 0, max: 2, step: 0.01, default: 0.6 },
      { key: "d", label: "d", min: 0, max: 5, step: 0.01, default: 3.5 },
      { key: "e", label: "e", min: 0, max: 1, step: 0.01, default: 0.25 },
      { key: "f", label: "f", min: 0, max: 1, step: 0.01, default: 0.1 },
    ],
    dt: { min: 0.002, max: 0.02, step: 0.001, default: 0.01 },
    substeps: 1,
    center: [0, 0, 0.1],
    fit: 3.0,
    spread: [2.6, 2.6, 3.2],
    burnIn: 220,
    equation: [
      "ẋ = (z − b) x − d y",
      "ẏ = d x + (z − b) y",
      "ż = c + a z − z³⁄3 − (x²+y²)(1 + e z) + f z x³",
    ],
    deriv: (p, c) => ({
      x: (p.z - c.b) * p.x - c.d * p.y,
      y: c.d * p.x + (p.z - c.b) * p.y,
      z:
        c.c +
        c.a * p.z -
        (p.z * p.z * p.z) / 3 -
        (p.x * p.x + p.y * p.y) * (1 + c.e * p.z) +
        c.f * p.z * p.x * p.x * p.x,
    }),
  },
  {
    id: "halvorsen",
    name: "Halvorsen Attractor",
    blurb: "A symmetric three-lobed cyclone.",
    params: [{ key: "a", label: "a", min: 1, max: 2.2, step: 0.01, default: 1.89 }],
    dt: { min: 0.001, max: 0.008, step: 0.0005, default: 0.004 },
    substeps: 1,
    center: [-1.9, -1.9, -1.9],
    fit: 18.5,
    spread: [16, 16, 16],
    burnIn: 170,
    equation: [
      "ẋ = −a x − 4y − 4z − y²",
      "ẏ = −a y − 4z − 4x − z²",
      "ż = −a z − 4x − 4y − x²",
    ],
    deriv: (p, c) => ({
      x: -c.a * p.x - 4 * p.y - 4 * p.z - p.y * p.y,
      y: -c.a * p.y - 4 * p.z - 4 * p.x - p.z * p.z,
      z: -c.a * p.z - 4 * p.x - 4 * p.y - p.x * p.x,
    }),
  },
  {
    id: "thomas",
    name: "Thomas Attractor",
    blurb: "A cyclically-symmetric labyrinth.",
    params: [{ key: "b", label: "b", min: 0.1, max: 0.32, step: 0.001, default: 0.208 }],
    dt: { min: 0.005, max: 0.04, step: 0.001, default: 0.02 },
    substeps: 1,
    center: [0, 0, 0],
    fit: 7.6,
    spread: [11, 11, 11],
    burnIn: 220,
    equation: ["ẋ = sin y − b x", "ẏ = sin z − b y", "ż = sin x − b z"],
    deriv: (p, c) => ({
      x: Math.sin(p.y) - c.b * p.x,
      y: Math.sin(p.z) - c.b * p.y,
      z: Math.sin(p.x) - c.b * p.z,
    }),
  },
  {
    id: "dadras",
    name: "Dadras Attractor",
    blurb: "A wild four-winged ribbon.",
    params: [
      { key: "a", label: "a", min: 0, max: 6, step: 0.05, default: 3 },
      { key: "b", label: "b", min: 0, max: 6, step: 0.05, default: 2.7 },
      { key: "c", label: "c", min: 0, max: 4, step: 0.05, default: 1.7 },
      { key: "d", label: "d", min: 0, max: 4, step: 0.05, default: 2 },
      { key: "e", label: "e", min: 0, max: 12, step: 0.05, default: 9 },
    ],
    dt: { min: 0.001, max: 0.008, step: 0.0005, default: 0.004 },
    substeps: 1,
    center: [0, 0, 0],
    fit: 26,
    spread: [18, 22, 30],
    burnIn: 220,
    equation: ["ẋ = y − a x + b y z", "ẏ = c y − x z + z", "ż = d x y − e z"],
    deriv: (p, c) => ({
      x: p.y - c.a * p.x + c.b * p.y * p.z,
      y: c.c * p.y - p.x * p.z + p.z,
      z: c.d * p.x * p.y - c.e * p.z,
    }),
  },
];

function defaultsFor(id: string): Record<string, number> {
  const d = ATTRACTORS.find((a) => a.id === id)!;
  const out: Record<string, number> = {};
  d.params.forEach((p) => (out[p.key] = p.default));
  return out;
}

// RK4 integrator
function rk4(p: Vec3, c: Record<string, number>, dt: number, f: AttractorDef["deriv"]): Vec3 {
  const k1 = f(p, c);
  const p2 = { x: p.x + (k1.x * dt) / 2, y: p.y + (k1.y * dt) / 2, z: p.z + (k1.z * dt) / 2 };
  const k2 = f(p2, c);
  const p3 = { x: p.x + (k2.x * dt) / 2, y: p.y + (k2.y * dt) / 2, z: p.z + (k2.z * dt) / 2 };
  const k3 = f(p3, c);
  const p4 = { x: p.x + k3.x * dt, y: p.y + k3.y * dt, z: p.z + k3.z * dt };
  const k4 = f(p4, c);
  return {
    x: p.x + (dt / 6) * (k1.x + 2 * k2.x + 2 * k3.x + k4.x),
    y: p.y + (dt / 6) * (k1.y + 2 * k2.y + 2 * k3.y + k4.y),
    z: p.z + (dt / 6) * (k1.z + 2 * k2.z + 2 * k3.z + k4.z),
  };
}

// Depth-coloured palette (cyan -> violet) baked with alpha for additive blending
const PAL = 32;
const palette: string[] = (() => {
  const near = [56, 224, 248]; // cyan
  const far = [140, 110, 255]; // violet
  const out: string[] = [];
  for (let i = 0; i < PAL; i++) {
    const t = i / (PAL - 1);
    const r = Math.round(near[0] + (far[0] - near[0]) * t);
    const g = Math.round(near[1] + (far[1] - near[1]) * t);
    const b = Math.round(near[2] + (far[2] - near[2]) * t);
    out.push(`rgba(${r},${g},${b},0.55)`);
  }
  return out;
})();

export default function AttractorScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // UI state
  const [attractorId, setAttractorId] = useState("lorenz");
  const [params, setParams] = useState<Record<string, number>>(() => defaultsFor("lorenz"));
  const [dt, setDt] = useState(() => ATTRACTORS[0].dt.default);
  const [count, setCount] = useState(3600);
  const [open, setOpen] = useState(false);

  // Refs the animation loop reads (so it never restarts)
  const attractorIdRef = useRef(attractorId);
  const paramsRef = useRef(params);
  const dtRef = useRef(dt);
  const countRef = useRef(count);
  const zoomRef = useRef(1);
  const rotRef = useRef({ x: 0.45, y: 0.2 });
  const draggingRef = useRef(false);
  const restartRef = useRef(false);

  useEffect(() => void (attractorIdRef.current = attractorId), [attractorId]);
  useEffect(() => void (paramsRef.current = params), [params]);
  useEffect(() => void (dtRef.current = dt), [dt]);
  useEffect(() => void (countRef.current = count), [count]);

  const def = ATTRACTORS.find((a) => a.id === attractorId)!;

  const changeAttractor = (id: string) => {
    const d = ATTRACTORS.find((a) => a.id === id)!;
    setAttractorId(id);
    setParams(defaultsFor(id));
    setDt(d.dt.default);
    zoomRef.current = 1;
    restartRef.current = true;
  };

  const restart = () => {
    restartRef.current = true;
  };

  const resetDefaults = () => {
    setParams(defaultsFor(attractorId));
    setDt(def.dt.default);
    restartRef.current = true;
  };

  const zoom = (f: number) => {
    zoomRef.current = Math.max(0.35, Math.min(4, zoomRef.current * f));
  };

  // --- SIMULATION ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let W = 0;
    let H = 0;
    let dpr = 1;
    let n = 0;
    let px = new Float32Array(0);
    let py = new Float32Array(0);
    let pz = new Float32Array(0);
    let visible = true;

    const getDef = () => ATTRACTORS.find((a) => a.id === attractorIdRef.current)!;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#080c14";
      ctx.fillRect(0, 0, W, H);
    };

    const seedOne = (d: AttractorDef, i: number) => {
      px[i] = d.center[0] + (Math.random() - 0.5) * d.spread[0];
      py[i] = d.center[1] + (Math.random() - 0.5) * d.spread[1];
      pz[i] = d.center[2] + (Math.random() - 0.5) * d.spread[2];
    };

    const reseed = () => {
      const d = getDef();
      const want = countRef.current;
      if (want !== n) {
        n = want;
        px = new Float32Array(n);
        py = new Float32Array(n);
        pz = new Float32Array(n);
      }
      for (let i = 0; i < n; i++) seedOne(d, i);
      const c = paramsRef.current;
      const dts = dtRef.current;
      for (let s = 0; s < d.burnIn; s++) {
        for (let i = 0; i < n; i++) {
          const np = rk4({ x: px[i], y: py[i], z: pz[i] }, c, dts, d.deriv);
          if (!isFinite(np.x) || !isFinite(np.y) || !isFinite(np.z)) {
            seedOne(d, i);
          } else {
            px[i] = np.x;
            py[i] = np.y;
            pz[i] = np.z;
          }
        }
      }
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#080c14";
      ctx.fillRect(0, 0, W, H);
    };

    const drawPoints = (d: AttractorDef, fade: number) => {
      const c = paramsRef.current;
      const dts = dtRef.current;
      const sub = d.substeps;
      const ry = rotRef.current.y;
      const rx = rotRef.current.x;
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      // auto-size so the attractor fills ~95% of the smaller viewport dimension
      const s = ((0.95 * Math.min(W, H)) / d.fit) * zoomRef.current;
      // focal scales with the model so perspective stays gentle & consistent at any size/zoom
      const focal = 3.0 * d.fit * s;
      const cxs = W / 2;
      const cys = H / 2;
      const ox = d.center[0];
      const oy = d.center[1];
      const oz = d.center[2];

      // trail fade
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = `rgba(8,12,20,${fade})`;
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      // continuously respray a few particles to keep the cloud alive
      const reN = Math.max(1, (n * 0.0045) | 0);
      for (let r = 0; r < reN; r++) seedOne(d, (Math.random() * n) | 0);

      for (let i = 0; i < n; i++) {
        let x = px[i];
        let y = py[i];
        let z = pz[i];
        for (let stp = 0; stp < sub; stp++) {
          const np = rk4({ x, y, z }, c, dts, d.deriv);
          x = np.x;
          y = np.y;
          z = np.z;
        }
        if (
          !(isFinite(x) && isFinite(y) && isFinite(z)) ||
          Math.abs(x) > 1e4 ||
          Math.abs(y) > 1e4 ||
          Math.abs(z) > 1e4
        ) {
          seedOne(d, i);
          x = px[i];
          y = py[i];
          z = pz[i];
        } else {
          px[i] = x;
          py[i] = y;
          pz[i] = z;
        }

        const X = x - ox;
        const Y = y - oy;
        const Z = z - oz;
        const x1 = X * cosY - Z * sinY;
        const z1 = X * sinY + Z * cosY;
        const y1 = Y * cosX - z1 * sinX;
        const z2 = Y * sinX + z1 * cosX;
        const persp = focal / (focal + z2 * s);
        if (persp <= 0) continue;
        const sx = cxs + x1 * s * persp;
        const sy = cys - y1 * s * persp;
        if (sx < -8 || sx > W + 8 || sy < -8 || sy > H + 8) continue;

        let t = 0.5 + (z2 * s) / (focal * 1.1);
        if (t < 0) t = 0;
        else if (t > 1) t = 1;
        ctx.fillStyle = palette[(t * (PAL - 1)) | 0];
        const sz = persp < 1 ? 1.2 : 1.5;
        ctx.fillRect(sx, sy, sz, sz);
      }
    };

    const frame = () => {
      if (!visible) {
        raf = requestAnimationFrame(frame);
        return;
      }
      const d = getDef();
      if (restartRef.current || countRef.current !== n) {
        restartRef.current = false;
        reseed();
      }
      if (!draggingRef.current) rotRef.current.y += 0.0016;
      drawPoints(d, 0.16);
      raf = requestAnimationFrame(frame);
    };

    resize();
    reseed();

    if (reduced) {
      // one rich static pass — no animation
      ctx.globalCompositeOperation = "lighter";
      for (let k = 0; k < 4; k++) drawPoints(getDef(), 0);
    } else {
      raf = requestAnimationFrame(frame);
    }

    const ro = new ResizeObserver(() => {
      resize();
      restartRef.current = true;
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    // pointer drag to rotate — mouse/pen only, so touch can still scroll the page
    let lastX = 0;
    let lastY = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      draggingRef.current = true;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture?.(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      rotRef.current.y += dx * 0.006;
      rotRef.current.x = Math.max(-1.4, Math.min(1.4, rotRef.current.x + dy * 0.006));
    };
    const onUp = (e: PointerEvent) => {
      draggingRef.current = false;
      canvas.releasePointerCapture?.(e.pointerId);
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const numFmt = useCallback((v: number) => {
    if (Math.abs(v) >= 100) return v.toFixed(0);
    if (Math.abs(v) >= 1) return v.toFixed(2).replace(/\.?0+$/, "");
    return v.toFixed(3).replace(/\.?0+$/, "");
  }, []);

  return (
    <>
      {/* CANVAS — full bleed */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing"
        aria-hidden
      />

      {/* readability vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#080c14_92%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#080c14]/55 via-transparent to-[#080c14]" />

      {/* interactive hint */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 hidden items-center gap-2 rounded-full border border-white/10 bg-gray-900/50 px-3 py-1.5 text-[11px] text-gray-400 backdrop-blur-md sm:flex">
        <Sparkles size={12} className="text-cyan-400" />
        Drag to rotate · tweak the live equation
      </div>

      {/* zoom buttons */}
      <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-2">
        <button
          onClick={() => zoom(1.18)}
          aria-label="Zoom in"
          className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-gray-900/60 text-gray-300 backdrop-blur-md transition-colors hover:border-cyan-500/40 hover:text-white"
        >
          <Plus size={16} />
        </button>
        <button
          onClick={() => zoom(1 / 1.18)}
          aria-label="Zoom out"
          className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-gray-900/60 text-gray-300 backdrop-blur-md transition-colors hover:border-cyan-500/40 hover:text-white"
        >
          <Minus size={16} />
        </button>
      </div>

      {/* gear toggle */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setOpen(true)}
            aria-label="Open attractor controls"
            className="absolute right-6 top-24 z-30 grid h-11 w-11 place-items-center rounded-xl border border-cyan-500/30 bg-gray-900/70 text-cyan-300 shadow-lg backdrop-blur-md transition-colors hover:bg-gray-800/80 sm:top-6"
          >
            <Settings2 size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* control panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 24, y: -8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 24, y: -8 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="absolute right-4 top-24 z-30 w-[min(92vw,20rem)] max-h-[78vh] overflow-y-auto rounded-2xl border border-white/[0.08] bg-gray-900/80 p-5 shadow-2xl backdrop-blur-xl sm:top-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings2 size={16} className="text-cyan-400" />
                <span className="text-sm font-semibold text-white">Live Attractor</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close controls"
                className="rounded-lg p-1 text-gray-500 transition-colors hover:bg-gray-800 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* selector */}
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              Attractor
            </label>
            <select
              value={attractorId}
              onChange={(e) => changeAttractor(e.target.value)}
              className="mb-1 w-full appearance-none rounded-lg border border-white/10 bg-gray-800/80 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-cyan-500/50"
            >
              {ATTRACTORS.map((a) => (
                <option key={a.id} value={a.id} className="bg-gray-900">
                  {a.name}
                </option>
              ))}
            </select>
            <p className="mb-4 text-xs leading-relaxed text-gray-500">{def.blurb}</p>

            {/* equations */}
            <div className="mb-4 rounded-xl border border-white/[0.06] bg-black/30 p-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-cyan-400/70">
                System
              </p>
              <div className="space-y-1 font-mono text-[12px] leading-relaxed text-cyan-200/90">
                {def.equation.map((eq) => (
                  <div key={eq}>{eq}</div>
                ))}
              </div>
            </div>

            {/* constants */}
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              Constants
            </p>
            <div className="space-y-3">
              {def.params.map((p) => (
                <div key={p.key}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-mono text-sm text-gray-300">{p.label}</span>
                    <span className="rounded-md bg-gray-800 px-2 py-0.5 font-mono text-xs text-cyan-300">
                      {numFmt(params[p.key])}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={p.min}
                    max={p.max}
                    step={p.step}
                    value={params[p.key]}
                    onChange={(e) =>
                      setParams((prev) => ({ ...prev, [p.key]: parseFloat(e.target.value) }))
                    }
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-gray-700 accent-cyan-400"
                  />
                </div>
              ))}

              {/* time step */}
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm text-gray-300">Time step</span>
                  <span className="rounded-md bg-gray-800 px-2 py-0.5 font-mono text-xs text-cyan-300">
                    {dt.toFixed(4)}
                  </span>
                </div>
                <input
                  type="range"
                  min={def.dt.min}
                  max={def.dt.max}
                  step={def.dt.step}
                  value={dt}
                  onChange={(e) => setDt(parseFloat(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-gray-700 accent-cyan-400"
                />
              </div>

              {/* particles */}
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm text-gray-300">Particles</span>
                  <span className="rounded-md bg-gray-800 px-2 py-0.5 font-mono text-xs text-cyan-300">
                    {count}
                  </span>
                </div>
                <input
                  type="range"
                  min={600}
                  max={5000}
                  step={200}
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value, 10))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-gray-700 accent-cyan-400"
                />
              </div>
            </div>

            {/* actions */}
            <div className="mt-5 flex gap-2">
              <button
                onClick={restart}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-cyan-400"
              >
                <RotateCw size={14} /> Restart
              </button>
              <button
                onClick={resetDefaults}
                className="rounded-lg border border-white/10 bg-gray-800/70 px-3 py-2 text-sm text-gray-300 transition-colors hover:border-gray-500 hover:text-white"
              >
                Reset
              </button>
            </div>

            <a
              href="https://en.wikipedia.org/wiki/Attractor#Strange_attractor"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block text-center text-xs text-cyan-500/80 transition-colors hover:text-cyan-300"
            >
              What is a strange attractor? →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
