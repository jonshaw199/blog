import { Database } from "@/blog/_lib/supabase/database";
import { createBrowserClient as _createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const createBrowserClient = () =>
  _createBrowserClient<Database>(supabaseUrl!, supabaseKey!);
