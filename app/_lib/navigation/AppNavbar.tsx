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
    <header className="sticky top-0 z-50 border-b border-border bg-surface/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/blog"
            className="flex items-center gap-3 self-start rounded-2xl transition-opacity hover:opacity-85"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-sm font-semibold tracking-[0.24em] text-white shadow-[0_10px_24px_rgba(37,99,235,0.24)]">
              JS
            </span>

            <span className="flex min-w-0 flex-col">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-muted">
                Writing Studio
              </span>
              <span className="truncate text-base font-semibold text-foreground">
                Jon&apos;s Blog
              </span>
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 sm:justify-end">
            <AppNavbarClient isAuthenticated={isAuthenticated} />

            <div className="flex items-center gap-2 rounded-full border border-border bg-surface/75 p-1 text-sm text-muted shadow-[0_1px_0_rgba(255,255,255,0.45)_inset] backdrop-blur">
              {user?.email ? (
                <span className="px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-muted">
                  {user.email}
                </span>
              ) : null}

              {isAuthenticated ? (
                <form action={signOut}>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full px-4 py-2 font-medium text-foreground transition-colors duration-200 hover:bg-black/5 dark:hover:bg-white/10"
                  >
                    Sign out
                  </button>
                </form>
              ) : (
                <Link
                  href="/auth/login"
                  className="inline-flex items-center justify-center rounded-full px-4 py-2 font-medium text-foreground transition-colors duration-200 hover:bg-black/5 dark:hover:bg-white/10"
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
