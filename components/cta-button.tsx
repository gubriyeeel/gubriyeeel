import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

/** Full-width pill CTA: label left, context + arrow right. */
export function CtaButton({
  href,
  label,
  hint,
  className,
  external,
}: {
  href: string;
  label: string;
  hint?: string;
  className?: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(
        "pressable group relative flex h-16 items-center justify-between overflow-hidden rounded-full bg-brand px-7 text-white shadow-[0_10px_30px_-10px_hsl(var(--brand)/0.7)] hover:shadow-[0_14px_40px_-10px_hsl(var(--brand)/0.9)]",
        className,
      )}
    >
      {/* sheen that sweeps across on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-[left,opacity] duration-700 ease-out group-hover:left-[110%] group-hover:opacity-100"
      />
      <span className="text-lg font-semibold tracking-tight">{label}</span>
      <span className="flex items-center gap-3 text-white/80">
        {hint ? <span className="text-base">{hint}</span> : null}
        <ArrowRightIcon className="size-5 text-white transition-transform duration-500 ease-spring group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
