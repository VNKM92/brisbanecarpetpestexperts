"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  CalendarCheck,
  ShoppingBag,
  Users2,
  Sparkles,
  FileText,
  BookOpen,
  HelpCircle,
  MessageSquareQuote,
  Image as ImageIcon,
  Mail,
  PhoneCall,
  UserCheck,
  ShieldCheck,
  History,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Clock,
  Briefcase,
  Receipt,
  UserCog,
  Users,
  CreditCard,
  BarChart3,
} from "lucide-react";
import { AdminNotificationProvider, useAdminNotifications } from "@/context/AdminNotificationContext";
import NotificationCenter from "./components/NotificationCenter";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  roleSlug: string;
}

const NAV_ITEMS = [
  { group: "Overview", items: [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  ]},
  { group: "Demand & Work Orders", items: [
    { name: "Quotations & Approvals", href: "/admin/quotations", icon: Clock, badgeKey: "quotes" },
    { name: "Crew & Work Assignments", href: "/admin/assignments", icon: Users },
    { name: "Technician & Customer Reports", href: "/admin/reports", icon: BarChart3 },
    { name: "Bookings Calendar", href: "/admin/bookings", icon: CalendarCheck },
    { name: "Invoices & Billing", href: "/admin/invoices", icon: Receipt },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Enquiries", href: "/admin/enquiries", icon: Inbox, badgeKey: "enquiries" },
    { name: "Customers", href: "/admin/customers", icon: Users2 },
  ]},
  { group: "Human Resources (HRM)", items: [
    { name: "HRM & Field Staff", href: "/admin/hrm", icon: UserCog },
  ]},
  { group: "Payment Gateways", items: [
    { name: "Payment Gateways & Keys", href: "/admin/payment-settings", icon: CreditCard },
  ]},
  { group: "Content & Catalog", items: [
    { name: "Homepage CMS", href: "/admin/homepage", icon: Sparkles },
    { name: "Services", href: "/admin/services", icon: Sparkles },
    { name: "CMS Pages", href: "/admin/pages", icon: FileText },
    { name: "Blog Posts", href: "/admin/blogs", icon: BookOpen },
    { name: "FAQs", href: "/admin/faqs", icon: HelpCircle },
    { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
    { name: "Media Library", href: "/admin/media", icon: ImageIcon },
  ]},
  { group: "Communications", items: [
    { name: "Email Logs", href: "/admin/emails", icon: Mail },
    { name: "WhatsApp & SMS", href: "/admin/whatsapp", icon: PhoneCall },
  ]},
  { group: "Administration", items: [
    { name: "Users", href: "/admin/users", icon: UserCheck },
    { name: "Roles & RBAC", href: "/admin/roles", icon: ShieldCheck },
    { name: "Activity Logs", href: "/admin/activity-logs", icon: History },
    { name: "Site Settings", href: "/admin/settings", icon: Settings },
  ]},
];

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Real-time unread counts from context
  const { unreadTotal, unreadEnquiries, unreadQuotes } = useAdminNotifications();

  // If on login page, render without sidebar shell
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.push(`/login?returnUrl=${encodeURIComponent(pathname)}`);
          return;
        }
        const data = await res.json();
        if (data.success && data.data?.user) {
          setCurrentUser(data.data.user);
        } else {
          router.push(`/login?returnUrl=${encodeURIComponent(pathname)}`);
        }
      } catch (err) {
        router.push(`/login?returnUrl=${encodeURIComponent(pathname)}`);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [pathname, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      console.error(e);
    }
    router.push("/login");
  };

  if (isLoginPage) {
    return <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">{children}</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-xs tracking-wider uppercase font-medium">
            Verifying Admin Credentials...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans selection:bg-emerald-500 selection:text-white">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800 bg-slate-900/50">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-950">
              <ShieldCheck size={20} />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white block">
                Brisbane Carpet
              </span>
              <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold block">
                Super Admin Panel
              </span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 custom-scrollbar">
          {NAV_ITEMS.map((group) => (
            <div key={group.group} className="space-y-1">
              <div className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {group.group}
              </div>
              <div className="space-y-0.5 pt-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                  const Icon = item.icon;

                  // Determine dynamic badge count for navigation item
                  let badgeCount = 0;
                  if (item.badgeKey === "enquiries") badgeCount = unreadEnquiries;
                  if (item.badgeKey === "quotes") badgeCount = unreadQuotes;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                        isActive
                          ? "bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20 shadow-sm"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <Icon size={16} className={`shrink-0 ${isActive ? "text-emerald-400" : "text-slate-400 group-hover:text-slate-200"}`} />
                        <span className="truncate">{item.name}</span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        {/* Dynamic Count Badge */}
                        {badgeCount > 0 && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold shadow-sm transition-all duration-300 ${
                              item.badgeKey === "enquiries"
                                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-orange-950/60"
                                : "bg-blue-600/30 text-blue-300 border border-blue-500/40"
                            }`}
                          >
                            {badgeCount > 99 ? "99+" : badgeCount}
                          </span>
                        )}

                        {isActive && (
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User Card / Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <div className="w-8 h-8 rounded-full bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
              {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate leading-tight">
                {currentUser?.name || "Administrator"}
              </p>
              <p className="text-[10px] text-emerald-400 truncate">
                {currentUser?.role || "Super Admin"}
              </p>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-700/50 transition-colors"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Top Navbar */}
        <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Burger Button with Badge */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden transition"
              title="Open Navigation Menu"
            >
              <Menu size={20} />
              {unreadEnquiries > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-[9px] flex items-center justify-center shadow-md animate-pulse">
                  {unreadEnquiries > 99 ? "99+" : unreadEnquiries}
                </span>
              )}
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
              <span>Admin Console</span>
              <ChevronRight size={14} />
              <span className="text-slate-200 capitalize font-medium">
                {pathname.split("/")[2] || "Dashboard"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Enterprise Gmail-Style Notification Bell Center */}
            <NotificationCenter />

            <Link
              href="/"
              target="_blank"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
            >
              <ExternalLink size={13} />
              <span>Live Website</span>
            </Link>

            <Link
              href="/dashboard"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-medium border border-blue-500/30 transition-colors"
            >
              <span>Customer Portal</span>
            </Link>

            <Link
              href="/employee"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs font-medium border border-emerald-500/30 transition-colors"
            >
              <span>Field Tech</span>
            </Link>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminNotificationProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminNotificationProvider>
  );
}
