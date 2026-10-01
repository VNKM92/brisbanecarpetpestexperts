import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo-schema";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "company/team",
    focusKeyword: "expert cleaners team brisbane",
    defaultTitle: "Meet Our Team | Brisbane Carpet & Pest Experts",
    defaultDescription:
      "Meet our certified and experienced carpet cleaning, bond cleaning, and pest control technicians serving Greater Brisbane.",
    path: "/company/team",
  });
}

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Company", url: "/company" },
    { name: "Team", url: "/company/team" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      {children}
    </>
  );
}
