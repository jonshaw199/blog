"use server";

import { PostFormValues } from "@/blog/[slug]/admin/_lib/schema";
import { createServerClient } from "@/blog/_lib/supabase/client/server";
import { Tables } from "@/blog/_lib/supabase/database";
import { revalidatePath } from "next/cache";

export async function createPost(data: PostFormValues) {
  const supabase = await createServerClient();

  const { data: post, error } = await supabase
    .from("posts")
    .insert({
      slug: data.slug,
      title: data.title,
      description: data.description,
      content: data.content,
      published_at: data.isPublished ? new Date().toISOString() : null,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  if (data.tagIds.length > 0) {
    const { error: tagError } = await supabase.from("post_tags").insert(
      data.tagIds.map((id) => ({
        post_id: post.id,
        tag_id: id,
      })),
    );

    if (tagError) {
      throw tagError;
    }
  }

  revalidatePath("/blog");
  revalidatePath("/blog/admin");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath(`/blog/${post.slug}/admin`);

  return post;
}

export async function updatePost(post: Tables<"posts">, data: PostFormValues) {
  const supabase = await createServerClient();

  let publishedAt = undefined;
  if (data.isPublished && !post.published_at) {
    publishedAt = new Date().toISOString();
  }
  if (!data.isPublished && post.published_at) {
    publishedAt = null;
  }

  const { data: updatedPost, error } = await supabase
    .from("posts")
    .update({
      slug: data.slug,
      title: data.title,
      description: data.description,
      content: data.content,
      updated_at: new Date().toISOString(),
      published_at: publishedAt,
    })
    .eq("id", post.id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  const { data: existingPostTags, error: tagsError } = await supabase
    .from("post_tags")
    .select("tag_id")
    .eq("post_id", post.id);

  if (tagsError) {
    throw tagsError;
  }

  const existingTagIds = new Set(existingPostTags.map(({ tag_id }) => tag_id));

  const submittedTagIds = new Set(data.tagIds);

  const addedTagIds = data.tagIds.filter((tagId) => !existingTagIds.has(tagId));

  const removedTagIds = [...existingTagIds].filter(
    (tagId) => !submittedTagIds.has(tagId),
  );

  if (addedTagIds.length > 0) {
    const { error } = await supabase.from("post_tags").insert(
      addedTagIds.map((tagId) => ({
        post_id: post.id,
        tag_id: tagId,
      })),
    );

    if (error) {
      throw error;
    }
  }

  if (removedTagIds.length > 0) {
    const { error } = await supabase
      .from("post_tags")
      .delete()
      .eq("post_id", post.id)
      .in("tag_id", removedTagIds);

    if (error) {
      throw error;
    }
  }

  revalidatePath("/blog");
  revalidatePath("/blog/admin");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath(`/blog/${post.slug}/admin`);
  revalidatePath(`/blog/${updatedPost.slug}`);
  revalidatePath(`/blog/${updatedPost.slug}/admin`);

  return updatedPost;
}
