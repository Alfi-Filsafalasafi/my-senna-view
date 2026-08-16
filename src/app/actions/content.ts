"use server";

import { createClient } from "@/lib/supabase/server";

export async function getSiteContent() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_content")
    .select("*")
    .eq("id", 1)
    .single();
  return data;
}
