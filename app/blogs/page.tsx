import type { Metadata } from "next";
import { posts } from "#site/content";
import PostRow from "@/components/post-row";
import { sortPosts } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Frontend engineering notes on Next.js, TypeScript, content systems, and practical product development.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/blogs`,
    title: "Blog",
    description:
      "Frontend engineering notes on Next.js, TypeScript, content systems, and practical product development.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description:
      "Frontend engineering notes on Next.js, TypeScript, content systems, and practical product development.",
  },
};

export default function BlogPage() {
  const sortedPosts = sortPosts(posts.filter((post) => post.published));

  return (
    <main>
      <section className="mb-6 mt-12">
        <h1 className="enter" style={{ "--i": 1 } as React.CSSProperties}>
          Notes on building for people.
        </h1>
      </section>

      <div className="-mx-4 flex flex-col gap-1 sm:-mx-5">
        {sortedPosts.map((post, i) => (
          <PostRow key={post.slug} {...post} index={i + 2} showDescription />
        ))}
      </div>
    </main>
  );
}
