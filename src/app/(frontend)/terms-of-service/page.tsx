import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getPageMetadata } from "@/lib/metadata";
import { FileText, Calendar, CheckCircle2, ChevronRight, ShieldCheck, AlertCircle, Award } from "lucide-react";

export const revalidate = 60;

export async function generateMetadata() {
  return getPageMetadata({
    slug: "terms-of-service",
    defaultTitle: "Terms of Service | Brisbane Carpet & Pest Experts",
    defaultDescription: "Read the Terms and Conditions of service for Brisbane Carpet & Pest Experts covering bookings, cancellations, 100% bond back guarantee, and service policies.",
    path: "/terms-of-service",
  });
}

export default async function TermsOfServicePage() {
  let dbPage: any = null;
  try {
    dbPage = await prisma.page.findUnique({
      where: { slug: "terms-of-service" },
    });
  } catch (e) {
    console.error("Error loading terms of service page:", e);
  }

  const title = dbPage?.heading || dbPage?.title || "Terms of Service";
  const subtitle = dbPage?.subheading || "Service Agreement, Booking Conditions & 100% Bond Back Guarantee Terms";
  const lastUpdated = dbPage?.updatedAt
    ? new Date(dbPage.updatedAt).toLocaleDateString("en-AU", { month: "long", day: "numeric", year: "numeric" })
    : "January 15, 2026";

  return (
    <div className="bg-[#f9f7f3] min-h-screen pt-28 pb-20">
      {/* Breadcrumbs */}
      <div className="max-w-5xl mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <Link href="/" className="hover:text-green-700 transition">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-semibold">Terms of Service</span>
        </nav>
      </div>

      {/* Hero Header */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <FileText size={14} />
              <span>Customer Service Agreement</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              {title}
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              {subtitle}
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
              <Calendar size={14} />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-3xl p-8 md:p-14 shadow-sm border border-gray-100 text-gray-700 space-y-10 leading-relaxed text-sm md:text-base">
          {dbPage?.content ? (
            <div
              className="prose max-w-none prose-emerald"
              dangerouslySetInnerHTML={{ __html: dbPage.content }}
            />
          ) : (
            <>
              {/* 1. Acceptance */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                  <FileText className="text-emerald-600" size={20} />
                  <span>1. Agreement to Terms</span>
                </h2>
                <p>
                  These Terms of Service constitute a legally binding agreement between you (&quot;Customer&quot;, &quot;Client&quot;) and <strong>Brisbane Carpet & Pest Experts</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;). By requesting a quote, booking an appointment, or utilizing our services in Brisbane, Queensland, you acknowledge that you have read, understood, and agreed to these Terms.
                </p>
              </section>

              {/* 2. 100% Bond Back Guarantee */}
              <section className="space-y-4 bg-emerald-50/60 p-6 md:p-8 rounded-2xl border border-emerald-100">
                <h2 className="text-xl font-bold text-emerald-950 flex items-center gap-2">
                  <Award className="text-emerald-700" size={22} />
                  <span>2. 100% Bond Back Guarantee Policy</span>
                </h2>
                <p className="text-emerald-900 text-sm">
                  We take immense pride in our cleaning excellence. Our 100% Bond Back Guarantee includes:
                </p>
                <ul className="space-y-2 text-sm text-emerald-950 pl-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Free 72-Hour Re-Clean:</strong> If your property manager or real estate agent identifies any cleaning oversight on the exit condition report, notify us within 72 hours and we will return to re-clean those specific areas at zero extra cost.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Approved REIQ Checklists:</strong> All end-of-lease cleans adhere strictly to Real Estate Institute of Queensland (REIQ) standards.</span>
                  </li>
                </ul>
              </section>

              {/* 3. Bookings & Cancellations */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                  <AlertCircle className="text-emerald-600" size={20} />
                  <span>3. Bookings, Access & Cancellations</span>
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Electricity & Water Supply:</strong> The customer must ensure working electricity and running hot/cold water are available at the premises during cleaning.</li>
                  <li><strong>Cancellation Policy:</strong> Cancellations made with at least 24 hours notice incur no penalty. Cancellations made within 24 hours of scheduled arrival may be subject to a nominal call-out fee.</li>
                  <li><strong>Access:</strong> The customer must provide safe, unobstructed access to the property at the agreed appointment time.</li>
                </ul>
              </section>

              {/* 4. Payment Terms */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                  <ShieldCheck className="text-emerald-600" size={20} />
                  <span>4. Payments & Invoicing</span>
                </h2>
                <p>
                  Payment is due upon completion of the service unless prior credit arrangements have been approved in writing. We accept Direct Bank Transfer, Visa, MasterCard, and EFTPOS. Official tax invoices and receipt certificates are provided immediately.
                </p>
              </section>

              {/* Contact */}
              <section className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-base">Questions Regarding Our Terms?</h3>
                <p className="text-xs text-slate-600">
                  Contact our Brisbane customer support team at <a href="mailto:info@brisbane.com" className="text-emerald-600 underline">info@brisbane.com</a> or call <a href="tel:0434061188" className="text-emerald-600 font-semibold">0434 061 188</a>.
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
