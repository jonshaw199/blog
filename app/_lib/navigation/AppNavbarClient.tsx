"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { getModeToggleState } from "@/_lib/navigation/routeState";

const THEME_EVENT = "themechange";

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function getThemeSnapshot() {
  if (typeof document === "undefined") return "light";

  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function subscribeTheme(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);

  return () => window.removeEventListener(THEME_EVENT, callback);
}

function setTheme(theme: "light" | "dark") {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
  localStorage.setItem("theme", theme);
  window.dispatchEvent(new Event(THEME_EVENT));
}

function useTheme() {
  return useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => "light");
}

function SegmentButton({
  href,
  label,
  active,
  onClick,
}: {
  href?: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  const className = classes(
    "inline-flex min-w-24 items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
    active
      ? "bg-accent text-white shadow-[0_10px_24px_rgba(37,99,235,0.28)]"
      : "text-muted hover:bg-black/5 hover:text-foreground dark:hover:bg-white/8",
  );

  if (href) {
    return (
      <Link href={href} aria-current={active ? "page" : undefined} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <button type="button" aria-pressed={active} onClick={onClick} className={className}>
      {label}
    </button>
  );
}

function ThemeToggle() {
  const theme = useTheme();

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        Theme
      </span>

      <nav
        aria-label="Theme"
        className="flex flex-wrap items-center gap-2 rounded-full border border-border bg-surface/85 p-1 shadow-[0_1px_0_rgba(255,255,255,0.45)_inset] backdrop-blur"
      >
        <SegmentButton label="Light" active={theme === "light"} onClick={() => setTheme("light")} />
        <SegmentButton label="Dark" active={theme === "dark"} onClick={() => setTheme("dark")} />
      </nav>
    </div>
  );
}

export default function AppNavbarClient({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const pathname = usePathname();
  const modeToggle = getModeToggleState(pathname, isAuthenticated);

  if (!modeToggle) return <ThemeToggle />;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        View
      </span>

      <nav
        aria-label="View mode"
        className="flex flex-wrap items-center gap-2 rounded-full border border-border bg-surface/85 p-1 shadow-[0_1px_0_rgba(255,255,255,0.45)_inset] backdrop-blur"
      >
        {modeToggle.options.map((option) => (
          <SegmentButton key={option.href} {...option} />
        ))}
      </nav>

      <ThemeToggle />
    </div>
  );
}