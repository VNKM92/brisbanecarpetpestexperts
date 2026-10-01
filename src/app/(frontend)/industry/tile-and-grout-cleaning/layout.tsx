import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo-schema";
import { SEO_CONFIG } from "@/config/seo";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "tile-and-grout-cleaning",
    serviceSlug: "tile-and-grout-cleaning",
    focusKeyword: "tile and grout cleaning brisbane",
    defaultTitle: "Tile & Grout Cleaning Brisbane | High Pressure Deep Restoration",
    defaultDescription: "Commercial high-pressure tile and grout cleaning in Brisbane. Restore filthy grout lines, porcelain, ceramic, outdoor pavers and slate tiles.",
    path: "/industry/tile-and-grout-cleaning",
    keywords: [
      "tile and grout cleaning brisbane",
      "grout sealing brisbane",
      "bathroom tile cleaning brisbane",
      "kitchen floor tile scrubbing",
      "commercial floor scrubbing brisbane"
    ]
  });
}

export default function TileAndGroutCleaningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseUrl = SEO_CONFIG.siteUrl || "https://brisbanecarpetpestexperts.com.au";

  const serviceSchema = generateServiceSchema({
    name: "Tile and Grout Cleaning Brisbane",
    description: "High-pressure heated tile and grout deep cleaning and color sealing across Brisbane.",
    url: `${baseUrl}/industry/tile-and-grout-cleaning`,
    image: `${baseUrl}/assets/home/image/brisbanecarpetpestexperts-index-image2.png`,
    price: 150,
    siteUrl: baseUrl
  });

  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industry" },
    { name: "Tile & Grout Cleaning", url: "/industry/tile-and-grout-cleaning" },
  ]);

  const faqs = generateFAQSchema([
    {
      question: "Can high-pressure tile cleaning remove black mould from bathroom grout?",
      answer: "Yes, our high-temperature hydro-extraction combined with mould-eliminating solutions penetrates deep into porous grout lines to eliminate deep-seated mould and mildew."
    }
  ]);

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbs} />
      <JsonLd data={faqs} />
      {children}
    </>
  );
}
