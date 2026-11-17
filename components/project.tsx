import type { Project } from "@/lib/projects";
import Link from "next/link";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

type ProjectProps = {
  project: Project;
  index?: number;
};

export default function Project({ project, index = 0 }: ProjectProps) {
  const { repo: name, description, link } = project;

  return (
    <Link
      href={link}
      target="_blank"
      rel="noreferrer"
      className="surface spotlight pressable enter group flex min-h-36 flex-col justify-between p-5 hover:-translate-y-0.5 hover:border-white/[0.12]"
      style={{ "--i": index } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="chip">
          <svg
            viewBox="0 0 16 16"
            className="size-3"
            fill="currentColor"
            aria-hidden
          >
            <path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.72-.5.06-.49.06-.49.8.06 1.22.82 1.22.82.72 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.66 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0Z" />
          </svg>
          repo
        </span>
        <ArrowTopRightIcon className="size-5 text-muted-foreground transition-all duration-500 ease-spring group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
      </div>
      <div className="mt-6">
        <p className="text-lg font-semibold tracking-tight">{name}</p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}
