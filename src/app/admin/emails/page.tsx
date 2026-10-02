"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  Send,
  Plus,
  Settings,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Clock,
  Eye,
  EyeOff,
  Save,
  Sparkles,
  Server,
  Zap,
  Globe,
  RefreshCw,
  X,
  FileText,
} from "lucide-react";

export default function AdminEmailsPage() {
  const [activeTab, setActiveTab] = useState<"keys" | "logs" | "compose">("keys");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSecrets, setShowSecrets] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Settings State
  const [settings, setSettings] = useState({
    email_provider: "smtp",
    smtp_host: "smtp.gmail.com",
    smtp_port: "587",
    smtp_user: "info@brisbanecarpetpestexperts.com.au",
    smtp_pass: "",
    smtp_secure: "false",
    gmail_user: "",
    gmail_app_password: "",
    resend_api_key: "",
    sendgrid_api_key: "",
    email_from: "Brisbane Carpet & Pest Experts <info@brisbanecarpetpestexperts.com.au>",
    admin_notification_email: "info@brisbanecarpetpestexperts.com.au",
  });

  // Test Email State
  const [testEmail, setTestEmail] = useState("admin@brisbane.com");
  const [testing, setTesting] = useState(false);

  // Compose State
  const [composeForm, setComposeForm] = useState({
    recipient: "",
    subject: "Brisbane Carpet & Pest Experts - Service Update",
    body: "Hi,\n\nThis is a service notification regarding your carpet cleaning and pest management appointment.\n\nKind regards,\nBrisbane Carpet & Pest Experts",
  });
  const [composing, setComposing] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch Logs
      const logsRes = await fetch("/api/admin/emails");
      if (logsRes.ok) {
        const lData = await logsRes.json();
        setItems(lData.data || []);
      }

      // Fetch Credentials
      const setRes = await fetch("/api/admin/communication-settings");
      if (setRes.ok) {
        const sData = await setRes.json();
        if (sData.data) {
          setSettings((prev) => ({ ...prev, ...sData.data }));
        }
      }
    } catch (err) {
      console.error("Failed to fetch email data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg(null);

    try {
      const res = await fetch("/api/admin/communication-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMsg({ type: "success", text: "Email gateway credentials and SMTP settings saved successfully!" });
      } else {
        setStatusMsg({ type: "error", text: data.message || "Failed to save settings" });
      }
    } catch (err) {
      setStatusMsg({ type: "error", text: "Network error saving settings" });
    } finally {
      setSaving(false);
    }
  };

  const handleTestEmail = async () => {
    if (!testEmail) {
      alert("Please enter a test email recipient");
      return;
    }

    setTesting(true);
    setStatusMsg(null);

    try {
      const res = await fetch("/api/admin/communication-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testType: "email",
          recipientEmail: testEmail,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMsg({ type: "success", text: data.message });
        fetchData();
      } else {
        setStatusMsg({ type: "error", text: data.message || "Test email delivery failed" });
      }
    } catch (err) {
      setStatusMsg({ type: "error", text: "Error dispatching test email" });
    } finally {
      setTesting(false);
    }
  };

  const handleComposeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeForm.recipient || !composeForm.subject) {
      alert("Recipient and subject are required.");
      return;
    }

    setComposing(true);
    try {
      const res = await fetch("/api/admin/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(composeForm),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert("Email sent successfully!");
        setComposeForm({
          recipient: "",
          subject: "Brisbane Carpet & Pest Experts - Service Update",
          body: "",
        });
        setActiveTab("logs");
        fetchData();
      } else {
        alert(data.message || "Failed to send email");
      }
    } catch (err) {
      alert("Error sending email");
    } finally {
      setComposing(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Mail className="text-blue-400" />
            <span>Email Gateway & SMTP Key Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure live SMTP servers, Gmail App Passwords, and Resend/SendGrid API keys for quotation approvals and 2-day pre-booking reminders.
          </p>
        </div>
        <button
          onClick={() => setShowSecrets(!showSecrets)}
          className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto"
        >
          {showSecrets ? <EyeOff size={14} /> : <Eye size={14} />}
          <span>{showSecrets ? "Hide Passwords" : "Show Passwords"}</span>
        </button>
      </div>

      {/* Status Alerts */}
      {statusMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
            statusMsg.type === "success"
              ? "bg-emerald-950/60 border-emerald-800/80 text-emerald-200"
              : "bg-red-950/60 border-red-800/80 text-red-200"
          }`}
        >
          {statusMsg.type === "success" ? (
            <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
          )}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Main Tabs */}
      <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold">
        <button
          onClick={() => setActiveTab("keys")}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "keys" ? "bg-blue-600 text-white font-bold shadow-md" : "text-slate-400 hover:text-white"
          }`}
        >
          <KeyRound size={15} />
          <span>1. SMTP & API Keys Setup</span>
        </button>
        <button
          onClick={() => setActiveTab("logs")}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "logs" ? "bg-blue-600 text-white font-bold shadow-md" : "text-slate-400 hover:text-white"
          }`}
        >
          <FileText size={15} />
          <span>2. Email Dispatch Logs ({items.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("compose")}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "compose" ? "bg-blue-600 text-white font-bold shadow-md" : "text-slate-400 hover:text-white"
          }`}
        >
          <Send size={15} />
          <span>3. Quick Compose & Dispatch</span>
        </button>
      </div>

      {/* ==================================================== */}
      {/* TAB 1: SMTP & API KEYS SETUP */}
      {/* ==================================================== */}
      {activeTab === "keys" && (
        <form onSubmit={handleSaveSettings} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 text-xs">
          {/* Email Provider Selector */}
          <div>
            <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Email Delivery Method
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "smtp", label: "Standard SMTP Server", desc: "Brevo, Mailtrap, Hostinger, cPanel, Zoho" },
                { id: "gmail", label: "Free Gmail SMTP", desc: "Use 16-digit Google App Password" },
                { id: "resend", label: "Resend / SendGrid API", desc: "Developer API keys" },
              ].map((prov) => (
                <button
                  key={prov.id}
                  type="button"
                  onClick={() => setSettings({ ...settings, email_provider: prov.id })}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    settings.email_provider === prov.id
                      ? "bg-blue-600/20 border-blue-500 text-white shadow-md"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="font-bold text-sm text-white block mb-0.5">{prov.label}</span>
                  <span className="text-[11px] text-slate-400 block">{prov.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Option A: Standard SMTP */}
          {settings.email_provider === "smtp" && (
            <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <h3 className="font-bold text-white text-sm">Standard SMTP Credentials (Brevo / Hostinger / cPanel)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-400 mb-1">SMTP Host Server</label>
                  <input
                    type="text"
                    placeholder="e.g. smtp-relay.brevo.com or mail.domain.com"
                    value={settings.smtp_host}
                    onChange={(e) => setSettings({ ...settings, smtp_host: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-400 mb-1">SMTP Port</label>
                  <input
                    type="text"
                    placeholder="587 or 465"
                    value={settings.smtp_port}
                    onChange={(e) => setSettings({ ...settings, smtp_port: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-400 mb-1">SMTP Username / Login</label>
                  <input
                    type="text"
                    placeholder="e.g. your-email@domain.com"
                    value={settings.smtp_user}
                    onChange={(e) => setSettings({ ...settings, smtp_user: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-400 mb-1">SMTP Password</label>
                  <input
                    type={showSecrets ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={settings.smtp_pass}
                    onChange={(e) => setSettings({ ...settings, smtp_pass: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Option B: Gmail App Password */}
          {settings.email_provider === "gmail" && (
            <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <h3 className="font-bold text-white text-sm">Google Gmail SMTP Setup (Free 500 emails/day)</h3>
              <p className="text-[11px] text-slate-400">
                Generate a 16-character App Password from Google Account ➔ Security ➔ 2-Step Verification ➔ App Passwords.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-400 mb-1">Gmail Address</label>
                  <input
                    type="email"
                    placeholder="yourbusiness@gmail.com"
                    value={settings.gmail_user}
                    onChange={(e) => setSettings({ ...settings, gmail_user: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-400 mb-1">16-Digit App Password</label>
                  <input
                    type={showSecrets ? "text" : "password"}
                    placeholder="xxxx xxxx xxxx xxxx"
                    value={settings.gmail_app_password}
                    onChange={(e) => setSettings({ ...settings, gmail_app_password: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Option C: API Gateways */}
          {settings.email_provider === "resend" && (
            <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <h3 className="font-bold text-white text-sm">API Gateway Keys (Resend / SendGrid)</h3>
              <div>
                <label className="block font-semibold text-slate-400 mb-1">Resend API Key (re_...)</label>
                <input
                  type={showSecrets ? "text" : "password"}
                  placeholder="re_123456789..."
                  value={settings.resend_api_key}
                  onChange={(e) => setSettings({ ...settings, resend_api_key: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-400 mb-1">SendGrid API Key (SG....)</label>
                <input
                  type={showSecrets ? "text" : "password"}
                  placeholder="SG.123456789..."
                  value={settings.sendgrid_api_key}
                  onChange={(e) => setSettings({ ...settings, sendgrid_api_key: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                />
              </div>
            </div>
          )}

          {/* Sender & Admin Email Identity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Sender "From" Name & Email</label>
              <input
                type="text"
                value={settings.email_from}
                onChange={(e) => setSettings({ ...settings, email_from: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Super Admin Notification Email</label>
              <input
                type="email"
                value={settings.admin_notification_email}
                onChange={(e) => setSettings({ ...settings, admin_notification_email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
              />
            </div>
          </div>

          {/* Live Test & Save Row */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="email"
                placeholder="Test email address..."
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs w-full sm:w-60"
              />
              <button
                type="button"
                onClick={handleTestEmail}
                disabled={testing}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex-shrink-0 flex items-center gap-1.5 transition-all"
              >
                {testing ? <RefreshCw size={13} className="animate-spin" /> : <Send size={13} />}
                <span>Send Live Test</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-950 transition-all disabled:opacity-50"
            >
              <Save size={15} />
              <span>Save Email Configuration</span>
            </button>
          </div>
        </form>
      )}

      {/* ==================================================== */}
      {/* TAB 2: EMAIL DISPATCH LOGS */}
      {/* ==================================================== */}
      {activeTab === "logs" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center text-xs">
            <span className="font-bold text-white">Email Notification Logs</span>
            <button onClick={fetchData} className="text-blue-400 hover:underline flex items-center gap-1">
              <RefreshCw size={12} /> Refresh
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-semibold">
                  <th className="py-3 px-4">Recipient</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-500">
                      No email dispatches logged yet.
                    </td>
                  </tr>
                ) : (
                  items.map((it) => (
                    <tr key={it.id} className="hover:bg-slate-850/50">
                      <td className="py-3 px-4 font-mono font-bold text-white">{it.recipient}</td>
                      <td className="py-3 px-4">{it.subject}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            it.status === "SENT"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : "bg-red-500/20 text-red-300 border border-red-500/30"
                          }`}
                        >
                          {it.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-slate-400 font-mono text-[11px]">
                        {new Date(it.createdAt).toLocaleString("en-AU")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* TAB 3: QUICK COMPOSE & DISPATCH */}
      {/* ==================================================== */}
      {activeTab === "compose" && (
        <form onSubmit={handleComposeSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
          <h3 className="font-bold text-white text-base">Direct Customer Email Dispatch</h3>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Recipient Email Address *</label>
            <input
              type="email"
              required
              placeholder="customer@domain.com.au"
              value={composeForm.recipient}
              onChange={(e) => setComposeForm({ ...composeForm, recipient: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Email Subject *</label>
            <input
              type="text"
              required
              value={composeForm.subject}
              onChange={(e) => setComposeForm({ ...composeForm, subject: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Message Content *</label>
            <textarea
              rows={6}
              required
              value={composeForm.body}
              onChange={(e) => setComposeForm({ ...composeForm, body: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={composing}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-blue-950"
            >
              <Send size={15} />
              <span>{composing ? "Dispatching..." : "Send Email Now"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
