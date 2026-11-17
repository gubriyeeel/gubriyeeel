import { formatDate } from "@/lib/date";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";

type PostRowProps = {
  title: string;
  date: string;
  slug: string;
  slugAsParams?: string;
  description?: string;
  index?: number;
  showDescription?: boolean;
};

export default function PostRow({
  title,
  date,
  slug,
  slugAsParams,
  description,
  index = 0,
  showDescription = false,
}: PostRowProps) {
  const normalizedSlug = slugAsParams ?? slug.replace(/^blogs\//, "");

  return (
    <Link
      href={`/blogs/${normalizedSlug}`}
      className="pressable enter group flex items-center gap-4 rounded-[1.5rem] px-4 py-4 hover:bg-card sm:px-5"
      style={{ "--i": index } as React.CSSProperties}
    >
      <div className="min-w-0 flex-1">
        <p className="font-medium tracking-tight">{title}</p>
        {showDescription && description ? (
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
        <p className="mt-1 text-sm text-muted-foreground/70">
          <time dateTime={date}>{formatDate(date)}</time>
        </p>
      </div>
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary/0 text-muted-foreground transition-all duration-500 ease-spring group-hover:bg-secondary group-hover:text-foreground">
        <ArrowRightIcon className="size-4 transition-transform duration-500 ease-spring group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
