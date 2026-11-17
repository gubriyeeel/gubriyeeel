"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

/** Icon button that morphs into a check for a moment after copying. */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      aria-label={copied ? "Copied" : label}
      onClick={async (e) => {
        e.preventDefault();
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard blocked, nothing to do */
        }
      }}
      className={cn(
        "pressable relative grid size-11 shrink-0 place-items-center rounded-full",
        copied ? "bg-positive/15 text-positive" : "bg-secondary text-foreground/80 hover:bg-accent",
      )}
    >
      <CopyIcon
        className={cn(
          "absolute size-4 transition-all duration-300 ease-out",
          copied ? "scale-50 opacity-0" : "scale-100 opacity-100",
        )}
      />
      <CheckIcon
        className={cn(
          "absolute size-5 transition-all duration-500 ease-spring",
          copied ? "scale-100 opacity-100" : "scale-50 opacity-0",
        )}
      />
    </button>
  );
}
