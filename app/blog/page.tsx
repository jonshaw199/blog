import PostCard from "@/blog/_lib/PostCard";
import { getFallbackThumbnail, getPosts } from "@/blog/_lib/posts";

export default async function Blog() {
  const { data: posts } = await getPosts();
  const { data: fallbackThumbnail } = await getFallbackThumbnail();

  return (
    <div className="flex flex-col gap-3">
      {posts?.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          fallbackThumbnail={fallbackThumbnail}
          href={`/blog/${post.slug}`}
        />
      ))}
    </div>
  );
}
