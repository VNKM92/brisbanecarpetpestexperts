"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Search,
  Plus,
  Trash2,
  Edit,
  Eye,
  X,
  Globe,
  Code,
} from "lucide-react";

export default function AdminPagesManager() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>({
    title: "",
    slug: "",
    heading: "",
    subheading: "",
    content: "",
    bannerImage: "",
    metaTitle: "",
    metaDesc: "",
    canonicalUrl: "",
    ogImage: "",
    robots: "index, follow",
    customSchema: "",
    isPublished: true,
  });
  const [saving, setSaving] = useState(false);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/pages");
      const json = await res.json();
      if (json.success) {
        setItems(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const method = formData.id ? "PATCH" : "POST";
      await fetch("/api/admin/pages", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setModalOpen(false);
      fetchPages();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this page entry?")) return;
    try {
      await fetch(`/api/admin/pages?id=${id}`, { method: "DELETE" });
      fetchPages();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <FileText className="text-emerald-400" size={24} />
            <span>CMS Pages & SEO Meta Tag Editor</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Customize page headers, text content, meta titles, descriptions, canonical URLs, and schema markup.
          </p>
        </div>
        <button
          onClick={() => {
            setFormData({
              title: "",
              slug: "",
              heading: "",
              subheading: "",
              content: "",
              bannerImage: "",
              metaTitle: "",
              metaDesc: "",
              canonicalUrl: "",
              ogImage: "",
              robots: "index, follow",
              customSchema: "",
              isPublished: true,
            });
            setModalOpen(true);
          }}
          className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Plus size={16} />
          <span>Add New Page</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Page Title</th>
                <th className="py-3.5 px-4">URL Slug</th>
                <th className="py-3.5 px-4">Meta Title</th>
                <th className="py-3.5 px-4">Robots</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-500">
                    Loading pages...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-500">
                    No CMS pages configured. Click "Add New Page".
                  </td>
                </tr>
              ) : (
                items.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-900/60 transition">
                    <td className="py-3 px-4 font-semibold text-white">{p.title}</td>
                    <td className="py-3 px-4 font-mono text-emerald-400">/{p.slug}</td>
                    <td className="py-3 px-4 text-slate-300 max-w-xs truncate">
                      {p.metaTitle || p.title}
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-mono text-[10px]">
                      {p.robots || "index, follow"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          p.isPublished
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                            : "bg-slate-800 text-slate-500"
                        }`}
                      >
                        {p.isPublished ? "PUBLISHED" : "DRAFT"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`/${p.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                          title="View Public Page"
                        >
                          <Eye size={14} />
                        </a>
                        <button
                          onClick={() => {
                            setFormData(p);
                            setModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-900/60 text-slate-300 hover:text-emerald-300 transition"
                          title="Edit"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900/60 text-slate-400 hover:text-red-300 transition"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Page Edit/Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSave}
            className="bg-slate-950 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 sticky top-0 bg-slate-950 z-10">
              <h2 className="text-sm font-bold text-white">
                {formData.id ? "Edit CMS Page & SEO Meta" : "Create New CMS Page"}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Page Title*</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. about-us, special-offers"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Banner Heading</label>
                <input
                  type="text"
                  value={formData.heading || ""}
                  onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Subheading / Excerpt</label>
                <textarea
                  rows={2}
                  value={formData.subheading || ""}
                  onChange={(e) => setFormData({ ...formData, subheading: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              {/* SEO Meta Section */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <Globe size={14} /> Full SEO & Social Metadata Configuration
                </span>

                <div>
                  <label className="block text-slate-400 mb-1">Meta Title (Google Title Tag)</label>
                  <input
                    type="text"
                    value={formData.metaTitle || ""}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                    placeholder="Brisbane Carpet & Pest Experts"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Meta Description</label>
                  <textarea
                    rows={2}
                    value={formData.metaDesc || ""}
                    onChange={(e) => setFormData({ ...formData, metaDesc: e.target.value })}
                    placeholder="Comprehensive overview of service for search engine results..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Canonical URL</label>
                    <input
                      type="text"
                      value={formData.canonicalUrl || ""}
                      onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                      placeholder="https://brisbane.com/services/..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Robots Tag</label>
                    <input
                      type="text"
                      value={formData.robots || "index, follow"}
                      onChange={(e) => setFormData({ ...formData, robots: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">OpenGraph / Twitter Image URL</label>
                  <input
                    type="text"
                    value={formData.ogImage || ""}
                    onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                    placeholder="/images/og-image.jpg"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Custom JSON-LD Schema (Optional)</label>
                  <textarea
                    rows={2}
                    value={formData.customSchema || ""}
                    onChange={(e) => setFormData({ ...formData, customSchema: e.target.value })}
                    placeholder='{"@context": "https://schema.org", "@type": "LocalBusiness", ...}'
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono text-[11px] focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="rounded text-emerald-500 focus:ring-0"
                  />
                  <span>Published & Publicly Accessible</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800 sticky bottom-0 bg-slate-950">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Page & Metadata"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
