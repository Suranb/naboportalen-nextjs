import Hero from "@/components/mainPage/Hero";
import ActivitiesFeed from "@/components/mainPage/ActivitiesFeed";
import { mockPosts } from "@/lib/mockPosts";
import { getSubdomainData } from "@/lib/subdomains";

export async function generateMetadata({
  params,
}: {
  params: { subdomain: string };
}) {
  const { subdomain } = params;
  const data = await getSubdomainData(subdomain);

  if (!data) {
    return {
      title: "NaboPortalen",
      description: "Digital nabolagsportal",
    };
  }

  return {
    title: `${subdomain} - NaboPortalen`,
    description: `Digital nabolagsportal for ${subdomain} borettslag`,
  };
}

export default async function SubdomainPage({
  params,
}: {
  params: { subdomain: string };
}) {
  const { subdomain } = params;
  const subdomainData = await getSubdomainData(subdomain);

  if (!subdomainData) {
    return (
      <div className="">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Borettslag ikke funnet
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Subdomenet "{subdomain}" eksisterer ikke eller er ikke tilgjengelig.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Hero subdomainData={subdomainData} />
      <ActivitiesFeed posts={mockPosts} subdomain={subdomain} />
    </>
  );
}
