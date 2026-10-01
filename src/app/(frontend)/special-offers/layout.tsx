import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo-schema";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "special-offers",
    focusKeyword: "cleaning package deals brisbane",
    defaultTitle: "Special Cleaning Deals & Packages | Brisbane Carpet & Pest Experts",
    defaultDescription:
      "Exclusive cleaning discounts, combined carpet and pest control package deals, and limited-time bond cleaning specials across Brisbane.",
    path: "/special-offers",
    keywords: [
      "cleaning package deals brisbane",
      "carpet cleaning discount brisbane",
      "bond clean pest combo deals",
      "cheap cleaning specials brisbane"
    ]
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
