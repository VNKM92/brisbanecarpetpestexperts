import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo-schema";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "request-estimate",
    defaultTitle: "Request a Free Cleaning Estimate | Brisbane Carpet & Pest Experts",
    defaultDescription:
      "Get a customized cleaning estimate in 60 seconds with Brisbane Carpet & Pest Experts. Reliable quotes with satisfaction guaranteed.",
    path: "/request-estimate",
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
