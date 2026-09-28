import Button from "@/_lib/button/Button";
import FieldContainer from "@/_lib/form/fields/FieldContainer";
import { MediaWithUrl } from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/actions";
import { FormEvent, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

export type UploadConfirmationFormValues = {
  displayName: string;
  altText: string;
  caption: string;
};

export default function UploadConfirmation({
  uploadedMedia,
  onSubmit,
}: {
  uploadedMedia: MediaWithUrl;
  onSubmit: (values: UploadConfirmationFormValues) => void | Promise<void>;
}) {
  const { media, url } = uploadedMedia;

  const form = useForm<UploadConfirmationFormValues>({
    defaultValues: {
      displayName: media.display_name,
      altText: media.alt_text,
      caption: media.caption ?? "",
    },
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    reset({
      displayName: media.display_name,
      altText: media.alt_text,
      caption: media.caption ?? "",
    });
  }, [uploadedMedia, reset]);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    void handleSubmit(onSubmit)(event);
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-3" onSubmit={handleFormSubmit}>
        <div className="flex items-start gap-3 rounded-xl border border-border bg-surface p-3">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded bg-black/5 dark:bg-white/8">
            <img
              src={url}
              alt={media.alt_text}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-foreground">
              {media.display_name}
            </p>
            <p className="truncate text-sm text-muted">{media.path}</p>
            <p className="text-xs text-muted">{media.mime_type}</p>
          </div>
        </div>

        <FieldContainer label="Display name">
          <input
            {...register("displayName")}
            disabled={isSubmitting}
            className="rounded-lg border border-border bg-surface px-4 py-2 text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
          />
        </FieldContainer>

        <FieldContainer label="Alt text">
          <input
            {...register("altText")}
            disabled={isSubmitting}
            className="rounded-lg border border-border bg-surface px-4 py-2 text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
          />
        </FieldContainer>

        <FieldContainer label="Caption">
          <textarea
            {...register("caption")}
            rows={3}
            disabled={isSubmitting}
            className="rounded-lg border border-border bg-surface px-4 py-2 text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
          />
        </FieldContainer>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </form>
    </FormProvider>
  );
}
