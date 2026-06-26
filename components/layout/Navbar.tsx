"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const homeLinks = [
  { href: "/#works", label: "роботи" },
  { href: "/#services", label: "послуги" },
  { href: "/#calculator", label: "калькулятор" },
  { href: "/#contact", label: "контакт" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || pathname !== "/"
          ? "border-white/10 bg-black/90 backdrop-blur-xl"
          : "border-transparent bg-black",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="text-sm font-normal lowercase tracking-tight text-white"
        >
          cloud agency
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {homeLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm lowercase text-white/60 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#calculator"
          className="rounded-full bg-white px-5 py-2.5 text-sm font-normal lowercase text-black transition-colors hover:bg-neutral-200"
        >
          порахувати
        </Link>
      </div>
    </header>
  );
}
