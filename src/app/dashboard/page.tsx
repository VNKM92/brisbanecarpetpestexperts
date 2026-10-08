"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  FileText,
  Camera,
  Bell,
  User,
  LogOut,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  DollarSign,
  Phone,
  Mail,
  Printer,
  ChevronRight,
  Download,
  Eye,
  Building,
  Sparkle,
  BadgeCheck,
  X,
  Send,
  HelpCircle,
  Layers,
} from "lucide-react";
import { Suspense } from "react";

function CustomerDashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState<string>("overview");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Data states
  const [quotations, setQuotations] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  // Modals
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedBookingForPay, setSelectedBookingForPay] = useState<any>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  // New Quotation Form
  const [newQuote, setNewQuote] = useState({
    serviceName: "Carpet Steam Cleaning & Pest Control Combo",
    serviceAddress: "",
    suburb: "Brisbane City",
    postcode: "4000",
    scheduledDate: "",
    timeSlot: "Morning (8AM - 11AM)",
    rooms: 3,
    bathrooms: 2,
    squareFootage: 120,
    addons: [] as string[],
    notes: "",
    reminderMobileOpt: true,
    reminderEmailOpt: true,
  });
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [quoteSuccessMsg, setQuoteSuccessMsg] = useState("");

  // Payment Form
  const [paymentGateway, setPaymentGateway] = useState<"STRIPE" | "PAYPAL" | "PAYID" | "POLI" | "AFTERPAY" | "BANK_TRANSFER">("STRIPE");
  const [payProcessing, setPayProcessing] = useState(false);
  const [paySuccessMsg, setPaySuccessMsg] = useState("");

  const BRISBANE_SUBURBS = [
    { name: "Brisbane City", postcode: "4000" },
    { name: "South Brisbane", postcode: "4101" },
    { name: "Fortitude Valley", postcode: "4006" },
    { name: "New Farm", postcode: "4005" },
    { name: "Chermside", postcode: "4032" },
    { name: "Carindale", postcode: "4152" },
    { name: "Indooroopilly", postcode: "4068" },
    { name: "Sunnybank", postcode: "4109" },
    { name: "Mount Gravatt", postcode: "4122" },
    { name: "Toowong", postcode: "4066" },
    { name: "Ipswich", postcode: "4305" },
    { name: "Logan Central", postcode: "4114" },
    { name: "Springfield", postcode: "4300" },
  ];

  const SERVICES_LIST = [
    "Carpet Steam Cleaning & Pest Control Combo",
    "Bond Cleaning / End of Lease Cleaning",
    "Professional Carpet Steam Cleaning",
    "Comprehensive Pest Control Management",
    "Upholstery, Couch & Sofa Deep Cleaning",
    "Tile & Grout Pressure Extraction",
    "Mattress Sanitisation & Dust Mite Removal",
    "Commercial Office Carpet & Sanitising",
  ];

  const ADDON_OPTIONS = [
    { id: "stain_shield", name: "Scotchgard™ Stain Protection Guard", price: 45 },
    { id: "flea_tick", name: "Flea & Tick End of Lease Treatment (Pest Cert)", price: 65 },
    { id: "pet_odour", name: "Pet Urine & Deep Odour Bio-Enzyme Treatment", price: 50 },
    { id: "sanitise", name: "Hospital-Grade Anti-Microbial Sanitisation", price: 40 },
    { id: "hallway", name: "Hallway & Stairs Deep Extraction", price: 35 },
  ];

  // Fetch initial data
  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch me
      const meRes = await fetch("/api/auth/me");
      if (!meRes.ok) {
        router.push("/login?returnUrl=/dashboard");
        return;
      }
      const meData = await meRes.json();
      setUser(meData.data.user);

      // Fetch quotations
      const quoteRes = await fetch("/api/customer/quotations");
      if (quoteRes.ok) {
        const qData = await quoteRes.json();
        setQuotations(qData.data || []);
      }

      // Fetch invoices
      const invRes = await fetch("/api/customer/invoices");
      if (invRes.ok) {
        const iData = await invRes.json();
        setInvoices(iData.data || []);
      }

      // Fetch notifications
      const notifRes = await fetch("/api/customer/notifications");
      if (notifRes.ok) {
        const nData = await notifRes.json();
        setNotifications(nData.data?.notifications || []);
        setUnreadCount(nData.data?.unreadCount || 0);
      }
    } catch (err) {
      console.error("Dashboard load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Check query params (e.g. ?tab=quotations&payBookingId=xxx)
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);

    const payId = searchParams.get("payBookingId");
    if (payId && quotations.length > 0) {
      const found = quotations.find((q) => q.id === payId);
      if (found) {
        setSelectedBookingForPay(found);
        setShowPayModal(true);
      }
    }
  }, [searchParams, quotations]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  const handleToggleAddon = (name: string) => {
    setNewQuote((prev) => {
      const exists = prev.addons.includes(name);
      return {
        ...prev,
        addons: exists ? prev.addons.filter((a) => a !== name) : [...prev.addons, name],
      };
    });
  };

  const handleCreateQuotation = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitting(true);
    setQuoteSuccessMsg("");

    try {
      const res = await fetch("/api/customer/quotations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newQuote,
          customerName: user?.name,
          customerEmail: user?.email,
          customerPhone: user?.phone,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setQuoteSuccessMsg("🎉 Demand quotation submitted! Super Admin will review and approve your quotation shortly.");
        fetchData();
        setTimeout(() => {
          setShowQuoteModal(false);
          setActiveTab("quotations");
          setQuoteSuccessMsg("");
        }, 1800);
      } else {
        alert(data.message || "Failed to submit quotation");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      setQuoteSubmitting(false);
    }
  };

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookingForPay) return;

    setPayProcessing(true);
    setPaySuccessMsg("");

    try {
      const res = await fetch("/api/customer/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: selectedBookingForPay.id,
          amount: selectedBookingForPay.depositRequired || 50.0,
          paymentGateway,
          paymentType: "DEPOSIT",
          payerEmail: user?.email,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPaySuccessMsg(`Deposit of $${selectedBookingForPay.depositRequired || 50} AUD confirmed! Your booking is locked in.`);
        fetchData();
        setTimeout(() => {
          setShowPayModal(false);
          setActiveTab("bookings");
          setPaySuccessMsg("");
        }, 1500);
      } else {
        alert(data.message || "Payment failed");
      }
    } catch (err) {
      alert("Payment processing error");
    } finally {
      setPayProcessing(false);
    }
  };

  const handleMarkNotificationsRead = async () => {
    await fetch("/api/customer/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ markAllRead: true }),
    });
    setUnreadCount(0);
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 text-sm">Loading your personal portal...</p>
      </div>
    );
  }

  const pendingQuotes = quotations.filter((q) => q.quoteStatus === "PENDING_APPROVAL");
  const approvedQuotes = quotations.filter((q) => q.quoteStatus === "APPROVED");
  const confirmedBookings = quotations.filter((q) => q.status === "CONFIRMED" || q.status === "IN_PROGRESS" || q.status === "COMPLETED");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-blue-950">
              <ShieldCheck size={22} />
            </div>
            <div>
              <span className="font-bold text-base text-white block leading-tight">Brisbane Carpet & Pest</span>
              <span className="text-[11px] text-blue-400 uppercase tracking-wider font-semibold">Customer Dashboard</span>
            </div>
          </Link>
        </div>

        {/* Top Actions & Profile */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowQuoteModal(true)}
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-md shadow-blue-950/40 transition-all"
          >
            <PlusCircle size={15} />
            <span>Book Demand Quotation</span>
          </button>

          {/* Notifications Bell */}
          <button
            onClick={() => {
              setActiveTab("notifications");
              handleMarkNotificationsRead();
            }}
            className="relative p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
            title="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Profile dropdown */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-300 font-bold text-xs">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="hidden md:block text-left text-xs">
              <p className="font-semibold text-white leading-tight">{user?.name}</p>
              <p className="text-[11px] text-slate-400">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors ml-1"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 gap-6">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-2">
          {/* Quick Action Mobile */}
          <button
            onClick={() => setShowQuoteModal(true)}
            className="w-full sm:hidden mb-3 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-md"
          >
            <PlusCircle size={16} />
            <span>Book Demand Quotation</span>
          </button>

          <nav className="bg-slate-900/70 border border-slate-800/90 backdrop-blur-md rounded-2xl p-2.5 space-y-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "overview"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-950"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers size={16} />
                <span>Overview</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("quotations")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "quotations"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-950"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Clock size={16} />
                <span>Demand Quotations</span>
              </div>
              {approvedQuotes.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px]">
                  {approvedQuotes.length} Ready
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("bookings")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "bookings"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-950"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Calendar size={16} />
                <span>Confirmed Bookings</span>
              </div>
              {confirmedBookings.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-blue-500 text-white font-bold text-[10px]">
                  {confirmedBookings.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("invoices")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "invoices"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-950"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText size={16} />
                <span>Invoices & Bills</span>
              </div>
              {invoices.length > 0 && (
                <span className="text-[11px] text-slate-400 font-mono">{invoices.length}</span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("photos")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "photos"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-950"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Camera size={16} />
                <span>Technician Photos & Inspection</span>
              </div>
            </button>

            <button
              onClick={() => {
                setActiveTab("notifications");
                handleMarkNotificationsRead();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "notifications"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-950"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Bell size={16} />
                <span>Notifications</span>
              </div>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-red-500 text-white font-bold text-[10px]">
                  {unreadCount}
                </span>
              )}
            </button>
          </nav>

          {/* Quick Help Card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-xs space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <ShieldCheck size={16} />
              <span>Brisbane 100% Bond Guarantee</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              2-Day automated reminder via SMS & Email sent before your specialist arrives.
            </p>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Direct Dispatch:</span>
              <a href="tel:0434061188" className="text-blue-400 font-bold hover:underline">0434 061 188</a>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 space-y-6">
          {/* ==================================================== */}
          {/* TAB 1: OVERVIEW */}
          {/* ==================================================== */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-blue-900/50 via-slate-900/80 to-slate-900 border border-blue-800/40 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
                <div className="relative z-10 max-w-2xl space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
                    <Sparkles size={13} />
                    <span>Customer Portal • Brisbane Metro</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Welcome back, {user?.name}!
                  </h1>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Track your demand quotations, pay $50 deposits to lock in dates, view technician before/after inspection photos, and manage tax invoices.
                  </p>
                  <div className="pt-3 flex flex-wrap gap-3">
                    <button
                      onClick={() => setShowQuoteModal(true)}
                      className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 transition-all"
                    >
                      <PlusCircle size={15} />
                      <span>Book New Requirement</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("quotations")}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-700 flex items-center gap-2 transition-all"
                    >
                      <span>View Quotations ({quotations.length})</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* KPI Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-1">
                  <span className="text-xs text-slate-400 font-medium">Pending Approvals</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-amber-400">{pendingQuotes.length}</span>
                    <Clock size={18} className="text-amber-400/50" />
                  </div>
                  <span className="text-[10px] text-slate-500">Awaiting Super Admin review</span>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-1">
                  <span className="text-xs text-slate-400 font-medium">Approved Quotes</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-emerald-400">{approvedQuotes.length}</span>
                    <CheckCircle2 size={18} className="text-emerald-400/50" />
                  </div>
                  <span className="text-[10px] text-slate-500">Ready for $50 deposit lock</span>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-1">
                  <span className="text-xs text-slate-400 font-medium">Confirmed Bookings</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-blue-400">{confirmedBookings.length}</span>
                    <Calendar size={18} className="text-blue-400/50" />
                  </div>
                  <span className="text-[10px] text-slate-500">Scheduled on calendar</span>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-1">
                  <span className="text-xs text-slate-400 font-medium">Invoices & Bills</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-purple-400">{invoices.length}</span>
                    <FileText size={18} className="text-purple-400/50" />
                  </div>
                  <span className="text-[10px] text-slate-500">Tax invoices with GST</span>
                </div>
              </div>

              {/* Actionable Approved Quotes Banner */}
              {approvedQuotes.length > 0 && (
                <div className="bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/40 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 size={18} />
                    <span>Action Required: Super Admin Approved Your Quotation!</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Your quotation #{approvedQuotes[0].bookingNumber} for <strong>{approvedQuotes[0].serviceName}</strong> is approved at <strong>${approvedQuotes[0].approvedPrice || approvedQuotes[0].totalPrice} AUD</strong>. Pay a quick $50 AUD deposit now to lock in your date.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedBookingForPay(approvedQuotes[0]);
                      setShowPayModal(true);
                    }}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-950 transition-all"
                  >
                    <CreditCard size={15} />
                    <span>Pay $50 Deposit via Stripe / PayPal / PayID</span>
                  </button>
                </div>
              )}

              {/* Recent Activity / Bookings Table */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Clock size={16} className="text-blue-400" />
                    <span>Recent Quotations & Bookings</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab("quotations")}
                    className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>View all</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                {quotations.length === 0 ? (
                  <div className="text-center py-10 space-y-3">
                    <FileText size={32} className="mx-auto text-slate-600" />
                    <p className="text-xs text-slate-400">No quotation requests yet.</p>
                    <button
                      onClick={() => setShowQuoteModal(true)}
                      className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-xl"
                    >
                      Submit First Requirement
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                          <th className="pb-3 font-semibold">Ref Number</th>
                          <th className="pb-3 font-semibold">Service</th>
                          <th className="pb-3 font-semibold">Scheduled Date</th>
                          <th className="pb-3 font-semibold">Price / Deposit</th>
                          <th className="pb-3 font-semibold">Status</th>
                          <th className="pb-3 font-semibold text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {quotations.slice(0, 5).map((q) => (
                          <tr key={q.id} className="hover:bg-slate-850/50">
                            <td className="py-3.5 font-mono text-slate-300 font-medium">{q.bookingNumber}</td>
                            <td className="py-3.5 text-white font-medium">{q.serviceName}</td>
                            <td className="py-3.5 text-slate-300">
                              {q.scheduledDate ? new Date(q.scheduledDate).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" }) : "Flexible"}
                            </td>
                            <td className="py-3.5 font-semibold">
                              {q.approvedPrice ? (
                                <span className="text-emerald-400">${q.approvedPrice} AUD</span>
                              ) : (
                                <span className="text-slate-400">Est. ${q.totalPrice} AUD</span>
                              )}
                            </td>
                            <td className="py-3.5">
                              {q.status === "CONFIRMED" ? (
                                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold">
                                  Confirmed
                                </span>
                              ) : q.quoteStatus === "APPROVED" ? (
                                <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[11px] font-semibold">
                                  Approved ($50 Due)
                                </span>
                              ) : q.quoteStatus === "REJECTED" ? (
                                <span className="px-2 py-0.5 rounded-md bg-red-500/20 text-red-300 border border-red-500/30 text-[11px] font-semibold">
                                  Rejected
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-semibold">
                                  Pending Review
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 text-right">
                              {q.quoteStatus === "APPROVED" && q.status !== "CONFIRMED" ? (
                                <button
                                  onClick={() => {
                                    setSelectedBookingForPay(q);
                                    setShowPayModal(true);
                                  }}
                                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-2.5 py-1 rounded-lg text-[11px]"
                                >
                                  Pay $50 Deposit
                                </button>
                              ) : (
                                <button
                                  onClick={() => setActiveTab("quotations")}
                                  className="text-slate-400 hover:text-white text-[11px] underline"
                                >
                                  View Details
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 2: DEMAND QUOTATIONS */}
          {/* ==================================================== */}
          {activeTab === "quotations" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">Your Demand Quotations</h2>
                  <p className="text-xs text-slate-400">Request custom requirements, track Super Admin approval, and lock with $50 AUD deposit.</p>
                </div>
                <button
                  onClick={() => setShowQuoteModal(true)}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-md"
                >
                  <PlusCircle size={15} />
                  <span>Request New Quotation</span>
                </button>
              </div>

              {quotations.length === 0 ? (
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-10 text-center space-y-3">
                  <FileText size={36} className="mx-auto text-slate-600" />
                  <p className="text-sm font-semibold text-slate-300">No quotation requests found</p>
                  <button
                    onClick={() => setShowQuoteModal(true)}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-xl"
                  >
                    Submit Quotation Demand
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {quotations.map((q) => (
                    <div
                      key={q.id}
                      className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                        <div>
                          <span className="font-mono text-xs text-blue-400 font-bold">{q.bookingNumber}</span>
                          <h3 className="text-base font-bold text-white mt-0.5">{q.serviceName}</h3>
                        </div>
                        <div>
                          {q.status === "CONFIRMED" ? (
                            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                              <CheckCircle2 size={13} /> Confirmed (Deposit Paid)
                            </span>
                          ) : q.quoteStatus === "APPROVED" ? (
                            <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold flex items-center gap-1 animate-pulse">
                              <Sparkles size={13} /> Approved: Pay $50 Deposit
                            </span>
                          ) : q.quoteStatus === "REJECTED" ? (
                            <span className="px-2.5 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold flex items-center gap-1">
                              <AlertCircle size={13} /> Rejected
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1">
                              <Clock size={13} /> Pending Super Admin Approval
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div className="space-y-1">
                          <span className="text-slate-500">Service Location:</span>
                          <p className="text-slate-200 font-medium flex items-center gap-1">
                            <MapPin size={13} className="text-slate-400" />
                            <span>{q.serviceAddress}</span>
                          </p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-slate-500">Requested Schedule:</span>
                          <p className="text-slate-200 font-medium flex items-center gap-1">
                            <Calendar size={13} className="text-slate-400" />
                            <span>
                              {q.scheduledDate ? new Date(q.scheduledDate).toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short", year: "numeric" }) : "Flexible"} ({q.timeSlot})
                            </span>
                          </p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-slate-500">Approved Total / Deposit:</span>
                          <p className="text-slate-200 font-bold text-sm">
                            {q.approvedPrice ? (
                              <span className="text-emerald-400">${q.approvedPrice} AUD</span>
                            ) : (
                              <span className="text-slate-400">${q.totalPrice} AUD (Estimated)</span>
                            )}
                            <span className="text-slate-400 text-xs font-normal"> / Dep: ${q.depositRequired || 50} AUD</span>
                          </p>
                        </div>
                      </div>

                      {/* Admin Notes */}
                      {q.adminNotes && (
                        <div className="p-3 bg-blue-950/40 border border-blue-900/60 rounded-xl text-xs text-blue-200">
                          <strong>Admin Note:</strong> {q.adminNotes}
                        </div>
                      )}

                      {/* Rejection Reason */}
                      {q.rejectionReason && (
                        <div className="p-3 bg-red-950/40 border border-red-900/60 rounded-xl text-xs text-red-200">
                          <strong>Reason:</strong> {q.rejectionReason}
                        </div>
                      )}

                      {/* Action CTA */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
                        <div className="text-[11px] text-slate-400">
                          Submitted on {new Date(q.createdAt).toLocaleDateString("en-AU")}
                        </div>
                        {q.quoteStatus === "APPROVED" && q.status !== "CONFIRMED" && (
                          <button
                            onClick={() => {
                              setSelectedBookingForPay(q);
                              setShowPayModal(true);
                            }}
                            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-950 transition-all"
                          >
                            <CreditCard size={15} />
                            <span>Pay ${q.depositRequired || 50} AUD Deposit to Confirm</span>
                          </button>
                        )}
                        {q.status === "CONFIRMED" && (
                          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                            <BadgeCheck size={15} /> Booking Confirmed & Locked
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 3: CONFIRMED BOOKINGS */}
          {/* ==================================================== */}
          {activeTab === "bookings" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white">Confirmed Bookings & Schedule</h2>
                <p className="text-xs text-slate-400">Track active field technician visits, 2-day pre-booking reminders, and completion reports.</p>
              </div>

              {confirmedBookings.length === 0 ? (
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-10 text-center space-y-3">
                  <Calendar size={36} className="mx-auto text-slate-600" />
                  <p className="text-sm font-semibold text-slate-300">No confirmed bookings yet</p>
                  <p className="text-xs text-slate-400">Once your quotation is approved, pay the $50 deposit to confirm your booking date.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {confirmedBookings.map((b) => (
                    <div
                      key={b.id}
                      className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                        <div>
                          <span className="text-xs font-mono text-emerald-400 font-bold">Booking #{b.bookingNumber}</span>
                          <h3 className="text-base font-bold text-white mt-0.5">{b.serviceName}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                            {b.status}
                          </span>
                        </div>
                      </div>

                      {/* 2-Day Reminder Badge */}
                      <div className="bg-blue-950/40 border border-blue-800/40 rounded-xl p-3 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-blue-300">
                          <Bell size={15} />
                          <span>2-Day Pre-Booking Automated Reminder:</span>
                        </div>
                        <span className="font-semibold text-white">
                          {b.reminderSent2Days ? "✅ Dispatched (Email & SMS)" : "⏰ Scheduled 48h Prior"}
                        </span>
                      </div>

                      {/* Grid Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                        <div className="space-y-1">
                          <span className="text-slate-400">Date & Window:</span>
                          <p className="font-medium text-white">
                            {b.scheduledDate ? new Date(b.scheduledDate).toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "Confirmed"}
                          </p>
                          <p className="text-slate-400">{b.timeSlot || "Business Hours"}</p>
                        </div>

                        <div className="space-y-1">
                          <span className="text-slate-400">Assigned Technician:</span>
                          <p className="font-medium text-white">
                            {b.assignedEmployee ? b.assignedEmployee.name : "Brisbane Certified Team"}
                          </p>
                          <p className="text-slate-400">{b.assignedEmployee?.designation || "Senior Specialist"}</p>
                        </div>

                        <div className="space-y-1">
                          <span className="text-slate-400">Financial Balance:</span>
                          <p className="font-bold text-emerald-400">
                            Deposit Paid: ${b.depositPaid} AUD
                          </p>
                          <p className="text-slate-400">Balance Due on Completion: ${b.balanceDue || 0} AUD</p>
                        </div>
                      </div>

                      {/* Quick Links */}
                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                        <button
                          onClick={() => setActiveTab("photos")}
                          className="text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                        >
                          <Camera size={14} />
                          <span>View Technician Inspection Photos</span>
                        </button>
                        <button
                          onClick={() => setActiveTab("invoices")}
                          className="text-slate-300 hover:text-white flex items-center gap-1 font-semibold"
                        >
                          <FileText size={14} />
                          <span>View Receipt / Tax Invoice</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 4: INVOICES & BILLS */}
          {/* ==================================================== */}
          {activeTab === "invoices" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white">Official Tax Invoices & Billing</h2>
                <p className="text-xs text-slate-400">GST-compliant receipts and tax invoices with Brisbane ABN: 45 892 103 441.</p>
              </div>

              {invoices.length === 0 ? (
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-10 text-center space-y-3">
                  <FileText size={36} className="mx-auto text-slate-600" />
                  <p className="text-sm font-semibold text-slate-300">No invoices issued yet</p>
                  <p className="text-xs text-slate-400">Invoices are automatically generated when you pay a deposit or upon service completion.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {invoices.map((inv) => (
                    <div
                      key={inv.id}
                      className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                        <div>
                          <span className="font-mono text-xs text-purple-400 font-bold">{inv.invoiceNumber}</span>
                          <h3 className="text-base font-bold text-white mt-0.5">Tax Invoice</h3>
                        </div>
                        <div>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            inv.status === "PAID"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          }`}>
                            {inv.status === "PARTIAL" ? "Deposit Paid" : inv.status}
                          </span>
                        </div>
                      </div>

                      {/* Invoice Summary */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div>
                          <span className="text-slate-500">Issued Date:</span>
                          <p className="text-slate-200 font-medium">{new Date(inv.issuedDate).toLocaleDateString("en-AU")}</p>
                        </div>
                        <div>
                          <span className="text-slate-500">GST (10% Inc):</span>
                          <p className="text-slate-200 font-medium">${inv.gstAmount} AUD</p>
                        </div>
                        <div>
                          <span className="text-slate-500">Total Amount:</span>
                          <p className="text-white font-bold text-sm">${inv.totalAmount} AUD</p>
                        </div>
                        <div>
                          <span className="text-slate-500">Balance Due:</span>
                          <p className="text-amber-400 font-bold text-sm">${inv.balanceDue} AUD</p>
                        </div>
                      </div>

                      {/* View Button */}
                      <div className="pt-2 border-t border-slate-800 flex justify-end">
                        <button
                          onClick={() => {
                            setSelectedInvoice(inv);
                            setShowInvoiceModal(true);
                          }}
                          className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
                        >
                          <Eye size={14} />
                          <span>View & Print Tax Invoice</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 5: TECHNICIAN PHOTOS & INSPECTION */}
          {/* ==================================================== */}
          {activeTab === "photos" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white">Technician Photos & Quality Inspection</h2>
                <p className="text-xs text-slate-400">View real-time before/during/after photos uploaded directly by your assigned field technician.</p>
              </div>

              {quotations.filter((q) => q.jobReport?.photos?.length > 0).length === 0 ? (
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-10 text-center space-y-3">
                  <Camera size={36} className="mx-auto text-slate-600" />
                  <p className="text-sm font-semibold text-slate-300">No inspection photos logged yet</p>
                  <p className="text-xs text-slate-400">When the technician visits your property, they will take photos one-by-one and record any pre-existing conditions.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {quotations
                    .filter((q) => q.jobReport?.photos?.length > 0)
                    .map((q) => (
                      <div key={q.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
                        <div className="border-b border-slate-800 pb-3">
                          <span className="text-xs font-mono text-blue-400 font-bold">{q.bookingNumber}</span>
                          <h3 className="text-base font-bold text-white">{q.serviceName}</h3>
                          <p className="text-xs text-slate-400">{q.serviceAddress}</p>
                        </div>

                        {/* Fault notes if any */}
                        {q.jobReport?.faultNotes && (
                          <div className="p-3 bg-amber-950/40 border border-amber-800/60 rounded-xl text-xs text-amber-200">
                            <strong>Technician Pre-Inspection Note:</strong> {q.jobReport.faultNotes}
                          </div>
                        )}

                        {/* Photos Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {q.jobReport.photos.map((p: any) => (
                            <div key={p.id} className="group relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                              <img
                                src={p.photoUrl}
                                alt={p.caption || "Job Photo"}
                                className="w-full h-36 object-cover group-hover:scale-105 transition-transform"
                              />
                              <div className="p-2 bg-slate-900 text-[10px]">
                                <span className="font-bold text-blue-400 uppercase tracking-wider block">{p.type}</span>
                                <span className="text-slate-300 truncate block">{p.caption || "Inspection Evidence"}</span>
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
          {/* TAB 6: NOTIFICATIONS */}
          {/* ==================================================== */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">Notifications Center</h2>
                  <p className="text-xs text-slate-400">Real-time alerts, approval notifications, and 2-day pre-booking reminders.</p>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkNotificationsRead}
                    className="text-xs text-blue-400 hover:underline font-semibold"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              {notifications.length === 0 ? (
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-10 text-center space-y-3">
                  <Bell size={36} className="mx-auto text-slate-600" />
                  <p className="text-sm font-semibold text-slate-300">No notifications</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-4 rounded-xl border text-xs transition-colors flex items-start gap-3 ${
                        n.isRead
                          ? "bg-slate-900/50 border-slate-800 text-slate-400"
                          : "bg-slate-900/90 border-blue-500/40 text-slate-200"
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 flex-shrink-0 mt-0.5">
                        <Bell size={16} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-white">{n.title}</h4>
                          <span className="text-[10px] text-slate-500">{new Date(n.createdAt).toLocaleDateString("en-AU")}</span>
                        </div>
                        <p className="text-slate-300 text-xs leading-relaxed">{n.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* ==================================================== */}
      {/* MODAL 1: DEMAND QUOTATION BOOKING FORM */}
      {/* ==================================================== */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-5 my-8 relative shadow-2xl">
            <button
              onClick={() => setShowQuoteModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Demand Booking</span>
              <h2 className="text-xl font-bold text-white mt-1">Book Demand Quotation</h2>
              <p className="text-xs text-slate-400">Specify your exact requirements. Super Admin will review & approve your price, then you can confirm with a $50 AUD deposit.</p>
            </div>

            {quoteSuccessMsg && (
              <div className="p-3.5 bg-emerald-950/60 border border-emerald-800/80 rounded-xl text-emerald-200 text-xs flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{quoteSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleCreateQuotation} className="space-y-4 text-xs">
              {/* Service Selection */}
              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Select Service Required <span className="text-red-400">*</span>
                </label>
                <select
                  value={newQuote.serviceName}
                  onChange={(e) => setNewQuote({ ...newQuote, serviceName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500 text-xs"
                >
                  {SERVICES_LIST.map((srv) => (
                    <option key={srv} value={srv} className="bg-slate-900 text-white">
                      {srv}
                    </option>
                  ))}
                </select>
              </div>

              {/* Address & Brisbane Suburb */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Service Street Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 45 Adelaide Street"
                    value={newQuote.serviceAddress}
                    onChange={(e) => setNewQuote({ ...newQuote, serviceAddress: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Brisbane Suburb
                  </label>
                  <select
                    value={newQuote.suburb}
                    onChange={(e) => {
                      const found = BRISBANE_SUBURBS.find((s) => s.name === e.target.value);
                      setNewQuote({
                        ...newQuote,
                        suburb: e.target.value,
                        postcode: found ? found.postcode : newQuote.postcode,
                      });
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500 text-xs"
                  >
                    {BRISBANE_SUBURBS.map((s) => (
                      <option key={s.name} value={s.name} className="bg-slate-900 text-white">
                        {s.name} ({s.postcode})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Preferred Service Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={newQuote.scheduledDate}
                    onChange={(e) => setNewQuote({ ...newQuote, scheduledDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Time Window
                  </label>
                  <select
                    value={newQuote.timeSlot}
                    onChange={(e) => setNewQuote({ ...newQuote, timeSlot: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500 text-xs"
                  >
                    <option value="Morning (8AM - 11AM)">Morning (8AM - 11AM)</option>
                    <option value="Midday (11AM - 2PM)">Midday (11AM - 2PM)</option>
                    <option value="Afternoon (2PM - 5PM)">Afternoon (2PM - 5PM)</option>
                    <option value="Flexible All Day">Flexible All Day</option>
                  </select>
                </div>
              </div>

              {/* Rooms & Bathrooms Counters */}
              <div className="grid grid-cols-3 gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Bedrooms / Areas</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={newQuote.rooms}
                    onChange={(e) => setNewQuote({ ...newQuote, rooms: parseInt(e.target.value, 10) || 1 })}
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Bathrooms</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={newQuote.bathrooms}
                    onChange={(e) => setNewQuote({ ...newQuote, bathrooms: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Approx SQM</label>
                  <input
                    type="number"
                    min="20"
                    max="2000"
                    value={newQuote.squareFootage}
                    onChange={(e) => setNewQuote({ ...newQuote, squareFootage: parseInt(e.target.value, 10) || 100 })}
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                  />
                </div>
              </div>

              {/* Addons Checklist */}
              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Optional Value Add-ons
                </label>
                <div className="space-y-2">
                  {ADDON_OPTIONS.map((ad) => (
                    <label
                      key={ad.id}
                      className="flex items-center justify-between p-2.5 bg-slate-950/70 border border-slate-800 rounded-xl cursor-pointer hover:bg-slate-950 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={newQuote.addons.includes(ad.name)}
                          onChange={() => handleToggleAddon(ad.name)}
                          className="rounded text-blue-600 focus:ring-blue-500 bg-slate-900 border-slate-700"
                        />
                        <span className="text-slate-300 font-medium">{ad.name}</span>
                      </div>
                      <span className="text-emerald-400 font-semibold">+${ad.price} AUD</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Special Instructions or Specific Areas of Concern
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Pet stains in master bedroom, key under mat, strict bond inspection deadline..."
                  value={newQuote.notes}
                  onChange={(e) => setNewQuote({ ...newQuote, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-xs"
                />
              </div>

              {/* Reminder Preferences */}
              <div className="p-3 bg-blue-950/30 border border-blue-800/40 rounded-xl space-y-2">
                <span className="font-semibold text-blue-300">2-Day Pre-Booking Notification Preferences:</span>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newQuote.reminderEmailOpt}
                      onChange={(e) => setNewQuote({ ...newQuote, reminderEmailOpt: e.target.checked })}
                      className="rounded text-blue-600"
                    />
                    <span className="text-slate-300">Email Reminder</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newQuote.reminderMobileOpt}
                      onChange={(e) => setNewQuote({ ...newQuote, reminderMobileOpt: e.target.checked })}
                      className="rounded text-blue-600"
                    />
                    <span className="text-slate-300">Mobile SMS / WhatsApp</span>
                  </label>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={quoteSubmitting}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-950 transition-all disabled:opacity-50"
              >
                {quoteSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Submit Requirement to Super Admin</span>
                    <Send size={15} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL 2: AUSTRALIAN PAYMENT GATEWAY ($50 DEPOSIT LOCK) */}
      {/* ==================================================== */}
      {showPayModal && selectedBookingForPay && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 relative shadow-2xl">
            <button
              onClick={() => setShowPayModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
                <BadgeCheck size={13} />
                <span>Super Admin Approved</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1.5">Confirm Booking & Pay Deposit</h2>
              <p className="text-xs text-slate-400">Lock in your scheduled date with an Australia standard refundable $50 AUD deposit.</p>
            </div>

            {paySuccessMsg && (
              <div className="p-3.5 bg-emerald-950/60 border border-emerald-800/80 rounded-xl text-emerald-200 text-xs flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{paySuccessMsg}</span>
              </div>
            )}

            {/* Price Summary Breakdown */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Quotation Ref:</span>
                <span className="font-mono text-white font-semibold">{selectedBookingForPay.bookingNumber}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Approved Total Price:</span>
                <span className="text-white font-bold">${selectedBookingForPay.approvedPrice || selectedBookingForPay.totalPrice} AUD</span>
              </div>
              <div className="flex justify-between border-t border-slate-800/80 pt-2 font-bold text-sm">
                <span className="text-emerald-400">Deposit Due Now:</span>
                <span className="text-emerald-400">${selectedBookingForPay.depositRequired || 50}.00 AUD</span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>Remaining Balance on Completion:</span>
                <span>${(selectedBookingForPay.approvedPrice || selectedBookingForPay.totalPrice) - (selectedBookingForPay.depositRequired || 50)} AUD</span>
              </div>
            </div>

            {/* Gateway Selector (Australia & Global) */}
            <div className="space-y-2 text-xs">
              <label className="block font-semibold text-slate-300 uppercase tracking-wider">
                Select Australian Payment Gateway
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentGateway("STRIPE")}
                  className={`p-2.5 rounded-xl border text-center font-semibold transition-all ${
                    paymentGateway === "STRIPE"
                      ? "bg-blue-600/30 border-blue-500 text-white"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <CreditCard size={16} className="mx-auto mb-1 text-blue-400" />
                  <span>Stripe / Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentGateway("PAYPAL")}
                  className={`p-2.5 rounded-xl border text-center font-semibold transition-all ${
                    paymentGateway === "PAYPAL"
                      ? "bg-blue-600/30 border-blue-500 text-white"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <DollarSign size={16} className="mx-auto mb-1 text-yellow-400" />
                  <span>PayPal</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentGateway("PAYID")}
                  className={`p-2.5 rounded-xl border text-center font-semibold transition-all ${
                    paymentGateway === "PAYID"
                      ? "bg-blue-600/30 border-blue-500 text-white"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <Building size={16} className="mx-auto mb-1 text-emerald-400" />
                  <span>PayID / POLi</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleProcessPayment} className="space-y-4 text-xs">
              {paymentGateway === "STRIPE" && (
                <div className="space-y-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Card Number (Stripe Australia)</label>
                    <input
                      type="text"
                      defaultValue="4242 •••• •••• 4242"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Expiry</label>
                      <input
                        type="text"
                        defaultValue="12/28"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">CVC</label>
                      <input
                        type="text"
                        defaultValue="888"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentGateway === "PAYID" && (
                <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl space-y-1.5 text-xs text-emerald-200">
                  <p><strong>Australian PayID:</strong> info@brisbanecarpetpestexperts.com.au</p>
                  <p className="text-[11px] text-slate-400">Instant verification via Osko / Australian New Payments Platform (NPP).</p>
                </div>
              )}

              {paymentGateway === "PAYPAL" && (
                <div className="p-3 bg-blue-950/30 border border-blue-800/40 rounded-xl space-y-1.5 text-xs text-blue-200">
                  <p><strong>PayPal Express Checkout:</strong> Fast, encrypted checkout with buyer protection.</p>
                </div>
              )}

              <button
                type="submit"
                disabled={payProcessing}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all disabled:opacity-50"
              >
                {payProcessing ? (
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CreditCard size={16} />
                    <span>Pay ${selectedBookingForPay.depositRequired || 50} AUD & Lock Booking</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL 3: VIEW TAX INVOICE */}
      {/* ==================================================== */}
      {showInvoiceModal && selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-2xl max-w-2xl w-full p-8 space-y-6 relative shadow-2xl my-8">
            <button
              onClick={() => setShowInvoiceModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="flex justify-between items-start border-b border-slate-200 pb-5">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">TAX INVOICE</h1>
                <p className="text-xs text-slate-500 font-mono mt-1">Invoice #{selectedInvoice.invoiceNumber}</p>
                <p className="text-xs text-slate-500">ABN: 45 892 103 441</p>
              </div>
              <div className="text-right text-xs">
                <h3 className="font-bold text-slate-900">Brisbane Carpet & Pest Experts</h3>
                <p className="text-slate-600">Brisbane, Queensland, 4000</p>
                <p className="text-slate-600">0434 061 188</p>
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 font-semibold block uppercase">Billed To:</span>
                <p className="font-bold text-slate-900">{selectedInvoice.customerName}</p>
                <p className="text-slate-600">{selectedInvoice.customerEmail}</p>
                <p className="text-slate-600">{selectedInvoice.customerAddress}</p>
              </div>
              <div className="text-right">
                <span className="text-slate-500 font-semibold block uppercase">Invoice Details:</span>
                <p className="text-slate-600">Issued: {new Date(selectedInvoice.issuedDate).toLocaleDateString("en-AU")}</p>
                <p className="text-slate-600">Due: {selectedInvoice.dueDate ? new Date(selectedInvoice.dueDate).toLocaleDateString("en-AU") : "Upon Receipt"}</p>
                <p className="font-bold text-emerald-600">Status: {selectedInvoice.status}</p>
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-y border-slate-200">
                  <th className="py-2.5 px-3 text-left">Item Description</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Price</th>
                  <th className="py-2.5 px-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {selectedInvoice.items?.map((it: any) => (
                  <tr key={it.id}>
                    <td className="py-3 px-3 text-slate-800">{it.description}</td>
                    <td className="py-3 px-3 text-center">{it.quantity}</td>
                    <td className="py-3 px-3 text-right">${it.unitPrice.toFixed(2)}</td>
                    <td className="py-3 px-3 text-right font-semibold">${it.totalPrice.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals & Australian GST */}
            <div className="border-t border-slate-200 pt-4 flex justify-end text-xs">
              <div className="w-64 space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal (Ex GST):</span>
                  <span>${selectedInvoice.subtotal.toFixed(2)} AUD</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GST (10%):</span>
                  <span>${selectedInvoice.gstAmount.toFixed(2)} AUD</span>
                </div>
                <div className="flex justify-between text-slate-900 font-bold text-sm border-t border-slate-200 pt-1.5">
                  <span>Total (Inc GST):</span>
                  <span>${selectedInvoice.totalAmount.toFixed(2)} AUD</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Deposit Paid:</span>
                  <span>-${selectedInvoice.depositPaid.toFixed(2)} AUD</span>
                </div>
                <div className="flex justify-between text-red-600 font-bold text-sm border-t border-slate-200 pt-1.5">
                  <span>Balance Due:</span>
                  <span>${selectedInvoice.balanceDue.toFixed(2)} AUD</span>
                </div>
              </div>
            </div>

            {/* Print Action */}
            <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-xs">
              <p className="text-slate-500 text-[11px]">{selectedInvoice.terms}</p>
              <button
                onClick={() => window.print()}
                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2 rounded-xl flex items-center gap-2 shadow"
              >
                <Printer size={15} />
                <span>Print Tax Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CustomerDashboard() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-xs">
          Loading Customer Dashboard...
        </div>
      }
    >
      <CustomerDashboardContent />
    </Suspense>
  );
}

