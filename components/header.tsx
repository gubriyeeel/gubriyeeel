"use client";

import Navbar from "@/components/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatedText } from "@/components/animated-name";

export default function Header() {
  const pathname = usePathname() as string;

  let href = "/";

  if (pathname === "/blogs" || pathname === "/blogs/") {
    href = "/";
  } else if (pathname.startsWith("/blogs/")) {
    href = "/blogs";
  }

  return (
    <header className="flex h-[37.5px] items-center justify-between">
      {pathname !== "/" && (
        <div>
          <Link
            className="focus:outline-offset-6 underline decoration-neutral-600 underline-offset-4 transition-colors hover:decoration-neutral-500 focus:decoration-neutral-500"
            href={href}
          >
            ← back
          </Link>
        </div>
      )}

      {pathname === "/" && (
        <AnimatedText name="Gabriel Sufrir" username="gubriyeeel" />
      )}

      <Navbar />
    </header>
  );
}
