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
    <article className="w-full py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <h1>{post.title}</h1>
      <div className="flex flex-col gap-4 text-neutral-300">
        <time dateTime={post.date} className="text-sm text-neutral-500">
          {formatDate(post.date)}
        </time>
        {post.description ? <p>{post.description}</p> : null}
        <MDXContent code={post.body} />
      </div>
    </article>
  );
}
