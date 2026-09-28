import Button from "@/_lib/button/Button";
import FieldContainer from "@/_lib/form/fields/FieldContainer";
import LibraryItem from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/LibraryItem";
import {
  MediaWithUrl,
  searchImage,
} from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/actions";
import { useState } from "react";
import { useForm } from "react-hook-form";

type MediaLibrarySearchFormValues = {
  name: string;
};

export default function Library({
  onSelect,
}: {
  onSelect: (mediaWithUrl: MediaWithUrl) => void;
}) {
  const form = useForm<MediaLibrarySearchFormValues>();
  const [mediaResults, setMediaResults] = useState<MediaWithUrl[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async ({ name }: MediaLibrarySearchFormValues) => {
    setErrorMessage(null);

    try {
      const mediaResults = await searchImage({ keyword: name ?? "" });
      setMediaResults(mediaResults);
    } catch (error) {
      setMediaResults(null);
      setErrorMessage(error instanceof Error ? error.message : "Search failed");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-end gap-2">
        <FieldContainer label="Name">
          <input
            {...register("name")}
            disabled={isSubmitting}
            className="w-full max-w-50 rounded-lg border border-border bg-surface px-3 py-2 text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                void handleSubmit(onSubmit)();
              }
            }}
          />
        </FieldContainer>
        <Button
          disabled={isSubmitting}
          onClick={() => void handleSubmit(onSubmit)()}
        >
          {isSubmitting ? "Searching..." : "Search"}
        </Button>
      </div>

      {errorMessage ? (
        <p className="text-sm text-red-600">{errorMessage}</p>
      ) : null}

      {mediaResults ? (
        <div className="flex max-h-80 flex-col gap-2 overflow-auto">
          {mediaResults.length ? (
            mediaResults.map((mediaWithUrl) => (
              <LibraryItem
                key={mediaWithUrl.media.id}
                mediaWithUrl={mediaWithUrl}
                onSelect={onSelect}
              />
            ))
          ) : (
            <p className="p-2 text-sm text-muted">No results.</p>
          )}
        </div>
      ) : (
        <p className="p-2 text-sm text-muted">No results yet.</p>
      )}
    </div>
  );
}
