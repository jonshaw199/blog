import PostCard from "@/blog/_lib/PostCard";
import { getFallbackThumbnail, getPosts } from "@/blog/_lib/posts";

export default async function BlogAdmin() {
  const { data: posts } = await getPosts({
    publishedOnly: false,
    orderBy: "created_at",
  });
  const { data: fallbackThumbnail } = await getFallbackThumbnail();

  return (
    <div className="flex flex-col gap-3">
      {posts?.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          fallbackThumbnail={fallbackThumbnail}
          href={`/blog/${post.slug}/admin`}
          showStatus
        />
      ))}
    </div>
  );
}
