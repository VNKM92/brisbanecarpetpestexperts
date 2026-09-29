import React from "react";
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo-schema";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "contact",
    defaultTitle: "Contact Us | Brisbane Carpet & Pest Experts",
    defaultDescription:
      "Get in touch with Brisbane Carpet & Pest Experts for fast quotes, booking inquiries, or emergency cleaning requests across Brisbane.",
    path: "/contact",
  });
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact Us", url: "/contact" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      {children}
    </>
  );
}
