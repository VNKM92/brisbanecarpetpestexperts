"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ServicesSidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Bond Cleaning Brisbane", href: "/services/bond-cleaning-brisbane" },
    { name: "End Of Lease Cleaning Brisbane", href: "/services/end-of-lease-cleaning-brisbane" },
    { name: "Pre Sale Cleaning Brisbane", href: "/services/pre-sale-cleaning-brisbane/" },
    { name: "Pest Control Brisbane", href: "/services/pest-control-brisbane/" },
  ];

  const activeClass =
    "bg-emerald-500 text-white font-semibold";
  const inactiveClass =
    "bg-gray-100 hover:bg-emerald-400 hover:text-white text-gray-700";

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-3">
      <h2 className="text-lg font-semibold mb-4">Services We Offer</h2>

      {menu.map((item) => {
        const isActive = pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-2 rounded transition ${
              isActive ? activeClass : inactiveClass
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
}
