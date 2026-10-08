"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { playNotificationSound } from "@/lib/notification-sound";

export interface AdminNotificationItem {
  id: string;
  title: string;
  message: string;
  type: string; // 'ENQUIRY' | 'QUOTE' | 'PAYMENT' | 'REMINDER' | 'INFO' | 'WARNING'
  link?: string | null;
  isRead: boolean;
  readAt?: string | null;
  createdAt: string;
}

export interface LatestEnquiryItem {
  id: string;
  enquiryNumber?: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service?: string | null;
  message?: string | null;
  status: string;
  isRead: boolean;
  createdAt: string;
}

interface AdminNotificationContextType {
  unreadTotal: number;
  unreadEnquiries: number;
  unreadQuotes: number;
  notifications: AdminNotificationItem[];
  latestEnquiries: LatestEnquiryItem[];
  loading: boolean;
  soundEnabled: boolean;
  toggleSound: () => void;
  markNotificationRead: (id: string) => Promise<void>;
  markEnquiryRead: (id: string) => Promise<void>;
  markAllNotificationsRead: () => Promise<void>;
  markAllEnquiriesRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  clearAllRead: () => Promise<void>;
  refreshNotifications: () => Promise<void>;
  toastNotification: AdminNotificationItem | null;
  dismissToast: () => void;
}

const AdminNotificationContext = createContext<AdminNotificationContextType | undefined>(undefined);

export function AdminNotificationProvider({ children }: { children: React.ReactNode }) {
  const [unreadTotal, setUnreadTotal] = useState<number>(0);
  const [unreadEnquiries, setUnreadEnquiries] = useState<number>(0);
  const [unreadQuotes, setUnreadQuotes] = useState<number>(0);
  const [notifications, setNotifications] = useState<AdminNotificationItem[]>([]);
  const [latestEnquiries, setLatestEnquiries] = useState<LatestEnquiryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [toastNotification, setToastNotification] = useState<AdminNotificationItem | null>(null);

  const prevUnreadCountRef = useRef<number>(0);
  const isInitialFetchRef = useRef<boolean>(true);

  // Load sound preferences from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSound = localStorage.getItem("admin_notification_sound");
      if (storedSound !== null) {
        setSoundEnabled(storedSound === "true");
      }
    }
  }, []);

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("admin_notification_sound", String(next));
      }
      return next;
    });
  };

  const fetchNotifications = useCallback(async (isPolling = false) => {
    try {
      const res = await fetch("/api/admin/notifications?limit=25");
      if (!res.ok) return;

      const json = await res.json();
      if (json.success && json.data) {
        const {
          notifications: fetchedNotifs = [],
          unreadTotal: fetchedUnreadTotal = 0,
          unreadEnquiries: fetchedUnreadEnquiries = 0,
          unreadQuotes: fetchedUnreadQuotes = 0,
          latestEnquiries: fetchedLatestEnquiries = [],
        } = json.data;

        // Check if new notifications arrived to trigger chime and toast alert
        if (!isInitialFetchRef.current && isPolling) {
          if (fetchedUnreadTotal > prevUnreadCountRef.current) {
            // Play notification sound
            if (soundEnabled) {
              playNotificationSound();
            }

            // Find newest unread notification for popup toast
            const newest = fetchedNotifs.find((n: AdminNotificationItem) => !n.isRead);
            if (newest) {
              setToastNotification(newest);
            }
          }
        }

        prevUnreadCountRef.current = fetchedUnreadTotal;
        isInitialFetchRef.current = false;

        setNotifications(fetchedNotifs);
        setUnreadTotal(fetchedUnreadTotal);
        setUnreadEnquiries(fetchedUnreadEnquiries);
        setUnreadQuotes(fetchedUnreadQuotes);
        setLatestEnquiries(fetchedLatestEnquiries);
      }
    } catch (error) {
      console.error("Failed to load admin notifications:", error);
    } finally {
      setLoading(false);
    }
  }, [soundEnabled]);

  // Initial load and polling interval
  useEffect(() => {
    fetchNotifications(false);

    // Poll every 6 seconds for instantaneous real-time updates
    const interval = setInterval(() => {
      fetchNotifications(true);
    }, 6000);

    // Cross-tab / In-app event listener for immediate sync
    const handleSyncEvent = () => {
      fetchNotifications(false);
    };

    window.addEventListener("ADMIN_NOTIFICATION_UPDATE", handleSyncEvent);

    return () => {
      clearInterval(interval);
      window.removeEventListener("ADMIN_NOTIFICATION_UPDATE", handleSyncEvent);
    };
  }, [fetchNotifications]);

  // Mark single notification as read
  const markNotificationRead = async (id: string) => {
    // Optimistic UI update
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isRead: true } : item))
    );
    setUnreadTotal((prev) => Math.max(0, prev - 1));

    try {
      await fetch("/api/admin/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationId: id, isRead: true }),
      });
      fetchNotifications(false);
    } catch (e) {
      console.error(e);
    }
  };

  // Mark enquiry as read (decrements sidebar "Enquiries" count + bell badge)
  const markEnquiryRead = async (enquiryId: string) => {
    // Optimistic update
    setLatestEnquiries((prev) =>
      prev.map((e) => (e.id === enquiryId ? { ...e, isRead: true } : e))
    );
    setUnreadEnquiries((prev) => Math.max(0, prev - 1));
    setUnreadTotal((prev) => Math.max(0, prev - 1));

    try {
      await fetch("/api/admin/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enquiryId }),
      });
      fetchNotifications(false);
    } catch (e) {
      console.error(e);
    }
  };

  // Mark all notifications as read
  const markAllNotificationsRead = async () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
    setUnreadTotal(0);

    try {
      await fetch("/api/admin/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markAllRead: true }),
      });
      fetchNotifications(false);
    } catch (e) {
      console.error(e);
    }
  };

  // Mark all enquiries as read
  const markAllEnquiriesRead = async () => {
    setLatestEnquiries((prev) => prev.map((item) => ({ ...item, isRead: true })));
    setUnreadEnquiries(0);

    try {
      await fetch("/api/admin/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markAllEnquiriesRead: true }),
      });
      fetchNotifications(false);
    } catch (e) {
      console.error(e);
    }
  };

  // Delete single notification
  const deleteNotification = async (id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
    try {
      await fetch(`/api/admin/notifications?id=${id}`, {
        method: "DELETE",
      });
      fetchNotifications(false);
    } catch (e) {
      console.error(e);
    }
  };

  // Clear all read notifications
  const clearAllRead = async () => {
    setNotifications((prev) => prev.filter((item) => !item.isRead));
    try {
      await fetch("/api/admin/notifications?clearRead=true", {
        method: "DELETE",
      });
      fetchNotifications(false);
    } catch (e) {
      console.error(e);
    }
  };

  const dismissToast = () => {
    setToastNotification(null);
  };

  return (
    <AdminNotificationContext.Provider
      value={{
        unreadTotal,
        unreadEnquiries,
        unreadQuotes,
        notifications,
        latestEnquiries,
        loading,
        soundEnabled,
        toggleSound,
        markNotificationRead,
        markEnquiryRead,
        markAllNotificationsRead,
        markAllEnquiriesRead,
        deleteNotification,
        clearAllRead,
        refreshNotifications: () => fetchNotifications(false),
        toastNotification,
        dismissToast,
      }}
    >
      {children}
    </AdminNotificationContext.Provider>
  );
}

export function useAdminNotifications() {
  const context = useContext(AdminNotificationContext);
  if (!context) {
    throw new Error("useAdminNotifications must be used within an AdminNotificationProvider");
  }
  return context;
}
