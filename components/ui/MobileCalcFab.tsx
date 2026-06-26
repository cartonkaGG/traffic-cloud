"use client";

import { cn } from "@/lib/utils";
import { Calculator } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function MobileCalcFab() {
  const [visible, setVisible] = useState(false);
  const [nearCalculator, setNearCalculator] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 280);

      const el = document.getElementById("calculator");
      if (!el) {
        setNearCalculator(false);
        return;
      }
      const rect = el.getBoundingClientRect();
      setNearCalculator(rect.top < window.innerHeight * 0.6 && rect.bottom > 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Link
      href="#calculator"
      aria-label="Перейти до калькулятора вартості"
      className={cn(
        "fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-white px-5 py-3.5 text-sm font-medium text-black shadow-[0_8px_32px_rgba(0,0,0,0.45)] transition-all duration-300 md:hidden",
        visible && !nearCalculator
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <Calculator className="h-4 w-4" />
      розрахувати вартість
    </Link>
  );
}
