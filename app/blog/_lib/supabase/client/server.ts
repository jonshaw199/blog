import { Database } from "@/blog/_lib/supabase/database";
import {
  createBrowserClient as _createBrowserClient,
  createServerClient as _createServerClient,
} from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const createServerClient = async (
  cookieStore?: Awaited<ReturnType<typeof cookies>>,
) => {
  if (!cookieStore) {
    cookieStore = await cookies();
  }

  return _createServerClient<Database>(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
};
