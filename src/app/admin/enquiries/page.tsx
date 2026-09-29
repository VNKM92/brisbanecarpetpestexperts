"use client";

import React, { useState, useEffect } from "react";
import {
  Inbox,
  Search,
  Filter,
  Trash2,
  CheckCircle,
  Clock,
  Eye,
  X,
  Send,
  MessageSquare,
  AlertCircle,
} from "lucide-react";

export default function AdminEnquiriesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);
  const [internalNote, setInternalNote] = useState("");
  const [updating, setUpdating] = useState(false);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const url = new URL("/api/admin/enquiries", window.location.origin);
      if (search) url.searchParams.set("search", search);
      if (statusFilter) url.searchParams.set("status", statusFilter);

      const res = await fetch(url.toString());
      const json = await res.json();
      if (json.success) {
        setItems(json.data.items);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEnquiries();
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      fetchEnquiries();
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    setUpdating(true);
    try {
      await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedEnquiry.id, notes: internalNote }),
      });
      setSelectedEnquiry({ ...selectedEnquiry, notes: internalNote });
      fetchEnquiries();
    } catch (e) {
      console.error(e);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this enquiry?")) return;
    try {
      await fetch(`/api/admin/enquiries?id=${id}`, { method: "DELETE" });
      setSelectedEnquiry(null);
      fetchEnquiries();
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
            <Inbox className="text-orange-400" size={24} />
            <span>Customer Enquiries & Leads</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage incoming quotes, contact requests and lead statuses.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <form onSubmit={handleSearch} className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-2.5 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Search by name, email, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </form>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Filter size={14} /> Status:
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="">All Statuses</option>
            <option value="NEW">New Leads</option>
            <option value="CONTACTED">Contacted</option>
            <option value="QUOTED">Quoted</option>
            <option value="CLOSED">Closed / Won</option>
            <option value="SPAM">Spam</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">Service Requested</th>
                <th className="py-3.5 px-4">Details</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Received</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-500">
                    Loading enquiries...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-500">
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/60 transition">
                    <td className="py-3 px-4 font-semibold text-white">
                      {item.firstName} {item.lastName}
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-white">{item.phone}</p>
                      <p className="text-slate-400 text-[11px]">{item.email}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-emerald-400 font-medium">
                        {item.service || "General"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {item.bedrooms && `${item.bedrooms}, `}
                      {item.bathrooms && `${item.bathrooms}`}
                      {!item.bedrooms && !item.bathrooms && "Standard"}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className={`text-[11px] font-bold px-2 py-1 rounded-md border focus:outline-none cursor-pointer ${
                          item.status === "NEW"
                            ? "bg-orange-950/80 text-orange-400 border-orange-800"
                            : item.status === "CONTACTED"
                            ? "bg-blue-950/80 text-blue-400 border-blue-800"
                            : item.status === "QUOTED"
                            ? "bg-purple-950/80 text-purple-400 border-purple-800"
                            : item.status === "CLOSED"
                            ? "bg-emerald-950/80 text-emerald-400 border-emerald-800"
                            : "bg-slate-800 text-slate-400 border-slate-700"
                        }`}
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="QUOTED">QUOTED</option>
                        <option value="CLOSED">CLOSED</option>
                        <option value="SPAM">SPAM</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px]">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setSelectedEnquiry(item);
                            setInternalNote(item.notes || "");
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                          title="View Details"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
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

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <MessageSquare className="text-emerald-400" size={18} />
                <span>Enquiry Details</span>
              </h2>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 uppercase tracking-wider">Customer</span>
                <p className="font-semibold text-white mt-0.5">
                  {selectedEnquiry.firstName} {selectedEnquiry.lastName}
                </p>
              </div>
              <div>
                <span className="text-slate-500 uppercase tracking-wider">Service</span>
                <p className="font-semibold text-emerald-400 mt-0.5">
                  {selectedEnquiry.service || "General Clean"}
                </p>
              </div>
              <div>
                <span className="text-slate-500 uppercase tracking-wider">Phone</span>
                <p className="font-semibold text-white mt-0.5">{selectedEnquiry.phone}</p>
              </div>
              <div>
                <span className="text-slate-500 uppercase tracking-wider">Email</span>
                <p className="font-semibold text-white mt-0.5">{selectedEnquiry.email}</p>
              </div>
            </div>

            {selectedEnquiry.message && (
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-xs">
                <span className="text-slate-400 font-semibold block mb-1">Customer Note:</span>
                <p className="text-slate-200 leading-relaxed italic">"{selectedEnquiry.message}"</p>
              </div>
            )}

            {/* Internal Staff Notes */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">
                Internal Staff Notes & Follow-up History
              </label>
              <textarea
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                placeholder="Add notes about call outcome, quote amount, follow up..."
                rows={3}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href={`tel:${selectedEnquiry.phone}`}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5"
              >
                <span>Call Client</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNotes}
                  disabled={updating}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition disabled:opacity-50"
                >
                  {updating ? "Saving..." : "Save Notes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
