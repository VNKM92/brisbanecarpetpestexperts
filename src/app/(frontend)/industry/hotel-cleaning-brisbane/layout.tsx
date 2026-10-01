import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateServiceSchema, generateBreadcrumbSchema } from "@/lib/seo-schema";
import { SEO_CONFIG } from "@/config/seo";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "hotel-cleaning-brisbane",
    serviceSlug: "hotel-cleaning-brisbane",
    focusKeyword: "hotel cleaning brisbane",
    defaultTitle: "Hotel & Hospitality Cleaning Brisbane | Luxury Housekeeping Standards",
    defaultDescription: "Premium hotel, resort, and Airbnb cleaning across Brisbane. Turnkey housekeeping, deep sanitization, linen replenishment & carpet care.",
    path: "/industry/hotel-cleaning-brisbane",
    keywords: [
      "hotel cleaning brisbane",
      "hospitality cleaning services",
      "airbnb cleaning brisbane",
      "motel housekeeping brisbane",
      "resort carpet cleaning brisbane"
    ]
  });
}

export default function HotelCleaningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseUrl = SEO_CONFIG.siteUrl || "https://brisbanecarpetpestexperts.com.au";

  const serviceSchema = generateServiceSchema({
    name: "Hotel Cleaning Brisbane",
    description: "5-star hospitality and hotel housekeeping, guest suite turnover, and deep carpet care services in Brisbane.",
    url: `${baseUrl}/industry/hotel-cleaning-brisbane`,
    image: `${baseUrl}/assets/home/image/brisbanecarpetpestexperts-index-image2.png`,
    price: 250,
    siteUrl: baseUrl
  });

  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industry" },
    { name: "Hotel Cleaning Brisbane", url: "/industry/hotel-cleaning-brisbane" },
  ]);

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbs} />
      {children}
    </>
  );
}
