export default function Loading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center px-3 py-10">
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface/90 px-5 py-4 text-sm font-medium text-foreground shadow-[0_18px_50px_rgba(15,23,42,0.12)] backdrop-blur">
        <span aria-hidden="true" className="h-2.5 w-2.5 animate-pulse rounded-full bg-accent" />
        <span>Loading…</span>
      </div>
    </div>
  );
}
