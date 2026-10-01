import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo-schema";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "company/gallery",
    focusKeyword: "carpet cleaning before and after brisbane",
    defaultTitle: "Work Gallery & Before/After Portfolio | Brisbane Carpet & Pest Experts",
    defaultDescription:
      "Explore real before and after transformations for carpet steam cleaning, bond cleaning, upholstery restoration, and tile cleaning across Brisbane.",
    path: "/company/gallery",
  });
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Company", url: "/company" },
    { name: "Gallery", url: "/company/gallery" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      {children}
    </>
  );
}
