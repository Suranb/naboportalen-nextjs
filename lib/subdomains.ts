// lib/subdomains.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function isValidIcon(str: string) {
  if (str.length > 10) {
    return false;
  }

  try {
    const emojiPattern = /[\p{Emoji}]/u;
    if (emojiPattern.test(str)) {
      return true;
    }
  } catch (error) {
    console.warn(
      "Emoji regex validation failed, using fallback validation",
      error
    );
  }

  return str.length >= 1 && str.length <= 10;
}

type SubdomainData = {
  id: string;
  subdomain: string;
  emoji: string;
  name: string;
  description: string | null;
  banner_image_url: string | null;
  about_url: string | null;
  created_at: string;
  updated_at: string;
};

export async function getSubdomainData(
  subdomain: string
): Promise<SubdomainData | null> {
  const sanitizedSubdomain = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, "");

  console.log("🔍 Looking for subdomain:", sanitizedSubdomain);

  const { data, error } = await supabase
    .from("subdomains")
    .select("*")
    .eq("subdomain", sanitizedSubdomain)
    .single();

  if (error) {
    console.log("❌ Supabase error:", error.message);
    return null;
  }

  if (!data) {
    console.log("❌ No data found for subdomain:", sanitizedSubdomain);
    return null;
  }

  console.log("✅ Found subdomain data:", data);
  return data;
}

export async function getAllSubdomains() {
  const { data, error } = await supabase
    .from("subdomains")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("Error fetching subdomains:", error?.message);
    return [];
  }

  return data.map((subdomain) => ({
    subdomain: subdomain.subdomain,
    emoji: subdomain.emoji,
    createdAt: new Date(subdomain.created_at).getTime(),
  }));
}

export async function createSubdomain(data: {
  subdomain: string;
  emoji: string;
  name: string;
  description?: string;
}) {
  console.log("🔄 Creating subdomain:", data);

  // Check if subdomain already exists
  const { data: existing } = await supabase
    .from("subdomains")
    .select("id")
    .eq("subdomain", data.subdomain.toLowerCase())
    .single();

  if (existing) {
    console.log("❌ Subdomain already exists");
    return { data: null, error: { message: "Subdomain already exists" } };
  }

  const { data: result, error } = await supabase
    .from("subdomains")
    .insert({
      subdomain: data.subdomain.toLowerCase(),
      emoji: data.emoji,
      name: data.name,
      description: data.description,
      about_url: `/s/${data.subdomain.toLowerCase()}/about`,
    })
    .select()
    .single();

  if (error) {
    console.log("❌ Error creating subdomain:", error);
  } else {
    console.log("✅ Created subdomain:", result);
  }

  return { data: result, error };
}

export async function deleteSubdomain(subdomain: string) {
  const { error } = await supabase
    .from("subdomains")
    .delete()
    .eq("subdomain", subdomain);

  return { error };
}
