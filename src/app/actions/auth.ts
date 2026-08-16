"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

// Sengaja pakai cookie name yang beda dari admin (senna_session), biar
// session admin & session view gak nyampur/ke-share kalau device sama.
const SESSION_COOKIE = "senna_view_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 hari

export async function verifyPin(
  pin: string,
): Promise<{ success: boolean }> {
  const supabase = await createClient();

  // Cuma SELECT ke site_content (tabel & kolom sama dgn project admin) —
  // tidak ada insert/update/delete di project view ini.
  const { data, error } = await supabase
    .from("site_content")
    .select("pin")
    .eq("id", 1)
    .single();

  if (error || !data || data.pin !== pin) {
    return { success: false };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "unlocked", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  return { success: true };
}

export async function checkSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value === "unlocked";
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
