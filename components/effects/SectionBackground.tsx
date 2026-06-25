"use client";

import { motion } from "framer-motion";

type SectionBgVariant = "aurora" | "spotlight" | "mesh" | "pulse" | "grid";

interface SectionBackgroundProps {
  variant?: SectionBgVariant;
}

export function SectionBackground({ variant = "aurora" }: SectionBackgroundProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#050505]" />

      {variant === "aurora" && (
        <>
          <motion.div
            className="section-blob absolute -left-1/4 top-0 h-[520px] w-[520px] rounded-full blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)",
            }}
            animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="section-blob absolute -right-1/4 top-1/3 h-[480px] w-[480px] rounded-full blur-[100px]"
            style={{
              background:
                "radial-gradient(circle, rgba(163,163,163,0.12) 0%, transparent 70%)",
            }}
            animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="section-grid absolute inset-0 opacity-[0.04]" />
        </>
      )}

      {variant === "spotlight" && (
        <>
          <motion.div
            className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full blur-[100px]"
            style={{
              background:
                "radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 65%)",
            }}
            animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-20 right-0 h-[400px] w-[400px] rounded-full blur-[90px]"
            style={{
              background:
                "radial-gradient(circle, rgba(115,115,115,0.15) 0%, transparent 70%)",
            }}
            animate={{ x: [0, -30, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {variant === "mesh" && (
        <>
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 40%, rgba(255,255,255,0.05) 100%)",
            }}
          />
          <motion.div
            className="absolute -left-20 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full blur-[110px]"
            style={{
              background:
                "radial-gradient(circle, rgba(82,82,82,0.25) 0%, transparent 70%)",
            }}
            animate={{ rotate: [0, 15, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="section-grid absolute inset-0 opacity-[0.06]" />
        </>
      )}

      {variant === "pulse" && (
        <>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]"
              animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 1.3,
                ease: "easeOut",
              }}
            />
          ))}
          <motion.div
            className="absolute right-0 top-0 h-full w-1/2 blur-[80px]"
            style={{
              background:
                "linear-gradient(225deg, rgba(255,255,255,0.06) 0%, transparent 60%)",
            }}
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {variant === "grid" && (
        <>
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.06), transparent)",
            }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="section-grid absolute inset-0 opacity-[0.05]" />
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <div className="section-noise absolute inset-0 opacity-[0.35]" />
    </div>
  );
}
