import {
  MediaWithUrl,
  uploadMedia,
} from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/actions";
import { Quill } from "react-quill-new";

function getImageDimensions(
  file: File,
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error("Could not read image dimensions"));
    };
    img.src = URL.createObjectURL(file);
  });
}

export function uploadImage(): Promise<MediaWithUrl | null> {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) {
        resolve(null);
        return;
      }
      try {
        const { width, height } = await getImageDimensions(file);
        const mediaWithUrl = await uploadMedia({ file, width, height });
        resolve(mediaWithUrl);
      } catch (error) {
        reject(error);
      }
    };
    input.click();
  });
}

export function addMediaToEditor(mediaUrl: string, editor: Quill) {
  const range = editor.getSelection(true);
  editor.insertEmbed(range.index, "image", mediaUrl, "user");
  editor.setSelection(range.index + 1, 0, "silent");
}
