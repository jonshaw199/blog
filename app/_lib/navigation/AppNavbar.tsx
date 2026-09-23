import Link from "next/link";
import { createServerClient } from "@/blog/_lib/supabase/client/server";
import AppNavbarClient from "@/_lib/navigation/AppNavbarClient";
import { signOut } from "@/_lib/navigation/actions";

export default async function AppNavbar() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAuthenticated = Boolean(user);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/78 backdrop-blur-xl dark:border-white/10 dark:bg-black/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/blog"
            className="flex items-center gap-3 self-start rounded-2xl transition-opacity hover:opacity-85"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-950 text-sm font-semibold tracking-[0.24em] text-white dark:bg-white dark:text-zinc-950">
              JB
            </span>

            <span className="flex min-w-0 flex-col">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                Writing Studio
              </span>
              <span className="truncate text-base font-semibold text-zinc-950 dark:text-zinc-50">
                Jon Blog
              </span>
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 sm:justify-end">
            <AppNavbarClient isAuthenticated={isAuthenticated} />

            <div className="flex items-center gap-2 rounded-full border border-black/5 bg-white/75 p-1 text-sm text-zinc-600 shadow-[0_1px_0_rgba(255,255,255,0.7)_inset] dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
              {user?.email ? (
                <span className="px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                  {user.email}
                </span>
              ) : null}

              {isAuthenticated ? (
                <form action={signOut}>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full px-4 py-2 font-medium text-zinc-700 transition-colors duration-200 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-200 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    Sign out
                  </button>
                </form>
              ) : (
                <Link
                  href="/auth/login"
                  className="inline-flex items-center justify-center rounded-full px-4 py-2 font-medium text-zinc-700 transition-colors duration-200 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-200 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
