import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import JsonLd from "@/components/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo-schema";
import { getPageMetadata } from "@/lib/metadata";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let page = null;
  try {
    page = await prisma.page.findUnique({
      where: { slug },
    });
  } catch (e) {}

  if (!page || !page.isPublished) {
    return { title: "Page Not Found | Brisbane Carpet & Pest Experts" };
  }

  const focusKeyword = page.metaKeywords?.split(",")[0]?.trim() || `${page.title.toLowerCase()} brisbane`;

  return getPageMetadata({
    slug,
    path: `/${slug}`,
    focusKeyword,
    defaultTitle: page.metaTitle || `${page.title} | Brisbane Carpet & Pest Experts`,
    defaultDescription: page.metaDesc || `Information on ${page.title} by Brisbane Carpet & Pest Experts.`,
    type: "website",
  });
}

export const revalidate = 60;

export default async function DynamicCMSPage({ params }: Props) {
  const { slug } = await params;

  let page = null;
  try {
    page = await prisma.page.findUnique({
      where: { slug },
    });
  } catch (err) {
    console.error("Error fetching page from database:", err);
  }

  if (!page || !page.isPublished) {
    notFound();
  }

  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: page.title, url: `/${page.slug}` },
  ]);

  const pageContent = page.content || "";

  return (
    <>
      <JsonLd data={breadcrumbs} />

      {/* Hero Banner */}
      <div className="relative w-full h-[35vh] md:h-[45vh] bg-slate-900 flex items-center justify-center text-center px-4">
        <div className="relative z-10 max-w-4xl text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{page.title}</h1>
          <p className="text-slate-300 text-sm md:text-base">
            Last Updated: {new Date(page.updatedAt).toLocaleDateString("en-AU", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
          <div className="prose prose-slate max-w-none text-gray-700 leading-relaxed space-y-6">
            {pageContent.split("\n\n").map((para: string, idx: number) => {
              if (para.startsWith("##")) {
                return (
                  <h2 key={idx} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                    {para.replace("##", "").trim()}
                  </h2>
                );
              }
              if (para.startsWith("###")) {
                return (
                  <h3 key={idx} className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                    {para.replace("###", "").trim()}
                  </h3>
                );
              }
              if (para.startsWith("-")) {
                return (
                  <ul key={idx} className="list-disc list-inside space-y-2 ml-4">
                    {para.split("\n").map((item, i) => (
                      <li key={i}>{item.replace("-", "").trim()}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={idx}>{para}</p>;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
