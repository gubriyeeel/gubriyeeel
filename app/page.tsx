import type { Metadata } from "next";
import Project from "@/components/project";
import { getProjects } from "@/lib/projects";
import { posts } from "#site/content";
import { sortPosts } from "@/lib/utils";
import PostRow from "@/components/post-row";
import { getExperiences } from "@/lib/experiences";
import Experience from "@/components/experience";
import { AnimatedText } from "@/components/animated-name";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Frontend Engineer Portfolio",
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
  const sortedPosts = sortPosts(posts);
  const projects = await getProjects();
  const experiences = await getExperiences();

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    sameAs: [siteConfig.links.linkedin],
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

      <p className="my-6 font-light leading-relaxed text-primary-foreground/80">
        <small className="text-neutral-500">
          /gub-ri-yeel/ - no meaning, it's from my actual name
        </small>
        <br />
        Hi there, I'm <span className="font-medium">Gab</span>. I'm a senior
        frontend engineer specialist. Beside coding, I enjoy{" "}
        <span className="font-medium">psychology</span> and trying out{" "}
        <span className="font-medium">new technologies</span>. I live in the{" "}
        <span className="font-medium">terminal</span> and I sometimes attend{" "}
        <span className="font-medium">tech events</span>.
      </p>

      <h2>
        <AnimatedText name="Experiences" username="Employment Escapades" />
      </h2>

      <div className="flex flex-col gap-4">
        {experiences.map((experience) => (
          <Experience key={experience.companyName} experience={experience} />
        ))}
      </div>

      <h2>
        <AnimatedText name="Projects" username="Quests" />
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {projects.slice(0, 6).map((project) => (
          <Project key={project.repo} project={project} />
        ))}
      </div>

      <h2>
        <AnimatedText name="Blogs" username="Blabber Logs" />
      </h2>

      <div className="flex flex-col gap-4">
        {sortedPosts.map((post) => (
          <PostRow key={post.slug} {...post} />
        ))}
      </div>
    </main>
  );
}
