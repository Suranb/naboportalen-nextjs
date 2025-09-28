import Link from "next/link";
import { rootDomain } from "@/lib/utils";

export default async function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4 relative">
      <p>Hello!</p>
      <p>
        {" "}
        Here are some PUBLIC info about this neighborhoodd, contact info, etc...
      </p>
    </div>
  );
}
