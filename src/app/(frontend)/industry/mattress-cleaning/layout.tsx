import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo-schema";
import { SEO_CONFIG } from "@/config/seo";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "mattress-cleaning",
    serviceSlug: "mattress-cleaning",
    focusKeyword: "mattress cleaning brisbane",
    defaultTitle: "Mattress Cleaning Brisbane | Dust Mite & Stain Sanitization",
    defaultDescription: "Hygienic mattress steam cleaning and anti-allergen sanitization in Brisbane. Eradicate dust mites, sweat stains, bed bugs, and bacteria.",
    path: "/industry/mattress-cleaning",
    keywords: [
      "mattress cleaning brisbane",
      "mattress steam cleaning brisbane",
      "dust mite treatment brisbane",
      "bed sanitising brisbane",
      "mattress stain removal"
    ]
  });
}

export default function MattressCleaningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseUrl = SEO_CONFIG.siteUrl || "https://brisbanecarpetpestexperts.com.au";

  const serviceSchema = generateServiceSchema({
    name: "Mattress Cleaning Brisbane",
    description: "Deep steam sanitization and anti-dust mite allergen removal for mattresses in Brisbane.",
    url: `${baseUrl}/industry/mattress-cleaning`,
    image: `${baseUrl}/assets/home/image/brisbanecarpetpestexperts-index-image2.png`,
    price: 90,
    siteUrl: baseUrl
  });

  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industry" },
    { name: "Mattress Cleaning", url: "/industry/mattress-cleaning" },
  ]);

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbs} />
      {children}
    </>
  );
}
