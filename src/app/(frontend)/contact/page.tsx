"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import AOS from "aos";
import { useForm } from "react-hook-form";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Calendar,
  Home,
  MessageSquare,
  Send,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { COMPANY_INFO } from "@/config/seo";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  suburb: string;
  bedrooms: string;
  bathrooms: string;
  preferredDate?: string;
  message: string;
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [enquiryRef, setEnquiryRef] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [settings, setSettings] = useState({
    site_name: "Brisbane Carpet & Pest Experts",
    company_phone: COMPANY_INFO.phone,
    company_email: COMPANY_INFO.email,
    company_address: COMPANY_INFO.address,
    business_hours: "Monday to Sunday: 7:00 AM – 7:00 PM",
    social_facebook: COMPANY_INFO.social.facebook,
    social_instagram: COMPANY_INFO.social.instagram,
    social_twitter: COMPANY_INFO.social.twitter,
    social_linkedin: COMPANY_INFO.social.linkedin,
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    fetch("/api/settings")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setSettings((prev) => ({ ...prev, ...json.data }));
        }
      })
      .catch(() => {});
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      service: "Bond Cleaning Brisbane",
      bedrooms: "2 Bedrooms",
      bathrooms: "2 Bathrooms",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
        setEnquiryRef(json.data?.enquiryNumber || "");
        reset();
      } else {
        setServerError(json.message || "Failed to submit enquiry. Please try again.");
      }
    } catch (err) {
      setServerError("Network error. Please try again or call 0434 061 188 directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const cleanPhone = (settings.company_phone || "0434 061 188").replace(/\s+/g, "");

  return (
    <div className="bg-[#fbf9f4] min-h-screen text-[#1a1f2c]">
      {/* ================= HERO & HEADLINE ================= */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-b from-[#eef8f1]/60 via-[#fbf9f4] to-[#fbf9f4]">
        {/* Background Subtle Watermark */}
        <div
          className="absolute top-10 left-1/2 -translate-x-1/2 text-[#10b981]/5 font-black text-[70px] sm:text-[130px] md:text-[210px] tracking-tight uppercase select-none pointer-events-none whitespace-nowrap"
          aria-hidden="true"
        >
          BRISBANE CLEAN
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs md:text-sm font-semibold mb-4 tracking-wide shadow-sm">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              100% Bond Back Guarantee · Same Day Quotes
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0d2215] tracking-tight leading-tight">
              Contact Brisbane’s <span className="text-emerald-700 underline decoration-orange-400 decoration-wavy decoration-2">Top Rated</span> Cleaning Experts
            </h1>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl mt-4 leading-relaxed">
              Need urgent end of lease cleaning, carpet steam cleaning, or certified pest management in Brisbane? Fill in the form for a fast, obligation-free quote or call our friendly local dispatch team directly.
            </p>
          </div>
        </div>
      </section>

      {/* ================= MAIN INTERACTIVE GRID ================= */}
      <section className="py-4 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: THE BOOKING & QUOTE FORM (7 COLS) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-emerald-950/5 relative" data-aos="fade-right">
            <div className="border-b border-gray-100 pb-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-orange-500 font-bold text-xs uppercase tracking-wider">Fast & Free Quote</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">Book Your Service Today</h2>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-emerald-600 text-sm font-medium bg-emerald-50 px-3 py-1 rounded-full">
                  <ShieldCheck className="w-4 h-4" /> REIQ Standards
                </div>
              </div>
            </div>

            {submitted && (
              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-300 text-emerald-950 shadow-sm animate-fadeIn">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-lg text-emerald-900">Enquiry Successfully Dispatched!</h3>
                    <p className="text-emerald-800 text-sm mt-1">
                      Thank you for choosing Brisbane Carpet & Pest Experts. Your reference number is{" "}
                      <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-emerald-300 text-emerald-950">{enquiryRef}</span>.
                    </p>
                    <p className="text-emerald-700 text-xs mt-2">
                      Our dispatch manager has received your details and will call or email you within 15–30 minutes during business hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-3 text-xs font-semibold text-emerald-800 underline hover:text-emerald-950"
                    >
                      Submit another request
                    </button>
                  </div>
                </div>
              </div>
            )}

            {serverError && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm">
                <p className="font-semibold">{serverError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("firstName", { required: "First name is required" })}
                    placeholder="e.g. John"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition text-base bg-gray-50/50 hover:bg-white"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    {...register("lastName")}
                    placeholder="e.g. Smith"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition text-base bg-gray-50/50 hover:bg-white"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Valid email required" },
                    })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition text-base bg-gray-50/50 hover:bg-white"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    {...register("phone", {
                      required: "Phone number is required",
                      minLength: { value: 8, message: "Please enter a valid phone number" },
                    })}
                    placeholder="0400 000 000"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition text-base bg-gray-50/50 hover:bg-white"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              {/* Service & Suburb */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                    Service Required <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("service", { required: true })}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition text-base bg-gray-50/50 hover:bg-white"
                  >
                    <option value="Bond Cleaning Brisbane">Bond Cleaning / End of Lease</option>
                    <option value="Carpet Steam Cleaning">Carpet Steam Cleaning</option>
                    <option value="Pest Control Brisbane">Pest Control & Management</option>
                    <option value="Pre-Sale House Cleaning">Pre-Sale House Deep Cleaning</option>
                    <option value="Upholstery & Couch Cleaning">Upholstery & Couch Cleaning</option>
                    <option value="Tile & Grout Cleaning">Tile & Grout Cleaning</option>
                    <option value="Commercial & Office Cleaning">Commercial / Office Cleaning</option>
                    <option value="Mattress Steam Cleaning">Mattress Sanitisation & Steam</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                    Brisbane Suburb / Postcode
                  </label>
                  <input
                    type="text"
                    {...register("suburb")}
                    placeholder="e.g. Sunnybank, Indooroopilly, 4109"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition text-base bg-gray-50/50 hover:bg-white"
                  />
                </div>
              </div>

              {/* Bedrooms, Bathrooms, Preferred Date */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                    Bedrooms / Rooms
                  </label>
                  <select
                    {...register("bedrooms")}
                    className="w-full px-3 py-3.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition text-base bg-gray-50/50 hover:bg-white"
                  >
                    <option value="Studio / 1 Room">Studio / 1 Room</option>
                    <option value="2 Bedrooms">2 Bedrooms</option>
                    <option value="3 Bedrooms">3 Bedrooms</option>
                    <option value="4 Bedrooms">4 Bedrooms</option>
                    <option value="5+ Bedrooms">5+ Bedrooms / Multi-Story</option>
                    <option value="Commercial Space">Commercial / Office</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                    Bathrooms
                  </label>
                  <select
                    {...register("bathrooms")}
                    className="w-full px-3 py-3.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition text-base bg-gray-50/50 hover:bg-white"
                  >
                    <option value="1 Bathroom">1 Bathroom</option>
                    <option value="2 Bathrooms">2 Bathrooms</option>
                    <option value="3 Bathrooms">3 Bathrooms</option>
                    <option value="4+ Bathrooms">4+ Bathrooms</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    {...register("preferredDate")}
                    className="w-full px-3 py-3.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition text-base bg-gray-50/50 hover:bg-white"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                  Special Instructions or Cleaning Details
                </label>
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="Tell us about specific stains, key collection details, garage/balcony cleaning requirements, or urgent lease end deadlines..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition text-base bg-gray-50/50 hover:bg-white resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all duration-300 flex items-center justify-center gap-3 text-lg disabled:opacity-60 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Sending Request to Dispatch Team...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Get Instant Free Quote & Availability
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-500 pt-1">
                🔒 Privacy Assured. We will never share your contact details. 100% Free No-Obligation Quote.
              </p>
            </form>
          </div>

          {/* RIGHT COLUMN: CONTACT DIRECT INFO, HOURS & PERKS (5 COLS) */}
          <div className="lg:col-span-5 space-y-6" data-aos="fade-left">
            
            {/* Quick Call Hero Card */}
            <div className="bg-gradient-to-br from-[#0e4429] to-[#052e16] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
              
              <span className="inline-block px-3 py-1 bg-emerald-400/20 text-emerald-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-400/30">
                Direct Dispatch Hotline
              </span>

              <h3 className="text-2xl font-bold tracking-tight mb-2">Need Immediate Cleaning or Pest Advice?</h3>
              <p className="text-emerald-100/90 text-sm leading-relaxed mb-6">
                Our team is on standby 7 days a week across Brisbane, Ipswich, Logan, and surrounding regions.
              </p>

              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center shadow-md">
                    <Phone className="w-6 h-6 text-white animate-pulse" />
                  </div>
                  <div>
                    <span className="text-xs text-emerald-200 block uppercase font-medium">Call Us Directly</span>
                    <span className="text-xl font-bold text-white tracking-wide">{settings.company_phone || "0434 061 188"}</span>
                  </div>
                </div>
                <span className="text-orange-400 group-hover:translate-x-1 transition font-bold text-lg">→</span>
              </a>

              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-emerald-200/90">
                <span>⏱️ Average response: Under 15 mins</span>
                <span>⭐ 4.9/5 Star Rated</span>
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-gray-100 space-y-6">
              <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                Local Brisbane Office
              </h3>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 text-emerald-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Service Headquarters</h4>
                  <p className="text-gray-600 text-sm mt-0.5 whitespace-pre-line leading-relaxed">
                    {settings.company_address || "192 Turton St, Sunnybank, QLD 4109\nBrisbane, Queensland, Australia"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 text-emerald-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Email Inquiries</h4>
                  <a
                    href={`mailto:${settings.company_email || "info@brisbanecarpetpestexperts.com.au"}`}
                    className="text-emerald-700 hover:text-emerald-900 text-sm mt-0.5 block font-medium underline"
                  >
                    {settings.company_email || "info@brisbane.com"}
                  </a>
                  <p className="text-xs text-gray-400 mt-0.5">Send floorplans, checklists or photos anytime.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 text-emerald-600">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Operating Hours</h4>
                  <p className="text-gray-600 text-sm mt-0.5 font-medium">
                    {settings.business_hours || "Monday – Sunday: 7:00 AM to 7:00 PM"}
                  </p>
                  <p className="text-xs text-emerald-600 font-semibold mt-0.5">
                    * Emergency & weekend bond cleans available
                  </p>
                </div>
              </div>
            </div>

            {/* Why Choose Us Badge Grid */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-200">
              <h4 className="font-bold text-amber-950 text-sm mb-3 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                Why Brisbane Locals Trust Us
              </h4>
              <ul className="space-y-2.5 text-sm text-amber-900">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <strong>100% Bond Back Guarantee:</strong> 72-hour free re-clean policy.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <strong>Certified Technicians:</strong> Insured, police-checked & IICRC trained.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <strong>Eco-Friendly & Pet Safe:</strong> Non-toxic hospital grade solutions.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <strong>Comprehensive Invoicing:</strong> Formatted for real estate property managers.
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ================= BRISBANE SERVICE SUBURBS AREA SECTION ================= */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12" data-aos="fade-up">
            <span className="text-emerald-700 font-bold text-xs tracking-wider uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full">
              Full Queensland Coverage
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
              Areas We Service Across Greater Brisbane
            </h2>
            <p className="text-gray-600 text-base mt-3">
              Our mobile cleaning vans are fully equipped with industrial truck-mounted steam extraction systems and ready to dispatch to all Brisbane suburbs.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 text-center text-sm font-medium text-gray-700" data-aos="fade-up">
            {[
              "Brisbane CBD",
              "South Brisbane",
              "Sunnybank",
              "Indooroopilly",
              "Chermside",
              "Mount Gravatt",
              "Carindale",
              "Fortitude Valley",
              "New Farm",
              "Toowong",
              "Paddington",
              "West End",
              "Morningside",
              "Hamilton",
              "Ashgrove",
              "Kenmore",
              "Upper Mount Gravatt",
              "Logan City",
              "Springwood",
              "Underwood",
              "Ipswich Central",
              "Redcliffe",
              "Capalaba",
              "Caboolture",
            ].map((suburb) => (
              <div
                key={suburb}
                className="bg-[#fbf9f4] hover:bg-emerald-50 hover:text-emerald-800 border border-gray-200/80 rounded-xl py-3 px-2 transition flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{suburb}</span>
              </div>
            ))}
          </div>

          {/* Interactive Google Map Embed */}
          <div className="mt-12 rounded-3xl overflow-hidden shadow-lg border border-gray-200 h-[380px] relative" data-aos="zoom-in">
            <iframe
              title="Brisbane Carpet & Pest Experts Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113158.46014498308!2d152.95109865!3d-27.4709331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b91579aac93d233%3A0x402a35af3deaf40!2sBrisbane%20QLD%2C%20Australia!5e0!3m2!1sen!2sau!4v1700000000000!5m2!1sen!2sau"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-md border border-gray-200 flex items-center gap-3 text-xs sm:text-sm">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="font-semibold text-gray-800">Mobile Cleaning Units Active Now Across Brisbane</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
