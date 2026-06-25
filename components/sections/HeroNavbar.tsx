"use client";

import Link from "next/link";

const navLinks = [
  { href: "#studio", label: "studio" },
  { href: "#services", label: "послуги" },
  { href: "#process", label: "процес" },
  { href: "#contact", label: "контакт" },
];

function CloudLogo() {
  return (
    <svg
      viewBox="0 0 256 256"
      className="h-5 w-5 shrink-0"
      fill="#ffffff"
      aria-hidden
    >
      <path d="M64 160c-17.7 0-32-14.3-32-32 0-15.5 11.1-28.4 25.8-31.2C62.2 78.2 82.9 64 107 64c14.8 0 28.1 6.4 37.3 16.6C152.5 72.2 166.8 64 183 64c26.5 0 48 21.5 48 48 0 1.3-.1 2.6-.2 3.8 14.1 5.2 24.2 18.8 24.2 34.7 0 20.4-16.6 37-37 37H64z" />
    </svg>
  );
}

export function HeroNavbar() {
  return (
    <nav className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between gap-4 px-6 pt-6 md:px-10">
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 py-3 pl-4 pr-6 shadow-lg backdrop-blur-md">
        <CloudLogo />
        <span className="text-sm font-normal tracking-tight text-white">
          cloud agency
        </span>
      </div>

      <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/60 px-3 py-2 shadow-lg backdrop-blur-md md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full px-5 py-2 text-sm text-neutral-300 transition-colors hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <Link
        href="/studio"
        className="rounded-full bg-white px-6 py-3 text-sm font-normal text-black shadow-lg transition-colors hover:bg-neutral-200"
      >
        почати
      </Link>
    </nav>
  );
}
