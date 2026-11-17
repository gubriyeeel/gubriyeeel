"use client";

import Navbar from "@/components/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { AnimatedText } from "@/components/animated-name";

export default function Header() {
  const pathname = usePathname() ?? "/";
  const isHome = pathname === "/";
  const backHref = pathname.startsWith("/blogs/") ? "/blogs" : "/";

  return (
    <header className="enter flex h-11 items-center justify-between gap-4">
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
  );
}
