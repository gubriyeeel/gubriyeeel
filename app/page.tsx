import Project from "@/components/project";
import { getProjects } from "@/lib/projects";
import { posts } from "#site/content";
import { sortPosts } from "@/lib/utils";
import PostRow from "@/components/post-row";
import { getExperiences } from "@/lib/experiences";
import Experience from "@/components/experience";

/* eslint-disable react/no-unescaped-entities */
export default async function Home() {
  const sortedPosts = sortPosts(posts);
  const projects = await getProjects();
  const experiences = await getExperiences();
  return (
    <main>
      <p className="my-6 text-primary-foreground/80">
        <small className="text-neutral-500">
          /gŭb-riː-ˈjel/ — no meaning, it's from my actual name
        </small>
        <br />
        Hi there, I'm <strong>Gabriel</strong> aka <strong>gubriyeeel</strong>.
        I'm a front-end engineer for <strong>Reelist8</strong>. I enjoy{" "}
        <strong>psychology</strong> and playing with{" "}
        <strong>artificial intelligence</strong>. I attend to{" "}
        <strong>tech events</strong> and I'm a{" "}
        <strong>free software enthusiast</strong>.
      </p>

      <h2>Experiences</h2>

      <div className="flex flex-col gap-4">
        {experiences.map((experience) => (
          <Experience key={experience.companyName} experience={experience} />
        ))}
      </div>

      <h2>Projects</h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {/* Limits projects to show only 6 */}
        {projects.slice(0, 6).map((project) => (
          <Project key={project.repo} project={project} />
        ))}
      </div>

      <h2>Blogs</h2>

      <div className="flex flex-col gap-4">
        {sortedPosts.map((post) => (
          <PostRow key={post.slug} {...post} />
        ))}
      </div>
    </main>
  );
}
