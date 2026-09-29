import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getPageMetadata } from "@/lib/metadata";
import { ShieldCheck, Calendar, CheckCircle2, ChevronRight, Lock, FileText, HelpCircle } from "lucide-react";

export const revalidate = 60;

export async function generateMetadata() {
  return getPageMetadata({
    slug: "privacy-policy",
    defaultTitle: "Privacy Policy | Brisbane Carpet & Pest Experts",
    defaultDescription: "Read our comprehensive Privacy Policy outlining how Brisbane Carpet & Pest Experts collects, protects, uses, and discloses your personal information in compliance with Australian Privacy Principles (APPs).",
    path: "/privacy-policy",
  });
}

export default async function PrivacyPolicyPage() {
  let dbPage: any = null;
  try {
    dbPage = await prisma.page.findUnique({
      where: { slug: "privacy-policy" },
    });
  } catch (e) {
    console.error("Error loading privacy policy page:", e);
  }

  const title = dbPage?.heading || dbPage?.title || "Privacy Policy";
  const subtitle = dbPage?.subheading || "Australian Privacy Principles (APP) & Privacy Act 1988 Compliance";
  const lastUpdated = dbPage?.updatedAt
    ? new Date(dbPage.updatedAt).toLocaleDateString("en-AU", { month: "long", day: "numeric", year: "numeric" })
    : "January 15, 2026";

  return (
    <div className="bg-[#f9f7f3] min-h-screen pt-28 pb-20">
      {/* Breadcrumb Navigation */}
      <div className="max-w-5xl mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <Link href="/" className="hover:text-green-700 transition">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-semibold">Privacy Policy</span>
        </nav>
      </div>

      {/* Hero Header */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <ShieldCheck size={14} />
              <span>Your Privacy & Data Protection</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              {title}
            </h1>

            <p className="text-emerald-100/90 text-sm md:text-base leading-relaxed">
              {subtitle}
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-200/70 pt-2">
              <Calendar size={14} />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-3xl p-8 md:p-14 shadow-sm border border-gray-100 text-gray-700 space-y-10 leading-relaxed text-sm md:text-base">
          {dbPage?.content ? (
            <div
              className="prose max-w-none prose-emerald"
              dangerouslySetInnerHTML={{ __html: dbPage.content }}
            />
          ) : (
            <>
              {/* Introduction */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                  <Lock className="text-emerald-600" size={20} />
                  <span>1. Introduction & Overview</span>
                </h2>
                <p>
                  At <strong>Brisbane Carpet & Pest Experts</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), we are committed to respecting and protecting the privacy of all customers, clients, and website visitors. This Privacy Policy sets out how we collect, hold, use, disclose, and protect your personal information in accordance with the <strong>Privacy Act 1988 (Cth)</strong> and the <strong>Australian Privacy Principles (APPs)</strong>.
                </p>
                <p>
                  By engaging our bond cleaning, carpet steam cleaning, pest management, or commercial cleaning services, or by using our website (<Link href="/" className="text-emerald-600 underline">https://brisbanecarpetpestexperts.com.au</Link>), you consent to the data practices described in this policy.
                </p>
              </section>

              {/* Information Collected */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                  <FileText className="text-emerald-600" size={20} />
                  <span>2. Information We Collect</span>
                </h2>
                <p>
                  To provide you with reliable cleaning estimates, schedules, and service executions, we may collect the following personal information:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Contact details:</strong> Full name, telephone number, and email address.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Service address:</strong> Property street address, unit number, suburb, and postcode.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Property specifications:</strong> Number of bedrooms, bathrooms, carpeted areas, and pest concerns.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Payment & Transaction info:</strong> Billing history, invoice references, and payment confirmations.</span>
                  </li>
                </ul>
              </section>

              {/* How We Use Your Information */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                  <ShieldCheck className="text-emerald-600" size={20} />
                  <span>3. How We Use Your Information</span>
                </h2>
                <p>
                  We only use personal information for purposes related to our core business operations, which include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Preparing and dispatching formal cleaning cost estimates and quotes.</li>
                  <li>Scheduling field technicians and service teams to your designated property.</li>
                  <li>Providing real-time service updates, SMS arrival alerts, and completion notifications.</li>
                  <li>Processing tax invoices, receipts, and issuing Bond Back Guarantee certificates.</li>
                  <li>Customer support, complaint resolution, and quality assurance surveys.</li>
                  <li>Complying with legal obligations, tax laws, and workplace health and safety regulations in Queensland.</li>
                </ul>
              </section>

              {/* Data Security & Retention */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                  <Lock className="text-emerald-600" size={20} />
                  <span>4. Data Storage & Cyber Security</span>
                </h2>
                <p>
                  We implement robust technical and organizational security measures, including 256-bit SSL encryption, restricted role-based database access, and secure tokenization to safeguard your personal data from unauthorized access, loss, or misuse.
                </p>
                <p>
                  We do not sell, rent, or trade your personal information to third-party marketing companies under any circumstances.
                </p>
              </section>

              {/* Contact Us */}
              <section className="space-y-4 bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100">
                <h2 className="text-lg md:text-xl font-bold text-emerald-950 flex items-center gap-2">
                  <HelpCircle className="text-emerald-700" size={18} />
                  <span>5. Contact Our Privacy Officer</span>
                </h2>
                <p className="text-emerald-900 text-sm">
                  If you have questions regarding this Privacy Policy or wish to request access to or correction of your personal data, please contact our Brisbane Privacy Officer:
                </p>
                <div className="text-xs md:text-sm text-emerald-950 font-medium space-y-1">
                  <p><strong>Email:</strong> info@brisbane.com</p>
                  <p><strong>Phone:</strong> 0434 061 188</p>
                  <p><strong>Address:</strong> 192 Turton St, Sunnybank, QLD 4109, Australia</p>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
