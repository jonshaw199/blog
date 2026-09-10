import FieldContainer from "@/_lib/form/fields/FieldContainer";
import { LoginFormValues } from "@/auth/login/_lib/form/schema";
import { useFormContext } from "react-hook-form";

export default function EmailField() {
  const { register } = useFormContext<LoginFormValues>();

  return (
    <FieldContainer label="Email">
      <input
        {...register("email", { required: true })}
        required
        className="w-full rounded-lg border px-4 py-2"
        type="email"
      />
    </FieldContainer>
  );
}
