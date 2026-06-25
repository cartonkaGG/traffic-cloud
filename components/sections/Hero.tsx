"use client";

import { LiquidGlassText } from "@/components/effects/LiquidGlassText";
import { HeroNavbar } from "@/components/sections/HeroNavbar";
import { motion, useReducedMotion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.15 + i * 0.12,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-0 bg-black/20" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/70" />

      <HeroNavbar />

      <div className="relative z-10 h-full w-full">
        <motion.h1
          custom={0}
          initial={reduced ? false : "hidden"}
          animate="visible"
          variants={fadeUp}
          className="hero-title absolute left-4 top-[16%] text-[11vw] md:left-10 md:text-[10vw]"
        >
          <LiquidGlassText>маштабуйся</LiquidGlassText>
        </motion.h1>

        <motion.h1
          custom={1}
          initial={reduced ? false : "hidden"}
          animate="visible"
          variants={fadeUp}
          className="hero-title absolute right-4 top-[36%] text-[11vw] md:right-10 md:text-[10vw]"
        >
          <LiquidGlassText>разом</LiquidGlassText>
        </motion.h1>

        <motion.h1
          custom={2}
          initial={reduced ? false : "hidden"}
          animate="visible"
          variants={fadeUp}
          className="hero-title absolute left-[10%] top-[56%] text-[11vw] md:left-[22%] md:text-[10vw]"
        >
          <LiquidGlassText>з нами</LiquidGlassText>
        </motion.h1>

        <motion.p
          custom={3}
          initial={reduced ? false : "hidden"}
          animate="visible"
          variants={fadeUp}
          className="hero-glass absolute left-6 top-[48%] max-w-[280px] text-[15px] font-normal leading-snug md:left-10"
        >
          веб-розробка, telegram-боти та автоматизація — від лендінгу до crm,
          n8n і ai-воркфлоу під ключ
        </motion.p>

        <motion.div
          custom={4}
          initial={reduced ? false : "hidden"}
          animate="visible"
          variants={fadeUp}
          className="hero-stat absolute right-6 top-[12%] md:right-24"
        >
          <div className="flex items-center justify-end gap-3">
            <span className="hidden h-px w-24 rotate-[20deg] bg-white/50 md:block" />
            <span className="text-4xl font-medium tracking-tight md:text-5xl">
              48+
            </span>
          </div>
          <p className="mt-1 text-right text-xs text-white/80 md:text-sm">
            сайтів і ботів
          </p>
        </motion.div>

        <motion.div
          custom={5}
          initial={reduced ? false : "hidden"}
          animate="visible"
          variants={fadeUp}
          className="hero-stat absolute bottom-20 left-6 md:bottom-24 md:left-20"
        >
          <div className="flex items-center gap-3">
            <span className="text-4xl font-medium tracking-tight md:text-5xl">
              24/7
            </span>
            <span className="hidden h-px w-24 rotate-[-20deg] bg-white/50 md:block" />
          </div>
          <p className="mt-1 text-xs text-white/80 md:text-sm">боти онлайн</p>
        </motion.div>

        <motion.div
          custom={6}
          initial={reduced ? false : "hidden"}
          animate="visible"
          variants={fadeUp}
          className="hero-stat absolute bottom-16 right-6 md:bottom-20 md:right-20"
        >
          <div className="flex items-center justify-end gap-3">
            <span className="hidden h-px w-24 rotate-[-20deg] bg-white/50 md:block" />
            <span className="text-4xl font-medium tracking-tight md:text-5xl">
              10×
            </span>
          </div>
          <p className="mt-1 text-right text-xs text-white/80 md:text-sm">
            менше рутини
          </p>
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={reduced ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
            scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-white/60 to-transparent" />
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-black" />
    </section>
  );
}
