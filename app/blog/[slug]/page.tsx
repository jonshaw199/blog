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

  return <Post post={post} />;
}
