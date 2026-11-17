import type { Metadata } from "next";
import Project from "@/components/project";
import { getProjects } from "@/lib/projects";
import { posts } from "#site/content";
import { sortPosts } from "@/lib/utils";
import PostRow from "@/components/post-row";
import { SectionTitle } from "@/components/section-title";
import { getExperiences } from "@/lib/experiences";
import { IntroCard } from "@/components/intro-card";
import { ExperienceList } from "@/components/experience-list";
import { Stack } from "@/components/stack";
import { Reveal } from "@/components/motion/reveal";
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

      <section className="mb-8 mt-10">
        <p
          className="enter text-muted-foreground"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          Mabuhay
        </p>
        <h1
          className="enter mt-1"
          style={{ "--i": 1.5 } as React.CSSProperties}
        >
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
          I'm a{" "}
          <span className="text-foreground">senior frontend engineer</span>.
          Beside coding, I enjoy{" "}
          <span className="text-foreground">psychology</span> and trying out{" "}
          <span className="text-foreground">new technologies</span>. I live in
          the <span className="text-foreground">terminal</span> and I sometimes
          attend <span className="text-foreground">tech events</span>.
        </p>
      </section>

      <IntroCard
        role="Senior Frontend Engineer"
        company={experiences[0].companyName}
        stats={[
          {
            value: new Date().getFullYear() - since,
            label: "Years shipping",
            suffix: "+",
          },
          { value: experiences.length, label: "Roles" },
          { value: projects.length, label: "Side projects" },
        ]}
      />

      <Reveal as="section" className="mt-16">
        <SectionTitle eyebrow="Where I've been" title="Experience" />
        <ExperienceList experiences={experiences} />
      </Reveal>

      <Reveal as="section" className="mt-16">
        <SectionTitle
          eyebrow="Dots show how many roles used it"
          title="Stack"
        />
        <Stack experiences={experiences} />
      </Reveal>

      <Reveal as="section" className="mt-16">
        <SectionTitle
          eyebrow="Side quests"
          title="Projects"
          action={{ href: "/projects", label: "See all" }}
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {projects.slice(0, 4).map((project) => (
            <Project key={project.repo} project={project} />
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="mt-16">
        <SectionTitle
          eyebrow="Blabber logs"
          title="Writing"
          action={{ href: "/blogs", label: "All posts" }}
        />
        <div className="-mx-5 flex flex-col">
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
