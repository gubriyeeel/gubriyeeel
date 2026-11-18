import type { Project as ProjectType, ProjectStatus } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const statusDot: Record<ProjectStatus, string> = {
  Live: "bg-emerald-400",
  Prototype: "bg-amber-400",
  "In development": "bg-sky-400",
  Completed: "bg-zinc-400",
};

export function StatusChip({ status }: { status: ProjectStatus }) {
  return (
    <span className="chip">
      <span
        aria-hidden
        className={cn("size-1.5 rounded-full", statusDot[status])}
      />
      {status}
    </span>
  );
}

/**
 * The visual half of a case study. A screenshot when there is one, otherwise
 * the decision that defined the project, set large on the project's tint.
 */
export function ProjectCover({
  project,
  priority = false,
  className,
}: {
  project: ProjectType;
  priority?: boolean;
  className?: string;
}) {
  const { accent, image, name, decisions } = project;

  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden rounded-[calc(var(--radius)-0.5rem)] border border-white/[0.06] bg-background",
        className,
      )}
      style={{
        backgroundImage: `radial-gradient(120% 90% at 0% 0%, ${accent}33, transparent 60%), radial-gradient(80% 80% at 100% 100%, ${accent}1a, transparent 70%)`,
      }}
    >
      {/* faint grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      {image ? (
        <Image
          src={image}
          alt={`${name} screenshot`}
          width={1440}
          height={900}
          priority={priority}
          sizes="(min-width: 640px) 560px, 100vw"
          className="absolute left-[8%] top-[12%] w-[92%] rounded-tl-xl border-l border-t border-white/10 shadow-[0_20px_60px_-15px_rgb(0_0_0/0.8)] transition-transform duration-700 ease-spring group-hover:-translate-y-1"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
          <p
            className="text-xs font-medium uppercase tracking-[0.12em]"
            style={{ color: accent }}
          >
            Key decision
          </p>
          <p className="mt-2 max-w-[18ch] text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-4xl">
            {decisions[0]?.title}
          </p>
        </div>
      )}
    </div>
  );
}

type ProjectProps = {
  project: ProjectType;
  index?: number;
  priority?: boolean;
  className?: string;
};

export default function Project({
  project,
  index = 0,
  priority,
  className,
}: ProjectProps) {
  const { slug, name, tagline, status, year } = project;

  return (
    <Link
      href={`/projects/${slug}`}
      className={cn(
        "surface spotlight pressable group flex w-full flex-col gap-5 p-3 hover:border-white/[0.12]",
        className,
      )}
      style={{ "--i": index } as React.CSSProperties}
    >
      <ProjectCover project={project} priority={priority} />
      <div className="flex items-end justify-between gap-4 px-2 pb-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <StatusChip status={status} />
            <span className="text-sm text-muted-foreground/70">{year}</span>
          </div>
          <p className="mt-3 text-xl font-semibold tracking-tight">{name}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {tagline}
          </p>
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-muted-foreground transition-colors group-hover:text-foreground">
          <ArrowRightIcon className="size-4 transition-transform duration-500 ease-spring group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
