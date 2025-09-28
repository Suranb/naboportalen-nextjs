import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  // Get profile data
  const { data: profile } = await supabase
    .from("profiles")
    .select("*, subdomains(*)")
    .eq("id", user.id)
    .single();

  return {
    ...user,
    profile,
  };
}

export async function requireAuth(redirectTo: string = "/auth/signin") {
  const user = await getCurrentUser();

  if (!user) {
    redirect(redirectTo);
  }

  return user;
}

export async function requireSubdomainAccess(subdomainId: string) {
  const user = await requireAuth();

  if (!user.profile || user.profile.subdomain_id !== subdomainId) {
    redirect("/unauthorized");
  }

  return user;
}
