import { useRef, useEffect, useState } from "react";
import type { ReactNode } from "react";
let rough: { canvas: (el: HTMLCanvasElement) => { rectangle: (x: number, y: number, width: number, height: number, options?: Record<string, unknown>) => void } } | null = null;

async function ensureRough() {
  if (rough) return rough;
  const mod = await import('roughjs/bin/rough');
  const modAny = mod as unknown as { default?: unknown };
  const loaded = modAny.default ?? mod;
  rough = loaded as unknown as { canvas: (el: HTMLCanvasElement) => { rectangle: (x: number, y: number, width: number, height: number, options?: Record<string, unknown>) => void } };
  return rough;
}

const PAGE_RANDOM_SEED: number = (() => {
  try {
    if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
      const arr = new Uint32Array(1);
      // crypto.getRandomValues exists on the global Crypto type
      (crypto as unknown as Crypto).getRandomValues(arr);
      return arr[0] >>> 0;
    }
  } catch {
    // ignore (no-op)
  }
  return Math.floor(Math.random() * 0xffffffff) >>> 0;
})();

type RoughBorderProps = {
  children: ReactNode;
  stroke?: string;
  strokeWidth?: number;
  roughness?: number;
  className?: string;
  isAnimatingWhenHovered?: boolean;
  animFrame?: number;
  hoverColor?: string;
  backgroundCanvas?: string;
  fill?: string;
  canvasZIndex?: number;
  contentZIndex?: number;
  roughOptions?: Record<string, unknown>;
  onHover?: () => void;
};

function RoughBorder({
    children,
    stroke = "#323237",
    strokeWidth = 2,
    roughness = 1,
    className = "",
    isAnimatingWhenHovered = false,
    animFrame = 400,
    hoverColor = stroke,
    backgroundCanvas = "transparent",
    fill = "transparent",
    canvasZIndex = 0,
    contentZIndex = 1,
    roughOptions,
    onHover,
  }: RoughBorderProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const pad = Math.ceil((strokeWidth ?? 2) * 2 + 2);
  const [isHovered, setIsHovered] = useState(false);
  const [tick, setTick] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const updateSize = () => {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        setSize({ width: Math.round(rect.width), height: Math.round(rect.height) });
      }
    };
    updateSize();
    const observer = new window.ResizeObserver(updateSize);
    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const onEnter = () => {
      if (!isAnimatingWhenHovered) return;

      setIsHovered(true);
      if (onHover) onHover();
      if (intervalRef.current == null) {
        const frame = Math.max(30, Math.round(animFrame));
        intervalRef.current = window.setInterval(() => setTick((t) => t + 1), frame);
      }
    };

    const onLeave = () => {
      if (!isAnimatingWhenHovered) return;

      setIsHovered(false);
      if (intervalRef.current != null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      if (intervalRef.current != null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isAnimatingWhenHovered, animFrame, onHover]);
  
  useEffect(() => {
    (async () => {
      const canvas = canvasRef.current;
      if (!(canvas && size.width && size.height)) return;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = (size.width + pad * 2) * dpr;
      canvas.height = (size.height + pad * 2) * dpr;

      canvas.style.width = `${size.width + pad * 2}px`;
      canvas.style.height = `${size.height + pad * 2}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // clear previous drawing
      ctx.clearRect(0, 0, (size.width + pad * 2) * dpr, (size.height + pad * 2) * dpr);

      // ensure rough is loaded (lazy-imported)
      await ensureRough();
      // rough is now non-null
      const rc = rough!.canvas(canvas);

      const opts: Record<string, unknown> = {
        ...(roughOptions || {}),
        stroke: isHovered ? hoverColor : stroke,
        strokeWidth,
        roughness,
        fill,
      };

      // deterministic seed helper (djb2)
      const makeSeedFrom = (s: string) => {
        let h = 5381;
        for (let i = 0; i < s.length; i++) {
          h = ((h << 5) + h) + s.charCodeAt(i);
          h |= 0;
        }
        return h >>> 0;
      };

          try {
            const base = `${size.width}x${size.height}-${stroke}-${strokeWidth}-${roughness}-${fill}`;
            const effectiveBase = `${PAGE_RANDOM_SEED}-${base}`;
            opts.seed = isAnimatingWhenHovered ? makeSeedFrom(effectiveBase + '-' + tick) : makeSeedFrom(effectiveBase);
          } catch {
            // ignore; roughjs will fallback
          }

      rc.rectangle(
        pad + strokeWidth / 2,
        pad + strokeWidth / 2,
        size.width - strokeWidth,
        size.height - strokeWidth,
        opts as Record<string, unknown>
      );
    })();
  }, [size, stroke, strokeWidth, roughness, pad, isHovered, isAnimatingWhenHovered, hoverColor, fill, tick, roughOptions]);

  return (
    <div
      ref={wrapperRef}
      className={`relative ${className}`}
      style={{ display: "block", margin: 0, padding: 0, zIndex: 0 }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: `-${pad}px`,
          left: `-${pad}px`,
          pointerEvents: "none",
          width: `${size.width + pad * 2}px`,
          height: `${size.height + pad * 2}px`,
          backgroundColor: backgroundCanvas,
          zIndex: canvasZIndex,
        }}
      />
      <div style={{ position: "relative", margin: 0, padding: 0, zIndex: contentZIndex }}>
        {children}
      </div>
    </div>
  );
}

export default RoughBorder;