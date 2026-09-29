import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import JsonLd from "@/components/JsonLd";
import { generateServiceSchema, generateBreadcrumbSchema } from "@/lib/seo-schema";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let service = null;
  try {
    service = await prisma.service.findUnique({
      where: { slug },
      include: { category: true },
    });
  } catch (e) {}

  if (!service) {
    return { title: "Service Not Found | Brisbane Carpet & Pest Experts" };
  }

  const title = service.metaTitle || `${service.name} | Brisbane Cleaning Experts`;
  const description = service.metaDesc || service.shortDesc || `Professional ${service.name} in Brisbane. Quality guaranteed.`;
  const image = service.heroImage || service.icon || "/images/home-clean.jpg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export const revalidate = 60;

export default async function DynamicServicePage({ params }: Props) {
  const { slug } = await params;

  let service = null;
  let otherServices: any[] = [];

  try {
    service = await prisma.service.findUnique({
      where: { slug },
      include: { category: true },
    });

    otherServices = await prisma.service.findMany({
      where: { isActive: true, NOT: { slug } },
      take: 6,
      include: { category: true },
    });
  } catch (err) {
    console.error("Error fetching service from database:", err);
  }

  if (!service) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const serviceSchema = generateServiceSchema({
    name: service.name,
    description: service.shortDesc || service.description || "",
    url: `${siteUrl}/services/${service.slug}`,
    image: service.heroImage || service.icon || `${siteUrl}/images/home-clean.jpg`,
    price: service.priceStarting ? Number(service.priceStarting) : undefined,
    siteUrl,
  });

  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: service.name, url: `/services/${service.slug}` },
  ]);

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbs} />

      {/* Hero Banner */}
      <section
        className="relative w-full h-[45vh] md:h-[55vh] bg-cover bg-center bg-no-repeat flex items-center justify-center text-center"
        style={{
          backgroundImage: service.heroImage
            ? `url('${service.heroImage}')`
            : "url('/assets/home/image/brisbanecarpetpestexperts-index-image4-1.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-[2px]"></div>

        <div className="relative z-10 max-w-4xl px-4 text-white">
          <div className="inline-block bg-emerald-600/90 text-white text-xs px-3 py-1 rounded-full mb-3 uppercase tracking-wider font-semibold">
            {service.category?.name || "Professional Cleaning"}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{service.name}</h1>
          <p className="text-gray-200 text-base md:text-lg max-w-2xl mx-auto line-clamp-2">
            {service.shortDesc || service.description}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Service Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Service</h2>
              <div className="prose prose-slate max-w-none text-gray-700 leading-relaxed space-y-4">
                {service.description ? (
                  service.description.split("\n\n").map((para: string, idx: number) => (
                    <p key={idx}>{para}</p>
                  ))
                ) : (
                  <p>
                    Experience top-tier {service.name} delivered by certified Brisbane professionals. We use commercial grade equipment and eco-friendly solutions to guarantee exceptional results and customer satisfaction.
                  </p>
                )}
              </div>

              {/* Price / Estimate Callout */}
              <div className="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Pricing & Quote</p>
                  <p className="text-xl font-bold text-emerald-950">
                    {service.priceStarting ? `Starting from $${service.priceStarting}` : "Free Custom Quote"}
                  </p>
                  <p className="text-xs text-emerald-700">100% Satisfaction & Bond Back Guarantee</p>
                </div>
                <Link
                  href={`/request-estimate?service=${encodeURIComponent(service.name)}`}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition flex-shrink-0"
                >
                  Book This Service →
                </Link>
              </div>
            </div>

            {/* Why Choose Brisbane Section */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose Brisbane Carpet & Pest Experts?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                  <div className="text-emerald-600 text-xl">✓</div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">Bond Back Guarantee</p>
                    <p className="text-xs text-slate-500">100% inspection pass guarantee with 72h re-clean.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                  <div className="text-emerald-600 text-xl">✓</div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">Police-Checked Staff</p>
                    <p className="text-xs text-slate-500">Fully insured and certified team members.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                  <div className="text-emerald-600 text-xl">✓</div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">Eco-Friendly Products</p>
                    <p className="text-xs text-slate-500">Safe for pets, children, and the environment.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                  <div className="text-emerald-600 text-xl">✓</div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">Flexible Scheduling</p>
                    <p className="text-xs text-slate-500">7 days a week including same-day emergency slots.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Contact Card */}
            <div className="bg-gradient-to-br from-emerald-700 to-teal-800 p-6 rounded-2xl text-white shadow-lg">
              <h3 className="text-lg font-bold mb-2">Need Immediate Service?</h3>
              <p className="text-emerald-100 text-xs mb-6">
                Speak directly with our Brisbane operations manager for instant availability.
              </p>
              <a
                href="tel:0434061188"
                className="flex items-center justify-center gap-2 w-full py-3 bg-white text-emerald-800 font-bold rounded-xl shadow hover:bg-emerald-50 transition mb-3 text-sm"
              >
                <span>📞 Call 0434 061 188</span>
              </a>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-800/80 hover:bg-emerald-800 text-white font-medium rounded-xl border border-emerald-600/50 transition text-sm"
              >
                <span>Send Online Message</span>
              </Link>
            </div>

            {/* Other Services List */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h4 className="font-bold text-gray-900 mb-4 text-base">Other Popular Services</h4>
              <div className="space-y-2.5">
                {otherServices.map((s) => (
                  <Link
                    key={s.id}
                    href={`/services/${s.slug}`}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition group border border-transparent hover:border-slate-200"
                  >
                    <span className="text-sm text-slate-700 group-hover:text-emerald-700 font-medium">
                      {s.name}
                    </span>
                    <span className="text-xs text-slate-400 group-hover:text-emerald-600">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
