"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  UserCheck,
  Calendar,
  MapPin,
  Clock,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  Search,
  Award,
  Sparkles,
  ShieldCheck,
  Send,
  Building,
  UserPlus,
  Briefcase,
} from "lucide-react";

export default function AdminAssignmentsPage() {
  const [quotations, setQuotations] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"ALL" | "UNASSIGNED" | "MULTI_CREW" | "ASSIGNED">("ALL");

  // Crew Assignment Modal State
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Crew list for the modal (supports 1 to 5+ technicians)
  const [crewList, setCrewList] = useState<
    Array<{ employeeId: string; role: string; isLead: boolean; notes: string }>
  >([]);

  const ROLE_OPTIONS = [
    "Lead Specialist",
    "Steam Cleaning Specialist",
    "Pest Control Exterminator",
    "Bond Cleaning Specialist",
    "Assistant Cleaner",
    "Quality Inspector",
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/quotations");
      if (res.ok) {
        const data = await res.json();
        setQuotations(data.data?.quotations || []);
      }

      const empRes = await fetch("/api/admin/hrm/employees");
      if (empRes.ok) {
        const empData = await empRes.json();
        setEmployees(empData.data || []);
      }
    } catch (err) {
      console.error("Failed to load assignment data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAssignModal = (booking: any) => {
    setSelectedBooking(booking);
    setSuccessMsg("");

    // Populate existing crew or default with assignedEmployee
    if (booking.crew && booking.crew.length > 0) {
      setCrewList(
        booking.crew.map((c: any) => ({
          employeeId: c.employeeId,
          role: c.role || "Technician",
          isLead: Boolean(c.isLead),
          notes: c.notes || "",
        }))
      );
    } else if (booking.assignedEmployeeId) {
      setCrewList([
        {
          employeeId: booking.assignedEmployeeId,
          role: "Lead Specialist",
          isLead: true,
          notes: "Primary technician",
        },
      ]);
    } else {
      // Empty starter crew
      setCrewList([
        {
          employeeId: employees[0]?.id || "",
          role: "Lead Specialist",
          isLead: true,
          notes: "",
        },
      ]);
    }

    setShowAssignModal(true);
  };

  const handleAddCrewMember = () => {
    // Find first employee not already in crew if possible
    const existingIds = new Set(crewList.map((c) => c.employeeId));
    const available = employees.find((e) => !existingIds.has(e.id)) || employees[0];

    setCrewList([
      ...crewList,
      {
        employeeId: available ? available.id : "",
        role: "Steam Cleaning Specialist",
        isLead: false,
        notes: "",
      },
    ]);
  };

  const handleRemoveCrewMember = (index: number) => {
    setCrewList(crewList.filter((_, i) => i !== index));
  };

  const handleCrewChange = (index: number, field: string, value: any) => {
    const updated = [...crewList];
    if (field === "isLead" && value === true) {
      // Uncheck other leads
      updated.forEach((c, idx) => {
        c.isLead = idx === index;
      });
    } else {
      (updated[index] as any)[field] = value;
    }
    setCrewList(updated);
  };

  const handleSaveCrew = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;

    if (crewList.length === 0) {
      alert("Please add at least 1 technician or cleaner to the crew.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: selectedBooking.id,
          crew: crewList,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(data.message);
        fetchData();
        setTimeout(() => {
          setShowAssignModal(false);
          setSuccessMsg("");
        }, 1200);
      } else {
        alert(data.message || "Failed to save crew assignments");
      }
    } catch (err) {
      alert("Error saving crew assignments");
    } finally {
      setSaving(false);
    }
  };

  // Filter Bookings
  const filteredBookings = quotations.filter((b) => {
    const crewSize = (b.crew?.length || 0) > 0 ? b.crew.length : b.assignedEmployee ? 1 : 0;
    if (filterType === "UNASSIGNED" && crewSize > 0) return false;
    if (filterType === "MULTI_CREW" && crewSize < 2) return false;
    if (filterType === "ASSIGNED" && crewSize === 0) return false;

    if (search) {
      const q = search.toLowerCase();
      return (
        b.bookingNumber?.toLowerCase().includes(q) ||
        b.customerName?.toLowerCase().includes(q) ||
        b.serviceAddress?.toLowerCase().includes(q) ||
        b.serviceName?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Users className="text-emerald-400" />
            <span>Multi-Technician & Crew Work Assignments</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Assign 1 to 5+ certified specialists, cleaners, and inspectors to customer jobs. Designate team leads and special on-site duties.
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <span className="text-xs text-slate-400">Total Bookings</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white">{quotations.length}</span>
            <Calendar size={18} className="text-blue-400/60" />
          </div>
          <span className="text-[10px] text-slate-500">Scheduled in Brisbane</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <span className="text-xs text-slate-400">Multi-Technician Crews</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-emerald-400">
              {quotations.filter((b) => (b.crew?.length || 0) >= 2).length}
            </span>
            <Users size={18} className="text-emerald-400/60" />
          </div>
          <span className="text-[10px] text-slate-500">2 to 5+ specialists working together</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <span className="text-xs text-slate-400">Unassigned Jobs</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-amber-400">
              {quotations.filter((b) => !b.assignedEmployee && (!b.crew || b.crew.length === 0)).length}
            </span>
            <AlertCircle size={18} className="text-amber-400/60" />
          </div>
          <span className="text-[10px] text-slate-500">Requires technician assignment</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <span className="text-xs text-slate-400">Active Field Technicians</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-purple-400">{employees.length}</span>
            <Briefcase size={18} className="text-purple-400/60" />
          </div>
          <span className="text-[10px] text-slate-500">In staff directory</span>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            {[
              { id: "ALL", label: "All Jobs" },
              { id: "MULTI_CREW", label: "Multi-Tech Crews (2-5+)" },
              { id: "UNASSIGNED", label: "Unassigned Jobs" },
              { id: "ASSIGNED", label: "Assigned" },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setFilterType(st.id as any)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterType === st.id ? "bg-emerald-500 text-slate-950 font-bold shadow" : "text-slate-400 hover:text-white"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search customer, booking ref..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Bookings & Crew Table */}
        {loading ? (
          <div className="py-12 text-center text-slate-400 text-xs">Loading assignment matrix...</div>
        ) : filteredBookings.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs">No matching bookings found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                  <th className="pb-3">Booking Ref</th>
                  <th className="pb-3">Customer & Location</th>
                  <th className="pb-3">Schedule Date</th>
                  <th className="pb-3">Service & Size</th>
                  <th className="pb-3">Assigned Crew (1 to 5+ Technicians)</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredBookings.map((b) => {
                  const hasCrew = b.crew && b.crew.length > 0;
                  const crewMembers = hasCrew ? b.crew : b.assignedEmployee ? [{ employee: b.assignedEmployee, role: "Lead Technician", isLead: true }] : [];

                  return (
                    <tr key={b.id} className="hover:bg-slate-850/50 transition-colors">
                      <td className="py-3.5 font-mono">
                        <span className="font-bold text-emerald-400 block">{b.bookingNumber}</span>
                        <span className="text-[10px] text-slate-500">{b.status}</span>
                      </td>

                      <td className="py-3.5">
                        <p className="font-bold text-white">{b.customerName}</p>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1">
                          <MapPin size={11} /> {b.serviceAddress}
                        </p>
                      </td>

                      <td className="py-3.5 text-slate-300">
                        <p className="font-medium">
                          {b.scheduledDate ? new Date(b.scheduledDate).toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short" }) : "Flexible"}
                        </p>
                        <p className="text-[10px] text-slate-500">{b.timeSlot || "Business Hours"}</p>
                      </td>

                      <td className="py-3.5">
                        <p className="font-medium text-white">{b.serviceName}</p>
                        <p className="text-[10px] text-slate-400">
                          {b.rooms ? `${b.rooms} Beds • ` : ""}{b.bathrooms ? `${b.bathrooms} Baths` : ""}
                        </p>
                      </td>

                      {/* Crew Tag Badges */}
                      <td className="py-3.5">
                        {crewMembers.length === 0 ? (
                          <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold">
                            ⚠️ Unassigned
                          </span>
                        ) : (
                          <div className="flex flex-wrap gap-1.5 items-center">
                            {crewMembers.map((cm: any, idx: number) => (
                              <span
                                key={idx}
                                className={`px-2 py-0.5 rounded-md text-[10px] font-medium border flex items-center gap-1 ${
                                  cm.isLead
                                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold"
                                    : "bg-slate-800 text-slate-300 border-slate-700"
                                }`}
                              >
                                {cm.isLead && <Award size={10} className="text-emerald-400" />}
                                <span>{cm.employee?.name || "Technician"} ({cm.role})</span>
                              </span>
                            ))}
                            {crewMembers.length >= 2 && (
                              <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold text-[9px]">
                                {crewMembers.length} Crew
                              </span>
                            )}
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 text-right">
                        <button
                          onClick={() => openAssignModal(b)}
                          className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-lg text-xs font-bold transition-all"
                        >
                          {crewMembers.length > 0 ? "Edit Crew" : "Assign Crew"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ==================================================== */}
      {/* MODAL: ASSIGN MULTI-TECHNICIAN CREW (1 to 5+ STAFF) */}
      {/* ==================================================== */}
      {showAssignModal && selectedBooking && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-5 my-8 relative shadow-2xl">
            <button
              onClick={() => setShowAssignModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Crew Dispatch Management</span>
              <h2 className="text-lg font-bold text-white mt-1">Assign Technicians to #{selectedBooking.bookingNumber}</h2>
              <p className="text-xs text-slate-400">
                Customer: <strong>{selectedBooking.customerName}</strong> • {selectedBooking.serviceAddress}
              </p>
            </div>

            {successMsg && (
              <div className="p-3.5 bg-emerald-950/60 border border-emerald-800/80 rounded-xl text-emerald-200 text-xs flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveCrew} className="space-y-4 text-xs">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <label className="font-bold text-white uppercase tracking-wider">
                  Assigned Crew Members ({crewList.length} Technicians)
                </label>
                <button
                  type="button"
                  onClick={handleAddCrewMember}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 shadow"
                >
                  <Plus size={14} />
                  <span>Add Another Technician / Cleaner</span>
                </button>
              </div>

              {/* Dynamic Crew Member Cards */}
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {crewList.map((crew, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-400 text-xs">Technician #{idx + 1}</span>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold cursor-pointer">
                          <input
                            type="checkbox"
                            checked={crew.isLead}
                            onChange={(e) => handleCrewChange(idx, "isLead", e.target.checked)}
                            className="rounded text-emerald-600"
                          />
                          <span>Team Lead</span>
                        </label>

                        {crewList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveCrewMember(idx)}
                            className="text-slate-500 hover:text-red-400 p-1"
                            title="Remove technician"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Select Employee *</label>
                        <select
                          required
                          value={crew.employeeId}
                          onChange={(e) => handleCrewChange(idx, "employeeId", e.target.value)}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                        >
                          <option value="">-- Select Specialist --</option>
                          {employees.map((emp) => (
                            <option key={emp.id} value={emp.id}>
                              {emp.name} ({emp.employeeCode}) - {emp.designation}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Assigned Duty / Role *</label>
                        <select
                          value={crew.role}
                          onChange={(e) => handleCrewChange(idx, "role", e.target.value)}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                        >
                          {ROLE_OPTIONS.map((ro) => (
                            <option key={ro} value={ro}>
                              {ro}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Specific on-site instructions for this technician (e.g. bring high-pressure wand, focus on kitchen tiles)..."
                        value={crew.notes}
                        onChange={(e) => handleCrewChange(idx, "notes", e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs placeholder-slate-500"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center gap-1.5 shadow-lg shadow-emerald-950 transition-all disabled:opacity-50"
                >
                  {saving ? (
                    <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Confirm Crew Assignment ({crewList.length} Staff)</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
