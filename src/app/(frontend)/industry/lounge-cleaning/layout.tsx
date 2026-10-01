import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateServiceSchema, generateBreadcrumbSchema } from "@/lib/seo-schema";
import { SEO_CONFIG } from "@/config/seo";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "lounge-cleaning",
    serviceSlug: "lounge-cleaning",
    focusKeyword: "lounge cleaning brisbane",
    defaultTitle: "Lounge & Leather Suite Cleaning Brisbane | Deep Fabric Refresh",
    defaultDescription: "Professional lounge, recliner, and leather sofa cleaning in Brisbane. High-grade hot water extraction and conditioning for immaculate results.",
    path: "/industry/lounge-cleaning",
    keywords: [
      "lounge cleaning brisbane",
      "leather sofa cleaning brisbane",
      "couch steam clean brisbane",
      "recliner cleaning brisbane"
    ]
  });
}

export default function LoungeCleaningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseUrl = SEO_CONFIG.siteUrl || "https://brisbanecarpetpestexperts.com.au";

  const serviceSchema = generateServiceSchema({
    name: "Lounge Cleaning Brisbane",
    description: "Deep fabric and leather lounge cleaning and conditioning services in Brisbane.",
    url: `${baseUrl}/industry/lounge-cleaning`,
    image: `${baseUrl}/assets/home/image/brisbanecarpetpestexperts-index-image2.png`,
    price: 110,
    siteUrl: baseUrl
  });

  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industry" },
    { name: "Lounge Cleaning", url: "/industry/lounge-cleaning" },
  ]);

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbs} />
      {children}
    </>
  );
}
