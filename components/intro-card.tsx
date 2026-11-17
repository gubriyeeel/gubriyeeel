import Link from "next/link";
import { ArrowRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { CountUp } from "@/components/motion/count-up";
import { siteConfig } from "@/lib/site";

type Stat = { value: number; label: string; suffix?: string };

/** Profile card: who, where now, a few numbers, two ways to reach out. */
export function IntroCard({
  role,
  company,
  stats,
}: {
  role: string;
  company: string;
  stats: Stat[];
}) {
  return (
    <section
      className="surface spotlight enter overflow-hidden"
      style={{ "--i": 3 } as React.CSSProperties}
    >
      <div className="flex items-center gap-4 p-5 sm:p-6">
        <span className="grid size-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-brand/40 text-lg font-semibold tracking-tight text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25)]">
          GS
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold tracking-tight">{siteConfig.name}</p>
          <p className="truncate text-sm text-muted-foreground">
            {role} at <span className="text-foreground/90">{company}</span>
          </p>
        </div>
        <span className="hidden items-center gap-2 rounded-full bg-positive/10 px-3 py-1.5 text-xs font-medium text-positive sm:flex">
          <span className="relative flex size-1.5">
            <span className="ping-soft absolute inset-0 rounded-full bg-positive" />
            <span className="relative size-1.5 rounded-full bg-positive" />
          </span>
          Open to chat
        </span>
      </div>

      <dl className="grid grid-cols-3 border-y border-white/[0.05]">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`px-5 py-4 sm:px-6 ${i > 0 ? "border-l border-white/[0.05]" : ""}`}
          >
            <dt className="text-xs text-muted-foreground">{s.label}</dt>
            <dd className="mt-1 text-2xl font-semibold tracking-[-0.04em]">
              <CountUp value={s.value} />
              {s.suffix}
            </dd>
          </div>
        ))}
      </dl>

      <div className="flex gap-2 p-3">
        <Link
          href="/contact"
          className="pressable group flex flex-1 items-center justify-between rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background hover:bg-foreground/90"
        >
          Get in touch
          <ArrowRightIcon className="transition-transform duration-500 ease-spring group-hover:translate-x-0.5" />
        </Link>
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="pressable grid size-11 place-items-center rounded-full bg-secondary hover:bg-accent"
        >
          <GitHubLogoIcon className="size-4" />
        </a>
      </div>
    </section>
  );
}
