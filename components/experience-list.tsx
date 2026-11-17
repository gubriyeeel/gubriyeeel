"use client";

import { useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import type { Experience } from "@/lib/experiences";
import { cn } from "@/lib/utils";

function fmt(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

/** Every role visible at a glance; expand one to see its stack. */
export function ExperienceList({ experiences }: { experiences: Experience[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ol className="surface divide-y divide-white/[0.05] overflow-hidden">
      {experiences.map((exp, i) => {
        const isOpen = open === i;
        const current = i === 0;
        const end = current ? "Present" : fmt(experiences[i - 1].year);
        return (
          <li key={exp.companyName}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="group flex w-full items-center gap-4 px-5 py-4 text-left outline-none transition-colors duration-300 hover:bg-white/[0.02] focus-visible:bg-white/[0.03] sm:px-6"
            >
              <span
                className={cn(
                  "grid size-10 shrink-0 place-items-center rounded-full text-sm font-semibold transition-colors duration-300",
                  current
                    ? "bg-foreground text-background"
                    : "bg-secondary text-foreground/80",
                )}
              >
                {exp.companyName.charAt(0).toUpperCase()}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="font-semibold tracking-tight">
                    {exp.companyName}
                  </span>
                  {current ? (
                    <span className="relative flex size-1.5">
                      <span className="ping-soft absolute inset-0 rounded-full bg-positive" />
                      <span className="relative size-1.5 rounded-full bg-positive" />
                    </span>
                  ) : null}
                </span>
                <span className="block truncate text-sm text-muted-foreground">
                  {exp.position}
                </span>
              </span>
              <span className="hidden shrink-0 text-right text-sm tabular-nums text-muted-foreground sm:block">
                {fmt(exp.year)} – {end}
              </span>
              <PlusIcon
                className={cn(
                  "size-4 shrink-0 text-muted-foreground transition-transform duration-500 ease-spring group-hover:text-foreground",
                  isOpen && "rotate-45",
                )}
              />
            </button>

            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-500 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div
                  className={cn(
                    "px-5 pb-5 pl-[4.75rem] transition-[opacity,transform,filter] duration-500 ease-out sm:px-6 sm:pl-20",
                    isOpen
                      ? "opacity-100"
                      : "-translate-y-1 opacity-0 blur-[2px]",
                  )}
                >
                  <p className="mb-3 text-sm text-muted-foreground sm:hidden">
                    {fmt(exp.year)} – {end}
                  </p>
                  <ul className="flex flex-wrap gap-1.5">
                    {exp.tech.map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
