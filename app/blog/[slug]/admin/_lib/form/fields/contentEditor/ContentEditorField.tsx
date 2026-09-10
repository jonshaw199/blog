import dynamic from "next/dynamic";
import { useFormContext } from "react-hook-form";
import "react-quill-new/dist/quill.snow.css";

import { PostFormValues } from "@/blog/[slug]/admin/_lib/schema";
import FieldContainer from "@/_lib/form/fields/FieldContainer";
import { uploadImage } from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/utils";
import { useState } from "react";
import ImageActionsModal from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/ImageActions";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

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

  const content = watch("content");

  return (
    <FieldContainer label="Content">
      <ReactQuill
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
              //image: uploadImage,
              image: () => setShowModal(true),
            },
          },
        }}
      />
      {showModal && <ImageActionsModal onClose={() => setShowModal(false)} />}
    </FieldContainer>
  );
}
