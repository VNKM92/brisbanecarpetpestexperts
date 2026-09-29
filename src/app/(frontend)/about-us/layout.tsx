import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo-schema";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "about-us",
    defaultTitle: "About Us | Brisbane Carpet & Pest Experts",
    defaultDescription:
      "Learn about Brisbane Carpet & Pest Experts. Over 10 years of professional cleaning excellence, certified technicians, and 100% satisfaction guarantee.",
    path: "/about-us",
  });
}

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about-us" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <div>{children}</div>
    </>
  );
}
