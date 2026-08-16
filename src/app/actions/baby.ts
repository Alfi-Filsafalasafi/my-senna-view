"use server";

import { createClient } from "@/lib/supabase/server";

// Tabel "baby": 1 baris tetap (id = 1)
// kolom: notes (jsonb -> array 4 string: [mata, hidung, bibir, pipi])
// Foto TIDAK disimpan di sini — foto statis, lihat components/BabyDots.tsx

export async function getBabyNotes(): Promise<string[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("baby")
    .select("notes")
    .eq("id", 1)
    .single();
  return data?.notes || [];
}
