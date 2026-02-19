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
  description,
}: PostRowProps) {
  const normalizedSlug = slugAsParams ?? slug.replace(/^blogs\//, "");
  const postHref = `/blogs/${normalizedSlug}`;

  return (
    <article className="flex flex-col gap-2">
      <Link href={postHref}>
        <span className="text-lg font-semibold text-neutral-300 underline decoration-neutral-600 underline-offset-4 hover:decoration-neutral-500">
          {title}
        </span>
      </Link>

      <div className="flex justify-between">
        <span>{description}</span>

        <button>
          <span>-&gt;</span>
        </button>
      </div>

      <span className="text-sm text-neutral-500">{formatDate(date)}</span>
    </article>
  );
}
