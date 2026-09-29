"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, CheckCircle2, ChevronRight, ShieldCheck, Lock, Sliders, Save, RefreshCw } from "lucide-react";

export default function CookiesSettingsPage() {
  const [preferences, setPreferences] = useState({
    essential: true, // Always true
    analytics: true,
    functional: true,
    marketing: false,
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cookie_preferences");
      if (stored) {
        setPreferences({ ...JSON.parse(stored), essential: true });
      }
    } catch (e) {}
  }, []);

  const handleToggle = (key: "analytics" | "functional" | "marketing") => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setSaved(false);
  };

  const handleSave = () => {
    try {
      localStorage.setItem("cookie_preferences", JSON.stringify(preferences));
      setSaved(true);
      setTimeout(() => setSaved(false), 4000);
    } catch (e) {}
  };

  const handleAcceptAll = () => {
    const allOn = {
      essential: true,
      analytics: true,
      functional: true,
      marketing: true,
    };
    setPreferences(allOn);
    try {
      localStorage.setItem("cookie_preferences", JSON.stringify(allOn));
      setSaved(true);
      setTimeout(() => setSaved(false), 4000);
    } catch (e) {}
  };

  return (
    <div className="bg-[#f9f7f3] min-h-screen pt-28 pb-20">
      {/* Breadcrumbs */}
      <div className="max-w-5xl mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <Link href="/" className="hover:text-green-700 transition">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-semibold">Cookies Settings</span>
        </nav>
      </div>

      {/* Hero Header */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div className="bg-gradient-to-br from-teal-950 via-slate-900 to-emerald-950 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold">
              <Sliders size={14} />
              <span>Privacy & Cookie Consent Manager</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Cookies Settings
            </h1>

            <p className="text-teal-100/90 text-sm md:text-base leading-relaxed">
              Take full control over which cookies and tracking data we use during your visit. You can update these preferences anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Preferences Center Card */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-3xl p-8 md:p-14 shadow-sm border border-gray-100 text-gray-700 space-y-10 leading-relaxed text-sm md:text-base">
          {saved && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3 animate-fadeIn">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
              <span>Your cookie consent preferences have been updated and saved successfully!</span>
            </div>
          )}

          {/* Intro text */}
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Customize Your Cookie Preferences
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              When you visit our website, we store and retrieve information on your browser, mostly in the form of cookies. This information might be about you, your preferences, or your device and is mostly used to make the site work as expected.
            </p>
          </div>

          {/* Toggle Items */}
          <div className="space-y-6">
            {/* Essential */}
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900 text-base">Strictly Necessary Cookies</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-gray-200 text-gray-700 text-[11px] font-bold uppercase tracking-wider">
                    Always Active
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  These cookies are necessary for the website to function properly. They enable core functionalities like secure logins, session validation, form token protection, and price estimate calculation.
                </p>
              </div>
              <div className="shrink-0 flex items-center">
                <span className="text-xs text-gray-400 font-semibold italic">Required</span>
              </div>
            </div>

            {/* Analytics */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-teal-300 transition">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900 text-base">Analytics & Performance Cookies</span>
                  {preferences.analytics ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                      Enabled
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">
                      Disabled
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Help us count visits and traffic sources so we can measure and improve the speed and responsiveness of our Brisbane carpet and pest service pages.
                </p>
              </div>
              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggle("analytics")}
                  className={`w-14 h-8 flex items-center rounded-full p-1 transition cursor-pointer ${
                    preferences.analytics ? "bg-teal-600 justify-end" : "bg-gray-300 justify-start"
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-white shadow-md transform transition" />
                </button>
              </div>
            </div>

            {/* Functional */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-teal-300 transition">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900 text-base">Functional Cookies</span>
                  {preferences.functional ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                      Enabled
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">
                      Disabled
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Enable advanced functionality and personalization, such as remembering your preferred quote form inputs and suburb preferences.
                </p>
              </div>
              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggle("functional")}
                  className={`w-14 h-8 flex items-center rounded-full p-1 transition cursor-pointer ${
                    preferences.functional ? "bg-teal-600 justify-end" : "bg-gray-300 justify-start"
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-white shadow-md transform transition" />
                </button>
              </div>
            </div>

            {/* Marketing */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-teal-300 transition">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900 text-base">Targeting & Marketing Cookies</span>
                  {preferences.marketing ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                      Enabled
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">
                      Disabled
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Used by our marketing partners to build a profile of your interests and show you relevant seasonal cleaning promotions on other sites.
                </p>
              </div>
              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggle("marketing")}
                  className={`w-14 h-8 flex items-center rounded-full p-1 transition cursor-pointer ${
                    preferences.marketing ? "bg-teal-600 justify-end" : "bg-gray-300 justify-start"
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-white shadow-md transform transition" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
            <Link
              href="/cookie-policy"
              className="text-xs text-gray-500 hover:text-teal-700 underline font-medium"
            >
              Read our full Cookie Policy →
            </Link>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-xs transition cursor-pointer"
              >
                Accept All Cookies
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Save size={15} />
                <span>Save Preferences</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
