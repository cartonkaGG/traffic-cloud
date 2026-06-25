"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

interface LiquidGlassTextProps {
  children: React.ReactNode;
  className?: string;
}

export function LiquidGlassText({ children, className }: LiquidGlassTextProps) {
  const reduced = useReducedMotion();

  return (
    <motion.span
      className={cn("liquid-glass-text inline-block", className)}
      animate={
        reduced
          ? {}
          : {
              y: [0, -3, 0],
            }
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
