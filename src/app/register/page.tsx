"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Building2,
  CalendarCheck,
  CreditCard,
  Camera,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    suburb: "Brisbane City",
    postcode: "4000",
    roleType: "customer", // customer or employee
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const BRISBANE_SUBURBS = [
    { name: "Brisbane City", postcode: "4000" },
    { name: "South Brisbane", postcode: "4101" },
    { name: "Fortitude Valley", postcode: "4006" },
    { name: "New Farm", postcode: "4005" },
    { name: "Chermside", postcode: "4032" },
    { name: "Carindale", postcode: "4152" },
    { name: "Indooroopilly", postcode: "4068" },
    { name: "Sunnybank", postcode: "4109" },
    { name: "Mount Gravatt", postcode: "4122" },
    { name: "Toowong", postcode: "4066" },
    { name: "Ipswich", postcode: "4305" },
    { name: "Logan Central", postcode: "4114" },
    { name: "Springfield", postcode: "4300" },
    { name: "Redcliffe", postcode: "4020" },
  ];

  const handleSuburbChange = (suburbName: string) => {
    const found = BRISBANE_SUBURBS.find((s) => s.name === suburbName);
    setFormData({
      ...formData,
      suburb: suburbName,
      postcode: found ? found.postcode : formData.postcode,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in your name, email and password.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
        setTimeout(() => {
          if (formData.roleType === "employee") {
            router.push("/employee");
          } else {
            router.push("/dashboard");
          }
          router.refresh();
        }, 1000);
      } else {
        setError(data.message || "Registration failed. Please check your details.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans selection:bg-blue-500 selection:text-white">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-[450px] h-[450px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl relative z-10 my-8">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-400 text-white shadow-xl shadow-blue-950/50 mb-3 border border-blue-400/20 hover:scale-105 transition-transform">
            <ShieldCheck size={36} className="text-white drop-shadow-sm" />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Create Your Account
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Brisbane Carpet & Pest Experts Customer Portal
          </p>
        </div>

        {/* Feature Highlights Banner */}
        <div className="grid grid-cols-3 gap-2 mb-6 bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-center text-xs text-slate-300 backdrop-blur-md">
          <div className="flex flex-col items-center gap-1">
            <CalendarCheck size={16} className="text-blue-400" />
            <span>Demand Quotes</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-x border-slate-800">
            <CreditCard size={16} className="text-emerald-400" />
            <span>$50 AUD Deposit</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Camera size={16} className="text-amber-400" />
            <span>Live Job Photos</span>
          </div>
        </div>

        {/* Registration Card */}
        <div className="bg-slate-900/90 border border-slate-800 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
          {/* Role Switcher */}
          <div className="flex p-1 bg-slate-950/80 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, roleType: "customer" })}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                formData.roleType === "customer"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <User size={14} /> Customer Account
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, roleType: "employee" })}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                formData.roleType === "employee"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <ShieldCheck size={14} /> Field Technician / Staff
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
              <span>Account created successfully! Redirecting to your dashboard...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Full Name <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Mitchell Johnson"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com.au"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Mobile Number (Australia)
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="tel"
                    placeholder="0434 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Address & Suburb (QLD) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Street Address
                </label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    placeholder="123 Queen Street"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Brisbane Suburb
                </label>
                <select
                  value={formData.suburb}
                  onChange={(e) => handleSuburbChange(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                >
                  {BRISBANE_SUBURBS.map((s) => (
                    <option key={s.name} value={s.name} className="bg-slate-900 text-white">
                      {s.name} ({s.postcode})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success}
              className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                formData.roleType === "employee"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-emerald-950/50"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-950/50"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Account & Continue</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Links */}
          <div className="pt-4 border-t border-slate-800/80 text-center text-xs text-slate-400 space-y-2">
            <p>
              Already have an account?{" "}
              <Link href="/login" className="text-blue-400 hover:underline font-semibold">
                Sign in here
              </Link>
            </p>
            <p className="text-slate-500">
              By creating an account, you agree to our Terms of Service & Privacy Policy (QLD, Australia).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
