"use client";

import { useMemo, useRef, useState } from "react";
import type { Experience } from "@/lib/experiences";
import { cn } from "@/lib/utils";

type Tech = { name: string; places: string[]; ring: number; x: number; y: number };

// Radius (in % of the box) of each ring, inner to outer.
const RINGS = [16, 29, 41];
const RING_LABELS = ["most used", "often", "used"];

function layout(experiences: Experience[]): Tech[] {
  const map = new Map<string, string[]>();
  for (const exp of experiences) {
    for (const t of exp.tech) map.set(t, [...(map.get(t) ?? []), exp.companyName]);
  }
  const max = Math.max(...Array.from(map.values(), (v) => v.length));
  const items = Array.from(map, ([name, places]) => ({
    name,
    places,
    ring: places.length >= Math.max(2, max) ? 0 : places.length > 1 ? 1 : 2,
  }));

  return items.flatMap((item, _, all) => {
    const peers = all.filter((p) => p.ring === item.ring);
    const k = peers.indexOf(item);
    // Offset each ring so chips never line up into a spoke; keep the top
    // clear for the ring labels.
    const offset = [-60, 35, 275][item.ring];
    const sweep = item.ring === 0 ? 360 : 300;
    const angle =
      ((offset + 30 + (sweep / Math.max(peers.length, 1)) * k) * Math.PI) / 180;
    const r = RINGS[item.ring];
    return [{ ...item, x: 50 + r * Math.cos(angle), y: 50 + r * Math.sin(angle) }];
  });
}

/**
 * "How far can you go?" radar, re-cast as a tech stack map: the closer a
 * chip sits to the center, the more roles it shipped in.
 */
export function StackRadar({ experiences }: { experiences: Experience[] }) {
  const techs = useMemo(() => layout(experiences), [experiences]);
  const [selected, setSelected] = useState(
    () => [...techs].sort((a, b) => b.places.length - a.places.length)[0]?.name,
  );
  const cardsRef = useRef<HTMLDivElement>(null);
  const current = techs.find((t) => t.name === selected) ?? techs[0];
  const ordered = useMemo(
    () => [...techs].sort((a, b) => a.ring - b.ring || a.name.localeCompare(b.name)),
    [techs],
  );

  const pick = (name: string) => {
    setSelected(name);
    cardsRef.current
      ?.querySelector<HTMLElement>(`[data-tech="${CSS.escape(name)}"]`)
      ?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const len = Math.hypot(current.x - 50, current.y - 50);

  return (
    <section className="enter" style={{ "--i": 5 } as React.CSSProperties}>
      <p className="text-sm text-muted-foreground">From {experiences.length} roles</p>
      <h2 className="mt-1 text-3xl tracking-[-0.035em]">What do I reach for?</h2>

      <div className="relative mx-auto mt-2 aspect-square w-full max-w-[26rem]">
        {RINGS.slice()
          .reverse()
          .map((r, i) => (
            <div
              key={r}
              aria-hidden
              className="absolute rounded-full bg-white/[0.025] ring-1 ring-white/[0.04]"
              style={{
                inset: `${50 - r - 4}%`,
                animation: `ring-in 900ms var(--ease-out) both ${i * 90}ms`,
              }}
            />
          ))}
        {RINGS.map((r, i) => (
          <span
            key={`l-${r}`}
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 text-[11px] text-muted-foreground/70"
            style={{ top: `${50 - r - 3}%` }}
          >
            {RING_LABELS[i]}
          </span>
        ))}

        <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 size-full" aria-hidden>
          <line
            key={current.name}
            x1="50"
            y1="50"
            x2={current.x}
            y2={current.y}
            stroke="hsl(var(--highlight))"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeDasharray={len}
            style={{ "--len": len, animation: "draw 500ms var(--ease-out) both" } as React.CSSProperties}
          />
        </svg>

        {/* center: you are here */}
        <span className="absolute left-1/2 top-1/2 grid size-5 -translate-x-1/2 -translate-y-1/2 place-items-center">
          <span className="ping-soft absolute inset-0 rounded-full bg-foreground/40" />
          <span className="relative size-5 rounded-full border-[3px] border-background bg-foreground shadow-[0_0_0_2px_hsl(var(--foreground)/0.9)]" />
        </span>

        {techs.map((t, i) => {
          const active = t.name === current.name;
          return (
            <button
              key={t.name}
              type="button"
              onClick={() => pick(t.name)}
              aria-pressed={active}
              className={cn(
                "absolute whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium shadow-[0_4px_14px_-4px_rgb(0_0_0/0.6)] outline-none transition-[background-color,color,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-ring sm:text-sm",
                active
                  ? "z-10 bg-highlight text-black shadow-[0_6px_24px_-6px_hsl(var(--highlight)/0.7)]"
                  : "bg-secondary text-foreground/85 hover:bg-accent",
              )}
              style={{
                left: `${t.x}%`,
                top: `${t.y}%`,
                animation: `pop 600ms var(--ease-spring) both ${300 + i * 45}ms`,
              }}
            >
              <span
                className={cn(
                  "inline-block transition-transform duration-500 ease-spring",
                  active ? "scale-110" : "scale-100",
                )}
              >
                {t.name}
              </span>
            </button>
          );
        })}
      </div>

      <div
        ref={cardsRef}
        className="no-scrollbar edge-fade -mx-4 mt-2 flex snap-x gap-3 overflow-x-auto px-4 py-2"
      >
        {ordered.map((t) => {
          const active = t.name === current.name;
          return (
            <button
              key={t.name}
              type="button"
              data-tech={t.name}
              onClick={() => pick(t.name)}
              className={cn(
                "pressable flex w-44 shrink-0 snap-center flex-col items-start rounded-[1.5rem] border p-5 text-left",
                active
                  ? "border-white/[0.08] bg-card shadow-[0_12px_32px_-12px_rgb(0_0_0/0.8)]"
                  : "border-transparent bg-secondary/40 opacity-70 hover:opacity-100",
              )}
            >
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-semibold transition-colors duration-300",
                  active ? "bg-highlight text-black" : "bg-secondary text-muted-foreground",
                )}
              >
                {t.places.length} {t.places.length === 1 ? "role" : "roles"}
              </span>
              <span className="mt-3 text-lg font-semibold tracking-tight">{t.name}</span>
              <span className="line-clamp-1 text-sm text-muted-foreground">
                {t.places.join(", ")}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
