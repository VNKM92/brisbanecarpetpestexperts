import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getPageMetadata } from "@/lib/metadata";
import { Cookie, Calendar, CheckCircle2, ChevronRight, ShieldCheck, Settings } from "lucide-react";

export const revalidate = 60;

export async function generateMetadata() {
  return getPageMetadata({
    slug: "cookie-policy",
    defaultTitle: "Cookie Policy | Brisbane Carpet & Pest Experts",
    defaultDescription: "Understand how Brisbane Carpet & Pest Experts uses cookies, web beacons, and local tracking technologies to optimize your browsing and booking experience.",
    path: "/cookie-policy",
  });
}

export default async function CookiePolicyPage() {
  let dbPage: any = null;
  try {
    dbPage = await prisma.page.findUnique({
      where: { slug: "cookie-policy" },
    });
  } catch (e) {
    console.error("Error loading cookie policy page:", e);
  }

  const title = dbPage?.heading || dbPage?.title || "Cookie Policy";
  const subtitle = dbPage?.subheading || "How we utilize cookies and tracking technologies to ensure optimal booking experiences.";
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
          <span className="text-gray-900 font-semibold">Cookie Policy</span>
        </nav>
      </div>

      {/* Hero Header */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div className="bg-gradient-to-br from-amber-900 via-stone-800 to-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold">
              <Cookie size={14} />
              <span>Cookies & Tracking Technology</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              {title}
            </h1>

            <p className="text-stone-300 text-sm md:text-base leading-relaxed">
              {subtitle}
            </p>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <Calendar size={14} />
                <span>Last updated: {lastUpdated}</span>
              </div>

              <Link
                href="/cookies-settings"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-xs transition"
              >
                <Settings size={13} />
                <span>Manage Preferences</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-3xl p-8 md:p-14 shadow-sm border border-gray-100 text-gray-700 space-y-10 leading-relaxed text-sm md:text-base">
          {dbPage?.content ? (
            <div
              className="prose max-w-none prose-amber"
              dangerouslySetInnerHTML={{ __html: dbPage.content }}
            />
          ) : (
            <>
              {/* 1. What are cookies */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                  <Cookie className="text-amber-600" size={20} />
                  <span>1. What Are Cookies?</span>
                </h2>
                <p>
                  Cookies are small text files placed on your computer, smartphone, or device when you visit our website. They allow the website to recognize your browser, remember your preferences (such as selected cleaning service packages), and provide a streamlined booking experience.
                </p>
              </section>

              {/* 2. Categories of cookies */}
              <section className="space-y-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                  <ShieldCheck className="text-amber-600" size={20} />
                  <span>2. Categories of Cookies We Use</span>
                </h2>

                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                    <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span>Strictly Necessary Cookies (Essential)</span>
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      These cookies are required for basic site security, load balancing, user authentication, and preserving quote cart inputs while navigating between pages.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                    <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      <span>Performance & Analytics Cookies</span>
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      Help us understand how visitors interact with our pages, which cleaning services are popular in Brisbane, and identify any page speed bottlenecks.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                    <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span>Functional & Preference Cookies</span>
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      Enable enhanced website functionality such as remembering your preferred suburb or phone contact preferences across sessions.
                    </p>
                  </div>
                </div>
              </section>

              {/* 3. Managing your preferences */}
              <section className="space-y-4 bg-amber-50/70 p-6 md:p-8 rounded-2xl border border-amber-200">
                <h2 className="text-lg md:text-xl font-bold text-amber-950 flex items-center gap-2">
                  <Settings className="text-amber-700" size={20} />
                  <span>3. How to Manage Cookie Preferences</span>
                </h2>
                <p className="text-amber-900 text-sm">
                  You can change your consent settings at any time by visiting our dedicated <Link href="/cookies-settings" className="font-bold underline text-amber-950">Cookies Settings Dashboard</Link> or by adjusting your browser settings to block or delete cookies.
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
