"use client";

import { useCallback, useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import type { Project as ProjectType } from "@/lib/projects";
import Project from "@/components/project";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import { cn } from "@/lib/utils";

/** One full-width case study per slide. Swipe, drag-scroll, arrows or dots. */
export function ProjectSlider({ projects }: { projects: ProjectType[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const count = projects.length;

  const slides = () =>
    Array.from(trackRef.current?.children ?? []) as HTMLElement[];

  const goTo = useCallback(
    (i: number) => {
      const track = trackRef.current;
      const target = slides()[Math.max(0, Math.min(count - 1, i))];
      if (!track || !target) return;
      track.scrollTo({
        left: target.offsetLeft,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    },
    [count, reducedMotion],
  );

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const left = track.scrollLeft;
    const distances = slides().map((slide) => Math.abs(slide.offsetLeft - left));
    setActive(distances.indexOf(Math.min(...distances)));
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Case studies"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") goTo(active + 1);
        if (e.key === "ArrowLeft") goTo(active - 1);
      }}
    >
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="no-scrollbar relative flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain"
      >
        {projects.map((project, i) => (
          <div
            key={project.slug}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}: ${project.name}`}
            className="w-full shrink-0 snap-start"
          >
            <Project project={project} priority={i === 0} />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          {projects.map((project, i) => (
            <button
              key={project.slug}
              type="button"
              aria-label={`Show ${project.name}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => goTo(i)}
              className="grid h-6 place-items-center px-0.5"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-500 ease-spring",
                  i === active
                    ? "w-6 bg-foreground"
                    : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground",
                )}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous case study"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            className="pressable grid size-10 place-items-center rounded-full bg-card text-muted-foreground hover:bg-secondary hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowLeftIcon />
          </button>
          <button
            type="button"
            aria-label="Next case study"
            onClick={() => goTo(active + 1)}
            disabled={active === count - 1}
            className="pressable grid size-10 place-items-center rounded-full bg-card text-muted-foreground hover:bg-secondary hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
