"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Save,
  Image as ImageIcon,
  CheckCircle2,
  Globe,
  Sliders,
  Layout,
  Info,
  Layers,
  PhoneCall,
  Award,
} from "lucide-react";
import MediaPickerModal from "../components/MediaPickerModal";
import { DEFAULT_HOMEPAGE_SECTIONS } from "@/lib/homepage-defaults";

export default function AdminHomepageCMSPage() {
  const [sections, setSections] = useState<any>(DEFAULT_HOMEPAGE_SECTIONS);
  const [activeTab, setActiveTab] = useState<
    "hero" | "about" | "estimate" | "mainCard" | "cleanCTA" | "seo"
  >("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Media Picker state
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<string>("");
  const [pickerTitle, setPickerTitle] = useState<string>("");

  useEffect(() => {
    async function loadHomepage() {
      try {
        const res = await fetch("/api/admin/homepage");
        const json = await res.json();
        if (json.success && json.data) {
          setSections(json.data);
        }
      } catch (e) {
        console.error("Failed to load homepage sections:", e);
      } finally {
        setLoading(false);
      }
    }
    loadHomepage();
  }, []);

  const openMediaPicker = (targetPath: string, title: string) => {
    setPickerTarget(targetPath);
    setPickerTitle(title);
    setPickerOpen(true);
  };

  const handleMediaSelect = (url: string) => {
    const parts = pickerTarget.split(".");
    setSections((prev: any) => {
      const next = { ...prev };
      if (parts.length === 2) {
        next[parts[0]] = { ...next[parts[0]], [parts[1]]: url };
      } else if (parts.length === 3) {
        next[parts[0]][parts[1]] = { ...next[parts[0]][parts[1]], [parts[2]]: url };
      }
      return next;
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch("/api/admin/homepage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sections }),
      });
      const json = await res.json();
      if (json.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Failed to save homepage:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-slate-500 text-xs">
        Loading Homepage CMS Editor...
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Layout className="text-emerald-400" size={24} />
            <span>Frontend Homepage CMS Manager</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Fully customize every section, heading, slogan, CTA button, image and SEO metadata on the public homepage.
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-6 py-2.5 rounded-xl shadow-lg transition flex items-center gap-2 self-start sm:self-auto cursor-pointer disabled:opacity-50"
        >
          <Save size={16} />
          <span>{saving ? "Saving Changes..." : "Save Homepage"}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 size={16} />
          <span>Homepage sections saved successfully and live on the public website!</span>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
        {[
          { id: "hero", label: "1. Hero Section", icon: Sparkles },
          { id: "about", label: "2. Home About Us", icon: Info },
          { id: "estimate", label: "3. Quick Estimate", icon: Sliders },
          { id: "mainCard", label: "4. Why Choose Us", icon: Layers },
          { id: "cleanCTA", label: "5. What Can We Clean", icon: PhoneCall },
          { id: "seo", label: "6. Homepage SEO Meta", icon: Globe },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
                isActive
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Hero Section */}
      {activeTab === "hero" && (
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sparkles className="text-emerald-400" size={18} />
            <span>Hero Banner & Value Proposition</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="md:col-span-2">
              <label className="block text-slate-400 font-semibold mb-1">Badge Slogan</label>
              <input
                type="text"
                value={sections.hero?.badge || ""}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    hero: { ...sections.hero, badge: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-400 font-semibold mb-1">Main Heading</label>
              <input
                type="text"
                value={sections.hero?.heading || ""}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    hero: { ...sections.hero, heading: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-bold text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-400 font-semibold mb-1">Subheading / Description</label>
              <textarea
                rows={3}
                value={sections.hero?.subheading || ""}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    hero: { ...sections.hero, subheading: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Primary Button Text</label>
              <input
                type="text"
                value={sections.hero?.primaryCtaText || ""}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    hero: { ...sections.hero, primaryCtaText: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Primary Button Link</label>
              <input
                type="text"
                value={sections.hero?.primaryCtaLink || ""}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    hero: { ...sections.hero, primaryCtaLink: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Secondary Button Text</label>
              <input
                type="text"
                value={sections.hero?.secondaryCtaText || ""}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    hero: { ...sections.hero, secondaryCtaText: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Secondary Button Link</label>
              <input
                type="text"
                value={sections.hero?.secondaryCtaLink || ""}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    hero: { ...sections.hero, secondaryCtaLink: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Phone Number Display</label>
              <input
                type="text"
                value={sections.hero?.phoneDisplay || ""}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    hero: { ...sections.hero, phoneDisplay: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Hero Image</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={sections.hero?.heroImage || ""}
                  onChange={(e) =>
                    setSections({
                      ...sections,
                      hero: { ...sections.hero, heroImage: e.target.value },
                    })
                  }
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500 font-mono text-[11px]"
                />
                <button
                  type="button"
                  onClick={() => openMediaPicker("hero.heroImage", "Select Hero Image")}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1"
                >
                  <ImageIcon size={14} />
                  <span>Choose/Upload</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Home About Us */}
      {activeTab === "about" && (
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Info className="text-orange-400" size={18} />
            <span>Home About Us & Value Highlights</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Slogan Badge Text</label>
              <input
                type="text"
                value={sections.homeAbout?.sloganBadge || ""}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    homeAbout: { ...sections.homeAbout, sloganBadge: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Heading Prefix</label>
              <input
                type="text"
                value={sections.homeAbout?.title || ""}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    homeAbout: { ...sections.homeAbout, title: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Heading Highlighted Word</label>
              <input
                type="text"
                value={sections.homeAbout?.titleHighlight || ""}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    homeAbout: { ...sections.homeAbout, titleHighlight: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Satisfaction Rate (%)</label>
              <input
                type="text"
                value={sections.homeAbout?.satisfactionRate || ""}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    homeAbout: { ...sections.homeAbout, satisfactionRate: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-400 font-semibold mb-1">About Image</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={sections.homeAbout?.aboutImage || ""}
                  onChange={(e) =>
                    setSections({
                      ...sections,
                      homeAbout: { ...sections.homeAbout, aboutImage: e.target.value },
                    })
                  }
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono text-[11px]"
                />
                <button
                  type="button"
                  onClick={() => openMediaPicker("homeAbout.aboutImage", "Select About Image")}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1"
                >
                  <ImageIcon size={14} />
                  <span>Choose/Upload</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Quick Estimate Section */}
      {activeTab === "estimate" && (
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sliders className="text-emerald-400" size={18} />
            <span>Interactive Quick Estimate & Booking Steps</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Section Title</label>
              <input
                type="text"
                value={sections.estimateSection?.title || ""}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    estimateSection: { ...sections.estimateSection, title: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Section Subtitle</label>
              <input
                type="text"
                value={sections.estimateSection?.subtitle || ""}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    estimateSection: { ...sections.estimateSection, subtitle: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
              />
            </div>

            <div className="md:col-span-2 pt-2 border-t border-slate-800">
              <span className="text-emerald-400 font-bold">Step 1:</span>
              <input
                type="text"
                placeholder="Title"
                value={sections.estimateSection?.step1Title || ""}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    estimateSection: { ...sections.estimateSection, step1Title: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-white mt-1 mb-2"
              />
              <textarea
                rows={2}
                placeholder="Description"
                value={sections.estimateSection?.step1Desc || ""}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    estimateSection: { ...sections.estimateSection, step1Desc: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-white"
              />
            </div>

            <div className="md:col-span-2 pt-2 border-t border-slate-800">
              <span className="text-emerald-400 font-bold">Step 2:</span>
              <input
                type="text"
                placeholder="Title"
                value={sections.estimateSection?.step2Title || ""}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    estimateSection: { ...sections.estimateSection, step2Title: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-white mt-1 mb-2"
              />
              <textarea
                rows={2}
                placeholder="Description"
                value={sections.estimateSection?.step2Desc || ""}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    estimateSection: { ...sections.estimateSection, step2Desc: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-white"
              />
            </div>

            <div className="md:col-span-2 pt-2 border-t border-slate-800">
              <span className="text-emerald-400 font-bold">Step 3:</span>
              <input
                type="text"
                placeholder="Title"
                value={sections.estimateSection?.step3Title || ""}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    estimateSection: { ...sections.estimateSection, step3Title: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-white mt-1 mb-2"
              />
              <textarea
                rows={2}
                placeholder="Description"
                value={sections.estimateSection?.step3Desc || ""}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    estimateSection: { ...sections.estimateSection, step3Desc: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Main Card / Why Choose Us */}
      {activeTab === "mainCard" && (
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Layers className="text-teal-400" size={18} />
            <span>Why Choose Us Feature Section</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Section Badge</label>
              <input
                type="text"
                value={sections.mainCard?.badge || ""}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    mainCard: { ...sections.mainCard, badge: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Main Title</label>
              <input
                type="text"
                value={sections.mainCard?.title || ""}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    mainCard: { ...sections.mainCard, title: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-400 font-semibold mb-1">Description</label>
              <textarea
                rows={3}
                value={sections.mainCard?.description || ""}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    mainCard: { ...sections.mainCard, description: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-400 font-semibold mb-1">Feature Banner Image</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={sections.mainCard?.bannerImage || ""}
                  onChange={(e) =>
                    setSections({
                      ...sections,
                      mainCard: { ...sections.mainCard, bannerImage: e.target.value },
                    })
                  }
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono text-[11px]"
                />
                <button
                  type="button"
                  onClick={() => openMediaPicker("mainCard.bannerImage", "Select Feature Banner Image")}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1"
                >
                  <ImageIcon size={14} />
                  <span>Choose/Upload</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: What Can We Clean CTA Banner */}
      {activeTab === "cleanCTA" && (
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <PhoneCall className="text-orange-400" size={18} />
            <span>"What Can We Clean" Bottom CTA Section</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Heading</label>
              <input
                type="text"
                value={sections.whatCanWeClean?.heading || ""}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    whatCanWeClean: { ...sections.whatCanWeClean, heading: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Subheading</label>
              <input
                type="text"
                value={sections.whatCanWeClean?.subheading || ""}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    whatCanWeClean: { ...sections.whatCanWeClean, subheading: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Call Number Display</label>
              <input
                type="text"
                value={sections.whatCanWeClean?.phone || ""}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    whatCanWeClean: { ...sections.whatCanWeClean, phone: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Cleaner Image</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={sections.whatCanWeClean?.cleanerImage || ""}
                  onChange={(e) =>
                    setSections({
                      ...sections,
                      whatCanWeClean: { ...sections.whatCanWeClean, cleanerImage: e.target.value },
                    })
                  }
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono text-[11px]"
                />
                <button
                  type="button"
                  onClick={() => openMediaPicker("whatCanWeClean.cleanerImage", "Select Cleaner Image")}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1"
                >
                  <ImageIcon size={14} />
                  <span>Choose/Upload</span>
                </button>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-400 font-semibold mb-1">Award / Guarantee Badge Image</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={sections.whatCanWeClean?.awardBadgeImage || ""}
                  onChange={(e) =>
                    setSections({
                      ...sections,
                      whatCanWeClean: { ...sections.whatCanWeClean, awardBadgeImage: e.target.value },
                    })
                  }
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono text-[11px]"
                />
                <button
                  type="button"
                  onClick={() => openMediaPicker("whatCanWeClean.awardBadgeImage", "Select Award Badge Image")}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1"
                >
                  <ImageIcon size={14} />
                  <span>Choose/Upload</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Homepage Dynamic SEO */}
      {activeTab === "seo" && (
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Globe className="text-teal-400" size={18} />
            <span>Homepage SEO Metadata & Social Sharing</span>
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Meta Title</label>
              <input
                type="text"
                value={sections.seo?.metaTitle || ""}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    seo: { ...sections.seo, metaTitle: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Meta Description</label>
              <textarea
                rows={3}
                value={sections.seo?.metaDesc || ""}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    seo: { ...sections.seo, metaDesc: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Meta Keywords (comma separated)</label>
              <input
                type="text"
                value={sections.seo?.metaKeywords || ""}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    seo: { ...sections.seo, metaKeywords: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Canonical URL</label>
                <input
                  type="text"
                  value={sections.seo?.canonicalUrl || ""}
                  onChange={(e) =>
                    setSections({
                      ...sections,
                      seo: { ...sections.seo, canonicalUrl: e.target.value },
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Robots Directives</label>
                <input
                  type="text"
                  value={sections.seo?.robots || "index, follow"}
                  onChange={(e) =>
                    setSections({
                      ...sections,
                      seo: { ...sections.seo, robots: e.target.value },
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Social Sharing Image (OG Image)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={sections.seo?.ogImage || ""}
                  onChange={(e) =>
                    setSections({
                      ...sections,
                      seo: { ...sections.seo, ogImage: e.target.value },
                    })
                  }
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono text-[11px]"
                />
                <button
                  type="button"
                  onClick={() => openMediaPicker("seo.ogImage", "Select OG Share Image")}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1"
                >
                  <ImageIcon size={14} />
                  <span>Choose/Upload</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={handleMediaSelect}
        title={pickerTitle}
      />

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-8 py-3 rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Save size={16} />
          <span>{saving ? "Saving Changes..." : "Save Homepage Content"}</span>
        </button>
      </div>
    </form>
  );
}
