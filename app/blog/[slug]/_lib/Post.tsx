import { Tables } from "@/blog/_lib/supabase/database";

export default function Post({ post }: { post: Tables<"posts"> }) {
  return (
    <article className="prose p-1">
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content ?? "" }} />
    </article>
  );
}
