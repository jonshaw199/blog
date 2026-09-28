import Link from "next/link";
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
      <Link
        href="/blog/admin/new"
        className="inline-flex w-fit items-center justify-center rounded-lg border border-transparent bg-accent px-6 py-2 font-medium text-white transition-colors duration-200 hover:opacity-90"
      >
        New post
      </Link>

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
