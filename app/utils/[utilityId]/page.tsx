import { notFound } from "next/navigation";
import { utilities } from "@/data/utils";
import UtilPage from "@/components/UtilPage"; // this is your existing client component
// import UtilPage from "@/components/UtilPage"; // this is your existing client component

export async function generateStaticParams() {
  return utilities.map((u) => ({ utilityId: u.utilityId }));
}

export default async function UtilityPage({ params }: { params: Promise<{ utilityId: string }> }) {
  const { utilityId } = await params; 

  const utility = utilities.find((u) => u.utilityId === utilityId);

  if (!utility) {
    notFound();
  }

  return <UtilPage utility={utility} />;
}



