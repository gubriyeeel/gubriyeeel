import { z } from "zod";

const projectSchema = z.object({
  repo: z.string(),
  link: z.string(),
  description: z.string(),
});

export type Project = z.infer<typeof projectSchema>;

export async function getProjects() {
  return [
    {
      repo: "kainly",
      link: "https://github.com/gubriyeeel/kainly-web",
      description: "A calorie tracking app for every Juan",
    },
    {
      repo: "detectify",
      link: "https://github.com/gubriyeeel/detectify",
      description: "Camera monitoring app for detecting objects",
    },
    {
      repo: "gubriyeeel",
      link: "https://github.com/gubriyeeel/gubriyeeel",
      description: "Simple boring portfolio website",
    },
    {
      repo: "finance-app",
      link: "https://github.com/gubriyeeel/pwa-finance-app",
      description: "Finance app for tracking expenses and income",
    },
    {
      repo: "socket-next",
      link: "https://github.com/gubriyeeel/socket-next",
      description: "Chat app with socket.io and next.js",
    },
    {
      repo: "dev-finder",
      link: "https://github.com/gubriyeeel/dev-finder",
      description: "Social network for finding developers",
    },
    {
      repo: "personal-ollama-bot",
      link: "https://github.com/gubriyeeel/personal-ollama-bot",
      description: "Local ollama bot user interface",
    },
  ];
}
