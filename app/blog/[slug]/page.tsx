import BackLink from "@/_lib/navigation/BackLink";
import Post from "@/blog/[slug]/_lib/Post";
import { getPostBySlug } from "@/blog/[slug]/_lib/post";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: post } = await getPostBySlug(slug);

  if (!post) return;

  return (
    <div className="flex flex-col gap-2">
      <BackLink href="/blog" label="Back to posts" />
      <Post post={post} />
    </div>
  );
}
