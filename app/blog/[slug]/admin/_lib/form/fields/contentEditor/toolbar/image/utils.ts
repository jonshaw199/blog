import { uploadMedia } from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/actions";
import { createBrowserClient } from "@/blog/_lib/supabase/client/browser";
import Quill from "quill";

export async function uploadImage(this: { quill: Quill }) {
  const input = document.createElement("input");

  input.type = "file";
  input.accept = "image/*";
  input.click();

  input.onchange = async () => {
    const file = input.files?.[0];
    if (!file) return;

    const { url } = await uploadMedia(file);

    const range = this.quill.getSelection(true);

    this.quill.insertEmbed(range.index, "image", url, "user");
    this.quill.setSelection(range.index + 1, 0, "silent");
  };
}
