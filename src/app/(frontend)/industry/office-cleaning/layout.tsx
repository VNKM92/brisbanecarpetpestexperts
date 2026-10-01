import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo-schema";
import { SEO_CONFIG } from "@/config/seo";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "office-cleaning",
    serviceSlug: "office-cleaning",
    focusKeyword: "office cleaning brisbane",
    defaultTitle: "Commercial & Office Cleaning Brisbane | Reliable Workplace Cleaning",
    defaultDescription: "Top commercial office cleaning in Brisbane. Tailored daily, weekly, or after-hours cleaning packages for offices, corporate facilities & medical clinics.",
    path: "/industry/office-cleaning",
    keywords: [
      "office cleaning brisbane",
      "commercial cleaning services brisbane",
      "corporate office cleaners brisbane",
      "workplace sanitisation brisbane",
      "after hours office cleaning"
    ]
  });
}

export default function OfficeCleaningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseUrl = SEO_CONFIG.siteUrl || "https://brisbanecarpetpestexperts.com.au";

  const serviceSchema = generateServiceSchema({
    name: "Office Cleaning Brisbane",
    description: "Professional commercial and corporate office cleaning, workstation sanitizing, and floor care in Brisbane.",
    url: `${baseUrl}/industry/office-cleaning`,
    image: `${baseUrl}/assets/home/image/brisbanecarpetpestexperts-index-image2.png`,
    price: 180,
    siteUrl: baseUrl
  });

  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industry" },
    { name: "Office Cleaning", url: "/industry/office-cleaning" },
  ]);

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbs} />
      {children}
    </>
  );
}
