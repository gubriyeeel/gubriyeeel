import type { Experience } from "@/lib/experiences";

/** Tech used across roles, ranked, with a dot meter for how often. */
export function Stack({ experiences }: { experiences: Experience[] }) {
  const map = new Map<string, string[]>();
  for (const e of experiences)
    for (const t of e.tech) map.set(t, [...(map.get(t) ?? []), e.companyName]);
  const items = Array.from(map, ([name, places]) => ({ name, places })).sort(
    (a, b) => b.places.length - a.places.length || a.name.localeCompare(b.name),
  );
  const max = experiences.length;

  return (
    <ul className="flex flex-wrap gap-2">
      {items.map(({ name, places }) => (
        <li
          key={name}
          title={`Used at ${places.join(", ")}`}
          className="pressable group flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-card py-2 pl-4 pr-3 text-sm hover:-translate-y-0.5 hover:border-white/[0.14]"
        >
          <span className="font-medium">{name}</span>
          <span
            className="flex gap-0.5"
            aria-label={`${places.length} of ${max} roles`}
          >
            {Array.from({ length: max }, (_, i) => (
              <span
                key={i}
                className={
                  i < places.length
                    ? "size-1.5 rounded-full bg-highlight transition-transform duration-500 ease-spring group-hover:scale-125"
                    : "size-1.5 rounded-full bg-white/10"
                }
                style={{ transitionDelay: `${i * 40}ms` }}
              />
            ))}
          </span>
        </li>
      ))}
    </ul>
  );
}
