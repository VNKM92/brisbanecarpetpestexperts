"use client";

import React, { useState, useEffect } from "react";
import {
  Receipt,
  PlusCircle,
  Search,
  Filter,
  Eye,
  Printer,
  DollarSign,
  FileText,
  User,
  Calendar,
  X,
  Trash2,
  Plus,
  Send,
  CheckCircle2,
  Building,
} from "lucide-react";

export default function AdminInvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({ totalCount: 0, totalRevenue: 0, totalPending: 0 });
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  // Create Invoice Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const [createForm, setCreateForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerAddress: "",
    discount: "0",
    dueDate: "",
    notes: "Payment due upon receipt. ABN: 45 892 103 441. Brisbane Carpet & Pest Experts.",
    items: [
      { description: "Professional Steam Carpet Cleaning (4 Rooms)", quantity: 1, unitPrice: 180 },
      { description: "Bond Pest Control Management (Internal & External)", quantity: 1, unitPrice: 150 },
    ],
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== "ALL") params.append("status", statusFilter);
      if (search) params.append("search", search);

      const res = await fetch(`/api/admin/invoices?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setInvoices(data.data?.invoices || []);
        setStats(data.data?.stats || {});
      }
    } catch (err) {
      console.error("Failed to fetch admin invoices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [statusFilter]);

  const handleAddItem = () => {
    setCreateForm({
      ...createForm,
      items: [...createForm.items, { description: "", quantity: 1, unitPrice: 0 }],
    });
  };

  const handleRemoveItem = (index: number) => {
    setCreateForm({
      ...createForm,
      items: createForm.items.filter((_, i) => i !== index),
    });
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const updated = [...createForm.items];
    (updated[index] as any)[field] = value;
    setCreateForm({ ...createForm, items: updated });
  };

  const calculateFormTotals = () => {
    const subtotal = createForm.items.reduce(
      (sum, it) => sum + Number(it.quantity || 1) * Number(it.unitPrice || 0),
      0
    );
    const disc = Number(createForm.discount || 0);
    const taxable = Math.max(0, subtotal - disc);
    const gst = taxable * 0.1;
    const total = taxable + gst;
    return { subtotal, gst, total };
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.customerName || !createForm.customerEmail || createForm.items.length === 0) {
      alert("Please enter customer name, email and at least 1 item");
      return;
    }

    try {
      const res = await fetch("/api/admin/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createForm),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert("Invoice created and emailed to customer!");
        setShowCreateModal(false);
        fetchData();
      } else {
        alert(data.message || "Failed to create invoice");
      }
    } catch (err) {
      alert("Error creating invoice");
    }
  };

  const formTotals = calculateFormTotals();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>Tax Invoices & Billing Management</span>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 font-semibold text-xs border border-purple-500/30">
              GST 10% Ready
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Generate Australian GST-compliant tax invoices, track payment status, and dispatch receipts to customers.
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-purple-950 transition-all self-start sm:self-auto"
        >
          <PlusCircle size={16} />
          <span>Generate Tax Invoice</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <span className="text-xs text-slate-400">Total Invoices</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white">{stats.totalCount || 0}</span>
            <Receipt size={18} className="text-purple-400/60" />
          </div>
          <span className="text-[10px] text-slate-500">Issued to clients</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <span className="text-xs text-slate-400">Paid Revenue</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-emerald-400">${Number(stats.totalRevenue || 0).toFixed(2)}</span>
            <CheckCircle2 size={18} className="text-emerald-400/60" />
          </div>
          <span className="text-[10px] text-slate-500">AUD received</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <span className="text-xs text-slate-400">Outstanding Balance</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-amber-400">${Number(stats.totalPending || 0).toFixed(2)}</span>
            <DollarSign size={18} className="text-amber-400/60" />
          </div>
          <span className="text-[10px] text-slate-500">Pending settlement</span>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            {["ALL", "PAID", "PARTIAL", "SENT", "UNPAID"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  statusFilter === st ? "bg-purple-600 text-white font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search invoice #, customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchData()}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Invoice Table */}
        {loading ? (
          <div className="py-12 text-center text-slate-400 text-xs">Loading tax invoices...</div>
        ) : invoices.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs">No invoices found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                  <th className="pb-3">Invoice Number</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Issued / Due</th>
                  <th className="pb-3">Total (Inc GST)</th>
                  <th className="pb-3">Paid / Balance</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-850/50">
                    <td className="py-3.5 font-mono font-bold text-purple-400">{inv.invoiceNumber}</td>
                    <td className="py-3.5">
                      <p className="font-bold text-white">{inv.customerName}</p>
                      <p className="text-[11px] text-slate-400">{inv.customerEmail}</p>
                    </td>
                    <td className="py-3.5 text-slate-300">
                      <p>Issued: {new Date(inv.issuedDate).toLocaleDateString("en-AU")}</p>
                      <p className="text-[11px] text-slate-500">
                        Due: {inv.dueDate ? new Date(inv.dueDate).toLocaleDateString("en-AU") : "Immediate"}
                      </p>
                    </td>
                    <td className="py-3.5 font-bold text-white text-sm">${inv.totalAmount.toFixed(2)} AUD</td>
                    <td className="py-3.5">
                      <span className="text-emerald-400 block font-semibold">Paid: ${inv.depositPaid.toFixed(2)}</span>
                      <span className="text-amber-400 block font-semibold">Due: ${inv.balanceDue.toFixed(2)}</span>
                    </td>
                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        inv.status === "PAID"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : inv.status === "PARTIAL"
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => {
                          setSelectedInvoice(inv);
                          setShowViewModal(true);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold flex items-center gap-1 ml-auto"
                      >
                        <Eye size={13} />
                        <span>Print Invoice</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ==================================================== */}
      {/* MODAL: CREATE CUSTOM INVOICE */}
      {/* ==================================================== */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 space-y-5 my-8 relative shadow-2xl">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div>
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Tax Invoicing</span>
              <h2 className="text-lg font-bold text-white mt-1">Generate Professional Tax Invoice (Australia)</h2>
              <p className="text-xs text-slate-400">Brisbane Carpet & Pest Experts • ABN: 45 892 103 441 • 10% GST Compliant</p>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              {/* Customer details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Customer Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={createForm.customerName}
                    onChange={(e) => setCreateForm({ ...createForm, customerName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Customer Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@domain.com.au"
                    value={createForm.customerEmail}
                    onChange={(e) => setCreateForm({ ...createForm, customerEmail: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Customer Phone</label>
                  <input
                    type="text"
                    placeholder="0434 000 000"
                    value={createForm.customerPhone}
                    onChange={(e) => setCreateForm({ ...createForm, customerPhone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Property Address</label>
                  <input
                    type="text"
                    placeholder="12 Queen St, Brisbane QLD 4000"
                    value={createForm.customerAddress}
                    onChange={(e) => setCreateForm({ ...createForm, customerAddress: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              {/* Line Items */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-slate-300 uppercase tracking-wider">Line Items</label>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-semibold"
                  >
                    <Plus size={14} /> Add Line Item
                  </button>
                </div>

                <div className="space-y-2">
                  {createForm.items.map((it, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      <input
                        type="text"
                        required
                        placeholder="Service Description"
                        value={it.description}
                        onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                        className="flex-1 px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                      />
                      <input
                        type="number"
                        min="1"
                        placeholder="Qty"
                        value={it.quantity}
                        onChange={(e) => handleItemChange(idx, "quantity", parseInt(e.target.value, 10) || 1)}
                        className="w-16 px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs text-center"
                      />
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Unit Price"
                        value={it.unitPrice}
                        onChange={(e) => handleItemChange(idx, "unitPrice", parseFloat(e.target.value) || 0)}
                        className="w-24 px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs text-right"
                      />
                      <span className="w-20 text-right font-bold text-white">
                        ${((it.quantity || 1) * (it.unitPrice || 0)).toFixed(2)}
                      </span>
                      {createForm.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(idx)}
                          className="p-1 text-slate-500 hover:text-red-400"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals Summary */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-end">
                <div className="w-64 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal (Ex GST):</span>
                    <span>${formTotals.subtotal.toFixed(2)} AUD</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>GST (10% Australia):</span>
                    <span>${formTotals.gst.toFixed(2)} AUD</span>
                  </div>
                  <div className="flex justify-between text-white font-bold text-base border-t border-slate-800 pt-1.5">
                    <span>Total Amount:</span>
                    <span className="text-purple-400">${formTotals.total.toFixed(2)} AUD</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-lg shadow-purple-950"
                >
                  <Send size={15} />
                  <span>Generate & Send Tax Invoice</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View/Print Modal */}
      {showViewModal && selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-2xl max-w-2xl w-full p-8 space-y-6 relative shadow-2xl my-8">
            <button
              onClick={() => setShowViewModal(false)}
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
                <p className="font-bold text-purple-700">Status: {selectedInvoice.status}</p>
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-y border-slate-200">
                  <th className="py-2 px-3 text-left">Description</th>
                  <th className="py-2 px-3 text-center">Qty</th>
                  <th className="py-2 px-3 text-right">Unit Price</th>
                  <th className="py-2 px-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {selectedInvoice.items?.map((it: any) => (
                  <tr key={it.id}>
                    <td className="py-2.5 px-3 text-slate-800">{it.description}</td>
                    <td className="py-2.5 px-3 text-center">{it.quantity}</td>
                    <td className="py-2.5 px-3 text-right">${it.unitPrice.toFixed(2)}</td>
                    <td className="py-2.5 px-3 text-right font-semibold">${it.totalPrice.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="border-t border-slate-200 pt-4 flex justify-end text-xs">
              <div className="w-64 space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span>${selectedInvoice.subtotal.toFixed(2)} AUD</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GST (10%):</span>
                  <span>${selectedInvoice.gstAmount.toFixed(2)} AUD</span>
                </div>
                <div className="flex justify-between text-slate-900 font-bold text-base border-t border-slate-200 pt-1.5">
                  <span>Total (Inc GST):</span>
                  <span>${selectedInvoice.totalAmount.toFixed(2)} AUD</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-xs">
              <span className="text-slate-500 text-[11px]">{selectedInvoice.terms}</span>
              <button
                onClick={() => window.print()}
                className="bg-slate-900 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1.5"
              >
                <Printer size={15} />
                <span>Print Official Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
