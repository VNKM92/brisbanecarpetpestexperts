"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Save,
  Building,
  Phone,
  Mail,
  MapPin,
  Globe,
  Share2,
  DollarSign,
  CheckCircle2,
  Image as ImageIcon,
  Sparkles,
  Layout,
  ExternalLink,
} from "lucide-react";
import MediaPickerModal from "@/app/admin/components/MediaPickerModal";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Media picker states
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [activeMediaTarget, setActiveMediaTarget] = useState<string>("");

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/admin/settings");
        const json = await res.json();
        if (json.success) {
          const map: Record<string, string> = {};
          for (const item of json.data) {
            map[item.key] = item.value;
          }
          setSettings(map);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleOpenMediaPicker = (targetKey: string) => {
    setActiveMediaTarget(targetKey);
    setMediaPickerOpen(true);
  };

  const handleMediaSelect = (url: string) => {
    if (activeMediaTarget) {
      handleChange(activeMediaTarget, url);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });
      const json = await res.json();
      if (json.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-xs text-slate-500 py-10 text-center">Loading site settings...</p>;
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Settings className="text-emerald-400" size={24} />
            <span>Global Site, Branding & Footer Settings</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Customize header/footer logos, slogans, footer columns, contact numbers, social media, and default SEO.
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-5 py-2.5 rounded-lg shadow transition flex items-center gap-2 self-start sm:self-auto cursor-pointer disabled:opacity-50"
        >
          <Save size={15} />
          <span>{saving ? "Saving..." : "Save Settings"}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 size={16} />
          <span>Settings saved successfully and immediately synced with the live website!</span>
        </div>
      )}

      {/* 1. Branding: Logos & Slogans */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-5">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Sparkles className="text-amber-400" size={18} />
          <span>Branding, Logos & Slogan</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Header Logo */}
          <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
            <label className="block text-slate-300 font-semibold">Header Logo</label>
            <div className="flex items-center gap-3">
              <div className="w-16 h-12 bg-slate-950 border border-slate-700 rounded-lg flex items-center justify-center overflow-hidden p-1">
                {settings.header_logo || settings.site_logo ? (
                  <img
                    src={settings.header_logo || settings.site_logo}
                    alt="Header Logo Preview"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <ImageIcon size={20} className="text-slate-600" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <input
                  type="text"
                  value={settings.header_logo || settings.site_logo || ""}
                  onChange={(e) => {
                    handleChange("header_logo", e.target.value);
                    handleChange("site_logo", e.target.value);
                  }}
                  placeholder="/logo.png or https://..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-xs focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() => handleOpenMediaPicker("header_logo")}
                  className="text-[11px] text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <ImageIcon size={12} />
                  <span>Upload File / Choose from Media</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Logo */}
          <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
            <label className="block text-slate-300 font-semibold">Footer Logo</label>
            <div className="flex items-center gap-3">
              <div className="w-16 h-12 bg-slate-950 border border-slate-700 rounded-lg flex items-center justify-center overflow-hidden p-1">
                {settings.footer_logo ? (
                  <img
                    src={settings.footer_logo}
                    alt="Footer Logo Preview"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <ImageIcon size={20} className="text-slate-600" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <input
                  type="text"
                  value={settings.footer_logo || ""}
                  onChange={(e) => handleChange("footer_logo", e.target.value)}
                  placeholder="/logo.png or https://..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-xs focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() => handleOpenMediaPicker("footer_logo")}
                  className="text-[11px] text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <ImageIcon size={12} />
                  <span>Upload File / Choose from Media</span>
                </button>
              </div>
            </div>
          </div>

          {/* Site Slogan / Tagline */}
          <div className="md:col-span-2">
            <label className="block text-slate-400 font-semibold mb-1">Company Slogan / Tagline</label>
            <input
              type="text"
              value={settings.site_slogan || ""}
              onChange={(e) => handleChange("site_slogan", e.target.value)}
              placeholder="Eco-Friendly Steam Carpet Cleaning & Pest Control in Brisbane"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* 2. Company & Contact Details */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Building className="text-emerald-400" size={18} />
          <span>Company & Contact Details</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Company / Brand Name</label>
            <input
              type="text"
              value={settings.site_name || ""}
              onChange={(e) => handleChange("site_name", e.target.value)}
              placeholder="Brisbane Carpet & Pest Experts"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Primary Phone Number</label>
            <input
              type="text"
              value={settings.company_phone || ""}
              onChange={(e) => handleChange("company_phone", e.target.value)}
              placeholder="0434 061 188"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Primary Email Address</label>
            <input
              type="email"
              value={settings.company_email || ""}
              onChange={(e) => handleChange("company_email", e.target.value)}
              placeholder="info@brisbane.com"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Business Operating Hours</label>
            <input
              type="text"
              value={settings.business_hours || ""}
              onChange={(e) => handleChange("business_hours", e.target.value)}
              placeholder="Monday to Saturday: 8:00 AM – 6:00 PM"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-400 font-semibold mb-1">Physical Business Address</label>
            <input
              type="text"
              value={settings.company_address || ""}
              onChange={(e) => handleChange("company_address", e.target.value)}
              placeholder="192 Turton St, Sunnybank, QLD 4109, Australia"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* 3. Footer Sections & Modular Columns */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Layout className="text-indigo-400" size={18} />
          <span>Footer Sections & Modular Columns</span>
        </h2>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Footer About / Bio Text</label>
            <textarea
              rows={2}
              value={settings.footer_about_text || ""}
              onChange={(e) => handleChange("footer_about_text", e.target.value)}
              placeholder="We clean with care, precision, and eco-friendly products across Brisbane and surrounding Queensland suburbs."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Footer CTA Button Text</label>
              <input
                type="text"
                value={settings.footer_cta_text || "Book A Free Consultation"}
                onChange={(e) => handleChange("footer_cta_text", e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Footer CTA Button Link</label>
              <input
                type="text"
                value={settings.footer_cta_link || "/contact"}
                onChange={(e) => handleChange("footer_cta_link", e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Footer Copyright Notice</label>
            <input
              type="text"
              value={settings.footer_copyright || ""}
              onChange={(e) => handleChange("footer_copyright", e.target.value)}
              placeholder="© 2026 Brisbane Carpet & Pest Experts. All rights reserved."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* 4. Social Media Channels */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Share2 className="text-blue-400" size={18} />
          <span>Social Media Channels</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Facebook URL</label>
            <input
              type="text"
              value={settings.social_facebook || ""}
              onChange={(e) => handleChange("social_facebook", e.target.value)}
              placeholder="https://facebook.com/..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Instagram URL</label>
            <input
              type="text"
              value={settings.social_instagram || ""}
              onChange={(e) => handleChange("social_instagram", e.target.value)}
              placeholder="https://instagram.com/..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Twitter / X URL</label>
            <input
              type="text"
              value={settings.social_twitter || ""}
              onChange={(e) => handleChange("social_twitter", e.target.value)}
              placeholder="https://twitter.com/..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">LinkedIn URL</label>
            <input
              type="text"
              value={settings.social_linkedin || ""}
              onChange={(e) => handleChange("social_linkedin", e.target.value)}
              placeholder="https://linkedin.com/..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* 5. Estimator Pricing Rates */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <DollarSign className="text-emerald-400" size={18} />
          <span>Interactive Cost Estimator Pricing Rules</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Base Estimator Rate ($)</label>
            <input
              type="number"
              value={settings.pricing_base_rate || "700"}
              onChange={(e) => handleChange("pricing_base_rate", e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Supplies Addon Rate ($)</label>
            <input
              type="number"
              value={settings.pricing_supplies_rate || "40"}
              onChange={(e) => handleChange("pricing_supplies_rate", e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* 6. Global Default SEO */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Globe className="text-teal-400" size={18} />
          <span>Global Search Engine Optimization (SEO) Defaults</span>
        </h2>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Default Meta Title</label>
            <input
              type="text"
              value={settings.default_meta_title || ""}
              onChange={(e) => handleChange("default_meta_title", e.target.value)}
              placeholder="Brisbane Carpet & Pest Experts - Professional Cleaning"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Default Meta Description</label>
            <textarea
              rows={2}
              value={settings.default_meta_desc || ""}
              onChange={(e) => handleChange("default_meta_desc", e.target.value)}
              placeholder="Brisbane's top-rated bond cleaning, pest control, and carpet cleaning experts..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-500 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Save size={16} />
          <span>{saving ? "Saving Changes..." : "Save All Settings"}</span>
        </button>
      </div>

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelect={handleMediaSelect}
        title="Select Logo / Image"
      />
    </form>
  );
}
