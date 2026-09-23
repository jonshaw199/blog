"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getModeToggleState } from "@/_lib/navigation/routeState";

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function ToggleOption({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={classes(
        "inline-flex min-w-24 items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
        active
          ? "bg-zinc-950 text-white hover:bg-zinc-950 hover:text-white"
          : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950",
      )}
    >
      {label}
    </Link>
  );
}

export default function AppNavbarClient({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const pathname = usePathname();
  const modeToggle = getModeToggleState(pathname, isAuthenticated);

  if (!modeToggle) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
        View
      </span>

      <nav
        aria-label="View mode"
        className="flex flex-wrap items-center gap-2 rounded-full border border-black/5 bg-white/75 p-1 shadow-[0_1px_0_rgba(255,255,255,0.7)_inset] dark:border-white/10 dark:bg-white/5"
      >
        {modeToggle.options.map((option) => (
          <ToggleOption key={option.href} {...option} />
        ))}
      </nav>
    </div>
  );
}
