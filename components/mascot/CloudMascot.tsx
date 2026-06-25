"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { ComponentType } from "react";

export type CloudMascotVariant = "nimbus" | "fluffy" | "neon" | "pixel";

interface CloudMascotProps {
  variant?: CloudMascotVariant;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "w-40 h-48",
  md: "w-56 h-64 sm:w-64 sm:h-72",
  lg: "w-64 h-72 sm:w-80 sm:h-96 lg:w-[360px] lg:h-[420px]",
};

/** 3D Nimbus — Higgsfield-style render, animated float */
function NimbusMascot({ reduced }: { reduced: boolean }) {
  const float = reduced
    ? {}
    : {
        y: [0, -16, 0],
        rotate: [0, 1, 0, -1, 0],
      };

  return (
    <motion.div
      animate={float}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="relative h-full w-full"
    >
      <div
        className="absolute left-1/2 top-[55%] h-[45%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(129,140,248,0.5) 0%, rgba(34,211,238,0.2) 45%, transparent 70%)",
        }}
      />

      <Image
        src="/mascot/nimbus.png"
        alt="Nimbus — маскот Cloud Agency"
        fill
        priority
        className="object-contain object-bottom drop-shadow-[0_24px_48px_rgba(129,140,248,0.35)]"
        sizes="(max-width: 768px) 256px, 360px"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute -left-2 top-6 max-w-[150px] rounded-2xl border border-border/60 bg-surface/85 px-3 py-2 text-[10px] font-medium leading-snug text-foreground backdrop-blur-md sm:-left-6 sm:text-xs"
      >
        Привіт! Я <span className="text-accent">Nimbus</span> — збираємо твій
        сайт?
      </motion.div>
    </motion.div>
  );
}

function FluffyMascot({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      animate={reduced ? {} : { y: [0, -18, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="relative h-full w-full"
    >
      <div className="absolute inset-0 rounded-full bg-accent/20 blur-3xl" />
      <svg viewBox="0 0 200 200" className="relative h-full w-full">
        <circle cx="100" cy="110" r="70" fill="url(#fluffy)" />
        <circle cx="60" cy="95" r="35" fill="#E8E8F5" />
        <circle cx="140" cy="95" r="38" fill="#D4D6EE" />
        <circle cx="80" cy="70" r="28" fill="#F4F4F5" />
        <circle cx="120" cy="68" r="30" fill="#E8E8F5" />
        <circle cx="82" cy="108" r="10" fill="#0A0A0F" />
        <circle cx="118" cy="108" r="10" fill="#0A0A0F" />
        <circle cx="85" cy="105" r="3" fill="#fff" />
        <circle cx="121" cy="105" r="3" fill="#fff" />
        <path
          d="M88 128 Q100 138 112 128"
          stroke="#71717A"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <defs>
          <radialGradient id="fluffy">
            <stop stopColor="#F4F4F5" />
            <stop offset="1" stopColor="#9BA3D9" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

function NeonMascot({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      animate={
        reduced
          ? {}
          : {
              scale: [1, 1.04, 1],
            }
      }
      transition={{ duration: 3, repeat: Infinity }}
      className="relative h-full w-full"
      style={{
        filter: "drop-shadow(0 0 24px rgba(129,140,248,0.45))",
      }}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <path
          d="M100 40 C60 40 35 70 35 100 C20 105 10 120 10 138 C10 162 30 178 55 178 L145 178 C170 178 190 162 190 138 C190 120 180 105 165 100 C165 70 140 40 100 40Z"
          fill="none"
          stroke="url(#neonStroke)"
          strokeWidth="3"
        />
        <circle cx="80" cy="108" r="6" fill="#22D3EE" />
        <circle cx="120" cy="108" r="6" fill="#818CF8" />
        <defs>
          <linearGradient id="neonStroke" x1="10" y1="40" x2="190" y2="178">
            <stop stopColor="#818CF8" />
            <stop offset="1" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

const variants: Record<
  CloudMascotVariant,
  ComponentType<{ reduced: boolean }>
> = {
  nimbus: NimbusMascot,
  fluffy: FluffyMascot,
  neon: NeonMascot,
  pixel: FluffyMascot,
};

export function CloudMascot({
  variant = "nimbus",
  className,
  size = "lg",
}: CloudMascotProps) {
  const reduced = useReducedMotion() ?? false;
  const Mascot = variants[variant];

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        sizes[size],
        className,
      )}
      role="img"
      aria-label="Nimbus — маскот Cloud Agency"
    >
      <Mascot reduced={reduced} />
    </div>
  );
}
