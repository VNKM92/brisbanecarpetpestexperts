"use client";

import React, { useState, useEffect } from "react";
import {
  PhoneCall,
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
  Smartphone,
  Zap,
  Globe,
  RefreshCw,
  X,
  MessageSquare,
  MessageCircle,
} from "lucide-react";

export default function AdminWhatsAppPage() {
  const [activeTab, setActiveTab] = useState<"keys" | "logs" | "compose">("keys");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSecrets, setShowSecrets] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Settings State
  const [settings, setSettings] = useState({
    whatsapp_enabled: "true",
    whatsapp_provider: "meta_cloud", // 'meta_cloud', 'twilio', 'ultramsg'
    meta_access_token: "",
    meta_phone_number_id: "",
    meta_waba_id: "",
    meta_template_name: "hello_world",
    twilio_account_sid: "",
    twilio_auth_token: "",
    twilio_phone_number: "+14155238886",
    ultramsg_instance_id: "",
    ultramsg_token: "",
    whatsapp_country_code: "61", // Australia
    whatsapp_business_phone: "0434 061 188",
  });

  // Test WhatsApp State
  const [testPhone, setTestPhone] = useState("0434 061 188");
  const [testing, setTesting] = useState(false);

  // Direct Send State
  const [composePhone, setComposePhone] = useState("");
  const [composeMessage, setComposeMessage] = useState(
    "Hi! This is Brisbane Carpet & Pest Experts confirming your upcoming service appointment. Please let us know if you have any questions."
  );
  const [sendingMessage, setSendingMessage] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch Logs
      const logsRes = await fetch("/api/admin/whatsapp");
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
      console.error("Failed to fetch WhatsApp data:", err);
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
        setStatusMsg({ type: "success", text: "WhatsApp API keys and business credentials saved successfully!" });
      } else {
        setStatusMsg({ type: "error", text: data.message || "Failed to save settings" });
      }
    } catch (err) {
      setStatusMsg({ type: "error", text: "Network error saving settings" });
    } finally {
      setSaving(false);
    }
  };

  const handleTestWhatsApp = async () => {
    if (!testPhone) {
      alert("Please enter a test mobile phone number");
      return;
    }

    setTesting(true);
    setStatusMsg(null);

    try {
      const res = await fetch("/api/admin/communication-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testType: "whatsapp",
          recipientPhone: testPhone,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMsg({ type: "success", text: data.message });
        fetchData();
      } else {
        setStatusMsg({ type: "error", text: data.message || "WhatsApp test delivery failed" });
      }
    } catch (err) {
      setStatusMsg({ type: "error", text: "Error dispatching test WhatsApp" });
    } finally {
      setTesting(false);
    }
  };

  const handleSendMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!composePhone || !composeMessage) {
      alert("Phone number and message are required.");
      return;
    }

    setSendingMessage(true);
    try {
      const res = await fetch("/api/admin/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: composePhone,
          message: composeMessage,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert("WhatsApp message sent successfully!");
        setComposePhone("");
        setActiveTab("logs");
        fetchData();
      } else {
        alert(data.message || "Failed to send WhatsApp message");
      }
    } catch (err) {
      alert("Error sending WhatsApp message");
    } finally {
      setSendingMessage(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <PhoneCall className="text-emerald-400" />
            <span>WhatsApp Business API & SMS Gateway Setup</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure Meta Cloud API, Phone Number IDs, Twilio keys, and country codes for automated 2-day SMS & WhatsApp reminders.
          </p>
        </div>
        <button
          onClick={() => setShowSecrets(!showSecrets)}
          className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto"
        >
          {showSecrets ? <EyeOff size={14} /> : <Eye size={14} />}
          <span>{showSecrets ? "Hide API Tokens" : "Reveal API Tokens"}</span>
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
            activeTab === "keys" ? "bg-emerald-500 text-slate-950 font-bold shadow-md" : "text-slate-400 hover:text-white"
          }`}
        >
          <KeyRound size={15} />
          <span>1. WhatsApp API & Meta Cloud Keys</span>
        </button>
        <button
          onClick={() => setActiveTab("logs")}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "logs" ? "bg-emerald-500 text-slate-950 font-bold shadow-md" : "text-slate-400 hover:text-white"
          }`}
        >
          <MessageSquare size={15} />
          <span>2. Message & Alert Logs ({items.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("compose")}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === "compose" ? "bg-emerald-500 text-slate-950 font-bold shadow-md" : "text-slate-400 hover:text-white"
          }`}
        >
          <Send size={15} />
          <span>3. Send Live WhatsApp Message</span>
        </button>
      </div>

      {/* ==================================================== */}
      {/* TAB 1: WHATSAPP API & META KEYS SETUP */}
      {/* ==================================================== */}
      {activeTab === "keys" && (
        <form onSubmit={handleSaveSettings} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 text-xs">
          {/* Enable Toggle & Provider Selection */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white">Select WhatsApp / SMS Provider</h3>
              <p className="text-slate-400 text-xs">Choose how automated booking notifications and quotes are delivered.</p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.whatsapp_enabled === "true"}
                onChange={(e) => setSettings({ ...settings, whatsapp_enabled: e.target.checked ? "true" : "false" })}
                className="rounded text-emerald-600"
              />
              <span className="font-bold text-white">Enable WhatsApp Notifications</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: "meta_cloud", label: "Meta Cloud API (Official)", desc: "Facebook Graph API / Direct Meta Token" },
              { id: "twilio", label: "Twilio WhatsApp & SMS", desc: "Twilio Programmable Messaging" },
              { id: "ultramsg", label: "UltraMsg / Chat API", desc: "Instance ID & Webhook API" },
            ].map((prov) => (
              <button
                key={prov.id}
                type="button"
                onClick={() => setSettings({ ...settings, whatsapp_provider: prov.id })}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  settings.whatsapp_provider === prov.id
                    ? "bg-emerald-500/20 border-emerald-500 text-white shadow-md"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <span className="font-bold text-sm text-white block mb-0.5">{prov.label}</span>
                <span className="text-[11px] text-slate-400 block">{prov.desc}</span>
              </button>
            ))}
          </div>

          {/* Option A: Meta WhatsApp Cloud API */}
          {settings.whatsapp_provider === "meta_cloud" && (
            <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div>
                <h3 className="font-bold text-white text-sm">Official Meta Cloud API Credentials</h3>
                <p className="text-[11px] text-slate-400">
                  Obtained from developers.facebook.com ➔ Your WhatsApp App ➔ API Setup.
                </p>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Meta Permanent Access Token (Bearer Token)
                </label>
                <input
                  type={showSecrets ? "text" : "password"}
                  placeholder="EAAGm0PX4ZC5..."
                  value={settings.meta_access_token}
                  onChange={(e) => setSettings({ ...settings, meta_access_token: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Phone Number ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 104928374829104"
                    value={settings.meta_phone_number_id}
                    onChange={(e) => setSettings({ ...settings, meta_phone_number_id: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    WhatsApp Business Account ID (WABA ID)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 992817462019482"
                    value={settings.meta_waba_id}
                    onChange={(e) => setSettings({ ...settings, meta_waba_id: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Option B: Twilio */}
          {settings.whatsapp_provider === "twilio" && (
            <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <h3 className="font-bold text-white text-sm">Twilio WhatsApp & SMS Settings</h3>
              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Twilio Account SID
                </label>
                <input
                  type="text"
                  placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  value={settings.twilio_account_sid}
                  onChange={(e) => setSettings({ ...settings, twilio_account_sid: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Twilio Auth Token
                  </label>
                  <input
                    type={showSecrets ? "text" : "password"}
                    placeholder="••••••••••••••••"
                    value={settings.twilio_auth_token}
                    onChange={(e) => setSettings({ ...settings, twilio_auth_token: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Twilio WhatsApp From Number
                  </label>
                  <input
                    type="text"
                    placeholder="+14155238886"
                    value={settings.twilio_phone_number}
                    onChange={(e) => setSettings({ ...settings, twilio_phone_number: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Australian Phone Country Code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Default Country Calling Code</label>
              <input
                type="text"
                placeholder="61 (Australia)"
                value={settings.whatsapp_country_code}
                onChange={(e) => setSettings({ ...settings, whatsapp_country_code: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Converts Australian numbers (e.g. 0434 061 188) automatically to international format (61434061188).
              </span>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Business Support WhatsApp Number</label>
              <input
                type="text"
                value={settings.whatsapp_business_phone}
                onChange={(e) => setSettings({ ...settings, whatsapp_business_phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
              />
            </div>
          </div>

          {/* Test WhatsApp & Save Row */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="tel"
                placeholder="0434 061 188..."
                value={testPhone}
                onChange={(e) => setTestPhone(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs w-full sm:w-60"
              />
              <button
                type="button"
                onClick={handleTestWhatsApp}
                disabled={testing}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex-shrink-0 flex items-center gap-1.5 transition-all"
              >
                {testing ? <RefreshCw size={13} className="animate-spin" /> : <Send size={13} />}
                <span>Send Test WhatsApp</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all disabled:opacity-50"
            >
              <Save size={15} />
              <span>Save WhatsApp Keys & Settings</span>
            </button>
          </div>
        </form>
      )}

      {/* ==================================================== */}
      {/* TAB 2: MESSAGE LOGS */}
      {/* ==================================================== */}
      {activeTab === "logs" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center text-xs">
            <span className="font-bold text-white">WhatsApp & SMS Alert History</span>
            <button onClick={fetchData} className="text-emerald-400 hover:underline flex items-center gap-1">
              <RefreshCw size={12} /> Refresh
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-semibold">
                  <th className="py-3 px-4">Recipient Phone</th>
                  <th className="py-3 px-4">Message</th>
                  <th className="py-3 px-4">Direction</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      No WhatsApp messages logged yet.
                    </td>
                  </tr>
                ) : (
                  items.map((it) => (
                    <tr key={it.id} className="hover:bg-slate-850/50">
                      <td className="py-3 px-4 font-mono font-bold text-white">{it.phone}</td>
                      <td className="py-3 px-4 max-w-md truncate">{it.message}</td>
                      <td className="py-3 px-4">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">{it.direction}</span>
                      </td>
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
      {/* TAB 3: DIRECT WHATSAPP SENDER */}
      {/* ==================================================== */}
      {activeTab === "compose" && (
        <form onSubmit={handleSendMessageSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
          <h3 className="font-bold text-white text-base">Direct WhatsApp Message Sender</h3>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Customer Mobile Number (Australia / Global) *</label>
            <input
              type="tel"
              required
              placeholder="0434 061 188 or +61 434 061 188"
              value={composePhone}
              onChange={(e) => setComposePhone(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Message Content *</label>
            <textarea
              rows={4}
              required
              value={composeMessage}
              onChange={(e) => setComposeMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={sendingMessage}
              className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-950"
            >
              <Send size={15} />
              <span>{sendingMessage ? "Sending..." : "Send WhatsApp Message"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
