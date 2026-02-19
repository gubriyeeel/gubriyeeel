import type { Metadata } from "next";
import { posts } from "#site/content";
import { AnimatedText } from "@/components/animated-name";
import PostItem from "@/components/post-item";
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
      <h2>
        <AnimatedText name="Blogs" username="Blabber Logs" />
      </h2>

      <div className="flex flex-col gap-12">
        {sortedPosts.map((post) => (
          <PostItem key={post.slug} {...post} />
        ))}
      </div>
    </main>
  );
}
