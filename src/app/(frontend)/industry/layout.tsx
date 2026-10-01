import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo-schema";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "industry",
    focusKeyword: "specialist cleaning brisbane",
    defaultTitle: "Industry Cleaning Solutions Brisbane | Brisbane Carpet & Pest Experts",
    defaultDescription: "Specialized industrial, commercial, carpet, upholstery, tile, and aged care cleaning solutions across Brisbane. High-powered equipment & certified technicians.",
    path: "/industry",
    keywords: [
      "industry cleaning brisbane",
      "commercial cleaning brisbane",
      "carpet steam cleaning brisbane",
      "upholstery cleaning brisbane",
      "tile grout cleaning brisbane",
      "aged care cleaning brisbane"
    ]
  });
}

export default function IndustryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Industries & Specialised Services", url: "/industry" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <div className="min-h-screen bg-gray-50">{children}</div>
    </>
  );
}
