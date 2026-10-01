import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo-schema";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "pricing",
    focusKeyword: "carpet cleaning prices brisbane",
    defaultTitle: "Cleaning Pricing & Calculator | Brisbane Carpet & Pest Experts",
    defaultDescription:
      "Transparent pricing and instant online estimate calculator for bond cleaning, carpet cleaning, and pest control in Brisbane. No hidden charges.",
    path: "/pricing",
    keywords: [
      "carpet cleaning prices brisbane",
      "bond cleaning cost brisbane",
      "pest control price brisbane",
      "cheap cleaning quotes brisbane",
      "cleaning price calculator"
    ]
  });
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Pricing", url: "/pricing" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      {children}
    </>
  );
}
