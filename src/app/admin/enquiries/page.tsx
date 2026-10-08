"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
  Mail,
  Phone,
  CheckCheck,
  Sparkles,
  PhoneCall,
  Calendar,
  CheckCircle2,
  Users,
} from "lucide-react";
import { useAdminNotifications } from "@/context/AdminNotificationContext";

function AdminEnquiriesContent() {
  const searchParams = useSearchParams();
  const directId = searchParams.get("id");

  const [items, setItems] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);
  const [internalNote, setInternalNote] = useState("");
  const [updating, setUpdating] = useState(false);

  const { refreshNotifications } = useAdminNotifications();

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const url = new URL("/api/admin/enquiries", window.location.origin);
      if (search) url.searchParams.set("search", search);
      if (statusFilter) url.searchParams.set("status", statusFilter);
      if (unreadOnly) url.searchParams.set("unread", "true");

      const res = await fetch(url.toString());
      const json = await res.json();
      if (json.success) {
        setItems(json.data.items);
        setUnreadCount(json.data.unreadCount || 0);

        // Auto-select if directId is provided in URL
        if (directId && (!selectedEnquiry || selectedEnquiry.id !== directId)) {
          const match = json.data.items.find((item: any) => item.id === directId);
          if (match) {
            handleOpenEnquiry(match);
          }
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter, unreadOnly]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEnquiries();
  };

  const handleOpenEnquiry = async (item: any) => {
    setSelectedEnquiry(item);
    setInternalNote(item.notes || "");

    // If enquiry is unread, mark as read immediately and decrement badges
    if (!item.isRead) {
      try {
        await fetch("/api/admin/enquiries", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: item.id, isRead: true }),
        });

        // Update local state
        setItems((prev) =>
          prev.map((it) => (it.id === item.id ? { ...it, isRead: true } : it))
        );
        setSelectedEnquiry({ ...item, isRead: true });
        setUnreadCount((prev) => Math.max(0, prev - 1));

        // Sync globally with notification bell & sidebar badges
        window.dispatchEvent(new Event("ADMIN_NOTIFICATION_UPDATE"));
        refreshNotifications();
      } catch (err) {
        console.error("Error marking enquiry read:", err);
      }
    }
  };

  const handleToggleReadStatus = async (id: string, currentReadState: boolean) => {
    try {
      const newReadState = !currentReadState;
      await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isRead: newReadState }),
      });

      setItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, isRead: newReadState } : it))
      );

      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, isRead: newReadState });
      }

      setUnreadCount((prev) => (newReadState ? Math.max(0, prev - 1) : prev + 1));
      window.dispatchEvent(new Event("ADMIN_NOTIFICATION_UPDATE"));
      refreshNotifications();
    } catch (e) {
      console.error(e);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await fetch("/api/admin/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markAllEnquiriesRead: true }),
      });

      setItems((prev) => prev.map((it) => ({ ...it, isRead: true })));
      setUnreadCount(0);
      window.dispatchEvent(new Event("ADMIN_NOTIFICATION_UPDATE"));
      refreshNotifications();
    } catch (e) {
      console.error(e);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus, isRead: true }),
      });

      setItems((prev) =>
        prev.map((it) =>
          it.id === id ? { ...it, status: newStatus, isRead: true } : it
        )
      );

      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus, isRead: true });
      }

      window.dispatchEvent(new Event("ADMIN_NOTIFICATION_UPDATE"));
      refreshNotifications();
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
        body: JSON.stringify({
          id: selectedEnquiry.id,
          notes: internalNote,
          isRead: true,
        }),
      });
      setSelectedEnquiry({ ...selectedEnquiry, notes: internalNote, isRead: true });
      fetchEnquiries();
      window.dispatchEvent(new Event("ADMIN_NOTIFICATION_UPDATE"));
      refreshNotifications();
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
      window.dispatchEvent(new Event("ADMIN_NOTIFICATION_UPDATE"));
      refreshNotifications();
    } catch (e) {
      console.error(e);
    }
  };

  // Quick stats calculation
  const totalCount = items.length;
  const newCount = items.filter((i) => i.status === "NEW").length;
  const contactedCount = items.filter((i) => i.status === "CONTACTED" || i.status === "QUOTED").length;
  const closedCount = items.filter((i) => i.status === "CLOSED").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 shadow-sm">
              <Inbox size={22} />
            </div>
            <span>Customer Enquiries & Inbound Leads</span>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 text-xs font-extrabold shadow-sm shadow-orange-950">
                {unreadCount} New
              </span>
            )}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time management for customer service inquiries, quote requests, and phone leads.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={handleMarkAllRead}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition shadow-sm cursor-pointer"
          >
            <CheckCheck size={15} className="text-emerald-400" />
            <span>Mark All Inquiries Read</span>
          </button>
        )}
      </div>

      {/* KPI Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
            <Inbox size={20} />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Total Leads</span>
            <span className="text-xl font-bold text-white leading-tight block mt-0.5">{totalCount}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setUnreadOnly(!unreadOnly)}
          className={`bg-slate-900 border rounded-2xl p-4 flex items-center gap-3 shadow-sm text-left transition-all cursor-pointer ${
            unreadOnly ? "border-amber-500/60 bg-amber-500/10 ring-1 ring-amber-500/30" : "border-slate-800 hover:border-slate-700"
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
            <Clock size={20} />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider block">Unread / New</span>
            <span className="text-xl font-extrabold text-amber-400 leading-tight block mt-0.5">{unreadCount}</span>
          </div>
        </button>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
            <PhoneCall size={20} />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">In Progress</span>
            <span className="text-xl font-bold text-white leading-tight block mt-0.5">{contactedCount}</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Won / Closed</span>
            <span className="text-xl font-bold text-emerald-400 leading-tight block mt-0.5">{closedCount}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <form onSubmit={handleSearch} className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-2.5 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Search by name, email, phone, ref..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 shadow-inner"
          />
        </form>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Unread Only Quick Filter */}
          <button
            type="button"
            onClick={() => setUnreadOnly(!unreadOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition flex items-center gap-1.5 cursor-pointer ${
              unreadOnly
                ? "bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm"
                : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                unreadOnly ? "bg-amber-400" : "bg-slate-600"
              }`}
            />
            <span>Unread Only</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Filter size={14} /> Status:
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
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
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Ref / Customer</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">Service Requested</th>
                <th className="py-3.5 px-4">Message / Specs</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Received</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                      <span>Loading customer enquiries...</span>
                    </div>
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Inbox size={28} className="text-slate-600" />
                      <span className="font-semibold text-slate-400">No enquiries found.</span>
                      <span className="text-xs text-slate-600">
                        {unreadOnly ? "No unread enquiries at the moment." : "Inquiries from contact forms and quote demands will appear here."}
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => handleOpenEnquiry(item)}
                    className={`cursor-pointer transition-colors ${
                      !item.isRead
                        ? "bg-slate-800/60 hover:bg-slate-800/90 border-l-4 border-l-orange-500"
                        : "hover:bg-slate-800/30 opacity-90 hover:opacity-100 border-l-4 border-l-transparent"
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        {!item.isRead && (
                          <span
                            className="w-2.5 h-2.5 rounded-full bg-orange-400 ring-4 ring-orange-500/20 shrink-0"
                            title="Unread Lead"
                          />
                        )}
                        <div className="min-w-0">
                          <p className={`text-white ${!item.isRead ? "font-bold text-sm" : "font-semibold"}`}>
                            {item.firstName} {item.lastName}
                          </p>
                          {item.enquiryNumber && (
                            <span className="text-[10px] font-mono text-slate-400 block">
                              {item.enquiryNumber}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="text-white font-medium flex items-center gap-1.5">
                        <Phone size={12} className="text-slate-400" />
                        <span>{item.phone}</span>
                      </p>
                      <p className="text-slate-400 text-[11px] flex items-center gap-1.5 mt-0.5">
                        <Mail size={12} className="text-slate-400" />
                        <span className="truncate max-w-[150px]">{item.email}</span>
                      </p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-emerald-400 font-semibold text-[11px] inline-block">
                        {item.service || "General Clean"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 max-w-[220px] truncate">
                      {item.message ? item.message : "Standard Service Enquiry"}
                    </td>
                    <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
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
                        <option value="NEW">NEW LEAD</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="QUOTED">QUOTED</option>
                        <option value="CLOSED">CLOSED</option>
                        <option value="SPAM">SPAM</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px] font-mono">
                      {new Date(item.createdAt).toLocaleDateString("en-AU", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleToggleReadStatus(item.id, item.isRead)}
                          className={`p-1.5 rounded-lg border transition cursor-pointer ${
                            !item.isRead
                              ? "bg-slate-800 border-slate-700 text-slate-400 hover:text-emerald-400"
                              : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:text-slate-400"
                          }`}
                          title={!item.isRead ? "Mark as Read" : "Mark as Unread"}
                        >
                          <CheckCircle size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenEnquiry(item)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer"
                          title="View Details"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900/60 text-slate-400 hover:text-red-300 border border-slate-700 transition cursor-pointer"
                          title="Delete Enquiry"
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700/90 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-modal ring-1 ring-white/10">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center shadow-inner">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white leading-tight">
                    Enquiry Details
                  </h2>
                  {selectedEnquiry.enquiryNumber && (
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                      Ref: #{selectedEnquiry.enquiryNumber}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3.5 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800/90 shadow-inner">
              <div>
                <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                  Customer Name
                </span>
                <p className="font-bold text-white text-sm mt-0.5">
                  {selectedEnquiry.firstName} {selectedEnquiry.lastName}
                </p>
              </div>
              <div>
                <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                  Service Requested
                </span>
                <p className="font-bold text-emerald-400 mt-0.5">
                  {selectedEnquiry.service || "General Clean"}
                </p>
              </div>
              <div>
                <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                  Phone Number
                </span>
                <p className="font-semibold text-white mt-0.5">{selectedEnquiry.phone}</p>
              </div>
              <div>
                <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                  Email Address
                </span>
                <p className="font-semibold text-white mt-0.5 truncate">{selectedEnquiry.email}</p>
              </div>
            </div>

            {selectedEnquiry.message && (
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/90 text-xs shadow-inner">
                <span className="text-slate-400 font-bold block mb-1">
                  Customer Message / Specifications:
                </span>
                <p className="text-slate-200 leading-relaxed italic bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                  "{selectedEnquiry.message}"
                </p>
              </div>
            )}

            {/* Internal Staff Notes */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">
                Staff Follow-Up Notes & Quotation Log
              </label>
              <textarea
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                placeholder="Log customer call outcome, agreed price, booking date, follow up notes..."
                rows={3}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none shadow-inner"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href={`tel:${selectedEnquiry.phone}`}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-lg shadow-emerald-950/60 cursor-pointer"
              >
                <PhoneCall size={14} />
                <span>Call Client</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={updating}
                  className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition disabled:opacity-50 cursor-pointer"
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

export default function AdminEnquiriesPage() {
  return (
    <Suspense
      fallback={
        <div className="py-12 flex justify-center text-slate-400 text-xs">
          Loading Enquiries Console...
        </div>
      }
    >
      <AdminEnquiriesContent />
    </Suspense>
  );
}
