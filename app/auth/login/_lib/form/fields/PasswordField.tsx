import FieldContainer from "@/_lib/form/fields/FieldContainer";
import { LoginFormValues } from "@/auth/login/_lib/form/schema";
import { useFormContext } from "react-hook-form";

export default function PasswordField() {
  const { register } = useFormContext<LoginFormValues>();

  return (
    <FieldContainer label="Password">
      <input
        {...register("password", { required: true })}
        required
        className="w-full rounded-lg border px-4 py-2"
        type="password"
      />
    </FieldContainer>
  );
}
