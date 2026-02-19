import type { Experience } from "@/lib/experiences";

type ExperienceProps = {
  experience: Experience;
};

export default function Experience({ experience }: ExperienceProps) {
  const { companyName, position, year, tech } = experience;

  return (
    <div className="flex w-full flex-col space-y-2">
      <div>
        <span className="font-medium underline decoration-neutral-500 underline-offset-4 transition-colors hover:decoration-neutral-400">
          {companyName}
        </span>

        <div className="flex justify-between text-sm text-neutral-500">
          <span>{position}</span>
          <span>{year}</span>
        </div>
      </div>

      <div className="flex gap-2">
        {tech.map((t) => (
          <span className="text-xs" key={t}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
