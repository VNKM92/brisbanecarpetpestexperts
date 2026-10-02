"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Users,
  User,
  MapPin,
  Calendar,
  Camera,
  CheckCircle2,
  DollarSign,
  Search,
  Filter,
  Eye,
  Award,
  ShieldCheck,
  AlertTriangle,
  Building,
  Layers,
  Sparkles,
  Phone,
  Mail,
  Printer,
} from "lucide-react";

export default function AdminReportsPage() {
  const [activeTab, setActiveTab] = useState<"tech_to_customer" | "customer_to_tech" | "crew_analytics">("tech_to_customer");
  const [reportsData, setReportsData] = useState<any>({ technicianReports: [], customerReports: [], stats: {} });
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedTechId, setSelectedTechId] = useState<string>("ALL");
  const [selectedCustId, setSelectedCustId] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/reports/technicians");
      if (res.ok) {
        const data = await res.json();
        setReportsData(data.data || {});
      }
    } catch (err) {
      console.error("Failed to load two-way reports:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const technicianReports: any[] = reportsData.technicianReports || [];
  const customerReports: any[] = reportsData.customerReports || [];
  const stats = reportsData.stats || {};

  // Filtered Technician Reports
  const filteredTechReports = technicianReports.filter((tr) => {
    if (selectedTechId !== "ALL" && tr.employeeId !== selectedTechId) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        tr.name.toLowerCase().includes(q) ||
        tr.employeeCode.toLowerCase().includes(q) ||
        tr.customersServed.some((cs: any) =>
          cs.customerName?.toLowerCase().includes(q) || cs.serviceAddress?.toLowerCase().includes(q)
        )
      );
    }
    return true;
  });

  // Filtered Customer Reports
  const filteredCustReports = customerReports.filter((cr) => {
    if (selectedCustId !== "ALL" && cr.customerId !== selectedCustId) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        cr.name.toLowerCase().includes(q) ||
        cr.email.toLowerCase().includes(q) ||
        cr.serviceVisits.some((sv: any) =>
          sv.techniciansAssigned.some((t: any) => t.name?.toLowerCase().includes(q))
        )
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
            <FileText className="text-emerald-400" />
            <span>Technician & Customer Two-Way Work Reports</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete cross-referenced audit trails: check which technician worked with which customer, and which customer's property was serviced by which crew of technicians.
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Printer size={15} />
          <span>Print / Export Report</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <span className="text-xs text-slate-400">Total Technicians</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-emerald-400">{stats.totalTechnicians || 0}</span>
            <Users size={18} className="text-emerald-400/60" />
          </div>
          <span className="text-[10px] text-slate-500">Certified field staff</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <span className="text-xs text-slate-400">Total Customers Serviced</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-blue-400">{stats.totalCustomers || 0}</span>
            <User size={18} className="text-blue-400/60" />
          </div>
          <span className="text-[10px] text-slate-500">Across Brisbane metro</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <span className="text-xs text-slate-400">Multi-Crew Jobs (2-5+ Staff)</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-purple-400">{stats.multiTechJobs || 0}</span>
            <Layers size={18} className="text-purple-400/60" />
          </div>
          <span className="text-[10px] text-slate-500">Team bond & commercial jobs</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <span className="text-xs text-slate-400">Single-Tech Jobs</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-amber-400">{stats.singleTechJobs || 0}</span>
            <Sparkles size={18} className="text-amber-400/60" />
          </div>
          <span className="text-[10px] text-slate-500">Solo specialist appointments</span>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex flex-wrap gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold">
        <button
          onClick={() => setActiveTab("tech_to_customer")}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "tech_to_customer"
              ? "bg-emerald-500 text-slate-950 font-bold shadow-md"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Users size={15} />
          <span>1. Technician ➔ Customer Work Report (Who worked for whom)</span>
        </button>
        <button
          onClick={() => setActiveTab("customer_to_tech")}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "customer_to_tech"
              ? "bg-emerald-500 text-slate-950 font-bold shadow-md"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <User size={15} />
          <span>2. Customer ➔ Technician History (Which crew visited home)</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {activeTab === "tech_to_customer" ? (
            <select
              value={selectedTechId}
              onChange={(e) => setSelectedTechId(e.target.value)}
              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
            >
              <option value="ALL">-- All Technicians --</option>
              {technicianReports.map((t) => (
                <option key={t.employeeId} value={t.employeeId}>
                  {t.name} ({t.employeeCode}) - {t.designation}
                </option>
              ))}
            </select>
          ) : (
            <select
              value={selectedCustId}
              onChange={(e) => setSelectedCustId(e.target.value)}
              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
            >
              <option value="ALL">-- All Customers --</option>
              {customerReports.map((c) => (
                <option key={c.customerId} value={c.customerId}>
                  {c.name} ({c.email})
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search report names, addresses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* ==================================================== */}
      {/* TAB 1: TECHNICIAN TO CUSTOMER REPORT */}
      {/* ==================================================== */}
      {activeTab === "tech_to_customer" && (
        <div className="space-y-6">
          {loading ? (
            <div className="py-12 text-center text-slate-400 text-xs">Loading technician logs...</div>
          ) : filteredTechReports.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center text-slate-500 text-xs">
              No technician report data found.
            </div>
          ) : (
            filteredTechReports.map((tech) => (
              <div
                key={tech.employeeId}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5"
              >
                {/* Technician Profile Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {tech.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-emerald-400">{tech.employeeCode}</span>
                        <h2 className="text-base font-bold text-white">{tech.name}</h2>
                      </div>
                      <p className="text-xs text-slate-400">{tech.designation} • {tech.phone}</p>
                    </div>
                  </div>

                  {/* Summary Badges */}
                  <div className="flex items-center gap-3 text-xs">
                    <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-500 block">Customers Serviced</span>
                      <span className="font-bold text-white text-sm">{tech.customersServed.length}</span>
                    </div>
                    <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-500 block">Total Revenue</span>
                      <span className="font-bold text-emerald-400 text-sm">${tech.totalRevenueHandled.toFixed(2)} AUD</span>
                    </div>
                    <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-500 block">Inspection Photos</span>
                      <span className="font-bold text-blue-400 text-sm">{tech.totalPhotosUploaded}</span>
                    </div>
                  </div>
                </div>

                {/* Customers Serviced List */}
                <div className="space-y-3">
                  <h3 className="font-bold text-xs text-slate-300 uppercase tracking-wider">
                    Customer Homes Serviced by {tech.name}
                  </h3>

                  {tech.customersServed.length === 0 ? (
                    <p className="text-xs text-slate-500 italic">No customer visits assigned yet.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400">
                            <th className="pb-2 font-semibold">Customer Details</th>
                            <th className="pb-2 font-semibold">Service & Address</th>
                            <th className="pb-2 font-semibold">Date / Window</th>
                            <th className="pb-2 font-semibold">Technician Role & Crew</th>
                            <th className="pb-2 font-semibold">Photos & Faults</th>
                            <th className="pb-2 font-semibold text-right">Job Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {tech.customersServed.map((cs: any, idx: number) => (
                            <tr key={idx} className="hover:bg-slate-850/50">
                              <td className="py-3">
                                <p className="font-bold text-white">{cs.customerName}</p>
                                <p className="text-[11px] text-slate-400">{cs.customerPhone}</p>
                                <span className="font-mono text-[10px] text-emerald-400">#{cs.bookingNumber}</span>
                              </td>

                              <td className="py-3">
                                <p className="font-medium text-slate-200">{cs.serviceName}</p>
                                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                                  <MapPin size={11} /> {cs.serviceAddress}
                                </p>
                              </td>

                              <td className="py-3 text-slate-300">
                                <p>{cs.scheduledDate ? new Date(cs.scheduledDate).toLocaleDateString("en-AU") : "Flexible"}</p>
                                <p className="text-[10px] text-slate-500">{cs.timeSlot}</p>
                              </td>

                              {/* Role & Crew Co-Workers */}
                              <td className="py-3">
                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold inline-block mb-1 ${
                                  cs.isLead ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-800 text-slate-300"
                                }`}>
                                  {cs.technicianRole}
                                </span>

                                {cs.coWorkers && cs.coWorkers.length > 0 ? (
                                  <div className="text-[10px] text-slate-400 space-y-0.5">
                                    <span className="text-slate-500">Crew ({cs.crewSize} staff): </span>
                                    {cs.coWorkers.map((cw: any, cidx: number) => (
                                      <span key={cidx} className="text-blue-300 block">
                                        + {cw.name} ({cw.role})
                                      </span>
                                    ))}
                                  </div>
                                ) : (
                                  <span className="text-[10px] text-slate-500 block">Solo Deployment</span>
                                )}
                              </td>

                              {/* Photos & Inspection */}
                              <td className="py-3">
                                <span className="text-xs text-blue-400 flex items-center gap-1 font-semibold">
                                  <Camera size={13} /> {cs.photosCount} Photos
                                </span>
                                {cs.faultNotes && (
                                  <span className="text-[10px] text-amber-300 block truncate max-w-xs" title={cs.faultNotes}>
                                    ⚠️ {cs.faultNotes}
                                  </span>
                                )}
                              </td>

                              <td className="py-3 text-right font-bold text-white">
                                ${cs.totalPrice.toFixed(2)} AUD
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ==================================================== */}
      {/* TAB 2: CUSTOMER TO TECHNICIAN REPORT */}
      {/* ==================================================== */}
      {activeTab === "customer_to_tech" && (
        <div className="space-y-6">
          {loading ? (
            <div className="py-12 text-center text-slate-400 text-xs">Loading customer histories...</div>
          ) : filteredCustReports.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center text-slate-500 text-xs">
              No customer history data found.
            </div>
          ) : (
            filteredCustReports.map((cust) => (
              <div
                key={cust.customerId}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5"
              >
                {/* Customer Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {cust.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white">{cust.name}</h2>
                      <p className="text-xs text-slate-400">{cust.email} • {cust.phone || "No phone"} • {cust.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-500 block">Total Visits</span>
                      <span className="font-bold text-white text-sm">{cust.totalBookings}</span>
                    </div>
                    <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-500 block">Technicians Deployed</span>
                      <span className="font-bold text-emerald-400 text-sm">{cust.totalTechniciansVisited}</span>
                    </div>
                  </div>
                </div>

                {/* Service Visits Breakdown */}
                <div className="space-y-4">
                  <h3 className="font-bold text-xs text-slate-300 uppercase tracking-wider">
                    Service Visits & Assigned Technician Crews
                  </h3>

                  {cust.serviceVisits.map((visit: any, vidx: number) => (
                    <div
                      key={vidx}
                      className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                        <div>
                          <span className="font-mono text-xs font-bold text-emerald-400">#{visit.bookingNumber}</span>
                          <h4 className="text-sm font-bold text-white mt-0.5">{visit.serviceName}</h4>
                        </div>
                        <div className="text-right text-xs">
                          <span className="text-slate-400 block">
                            {visit.scheduledDate ? new Date(visit.scheduledDate).toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short", year: "numeric" }) : "Scheduled"}
                          </span>
                          <span className="font-bold text-emerald-400">${visit.totalPrice.toFixed(2)} AUD</span>
                        </div>
                      </div>

                      {/* Technicians who worked on this visit (1 to 5+ staff) */}
                      <div>
                        <span className="text-[11px] text-slate-400 font-semibold block mb-1.5">
                          Field Specialist Crew ({visit.crewSize} Staff on Site):
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                          {visit.techniciansAssigned.map((tech: any, tidx: number) => (
                            <div
                              key={tidx}
                              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2.5 text-xs"
                            >
                              <div className="w-7 h-7 rounded-lg bg-emerald-600/30 text-emerald-300 font-bold flex items-center justify-center text-xs">
                                {tech.name?.charAt(0)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-white truncate">{tech.name}</p>
                                <span className={`text-[10px] font-semibold block ${tech.isLead ? "text-emerald-400" : "text-slate-400"}`}>
                                  {tech.roleInJob}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Fault notes & photos */}
                      {visit.jobReport && (
                        <div className="space-y-2 pt-1 text-xs">
                          {visit.jobReport.faultNotes && (
                            <div className="p-2.5 bg-amber-950/40 border border-amber-800/50 rounded-lg text-amber-200 text-[11px]">
                              <strong>⚠️ Pre-Inspection Condition:</strong> {visit.jobReport.faultNotes}
                            </div>
                          )}

                          {visit.jobReport.photos && visit.jobReport.photos.length > 0 && (
                            <div>
                              <span className="text-[11px] text-slate-400 mb-1 block">
                                Inspection Photos Taken by Crew ({visit.jobReport.photos.length}):
                              </span>
                              <div className="flex gap-2 overflow-x-auto pb-1">
                                {visit.jobReport.photos.map((p: any) => (
                                  <div key={p.id} className="relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-slate-800">
                                    <img src={p.photoUrl} alt="Report" className="w-full h-full object-cover" />
                                    <span className="absolute bottom-0 left-0 right-0 bg-slate-950/80 text-[8px] font-bold text-emerald-400 text-center py-0.5 uppercase">
                                      {p.type}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
