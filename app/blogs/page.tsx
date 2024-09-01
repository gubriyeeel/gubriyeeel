import { posts } from "#site/content";
import PostItem from "@/components/post-item";
import { sortPosts } from "@/lib/utils";

export default function BlogPage() {
  const sortedPosts = sortPosts(posts.filter((post) => post.published));

  return (
    <main>
      <h2>Blogs</h2>

      <div className="flex flex-col gap-12">
        {sortedPosts.map((post) => (
          <PostItem key={post.slug} {...post} />
        ))}
      </div>
    </main>
  );
}