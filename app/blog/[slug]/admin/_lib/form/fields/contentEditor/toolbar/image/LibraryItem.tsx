import Button from "@/_lib/button/Button";
import { UploadMediaResult } from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/actions";

export default function LibraryItem({
  item,
  onSelect,
}: {
  item: UploadMediaResult;
  onSelect?: (item: UploadMediaResult) => void;
}) {
  const { media, url } = item;
  const dimensions =
    media.width && media.height
      ? `${media.width}x${media.height}`
      : "Unknown size";

  return (
    <div className="flex items-center gap-3 rounded-lg border p-3">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded bg-zinc-100">
        <img
          src={url}
          alt={media.alt_text}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-zinc-900">{media.alt_text}</p>
        <p className="truncate text-sm text-zinc-600">{media.path}</p>
        <p className="text-xs text-zinc-500">
          {media.mime_type} · {dimensions}
        </p>
      </div>

      <Button primary onClick={() => onSelect?.(item)}>
        Select
      </Button>
    </div>
  );
}
