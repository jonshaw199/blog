import BackLink from "@/_lib/navigation/BackLink";
import PostForm from "@/blog/[slug]/admin/_lib/form/PostForm";
import { getPostBySlug } from "@/blog/[slug]/_lib/post";

export default async function BlogPostAdmin({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: post } = await getPostBySlug(slug);

  return (
    <div className="flex flex-col gap-6">
      <BackLink href="/blog/admin" label="Back to posts" />
      <PostForm
        post={post}
        slug={post?.slug ?? slug}
        tags={post?.post_tags.map(({ tag }) => tag) ?? []}
      />
    </div>
  );
}
