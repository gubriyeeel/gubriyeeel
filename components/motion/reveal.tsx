"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Fades/blurs children in the first time they scroll into view. */
export function Reveal({
  children,
  index = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
  as?: "div" | "section" | "li";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-shown", "");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as any}
      data-reveal
      className={cn(className)}
      style={{ "--i": index } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
