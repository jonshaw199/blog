import BackLink from "@/_lib/navigation/BackLink";
import { getPublicUrl } from "@/blog/_lib/media";
import { createServerClient } from "@/blog/_lib/supabase/client/server";
import PostForm from "@/blog/[slug]/admin/_lib/form/PostForm";
import { getPostBySlug } from "@/blog/[slug]/_lib/post";
import { notFound } from "next/navigation";

export default async function BlogPostAdmin({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createServerClient();

  const { data: post } = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <BackLink href="/blog/admin" label="Back to posts" />
      <PostForm
        post={post}
        slug={post.slug}
        tags={post.post_tags.map(({ tag }) => tag)}
        thumbnail={
          post.thumbnail
            ? {
                media: post.thumbnail,
                url: getPublicUrl(supabase, post.thumbnail),
              }
            : null
        }
      />
    </div>
  );
}
