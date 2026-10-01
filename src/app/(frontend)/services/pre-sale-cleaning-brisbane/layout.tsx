import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateServiceSchema, generateBreadcrumbSchema } from "@/lib/seo-schema";
import { SEO_CONFIG } from "@/config/seo";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "pre-sale-cleaning-brisbane",
    serviceSlug: "pre-sale-cleaning-brisbane",
    focusKeyword: "pre sale cleaning brisbane",
    defaultTitle: "Pre-Sale Cleaning Brisbane | Maximize Property Value",
    defaultDescription: "Premier pre-sale cleaning services in Brisbane. Prepare your property for open house inspections, photography, and auctions to achieve top market price.",
    path: "/services/pre-sale-cleaning-brisbane",
    keywords: [
      "pre sale cleaning brisbane",
      "open house cleaning brisbane",
      "property presentation cleaning",
      "real estate pre market clean brisbane"
    ]
  });
}

export default function PreSaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseUrl = SEO_CONFIG.siteUrl || "https://brisbanecarpetpestexperts.com.au";

  const serviceSchema = generateServiceSchema({
    name: "Pre-Sale Cleaning Brisbane",
    description: "Detailed pre-sale presentation cleaning to elevate property appeal for open inspections and maximum appraisal valuation.",
    url: `${baseUrl}/services/pre-sale-cleaning-brisbane`,
    image: `${baseUrl}/images/home-clean.jpg`,
    price: 450,
    siteUrl: baseUrl
  });

  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "Pre-Sale Cleaning Brisbane", url: "/services/pre-sale-cleaning-brisbane" },
  ]);

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbs} />
      {children}
    </>
  );
}
