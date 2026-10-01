import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateServiceSchema, generateBreadcrumbSchema } from "@/lib/seo-schema";
import { SEO_CONFIG } from "@/config/seo";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "deep-cleaning",
    serviceSlug: "deep-cleaning",
    focusKeyword: "deep cleaning brisbane",
    defaultTitle: "Deep Cleaning Services Brisbane | Intensive Home & Office Cleaning",
    defaultDescription: "Intensive deep cleaning in Brisbane. From bathroom sanitization and kitchen degreasing to whole house spring cleans. Top rated service.",
    path: "/services/deep-cleaning",
    keywords: [
      "deep cleaning brisbane",
      "spring cleaning brisbane",
      "one off house clean brisbane",
      "intensive home cleaning brisbane"
    ]
  });
}

export default function DeepCleaningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseUrl = SEO_CONFIG.siteUrl || "https://brisbanecarpetpestexperts.com.au";

  const serviceSchema = generateServiceSchema({
    name: "Deep Cleaning Brisbane",
    description: "Detailed top-to-bottom deep cleaning services across Brisbane for residential homes, bathrooms, and commercial properties.",
    url: `${baseUrl}/services/deep-cleaning`,
    image: `${baseUrl}/images/home-clean.jpg`,
    price: 350,
    siteUrl: baseUrl
  });

  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "Deep Cleaning Brisbane", url: "/services/deep-cleaning" },
  ]);

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbs} />
      {children}
    </>
  );
}
