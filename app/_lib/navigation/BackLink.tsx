"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

export default function BackLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => {
        if (pathname === href || isPending) return;

        startTransition(() => {
          router.push(href);
        });
      }}
      aria-busy={isPending || undefined}
      disabled={isPending || pathname === href}
      className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface/75 px-3 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:border-accent/30 hover:bg-black/5 hover:text-foreground disabled:opacity-80 dark:hover:bg-white/8 dark:hover:text-foreground"
    >
      <span aria-hidden="true">&larr;</span>
      <span>{isPending ? "Loading..." : label}</span>
    </button>
  );
}
