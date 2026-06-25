"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface LiquidGlassTextProps {
  children: React.ReactNode;
  className?: string;
}

export function LiquidGlassText({ children, className }: LiquidGlassTextProps) {
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const animateFloat = !reduced && !isMobile;

  return (
    <motion.span
      className={cn("liquid-glass-text inline-block", className)}
      animate={
        animateFloat
          ? {
              y: [0, -3, 0],
            }
          : {}
      }
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <span className="liquid-glass-text__panel" aria-hidden />
      <span className="liquid-glass-text__shine" aria-hidden />
      <span className="liquid-glass-text__label">{children}</span>
    </motion.span>
  );
}
