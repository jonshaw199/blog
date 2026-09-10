import { createBrowserClient } from "@/blog/_lib/supabase/client/browser";

export async function index({ searchStr }: { searchStr?: string }) {
  const supabase = createBrowserClient();

  let query = supabase.from("tags").select();
  if (searchStr) {
    query = query.ilike("name", `%${searchStr}%`);
  }
  const { data, error } = await query.order("name").limit(25);

  if (error) throw error;

  return data;
}
