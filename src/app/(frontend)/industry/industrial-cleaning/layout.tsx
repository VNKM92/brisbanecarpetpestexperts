import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateServiceSchema, generateBreadcrumbSchema } from "@/lib/seo-schema";
import { SEO_CONFIG } from "@/config/seo";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "industrial-cleaning",
    serviceSlug: "industrial-cleaning",
    focusKeyword: "industrial cleaning brisbane",
    defaultTitle: "Industrial & Warehouse Cleaning Brisbane | Heavy Duty Cleaning",
    defaultDescription: "Specialist industrial cleaning across Brisbane. Warehouse floor scrubbing, factory degreasing, high-reach dusting & hazardous waste management.",
    path: "/industry/industrial-cleaning",
    keywords: [
      "industrial cleaning brisbane",
      "warehouse cleaning brisbane",
      "factory floor scrubbing",
      "heavy duty commercial cleaning brisbane"
    ]
  });
}

export default function IndustrialCleaningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseUrl = SEO_CONFIG.siteUrl || "https://brisbanecarpetpestexperts.com.au";

  const serviceSchema = generateServiceSchema({
    name: "Industrial Cleaning Brisbane",
    description: "Heavy-duty commercial and industrial cleaning solutions for factories, workshops, and warehouses across Brisbane.",
    url: `${baseUrl}/industry/industrial-cleaning`,
    image: `${baseUrl}/assets/home/image/brisbanecarpetpestexperts-index-image2.png`,
    price: 300,
    siteUrl: baseUrl
  });

  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industry" },
    { name: "Industrial Cleaning", url: "/industry/industrial-cleaning" },
  ]);

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbs} />
      {children}
    </>
  );
}
