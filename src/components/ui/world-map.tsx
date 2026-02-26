"use client";

import { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

export interface WorldMapRoute {
  start: { lat: number; lng: number; label?: string };
  end: { lat: number; lng: number; label?: string };
}

interface WorldMapProps {
  dots?: WorldMapRoute[];
  lineColor?: string;
  className?: string;
}

export function WorldMap({
  dots = [],
  lineColor = "#0ea5e9",
  className,
}: WorldMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = theme ?? resolvedTheme ?? "light";

  const map = useMemo(() => new DottedMap({ height: 100, grid: "diagonal" }), []);

  const svgMap = useMemo(
    () =>
      map.getSVG({
        radius: 0.22,
        color: currentTheme === "dark" ? "#FFFFFF40" : "#00000040",
        shape: "circle",
        backgroundColor: currentTheme === "dark" ? "#050505" : "#ffffff",
      }),
    [map, currentTheme],
  );

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number },
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div
      className={cn(
        "relative w-full rounded-3xl border border-border/40 bg-background/90 p-4 shadow-xl shadow-primary/10",
        "overflow-hidden",
        className,
      )}
    >
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        alt="World map"
        className="h-full w-full rounded-2xl object-cover [mask-image:linear-gradient(to_bottom,transparent,white_8%,white_92%,transparent)]"
        loading="lazy"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth={1.2}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.4 * i, ease: "easeOut" }}
              />
            </g>
          );
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            {([dot.start, dot.end] as const).map((point, idx) => {
              const projected = projectPoint(point.lat, point.lng);
              return (
                <g key={`${i}-${idx}`}>
                  <circle cx={projected.x} cy={projected.y} r={2.2} fill={lineColor} />
                  <circle cx={projected.x} cy={projected.y} r={2.2} fill={lineColor} opacity={0.5}>
                    <animate
                      attributeName="r"
                      from="2"
                      to="8"
                      dur="1.5s"
                      begin="0s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.5"
                      to="0"
                      dur="1.5s"
                      begin="0s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
}
