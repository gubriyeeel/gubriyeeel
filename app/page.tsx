import type { Metadata } from "next";
import Project from "@/components/project";
import { getProjects } from "@/lib/projects";
import { posts } from "#site/content";
import { sortPosts } from "@/lib/utils";
import PostRow from "@/components/post-row";
import { getExperiences } from "@/lib/experiences";
import { RouteCard } from "@/components/route-card";
import { ExperiencePicker } from "@/components/experience-picker";
import { StackRadar } from "@/components/stack-radar";
import { CtaButton } from "@/components/cta-button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gubriyel | Software Engineer",
  description:
    "Gabriel Sufrir is a senior frontend engineer focused on Next.js, TypeScript, and product-focused web experiences.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: "Gabriel Sufrir | Frontend Engineer Portfolio",
    description:
      "Senior frontend engineer focused on Next.js, TypeScript, and product-focused web experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Sufrir | Frontend Engineer Portfolio",
    description:
      "Senior frontend engineer focused on Next.js, TypeScript, and product-focused web experiences.",
  },
};

/* eslint-disable react/no-unescaped-entities */
export default async function Home() {
  const sortedPosts = sortPosts(posts.filter((post) => post.published));
  const projects = await getProjects();
  const experiences = await getExperiences();
  const since = Math.min(
    ...experiences.map((e) => new Date(e.year).getFullYear()),
  );

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    sameAs: [siteConfig.links.linkedin, siteConfig.links.github],
    jobTitle: "Senior Frontend Engineer",
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      <section className="mb-8 mt-12">
        <p className="enter text-muted-foreground" style={{ "--i": 1 } as React.CSSProperties}>
          Mabuhay
        </p>
        <h1 className="enter mt-1" style={{ "--i": 1.5 } as React.CSSProperties}>
          Hi, I'm Gab.
        </h1>
        <p
          className="enter mt-4 max-w-prose leading-relaxed text-muted-foreground"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          <small className="text-muted-foreground/60">
            /gub-ri-yeel/ - no meaning, it's from my actual name
          </small>
          <br />
          I'm a <span className="text-foreground">senior frontend engineer</span>.
          Beside coding, I enjoy{" "}
          <span className="text-foreground">psychology</span> and trying out{" "}
          <span className="text-foreground">new technologies</span>. I live in
          the <span className="text-foreground">terminal</span> and I sometimes
          attend <span className="text-foreground">tech events</span>.
        </p>
      </section>

      <div className="flex flex-col gap-4">
        <RouteCard
          from={{ code: "FIG", name: "Figma" }}
          to={{ code: "PRD", name: "Production" }}
          since={since}
          roles={experiences.length}
          projects={projects.length}
        />
        <ExperiencePicker experiences={experiences} />
      </div>

      <div className="mt-16">
        <StackRadar experiences={experiences} />
      </div>

      <div className="mt-12 flex items-end justify-between">
        <h2 className="m-0 text-3xl tracking-[-0.035em]">Projects</h2>
        <a href="/projects" className="link-underline text-sm text-muted-foreground">
          See all
        </a>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {projects.slice(0, 4).map((project, i) => (
          <Project key={project.repo} project={project} index={i} />
        ))}
      </div>

      <h2 className="mb-3 mt-14 text-3xl tracking-[-0.035em]">Writing</h2>
      <div className="-mx-5 flex flex-col">
        {sortedPosts.map((post, i) => (
          <PostRow key={post.slug} {...post} index={i} />
        ))}
      </div>

      <CtaButton
        href="/contact"
        label="Get in touch"
        hint="open to work"
        className="mt-14"
      />
    </main>
  );
}
