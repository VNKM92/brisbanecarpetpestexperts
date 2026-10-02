"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Wrench,
  Camera,
  MapPin,
  Phone,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  PlusCircle,
  X,
  Upload,
  User,
  LogOut,
  Send,
  Sparkles,
  ShieldCheck,
  FileCheck,
} from "lucide-react";

export default function EmployeePortalPage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Active Job Inspection Modal
  const [activeJob, setActiveJob] = useState<any>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Photo & Fault Form State
  const [photoType, setPhotoType] = useState<"BEFORE" | "DURING" | "AFTER" | "FAULT_EVIDENCE">("BEFORE");
  const [photoUrl, setPhotoUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [faultNotes, setFaultNotes] = useState("");
  const [treatmentApplied, setTreatmentApplied] = useState("");
  const [jobStatus, setJobStatus] = useState("IN_PROGRESS");

  // Sample Brisbane field photo presets for easy one-tap mobile test upload
  const SAMPLE_PHOTOS = [
    { label: "Carpet High-Traffic Stain (Before)", url: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80", type: "BEFORE" },
    { label: "Deep Steam Extraction in Progress", url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80", type: "DURING" },
    { label: "Pristine Steam Cleaned Result (After)", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", type: "AFTER" },
    { label: "Pre-Existing Carpet Burn / Timber Scuff (Fault)", url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80", type: "FAULT_EVIDENCE" },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const meRes = await fetch("/api/auth/me");
      if (!meRes.ok) {
        router.push("/login?returnUrl=/employee");
        return;
      }
      const meData = await meRes.json();
      setUser(meData.data.user);

      const jobsRes = await fetch("/api/employee/jobs");
      if (jobsRes.ok) {
        const jData = await jobsRes.json();
        setJobs(jData.data || []);
      }
    } catch (err) {
      console.error("Employee portal load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenJobModal = (job: any) => {
    setActiveJob(job);
    setFaultNotes(job.jobReport?.faultNotes || "");
    setTreatmentApplied(job.jobReport?.treatmentApplied || "");
    setJobStatus(job.jobReport?.status || "IN_PROGRESS");
    setPhotoUrl("");
    setCaption("");
    setShowUploadModal(true);
  };

  const handleUploadPhotoAndNotes = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeJob) return;

    if (!photoUrl && !faultNotes) {
      alert("Please provide a photo URL or write inspection notes.");
      return;
    }

    setUploading(true);
    try {
      const res = await fetch(`/api/employee/jobs/${activeJob.id}/upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          photoUrl: photoUrl || undefined,
          type: photoType,
          caption: caption || `${photoType} condition photograph`,
          faultNotes,
          treatmentApplied,
          status: jobStatus,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert("Inspection photo and notes saved successfully! Customer and Super Admin updated.");
        setShowUploadModal(false);
        fetchData();
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (err) {
      alert("Error submitting job data");
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 text-xs">Loading Field Technician Portal...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Mobile Top Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md">
            <Wrench size={18} />
          </div>
          <div>
            <span className="font-bold text-sm text-white block leading-tight">Field Technician Portal</span>
            <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">Brisbane Operations</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block text-xs">
            <p className="font-bold text-white leading-tight">{user?.name}</p>
            <p className="text-[10px] text-slate-400">{user?.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-red-400"
            title="Sign Out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck size={16} />
            <span>Today's Field Duty • Certified Specialist</span>
          </div>
          <h1 className="text-xl font-bold text-white">G'day, {user?.name}!</h1>
          <p className="text-xs text-slate-300">
            Select a job to take before/after photos, log pre-existing damage or stains, and complete quality reports.
          </p>
        </div>

        {/* Assigned Jobs List */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white flex items-center justify-between">
            <span>Your Assigned Service Visits ({jobs.length})</span>
            <span className="text-xs font-normal text-slate-400">Brisbane Metro</span>
          </h2>

          {jobs.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center space-y-2">
              <FileCheck size={36} className="mx-auto text-slate-600" />
              <p className="text-sm font-semibold text-slate-300">No jobs assigned currently</p>
              <p className="text-xs text-slate-500">Super Admin will assign confirmed bookings to your schedule.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <span className="font-mono text-xs font-bold text-emerald-400">Ref: #{job.bookingNumber}</span>
                      <h3 className="text-base font-bold text-white mt-0.5">{job.serviceName}</h3>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold self-start ${
                      job.status === "COMPLETED"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    }`}>
                      {job.status}
                    </span>
                  </div>

                  {/* Customer and Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500">Customer:</span>
                      <p className="font-bold text-white">{job.customerName}</p>
                      <a
                        href={`tel:${job.customerPhone}`}
                        className="text-emerald-400 font-semibold flex items-center gap-1 mt-0.5"
                      >
                        <Phone size={12} /> {job.customerPhone || "Call customer"}
                      </a>
                    </div>
                    <div>
                      <span className="text-slate-500">Property Address:</span>
                      <p className="font-medium text-slate-200 flex items-center gap-1">
                        <MapPin size={12} className="text-slate-400" /> {job.serviceAddress}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500">Scheduled Window:</span>
                      <p className="font-bold text-white">
                        {job.scheduledDate ? new Date(job.scheduledDate).toLocaleDateString("en-AU") : "Today"} ({job.timeSlot || "Business Hours"})
                      </p>
                    </div>
                  </div>

                  {/* Existing Photos Count & Action */}
                  <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs text-slate-400 flex items-center gap-1.5">
                      <Camera size={14} className="text-blue-400" />
                      <span>{job.jobReport?.photos?.length || 0} Inspection Photos Logged</span>
                    </span>

                    <button
                      onClick={() => handleOpenJobModal(job)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-emerald-950 transition-all"
                    >
                      <Camera size={15} />
                      <span>Take Photos & Log Faults</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ==================================================== */}
      {/* MODAL: TAKE PHOTOS & LOG FAULT REPORT */}
      {/* ==================================================== */}
      {showUploadModal && activeJob && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-5 my-8 relative shadow-2xl">
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Field Inspection & Quality</span>
              <h2 className="text-lg font-bold text-white mt-1">Inspection Report • #{activeJob.bookingNumber}</h2>
              <p className="text-xs text-slate-400">{activeJob.customerName} - {activeJob.serviceAddress}</p>
            </div>

            <form onSubmit={handleUploadPhotoAndNotes} className="space-y-4 text-xs">
              {/* Photo Type Selector */}
              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  1. Select Photograph Stage
                </label>
                <div className="grid grid-cols-4 gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  {(["BEFORE", "DURING", "AFTER", "FAULT_EVIDENCE"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setPhotoType(t)}
                      className={`py-2 text-center rounded-lg font-bold text-[10px] transition-all ${
                        photoType === t
                          ? t === "FAULT_EVIDENCE"
                            ? "bg-red-600 text-white"
                            : "bg-emerald-500 text-slate-950"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {t.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo Presets for Easy Tap */}
              <div>
                <label className="block font-semibold text-slate-400 mb-1">Quick Select Field Photo Sample (or Paste URL):</label>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  {SAMPLE_PHOTOS.map((sp, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setPhotoUrl(sp.url);
                        setPhotoType(sp.type as any);
                        setCaption(sp.label);
                      }}
                      className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500 text-left text-[11px] text-slate-300 transition-colors"
                    >
                      <span className="font-bold text-emerald-400 block">{sp.type}</span>
                      <span className="truncate block">{sp.label}</span>
                    </button>
                  ))}
                </div>
                <input
                  type="url"
                  placeholder="https://images... (or captured photo url)"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono"
                />
              </div>

              {/* Photo Caption */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Photo Caption / Detail</label>
                <input
                  type="text"
                  placeholder="e.g. Heavy stain on wool carpet in lounge room"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                />
              </div>

              {/* Fault & Pre-Inspection Notes */}
              <div>
                <label className="block font-semibold text-amber-300 mb-1 flex items-center gap-1">
                  <AlertTriangle size={13} />
                  <span>2. Pre-Existing Fault / Damage Inspection Notes (Protects Business & Customer)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe pre-existing conditions noticed on arrival (e.g. carpet fraying, bleach spots, cracked skirting boards)..."
                  value={faultNotes}
                  onChange={(e) => setFaultNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:border-amber-500"
                />
              </div>

              {/* Treatment Applied */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">3. Chemical / Machinery Treatment Applied</label>
                <input
                  type="text"
                  placeholder="e.g. Hot water extraction at 90°C + Bifenthrin barrier pest spray"
                  value={treatmentApplied}
                  onChange={(e) => setTreatmentApplied(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                />
              </div>

              {/* Job Status update */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">4. Work Status</label>
                <select
                  value={jobStatus}
                  onChange={(e) => setJobStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                >
                  <option value="ARRIVED">Arrived on Site</option>
                  <option value="IN_PROGRESS">In Progress (Cleaning / Spraying)</option>
                  <option value="COMPLETED">Completed (Pristine Quality Checked)</option>
                  <option value="ISSUE_REPORTED">Issue Reported / Delayed</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center gap-1.5 shadow-lg shadow-emerald-950"
                >
                  <Send size={15} />
                  <span>Submit Quality Report & Photos</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
