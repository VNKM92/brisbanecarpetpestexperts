import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateServiceSchema, generateBreadcrumbSchema } from "@/lib/seo-schema";
import { SEO_CONFIG } from "@/config/seo";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "age-care-cleaning",
    serviceSlug: "age-care-cleaning",
    focusKeyword: "age care cleaning brisbane",
    defaultTitle: "Aged Care & Healthcare Facility Cleaning Brisbane | Certified Sanitization",
    defaultDescription: "Specialist aged care, retirement village, and nursing home sanitization in Brisbane. Hospital-grade disinfection, infection control, and odor eradication.",
    path: "/industry/age-care-cleaning",
    keywords: [
      "age care cleaning brisbane",
      "aged care facility sanitisation",
      "nursing home cleaning brisbane",
      "retirement village cleaning",
      "healthcare grade disinfection brisbane"
    ]
  });
}

export default function AgeCareCleaningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseUrl = SEO_CONFIG.siteUrl || "https://brisbanecarpetpestexperts.com.au";

  const serviceSchema = generateServiceSchema({
    name: "Aged Care Cleaning Brisbane",
    description: "Certified hospital-grade aged care and healthcare facility infection control and deep sanitization across Brisbane.",
    url: `${baseUrl}/industry/age-care-cleaning`,
    image: `${baseUrl}/assets/home/image/brisbanecarpetpestexperts-index-image2.png`,
    price: 350,
    siteUrl: baseUrl
  });

  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industry" },
    { name: "Age Care Cleaning", url: "/industry/age-care-cleaning" },
  ]);

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbs} />
      {children}
    </>
  );
}
