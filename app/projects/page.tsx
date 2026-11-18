import type { Metadata } from "next";
import Project from "@/components/project";
import { getProjects } from "@/lib/projects";
import { CtaButton } from "@/components/cta-button";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies by Gabriel Sufrir: the problem, what was built, the decisions behind it, and why it matters for the business.",
  alternates: { canonical: "/projects" },
};

export default async function Projects() {
  const projects = await getProjects();

  return (
    <main>
      <section className="mb-8 mt-12">
        <h1 className="enter" style={{ "--i": 1 } as React.CSSProperties}>
          Case studies.
        </h1>
        <p
          className="enter mt-4 max-w-prose text-muted-foreground"
          style={{ "--i": 1.5 } as React.CSSProperties}
        >
          The problem, what I built, the calls I made, and what each one is
          worth to the people paying for it.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Project key={project.slug} project={project} index={i + 2} />
        ))}
      </div>

      <CtaButton
        href="/contact"
        label="Have a problem like these?"
        hint="let's talk"
        className="mt-12"
      />
    </main>
  );
}
