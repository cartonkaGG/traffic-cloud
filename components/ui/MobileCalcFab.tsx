"use client";

import { cn } from "@/lib/utils";
import { Calculator } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

function overlapsFabZone(rect: DOMRect, inset = 88) {
  const zoneTop = window.innerHeight - inset;
  return rect.top < window.innerHeight && rect.bottom > zoneTop;
}

export function MobileCalcFab() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth >= 768) {
        setShow(false);
        return;
      }

      if (window.scrollY < 320) {
        setShow(false);
        return;
      }

      const calculator = document.getElementById("calculator");
      if (calculator && overlapsFabZone(calculator.getBoundingClientRect(), 120)) {
        setShow(false);
        return;
      }

      const worksCta = document.querySelector("[data-works-cta]");
      if (worksCta && overlapsFabZone(worksCta.getBoundingClientRect(), 100)) {
        setShow(false);
        return;
      }

      const contact = document.getElementById("contact");
      if (contact && overlapsFabZone(contact.getBoundingClientRect(), 100)) {
        setShow(false);
        return;
      }

      setShow(true);
    };

    const onResize = () => onScroll();

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 z-40 flex justify-end px-4 md:hidden",
        "bottom-[max(1rem,env(safe-area-inset-bottom))]",
        "transition-all duration-300 ease-out",
        show ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      )}
      aria-hidden={!show}
    >
      <Link
        href="#calculator"
        aria-label="Перейти до замовлення сайту"
        className={cn(
          "pointer-events-auto flex max-w-[calc(100vw-2rem)] items-center gap-2.5 rounded-full border border-white/20 bg-black/75 py-2.5 pl-2.5 pr-4 text-white shadow-[0_8px_32px_rgba(0,0,0,0.55)] backdrop-blur-xl",
          "active:scale-[0.97] transition-transform",
          !show && "pointer-events-none",
        )}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-black">
          <Calculator className="h-4 w-4" strokeWidth={2.25} />
        </span>
        <span className="min-w-0 truncate text-[13px] font-medium leading-none tracking-tight">
          Замовити сайт
        </span>
      </Link>
    </div>
  );
}
