import { createBrowserClient } from "@/blog/_lib/supabase/client/browser";

export async function create(name: string) {
  const supabase = createBrowserClient();

  const { data, error } = await supabase
    .from("tags")
    .insert({ name })
    .select()
    .single();

  if (error) throw error;

  return data;
}
