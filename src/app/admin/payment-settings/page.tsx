"use client";

import React, { useState, useEffect } from "react";
import {
  CreditCard,
  DollarSign,
  ShieldCheck,
  Building,
  KeyRound,
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  Zap,
  Globe,
  Settings,
  HelpCircle,
  RefreshCw,
} from "lucide-react";

export default function AdminPaymentSettingsPage() {
  const [activeTab, setActiveTab] = useState<"stripe" | "paypal" | "payid" | "poli" | "afterpay" | "bank" | "deposit">("stripe");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSecrets, setShowSecrets] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [settings, setSettings] = useState<Record<string, string>>({
    stripe_enabled: "true",
    stripe_mode: "test",
    stripe_publishable_key: "",
    stripe_secret_key: "",
    stripe_webhook_secret: "",
    stripe_currency: "AUD",

    paypal_enabled: "true",
    paypal_mode: "sandbox",
    paypal_client_id: "",
    paypal_secret: "",

    payid_enabled: "true",
    payid_type: "Email",
    payid_identifier: "info@brisbanecarpetpestexperts.com.au",
    payid_account_name: "Brisbane Carpet & Pest Experts Pty Ltd",
    payid_bsb: "084-004",
    payid_account_number: "12-345-6789",
    payid_instructions: "Pay instantly from any Australian bank app using Osko / PayID with zero processing fees.",

    poli_enabled: "true",
    poli_merchant_code: "",
    poli_auth_code: "",

    afterpay_enabled: "true",
    afterpay_merchant_id: "",
    afterpay_secret_key: "",

    bank_transfer_enabled: "true",
    bank_name: "National Australia Bank (NAB) / Commonwealth Bank",
    bank_account_name: "Brisbane Carpet & Pest Experts",
    bank_bsb: "084-004",
    bank_account_number: "987654321",
    bank_instructions: "Please include your Booking Reference (e.g. BK-XXXX) in the payment description.",

    deposit_amount_default: "50.00",
    deposit_currency: "AUD",
    deposit_refundable: "true",
    deposit_auto_confirm: "true",
    deposit_policy_note: "Standard refundable $50 AUD deposit to lock in certified specialist arrival date and time slot.",
  });

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/payment-settings");
      if (res.ok) {
        const data = await res.json();
        if (data.data) {
          setSettings((prev) => ({ ...prev, ...data.data }));
        }
      }
    } catch (err) {
      console.error("Failed to load payment settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/payment-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg("Payment gateway keys and configurations saved successfully!");
        setTimeout(() => setSuccessMsg(""), 3500);
      } else {
        setErrorMsg(data.message || "Failed to save settings");
      }
    } catch (err) {
      setErrorMsg("Network error saving settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-slate-400 text-xs">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        Loading Payment Gateway Configuration...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <CreditCard className="text-emerald-400" />
            <span>Payment Gateway & Key Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure Australian and International payment gateways (Stripe, PayPal, PayID, POLi, Bank EFT) and $50 AUD deposit rules.
          </p>
        </div>
        <button
          onClick={() => setShowSecrets(!showSecrets)}
          className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          {showSecrets ? <EyeOff size={14} /> : <Eye size={14} />}
          <span>{showSecrets ? "Hide Secret Keys" : "Reveal Secret Keys"}</span>
        </button>
      </div>

      {/* Alerts */}
      {successMsg && (
        <div className="p-3.5 bg-emerald-950/60 border border-emerald-800/80 rounded-xl text-emerald-200 text-xs flex items-start gap-2.5">
          <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
          <span>{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="p-3.5 bg-red-950/60 border border-red-800/80 rounded-xl text-red-200 text-xs flex items-start gap-2.5">
          <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Gateway Tabs */}
      <div className="flex flex-wrap gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab("stripe")}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "stripe" ? "bg-blue-600 text-white font-bold shadow-md" : "text-slate-400 hover:text-white"
          }`}
        >
          <CreditCard size={15} />
          <span>Stripe (Card / Apple Pay / GPay)</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("paypal")}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "paypal" ? "bg-yellow-600 text-white font-bold shadow-md" : "text-slate-400 hover:text-white"
          }`}
        >
          <DollarSign size={15} />
          <span>PayPal Australia</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("payid")}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "payid" ? "bg-emerald-600 text-white font-bold shadow-md" : "text-slate-400 hover:text-white"
          }`}
        >
          <Building size={15} />
          <span>PayID & Osko (Instant)</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("poli")}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "poli" ? "bg-purple-600 text-white font-bold shadow-md" : "text-slate-400 hover:text-white"
          }`}
        >
          <Zap size={15} />
          <span>POLi Payments</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("bank")}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "bank" ? "bg-slate-800 text-white font-bold shadow-md" : "text-slate-400 hover:text-white"
          }`}
        >
          <Building size={15} />
          <span>Direct Bank EFT</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("deposit")}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "deposit" ? "bg-amber-600 text-white font-bold shadow-md" : "text-slate-400 hover:text-white"
          }`}
        >
          <Sparkles size={15} />
          <span>$50 AUD Deposit Rules</span>
        </button>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 text-xs">
        {/* ==================================================== */}
        {/* STRIPE SETTINGS */}
        {/* ==================================================== */}
        {activeTab === "stripe" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Stripe Gateway (Australia & Global)</h3>
                <p className="text-slate-400 text-xs">Supports Visa, MasterCard, AMEX, Apple Pay & Google Pay in AUD.</p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.stripe_enabled === "true"}
                  onChange={(e) => handleChange("stripe_enabled", e.target.checked ? "true" : "false")}
                  className="rounded text-blue-600"
                />
                <span className="font-bold text-white">Enable Stripe</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Environment Mode
                </label>
                <select
                  value={settings.stripe_mode}
                  onChange={(e) => handleChange("stripe_mode", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
                >
                  <option value="test">Test / Sandbox Mode (Safe for testing)</option>
                  <option value="live">Live Production Mode</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Currency Code
                </label>
                <input
                  type="text"
                  value={settings.stripe_currency}
                  onChange={(e) => handleChange("stripe_currency", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Stripe Publishable Key (pk_test / pk_live)
              </label>
              <input
                type={showSecrets ? "text" : "password"}
                placeholder="pk_live_..."
                value={settings.stripe_publishable_key}
                onChange={(e) => handleChange("stripe_publishable_key", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Stripe Secret Key (sk_test / sk_live)
              </label>
              <input
                type={showSecrets ? "text" : "password"}
                placeholder="sk_live_..."
                value={settings.stripe_secret_key}
                onChange={(e) => handleChange("stripe_secret_key", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Stripe Webhook Secret (whsec_...)
              </label>
              <input
                type={showSecrets ? "text" : "password"}
                placeholder="whsec_..."
                value={settings.stripe_webhook_secret}
                onChange={(e) => handleChange("stripe_webhook_secret", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* PAYPAL SETTINGS */}
        {/* ==================================================== */}
        {activeTab === "paypal" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">PayPal Australia Configuration</h3>
                <p className="text-slate-400 text-xs">Accept PayPal digital wallet and Pay in 4 installment payments.</p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.paypal_enabled === "true"}
                  onChange={(e) => handleChange("paypal_enabled", e.target.checked ? "true" : "false")}
                  className="rounded text-yellow-600"
                />
                <span className="font-bold text-white">Enable PayPal</span>
              </label>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                PayPal Mode
              </label>
              <select
                value={settings.paypal_mode}
                onChange={(e) => handleChange("paypal_mode", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
              >
                <option value="sandbox">Sandbox (Testing)</option>
                <option value="live">Live Production</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                PayPal Client ID
              </label>
              <input
                type={showSecrets ? "text" : "password"}
                placeholder="Client ID from developer.paypal.com"
                value={settings.paypal_client_id}
                onChange={(e) => handleChange("paypal_client_id", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                PayPal Secret Key
              </label>
              <input
                type={showSecrets ? "text" : "password"}
                placeholder="Secret Key"
                value={settings.paypal_secret}
                onChange={(e) => handleChange("paypal_secret", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* PAYID & OSKO SETTINGS */}
        {/* ==================================================== */}
        {activeTab === "payid" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Australian PayID & Osko Setup</h3>
                <p className="text-slate-400 text-xs">Real-time bank transfers using PayID email, mobile, or ABN.</p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.payid_enabled === "true"}
                  onChange={(e) => handleChange("payid_enabled", e.target.checked ? "true" : "false")}
                  className="rounded text-emerald-600"
                />
                <span className="font-bold text-white">Enable PayID</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  PayID Type
                </label>
                <select
                  value={settings.payid_type}
                  onChange={(e) => handleChange("payid_type", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
                >
                  <option value="Email">Email Address</option>
                  <option value="Mobile">Mobile Number</option>
                  <option value="ABN">ABN / Organization ID</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  PayID Identifier
                </label>
                <input
                  type="text"
                  value={settings.payid_identifier}
                  onChange={(e) => handleChange("payid_identifier", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Account Name
                </label>
                <input
                  type="text"
                  value={settings.payid_account_name}
                  onChange={(e) => handleChange("payid_account_name", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  BSB Code
                </label>
                <input
                  type="text"
                  value={settings.payid_bsb}
                  onChange={(e) => handleChange("payid_bsb", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  value={settings.payid_account_number}
                  onChange={(e) => handleChange("payid_account_number", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Customer Instructions
              </label>
              <textarea
                rows={2}
                value={settings.payid_instructions}
                onChange={(e) => handleChange("payid_instructions", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* POLI SETTINGS */}
        {/* ==================================================== */}
        {activeTab === "poli" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">POLi Internet Banking Australia</h3>
                <p className="text-slate-400 text-xs">Direct debit from Commonwealth, ANZ, Westpac, NAB, Bendigo, etc.</p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.poli_enabled === "true"}
                  onChange={(e) => handleChange("poli_enabled", e.target.checked ? "true" : "false")}
                  className="rounded text-purple-600"
                />
                <span className="font-bold text-white">Enable POLi</span>
              </label>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                POLi Merchant Code
              </label>
              <input
                type="text"
                value={settings.poli_merchant_code}
                onChange={(e) => handleChange("poli_merchant_code", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                POLi Authentication Code
              </label>
              <input
                type={showSecrets ? "text" : "password"}
                value={settings.poli_auth_code}
                onChange={(e) => handleChange("poli_auth_code", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* DIRECT BANK EFT SETTINGS */}
        {/* ==================================================== */}
        {activeTab === "bank" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Direct Bank Deposit / EFT</h3>
                <p className="text-slate-400 text-xs">Official corporate Australian bank account details shown on invoices.</p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.bank_transfer_enabled === "true"}
                  onChange={(e) => handleChange("bank_transfer_enabled", e.target.checked ? "true" : "false")}
                  className="rounded text-blue-600"
                />
                <span className="font-bold text-white">Enable Bank EFT</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Bank Name
                </label>
                <input
                  type="text"
                  value={settings.bank_name}
                  onChange={(e) => handleChange("bank_name", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Account Name
                </label>
                <input
                  type="text"
                  value={settings.bank_account_name}
                  onChange={(e) => handleChange("bank_account_name", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  BSB Code
                </label>
                <input
                  type="text"
                  value={settings.bank_bsb}
                  onChange={(e) => handleChange("bank_bsb", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  value={settings.bank_account_number}
                  onChange={(e) => handleChange("bank_account_number", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Payment Description Instructions
              </label>
              <textarea
                rows={2}
                value={settings.bank_instructions}
                onChange={(e) => handleChange("bank_instructions", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* $50 AUD DEPOSIT RULES */}
        {/* ==================================================== */}
        {activeTab === "deposit" && (
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Booking Deposit & Date Confirmation Rules</h3>
              <p className="text-slate-400 text-xs">Configure the deposit amount customers must pay once their quotation is approved.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Default Required Deposit Amount (AUD)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.deposit_amount_default}
                  onChange={(e) => handleChange("deposit_amount_default", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Currency
                </label>
                <input
                  type="text"
                  disabled
                  value={settings.deposit_currency}
                  className="w-full px-3.5 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 font-mono"
                />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.deposit_auto_confirm === "true"}
                  onChange={(e) => handleChange("deposit_auto_confirm", e.target.checked ? "true" : "false")}
                  className="rounded text-emerald-600"
                />
                <span className="font-semibold text-white">Automatically confirm booking and lock date upon successful $50 deposit</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.deposit_refundable === "true"}
                  onChange={(e) => handleChange("deposit_refundable", e.target.checked ? "true" : "false")}
                  className="rounded text-emerald-600"
                />
                <span className="font-semibold text-white">Display "100% Refundable Deposit Policy (Up to 24h Prior)" in Customer Checkout</span>
              </label>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Deposit Policy Notice
              </label>
              <textarea
                rows={2}
                value={settings.deposit_policy_note}
                onChange={(e) => handleChange("deposit_policy_note", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-950 transition-all disabled:opacity-50"
          >
            {saving ? (
              <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Save size={16} />
                <span>Save Payment Gateway Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
