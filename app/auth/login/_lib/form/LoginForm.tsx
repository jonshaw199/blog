"use client";

import { createBrowserClient } from "@/blog/_lib/supabase/client/browser";
import EmailField from "@/auth/login/_lib/form/fields/EmailField";
import PasswordField from "@/auth/login/_lib/form/fields/PasswordField";
import { LoginFormValues } from "@/auth/login/_lib/form/schema";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/_lib/button/Button";

export default function LoginForm() {
  const supabase = createBrowserClient();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    //resolver: zodResolver(postFormSchema),
    //defaultValues: {},
  });

  const { handleSubmit, setError } = form;

  const onSubmit = async (formValues: LoginFormValues) => {
    const { error } = await supabase.auth.signInWithPassword(formValues);

    if (error) {
      setError("root", {
        message: error.message,
      });
      return;
    }

    router.push("/blog");
    router.refresh();
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 p-1"
      >
        <EmailField />
        <PasswordField />
        <Button type="submit">Sign In</Button>
      </form>
    </FormProvider>
  );
}
