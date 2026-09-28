import { Tables } from "@/blog/_lib/supabase/database";

export default function Post({ post }: { post: Tables<"posts"> }) {
  const content = (post.content ?? "")
    .replaceAll("&nbsp;", " ")
    .replaceAll("\u00A0", " ");

  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none w-full break-normal rounded-[2rem] border border-border bg-surface-strong p-6 text-foreground shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur [&_*]:max-w-full prose-headings:text-foreground prose-p:text-muted prose-a:text-accent prose-strong:text-foreground dark:prose-headings:text-foreground dark:prose-p:text-muted dark:prose-a:text-accent dark:prose-strong:text-foreground sm:p-8 lg:p-10">
      <h1 className="mb-8 text-center text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
        {post.title}
      </h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}
