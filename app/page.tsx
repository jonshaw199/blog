import type { Metadata } from "next";
import Link from "next/link";
import RecoveryRedirectGuard from "@/_lib/auth/RecoveryRedirectGuard";

const siteUrl = new URL("https://jonshaw199.com");

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on software, systems, tools, and the occasional fun detour.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Jon Shaw | Blog",
    description: "Writing on software, systems, tools, and the occasional fun detour.",
    url: new URL("/blog", siteUrl),
    images: [
      {
        url: "/opengraph-image",
        width: 2400,
        height: 1260,
        alt: "Jon Shaw blog preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jon Shaw | Blog",
    description: "Writing on software, systems, tools, and the occasional fun detour.",
    images: ["/opengraph-image"],
  },
};

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center px-5 py-16 sm:px-8">
      <RecoveryRedirectGuard />
      <main className="w-full max-w-2xl border border-border bg-surface-strong px-6 py-10 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:px-8 lg:px-10">
        <p className="text-sm uppercase tracking-[0.22em] text-muted">Jon Shaw</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Notes, experiments, and the occasional fun detour.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
          Sometimes it&apos;s software, systems, and product thinking. Sometimes it&apos;s weird little problems,
          side projects, and the kinds of things that are only interesting because they happened to be in front of me.
        </p>

        <div className="mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center border border-border bg-foreground px-5 py-3 text-sm font-medium uppercase tracking-[0.18em] text-background transition-colors hover:bg-foreground/90"
          >
            Read the writing
          </Link>
        </div>
      </main>
    </div>
  );
}
