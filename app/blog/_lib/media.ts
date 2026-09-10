import { SupabaseClient } from "@supabase/supabase-js";
import { Tables } from "@/blog/_lib/supabase/database";

export const getPublicUrl = (
  supabaseClient: SupabaseClient,
  media: Tables<"media">,
) =>
  supabaseClient.storage.from(media.bucket).getPublicUrl(media.path).data
    .publicUrl;
