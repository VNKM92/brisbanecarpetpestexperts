import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo-schema";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "company/locations",
    focusKeyword: "service areas carpet cleaning pest control brisbane",
    defaultTitle: "Service Locations & Suburbs Covered | Brisbane Carpet & Pest Experts",
    defaultDescription:
      "We serve all Brisbane CBD, Northside, Southside, Western Suburbs, Eastern Suburbs, Moreton Bay, Ipswich, and Logan regions with professional cleaning services.",
    path: "/company/locations",
    keywords: [
      "brisbane carpet cleaning service areas",
      "pest control brisbane northside",
      "carpet cleaning southside brisbane",
      "bond cleaners ipswich",
      "bond cleaners logan"
    ]
  });
}

export default function LocationsLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Company", url: "/company" },
    { name: "Locations", url: "/company/locations" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      {children}
    </>
  );
}
