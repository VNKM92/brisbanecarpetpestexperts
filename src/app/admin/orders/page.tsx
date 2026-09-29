"use client";

import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Search,
  Filter,
  DollarSign,
  CheckCircle,
  Clock,
  Eye,
  X,
  CreditCard,
  FileText,
} from "lucide-react";

export default function AdminOrdersPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const url = new URL("/api/admin/orders", window.location.origin);
      if (search) url.searchParams.set("search", search);
      if (paymentStatusFilter) url.searchParams.set("paymentStatus", paymentStatusFilter);

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
    fetchOrders();
  }, [paymentStatusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders();
  };

  const handlePaymentStatusChange = async (id: string, newStatus: string) => {
    try {
      await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, paymentStatus: newStatus }),
      });
      fetchOrders();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <ShoppingBag className="text-blue-400" size={24} />
            <span>Orders & Billing Invoices</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Financial transactions, tax calculations, invoice logs and payment statuses.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <form onSubmit={handleSearch} className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-2.5 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Search order #, customer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </form>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Filter size={14} /> Payment:
          </span>
          <select
            value={paymentStatusFilter}
            onChange={(e) => setPaymentStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="">All Orders</option>
            <option value="PAID">Paid</option>
            <option value="UNPAID">Unpaid</option>
            <option value="PARTIAL">Partial</option>
            <option value="REFUNDED">Refunded</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Order #</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Tax / GST</th>
                <th className="py-3.5 px-4">Payment Method</th>
                <th className="py-3.5 px-4">Payment Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-slate-500">
                    Loading orders...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-slate-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                items.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-900/60 transition">
                    <td className="py-3 px-4 font-mono font-bold text-blue-400">
                      {o.orderNumber}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-white">
                        {o.customer?.name || "Guest Customer"}
                      </p>
                      <p className="text-[11px] text-slate-400">{o.customer?.email}</p>
                    </td>
                    <td className="py-3 px-4 font-bold text-white text-sm">
                      ${o.totalAmount?.toFixed(2)} AUD
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      ${o.tax?.toFixed(2) || "0.00"}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                        {o.paymentMethod || "INVOICE"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={o.paymentStatus}
                        onChange={(e) => handlePaymentStatusChange(o.id, e.target.value)}
                        className={`text-[11px] font-bold px-2 py-1 rounded-md border focus:outline-none cursor-pointer ${
                          o.paymentStatus === "PAID"
                            ? "bg-emerald-950/80 text-emerald-400 border-emerald-800"
                            : o.paymentStatus === "UNPAID"
                            ? "bg-red-950/80 text-red-400 border-red-800"
                            : o.paymentStatus === "PARTIAL"
                            ? "bg-amber-950/80 text-amber-400 border-amber-800"
                            : "bg-slate-800 text-slate-400 border-slate-700"
                        }`}
                      >
                        <option value="UNPAID">UNPAID</option>
                        <option value="PAID">PAID</option>
                        <option value="PARTIAL">PARTIAL</option>
                        <option value="REFUNDED">REFUNDED</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px]">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(o)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                        title="View Invoice"
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

      {/* Invoice Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="text-blue-400" size={18} />
                <span className="font-mono text-sm font-bold text-white">
                  Invoice {selectedOrder.orderNumber}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Billed To:</span>
                <span className="font-semibold text-white">{selectedOrder.customer?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Email:</span>
                <span className="text-slate-200">{selectedOrder.customer?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Subtotal:</span>
                <span className="text-slate-200">${selectedOrder.subtotal?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">GST (10%):</span>
                <span className="text-slate-200">${selectedOrder.tax?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800 text-sm font-bold">
                <span className="text-white">Total Amount:</span>
                <span className="text-emerald-400">${selectedOrder.totalAmount?.toFixed(2)} AUD</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition"
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
