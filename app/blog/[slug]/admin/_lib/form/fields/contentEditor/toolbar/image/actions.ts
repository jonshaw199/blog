"use server";

import { createServerClient } from "@/blog/_lib/supabase/client/server";
import { Tables } from "@/blog/_lib/supabase/database";

export type UploadMediaResult = {
  media: Tables<"media">;
  url: string;
};

export async function uploadMedia({
  file,
  width,
  height,
}: {
  file: File;
  width: number;
  height: number;
}): Promise<UploadMediaResult> {
  const supabase = await createServerClient();

  if (!file || file.size === 0) {
    throw new Error("No file provided");
  }

  const bucket = "media";
  const extension = file.name.split(".").pop();
  const path = `${crypto.randomUUID()}${extension ? `.${extension}` : ""}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data: media, error: mediaError } = await supabase
    .from("media")
    .insert({
      bucket,
      path,
      mime_type: file.type,
      alt_text: file.name,
      width,
      height,
    })
    .select()
    .single();

  if (mediaError) {
    await supabase.storage.from(bucket).remove([path]);
    throw new Error(mediaError.message);
  }

  return {
    media,
    url: supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl,
  };
}

export async function searchImage({
  keyword,
}: {
  keyword: string;
}): Promise<UploadMediaResult[]> {
  const supabase = await createServerClient();

  let query = supabase
    .from("media")
    .select()
    .order("created_at", { ascending: false })
    .limit(25);

  const trimmedKeyword = keyword.trim();
  if (trimmedKeyword) {
    query = query.or(
      `alt_text.ilike.%${trimmedKeyword}%,path.ilike.%${trimmedKeyword}%,caption.ilike.%${trimmedKeyword}%`,
    );
  }

  const { data, error } = await query;
  if (error) {
    throw new Error(error.message);
  }

  return data.map((media) => ({
    media,
    url: supabase.storage.from(media.bucket).getPublicUrl(media.path).data
      .publicUrl,
  }));
}
