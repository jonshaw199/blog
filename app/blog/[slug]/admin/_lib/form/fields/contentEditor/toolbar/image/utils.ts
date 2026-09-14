import {
  uploadMedia,
  UploadMediaResult,
} from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/actions";

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

export function uploadImage(): Promise<UploadMediaResult | null> {
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
        const result = await uploadMedia({ file, width, height });
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };
    input.click();
  });
}
