"use client";

import React, { useState, useEffect } from "react";
import {
  UserCog,
  Users,
  PlusCircle,
  Camera,
  CalendarCheck,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  Search,
  Award,
  Briefcase,
  Layers,
  Sparkles,
} from "lucide-react";

export default function AdminHRMPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [attendances, setAttendances] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"directory" | "attendance" | "quality_photos">("directory");

  // Onboard Employee Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    password: "Staff@123456",
    designation: "Senior Steam Carpet & Pest Specialist",
    department: "Cleaning & Pest Operations",
    hourlyRate: "35",
    skills: ["Steam Carpet Cleaning", "Bond Pest Management", "Stain Removal"],
    licenseNumber: "QLD-PEST-88912",
    emergencyContact: "",
    address: "Brisbane QLD",
  });

  // Mark Attendance Modal
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [attendanceForm, setAttendanceForm] = useState({
    employeeId: "",
    status: "PRESENT",
    workNotes: "Full day on-road residential pest & carpet service across Brisbane.",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/hrm/employees");
      if (res.ok) {
        const data = await res.json();
        setEmployees(data.data || []);
      }

      const attRes = await fetch("/api/admin/hrm/attendance");
      if (attRes.ok) {
        const aData = await attRes.json();
        setAttendances(aData.data || []);
      }
    } catch (err) {
      console.error("Failed to load HRM data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOnboardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmployee.name || !newEmployee.email || !newEmployee.phone) {
      alert("Name, email and phone are required.");
      return;
    }

    setAddLoading(true);
    try {
      const res = await fetch("/api/admin/hrm/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmployee),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert(`Employee ${newEmployee.name} onboarded successfully!`);
        setShowAddModal(false);
        fetchData();
      } else {
        alert(data.message || "Failed to onboard employee");
      }
    } catch (err) {
      alert("Error onboarding employee");
    } finally {
      setAddLoading(false);
    }
  };

  const handleAttendanceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendanceForm.employeeId) {
      alert("Please select an employee");
      return;
    }

    try {
      const res = await fetch("/api/admin/hrm/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(attendanceForm),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert("Daily attendance recorded.");
        setShowAttendanceModal(false);
        fetchData();
      } else {
        alert(data.message || "Failed to log attendance");
      }
    } catch (err) {
      alert("Error logging attendance");
    }
  };

  // Collect all photos from all employee job reports
  const allJobReports = employees.flatMap((e) =>
    (e.jobReports || []).map((jr: any) => ({
      ...jr,
      employeeName: e.name,
      employeeCode: e.employeeCode,
    }))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <UserCog className="text-emerald-400" />
            <span>Human Resource Management (HRM) & Field Ops</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage field technicians, daily attendance, certifications, and monitor on-site before/after quality inspection photos.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAttendanceModal(true)}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-700 transition-all"
          >
            <CalendarCheck size={15} className="inline mr-1.5" />
            <span>Log Daily Attendance</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-950 transition-all"
          >
            <PlusCircle size={15} />
            <span>Onboard New Employee</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold w-full sm:w-auto">
        <button
          onClick={() => setActiveTab("directory")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "directory" ? "bg-emerald-500 text-slate-950 font-bold shadow" : "text-slate-400 hover:text-white"
          }`}
        >
          <Users size={15} />
          <span>Staff Directory ({employees.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("quality_photos")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "quality_photos" ? "bg-emerald-500 text-slate-950 font-bold shadow" : "text-slate-400 hover:text-white"
          }`}
        >
          <Camera size={15} />
          <span>Field Quality & Inspection Photos</span>
        </button>
        <button
          onClick={() => setActiveTab("attendance")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "attendance" ? "bg-emerald-500 text-slate-950 font-bold shadow" : "text-slate-400 hover:text-white"
          }`}
        >
          <CalendarCheck size={15} />
          <span>Daily Attendance Log</span>
        </button>
      </div>

      {/* ==================================================== */}
      {/* TAB 1: STAFF DIRECTORY */}
      {/* ==================================================== */}
      {activeTab === "directory" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-bold text-base shadow-md">
                    {emp.name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-mono text-[11px] font-bold text-emerald-400">{emp.employeeCode}</span>
                    <h3 className="font-bold text-white text-sm leading-tight">{emp.name}</h3>
                    <p className="text-[11px] text-slate-400">{emp.designation}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  {emp.status}
                </span>
              </div>

              {/* Contact info */}
              <div className="space-y-1.5 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <p className="flex items-center gap-2">
                  <Mail size={13} className="text-slate-500" />
                  <span>{emp.email}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={13} className="text-slate-500" />
                  <span>{emp.phone}</span>
                </p>
                {emp.licenseNumber && (
                  <p className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <Award size={13} />
                    <span>Licence: {emp.licenseNumber}</span>
                  </p>
                )}
              </div>

              {/* Stats & Assignments */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Assigned Jobs</span>
                  <span className="font-bold text-white text-sm">{emp.assignedBookings?.length || 0}</span>
                </div>
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Hourly Rate</span>
                  <span className="font-bold text-emerald-400 text-sm">${emp.hourlyRate}/hr</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ==================================================== */}
      {/* TAB 2: FIELD QUALITY & INSPECTION PHOTOS */}
      {/* ==================================================== */}
      {activeTab === "quality_photos" && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h3 className="font-bold text-white text-sm mb-1">Live Quality Assurance & Fault Inspection Stream</h3>
            <p className="text-xs text-slate-400">Technicians photograph customer sites one-by-one to record pre-existing faults, stains, and completed results.</p>
          </div>

          {allJobReports.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 text-xs">
              No on-site photo reports uploaded yet.
            </div>
          ) : (
            <div className="space-y-6">
              {allJobReports.map((report: any) => (
                <div key={report.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-xs font-mono text-emerald-400 font-bold">Technician: {report.employeeName} ({report.employeeCode})</span>
                      <h4 className="text-sm font-bold text-white">Status: {report.status}</h4>
                    </div>
                    <span className="text-xs text-slate-500">{new Date(report.createdAt).toLocaleString("en-AU")}</span>
                  </div>

                  {/* Fault notes */}
                  {report.faultNotes && (
                    <div className="p-3 bg-amber-950/40 border border-amber-800/60 rounded-xl text-xs text-amber-200">
                      <strong>⚠️ Pre-Existing Condition Noted on Arrival:</strong> {report.faultNotes}
                    </div>
                  )}

                  {/* Treatment details */}
                  {report.treatmentApplied && (
                    <div className="p-3 bg-blue-950/40 border border-blue-800/60 rounded-xl text-xs text-blue-200">
                      <strong>Treatment Applied:</strong> {report.treatmentApplied}
                    </div>
                  )}

                  {/* Photos Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {report.photos?.map((p: any) => (
                      <div key={p.id} className="group relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                        <img
                          src={p.photoUrl}
                          alt={p.caption || "Job Photo"}
                          className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="p-2 bg-slate-900 text-[10px]">
                          <span className={`font-bold uppercase tracking-wider block ${
                            p.type === "FAULT_EVIDENCE" ? "text-red-400" : "text-emerald-400"
                          }`}>
                            {p.type}
                          </span>
                          <span className="text-slate-300 truncate block">{p.caption || "Inspection Record"}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ==================================================== */}
      {/* TAB 3: ATTENDANCE LOG */}
      {/* ==================================================== */}
      {activeTab === "attendance" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h3 className="font-bold text-white text-sm">Staff Attendance Records</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Employee</th>
                  <th className="pb-3">Check-in / Out</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Work Log</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {attendances.map((att) => (
                  <tr key={att.id} className="hover:bg-slate-850/50">
                    <td className="py-3 font-mono text-slate-300">
                      {new Date(att.date).toLocaleDateString("en-AU")}
                    </td>
                    <td className="py-3">
                      <p className="font-bold text-white">{att.employee?.name}</p>
                      <p className="text-[11px] text-slate-500">{att.employee?.employeeCode}</p>
                    </td>
                    <td className="py-3 text-slate-300">
                      {att.checkIn ? new Date(att.checkIn).toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" }) : "N/A"} -{" "}
                      {att.checkOut ? new Date(att.checkOut).toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" }) : "Active"}
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                        {att.status}
                      </span>
                    </td>
                    <td className="py-3 text-slate-400 text-[11px]">{att.workNotes || "Standard field duty"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: ONBOARD EMPLOYEE */}
      {/* ==================================================== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-5 my-8 relative shadow-2xl">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">HRM Onboarding</span>
              <h2 className="text-lg font-bold text-white mt-1">Onboard New Field Technician / Cleaner</h2>
              <p className="text-xs text-slate-400">Creates staff employee profile and login account automatically.</p>
            </div>

            <form onSubmit={handleOnboardSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Liam Cooper"
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="liam@brisbane.com"
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Mobile (QLD) *</label>
                  <input
                    type="text"
                    required
                    placeholder="0434 111 222"
                    value={newEmployee.phone}
                    onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Login Password</label>
                  <input
                    type="text"
                    value={newEmployee.password}
                    onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Job Designation</label>
                  <input
                    type="text"
                    value={newEmployee.designation}
                    onChange={(e) => setNewEmployee({ ...newEmployee, designation: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Hourly Rate (AUD)</label>
                  <input
                    type="number"
                    value={newEmployee.hourlyRate}
                    onChange={(e) => setNewEmployee({ ...newEmployee, hourlyRate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Licence / Certification</label>
                <input
                  type="text"
                  placeholder="e.g. QLD Pest Management #99281, IICRC Certified"
                  value={newEmployee.licenseNumber}
                  onChange={(e) => setNewEmployee({ ...newEmployee, licenseNumber: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addLoading}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-950"
                >
                  Confirm Onboarding
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: LOG DAILY ATTENDANCE */}
      {/* ==================================================== */}
      {showAttendanceModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 relative shadow-2xl">
            <button
              onClick={() => setShowAttendanceModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <h2 className="text-base font-bold text-white">Record Daily Attendance</h2>
            <form onSubmit={handleAttendanceSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Select Employee *</label>
                <select
                  required
                  value={attendanceForm.employeeId}
                  onChange={(e) => setAttendanceForm({ ...attendanceForm, employeeId: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                >
                  <option value="">-- Choose Employee --</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.employeeCode})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Status</label>
                <select
                  value={attendanceForm.status}
                  onChange={(e) => setAttendanceForm({ ...attendanceForm, status: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                >
                  <option value="PRESENT">Present (Full Day)</option>
                  <option value="HALF_DAY">Half Day</option>
                  <option value="ON_LEAVE">Approved Leave</option>
                  <option value="ABSENT">Absent</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Work Log / Notes</label>
                <textarea
                  rows={2}
                  value={attendanceForm.workNotes}
                  onChange={(e) => setAttendanceForm({ ...attendanceForm, workNotes: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAttendanceModal(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl"
                >
                  Save Attendance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
