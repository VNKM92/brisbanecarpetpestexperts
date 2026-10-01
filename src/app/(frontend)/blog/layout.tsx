import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo-schema";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "blog",
    focusKeyword: "carpet cleaning and pest control tips brisbane",
    defaultTitle: "Expert Cleaning & Pest Control Blog | Brisbane Carpet & Pest Experts",
    defaultDescription:
      "Helpful cleaning guides, bond return tips, stain removal advice, and pest prevention methods from certified Brisbane technicians.",
    path: "/blog",
    keywords: [
      "carpet cleaning tips brisbane",
      "bond cleaning guide",
      "pest control advice brisbane",
      "cleaning advice and tutorials"
    ]
  });
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      {children}
    </>
  );
}
