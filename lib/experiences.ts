import { z } from "zod";

const experienceSchema = z.object({
  companyName: z.string(),
  position: z.string(),
  year: z.string(),
  tech: z.array(z.string()),
});

export type Experience = z.infer<typeof experienceSchema>;

export async function getExperiences() {
  return [
    {
      companyName: "Prosple",
      position: "Frontend Engineer (Senior Individual Contributor)",
      year: "2025-03-30",
      tech: ["React", "Next.js", "GraphQL", "TypeScript", "AWS", "Docker"],
    },
    {
      companyName: "Reelist8",
      position: "Software Engineer",
      year: "2024-06-01",
      tech: ["Next.js", "Django"],
    },
    {
      companyName: "creatix7",
      position: "Lead Software Engineer",
      year: "2023-05-01",
      tech: ["Next.js", "Bun", "Express", "Drizzle"],
    },
    {
      companyName: "Level 9 Virtual",
      position: "Web Application Developer",
      year: "2023-02-01",
      tech: ["React", "Wordpress", "Elementor"],
    },
  ];
}
