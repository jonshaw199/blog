import { Tables } from "@/blog/_lib/supabase/database";

export default function Post({ post }: { post: Tables<"posts"> }) {
  return (
    <article className="prose max-w-none break-words p-1 w-full [&_*]:max-w-full">
      <h1 className="text-6xl text-zinc-500 text-center">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content ?? "" }} />
    </article>
  );
}
