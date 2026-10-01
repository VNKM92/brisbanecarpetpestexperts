import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo-schema";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "request-estimate",
    focusKeyword: "free cleaning estimate brisbane",
    defaultTitle: "Request a Free Cleaning Estimate | Brisbane Carpet & Pest Experts",
    defaultDescription:
      "Get a fast, accurate cleaning estimate in 60 seconds from Brisbane Carpet & Pest Experts. Transparent quotes with 100% satisfaction guarantee.",
    path: "/request-estimate",
    keywords: [
      "free cleaning estimate brisbane",
      "instant cleaning quote brisbane",
      "bond cleaning estimate",
      "pest control quote brisbane"
    ]
  });
}

export default function RequestEstimateLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Request Estimate", url: "/request-estimate" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      {children}
    </>
  );
}
