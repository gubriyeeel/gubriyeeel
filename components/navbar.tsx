"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

/**
 * Segmented pill nav. A single highlight glides between items, following
 * hover first and falling back to the active route.
 */
export default function Navbar() {
  const pathname = usePathname() ?? "/";
  const listRef = useRef<HTMLUListElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  const active = links.find((l) => pathname.startsWith(l.href))?.href ?? null;
  const target = hovered ?? active;

  // Measure in the DOM and write straight to the pill's style: no re-render.
  useLayoutEffect(() => {
    const list = listRef.current;
    const pill = pillRef.current;
    if (!list || !pill) return;
    const el = target
      ? list.querySelector<HTMLElement>(`[data-href="${target}"]`)
      : null;
    if (!el) {
      pill.style.opacity = "0";
      return;
    }
    // First appearance: jump into place instead of sliding in from 0.
    if (pill.style.opacity !== "1") pill.style.transitionProperty = "opacity";
    pill.style.left = `${el.offsetLeft}px`;
    pill.style.width = `${el.offsetWidth}px`;
    pill.style.opacity = "1";
    requestAnimationFrame(() => (pill.style.transitionProperty = ""));
  }, [target]);

  return (
    <nav aria-label="Main">
      <ul
        ref={listRef}
        onMouseLeave={() => setHovered(null)}
        className="relative flex items-center rounded-full border border-white/[0.06] bg-card p-1 text-sm"
      >
        <span
          ref={pillRef}
          aria-hidden
          className="absolute inset-y-1 rounded-full bg-secondary opacity-0 transition-[left,width,opacity] duration-500 ease-spring"
        />
        {links.map((link) => {
          const isActive = active === link.href;
          return (
            <li key={link.href} data-href={link.href} className="relative">
              <Link
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                onMouseEnter={() => setHovered(link.href)}
                onFocus={() => setHovered(link.href)}
                onBlur={() => setHovered(null)}
                className={cn(
                  "pressable block rounded-full px-3.5 py-1.5 outline-none sm:px-4",
                  isActive || hovered === link.href
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
