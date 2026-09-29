import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo-schema";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "services",
    defaultTitle: "Professional Cleaning Services Brisbane | Brisbane Carpet & Pest Experts",
    defaultDescription:
      "Explore our complete range of bond cleaning, end of lease cleaning, carpet cleaning, and pest control services in Brisbane.",
    path: "/services",
  });
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <div className="min-h-screen bg-[#fffdf8]">{children}</div>
    </>
  );
}
