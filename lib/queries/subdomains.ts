import { createClient } from "@/lib/supabase/server";
import { Database } from "@/lib/supabase/database.types";

type SubdomainData = Database["public"]["Tables"]["subdomains"]["Row"];

export async function getSubdomainData(
  subdomain: string
): Promise<SubdomainData | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("subdomains")
    .select("*")
    .eq("subdomain", subdomain.toLowerCase())
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export async function createSubdomain(data: {
  subdomain: string;
  emoji: string;
  name: string;
  description?: string;
}): Promise<{ data: SubdomainData | null; error: any }> {
  const supabase = createClient();

  const { data: result, error } = await supabase
    .from("subdomains")
    .insert({
      subdomain: data.subdomain.toLowerCase(),
      emoji: data.emoji,
      name: data.name,
      description: data.description,
    })
    .select()
    .single();

  return { data: result, error };
}
