"use client";

import React, { useState, useEffect } from "react";
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Copy,
  Check,
  X,
  Folder,
} from "lucide-react";

export default function AdminMediaPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    filename: "",
    url: "",
    mimeType: "image/jpeg",
    size: 240000,
    altText: "",
    folder: "services",
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Preset gallery assets available in /public
  const stockAssets = [
    { name: "Carpet Service 1", url: "/assets/about/carpet-service-1.jpg", folder: "services" },
    { name: "Home Clean", url: "/assets/about/home-clean.jpg", folder: "domestic" },
    { name: "Office Clean", url: "/assets/about/office-clean.jpg", folder: "commercial" },
    { name: "Sofa Clean", url: "/assets/about/sofa-clean.jpg", folder: "services" },
    { name: "Window Clean", url: "/assets/about/windowcleaning.jpg", folder: "services" },
    { name: "Satisfaction Badge", url: "/assets/home/100-Satisfaction.png", folder: "branding" },
    { name: "Cleaner Worker", url: "/worker.png", folder: "branding" },
    { name: "Cleaning Tools", url: "/cleaning-tools.png", folder: "branding" },
  ];

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
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
    fetchMedia();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/admin/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setModalOpen(false);
      fetchMedia();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media item?")) return;
    try {
      await fetch(`/api/admin/media?id=${id}`, { method: "DELETE" });
      fetchMedia();
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
            <ImageIcon className="text-emerald-400" size={24} />
            <span>Media Assets & Library</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Store, view and copy image asset URLs for services, blogs and dynamic pages.
          </p>
        </div>
        <button
          onClick={() => {
            setFormData({
              filename: "new-clean-photo.jpg",
              url: "/assets/about/carpet-service-1.jpg",
              mimeType: "image/jpeg",
              size: 150000,
              altText: "Cleaning Service",
              folder: "services",
            });
            setModalOpen(true);
          }}
          className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Plus size={16} />
          <span>Add Media URL</span>
        </button>
      </div>

      {/* Preset Fast Import Gallery */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
        <span className="text-xs font-semibold text-slate-300 block mb-3">
          Quick Preset Stock Assets (Click to Copy URL):
        </span>
        <div className="flex flex-wrap gap-2">
          {stockAssets.map((asset, idx) => (
            <button
              key={idx}
              onClick={() => handleCopy(asset.url, `preset-${idx}`)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-[11px] text-slate-300 hover:text-white hover:border-emerald-500 transition flex items-center gap-1.5 cursor-pointer"
            >
              {copiedId === `preset-${idx}` ? (
                <Check size={12} className="text-emerald-400" />
              ) : (
                <Copy size={12} className="text-slate-400" />
              )}
              <span>{asset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Media Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {loading ? (
          <p className="text-xs text-slate-500 col-span-5 text-center py-10">Loading assets...</p>
        ) : items.length === 0 ? (
          <div className="col-span-5 text-center py-10 text-slate-500 text-xs">
            No media recorded. Use the Quick Stock Assets above or click "Add Media URL".
          </div>
        ) : (
          items.map((m) => (
            <div
              key={m.id}
              className="bg-slate-950/80 border border-slate-800 rounded-xl overflow-hidden group shadow-sm flex flex-col justify-between"
            >
              <div className="h-32 bg-slate-900 relative overflow-hidden flex items-center justify-center p-2">
                <img
                  src={m.url}
                  alt={m.altText || m.filename}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  onError={(e: any) => {
                    e.target.src = "/assets/home/100-Satisfaction.png";
                  }}
                />
              </div>

              <div className="p-3 border-t border-slate-800 space-y-1 text-xs">
                <p className="font-semibold text-white truncate">{m.filename}</p>
                <p className="text-[10px] text-slate-400 truncate font-mono">{m.url}</p>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => handleCopy(m.url, m.id)}
                    className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1 text-[10px] px-2"
                  >
                    {copiedId === m.id ? (
                      <>
                        <Check size={11} className="text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={11} />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="p-1 text-slate-500 hover:text-red-400 transition"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSave}
            className="bg-slate-950 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-sm font-bold text-white">Register Media File</h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">File Name*</label>
                <input
                  type="text"
                  required
                  value={formData.filename}
                  onChange={(e) => setFormData({ ...formData, filename: e.target.value })}
                  placeholder="e.g. hero-banner.jpg"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Path / URL*</label>
                <input
                  type="text"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="/assets/about/carpet-service-1.jpg or https://..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Alt Text</label>
                <input
                  type="text"
                  value={formData.altText}
                  onChange={(e) => setFormData({ ...formData, altText: e.target.value })}
                  placeholder="Descriptive text for accessibility & SEO"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition cursor-pointer"
              >
                Save Media
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
