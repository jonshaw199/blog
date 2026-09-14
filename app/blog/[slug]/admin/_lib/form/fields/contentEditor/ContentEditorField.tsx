import dynamic from "next/dynamic";
import { useFormContext } from "react-hook-form";
import "react-quill-new/dist/quill.snow.css";

import { PostFormValues } from "@/blog/[slug]/admin/_lib/schema";
import FieldContainer from "@/_lib/form/fields/FieldContainer";
import { ComponentProps, RefObject, useRef, useState } from "react";
import ImageActionsModal from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/ImageActionsModal";
import ReactQuill from "react-quill-new";
import { uploadImage } from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/utils";
import { UploadMediaResult } from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/actions";

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
  const [uploadMediaResult, setUploadMediaResult] =
    useState<UploadMediaResult | null>(null);

  const content = watch("content");

  const handleUpload = async () => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    const result = await uploadImage();
    setUploadMediaResult(result);
    // if (!result) return;

    // const {url, media} = result;
    // const range = editor.getSelection(true);
    // editor.insertEmbed(range.index, "image", url, "user");
    // editor.setSelection(range.index + 1, 0, "silent");
  };

  const handleUploadConfirmation = () => {};

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
          onUpload={handleUpload}
          onUploadConfirmation={handleUploadConfirmation}
          uploadMediaResult={uploadMediaResult}
        />
      )}
    </FieldContainer>
  );
}
