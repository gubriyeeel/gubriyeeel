import { AnimatedText } from "@/components/animated-name";
import Project from "@/components/project";

import { getProjects } from "@/lib/projects";

export default async function Projects() {
  const projects = await getProjects();

  return (
    <div>
      <h2>
        <AnimatedText name="Projects" username="Quests" />
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <Project key={project.repo} project={project} />
        ))}
      </div>
    </div>
  );
}
