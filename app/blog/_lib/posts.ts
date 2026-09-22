import { createServerClient } from "@/blog/_lib/supabase/client/server";

export type PostListItem = {
  id: number;
  slug: string;
  title: string | null;
  description: string | null;
  published_at: string | null;
  created_at: string;
  thumbnail: {
    alt_text: string;
    bucket: string;
    caption: string | null;
    created_at: string;
    display_name: string;
    duration_ms: number | null;
    height: number | null;
    id: number;
    mime_type: string;
    path: string;
    updated_at: string | null;
    width: number | null;
  } | null;
  post_tags: {
    tags: {
      id: number;
      name: string;
      color: string | null;
      created_at: string;
      updated_at: string | null;
    };
  }[];
};

type GetPostsOptions = {
  publishedOnly?: boolean;
  orderBy?: "published_at" | "created_at";
};

export async function getPosts({
  publishedOnly = true,
  orderBy = "published_at",
}: GetPostsOptions = {}) {
  const supabase = await createServerClient();

  let query = supabase.from("posts").select(`
    *,
    thumbnail:media(*),
    post_tags(
      tags(*)
    )
  `);

  if (publishedOnly) {
    query = query.not("published_at", "is", null);
  }

  return query.order(orderBy, { ascending: false });
}

export async function getFallbackThumbnail() {
  const supabase = await createServerClient();

  return supabase
    .from("media")
    .select()
    .eq("path", "no_image_available.jpg")
    .single();
}
