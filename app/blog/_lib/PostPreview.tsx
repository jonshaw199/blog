import { Tables } from "@/blog/_lib/supabase/database";
import { getPublicUrl } from "@/blog/_lib/media";
import Image from "next/image";
import { formatDate } from "@/blog/_lib/date";
import Link from "next/link";
import { createServerClient } from "@/blog/_lib/supabase/client/server";

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
  const color = tag.color ?? "#3b82f6"; // fallback blue

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

export default async function PostPreview({
  post,
  thumbnail,
  tags,
}: {
  post: Tables<"posts">;
  thumbnail: Tables<"media"> | null;
  tags: Tables<"tags">[] | null;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="
    group
    flex
    gap-4
    rounded-xl
    p-3
    transition-all
    duration-200

    bg-white
    text-zinc-900

    hover:bg-zinc-800
    hover:text-white
    hover:-translate-y-1
    hover:shadow-xl

    dark:bg-zinc-900
    dark:text-zinc-100

    dark:hover:bg-white
    dark:hover:text-zinc-900

    active:scale-[0.98]
  "
    >
      <div className="relative h-[clamp(8rem,25vw,16rem)] w-[clamp(8rem,25vw,16rem)] shrink-0 overflow-hidden rounded-lg">
        {thumbnail && <Thumbnail thumbnail={thumbnail} />}
      </div>

      <div className="grid flex-1 grid-rows-[1fr_2fr_1fr]">
        <div className="flex items-start">
          <span className="text-sm text-zinc-500 transition-colors group-hover:text-zinc-300 dark:text-zinc-400 dark:group-hover:text-zinc-600">
            {formatDate(post.published_at)}
          </span>
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold leading-tight">{post.title}</h2>

          <p className="mt-2 text-zinc-600 transition-colors group-hover:text-zinc-300 dark:text-zinc-400 dark:group-hover:text-zinc-600">
            {post.description}
          </p>
        </div>

        <div className="flex items-end gap-2">
          {tags?.map((t) => (
            <Tag key={t.id} tag={t} />
          ))}
        </div>
      </div>
    </Link>
  );
}
