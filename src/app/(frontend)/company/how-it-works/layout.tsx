import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo-schema";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "company/how-it-works",
    focusKeyword: "how our cleaning service works brisbane",
    defaultTitle: "How It Works | Booking & Cleaning Process | Brisbane Carpet & Pest Experts",
    defaultDescription:
      "Understand our streamlined 4-step cleaning process: instant online quote, easy scheduling, expert on-site cleaning, and full satisfaction inspection.",
    path: "/company/how-it-works",
  });
}

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Company", url: "/company" },
    { name: "How It Works", url: "/company/how-it-works" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      {children}
    </>
  );
}
