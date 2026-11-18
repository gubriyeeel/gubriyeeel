import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowTopRightIcon } from "@radix-ui/react-icons";
import { getProject, getProjects } from "@/lib/projects";
import { StatusChip } from "@/components/project";
import { CtaButton } from "@/components/cta-button";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const project = await getProject((await params).slug);
  if (!project) return { title: "Project not found" };

  return {
    title: `${project.name} case study`,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.name} case study`,
      description: project.tagline,
    },
  };
}

function Section({
  title,
  index,
  children,
}: {
  title: string;
  index: number;
  children: React.ReactNode;
}) {
  return (
    <section
      className="enter mt-12"
      style={{ "--i": index } as React.CSSProperties}
    >
      <h2 className="mb-4 mt-0">{title}</h2>
      {children}
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed text-muted-foreground">
          <span
            aria-hidden
            className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-brand"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const projects = await getProjects();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];

  if (!project) notFound();

  const nextProject = projects[(index + 1) % projects.length];

  return (
    <main className="pt-12">
      <Link
        href="/projects"
        className="enter group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeftIcon className="transition-transform duration-500 ease-spring group-hover:-translate-x-0.5" />
        All case studies
      </Link>

      <header className="mt-6">
        <div
          className="enter flex flex-wrap items-center gap-2"
          style={{ "--i": 0.5 } as React.CSSProperties}
        >
          <StatusChip status={project.status} />
          <span className="chip">{project.kind}</span>
          <span className="chip">{project.year}</span>
        </div>
        <h1
          className="enter mt-4"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          {project.name}
        </h1>
        <p
          className="enter mt-4 text-lg leading-relaxed text-muted-foreground"
          style={{ "--i": 1.5 } as React.CSSProperties}
        >
          {project.tagline}
        </p>

        <dl
          className="surface enter mt-8 grid grid-cols-1 gap-4 p-5 sm:grid-cols-2"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          <div>
            <dt className="text-sm text-muted-foreground">Role</dt>
            <dd className="mt-1 font-medium">{project.role}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Stack</dt>
            <dd className="mt-1 font-medium">{project.stack.join(", ")}</dd>
          </div>
          {project.url ? (
            <div className="sm:col-span-2">
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 font-medium text-brand hover:underline"
              >
                Visit {project.url.replace(/^https?:\/\/(www\.)?/, "")}
                <ArrowTopRightIcon className="transition-transform duration-500 ease-spring group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          ) : null}
        </dl>
      </header>

      <Section title="The problem" index={2.5}>
        <p className="leading-relaxed text-muted-foreground">
          {project.problem}
        </p>
      </Section>

      <Section title="What I built" index={3}>
        <List items={project.built} />
      </Section>

      <Section title="Decisions that mattered" index={3.5}>
        <div className="flex flex-col gap-3">
          {project.decisions.map((decision) => (
            <div key={decision.title} className="surface p-5">
              <p className="font-semibold tracking-tight">{decision.title}</p>
              <p className="mt-1 leading-relaxed text-muted-foreground">
                {decision.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Why it matters for the business" index={4}>
        <List items={project.business} />
      </Section>

      {project.next ? (
        <Section title="What's next" index={4.5}>
          <p className="leading-relaxed text-muted-foreground">
            {project.next}
          </p>
        </Section>
      ) : null}

      <CtaButton
        href={`/projects/${nextProject.slug}`}
        label={nextProject.name}
        hint="next case study"
        className="mt-16"
      />
    </main>
  );
}
