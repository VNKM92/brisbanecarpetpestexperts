"use client";

import React, { useState, useEffect } from "react";
import {
  CalendarCheck,
  Search,
  Filter,
  Trash2,
  Edit,
  Eye,
  X,
  Plus,
  Clock,
  DollarSign,
  MapPin,
  User,
} from "lucide-react";

export default function AdminBookingsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [editModal, setEditModal] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const url = new URL("/api/admin/bookings", window.location.origin);
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
    fetchBookings();
  }, [statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBookings();
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      fetchBookings();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModal) return;
    setSaving(true);
    try {
      await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editModal),
      });
      setEditModal(null);
      fetchBookings();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      await fetch(`/api/admin/bookings?id=${id}`, { method: "DELETE" });
      fetchBookings();
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
            <CalendarCheck className="text-emerald-400" size={24} />
            <span>Service Bookings & Schedule</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Track confirmed jobs, cleaning times, dispatch status and payments.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <form onSubmit={handleSearch} className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-2.5 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Search booking #, customer, address..."
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
            <option value="">All Bookings</option>
            <option value="PENDING">Pending Approval</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Booking #</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Service & Address</th>
                <th className="py-3.5 px-4">Schedule</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-500">
                    Loading bookings...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-500">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                items.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-900/60 transition">
                    <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                      {b.bookingNumber}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-white">{b.customerName}</p>
                      <p className="text-[11px] text-slate-400">{b.customerPhone}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-white">{b.serviceName}</p>
                      <p className="text-[11px] text-slate-400 truncate max-w-xs">{b.serviceAddress}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-white">
                        {b.scheduledDate
                          ? new Date(b.scheduledDate).toLocaleDateString()
                          : "TBD"}
                      </p>
                      <p className="text-[11px] text-slate-400">{b.timeSlot || "Flexible"}</p>
                    </td>
                    <td className="py-3 px-4 font-bold text-white">
                      ${b.totalPrice?.toFixed(2) || "0.00"}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={b.status}
                        onChange={(e) => handleStatusChange(b.id, e.target.value)}
                        className={`text-[11px] font-bold px-2 py-1 rounded-md border focus:outline-none cursor-pointer ${
                          b.status === "CONFIRMED"
                            ? "bg-emerald-950/80 text-emerald-400 border-emerald-800"
                            : b.status === "PENDING"
                            ? "bg-amber-950/80 text-amber-400 border-amber-800"
                            : b.status === "IN_PROGRESS"
                            ? "bg-blue-950/80 text-blue-400 border-blue-800"
                            : b.status === "COMPLETED"
                            ? "bg-purple-950/80 text-purple-400 border-purple-800"
                            : "bg-red-950/80 text-red-400 border-red-800"
                        }`}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedBooking(b)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                          title="View Info"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() =>
                            setEditModal({
                              id: b.id,
                              status: b.status,
                              totalPrice: b.totalPrice,
                              notes: b.notes || "",
                              scheduledDate: b.scheduledDate
                                ? new Date(b.scheduledDate).toISOString().split("T")[0]
                                : "",
                              timeSlot: b.timeSlot || "During Business Hours",
                            })
                          }
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-900/60 text-slate-300 hover:text-emerald-300 transition"
                          title="Edit"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(b.id)}
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

      {/* Booking View Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-emerald-400">
                  {selectedBooking.bookingNumber}
                </span>
                <span className="text-white font-bold text-sm">Booking Overview</span>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 uppercase tracking-wider">Customer</span>
                <p className="font-semibold text-white mt-0.5">{selectedBooking.customerName}</p>
                <p className="text-slate-400">{selectedBooking.customerPhone}</p>
                <p className="text-slate-400">{selectedBooking.customerEmail}</p>
              </div>
              <div>
                <span className="text-slate-500 uppercase tracking-wider">Service & Rate</span>
                <p className="font-semibold text-emerald-400 mt-0.5">{selectedBooking.serviceName}</p>
                <p className="font-bold text-white text-sm mt-1">
                  ${selectedBooking.totalPrice?.toFixed(2)} AUD
                </p>
              </div>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Address:</span>
                <span className="text-white font-medium">{selectedBooking.serviceAddress}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Estimated Space:</span>
                <span className="text-slate-200">
                  {selectedBooking.squareFootage ? `${selectedBooking.squareFootage} sq ft` : "Standard"} • {selectedBooking.rooms} Rooms, {selectedBooking.bathrooms} Baths
                </span>
              </div>
              {selectedBooking.addons && (
                <div className="flex items-start justify-between">
                  <span className="text-slate-400">Selected Addons:</span>
                  <span className="text-emerald-400 font-mono text-[11px] text-right">
                    {selectedBooking.addons}
                  </span>
                </div>
              )}
            </div>

            {selectedBooking.notes && (
              <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800 text-xs">
                <span className="text-slate-400 block mb-0.5 font-semibold">Special Notes:</span>
                <p className="text-slate-300 italic">{selectedBooking.notes}</p>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedBooking(null)}
                className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Booking Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveEdit}
            className="bg-slate-950 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-sm font-bold text-white">Edit Booking Details</h2>
              <button
                type="button"
                onClick={() => setEditModal(null)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Status</label>
                <select
                  value={editModal.status}
                  onChange={(e) => setEditModal({ ...editModal, status: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="CONFIRMED">CONFIRMED</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Total Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={editModal.totalPrice}
                  onChange={(e) => setEditModal({ ...editModal, totalPrice: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Scheduled Date</label>
                <input
                  type="date"
                  value={editModal.scheduledDate}
                  onChange={(e) => setEditModal({ ...editModal, scheduledDate: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Preferred Time Slot</label>
                <input
                  type="text"
                  value={editModal.timeSlot}
                  onChange={(e) => setEditModal({ ...editModal, timeSlot: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Staff Notes</label>
                <textarea
                  rows={3}
                  value={editModal.notes}
                  onChange={(e) => setEditModal({ ...editModal, notes: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setEditModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
