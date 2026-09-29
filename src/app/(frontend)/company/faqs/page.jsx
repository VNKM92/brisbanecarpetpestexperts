import FAQSection from "./components/FAQSection";
import faqData from "./data/faq.json";
import { prisma } from "@/lib/prisma";
import JsonLd from "@/components/JsonLd";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo-schema";
import { getPageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return getPageMetadata({
    slug: "faqs",
    defaultTitle: "Frequently Asked Questions | Brisbane Carpet & Pest Experts",
    defaultDescription:
      "Find answers to commonly asked questions about our bond cleaning, carpet cleaning, and pest control services in Brisbane.",
    path: "/company/faqs",
  });
}

export const revalidate = 60; // ISR revalidation every 60 seconds

export default async function FAQPage() {
  let categories = faqData.categories;
  let allFaqsForSchema = [];

  try {
    const dbCategories = await prisma.faqCategory.findMany({
      orderBy: { order: "asc" },
      include: {
        faqs: {
          where: { isActive: true },
          orderBy: { order: "asc" },
        },
      },
    });

    if (dbCategories && dbCategories.length > 0) {
      categories = dbCategories.map((c) => ({
        name: c.name,
        items: c.faqs.map((f) => ({
          title: f.question,
          content: f.answer,
        })),
      }));

      dbCategories.forEach((cat) => {
        cat.faqs.forEach((faq) => {
          allFaqsForSchema.push({
            question: faq.question,
            answer: faq.answer,
          });
        });
      });
    }
  } catch (err) {
    console.error("Failed to load FAQs from database:", err);
  }

  if (allFaqsForSchema.length === 0) {
    categories.forEach((cat) => {
      cat.items?.forEach((item) => {
        allFaqsForSchema.push({
          question: item.title,
          answer: item.content,
        });
      });
    });
  }

  const faqSchema = generateFAQSchema(allFaqsForSchema);
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Company", url: "/about-us" },
    { name: "FAQs", url: "/company/faqs" },
  ]);

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbs} />

      {/* Banner Section */}
      <section
        className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] 
                  bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/home/image/brisbanecarpetpestexperts-index-image4-1.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gray-900/50"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
            Faqs
          </h1>
          <p className="text-white text-base md:text-lg max-w-2xl">
            Before your first house cleaning service, we'll take the time to talk about your preferences and priorities with you and combine them with cleaning techniques to give your home the greatest possible clean from our personal housekeepers.
          </p>
        </div>
      </section>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-16">
        {/* Title */}
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-green-600 font-medium">Commonly Asked Questions</p>
          <h1 className="text-4xl font-bold mt-2 text-gray-900 dark:text-white">
            What Are You Trying to Find?
          </h1>
        </div>

        {/* FAQ Section */}
        <FAQSection categories={categories} />

        {/* Footer */}
        <div className="max-w-4xl mx-auto text-center mt-16 text-gray-600 dark:text-gray-400">
          Custom plans for maintaining a clean and healthy environment.{" "}
          <a href="/request-estimate" className="text-green-600 font-semibold hover:underline">
            Request A Free Quote →
          </a>
        </div>
      </div>
    </>
  );
}
