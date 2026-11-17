import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export function SectionTitle({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="text-sm text-muted-foreground">{eyebrow}</p>
        ) : null}
        <h2 className="m-0 mt-1 text-3xl tracking-[-0.035em]">{title}</h2>
      </div>
      {action ? (
        <Link
          href={action.href}
          className="pressable group flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-muted-foreground hover:bg-card hover:text-foreground"
        >
          {action.label}
          <ArrowRightIcon className="size-3.5 transition-transform duration-500 ease-spring group-hover:translate-x-0.5" />
        </Link>
      ) : null}
    </div>
  );
}
