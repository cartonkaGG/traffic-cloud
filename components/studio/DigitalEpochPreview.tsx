"use client";

import { DIGITAL_EPOCH_LOGOS, DIGITAL_EPOCH_VIDEO } from "@/lib/theme-assets";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

interface DigitalEpochPreviewProps {
  compact?: boolean;
}

export function DigitalEpochPreview({ compact = false }: DigitalEpochPreviewProps) {
  const logos = [...DIGITAL_EPOCH_LOGOS, ...DIGITAL_EPOCH_LOGOS];

  return (
    <div
      className="bg-[#f9fafb] px-2 pb-6 pt-2 font-[family-name:var(--font-inter)] sm:px-4 sm:pb-8 sm:pt-4"
      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
    >
      <section
        className={cn(
          "relative mx-auto flex w-full flex-col overflow-hidden border border-slate-200/50 bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)]",
          compact
            ? "h-[min(420px,72dvh)] rounded-[24px]"
            : "h-[min(600px,75dvh)] rounded-[32px] sm:rounded-[48px]",
        )}
      >
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="h-full w-full scale-105 object-cover"
          >
            <source src={DIGITAL_EPOCH_VIDEO} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/30" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={cn(
            "relative z-20 flex flex-1 flex-col items-start",
            compact ? "px-4 pt-6" : "px-5 pt-8 sm:px-10 sm:pt-12 md:px-16 md:pt-16",
          )}
        >
          <h1
            className={cn(
              "font-[family-name:var(--font-outfit)] font-medium leading-tight tracking-tight text-[#0a1b33]",
              compact ? "text-xl" : "text-2xl sm:text-4xl md:text-[56px]",
            )}
            style={{ fontFamily: "var(--font-outfit), Outfit, sans-serif" }}
          >
            Фундамент нової
            <br />
            цифрової епохи
          </h1>
          <p
            className={cn(
              "mt-2 max-w-md text-[#64748b]",
              compact ? "text-[11px] leading-snug" : "mt-3 text-xs sm:text-sm md:text-[15px]",
            )}
          >
            Проєктуємо продукти, будуємо екосистеми та закладаємо основу
            децентралізованого вебу для бізнесу, розробників і спільнот.
          </p>
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "mt-4 rounded-full bg-[#0a152d] font-medium text-white",
              compact ? "px-4 py-2 text-[11px]" : "mt-5 px-5 py-2.5 text-xs sm:px-6 sm:py-3 sm:text-sm",
            )}
          >
            Звʼязатись
          </motion.button>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className={cn(
            "absolute left-1/2 z-30 flex -translate-x-1/2 items-center rounded-full border border-slate-200/40 bg-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.08)] backdrop-blur-2xl",
            compact
              ? "bottom-4 max-w-[calc(100%-1.5rem)] px-1 py-1"
              : "bottom-6 px-1.5 py-1.5 sm:bottom-10",
          )}
        >
          <div
            className={cn(
              "flex shrink-0 items-center justify-center rounded-full border border-slate-100 bg-white shadow-sm",
              compact ? "h-7 w-7 text-xs" : "h-8 w-8 text-sm sm:h-9 sm:w-9",
            )}
          >
            ✦
          </div>
          {!compact && (
            <>
              <button
                type="button"
                className="hidden px-3 text-[10px] font-semibold text-slate-500 sm:block sm:px-4 sm:text-xs"
              >
                Продукти
              </button>
              <button
                type="button"
                className="hidden px-3 text-[10px] font-semibold text-slate-500 md:block sm:px-4 sm:text-xs"
              >
                Документація
              </button>
            </>
          )}
          <button
            type="button"
            className={cn(
              "ml-0.5 flex items-center gap-0.5 rounded-full border border-slate-200/60 bg-white font-semibold text-[#0a1b33] shadow-sm",
              compact
                ? "px-2.5 py-1 text-[10px]"
                : "ml-1 gap-1 px-3 py-1.5 text-[10px] sm:px-5 sm:py-2 sm:text-xs",
            )}
          >
            На звʼязку
            <ChevronRight className={compact ? "h-2.5 w-2.5" : "h-3 w-3"} />
          </button>
        </motion.nav>
      </section>

      <div className="logo-marquee-mask mt-4 overflow-hidden py-2 sm:mt-8">
        <div className="logo-marquee-track flex w-max gap-2 sm:gap-3">
          {logos.map((logo, i) => (
            <div
              key={`${logo.alt}-${i}`}
              className={cn(
                "group relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200/60 bg-white shadow-sm transition-all hover:border-slate-300",
                compact ? "h-12 w-20" : "h-16 w-28 sm:h-24 sm:w-40",
              )}
            >
              <div
                className={`absolute inset-0 scale-150 bg-gradient-to-br opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 ${logo.gradient}`}
              />
              <Image
                src={logo.src}
                alt={logo.alt}
                width={80}
                height={32}
                className={cn(
                  "relative z-10 w-auto opacity-70 transition-all group-hover:brightness-0 group-hover:invert",
                  compact ? "h-4" : "h-6 sm:h-8",
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
