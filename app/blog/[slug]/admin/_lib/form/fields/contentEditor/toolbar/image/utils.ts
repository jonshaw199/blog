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
    let settled = false;

    const resolveOnce = (value: MediaWithUrl | null) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };

    const rejectOnce = (error: unknown) => {
      if (settled) return;
      settled = true;
      reject(error);
    };

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) {
        resolveOnce(null);
        return;
      }
      try {
        const { width, height } = await getImageDimensions(file);
        const mediaWithUrl = await uploadMedia({ file, width, height });
        resolveOnce(mediaWithUrl);
      } catch (error) {
        rejectOnce(error);
      }
    };

    const handleWindowFocus = () => {
      window.setTimeout(() => {
        if (!input.files?.length) {
          resolveOnce(null);
        }
      }, 0);
    };

    window.addEventListener("focus", handleWindowFocus, { once: true });
    input.click();
  });
}

export function addMediaToEditor(mediaUrl: string, editor: Quill) {
  const range = editor.getSelection(true);
  editor.insertEmbed(range.index, "image", mediaUrl, "user");
  editor.setSelection(range.index + 1, 0, "silent");
}
