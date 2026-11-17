import type { Metadata } from "next";
import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/date";
import { siteConfig } from "@/lib/site";

interface PostPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

type PostParams = Awaited<PostPageProps["params"]>;

async function getPostsFromParams(params: PostParams) {
  const slug = params?.slug.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);
  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostsFromParams(await params);

  if (!post || !post.published) {
    return {
      title: "Post not found",
    };
  }

  const url = `${siteConfig.url}/blogs/${post.slugAsParams}`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: {
      canonical: `/blogs/${post.slugAsParams}`,
    },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: new Date(post.date).toISOString(),
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export async function generateStaticParams(): Promise<PostParams[]> {
  return posts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostsFromParams(await params);

  if (!post || !post.published) {
    notFound();
  }

  const postUrl = `${siteConfig.url}/blogs/${post.slugAsParams}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
    },
    mainEntityOfPage: postUrl,
    url: postUrl,
    keywords: post.tags?.join(", "),
  };

  return (
    <article className="w-full pb-6 pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <time
        dateTime={post.date}
        className="enter block text-sm text-muted-foreground"
      >
        {formatDate(post.date)}
      </time>
      <h1
        className="enter mt-2 text-3xl sm:text-4xl"
        style={{ "--i": 1 } as React.CSSProperties}
      >
        {post.title}
      </h1>
      {post.description ? (
        <p
          className="enter mt-4 text-lg text-muted-foreground"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          {post.description}
        </p>
      ) : null}
      <div
        className="enter prose prose-invert mt-10 max-w-none prose-headings:tracking-tight prose-a:text-brand prose-pre:rounded-2xl prose-pre:border prose-pre:border-white/[0.06] prose-pre:bg-card"
        style={{ "--i": 3 } as React.CSSProperties}
      >
        <MDXContent code={post.body} />
      </div>
    </article>
  );
}
