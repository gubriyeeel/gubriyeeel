import type { Project } from "@/lib/projects";
import Link from "next/link";

type ProjectProps = {
  project: Project;
};

export default function Project({ project }: ProjectProps) {
  const { repo: name, description, link } = project;

  return (
    <div className="flex w-full flex-col">
      <Link href={link}>
        <span className="font-medium underline decoration-neutral-500 underline-offset-4 transition-colors hover:decoration-neutral-400">
          {name}
        </span>
      </Link>

      <span className="pt-3 text-sm text-neutral-400">{description}</span>
    </div>
  );
}
