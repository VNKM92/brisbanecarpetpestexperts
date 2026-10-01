"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Phone,
  Mail,
  Clock,
  MapPin,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Building,
  Home,
  Tag,
  ArrowRight,
} from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuRefs = useRef({});

  const [settings, setSettings] = useState({
    header_logo: "/logo.png",
    site_logo: "/logo.png",
    site_name: "Brisbane Carpet & Pest Experts",
    phone_number: "0434 061 188",
    phone_tel: "0434061188",
    email_address: "info@brisbanecarpetpestexperts.com.au",
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

  // Track scroll position for navbar style transformation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setOpenMenus({});
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  // Close desktop dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const anyOpen = Object.keys(openMenus).some((k) => openMenus[k]);
      if (!anyOpen) return;
      const inside = Object.values(menuRefs.current).some(
        (el) => el && el.contains(e.target)
      );
      if (!inside) setOpenMenus({});
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openMenus]);

  const toggleMenu = (key) => {
    setOpenMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Company",
      href: "/about-us",
      submenu: [
        {
          name: "About Us",
          href: "/about-us",
          desc: "Our story, 10+ years experience & mission",
        },
        {
          name: "How It Works",
          href: "/company/how-it-works",
          desc: "Simple 4-step booking to completion process",
        },
        {
          name: "Our Team",
          href: "/company/team",
          desc: "Meet certified cleaning & pest technicians",
        },
        {
          name: "Service Locations",
          href: "/company/locations",
          desc: "Suburbs across Greater Brisbane & Moreton Bay",
        },
        {
          name: "Before & After Gallery",
          href: "/company/gallery",
          desc: "Real job photos and transformations",
        },
        {
          name: "Help & FAQs",
          href: "/company/faqs",
          desc: "Answers to bond return, drying times & safety",
        },
      ],
    },
    {
      name: "Services",
      href: "/services",
      mega: true,
      columns: [
        {
          category: "Domestic & Move-Out Cleaning",
          icon: <Home className="w-4 h-4 text-emerald-600" />,
          items: [
            {
              name: "Bond Cleaning Brisbane",
              href: "/services/bond-cleaning-brisbane",
              badge: "100% Bond Back",
              desc: "REIQ approved vacate cleans with free re-clean",
            },
            {
              name: "End of Lease Cleaning",
              href: "/services/end-of-lease-cleaning-brisbane",
              desc: "Complete move out tenancy cleaning packages",
            },
            {
              name: "Pest Control Brisbane",
              href: "/services/pest-control-brisbane",
              badge: "Certified",
              desc: "Safe treatments for fleas, cockroaches & spiders",
            },
            {
              name: "Pre-Sale Cleaning",
              href: "/services/pre-sale-cleaning-brisbane",
              desc: "Inspection-ready presentation for top value",
            },
            {
              name: "Deep Cleaning Services",
              href: "/services/deep-cleaning",
              desc: "Intensive spring cleaning & kitchen detailing",
            },
          ],
        },
        {
          category: "Commercial & Specialist Care",
          icon: <Building className="w-4 h-4 text-emerald-600" />,
          items: [
            {
              name: "Carpet Steam Cleaning",
              href: "/industry/carpet-cleaning",
              badge: "Fast Dry",
              desc: "Hot water extraction & stain removal",
            },
            {
              name: "Upholstery & Sofa Cleaning",
              href: "/industry/upholstery-cleaning",
              desc: "Fabric, couch & armchair deep sanitization",
            },
            {
              name: "Tile & Grout Cleaning",
              href: "/industry/tile-and-grout-cleaning",
              desc: "High-pressure heated restorative scrubbing",
            },
            {
              name: "Commercial Office Cleaning",
              href: "/industry/office-cleaning",
              desc: "Tailored daily & after-hours workplace cleaning",
            },
            {
              name: "Mattress Sanitization",
              href: "/industry/mattress-cleaning",
              desc: "Anti-allergen dust mite & stain eradication",
            },
            {
              name: "Lounge & Leather Care",
              href: "/industry/lounge-cleaning",
              desc: "Leather conditioning & lounge steam rinse",
            },
            {
              name: "Industrial & Warehouse",
              href: "/industry/industrial-cleaning",
              desc: "Heavy duty floor degreasing & plant cleaning",
            },
            {
              name: "Aged Care Cleaning",
              href: "/industry/age-care-cleaning",
              desc: "Hospital-grade disinfection & hygiene",
            },
          ],
        },
      ],
      promo: {
        title: "Bundle & Save Up to 20%",
        desc: "Combine Bond Cleaning + Carpet Steam + End of Lease Pest Control for guaranteed real estate sign-off.",
        linkText: "Get Instant Quote",
        linkHref: "/request-estimate",
      },
    },
    {
      name: "Pricing",
      href: "/pricing",
      submenu: [
        {
          name: "Standard Price List",
          href: "/pricing",
          desc: "Transparent rates for all services",
        },
        {
          name: "Special Package Deals",
          href: "/special-offers",
          desc: "Exclusive discounts & combo savings",
        },
        {
          name: "Online Quote Calculator",
          href: "/request-estimate",
          desc: "Calculate your instant estimate in 60 seconds",
        },
      ],
    },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const isLinkActive = (link) => {
    if (link.href === "/" && pathname === "/") return true;
    if (link.href !== "/" && pathname.startsWith(link.href)) return true;
    if (link.mega && link.columns) {
      return link.columns.some((col) =>
        col.items.some((item) => pathname === item.href || pathname.startsWith(item.href))
      );
    }
    if (link.submenu) {
      return link.submenu.some(
        (sub) => pathname === sub.href || pathname.startsWith(sub.href)
      );
    }
    return false;
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 select-none">
      {/* Top Utility Bar - Desktop & Tablet */}
      <div className="bg-[#1b4324] text-white text-xs font-medium border-b border-emerald-800/40 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-emerald-200">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Greater Brisbane, QLD & Suburbs</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-emerald-200">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Mon - Sun: 7:00 AM - 7:00 PM</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-yellow-300 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
              <span>100% Bond Back Guarantee</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={`mailto:${settings.email_address || "info@brisbanecarpetpestexperts.com.au"}`}
              className="hidden lg:flex items-center gap-1.5 hover:text-emerald-300 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>{settings.email_address || "info@brisbanecarpetpestexperts.com.au"}</span>
            </a>
            <a
              href={`tel:${settings.phone_tel || "0434061188"}`}
              className="flex items-center gap-1.5 font-bold text-white bg-emerald-700/80 hover:bg-emerald-600 px-3 py-1 rounded-full transition-colors border border-emerald-500/40"
            >
              <Phone className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
              <span>Call: {settings.phone_number || "0434 061 188"}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#fffdf8]/95 backdrop-blur-md shadow-md py-2.5"
            : "bg-[#fffdf8] shadow-sm py-3.5"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus:outline-none"
            aria-label="Brisbane Carpet & Pest Experts Home"
          >
            <div className="relative flex items-center">
              <img
                src={settings.header_logo || settings.site_logo || "/logo.png"}
                alt={settings.site_name || "Brisbane Carpet & Pest Experts"}
                className="h-9 sm:h-11 w-auto max-w-[210px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div
            role="menubar"
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-2"
          >
            {navLinks.map((link) => {
              const active = isLinkActive(link);

              return (
                <div
                  key={link.name}
                  className="relative group py-2"
                  ref={(el) => (menuRefs.current[link.name] = el)}
                >
                  {!link.submenu && !link.mega ? (
                    <Link
                      href={link.href}
                      className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-1 ${
                        active
                          ? "text-[#1b4324] bg-emerald-100/70 shadow-sm"
                          : "text-gray-700 hover:text-[#1b4324] hover:bg-emerald-50/60"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => toggleMenu(link.name)}
                      aria-haspopup={true}
                      aria-expanded={!!openMenus[link.name]}
                      className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                        active
                          ? "text-[#1b4324] bg-emerald-100/70 shadow-sm"
                          : "text-gray-700 hover:text-[#1b4324] hover:bg-emerald-50/60"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180"
                      />
                    </button>
                  )}

                  {/* Standard Submenu Dropdown */}
                  {link.submenu && !link.mega && (
                    <div
                      className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out transform -translate-y-2 group-hover:translate-y-0 z-50 overflow-hidden"
                      role="menu"
                    >
                      {link.submenu.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2.5 hover:bg-emerald-50/80 transition-colors group/item"
                          role="menuitem"
                        >
                          <div className="text-sm font-semibold text-gray-800 group-hover/item:text-emerald-700 flex items-center justify-between">
                            <span>{item.name}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-gray-400 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                          </div>
                          {item.desc && (
                            <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                              {item.desc}
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Mega Menu Dropdown */}
                  {link.mega && (
                    <div
                      className="absolute top-full -left-40 xl:-left-28 mt-1 w-[820px] max-w-[90vw] bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out transform -translate-y-2 group-hover:translate-y-0 z-50 overflow-hidden"
                      role="menu"
                    >
                      <div className="grid grid-cols-12 gap-6">
                        {/* Service Columns */}
                        <div className="col-span-8 grid grid-cols-2 gap-6">
                          {link.columns.map((col, idx) => (
                            <div key={idx} className="space-y-3">
                              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                                {col.icon}
                                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                                  {col.category}
                                </h4>
                              </div>
                              <div className="space-y-1">
                                {col.items.map((item) => (
                                  <Link
                                    key={item.href}
                                    href={item.href}
                                    className="group/service block p-2 rounded-xl hover:bg-emerald-50/80 transition-all"
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs font-semibold text-gray-800 group-hover/service:text-emerald-700">
                                        {item.name}
                                      </span>
                                      {item.badge && (
                                        <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
                                          {item.badge}
                                        </span>
                                      )}
                                    </div>
                                    {item.desc && (
                                      <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                                        {item.desc}
                                      </p>
                                    )}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Promo Featured Card */}
                        <div className="col-span-4 bg-gradient-to-br from-emerald-900 via-emerald-800 to-[#122e19] rounded-2xl p-5 text-white flex flex-col justify-between shadow-inner">
                          <div className="space-y-2.5">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-yellow-400 text-emerald-950 rounded-full text-[10px] font-extrabold uppercase tracking-wide">
                              <Sparkles className="w-3 h-3" />
                              <span>Special Promo</span>
                            </div>
                            <h3 className="font-bold text-base leading-tight">
                              {link.promo.title}
                            </h3>
                            <p className="text-emerald-100 text-xs leading-relaxed">
                              {link.promo.desc}
                            </p>
                          </div>

                          <div className="pt-4 mt-4 border-t border-emerald-700/50 space-y-2">
                            <Link
                              href={link.promo.linkHref}
                              className="w-full inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-emerald-950 font-bold text-xs py-2.5 px-4 rounded-xl transition shadow-md"
                            >
                              <span>{link.promo.linkText}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                            <a
                              href={`tel:${settings.phone_tel || "0434061188"}`}
                              className="text-center block text-[11px] text-emerald-200 hover:text-white transition underline"
                            >
                              Or call {settings.phone_number || "0434 061 188"}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/request-estimate"
              className="relative inline-flex items-center gap-2 bg-[#ff8a00] hover:bg-[#e57c00] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Get Free Quote</span>
            </Link>
          </div>

          {/* Mobile Actions: Call Button & Hamburger */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <a
              href={`tel:${settings.phone_tel || "0434061188"}`}
              className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-sm"
              aria-label="Call Now"
            >
              <Phone className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
              <span>Call</span>
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 transition focus:outline-none"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Slide-Over Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#fffdf8] z-50 lg:hidden shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Drawer Header */}
        <div className="p-4 border-b border-gray-200/80 flex items-center justify-between bg-white">
          <img
            src={settings.header_logo || settings.site_logo || "/logo.png"}
            alt="Logo"
            className="h-8 w-auto max-w-[170px] object-contain"
          />
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Quick Action Buttons */}
        <div className="p-4 bg-emerald-950 text-white grid grid-cols-2 gap-2.5">
          <a
            href={`tel:${settings.phone_tel || "0434061188"}`}
            className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 px-3 rounded-xl text-xs font-bold transition shadow-sm"
          >
            <Phone className="w-3.5 h-3.5 text-yellow-300" />
            <span>Call Now</span>
          </a>
          <Link
            href="/request-estimate"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-1.5 bg-[#ff8a00] hover:bg-[#e57c00] text-white py-2.5 px-3 rounded-xl text-xs font-bold transition shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Instant Quote</span>
          </Link>
        </div>

        {/* Mobile Menu Links (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1 divide-y divide-gray-100">
          {navLinks.map((link) => {
            const active = isLinkActive(link);
            const isOpen = openMenus[link.name];

            if (!link.submenu && !link.mega) {
              return (
                <div key={link.name} className="pt-1">
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-3 rounded-xl font-semibold text-sm transition ${
                      active
                        ? "bg-emerald-100/70 text-emerald-900 font-bold"
                        : "text-gray-800 hover:bg-emerald-50/60"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                </div>
              );
            }

            if (link.submenu) {
              return (
                <div key={link.name} className="pt-1">
                  <button
                    onClick={() => toggleMenu(link.name)}
                    className="w-full flex items-center justify-between px-3 py-3 rounded-xl font-semibold text-sm text-gray-800 hover:bg-emerald-50/60 transition"
                  >
                    <span className={active ? "text-emerald-900 font-bold" : ""}>
                      {link.name}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-emerald-700" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-[500px] opacity-100 py-1" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pl-4 pr-1 space-y-1 bg-gray-50/80 rounded-xl py-2 my-1">
                      {link.submenu.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className={`block px-3 py-2 rounded-lg text-xs font-medium transition ${
                            pathname === item.href
                              ? "text-emerald-800 bg-emerald-100 font-bold"
                              : "text-gray-700 hover:text-emerald-700 hover:bg-white"
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            if (link.mega) {
              return (
                <div key={link.name} className="pt-1">
                  <button
                    onClick={() => toggleMenu(link.name)}
                    className="w-full flex items-center justify-between px-3 py-3 rounded-xl font-semibold text-sm text-gray-800 hover:bg-emerald-50/60 transition"
                  >
                    <span className={active ? "text-emerald-900 font-bold" : ""}>
                      {link.name}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-emerald-700" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-[850px] opacity-100 py-1" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pl-3 pr-1 space-y-3 bg-gray-50/90 rounded-xl p-3 my-1">
                      {link.columns.map((col, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800 pb-1 border-b border-gray-200/60">
                            {col.icon}
                            <span>{col.category}</span>
                          </div>
                          <div className="space-y-0.5">
                            {col.items.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMenuOpen(false)}
                                className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition ${
                                  pathname === item.href
                                    ? "text-emerald-800 bg-emerald-100 font-bold"
                                    : "text-gray-700 hover:text-emerald-800 hover:bg-white"
                                }`}
                              >
                                <span>{item.name}</span>
                                {item.badge && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                                    {item.badge}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>

        {/* Mobile Drawer Footer Info */}
        <div className="p-4 bg-gray-100/90 border-t border-gray-200 text-xs text-gray-600 space-y-2">
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% Bond Back Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500 shrink-0" />
            <span>Mon - Sun: 7:00 AM - 7:00 PM</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500 shrink-0" />
            <span>Serving All Brisbane Suburbs</span>
          </div>
        </div>
      </div>
    </header>
  );
}
