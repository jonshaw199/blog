import { useFormContext } from "react-hook-form";
import FieldContainer from "@/_lib/form/fields/FieldContainer";
import { PostFormValues } from "@/blog/[slug]/admin/_lib/schema";
import { Tables } from "@/blog/_lib/supabase/database";

export default function PublishField({
  publishedAt,
}: {
  publishedAt?: Tables<"posts">["published_at"];
}) {
  const { register } = useFormContext<PostFormValues>();

  const formattedDate =
    publishedAt &&
    new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(publishedAt));

  return (
    <FieldContainer label="Publish" className="flex items-center gap-2">
      <input {...register("isPublished")} type="checkbox" />
      {formattedDate}
    </FieldContainer>
  );
}
