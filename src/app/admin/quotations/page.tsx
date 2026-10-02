"use client";

import React, { useState, useEffect } from "react";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  MapPin,
  User,
  Phone,
  Mail,
  DollarSign,
  Search,
  Filter,
  Trash2,
  Edit,
  Eye,
  UserCheck,
  Send,
  X,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Building,
} from "lucide-react";

export default function AdminQuotationsPage() {
  const [quotations, setQuotations] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({ totalPending: 0, totalApproved: 0, totalConfirmed: 0, totalRevenue: 0 });
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Approval Form state
  const [approveForm, setApproveForm] = useState({
    approvedPrice: "",
    depositRequired: "50",
    assignedEmployeeId: "",
    adminNotes: "",
    scheduledDate: "",
    timeSlot: "",
  });

  // Rejection Form state
  const [rejectionReason, setRejectionReason] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterStatus !== "ALL") params.append("status", filterStatus);
      if (searchQuery) params.append("search", searchQuery);

      const res = await fetch(`/api/admin/quotations?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setQuotations(data.data?.quotations || []);
        setStats(data.data?.stats || {});
      }

      // Fetch employees for assignment
      const empRes = await fetch("/api/admin/hrm/employees");
      if (empRes.ok) {
        const empData = await empRes.json();
        setEmployees(empData.data || []);
      }
    } catch (err) {
      console.error("Failed to load quotations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterStatus]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  const openApproveModal = (quote: any) => {
    setSelectedQuote(quote);
    setApproveForm({
      approvedPrice: (quote.approvedPrice || quote.totalPrice || 180).toString(),
      depositRequired: (quote.depositRequired || 50).toString(),
      assignedEmployeeId: quote.assignedEmployeeId || "",
      adminNotes: quote.adminNotes || "Price calculated as per your requirements. Pay $50 deposit to confirm your date.",
      scheduledDate: quote.scheduledDate ? quote.scheduledDate.slice(0, 10) : "",
      timeSlot: quote.timeSlot || "Morning (8AM - 11AM)",
    });
    setShowApproveModal(true);
  };

  const handleApproveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuote) return;

    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/quotations/${selectedQuote.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "APPROVE",
          approvedPrice: parseFloat(approveForm.approvedPrice),
          depositRequired: parseFloat(approveForm.depositRequired),
          assignedEmployeeId: approveForm.assignedEmployeeId || null,
          adminNotes: approveForm.adminNotes,
          scheduledDate: approveForm.scheduledDate || undefined,
          timeSlot: approveForm.timeSlot || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert(data.message);
        setShowApproveModal(false);
        fetchData();
      } else {
        alert(data.message || "Failed to approve quotation");
      }
    } catch (err) {
      alert("Error approving quotation");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuote) return;

    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/quotations/${selectedQuote.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "REJECT",
          rejectionReason,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert("Quotation marked as rejected.");
        setShowRejectModal(false);
        fetchData();
      } else {
        alert(data.message || "Failed to reject quotation");
      }
    } catch (err) {
      alert("Error rejecting quotation");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string, ref: string) => {
    if (!confirm(`Are you sure you want to permanently delete quotation #${ref}? Super Admin action.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/quotations/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        alert("Quotation deleted successfully.");
        fetchData();
      } else {
        alert(data.message || "Failed to delete");
      }
    } catch (err) {
      alert("Error deleting quotation");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white">Demand Quotations & Approvals</h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold text-xs border border-emerald-500/30">
              Super Admin
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Review customer requirements, set approved pricing & $50 AUD deposits, assign technicians, and confirm bookings.
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <span className="text-xs text-slate-400">Pending Approvals</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-amber-400">{stats.totalPending || 0}</span>
            <Clock size={18} className="text-amber-400/60" />
          </div>
          <span className="text-[10px] text-slate-500">Awaiting your approval</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <span className="text-xs text-slate-400">Approved (Deposit Due)</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-blue-400">{stats.totalApproved || 0}</span>
            <Sparkles size={18} className="text-blue-400/60" />
          </div>
          <span className="text-[10px] text-slate-500">$50 AUD payment pending</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <span className="text-xs text-slate-400">Confirmed Bookings</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-emerald-400">{stats.totalConfirmed || 0}</span>
            <CheckCircle2 size={18} className="text-emerald-400/60" />
          </div>
          <span className="text-[10px] text-slate-500">Deposit received & locked</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <span className="text-xs text-slate-400">Total Deposits Collected</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white">${Number(stats.totalRevenue || 0).toFixed(2)}</span>
            <DollarSign size={18} className="text-emerald-400/60" />
          </div>
          <span className="text-[10px] text-slate-500">AUD via Stripe & Gateways</span>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold w-full sm:w-auto">
            {["ALL", "PENDING_APPROVAL", "APPROVED", "CONFIRMED", "REJECTED"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterStatus === st
                    ? "bg-emerald-500 text-slate-950 font-bold shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {st.replace("_", " ")}
              </button>
            ))}
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-72">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search customer, ref, suburb..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </form>
        </div>

        {/* Table of Quotations */}
        {loading ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Loading demand quotations...
          </div>
        ) : quotations.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs">
            No quotations found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                  <th className="pb-3">Ref / Date</th>
                  <th className="pb-3">Customer Details</th>
                  <th className="pb-3">Service & Suburb</th>
                  <th className="pb-3">Approved Price / Deposit</th>
                  <th className="pb-3">Technician</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Super Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {quotations.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-850/50 transition-colors">
                    <td className="py-3.5 font-mono text-slate-300">
                      <span className="font-bold text-emerald-400 block">{q.bookingNumber}</span>
                      <span className="text-[10px] text-slate-500">{new Date(q.createdAt).toLocaleDateString("en-AU")}</span>
                    </td>
                    <td className="py-3.5">
                      <p className="font-bold text-white">{q.customerName}</p>
                      <p className="text-[11px] text-slate-400">{q.customerEmail}</p>
                      <p className="text-[11px] text-slate-400">{q.customerPhone || "No Phone"}</p>
                    </td>
                    <td className="py-3.5">
                      <p className="font-medium text-slate-200">{q.serviceName}</p>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1">
                        <MapPin size={11} /> {q.serviceAddress}
                      </p>
                      <span className="text-[10px] text-blue-400">
                        Date: {q.scheduledDate ? new Date(q.scheduledDate).toLocaleDateString("en-AU") : "Flexible"} ({q.timeSlot || "Anytime"})
                      </span>
                    </td>
                    <td className="py-3.5">
                      {q.approvedPrice ? (
                        <span className="font-bold text-emerald-400 text-sm block">${q.approvedPrice} AUD</span>
                      ) : (
                        <span className="text-slate-400 text-xs block">Est. ${q.totalPrice} AUD</span>
                      )}
                      <span className="text-[10px] text-slate-400">Deposit: ${q.depositRequired || 50} AUD</span>
                      {q.depositPaid > 0 && (
                        <span className="text-[10px] text-emerald-300 font-bold block">Paid: ${q.depositPaid} AUD</span>
                      )}
                    </td>
                    <td className="py-3.5">
                      {q.assignedEmployee ? (
                        <span className="px-2 py-1 rounded-md bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-700">
                          {q.assignedEmployee.name}
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500 italic">Unassigned</span>
                      )}
                    </td>
                    <td className="py-3.5">
                      {q.status === "CONFIRMED" ? (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                          Confirmed (Paid)
                        </span>
                      ) : q.quoteStatus === "APPROVED" ? (
                        <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-bold">
                          Approved ($50 Due)
                        </span>
                      ) : q.quoteStatus === "REJECTED" ? (
                        <span className="px-2 py-0.5 rounded-md bg-red-500/20 text-red-300 border border-red-500/30 text-[10px] font-bold">
                          Rejected
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold animate-pulse">
                          Pending Approval
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 text-right space-x-1.5">
                      <button
                        onClick={() => openApproveModal(q)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold"
                        title="Approve / Edit Price & Assign"
                      >
                        {q.quoteStatus === "APPROVED" ? "Edit Quote" : "Approve Quote"}
                      </button>
                      {q.quoteStatus !== "REJECTED" && (
                        <button
                          onClick={() => {
                            setSelectedQuote(q);
                            setShowRejectModal(true);
                          }}
                          className="px-2 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-[11px]"
                          title="Reject"
                        >
                          Reject
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(q.id, q.bookingNumber)}
                        className="p-1 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
                        title="Super Admin Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ==================================================== */}
      {/* MODAL: APPROVE / EDIT QUOTATION */}
      {/* ==================================================== */}
      {showApproveModal && selectedQuote && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-5 relative shadow-2xl my-8">
            <button
              onClick={() => setShowApproveModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Super Admin Action</span>
              <h2 className="text-lg font-bold text-white mt-1">Approve Demand Quotation #{selectedQuote.bookingNumber}</h2>
              <p className="text-xs text-slate-400">Customer: {selectedQuote.customerName} ({selectedQuote.customerEmail})</p>
            </div>

            {/* Customer Request Summary */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1.5">
              <p><strong>Service:</strong> {selectedQuote.serviceName}</p>
              <p><strong>Location:</strong> {selectedQuote.serviceAddress}</p>
              <p><strong>Rooms / Bathrooms / SQM:</strong> {selectedQuote.rooms || 0} Beds / {selectedQuote.bathrooms || 0} Baths / {selectedQuote.squareFootage || 0} SQM</p>
              {selectedQuote.notes && <p className="text-amber-300"><strong>Customer Notes:</strong> {selectedQuote.notes}</p>}
            </div>

            <form onSubmit={handleApproveSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Approved Total Price (AUD) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={approveForm.approvedPrice}
                    onChange={(e) => setApproveForm({ ...approveForm, approvedPrice: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold text-sm focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Deposit Required (AUD) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={approveForm.depositRequired}
                    onChange={(e) => setApproveForm({ ...approveForm, depositRequired: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold text-sm focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Assign Technician from HRM */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Assign HRM Field Technician / Cleaner
                </label>
                <select
                  value={approveForm.assignedEmployeeId}
                  onChange={(e) => setApproveForm({ ...approveForm, assignedEmployeeId: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500"
                >
                  <option value="">-- Unassigned / To Be Decided --</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.employeeCode}) - {emp.designation}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date and Time slot confirm */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Confirmed Service Date</label>
                  <input
                    type="date"
                    value={approveForm.scheduledDate}
                    onChange={(e) => setApproveForm({ ...approveForm, scheduledDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Arrival Window</label>
                  <select
                    value={approveForm.timeSlot}
                    onChange={(e) => setApproveForm({ ...approveForm, timeSlot: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500"
                  >
                    <option value="Morning (8AM - 11AM)">Morning (8AM - 11AM)</option>
                    <option value="Midday (11AM - 2PM)">Midday (11AM - 2PM)</option>
                    <option value="Afternoon (2PM - 5PM)">Afternoon (2PM - 5PM)</option>
                    <option value="Flexible All Day">Flexible All Day</option>
                  </select>
                </div>
              </div>

              {/* Admin Note for Customer */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Admin Notes / Instructions to Customer</label>
                <textarea
                  rows={2}
                  value={approveForm.adminNotes}
                  onChange={(e) => setApproveForm({ ...approveForm, adminNotes: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowApproveModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center gap-1.5 shadow-lg shadow-emerald-950 transition-all disabled:opacity-50"
                >
                  <CheckCircle2 size={16} />
                  <span>Approve & Dispatch $50 Deposit Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: REJECT QUOTATION */}
      {/* ==================================================== */}
      {showRejectModal && selectedQuote && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 relative shadow-2xl">
            <button
              onClick={() => setShowRejectModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <h2 className="text-base font-bold text-white">Reject Quotation #{selectedQuote.bookingNumber}</h2>
            <form onSubmit={handleRejectSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Reason for Rejection</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Requested date is fully booked, location outside service radius..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-red-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRejectModal(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl"
                >
                  Confirm Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
