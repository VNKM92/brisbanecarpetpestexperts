import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateBreadcrumbSchema, generateOrganizationSchema } from "@/lib/seo-schema";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "company",
    focusKeyword: "brisbane carpet pest experts company",
    defaultTitle: "Company Information | Brisbane Carpet & Pest Experts",
    defaultDescription:
      "Learn about Brisbane Carpet & Pest Experts, our professional cleaning team, Brisbane service locations, process, and customer reviews.",
    path: "/company",
  });
}

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Company", url: "/company" },
  ]);

  const org = generateOrganizationSchema();

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={org} />
      {children}
    </>
  );
}
