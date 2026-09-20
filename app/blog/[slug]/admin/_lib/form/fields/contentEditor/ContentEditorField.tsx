import dynamic from "next/dynamic";
import { useFormContext } from "react-hook-form";
import "react-quill-new/dist/quill.snow.css";

import { PostFormValues } from "@/blog/[slug]/admin/_lib/schema";
import FieldContainer from "@/_lib/form/fields/FieldContainer";
import { ComponentProps, RefObject, useRef, useState } from "react";
import ImageActionsModal from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/ImageActionsModal";
import ReactQuill from "react-quill-new";
import {
  addMediaToEditor,
  uploadImage,
} from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/utils";
import {
  updateMediaMetadata,
  MediaWithUrl,
} from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/actions";
import { UploadConfirmationFormValues } from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/UploadConfirmation";

const ReactQuillComponent = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill-new");

    const Component = ({
      forwardedRef,
      ...props
    }: { forwardedRef: RefObject<ReactQuill | null> } & ComponentProps<
      typeof ReactQuill
    >) => <RQ ref={forwardedRef} {...props} />;

    Component.displayName = "ReactQuillComponent";
    return Component;
  },
  {
    ssr: false,
  },
);

ReactQuillComponent.displayName = "ReactQuillComponent";

const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ list: "ordered" }, { list: "bullet" }],
  ["link", "image"],
  ["clean"],
];

export default function ContentEditorField() {
  const { watch, setValue } = useFormContext<PostFormValues>();
  const [showModal, setShowModal] = useState(false);
  const quillRef = useRef<ReactQuill>(null);
  const [uploadedMedia, setUploadedMedia] = useState<MediaWithUrl | null>(null);

  const content = watch("content");

  const handleUpload = async () => {
    if (!quillRef.current?.getEditor()) return;

    const uploadedMedia = await uploadImage();
    setUploadedMedia(uploadedMedia);
  };

  const handleUploadConfirmation = async ({
    displayName,
    altText,
    caption,
  }: UploadConfirmationFormValues) => {
    if (!uploadedMedia) return;

    await updateMediaMetadata({
      mediaId: uploadedMedia.media.id,
      displayName,
      altText,
      caption,
    });

    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    addMediaToEditor(uploadedMedia.url, editor);
    setUploadedMedia(null);
    setShowModal(false);
  };

  const handleSelectLibraryItem = (uploadedMedia: MediaWithUrl) => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    addMediaToEditor(uploadedMedia.url, editor);
    setShowModal(false);
  };

  return (
    <FieldContainer label="Content">
      <ReactQuillComponent
        theme="snow"
        value={content}
        onChange={(html) =>
          setValue("content", html, {
            shouldDirty: true,
          })
        }
        modules={{
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: () => setShowModal(true),
            },
          },
        }}
        forwardedRef={quillRef}
      />
      {showModal && (
        <ImageActionsModal
          onClose={() => setShowModal(false)}
          onSelectLibraryItem={handleSelectLibraryItem}
          onUpload={handleUpload}
          onUploadConfirmation={handleUploadConfirmation}
          uploadedMedia={uploadedMedia}
        />
      )}
    </FieldContainer>
  );
}
