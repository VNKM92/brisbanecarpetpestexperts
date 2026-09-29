"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Company",
      href: "#",
      submenu: [
        { name: "About Us", href: "/about-us" },
        { name: "How It Works", href: "/company/how-it-works" },
        { name: "Leadership Team", href: "/company/team" },
        { name: "Our Location", href: "/company/locations" },
        { name: "Help & FAQs", href: "/company/faqs" },
        { name: "Our Gallery", href: "/company/gallery" },
        // {
        //   name: "Team",
        //   href: "/about/team",
        //   submenu: [
        //     { name: "Leadership", href: "/about/team/leadership" },
        //     { name: "Careers", href: "/about/careers" },
        //   ],
        // },
      ],
    },

    // Services Mega menu sections
    {
      name: "Services",
      href: "/services",
      mega: true,
      columns: [
        {
          subtitle: "Domestic Services",
          items: [
            { name: "Bond Cleaning Brisbane", href: "/services/bond-cleaning-brisbane" },
            { name: "End Of Lease Cleaning Brisbane", href: "/services/end-of-lease-cleaning-brisbane" },
            { name: "Pre Sale-Cleaning Brisbane, ", href: "/services/pre-sale-cleaning-brisbane" },
            { name: "Pest Control Brisbane", href: "/services/pest-control-brisbane" },
          ],
        },
        {
          subtitle: "Commercial Services",
          items: [
            { name: "Age Care Cleaning", href: "/industry/age-care-cleaning" },
            { name: "Carpet Cleaning", href: "/industry/carpet-cleaning" },
            { name: "Hotel Cleaning Brisbane", href: "/industry/hotel-cleaning-brisbane" },
            { name: "Industrial Cleaning", href: "/industry/industrial-cleaning" },
            { name: "Lounge Cleaning", href: "/industry/lounge-cleaning" },
            { name: "Mattress Cleaning", href: "/industry/mattress-cleaning" },
            { name: "Office Cleaning", href: "/industry/office-cleaning" },
            { name: "Tile And Grout Cleaning", href: "/industry/tile-and-grout-cleaning" },
            { name: "Upholstery Cleaning", href: "/industry/upholstery-cleaning" },
          ],
        },
       
      ],
    },
    // {
    //   name: "Services",
    //   href: "/services", 
    //   submenu: [
    //     { name: "Services", href: "/services" },
    //     { name: "Bond Cleaning Brisbane", href: "/services/bond-cleaning" },
    //     { name: "Regular Cleaning", href: "/services/regular-cleaning" },
    //     {
    //       name: "Deep Cleaning",
    //       href: "/services/deep-clp''['eaning",
    //       submenu: [
    //         { name: "Kitchen", href: "/services/deep-cleaning/kitchen" },
    //         { name: "Bathroom", href: "/services/deep-cleaning/bathroom" },
    //         { name: "Commercial Cleaning", href: "/services" },
    //         { name: "Age Care Cleaning", href: "/services/bond-cleaning" },
    //         { name: "Hotel Cleaning Brisbane", href: "/services/regular-cleaning" },
    //         { name: "Indutrial Cleaning", href: "/services/regular-cleaning" },
    //         { name: "Lounge Cleaning", href: "/services/regular-cleaning" },
    //         { name: "Mattress Cleaning", href: "/services/regular-cleaning" },
    //         { name: "Office Cleaning", href: "/services/regular-cleaning" },
    //         { name: "Tile And Grout Cleaning", href: "/services/regular-cleaning" },
    //       ],
    //     },
    //   ],
       
    // },
    
    {
      name: "Prices",
      href: "/prices",
      submenu: [
        // { name: "Blog", href: "/blog" },
        { name: "Pricing", href: "/pricing" },
        { name: "Special Offer", href: "/special-offers" },
        { name: "Request An Estimate", href: "/request-estimate" },
        
      ],
    },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    // Mega menu sections
    // {
    //   name: "Blog",
    //   href: "/blog",
    //   mega: true,
    //   columns: [
    //     {
    //       subtitle: "Latest Content",
    //       items: [
    //         { name: "Latest posts", href: "/blog" },
    //         { name: "Guides", href: "/blog/guides" },
    //         { name: "Cleaning Tips", href: "/blog/tips" },
    //       ],
    //     },
    //     {
    //       subtitle: "Case Studies",
    //       items: [
    //         { name: "Case Studies", href: "/blog/case-studies" },
    //         { name: "Customer Stories", href: "/blog/stories" },
    //         { name: "Industry News", href: "/blog/news" },
    //       ],
    //     },
    //     {
    //       subtitle: "Media",
    //       items: [
    //         { name: "How-to Videos", href: "/blog/videos" },
    //         { name: "Product Reviews", href: "/blog/reviews" },
    //         { name: "Events", href: "/blog/events" },
    //       ],
    //     },
    //   ],
    // },
    
    
  ];

  const [openMenus, setOpenMenus] = useState({});
  const menuRefs = useRef({});

  useEffect(() => {
    // close all open desktop menus when clicking outside
    const onDoc = (e) => {
      const anyOpen = Object.keys(openMenus).some((k) => openMenus[k]);
      if (!anyOpen) return;
      const inside = Object.values(menuRefs.current).some((el) => el && el.contains(e.target));
      if (!inside) setOpenMenus({});
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [openMenus]);

  const toggleMenu = (key) => {
    setOpenMenus((s) => ({ ...s, [key]: !s[key] }));
  };

  const handleTopKey = (e, key) => {
    // Provide basic keyboard support: ArrowDown => focus first item, Enter/Space toggles, Escape closes
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const el = menuRefs.current[key];
      const first = el && el.querySelector("a,button");
      if (first) first.focus();
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu(key);
    }
    if (e.key === "Escape") {
      setOpenMenus((s) => ({ ...s, [key]: false }));
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#fffdf8] backdrop-blur-md shadow-sm">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="h-8" />
          <span className="text-2xl font-semibold text-white">.</span>
        </Link>

        {/* Desktop menu */}
        <div role="menubar" aria-label="Main menu" className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <div key={link.href} className="relative group">
              {/* top-level button */}
              {!link.submenu && !link.mega ? (
                <Link
                  href={link.href}
                  className={`pb-1 border-b-2 transition ${
                    pathname === link.href
                      ? "text-green-700 border-orange-400 font-semibold"
                      : "border-transparent hover:border-green-300"
                  }`}
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  className={`flex items-center gap-1 pb-1 border-b-2 transition bg-transparent ${
                    pathname === link.href
                      ? "text-green-700 border-orange-400 font-semibold"
                      : "border-transparent hover:border-orange-300"
                  }`}
                  aria-haspopup={!!(link.submenu || link.mega)}
                  aria-expanded={!!openMenus[link.name]}
                  onKeyDown={(e) => handleTopKey(e, link.name)}
                >
                  <span className="flex items-center gap-1">
                    {link.name}
                    <ChevronDown size={14} />
                  </span>
                </button>
              )}

              {/* dropdown - desktop: regular submenu */}
              {link.submenu && !link.mega && (
                <div
                  ref={(el) => (menuRefs.current[link.name] = el)}
                  className={`absolute left-0 mt-2 w-48 bg-white border-gray-300 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transform -translate-y-1 group-hover:translate-y-0 scale-95 group-hover:scale-100 transition-all duration-200 ease-out origin-top`}
                  role="menu"
                  aria-label={`${link.name} submenu`}
                >
                  <ul className="py-2">
                    {link.submenu.map((s) => (
                      <li key={s.href} className="relative group">
                        {!s.submenu ? (
                          <Link
                            href={s.href}
                            className="block px-4 py-2 hover:bg-orange-50"
                            role="menuitem"
                          >
                            {s.name}
                          </Link>
                        ) : (
                          <div className="flex items-center justify-between px-4 py-2 hover:bg-orange-50">
                            <Link href={s.href} role="menuitem">{s.name}</Link>
                            <ChevronDown size={14} />
                          </div>
                        )}

                        {/* sub-submenu */}
                        {s.submenu && (
                          <div
                            ref={(el) => (menuRefs.current[`${link.name}-${s.name}`] = el)}
                            className="absolute top-0 left-full ml-1 mt-0 w-44 bg-white border-gray-300 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transform -translate-y-1 group-hover:translate-y-0 scale-95 group-hover:scale-100 transition-all duration-400 ease-out origin-left"
                            role="menu"
                            aria-label={`${s.name} submenu`}
                          >
                            <ul className="py-2">
                              {s.submenu.map((ss) => (
                                <li key={ss.href}>
                                  <Link
                                    href={ss.href}
                                    className="block px-4 py-2 hover:bg-green-50"
                                    role="menuitem"
                                  >
                                    {ss.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* mega menu - desktop: wide multi-column panel */}
              {link.mega && (
                <div
                  ref={(el) => (menuRefs.current[link.name] = el)}
                  className={`absolute left-0 mt-2 w-screen max-w-2xl bg-white border-gray-300 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transform -translate-y-1 group-hover:translate-y-0 transition-all duration-200 ease-out origin-top`}
                  role="menu"
                  aria-label={`${link.name} mega menu`}
                >
                  <div className="px-6 py-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-1">
                      {link.columns.map((col, ci) => {
                        const subtitle = col.subtitle;
                        const items = col.items || col;
                        return (
                          <div key={ci} className="space-y-3">
                            {subtitle && (
                              <h3 className="text-sm font-semibold text-gray-900 border-b border-gray-200 pb-2">
                                {subtitle}
                              </h3>
                            )}
                            <div className="space-y-2">
                              {items.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  className="block text-sm text-gray-700 hover:text-green-700 hover:bg-orange-50 rounded px-2 py-1 transition"
                                  role="menuitem"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          

          <Link href="/request-estimate" className="bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 transition font-medium text-sm shadow-sm inline-block">
            Request Service
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className="md:hidden"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          {navLinks.map((link) => (
            <div key={link.href} className="border-b1">
              {!link.submenu && !link.mega ? (
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-6 py-3 ${
                    pathname === link.href ? "bg-orange-100 text-green-700" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ) : link.mega ? (
                <div>
                  <button
                    onClick={() => toggleMenu(link.name)}
                    className="w-full text-left px-6 py-3 flex items-center justify-between"
                    aria-expanded={!!openMenus[link.name]}
                  >
                    <span>{link.name}</span>
                    <ChevronDown size={14} className={`${openMenus[link.name] ? "rotate-180" : ""} transition-transform duration-200`} />
                  </button>

                  <div className={`pl-6 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${openMenus[link.name] ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2">
                      {link.columns.map((col, ci) => {
                        const subtitle = col.subtitle;
                        const items = col.items || col;
                        return (
                          <div key={ci} className="space-y-2">
                            {subtitle && (
                              <h4 className="text-sm font-semibold text-gray-900 py-1">
                                {subtitle}
                              </h4>
                            )}
                            <div className="space-y-1">
                              {items.map((item) => (
                                <Link
                                  href={item.href}
                                  key={item.href}
                                  onClick={() => setMenuOpen(false)}
                                  className="block px-6 py-2 text-sm hover:text-green-700"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => toggleMenu(link.name)}
                    className="w-full text-left px-6 py-3 flex items-center justify-between"
                    aria-expanded={!!openMenus[link.name]}
                  >
                    <span>{link.name}</span>
                    <ChevronDown size={14} className={`${openMenus[link.name] ? "rotate-180" : ""} transition-transform duration-200`} />
                  </button>

                  <div className={`pl-6 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${openMenus[link.name] ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    {link.submenu.map((s) => (
                      <div key={s.href} className="border-t">
                        {!s.submenu ? (
                          <Link
                            href={s.href}
                            onClick={() => setMenuOpen(false)}
                            className="block px-6 py-3"
                          >
                            {s.name}
                          </Link>
                        ) : (
                          <div>
                            <button
                              onClick={() => toggleMenu(`${link.name}-${s.name}`)}
                              className="w-full text-left px-6 py-3 flex items-center justify-between"
                            >
                              <span>{s.name}</span>
                              <ChevronDown size={14} className={`${openMenus[`${link.name}-${s.name}`] ? "rotate-180" : ""} transition-transform duration-200`} />
                            </button>

                            <div className={`pl-6 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${openMenus[`${link.name}-${s.name}`] ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                              {s.submenu && s.submenu.map((ss) => (
                                <Link
                                  href={ss.href}
                                  key={ss.href}
                                  onClick={() => setMenuOpen(false)}
                                  className="block px-6 py-3"
                                >
                                  {ss.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link
            href="/request-estimate"
            onClick={() => setMenuOpen(false)}
            className="m-4 block text-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-full font-medium shadow-sm transition"
          >
            Request Service
          </Link>
        </div>
      )}
    </header>
  );
}
