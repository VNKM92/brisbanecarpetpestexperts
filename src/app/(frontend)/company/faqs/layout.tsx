import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo-schema";
import faqData from "./data/faq.json";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "company/faqs",
    focusKeyword: "carpet and pest cleaning faq brisbane",
    defaultTitle: "Frequently Asked Questions | Brisbane Carpet & Pest Experts",
    defaultDescription:
      "Find answers to common questions regarding bond cleaning, carpet steam cleaning, drying times, and pet safe pest control in Brisbane.",
    path: "/company/faqs",
    keywords: [
      "carpet and pest cleaning faq brisbane",
      "bond cleaning questions brisbane",
      "carpet cleaning drying time faq",
      "pet safe pest control faq"
    ]
  });
}

export default function FAQsLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Company", url: "/company" },
    { name: "FAQs", url: "/company/faqs" },
  ]);

  // Extract first 10 FAQs for Google rich snippets
  const allFaqs = faqData.categories.flatMap((cat: any) =>
    cat.items.map((item: any) => ({
      question: item.title,
      answer: item.content,
    }))
  ).slice(0, 10);

  const faqSchema = generateFAQSchema(allFaqs);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={faqSchema} />
      {children}
    </>
  );
}
