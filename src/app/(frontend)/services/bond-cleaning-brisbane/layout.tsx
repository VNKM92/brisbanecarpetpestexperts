import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo-schema";
import { COMPANY_INFO, SEO_CONFIG } from "@/config/seo";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "bond-cleaning-brisbane",
    serviceSlug: "bond-cleaning-brisbane",
    focusKeyword: "bond cleaning brisbane",
    defaultTitle: "Bond Cleaning Brisbane | 100% Bond Back Guarantee | Brisbane Carpet & Pest Experts",
    defaultDescription: "Top-rated bond cleaning in Brisbane. 100% bond back guarantee, REIQ approved checklists, steam carpet cleaning & pest control packages. Instant free quote!",
    path: "/services/bond-cleaning-brisbane",
    keywords: [
      "bond cleaning brisbane",
      "exit cleaning brisbane",
      "end of lease cleaning brisbane",
      "cheap bond cleaning brisbane",
      "reiq approved bond clean",
      "move out cleaning brisbane",
      "bond cleaning with pest control"
    ]
  });
}

export default function BondCleaningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseUrl = SEO_CONFIG.siteUrl || "https://brisbanecarpetpestexperts.com.au";

  const serviceSchema = generateServiceSchema({
    name: "Bond Cleaning Brisbane",
    description: "Professional REIQ-standard bond cleaning service in Brisbane with 100% Bond Back Guarantee and free re-cleans within 72 hours.",
    url: `${baseUrl}/services/bond-cleaning-brisbane`,
    image: `${baseUrl}/images/home-clean.jpg`,
    price: 400,
    siteUrl: baseUrl
  });

  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "Bond Cleaning Brisbane", url: "/services/bond-cleaning-brisbane" },
  ]);

  const faqs = generateFAQSchema([
    {
      question: "What does your Brisbane bond cleaning service include?",
      answer: "Our bond clean follows a comprehensive REIQ-approved checklist covering all rooms, deep kitchen cleaning (oven, rangehood, stovetop, cupboards), bathroom sanitization, light switches, spot wall cleaning, skirting boards, windows (inside & tracks), and floors."
    },
    {
      question: "Do you provide a 100% Bond Back Guarantee?",
      answer: "Yes! We offer a 100% Bond Back Guarantee with a free 72-hour re-clean if your property manager or landlord raises any cleaning issues on the inspection report."
    },
    {
      question: "Can I combine bond cleaning with carpet cleaning and pest control?",
      answer: "Yes, we offer discounted bundle packages combining bond cleaning, hot water carpet steam extraction, and end-of-lease pest control certification required by real estate agents."
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
