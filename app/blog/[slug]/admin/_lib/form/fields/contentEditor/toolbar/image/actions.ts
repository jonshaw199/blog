"use server";

import { createServerClient } from "@/blog/_lib/supabase/client/server";
import { Tables } from "@/blog/_lib/supabase/database";

export type MediaWithUrl = {
  media: Tables<"media">;
  url: string;
};

function createStoragePath(fileName: string) {
  const trimmedFileName = fileName.trim();
  const extensionMatch = trimmedFileName.match(/\.([^.]+)$/);
  const extension = extensionMatch?.[1]?.toLowerCase() ?? "";
  const baseName = extensionMatch
    ? trimmedFileName.slice(0, -(extension.length + 1))
    : trimmedFileName;

  const sanitizedBaseName = baseName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  const uniqueSuffix = crypto.randomUUID();
  const fileStem = sanitizedBaseName || "upload";

  return `${fileStem}-${uniqueSuffix}${extension ? `.${extension}` : ""}`;
}

export async function uploadMedia({
  file,
  width,
  height,
}: {
  file: File;
  width: number;
  height: number;
}): Promise<MediaWithUrl> {
  const supabase = await createServerClient();

  if (!file || file.size === 0) {
    throw new Error("No file provided");
  }

  const bucket = "media";
  const path = createStoragePath(file.name);

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
      display_name: file.name,
      mime_type: file.type,
      alt_text: "",
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
}): Promise<MediaWithUrl[]> {
  const supabase = await createServerClient();

  let query = supabase
    .from("media")
    .select()
    .order("created_at", { ascending: false })
    .limit(25);

  const trimmedKeyword = keyword.trim();
  if (trimmedKeyword) {
    query = query.or(
      `display_name.ilike.%${trimmedKeyword}%,alt_text.ilike.%${trimmedKeyword}%,path.ilike.%${trimmedKeyword}%,caption.ilike.%${trimmedKeyword}%`,
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

export async function updateMediaMetadata({
  mediaId,
  displayName,
  altText,
  caption,
}: {
  mediaId: number;
  displayName: string;
  altText: string;
  caption: string;
}): Promise<Tables<"media">> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("media")
    .update({
      display_name: displayName.trim(),
      alt_text: altText.trim(),
      caption: caption.trim() || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", mediaId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
