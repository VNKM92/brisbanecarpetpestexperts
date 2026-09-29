"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Inbox,
  CalendarCheck,
  ShoppingBag,
  DollarSign,
  Users2,
  Sparkles,
  BookOpen,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

interface DashboardData {
  stats: {
    enquiriesCount: number;
    newEnquiriesCount: number;
    bookingsCount: number;
    confirmedBookingsCount: number;
    ordersCount: number;
    totalRevenue: number;
    customersCount: number;
    servicesCount: number;
    blogsCount: number;
  };
  recentEnquiries: any[];
  recentBookings: any[];
  recentLogs: any[];
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/admin/dashboard");
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-slate-800 animate-pulse rounded"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-slate-800/60 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  const stats = data?.stats;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Executive Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time business performance, customer enquiries and scheduled jobs.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/bookings"
            className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow transition flex items-center gap-1.5"
          >
            <span>View Schedule</span>
            <CalendarCheck size={14} />
          </Link>
          <Link
            href="/admin/enquiries"
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-lg border border-slate-700 transition flex items-center gap-1.5"
          >
            <span>Manage Enquiries</span>
            <Inbox size={14} />
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Enquiries Card */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Enquiries
            </span>
            <div className="p-2.5 rounded-xl bg-orange-950/60 border border-orange-800/50 text-orange-400">
              <Inbox size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{stats?.enquiriesCount || 0}</span>
            {stats?.newEnquiriesCount ? (
              <span className="text-xs px-2 py-0.5 rounded-full bg-orange-900/60 text-orange-300 font-semibold border border-orange-700/50">
                {stats.newEnquiriesCount} New
              </span>
            ) : null}
          </div>
          <Link
            href="/admin/enquiries"
            className="mt-3 text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 font-medium"
          >
            <span>Review inbox</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>

        {/* Bookings Card */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Bookings
            </span>
            <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/50 text-emerald-400">
              <CalendarCheck size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{stats?.bookingsCount || 0}</span>
            <span className="text-xs text-slate-400">
              ({stats?.confirmedBookingsCount || 0} Confirmed)
            </span>
          </div>
          <Link
            href="/admin/bookings"
            className="mt-3 text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium"
          >
            <span>Manage bookings</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>

        {/* Total Revenue Card */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Collected Revenue
            </span>
            <div className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-800/50 text-blue-400">
              <DollarSign size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">
              ${stats?.totalRevenue?.toFixed(2) || "0.00"}
            </span>
            <span className="text-xs text-slate-400">AUD</span>
          </div>
          <Link
            href="/admin/orders"
            className="mt-3 text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
          >
            <span>View all orders</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>

        {/* Total Customers */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              CRM Customers
            </span>
            <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-800/50 text-purple-400">
              <Users2 size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{stats?.customersCount || 0}</span>
            <span className="text-xs text-purple-400">Active Contacts</span>
          </div>
          <Link
            href="/admin/customers"
            className="mt-3 text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-medium"
          >
            <span>Customer directory</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>

      {/* Catalog & Content Summary Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Sparkles size={16} />
          </div>
          <div>
            <p className="text-xs text-slate-400">Active Services</p>
            <p className="text-sm font-bold text-white">{stats?.servicesCount || 0}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
            <BookOpen size={16} />
          </div>
          <div>
            <p className="text-xs text-slate-400">Published Blogs</p>
            <p className="text-sm font-bold text-white">{stats?.blogsCount || 0}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
            <CheckCircle2 size={16} />
          </div>
          <div>
            <p className="text-xs text-slate-400">Database Engine</p>
            <p className="text-sm font-bold text-white">Prisma SQL</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
            <TrendingUp size={16} />
          </div>
          <div>
            <p className="text-xs text-slate-400">System Status</p>
            <p className="text-sm font-bold text-emerald-400">Healthy & Online</p>
          </div>
        </div>
      </div>

      {/* Two Column Section: Recent Enquiries & Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Enquiries Box */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Inbox size={18} className="text-orange-400" />
              <h2 className="text-base font-bold text-white">Recent Enquiries</h2>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight size={12} />
            </Link>
          </div>

          <div className="space-y-3">
            {data?.recentEnquiries && data.recentEnquiries.length > 0 ? (
              data.recentEnquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-between gap-3 hover:border-slate-700 transition"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      {enq.firstName} {enq.lastName}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {enq.service || "General Clean"} • {enq.phone}
                    </p>
                    {enq.message && (
                      <p className="text-xs text-slate-500 line-clamp-1 mt-1 italic">
                        "{enq.message}"
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        enq.status === "NEW"
                          ? "bg-orange-950 text-orange-400 border border-orange-800"
                          : enq.status === "CONTACTED"
                          ? "bg-blue-950 text-blue-400 border border-blue-800"
                          : "bg-emerald-950 text-emerald-400 border border-emerald-800"
                      }`}
                    >
                      {enq.status}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 text-center py-6">No enquiries recorded yet.</p>
            )}
          </div>
        </div>

        {/* Recent Bookings Box */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CalendarCheck size={18} className="text-emerald-400" />
              <h2 className="text-base font-bold text-white">Recent Service Bookings</h2>
            </div>
            <Link
              href="/admin/bookings"
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight size={12} />
            </Link>
          </div>

          <div className="space-y-3">
            {data?.recentBookings && data.recentBookings.length > 0 ? (
              data.recentBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-between gap-3 hover:border-slate-700 transition"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-emerald-400 font-bold">
                        {b.bookingNumber}
                      </span>
                      <span className="text-sm font-semibold text-white truncate">
                        {b.customerName}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {b.serviceName} • ${b.totalPrice?.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        b.status === "CONFIRMED"
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                          : b.status === "PENDING"
                          ? "bg-amber-950 text-amber-400 border border-amber-800"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {b.status}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {new Date(b.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 text-center py-6">No bookings recorded yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Activity Log Feed */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-teal-400" />
            <h2 className="text-base font-bold text-white">System Audit & Activity Trail</h2>
          </div>
          <Link
            href="/admin/activity-logs"
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
          >
            <span>Full Audit Log</span>
            <ArrowUpRight size={12} />
          </Link>
        </div>

        <div className="space-y-2.5">
          {data?.recentLogs && data.recentLogs.length > 0 ? (
            data.recentLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-slate-900/60 border border-slate-800/40"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-semibold text-slate-200">{log.userName}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-emerald-400 font-mono uppercase">{log.action}</span>
                  <span className="text-slate-400">{log.module}</span>
                </div>
                <span className="text-slate-500">
                  {new Date(log.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-500 py-2">No activity logged yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
