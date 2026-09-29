"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Search,
  Plus,
  Trash2,
  Edit,
  Eye,
  X,
  Check,
  Star,
  Layers,
} from "lucide-react";

export default function AdminServicesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>({
    name: "",
    slug: "",
    categoryId: "",
    shortDesc: "",
    description: "",
    priceStarting: "",
    priceUnit: "Fixed",
    duration: "2-3 hours",
    icon: "🏠",
    heroImage: "",
    features: "",
    metaTitle: "",
    metaDesc: "",
    isFeatured: false,
    isActive: true,
    order: 0,
  });
  const [saving, setSaving] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const url = new URL("/api/admin/services", window.location.origin);
      if (search) url.searchParams.set("search", search);

      const res = await fetch(url.toString());
      const json = await res.json();
      if (json.success) {
        setItems(json.data.items);
        setCategories(json.data.categories);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchServices();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const method = formData.id ? "PATCH" : "POST";
      await fetch("/api/admin/services", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setModalOpen(false);
      fetchServices();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await fetch(`/api/admin/services?id=${id}`, { method: "DELETE" });
      fetchServices();
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
            <Sparkles className="text-emerald-400" size={24} />
            <span>Cleaning & Pest Services Catalog</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Configure public cleaning packages, tab pricing, SEO titles, and hero images.
          </p>
        </div>
        <button
          onClick={() => {
            setFormData({
              name: "",
              slug: "",
              categoryId: categories[0]?.id || "",
              shortDesc: "",
              description: "",
              priceStarting: 150,
              priceUnit: "Fixed",
              duration: "2-3 hours",
              icon: "✨",
              heroImage: "/assets/home/image/brisbanecarpetpestexperts-img3-1.jpg",
              features: "Deep cleaning, Sanitization, Eco-friendly, Satisfaction Guarantee",
              metaTitle: "",
              metaDesc: "",
              isFeatured: false,
              isActive: true,
              order: items.length + 1,
            });
            setModalOpen(true);
          }}
          className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Plus size={16} />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
        <form onSubmit={handleSearch} className="relative max-w-md">
          <Search className="absolute left-3.5 top-2.5 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Search service name, slug, description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </form>
      </div>

      {/* Table */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Service Name</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Starting Price</th>
                <th className="py-3.5 px-4">Duration</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-500">
                    Loading services...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-500">
                    No services found.
                  </td>
                </tr>
              ) : (
                items.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-900/60 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{s.icon || "🧹"}</span>
                        <div>
                          <p className="font-semibold text-white">{s.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">/services/{s.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {s.category?.name || "General"}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-emerald-400 text-sm">
                      ${s.priceStarting || 0} {s.priceUnit}
                    </td>
                    <td className="py-3 px-4 text-slate-400">{s.duration || "—"}</td>
                    <td className="py-3 px-4">
                      {s.isFeatured ? (
                        <span className="px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 font-semibold border border-amber-800/60 flex items-center gap-1 w-max">
                          <Star size={11} className="fill-amber-400" /> Featured
                        </span>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          s.isActive
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                            : "bg-slate-800 text-slate-500"
                        }`}
                      >
                        {s.isActive ? "ACTIVE" : "HIDDEN"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`/services/${s.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                          title="Preview Page"
                        >
                          <Eye size={14} />
                        </a>
                        <button
                          onClick={() => {
                            setFormData(s);
                            setModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-900/60 text-slate-300 hover:text-emerald-300 transition"
                          title="Edit Service"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(s.id)}
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

      {/* Service Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSave}
            className="bg-slate-950 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 sticky top-0 bg-slate-950 z-10">
              <h2 className="text-sm font-bold text-white">
                {formData.id ? "Edit Service Package" : "Add New Service"}
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
                  <label className="block text-slate-400 font-semibold mb-1">Service Name*</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Slug (URL)</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. bond-cleaning-brisbane"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Category</label>
                  <select
                    value={formData.categoryId || ""}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Starting Price ($)</label>
                  <input
                    type="number"
                    value={formData.priceStarting}
                    onChange={(e) => setFormData({ ...formData, priceStarting: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g. 3-4 hours"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Short Description</label>
                <input
                  type="text"
                  value={formData.shortDesc || ""}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Full Service Content</label>
                <textarea
                  rows={4}
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Hero Image URL</label>
                <input
                  type="text"
                  value={formData.heroImage || ""}
                  onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                  placeholder="/assets/home/image/brisbanecarpetpestexperts-img3-1.jpg"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* SEO Tags */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <span className="text-emerald-400 font-semibold block">SEO Metadata</span>
                <div>
                  <label className="block text-slate-400 mb-1">Meta Title</label>
                  <input
                    type="text"
                    value={formData.metaTitle || ""}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                    placeholder="Page title tag for Google search"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Meta Description</label>
                  <textarea
                    rows={2}
                    value={formData.metaDesc || ""}
                    onChange={(e) => setFormData({ ...formData, metaDesc: e.target.value })}
                    placeholder="150-160 characters summary snippet"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded text-emerald-500 focus:ring-0"
                  />
                  <span>Show as Featured on Homepage</span>
                </label>

                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded text-emerald-500 focus:ring-0"
                  />
                  <span>Active & Published</span>
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
                {saving ? "Saving..." : "Save Service"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
