"use client";

import React, { useState, useEffect } from "react";
import {
  History,
  Search,
  Filter,
  User,
  Clock,
  Terminal,
  X,
  Eye,
  ShieldAlert,
  Globe,
} from "lucide-react";

export default function AdminActivityLogsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("");
  const [selectedLog, setSelectedLog] = useState<any | null>(null);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const url = new URL("/api/admin/activity-logs", window.location.origin);
      if (search) url.searchParams.set("search", search);
      if (moduleFilter) url.searchParams.set("module", moduleFilter);

      const res = await fetch(url.toString());
      const json = await res.json();
      if (json.success) {
        setItems(json.data.items);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [moduleFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLogs();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <History className="text-emerald-400" size={24} />
            <span>System Audit Trails & Activity Logs</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Complete security audit records of all user actions, logins, status changes and modifications.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <form onSubmit={handleSearch} className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-2.5 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Search action, user, module..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </form>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Filter size={14} /> Module:
          </span>
          <select
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="">All Modules</option>
            <option value="Auth">Auth</option>
            <option value="Bookings">Bookings</option>
            <option value="Enquiries">Enquiries</option>
            <option value="Services">Services</option>
            <option value="Pages">Pages</option>
            <option value="Blogs">Blogs</option>
            <option value="Settings">Settings</option>
            <option value="Users">Users</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Operator</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">Module</th>
                <th className="py-3.5 px-4">Details / Context</th>
                <th className="py-3.5 px-4">IP Address</th>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-500">
                    Loading audit trail...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-500">
                    No activity logs recorded.
                  </td>
                </tr>
              ) : (
                items.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-900/60 transition cursor-pointer" onClick={() => setSelectedLog(log)}>
                    <td className="py-3 px-4 font-semibold text-white">
                      {log.userName || "System"}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] uppercase ${
                          log.action === "CREATE"
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                            : log.action === "UPDATE"
                            ? "bg-blue-950 text-blue-400 border border-blue-800"
                            : log.action === "DELETE"
                            ? "bg-red-950 text-red-400 border border-red-800"
                            : log.action === "LOGIN" || log.action === "LOGOUT"
                            ? "bg-indigo-950 text-indigo-400 border border-indigo-800"
                            : "bg-purple-950 text-purple-400 border border-purple-800"
                        }`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-300 font-medium">{log.module}</td>
                    <td className="py-3 px-4 text-slate-400 font-mono text-[11px] max-w-xs truncate">
                      {log.details || "—"}
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                      {log.ipAddress || "127.0.0.1"}
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px] whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLog(log);
                        }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                      >
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <ShieldAlert className="text-emerald-400" size={20} />
                <span>Audit Log Details</span>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 uppercase tracking-wider text-[10px]">Operator</span>
                <p className="text-white font-semibold text-sm mt-0.5">{selectedLog.userName || "System"}</p>
                <p className="text-slate-500 text-[10px]">ID: {selectedLog.userId || "N/A"}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 uppercase tracking-wider text-[10px]">Action & Module</span>
                <p className="text-emerald-400 font-bold text-sm mt-0.5">{selectedLog.action}</p>
                <p className="text-slate-300 text-xs">Module: {selectedLog.module}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 uppercase tracking-wider text-[10px]">IP Address & Client</span>
                <p className="text-slate-200 font-mono text-xs mt-0.5">{selectedLog.ipAddress || "127.0.0.1"}</p>
                <p className="text-slate-500 text-[10px] truncate">{selectedLog.userAgent || "Browser Client"}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 uppercase tracking-wider text-[10px]">Timestamp</span>
                <p className="text-slate-200 text-xs mt-0.5">{new Date(selectedLog.createdAt).toLocaleString()}</p>
                <p className="text-slate-500 text-[10px]">Record: {selectedLog.entityId || "N/A"}</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-slate-400">Payload / Context Details:</span>
              <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono overflow-x-auto max-h-60">
                {(() => {
                  try {
                    return JSON.stringify(JSON.parse(selectedLog.details), null, 2);
                  } catch (e) {
                    return selectedLog.details || "No payload context.";
                  }
                })()}
              </pre>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
