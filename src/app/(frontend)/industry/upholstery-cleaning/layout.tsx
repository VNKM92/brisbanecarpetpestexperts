import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo-schema";
import { SEO_CONFIG } from "@/config/seo";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "upholstery-cleaning",
    serviceSlug: "upholstery-cleaning",
    focusKeyword: "upholstery cleaning brisbane",
    defaultTitle: "Upholstery Cleaning Brisbane | Couch, Sofa & Fabric Care",
    defaultDescription: "Expert upholstery cleaning in Brisbane. Deep steam extraction for couches, fabric sofas, dining chairs & armchairs. Safe on all delicate fabrics.",
    path: "/industry/upholstery-cleaning",
    keywords: [
      "upholstery cleaning brisbane",
      "couch cleaning brisbane",
      "sofa steam cleaning brisbane",
      "furniture cleaning brisbane",
      "fabric protector treatment brisbane"
    ]
  });
}

export default function UpholsteryCleaningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseUrl = SEO_CONFIG.siteUrl || "https://brisbanecarpetpestexperts.com.au";

  const serviceSchema = generateServiceSchema({
    name: "Upholstery Cleaning Brisbane",
    description: "Professional couch, sofa, and fabric upholstery deep cleaning and stain removal in Brisbane.",
    url: `${baseUrl}/industry/upholstery-cleaning`,
    image: `${baseUrl}/assets/home/image/brisbanecarpetpestexperts-index-image2.png`,
    price: 120,
    siteUrl: baseUrl
  });

  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industry" },
    { name: "Upholstery Cleaning", url: "/industry/upholstery-cleaning" },
  ]);

  const faqs = generateFAQSchema([
    {
      question: "Is steam cleaning safe for sensitive sofa fabrics?",
      answer: "Yes, our certified technicians inspect fabric fiber codes (W, S, WS, X) and adjust pH balanced detergents and steam temperatures to safely clean cotton, polyester, velvet, linen, and microfibers."
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
