"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  User,
  Wrench,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");

  const [activeTab, setActiveTab] = useState<"customer" | "admin" | "employee">("admin");
  const [email, setEmail] = useState("admin@brisbane.com");
  const [password, setPassword] = useState("Admin@123456");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Quick fill preset credentials
  const handleSelectTab = (tab: "customer" | "admin" | "employee") => {
    setActiveTab(tab);
    setError("");
    if (tab === "admin") {
      setEmail("admin@brisbane.com");
      setPassword("Admin@123456");
    } else if (tab === "employee") {
      setEmail("tech@brisbane.com");
      setPassword("Staff@123456");
    } else {
      setEmail("john.doe@example.com");
      setPassword("Customer@123");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
        const roleSlug = data.data?.user?.roleSlug;

        // Save token to localStorage for client-side API requests
        if (data.data?.token) {
          try {
            localStorage.setItem("auth_token", data.data.token);
            localStorage.setItem("admin_token", data.data.token);
            localStorage.setItem("user_info", JSON.stringify(data.data.user));
          } catch (e) {}
        }

        // Intelligent role redirection
        let targetDestination = returnUrl;
        if (!targetDestination) {
          if (roleSlug === "super-admin" || roleSlug === "admin" || roleSlug === "manager") {
            targetDestination = "/admin";
          } else if (roleSlug === "staff") {
            targetDestination = "/employee";
          } else {
            targetDestination = "/dashboard";
          }
        }

        setTimeout(() => {
          // Full page location change ensures HTTP-only cookies are immediately sent
          window.location.href = targetDestination;
        }, 400);
      } else {
        setError(data.message || "Invalid credentials. Please verify your email and password.");
      }
    } catch (err) {
      setError("Network error. Unable to reach authentication server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans selection:bg-emerald-500 selection:text-white">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Login Card */}
      <div className="w-full max-w-md relative z-10 my-6">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white shadow-xl shadow-emerald-950/50 mb-3 border border-emerald-400/20 hover:scale-105 transition-transform">
            <ShieldCheck size={36} className="text-white drop-shadow-sm" />
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Brisbane Carpet & Pest Experts
          </h1>
          <p className="text-slate-400 text-xs mt-1 flex items-center justify-center gap-1.5">
            <span>Unified Portal Login</span>
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
            <span className="text-emerald-400 font-medium">Production Security</span>
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-slate-900/90 border border-slate-800 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
          {/* Persona / Portal Tabs */}
          <div className="grid grid-cols-3 p-1 bg-slate-950/90 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => handleSelectTab("admin")}
              className={`py-2 px-1 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                activeTab === "admin"
                  ? "bg-purple-600 text-white shadow-md font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <ShieldCheck size={13} /> Admin
            </button>
            <button
              type="button"
              onClick={() => handleSelectTab("customer")}
              className={`py-2 px-1 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                activeTab === "customer"
                  ? "bg-blue-600 text-white shadow-md font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <User size={13} /> Customer
            </button>
            <button
              type="button"
              onClick={() => handleSelectTab("employee")}
              className={`py-2 px-1 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                activeTab === "employee"
                  ? "bg-emerald-600 text-white shadow-md font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Wrench size={13} /> Staff / Tech
            </button>
          </div>

          {error && (
            <div className="p-3.5 bg-red-950/60 border border-red-800/80 rounded-xl text-red-200 text-xs flex items-start gap-2.5">
              <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3.5 bg-emerald-950/60 border border-emerald-800/80 rounded-xl text-emerald-200 text-xs flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>Authentication successful! Redirecting to your dashboard...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-inner"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert("For password reset assistance, please contact Super Admin at info@brisbanecarpetpestexperts.com.au or call 0434 061 188.")}
                  className="text-xs text-emerald-400 hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                activeTab === "admin"
                  ? "bg-purple-600 hover:bg-purple-500 text-white shadow-purple-950/50"
                  : activeTab === "customer"
                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-950/50"
                  : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/50"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Portal</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Fill Helper */}
          <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl text-[11px] text-slate-400 space-y-1.5 shadow-inner">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <KeyRound size={13} />
              <span>1-Click Preset Credentials:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => handleSelectTab("admin")}
                className={`px-2 py-1 rounded text-[10px] text-left border transition cursor-pointer ${
                  activeTab === "admin" ? "bg-purple-950 border-purple-600 text-white" : "bg-slate-800 border-slate-700 text-slate-300 hover:text-white"
                }`}
              >
                <span className="font-bold block">Super Admin</span>
                <span className="text-[9px] text-slate-400 block truncate">admin@brisbane.com</span>
              </button>
              <button
                type="button"
                onClick={() => handleSelectTab("customer")}
                className={`px-2 py-1 rounded text-[10px] text-left border transition cursor-pointer ${
                  activeTab === "customer" ? "bg-blue-950 border-blue-600 text-white" : "bg-slate-800 border-slate-700 text-slate-300 hover:text-white"
                }`}
              >
                <span className="font-bold block">Customer</span>
                <span className="text-[9px] text-slate-400 block truncate">john.doe@example.com</span>
              </button>
              <button
                type="button"
                onClick={() => handleSelectTab("employee")}
                className={`px-2 py-1 rounded text-[10px] text-left border transition cursor-pointer ${
                  activeTab === "employee" ? "bg-emerald-950 border-emerald-600 text-white" : "bg-slate-800 border-slate-700 text-slate-300 hover:text-white"
                }`}
              >
                <span className="font-bold block">Field Staff</span>
                <span className="text-[9px] text-slate-400 block truncate">tech@brisbane.com</span>
              </button>
            </div>
          </div>

          {/* New User Register CTA */}
          <div className="pt-3 border-t border-slate-800 text-center text-xs text-slate-400">
            <p>
              New customer or service technician?{" "}
              <Link href="/register" className="text-emerald-400 hover:underline font-bold">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading Login Panel...</div>}>
      <LoginFormContent />
    </Suspense>
  );
}
