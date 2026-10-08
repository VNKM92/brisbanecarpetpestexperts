"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Inbox,
  Clock,
  ExternalLink,
  Volume2,
  VolumeX,
  RotateCw,
  MessageSquare,
  DollarSign,
  CalendarCheck,
  X,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { useAdminNotifications, AdminNotificationItem } from "@/context/AdminNotificationContext";

// Format relative time helper
function formatTimeAgo(dateString: string) {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 45) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString("en-AU", { month: "short", day: "numeric" });
  } catch (e) {
    return "";
  }
}

export default function NotificationCenter() {
  const router = useRouter();
  const {
    unreadTotal,
    unreadEnquiries,
    unreadQuotes,
    notifications,
    loading,
    soundEnabled,
    toggleSound,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification,
    clearAllRead,
    refreshNotifications,
    toastNotification,
    dismissToast,
  } = useAdminNotifications();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"ALL" | "UNREAD" | "ENQUIRIES" | "QUOTES">("ALL");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle manual refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshNotifications();
    setTimeout(() => setIsRefreshing(false), 400);
  };

  // Filter notifications list
  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "UNREAD") return !notif.isRead;
    if (activeTab === "ENQUIRIES") return notif.type === "ENQUIRY" || notif.type === "INFO";
    if (activeTab === "QUOTES") return notif.type === "QUOTE" || notif.type === "PAYMENT";
    return true;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "ENQUIRY":
      case "INFO":
        return (
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
            <Inbox size={16} />
          </div>
        );
      case "QUOTE":
        return (
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
            <Clock size={16} />
          </div>
        );
      case "PAYMENT":
        return (
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <DollarSign size={16} />
          </div>
        );
      case "REMINDER":
        return (
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0">
            <CalendarCheck size={16} />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center shrink-0">
            <Bell size={16} />
          </div>
        );
    }
  };

  const handleNotificationClick = async (notif: AdminNotificationItem) => {
    if (!notif.isRead) {
      await markNotificationRead(notif.id);
    }
    setIsOpen(false);
    if (notif.link) {
      router.push(notif.link);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Top Bell Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        title="Admin Notifications & Inbound Enquiries"
        className={`relative p-2.5 rounded-xl border transition-colors flex items-center justify-center cursor-pointer ${
          isOpen
            ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
            : "bg-slate-800/90 border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-700/90 shadow-sm"
        }`}
      >
        <Bell size={18} className={unreadTotal > 0 ? "text-amber-400" : ""} />

        {/* Real-time Badge Count */}
        {unreadTotal > 0 && (
          <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 rounded-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white font-extrabold text-[10px] flex items-center justify-center shadow-lg shadow-orange-950/80 ring-2 ring-slate-900 pointer-events-none">
            {unreadTotal > 99 ? "99+" : unreadTotal}
          </span>
        )}
      </button>

      {/* Gmail-Style Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2.5 w-[calc(100vw-2rem)] sm:w-[390px] md:w-[420px] max-w-[420px] bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col animate-dropdown ring-1 ring-white/10">
          {/* Header */}
          <div className="p-3.5 sm:p-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
                <Bell size={16} />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-tight flex items-center gap-2">
                  <span>Notification Center</span>
                  {unreadTotal > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-extrabold">
                      {unreadTotal} new
                    </span>
                  )}
                </h3>
                <p className="text-[10px] text-slate-400">Live incoming customer enquiries</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={toggleSound}
                title={soundEnabled ? "Mute alert chime" : "Enable alert chime"}
                className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
                  soundEnabled
                    ? "text-slate-400 hover:text-white hover:bg-slate-800"
                    : "text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20"
                }`}
              >
                {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
              </button>

              <button
                type="button"
                onClick={handleRefresh}
                title="Refresh notifications"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <RotateCw size={15} className={isRefreshing ? "animate-spin text-emerald-400" : ""} />
              </button>

              {unreadTotal > 0 && (
                <button
                  type="button"
                  onClick={markAllNotificationsRead}
                  title="Mark all as read"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 text-[11px] font-bold border border-emerald-500/30 transition cursor-pointer"
                >
                  <CheckCheck size={13} />
                  <span className="hidden sm:inline">Mark read</span>
                </button>
              )}
            </div>
          </div>

          {/* Filter Tabs (Gmail-Style) */}
          <div className="flex items-center px-3 py-2 bg-slate-950/40 border-b border-slate-800 gap-1.5 overflow-x-auto text-[11px] font-medium text-slate-400 custom-scrollbar">
            <button
              type="button"
              onClick={() => setActiveTab("ALL")}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "ALL"
                  ? "bg-emerald-500 text-slate-950 font-bold shadow-sm"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span>All</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === "ALL" ? "bg-slate-950/30 text-slate-950" : "bg-slate-700 text-slate-300"}`}>
                {notifications.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("UNREAD")}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "UNREAD"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span>Unread</span>
              {unreadTotal > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${activeTab === "UNREAD" ? "bg-slate-950/30 text-slate-950" : "bg-amber-500/20 text-amber-300"}`}>
                  {unreadTotal}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("ENQUIRIES")}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "ENQUIRIES"
                  ? "bg-orange-500 text-slate-950 font-bold shadow-sm"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Inbox size={12} />
              <span>Enquiries</span>
              {unreadEnquiries > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${activeTab === "ENQUIRIES" ? "bg-slate-950/30 text-slate-950" : "bg-orange-500/20 text-orange-300"}`}>
                  {unreadEnquiries}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("QUOTES")}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "QUOTES"
                  ? "bg-blue-500 text-slate-950 font-bold shadow-sm"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Clock size={12} />
              <span>Quotes</span>
              {unreadQuotes > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${activeTab === "QUOTES" ? "bg-slate-950/30 text-slate-950" : "bg-blue-500/20 text-blue-300"}`}>
                  {unreadQuotes}
                </span>
              )}
            </button>
          </div>

          {/* Notifications Feed */}
          <div className="max-h-[360px] overflow-y-auto divide-y divide-slate-800/80 custom-scrollbar">
            {loading && notifications.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-slate-500 gap-2">
                <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs">Checking alerts...</span>
              </div>
            ) : filteredNotifications.length === 0 ? (
              <div className="py-12 px-6 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400 mb-3 shadow-inner">
                  <Sparkles size={20} className="text-emerald-400" />
                </div>
                <p className="text-xs font-bold text-slate-200">All caught up!</p>
                <p className="text-[11px] text-slate-500 mt-1 max-w-[220px]">
                  {activeTab === "UNREAD"
                    ? "No unread notifications at this time."
                    : "No notifications found in this category."}
                </p>
              </div>
            ) : (
              filteredNotifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNotificationClick(item)}
                  className={`group relative p-3 sm:p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                    !item.isRead
                      ? "bg-slate-800/50 hover:bg-slate-800/80 border-l-4 border-l-amber-400"
                      : "hover:bg-slate-800/40 opacity-80 hover:opacity-100 border-l-4 border-l-transparent"
                  }`}
                >
                  {/* Icon Avatar */}
                  <div>{getNotificationIcon(item.type)}</div>

                  {/* Body Content */}
                  <div className="flex-1 min-w-0 pr-1">
                    <div className="flex items-center justify-between gap-1">
                      <p
                        className={`text-xs truncate ${
                          !item.isRead ? "font-bold text-white" : "font-semibold text-slate-300"
                        }`}
                      >
                        {item.title}
                      </p>
                      <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                        {formatTimeAgo(item.createdAt)}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                      {item.message}
                    </p>

                    {/* Footer tags / actions */}
                    <div className="mt-1.5 flex items-center gap-2">
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${
                          item.type === "ENQUIRY" || item.type === "INFO"
                            ? "bg-orange-950/80 text-orange-400 border-orange-800/60"
                            : item.type === "QUOTE"
                            ? "bg-blue-950/80 text-blue-400 border-blue-800/60"
                            : item.type === "PAYMENT"
                            ? "bg-emerald-950/80 text-emerald-400 border-emerald-800/60"
                            : "bg-slate-800 text-slate-400 border-slate-700"
                        }`}
                      >
                        {item.type}
                      </span>

                      {item.link && (
                        <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>View detail</span>
                          <ChevronRight size={11} />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Hover Quick Action Buttons */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 pt-0.5">
                    {!item.isRead && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          markNotificationRead(item.id);
                        }}
                        title="Mark as read"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-700/80 transition cursor-pointer"
                      >
                        <Check size={13} />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(item.id);
                      }}
                      title="Delete notification"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-700/80 transition cursor-pointer"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-3 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs">
            <Link
              href="/admin/enquiries"
              onClick={() => setIsOpen(false)}
              className="font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition text-[11px]"
            >
              <Inbox size={13} />
              <span>Go to Enquiries Console</span>
              <ExternalLink size={11} />
            </Link>

            {notifications.some((n) => n.isRead) && (
              <button
                type="button"
                onClick={clearAllRead}
                className="text-[10px] text-slate-400 hover:text-red-300 transition cursor-pointer"
              >
                Clear read items
              </button>
            )}
          </div>
        </div>
      )}

      {/* Real-time Enterprise Popup Toast Alert for Incoming Enquiries */}
      {toastNotification && (
        <div className="fixed bottom-5 right-5 z-[99999] w-[calc(100vw-2.5rem)] sm:w-96 max-w-sm bg-slate-900/95 backdrop-blur-xl border-2 border-emerald-500/60 rounded-2xl p-4 shadow-2xl shadow-emerald-950/80 animate-toast">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-900/50">
              <Inbox size={20} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                  New Inbound Inquiry
                </span>
                <button
                  type="button"
                  onClick={dismissToast}
                  className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>

              <h4 className="text-xs font-bold text-white truncate mt-0.5">
                {toastNotification.title}
              </h4>
              <p className="text-[11px] text-slate-300 line-clamp-2 mt-1">
                {toastNotification.message}
              </p>

              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    dismissToast();
                    if (toastNotification.link) {
                      markNotificationRead(toastNotification.id);
                      router.push(toastNotification.link);
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-[11px] shadow-sm transition cursor-pointer"
                >
                  View Enquiry
                </button>
                <button
                  type="button"
                  onClick={dismissToast}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
