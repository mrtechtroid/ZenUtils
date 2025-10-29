import { notFound } from "next/navigation";
import { utilities } from "@/data/utils";
import UtilPage from "@/components/UtilPage"; // this is your existing client component
// import UtilPage from "@/components/UtilPage"; // this is your existing client component
import type { Metadata } from "next";

export async function generateStaticParams() {
  return utilities.map((u) => ({ utilityId: u.utilityId }));
}

export async function generateMetadata(
  { params }: { params: { utilityId: string } }
): Promise<Metadata> {
  const { utilityId } = await params;

  const utility = utilities.find((u) => u.utilityId === utilityId);

  if (!utility) {
    return {
      title: "Utility Not Found",
      description: "This utility does not exist.",
    };
  }

  return {
    title: `${utility.name} | ZenUtils`, // custom title
    description: utility.description ?? "A useful tool from our utilities collection.",
    openGraph: {
      title: utility.name,
      description: utility.description,
      url: `/utils/${utility.utilityId}`,
    },
    twitter: {
      card: "summary",
      title: utility.name,
      description: utility.description,
    },
  };
}

export default async function UtilityPage({ params }: { params: Promise<{ utilityId: string }> }) {
  const { utilityId } = await params; 

  const utility = utilities.find((u) => u.utilityId === utilityId);

  if (!utility) {
    notFound();
  }

  return <UtilPage utility={utility} />;
}



