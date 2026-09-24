"use client";

import Button from "@/_lib/button/Button";
import FieldContainer from "@/_lib/form/fields/FieldContainer";
import ImageActionsModal from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/ImageActionsModal";
import {
  MediaWithUrl,
  updateMediaMetadata,
} from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/actions";
import { uploadImage } from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/utils";
import { UploadConfirmationFormValues } from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/UploadConfirmation";
import { PostFormValues } from "@/blog/[slug]/admin/_lib/schema";
import Image from "next/image";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function ThumbnailField({
  initialThumbnail,
}: {
  initialThumbnail: MediaWithUrl | null;
}) {
  const { setValue } = useFormContext<PostFormValues>();
  const [showModal, setShowModal] = useState(false);
  const [selectedThumbnail, setSelectedThumbnail] =
    useState<MediaWithUrl | null>(initialThumbnail);
  const [uploadedMedia, setUploadedMedia] = useState<MediaWithUrl | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    setUploadedMedia(null);
    setIsUploading(true);

    try {
      const media = await uploadImage();
      setUploadedMedia(media);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadConfirmation = async ({
    displayName,
    altText,
    caption,
  }: UploadConfirmationFormValues) => {
    if (!uploadedMedia) return;

    const media = await updateMediaMetadata({
      mediaId: uploadedMedia.media.id,
      displayName,
      altText,
      caption,
    });

    const nextThumbnail = {
      media,
      url: uploadedMedia.url,
    };

    setSelectedThumbnail(nextThumbnail);
    setValue("thumbnailId", media.id, { shouldDirty: true });
    setUploadedMedia(null);
    setShowModal(false);
  };

  const handleSelectLibraryItem = (mediaWithUrl: MediaWithUrl) => {
    setSelectedThumbnail(mediaWithUrl);
    setValue("thumbnailId", mediaWithUrl.media.id, { shouldDirty: true });
    setUploadedMedia(null);
    setShowModal(false);
  };

  const handleRemove = () => {
    setSelectedThumbnail(null);
    setUploadedMedia(null);
    setValue("thumbnailId", null, { shouldDirty: true });
  };

  return (
    <FieldContainer label="Thumbnail" className="flex flex-col gap-3">
      {selectedThumbnail ? (
        <div className="flex items-start gap-3 rounded-lg border p-3">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded bg-zinc-100">
            <Image
              src={selectedThumbnail.url}
              alt={selectedThumbnail.media.alt_text}
              width={96}
              height={96}
              sizes="96px"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-zinc-900">
              {selectedThumbnail.media.display_name}
            </p>
            <p className="truncate text-sm text-zinc-600">
              {selectedThumbnail.media.path}
            </p>
            <p className="text-xs text-zinc-500">
              {selectedThumbnail.media.mime_type}
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-4 text-sm text-zinc-500">
          No thumbnail selected.
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={() => setShowModal(true)}>
          {selectedThumbnail ? "Change thumbnail" : "Choose thumbnail"}
        </Button>

        {selectedThumbnail ? (
          <Button onClick={handleRemove}>Remove</Button>
        ) : null}
      </div>

      {showModal ? (
        <ImageActionsModal
          onClose={() => setShowModal(false)}
          onCloseUploadConfirmation={() => setUploadedMedia(null)}
          onSelectLibraryItem={handleSelectLibraryItem}
          onUpload={() => void handleUpload()}
          onUploadConfirmation={handleUploadConfirmation}
          uploadedMedia={uploadedMedia}
          isUploading={isUploading}
        />
      ) : null}
    </FieldContainer>
  );
}
