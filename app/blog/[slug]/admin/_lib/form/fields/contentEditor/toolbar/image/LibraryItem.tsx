import Button from "@/_lib/button/Button";
import { MediaWithUrl } from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/actions";

export default function LibraryItem({
  mediaWithUrl,
  onSelect,
}: {
  mediaWithUrl: MediaWithUrl;
  onSelect: (mediaWithUrl: MediaWithUrl) => void;
}) {
  const { media, url } = mediaWithUrl;
  const title = media.display_name.trim();
  const dimensions =
    media.width && media.height
      ? `${media.width}x${media.height}`
      : "Unknown size";

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded bg-black/5 dark:bg-white/8">
        <img
          src={url}
          alt={media.alt_text}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-foreground">{title}</p>
        <p className="truncate text-sm text-muted">{media.path}</p>
        <p className="text-xs text-muted">
          {media.mime_type} · {dimensions}
        </p>
      </div>

      <Button primary onClick={() => onSelect(mediaWithUrl)}>
        Select
      </Button>
    </div>
  );
}
