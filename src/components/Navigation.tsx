"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "📺 Live TV" },
    { href: "/dvr", label: "⏺ DVR" },
  ];

  return (
    <nav
      className="sticky top-0 z-50 w-full bg-catholic-navy/95 backdrop-blur-sm border-b border-white/10"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-catholic-gold text-lg focus:outline-none focus:ring-2 focus:ring-catholic-gold rounded"
          aria-label="CatholicTV Home"
        >
          <span aria-hidden="true">✝</span>
          <span>CatholicTV</span>
        </Link>
        <div className="flex items-center gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-catholic-gold
                ${pathname === href
                  ? "bg-catholic-gold text-black"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              aria-current={pathname === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
