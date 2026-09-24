import { createServerClient } from "@/blog/_lib/supabase/client/server";

export async function getPostBySlug(slug: string) {
  const supabase = await createServerClient();

  return supabase
    .from("posts")
    .select(
      `
      *,
      thumbnail:media (*),
      post_tags (
        tag:tags (*)
      )
    `,
    )
    .eq("slug", slug)
    .single();
}
