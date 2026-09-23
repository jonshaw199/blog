"use server";

import { createServerClient } from "@/blog/_lib/supabase/client/server";
import { redirect } from "next/navigation";

export async function signOut() {
  const supabase = await createServerClient();

  await supabase.auth.signOut();

  redirect("/blog");
}
