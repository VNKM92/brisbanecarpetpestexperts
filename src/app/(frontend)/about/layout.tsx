import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateBreadcrumbSchema, generateOrganizationSchema } from "@/lib/seo-schema";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "about",
    focusKeyword: "about brisbane carpet pest experts",
    defaultTitle: "About Us | Brisbane Carpet & Pest Experts",
    defaultDescription:
      "Learn about Brisbane Carpet & Pest Experts. Brisbane's leading bond cleaning, carpet steam cleaning, and pest management team.",
    path: "/about",
  });
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]);

  const organization = generateOrganizationSchema();

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={organization} />
      <div>{children}</div>
    </>
  );
}
