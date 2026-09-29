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
  Bell,
} from "lucide-react";

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
  { group: "Operations", items: [
    { name: "Enquiries", href: "/admin/enquiries", icon: Inbox },
    { name: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Customers", href: "/admin/customers", icon: Users2 },
  ]},
  { group: "Content & Catalog", items: [
    { name: "Services", href: "/admin/services", icon: Sparkles },
    { name: "CMS Pages", href: "/admin/pages", icon: FileText },
    { name: "Blog Posts", href: "/admin/blogs", icon: BookOpen },
    { name: "FAQs", href: "/admin/faqs", icon: HelpCircle },
    { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
    { name: "Media Library", href: "/admin/media", icon: ImageIcon },
  ]},
  { group: "Communications", items: [
    { name: "Email Logs", href: "/admin/emails", icon: Mail },
    { name: "WhatsApp", href: "/admin/whatsapp", icon: PhoneCall },
  ]},
  { group: "Administration", items: [
    { name: "Users", href: "/admin/users", icon: UserCheck },
    { name: "Roles & RBAC", href: "/admin/roles", icon: ShieldCheck },
    { name: "Activity Logs", href: "/admin/activity-logs", icon: History },
    { name: "Site Settings", href: "/admin/settings", icon: Settings },
  ]},
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

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
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 text-sm">Authenticating Brisbane Admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 w-64 bg-slate-950 border-r border-slate-800 flex flex-col z-50 transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo / Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-800 bg-slate-950">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center font-bold text-white shadow-md">
              B
            </div>
            <div>
              <span className="font-bold text-white text-base tracking-tight">Brisbane</span>
              <span className="text-xs ml-1.5 px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-mono">
                Admin
              </span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 custom-scrollbar">
          {NAV_ITEMS.map((section, idx) => (
            <div key={idx}>
              <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                {section.group}
              </p>
              <nav className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-emerald-500 text-white shadow-sm"
                          : "text-slate-300 hover:bg-slate-900 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} className={isActive ? "text-white" : "text-slate-400"} />
                        <span>{item.name}</span>
                      </div>
                      {isActive && <ChevronRight size={14} className="opacity-75" />}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Sidebar Footer User Info */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60">
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs uppercase flex-shrink-0">
                {currentUser?.name?.charAt(0) || "A"}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">{currentUser?.name}</p>
                <p className="text-[10px] text-emerald-400 truncate">{currentUser?.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="text-slate-400 hover:text-red-400 p-1.5 rounded hover:bg-slate-800 transition"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-400 hover:text-white p-2 rounded-md hover:bg-slate-900"
            >
              <Menu size={20} />
            </button>
            <div className="hidden sm:flex items-center text-xs text-slate-400 gap-2">
              <span>Admin Console</span>
              <span>/</span>
              <span className="text-emerald-400 font-medium capitalize">
                {pathname.replace("/admin/", "").replace("/admin", "Overview") || "Dashboard"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/60 px-3 py-1.5 rounded-lg transition"
            >
              <span>View Live Website</span>
              <ExternalLink size={13} />
            </Link>

            <Link
              href="/admin/enquiries"
              className="relative text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-900 transition"
              title="Recent Enquiries"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full"></span>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-900">
          {children}
        </main>
      </div>
    </div>
  );
}
