import PostPreview from "@/blog/_lib/PostPreview";
import { createServerClient } from "@/blog/_lib/supabase/client/server";

export default async function Blog() {
  const supabase = await createServerClient();

  const { data: posts } = await supabase.from("posts").select(`
    *,
    thumbnail:media(*),
    post_tags(
      tags(*)
    )
  `);

  const { data: fallbackThumbnail } = await supabase
    .from("media")
    .select()
    .eq("path", "no_image_available.jpg")
    .single();

  return (
    <>
      {posts?.map((post) => (
        <PostPreview
          key={post.id}
          post={post}
          thumbnail={post.thumbnail ?? fallbackThumbnail}
          tags={post.post_tags.map(({ tags }) => tags)}
        />
      ))}
    </>
  );
}
