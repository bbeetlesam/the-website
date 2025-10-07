import { useRef, useEffect, useState } from "react";
import type { ReactNode } from "react";
import rough from "roughjs/bin/rough";

type RoughBorderProps = {
  children: ReactNode;
  stroke?: string;
  strokeWidth?: number;
  roughness?: number;
  className?: string;
  isAnimatingWhenHovered?: boolean;
  animFrame?: number;
  onHover?: () => void;
};

function RoughBorder({
    children,
    stroke = "#323237",
    strokeWidth = 2,
    roughness = 1,
    className = "",
    isAnimatingWhenHovered = false,
    animFrame = 300,
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
      setIsHovered(true);
      if (onHover) onHover();
      if (isAnimatingWhenHovered && intervalRef.current == null) {
        const frame = Math.max(30, Math.round(animFrame));
        intervalRef.current = window.setInterval(() => setTick((t) => t + 1), frame);
      }
    };

    const onLeave = () => {
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
    const canvas = canvasRef.current;
    if (canvas && size.width && size.height) {
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

      const rc = rough.canvas(canvas);
      rc.rectangle(
        pad + strokeWidth / 2,
        pad + strokeWidth / 2,
        size.width - strokeWidth,
        size.height - strokeWidth,
        { stroke: isHovered ? "black" : stroke, strokeWidth, roughness }
      );
    }
  }, [size, stroke, strokeWidth, roughness, pad, isHovered, tick]);

  return (
    <div
      ref={wrapperRef}
      className={`relative ${className}`}
      style={{ display: "block", margin: 0, padding: 0 }}
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
        }}
      />
      <div style={{ position: "relative", margin: 0, padding: 0 }}>
        {children}
      </div>
    </div>
  );
}

export default RoughBorder;