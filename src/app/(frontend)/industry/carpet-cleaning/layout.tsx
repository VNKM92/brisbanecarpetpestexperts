import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo-schema";
import { SEO_CONFIG } from "@/config/seo";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "carpet-cleaning",
    serviceSlug: "carpet-cleaning",
    focusKeyword: "carpet cleaning brisbane",
    defaultTitle: "Carpet Cleaning Brisbane | Deep Steam & Stain Removal Experts",
    defaultDescription: "Professional carpet steam cleaning in Brisbane. Hot water extraction, tough stain removal, pet odor treatment & fast drying times. Book online today!",
    path: "/industry/carpet-cleaning",
    keywords: [
      "carpet cleaning brisbane",
      "carpet steam cleaning brisbane",
      "commercial carpet cleaning brisbane",
      "stain removal carpet brisbane",
      "hot water extraction carpet cleaning",
      "end of lease carpet cleaning brisbane"
    ]
  });
}

export default function CarpetCleaningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseUrl = SEO_CONFIG.siteUrl || "https://brisbanecarpetpestexperts.com.au";

  const serviceSchema = generateServiceSchema({
    name: "Carpet Cleaning Brisbane",
    description: "High-grade commercial hot water extraction carpet steam cleaning, stain treatment, and sanitization across Brisbane.",
    url: `${baseUrl}/industry/carpet-cleaning`,
    image: `${baseUrl}/assets/home/image/brisbanecarpetpestexperts-index-image2.png`,
    price: 99,
    siteUrl: baseUrl
  });

  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industry" },
    { name: "Carpet Cleaning", url: "/industry/carpet-cleaning" },
  ]);

  const faqs = generateFAQSchema([
    {
      question: "How long do carpets take to dry after steam cleaning?",
      answer: "With our advanced high-velocity extraction equipment, carpets typically dry within 3 to 6 hours depending on room ventilation and weather conditions."
    },
    {
      question: "Can you remove tough pet stains and strong odors?",
      answer: "Yes, we use enzymatic pre-treatments and sanitizing rinses that break down urine crystals, organic stains, and odor-causing bacteria at the root."
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
