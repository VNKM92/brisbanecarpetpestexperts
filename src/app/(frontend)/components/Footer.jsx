"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Footer() {
  const [settings, setSettings] = useState({
    company_phone: "0434 061 188",
    company_email: "info@brisbane.com",
    company_address: "192 turton st sunnybank 4109 Brisbane Queensland Australia.",
    social_facebook: "https://facebook.com/brisbaneservices",
    social_instagram: "https://instagram.com/brisbaneservices",
    social_twitter: "https://twitter.com/brisbanecarpet",
    social_linkedin: "https://linkedin.com/company/brisbaneservices",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setSettings((prev) => ({ ...prev, ...json.data }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
       <footer className="bg-[#faf8f3] relative overflow-hidden">

      {/* <!-- TOP SECTION --> */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-16 relative">

        {/* <!-- Background Text --> */}
        <h2
          className="absolute top-6 left-1/2 -translate-x-1/2 text-[80px] md:text-[160px] font-extrabold text-white opacity-90 pointer-events-none select-none whitespace-nowrap">
          get in touch
        </h2>

        {/* <!-- Logo + CTA --> */}
        <div className="mt-35 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

          {/* <!-- Logo --> */}
          <div className="flex items-center gap-1">
              <Link href="/" className="flex items-center gap-2">
                <img src="/logo.png" alt="logo" className="h-8" />
                <span className="text-2xl font-semibold text-white">.</span>
              </Link>
          </div>

          {/* <!-- CTA --> */}
          <Link href="/contact"
            className="flex items-center gap-3 font-medium group">
            Book A Free Consultation
            <span
              className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110">
              →
            </span>
          </Link>

        </div>
      </div>

      <hr className="mt-[-42px] border-gray-200" />

      {/* <!-- MAIN FOOTER --> */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* <!-- ABOUT --> */}
        <div>
          <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-xs">
           We clean with care, precision, and eco-friendly products. {settings.company_address}
          </p>

          {/* <!-- Social Icons --> */}
          <div className="flex gap-5 text-green-600">
            {/* <!-- Facebook --> */}
            <a className="hover:scale-110 transition" href={settings.social_facebook || "#"} target="_blank" rel="noopener noreferrer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2V9.7c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12Z" />
              </svg>
            </a>

            {/* <!-- Instagram --> */}
            <a className="hover:scale-110 transition" href={settings.social_instagram || "#"} target="_blank" rel="noopener noreferrer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.3 2.3.5.6.2 1 .5 1.5 1s.8.9 1 1.5c.2.4.4 1.1.5 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.9-.5 2.3-.2.6-.5 1-.9 1.5s-.9.8-1.5 1c-.4.2-1.1.4-2.3.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.3-.5a3.9 3.9 0 0 1-1.5-1 3.9 3.9 0 0 1-1-1.5c-.2-.4-.4-1.1-.5-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.9.5-2.3.2-.6.5-1 .9-1.5s.9-.8 1.5-1c.4-.2 1.1-.4 2.3-.5C8.4 2.2 8.8 2.2 12 2.2Z" />
              </svg>
            </a>

            {/* <!-- X --> */}
            <a className="hover:scale-110 transition" href={settings.social_twitter || "#"} target="_blank" rel="noopener noreferrer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-7-6.1 7H2l8.1-9.3L1 2h7l4.9 6.4L18.9 2Z" />
              </svg>
            </a>

            {/* <!-- LinkedIn --> */}
            <a className="hover:scale-110 transition" href={settings.social_linkedin || "#"} target="_blank" rel="noopener noreferrer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 8.98h4v12H3ZM9 8.98h3.8v1.6h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6v6.4h-4v-5.7c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1v5.8H9Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* <!-- SERVICES --> */}
        <div>
          <h4 className="font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="hover:text-black transition">
              <Link href="/services/bond-cleaning-brisbane">Bond Cleaning Brisbane</Link>
            </li>
            <li className="hover:text-black transition">
              <Link href="/industry/office-cleaning">Office Cleanings</Link>
            </li>
            <li className="hover:text-black transition">
              <Link href="/services/pest-control-brisbane">Pest Control Brisbane</Link>
            </li>
            <li className="hover:text-black transition">
              <Link href="/industry/carpet-cleaning">Carpet Cleaning</Link>
            </li>
          </ul>
        </div>

        {/* <!-- INFO --> */}
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-black transition">
                <Link href="/about-us" className="hover:text-black transition">About Us</Link>
              </li>
              <li className="hover:text-black transition">
                <Link href="/blog" className="hover:text-black transition">News & Media</Link>
              </li>
              <li className="hover:text-black transition">
                <Link href="/contact" className="hover:text-black transition">Contact</Link>
              </li>
               <li className="hover:text-black transition">
                <Link href="/pricing" className="hover:text-black transition">Free Estimate</Link>
              </li>
          </ul>
        </div>

        {/* <!-- CONTACT --> */}
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>📞 {settings.company_phone}</li>
            <li>✉️ {settings.company_email}</li>
            <li>🏠 {settings.company_address}</li>
          </ul>
        </div>

      </div>

      <hr className="border-gray-200" />

      {/* <!-- BOTTOM BAR --> */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
        <p> © {new Date().getFullYear()} Brisbane. All rights reserved.</p>

        <div className="flex gap-6">
          <Link href="#" className="hover:text-black transition">Privacy Policy</Link>
          <Link href="#" className="hover:text-black transition">Terms of Service</Link>
          <Link href="#" className="hover:text-black transition">Cookies Settings</Link>
        </div>
      </div>

    </footer>


        </>
  );
}
