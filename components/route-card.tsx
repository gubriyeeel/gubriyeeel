"use client";

import { useState } from "react";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import { ClockIcon, LayersIcon } from "@radix-ui/react-icons";
import { CountUp } from "@/components/motion/count-up";
import { cn } from "@/lib/utils";

type Stop = { code: string; name: string };

const ARC = "M 8 52 Q 100 -8 192 52";

export function PlaneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
    </svg>
  );
}

/**
 * "From → To" boarding-pass card. The plane flies the dotted arc on loop,
 * and the swap button spins and flips the route.
 */
export function RouteCard({
  from,
  to,
  since,
  roles,
  projects,
}: {
  from: Stop;
  to: Stop;
  since: number;
  roles: number;
  projects: number;
}) {
  const [flipped, setFlipped] = useState(false);
  const [turns, setTurns] = useState(0);
  const animate = !useReducedMotion();

  const [a, b] = flipped ? [to, from] : [from, to];

  return (
    <section className="surface enter p-6 sm:p-7" style={{ "--i": 2 } as React.CSSProperties}>
      <div className="relative grid grid-cols-[1fr_auto_1fr] items-end">
        <div key={`a-${a.code}`} className="swap-in">
          <p className="text-sm text-muted-foreground">From</p>
          <p className="mt-1 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">{a.code}</p>
          <p className="mt-1 text-muted-foreground">{a.name}</p>
        </div>

        <div className="relative flex h-full w-24 flex-col items-center justify-center sm:w-36">
          <svg
            viewBox="0 0 200 60"
            className="absolute inset-x-0 top-1 w-full overflow-visible text-muted-foreground/60"
            aria-hidden
          >
            <path
              d={ARC}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="1 6"
              strokeLinecap="round"
            />
            {animate ? (
              <g className="text-brand">
                <g transform="translate(-10 -10) scale(0.85)">
                  <path
                    fill="currentColor"
                    transform="rotate(90 12 12)"
                    d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"
                  />
                </g>
                <animateMotion
                  dur="4.5s"
                  repeatCount="indefinite"
                  rotate="auto"
                  path={flipped ? "M 192 52 Q 100 -8 8 52" : ARC}
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="spline"
                  keySplines="0.45 0 0.25 1"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.12;0.85;1"
                  dur="4.5s"
                  repeatCount="indefinite"
                />
              </g>
            ) : (
              <g className="text-brand" transform="translate(90 12) scale(0.85)">
                <path
                  fill="currentColor"
                  transform="rotate(90 12 12)"
                  d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"
                />
              </g>
            )}
          </svg>

          <button
            type="button"
            aria-label="Swap route"
            onClick={() => {
              setFlipped((f) => !f);
              setTurns((t) => t + 1);
            }}
            className="pressable mt-8 grid size-12 place-items-center rounded-full bg-secondary text-foreground/80 hover:bg-accent hover:text-foreground"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5 transition-transform duration-700 ease-spring"
              style={{ transform: `rotate(${turns * 180}deg)` }}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7" />
            </svg>
          </button>
        </div>

        <div key={`b-${b.code}`} className="swap-in text-right">
          <p className="text-sm text-muted-foreground">To</p>
          <p className="mt-1 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">{b.code}</p>
          <p className="mt-1 text-muted-foreground">{b.name}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-5 text-sm text-muted-foreground">
        <span className="flex items-center gap-2">
          <ClockIcon className="size-4" /> since {since}
        </span>
        <span className="flex items-center gap-2">
          <LayersIcon className="size-4" /> <CountUp value={roles} /> roles
        </span>
        <span className={cn("flex items-center gap-2")}>
          <PlaneIcon className="size-4 rotate-90" /> <CountUp value={projects} /> shipped
        </span>
      </div>
    </section>
  );
}
