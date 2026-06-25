"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#works", label: "роботи" },
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav className="safe-top absolute left-0 right-0 top-0 z-30 flex items-center justify-between gap-3 px-4 pt-4 md:gap-4 md:px-10 md:pt-6">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 py-2.5 pl-3 pr-4 shadow-lg backdrop-blur-md md:py-3 md:pl-4 md:pr-6"
        >
          <CloudLogo />
          <span className="hidden text-sm font-normal tracking-tight text-white sm:inline">
            cloud agency
          </span>
        </Link>

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

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Закрити меню" : "Відкрити меню"}
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link
            href="/studio"
            className="rounded-full bg-white px-4 py-2.5 text-sm font-normal text-black shadow-lg transition-colors hover:bg-neutral-200 md:px-6 md:py-3"
          >
            почати
          </Link>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm md:hidden" />
      )}

      <div
        className={`safe-top fixed left-0 right-0 top-0 z-[25] border-b border-white/10 bg-black/90 px-4 pb-6 pt-[4.5rem] backdrop-blur-xl transition-transform duration-300 md:hidden ${
          open ? "translate-y-0" : "-translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3.5 text-base text-white/90 transition-colors active:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
