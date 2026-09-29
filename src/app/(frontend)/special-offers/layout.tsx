import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo-schema";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "special-offers",
    defaultTitle: "Special Cleaning Deals & Packages | Brisbane Carpet & Pest Experts",
    defaultDescription:
      "Exclusive cleaning discounts, combined carpet and pest control package deals, and limited-time bond cleaning offers in Brisbane.",
    path: "/special-offers",
  });
}

export default function SpecialOffersLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Special Offers", url: "/special-offers" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      {children}
    </>
  );
}
