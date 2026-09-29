import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo-schema";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "pricing",
    defaultTitle: "Cleaning Pricing & Calculator | Brisbane Carpet & Pest Experts",
    defaultDescription:
      "Transparent pricing and instant online estimate calculator for bond cleaning, carpet cleaning, and pest control in Brisbane.",
    path: "/pricing",
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
