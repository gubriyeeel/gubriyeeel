import type { Metadata } from "next";
import Project from "@/components/project";
import { getProjects } from "@/lib/projects";
import { posts } from "#site/content";
import { sortPosts } from "@/lib/utils";
import PostRow from "@/components/post-row";
import { SectionTitle } from "@/components/section-title";
import { getExperiences } from "@/lib/experiences";
import { ExperienceList } from "@/components/experience-list";
import { Reveal } from "@/components/motion/reveal";
import { CtaButton } from "@/components/cta-button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gubriyel | Software Engineer",
  description:
    "Gabriel Sufrir is a frontend engineer at Prosple who builds interfaces around how people actually think, drawing on psychology and a full-stack background.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: "Gabriel Sufrir | Frontend Engineer Portfolio",
    description:
      "Frontend engineer building interfaces around how people actually think.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Sufrir | Frontend Engineer Portfolio",
    description:
      "Frontend engineer building interfaces around how people actually think.",
  },
};

/* eslint-disable react/no-unescaped-entities */
export default async function Home() {
  const sortedPosts = sortPosts(posts.filter((post) => post.published));
  const projects = await getProjects();
  const experiences = await getExperiences();

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    sameAs: [siteConfig.links.linkedin, siteConfig.links.github],
    jobTitle: "Frontend Specialist Engineer",
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

      <section className="mb-8 mt-10">
        <h1
          className="enter"
          style={{ "--i": 1.5 } as React.CSSProperties}
        >
          I build frontends for how people actually think.
        </h1>
        <p
          className="enter mt-4 max-w-prose leading-relaxed text-muted-foreground"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          <small className="text-muted-foreground/60">
            /gub-ri-yeel/ - no meaning, it's from my actual name
          </small>
          <br />
          I'm Gab, a{" "}
          <span className="text-foreground">frontend engineer</span> at Prosple.
          I came up through the full stack, so I know what sits behind the UI,
          but I stay at the front because that's where the people are. I study{" "}
          <span className="text-foreground">psychology</span> to understand why
          someone hesitates, misclicks or gives up, then I build to{" "}
          <span className="text-foreground">remove that moment</span>.
        </p>
      </section>

      <Reveal as="section" className="mt-6">
        <SectionTitle title="Experience" />
        <ExperienceList experiences={experiences} />
      </Reveal>

      <Reveal as="section" className="mt-16">
        <SectionTitle
          title="Case studies"
          action={{ href: "/projects", label: "See all" }}
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {projects.slice(0, 4).map((project) => (
            <Project key={project.slug} project={project} />
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="mt-16">
        <SectionTitle
          title="Writing"
          action={{ href: "/blogs", label: "All posts" }}
        />
        <div className="-mx-4 flex flex-col sm:-mx-5">
          {sortedPosts.slice(0, 3).map((post) => (
            <PostRow key={post.slug} {...post} />
          ))}
        </div>
      </Reveal>

      <Reveal>
        <CtaButton
          href="/contact"
          label="Get in touch"
          hint="open to work"
          className="mt-16"
        />
      </Reveal>
    </main>
  );
}
