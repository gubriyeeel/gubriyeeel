import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostsFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);
  return post;
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return posts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostsFromParams(params);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="w-fullpy-6">
      <h2>{post.title}</h2>
      <div className="flex flex-col gap-4 text-neutral-300">
        {post.description ? <p>{post.description}</p> : null}
        <MDXContent code={post.body} />
      </div>
    </article>
  );
}
