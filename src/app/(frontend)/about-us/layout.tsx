import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateBreadcrumbSchema, generateOrganizationSchema } from "@/lib/seo-schema";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "about-us",
    focusKeyword: "carpet and pest cleaning experts brisbane",
    defaultTitle: "About Brisbane Carpet & Pest Experts | Trusted Cleaning & Pest Control",
    defaultDescription:
      "Learn about Brisbane Carpet & Pest Experts. Brisbane's leading bond cleaning, carpet steam cleaning, and pest management team with 10+ years experience.",
    path: "/about-us",
    keywords: [
      "about brisbane carpet pest experts",
      "trusted cleaners brisbane",
      "certified carpet cleaners brisbane",
      "licensed pest controllers brisbane",
      "bond cleaning company brisbane"
    ]
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

  const organization = generateOrganizationSchema();

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={organization} />
      <div>{children}</div>
    </>
  );
}
