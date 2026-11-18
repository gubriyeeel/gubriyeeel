import type { Project as ProjectType, ProjectStatus } from "@/lib/projects";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const statusDot: Record<ProjectStatus, string> = {
  Live: "bg-emerald-400",
  Prototype: "bg-amber-400",
  "In development": "bg-sky-400",
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

type ProjectProps = {
  project: ProjectType;
  index?: number;
};

export default function Project({ project, index = 0 }: ProjectProps) {
  const { slug, name, tagline, kind, status } = project;

  return (
    <Link
      href={`/projects/${slug}`}
      className="surface spotlight pressable enter group flex min-h-44 flex-col justify-between p-5 hover:-translate-y-0.5 hover:border-white/[0.12]"
      style={{ "--i": index } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-3">
        <StatusChip status={status} />
        <ArrowRightIcon className="size-5 text-muted-foreground transition-all duration-500 ease-spring group-hover:translate-x-0.5 group-hover:text-foreground" />
      </div>
      <div className="mt-6">
        <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground/70">
          {kind}
        </p>
        <p className="mt-1 text-lg font-semibold tracking-tight">{name}</p>
        <p className="mt-1 text-sm text-muted-foreground">{tagline}</p>
      </div>
    </Link>
  );
}
