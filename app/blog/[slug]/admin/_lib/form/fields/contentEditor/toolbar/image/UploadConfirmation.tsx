import Button from "@/_lib/button/Button";
import FieldContainer from "@/_lib/form/fields/FieldContainer";
import { MediaWithUrl } from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/actions";
import { useEffect } from "react";
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

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-start gap-3 rounded-lg border p-3">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded bg-zinc-100">
            <img
              src={url}
              alt={media.alt_text}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-zinc-900">
              {media.display_name}
            </p>
            <p className="truncate text-sm text-zinc-600">{media.path}</p>
            <p className="text-xs text-zinc-500">{media.mime_type}</p>
          </div>
        </div>

        <FieldContainer label="Display name">
          <input
            {...register("displayName")}
            disabled={isSubmitting}
            className="rounded-lg border px-4 py-2"
          />
        </FieldContainer>

        <FieldContainer label="Alt text">
          <input
            {...register("altText")}
            disabled={isSubmitting}
            className="rounded-lg border px-4 py-2"
          />
        </FieldContainer>

        <FieldContainer label="Caption">
          <textarea
            {...register("caption")}
            rows={3}
            disabled={isSubmitting}
            className="rounded-lg border px-4 py-2"
          />
        </FieldContainer>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </form>
    </FormProvider>
  );
}
