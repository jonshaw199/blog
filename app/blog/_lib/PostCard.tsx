import { formatDate } from "@/blog/_lib/date";
import { getPublicUrl } from "@/blog/_lib/media";
import { PostListItem } from "@/blog/_lib/posts";
import { Tables } from "@/blog/_lib/supabase/database";
import { createServerClient } from "@/blog/_lib/supabase/client/server";
import Image from "next/image";
import Link from "next/link";

async function Thumbnail({ thumbnail }: { thumbnail: Tables<"media"> }) {
  const supabase = await createServerClient();

  const thumbnailUrl = getPublicUrl(supabase, thumbnail);

  return (
    <Image
      src={thumbnailUrl}
      alt={thumbnail.alt_text}
      fill
      className="object-cover transition-transform duration-300 group-hover:scale-105"
    />
  );
}

function Tag({ tag }: { tag: Tables<"tags"> }) {
  const color = tag.color ?? "#3b82f6";

  return (
    <span
      className="
        rounded-full
        border
        px-3
        py-1
        text-xs
        font-semibold
        transition-all
        duration-200
        group-hover:scale-105
      "
      style={{
        color,
        borderColor: color,
        backgroundColor: `${color}20`,
      }}
    >
      {tag.name}
    </span>
  );
}

function StatusBadge({ publishedAt }: { publishedAt: string | null }) {
  const isPublished = Boolean(publishedAt);

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold ${isPublished ? "border-emerald-600 text-emerald-700" : "border-amber-600 text-amber-700"}`}
    >
      {isPublished ? "Published" : "Draft"}
    </span>
  );
}

export default async function PostCard({
  post,
  fallbackThumbnail,
  href,
  showStatus = false,
}: {
  post: PostListItem;
  fallbackThumbnail: Tables<"media"> | null;
  href: string;
  showStatus?: boolean;
}) {
  const thumbnail = post.thumbnail ?? fallbackThumbnail;
  const tags = post.post_tags.map(({ tags: tag }) => tag);

  return (
    <Link
      href={href}
      className="group flex flex-col gap-4 rounded-[1.5rem] border border-border bg-surface/85 p-3 text-foreground shadow-[0_18px_60px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-1 hover:border-accent/30 hover:bg-surface-strong hover:shadow-[0_24px_80px_rgba(15,23,42,0.12)] active:scale-[0.98] md:flex-row md:items-stretch"
    >
      <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-lg md:h-[clamp(8rem,25vw,16rem)] md:w-[clamp(8rem,25vw,16rem)] md:self-center">
        {thumbnail && <Thumbnail thumbnail={thumbnail} />}
      </div>

      <div className="grid flex-1 grid-rows-[auto_1fr_auto] gap-3 md:grid-rows-[1fr_2fr_1fr] md:gap-0">
        <div className="flex items-start justify-between gap-3">
          <span className="text-sm text-muted transition-colors group-hover:text-foreground/80">
            {post.published_at
              ? formatDate(post.published_at)
              : "Not published"}
          </span>

          {showStatus ? <StatusBadge publishedAt={post.published_at} /> : null}
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight">
            {post.title}
          </h2>

          <p className="mt-2 text-muted transition-colors group-hover:text-foreground/80">
            {post.description}
          </p>
        </div>

        <div className="flex items-end gap-2">
          {tags.map((tag) => (
            <Tag key={tag.id} tag={tag} />
          ))}
        </div>
      </div>
    </Link>
  );
}
