"use server";

import { createClient } from "@/lib/supabase/server";

// ============ CHATS (menu C) ============
export async function listChats() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("chats")
    .select("*")
    .order("created_at", { ascending: true });
  return data || [];
}

// ============ MUSIC (menu D) ============
export async function listMusic() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("music")
    .select("*")
    .order("created_at", { ascending: true });
  return data || [];
}

// ============ MUSEUM (menu E) ============
export async function listMuseum() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("museum")
    .select("*")
    .order("created_at", { ascending: true });
  return data || [];
}

// ============ LOVELY (menu F) ============
export async function listLovely() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("lovely")
    .select("*")
    .order("created_at", { ascending: true });
  return data || [];
}

// ============ CERTIFICATES (menu G) ============
export async function listCertificates() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("certificates")
    .select("*")
    .order("created_at", { ascending: true });
  return data || [];
}
