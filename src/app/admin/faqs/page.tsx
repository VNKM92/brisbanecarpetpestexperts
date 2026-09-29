"use client";

import React, { useState, useEffect } from "react";
import {
  HelpCircle,
  Plus,
  Trash2,
  Edit,
  X,
  Check,
} from "lucide-react";

export default function AdminFaqsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>({
    question: "",
    answer: "",
    categoryId: "",
    order: 0,
    isActive: true,
  });
  const [saving, setSaving] = useState(false);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/faqs");
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
    fetchFaqs();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const method = formData.id ? "PATCH" : "POST";
      await fetch("/api/admin/faqs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setModalOpen(false);
      fetchFaqs();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      await fetch(`/api/admin/faqs?id=${id}`, { method: "DELETE" });
      fetchFaqs();
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
            <HelpCircle className="text-teal-400" size={24} />
            <span>Help & FAQs Management</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Maintain frequently asked questions displayed across homepage, company and service pages.
          </p>
        </div>
        <button
          onClick={() => {
            setFormData({
              question: "",
              answer: "",
              categoryId: categories[0]?.id || "",
              order: items.length + 1,
              isActive: true,
            });
            setModalOpen(true);
          }}
          className="bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Plus size={16} />
          <span>Add New FAQ</span>
        </button>
      </div>

      {/* FAQs List */}
      <div className="space-y-3">
        {loading ? (
          <p className="text-xs text-slate-500 py-6 text-center">Loading questions...</p>
        ) : items.length === 0 ? (
          <p className="text-xs text-slate-500 py-6 text-center">No FAQs found.</p>
        ) : (
          items.map((faq) => (
            <div
              key={faq.id}
              className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex items-start justify-between gap-4 hover:border-slate-700 transition"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{faq.question}</span>
                  {faq.category && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-teal-400">
                      {faq.category.name}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{faq.answer}</p>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => {
                    setFormData(faq);
                    setModalOpen(true);
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-teal-900/60 text-slate-300 hover:text-teal-300 transition"
                  title="Edit"
                >
                  <Edit size={14} />
                </button>
                <button
                  onClick={() => handleDelete(faq.id)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900/60 text-slate-400 hover:text-red-300 transition"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
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
            className="bg-slate-950 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-sm font-bold text-white">
                {formData.id ? "Edit FAQ" : "Add FAQ Question"}
              </h2>
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
                <label className="block text-slate-400 font-semibold mb-1">Question*</label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="e.g. Are your cleaning products pet-safe?"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Answer*</label>
                <textarea
                  rows={4}
                  required
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Detailed answer text..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Category</label>
                  <select
                    value={formData.categoryId || ""}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-500"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
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
                disabled={saving}
                className="bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save FAQ"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
