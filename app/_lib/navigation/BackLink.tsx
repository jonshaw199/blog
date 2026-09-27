import Link from "next/link";

export default function BackLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface/75 px-3 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:border-accent/30 hover:bg-black/5 hover:text-foreground dark:hover:bg-white/8 dark:hover:text-foreground"
    >
      <span aria-hidden="true">&larr;</span>
      <span>{label}</span>
    </Link>
  );
}
