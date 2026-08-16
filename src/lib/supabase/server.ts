import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Client Supabase untuk dipakai di server (Server Component / Server Action).
// PENTING: project ini read-only — jangan pernah panggil insert/update/delete/upload
// lewat client ini, walaupun secara teknis anon key-nya bisa. Cukup pakai .select().
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // dipanggil dari Server Component — abaikan, sudah ditangani middleware/action
          }
        },
      },
    },
  );
}
