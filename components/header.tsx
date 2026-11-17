"use client";

import Navbar from "@/components/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { AnimatedText } from "@/components/animated-name";

export default function Header() {
  const pathname = usePathname() ?? "/";
  const isHome = pathname === "/";
  const backHref = pathname.startsWith("/blogs/") ? "/blogs" : "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ease-out",
        scrolled
          ? "border-white/[0.06] bg-background/70 backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent",
      )}
    >
      <header className="enter container mx-auto flex h-16 items-center justify-between gap-4">
        {isHome ? (
          <Link href="/" className="font-semibold tracking-tight">
            <AnimatedText name="Gabriel Sufrir" username="gubriyeeel" />
          </Link>
        ) : (
          <Link
            href={backHref}
            aria-label="Back"
            className="pressable grid size-11 place-items-center rounded-full border border-white/[0.08] bg-card hover:bg-secondary"
          >
            <ChevronLeftIcon className="size-5" />
          </Link>
        )}

        <Navbar />
      </header>
    </div>
  );
}
