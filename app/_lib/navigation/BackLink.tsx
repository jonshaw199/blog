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
      className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-zinc-600 transition-colors duration-200 hover:bg-white/70 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-zinc-100"
    >
      <span aria-hidden="true">&larr;</span>
      <span>{label}</span>
    </Link>
  );
}
