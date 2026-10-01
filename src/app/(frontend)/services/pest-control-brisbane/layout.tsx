import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo-schema";
import { SEO_CONFIG } from "@/config/seo";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "pest-control-brisbane",
    serviceSlug: "pest-control-brisbane",
    focusKeyword: "pest control brisbane",
    defaultTitle: "Pest Control Brisbane | Safe & Effective Treatments | Licensed Experts",
    defaultDescription: "Licensed Brisbane pest control for residential and commercial properties. Cockroach, ant, spider, flea & rodent eradication. End of lease pest certificates.",
    path: "/services/pest-control-brisbane",
    keywords: [
      "pest control brisbane",
      "end of lease flea treatment brisbane",
      "cockroach control brisbane",
      "spider treatment brisbane",
      "rodent control brisbane",
      "commercial pest management brisbane"
    ]
  });
}

export default function PestControlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseUrl = SEO_CONFIG.siteUrl || "https://brisbanecarpetpestexperts.com.au";

  const serviceSchema = generateServiceSchema({
    name: "Pest Control Brisbane",
    description: "Licensed pest management solutions for homes and businesses across Brisbane. Pet & family safe treatments with end of lease certificates.",
    url: `${baseUrl}/services/pest-control-brisbane`,
    image: `${baseUrl}/images/home-clean.jpg`,
    price: 150,
    siteUrl: baseUrl
  });

  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "Pest Control Brisbane", url: "/services/pest-control-brisbane" },
  ]);

  const faqs = generateFAQSchema([
    {
      question: "Are your pest control treatments safe for pets and children?",
      answer: "Yes, we use APVMA-approved, eco-friendly formulations that are odorless and safe for humans and household pets once dry."
    },
    {
      question: "Do you issue an official Pest Control Certificate for real estate agents?",
      answer: "Yes! If you are moving out or completing a lease requirement, we provide a formal Pest Control Certificate immediately upon job completion."
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
