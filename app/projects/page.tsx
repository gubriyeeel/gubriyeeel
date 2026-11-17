import type { Metadata } from "next";
import Project from "@/components/project";
import { getProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";
import { CtaButton } from "@/components/cta-button";

export const metadata: Metadata = {
  title: "Projects",
  description: "Side projects and experiments by Gabriel Sufrir.",
  alternates: { canonical: "/projects" },
};

export default async function Projects() {
  const projects = await getProjects();

  return (
    <main>
      <section className="mb-8 mt-12">
        <h1 className="enter" style={{ "--i": 1 } as React.CSSProperties}>
          Things I&apos;ve built.
        </h1>
      </section>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Project key={project.repo} project={project} index={i + 2} />
        ))}
      </div>

      <CtaButton
        href={siteConfig.links.github}
        external
        label="More on GitHub"
        hint="@gubriyeeel"
        className="mt-12"
      />
    </main>
  );
}
