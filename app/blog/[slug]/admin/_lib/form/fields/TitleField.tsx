import { useFormContext } from "react-hook-form";
import { PostFormValues } from "@/blog/[slug]/admin/_lib/schema";
import FieldContainer from "@/_lib/form/fields/FieldContainer";

export default function TitleField() {
  const { register } = useFormContext<PostFormValues>();

  return (
    <FieldContainer label="Title">
      <input
        {...register("title", { required: true })}
        required
        className="w-full rounded-lg border px-4 py-2"
      />
    </FieldContainer>
  );
}
