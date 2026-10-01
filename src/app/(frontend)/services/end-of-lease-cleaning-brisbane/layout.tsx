import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo-schema";
import { SEO_CONFIG } from "@/config/seo";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "end-of-lease-cleaning-brisbane",
    serviceSlug: "end-of-lease-cleaning-brisbane",
    focusKeyword: "end of lease cleaning brisbane",
    defaultTitle: "End of Lease Cleaning Brisbane | Full Bond Refund Guarantee",
    defaultDescription: "Trusted end of lease cleaning across Brisbane. Comprehensive real estate approved vacate cleans with oven, windows, carpets & pest control options.",
    path: "/services/end-of-lease-cleaning-brisbane",
    keywords: [
      "end of lease cleaning brisbane",
      "vacate cleaning brisbane",
      "move out cleaning brisbane",
      "lease cleaning services",
      "real estate cleaning brisbane"
    ]
  });
}

export default function EndOfLeaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseUrl = SEO_CONFIG.siteUrl || "https://brisbanecarpetpestexperts.com.au";

  const serviceSchema = generateServiceSchema({
    name: "End of Lease Cleaning Brisbane",
    description: "Specialist end of lease and vacate cleaning across Brisbane with real estate approved checklist and 72-hour re-clean warranty.",
    url: `${baseUrl}/services/end-of-lease-cleaning-brisbane`,
    image: `${baseUrl}/images/home-clean.jpg`,
    price: 390,
    siteUrl: baseUrl
  });

  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "End of Lease Cleaning Brisbane", url: "/services/end-of-lease-cleaning-brisbane" },
  ]);

  const faqs = generateFAQSchema([
    {
      question: "What is included in an end of lease clean in Brisbane?",
      answer: "Our end of lease clean covers everything required by property managers: full kitchen detailing, oven deep cleaning, range hood degreasing, bathroom disinfection, dusting, spot marks on walls, skirting boards, window tracks, and floors."
    },
    {
      question: "How long does an end of lease cleaning take?",
      answer: "A standard 2-3 bedroom property typically takes between 4 to 7 hours depending on the condition and additional requested services like carpet steam cleaning or external pressure washing."
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
