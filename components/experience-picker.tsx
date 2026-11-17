"use client";

import { useRef, useState } from "react";
import type { Experience } from "@/lib/experiences";
import { cn } from "@/lib/utils";

function parse(date: string) {
  const d = new Date(date);
  return {
    month: d.toLocaleDateString("en-US", { month: "short" }),
    year: d.getFullYear(),
  };
}

/**
 * Date-strip style picker: each role is a pill, the selected one inverts,
 * and the detail card below swaps with a soft blur-in.
 */
export function ExperiencePicker({ experiences }: { experiences: Experience[] }) {
  const [index, setIndex] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);
  const selected = experiences[index];
  const start = parse(selected.year);
  const end = index === 0 ? "Present" : (() => {
    const p = parse(experiences[index - 1].year);
    return `${p.month} ${p.year}`;
  })();

  const select = (i: number, el?: HTMLElement | null) => {
    setIndex(i);
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <section className="surface enter overflow-hidden py-6" style={{ "--i": 3 } as React.CSSProperties}>
      <div className="flex items-baseline justify-between px-6 sm:px-7">
        <h2 className="m-0 text-2xl tracking-[-0.03em]">
          Experience <span className="font-normal text-muted-foreground/50">{start.year}</span>
        </h2>
        <span className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="relative flex size-2">
            <span className="ping-soft absolute inset-0 rounded-full bg-positive" />
            <span className="relative size-2 rounded-full bg-positive" />
          </span>
          Current
        </span>
      </div>

      <div
        ref={stripRef}
        role="tablist"
        aria-label="Roles"
        className="no-scrollbar edge-fade mt-5 flex snap-x gap-2.5 overflow-x-auto px-6 py-1 sm:px-7"
        onKeyDown={(e) => {
          if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
          e.preventDefault();
          const next =
            (index + (e.key === "ArrowRight" ? 1 : -1) + experiences.length) %
            experiences.length;
          const btn = stripRef.current?.querySelectorAll<HTMLElement>("[role=tab]")[next];
          btn?.focus();
          select(next, btn);
        }}
      >
        {experiences.map((exp, i) => {
          const d = parse(exp.year);
          const isActive = i === index;
          return (
            <button
              key={exp.companyName}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={(e) => select(i, e.currentTarget)}
              className={cn(
                "pressable flex min-w-[5.5rem] snap-center flex-col items-center rounded-[1.4rem] px-3 py-3.5 outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? "scale-[1.04] bg-foreground text-background shadow-lg"
                  : "bg-secondary/60 text-foreground hover:bg-secondary",
              )}
            >
              <span className={cn("text-sm", isActive ? "text-background/60" : "text-muted-foreground")}>
                {d.month}
              </span>
              <span className="text-3xl font-medium tracking-[-0.04em]">
                &rsquo;{String(d.year).slice(2)}
              </span>
              <span
                className={cn(
                  "mt-1 max-w-[5rem] truncate text-xs font-medium",
                  isActive ? "text-background/70" : i === 0 ? "text-positive" : "text-muted-foreground",
                )}
              >
                {exp.companyName}
              </span>
            </button>
          );
        })}
      </div>

      <div role="tabpanel" key={selected.companyName} className="swap-in mt-5 px-6 sm:px-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-semibold tracking-tight">{selected.companyName}</p>
            <p className="text-sm text-muted-foreground">{selected.position}</p>
          </div>
          <p className="shrink-0 text-right text-sm text-muted-foreground">
            {start.month} {start.year}
            <br />
            <span className={index === 0 ? "text-positive" : undefined}>{end}</span>
          </p>
        </div>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {selected.tech.map((t, i) => (
            <li
              key={t}
              className="chip enter"
              style={{ "--i": i * 0.6 } as React.CSSProperties}
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
