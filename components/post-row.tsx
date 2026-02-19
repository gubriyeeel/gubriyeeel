import { formatDate } from "@/lib/date";
import Link from "next/link";

type PostRowProps = {
  title: string;
  date: string;
  slug: string;
  slugAsParams?: string;
  description?: string;
};

export default function PostRow({
  title,
  date,
  slug,
  slugAsParams,
}: PostRowProps) {
  const normalizedSlug = slugAsParams ?? slug.replace(/^blogs\//, "");
  const postHref = `/blogs/${normalizedSlug}`;

  return (
    <article className="flex flex-row justify-between">
      <Link href={postHref}>
        <span className="font-medium lowercase underline decoration-neutral-500 underline-offset-4 transition-colors hover:decoration-neutral-400">
          {title}
        </span>
      </Link>

      <span className="text-sm text-neutral-500">{formatDate(date)}</span>
    </article>
  );
}
