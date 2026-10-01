import { getPageMetadata } from "@/lib/metadata";
import BondCleaningClient from "./BondCleaningClient";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "bond-cleaning",
    serviceSlug: "bond-cleaning-brisbane",
    focusKeyword: "bond cleaning brisbane",
    defaultTitle: "Bond Cleaning Brisbane | 100% Bond Back Guarantee | Brisbane Carpet & Pest Experts",
    defaultDescription:
      "Brisbane's #1 bond cleaning specialists. 100% Bond Back Guarantee, REIQ approved checklists, steam carpet cleaning & flea pest control treatments.",
    path: "/bond-cleaning",
    keywords: [
      "bond cleaning brisbane",
      "exit cleaning brisbane",
      "end of lease cleaning brisbane",
      "bond back guarantee",
      "carpet steam cleaning brisbane"
    ]
  });
}

export default function BondCleaningPage() {
  return <BondCleaningClient />;
}
