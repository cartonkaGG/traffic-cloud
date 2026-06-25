"use client";

import { LiquidGlassText } from "@/components/effects/LiquidGlassText";
import { HeroNavbar } from "@/components/sections/HeroNavbar";
import { motion, useReducedMotion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.1 + i * 0.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const stats = [
  { value: "48+", label: "сайтів і ботів" },
  { value: "24/7", label: "боти онлайн" },
  { value: "10×", label: "менше рутини" },
];

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-black">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-0 bg-black/25 md:bg-black/20" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.45)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/80" />

      <HeroNavbar />

      {/* Mobile layout */}
      <div className="relative z-10 flex min-h-[100dvh] flex-col justify-between px-4 pb-8 pt-24 md:hidden">
        <div className="space-y-1.5">
          <motion.h1
            custom={0}
            initial={reduced ? false : "hidden"}
            animate="visible"
            variants={fadeUp}
            className="hero-title text-[12.5vw] leading-none"
          >
            <LiquidGlassText>маштабуйся</LiquidGlassText>
          </motion.h1>
          <motion.h1
            custom={1}
            initial={reduced ? false : "hidden"}
            animate="visible"
            variants={fadeUp}
            className="hero-title text-right text-[12.5vw] leading-none"
          >
            <LiquidGlassText>разом</LiquidGlassText>
          </motion.h1>
          <motion.h1
            custom={2}
            initial={reduced ? false : "hidden"}
            animate="visible"
            variants={fadeUp}
            className="hero-title pl-6 text-[12.5vw] leading-none"
          >
            <LiquidGlassText>з нами</LiquidGlassText>
          </motion.h1>
        </div>

        <div className="mt-6 space-y-4">
          <motion.p
            custom={3}
            initial={reduced ? false : "hidden"}
            animate="visible"
            variants={fadeUp}
            className="hero-glass w-full text-sm leading-relaxed"
          >
            веб-розробка, telegram-боти та автоматизація — від лендінгу до crm,
            n8n і ai-воркфлоу під ключ
          </motion.p>

          <motion.div
            custom={4}
            initial={reduced ? false : "hidden"}
            animate="visible"
            variants={fadeUp}
            className="grid grid-cols-3 gap-2"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="hero-stat text-center">
                <p className="text-xl font-medium tracking-tight">{stat.value}</p>
                <p className="mt-0.5 text-[10px] leading-tight text-white/75">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="relative z-10 hidden h-full min-h-[100dvh] w-full md:block">
        <motion.h1
          custom={0}
          initial={reduced ? false : "hidden"}
          animate="visible"
          variants={fadeUp}
          className="hero-title absolute left-10 top-[16%] text-[10vw]"
        >
          <LiquidGlassText>маштабуйся</LiquidGlassText>
        </motion.h1>

        <motion.h1
          custom={1}
          initial={reduced ? false : "hidden"}
          animate="visible"
          variants={fadeUp}
          className="hero-title absolute right-10 top-[36%] text-[10vw]"
        >
          <LiquidGlassText>разом</LiquidGlassText>
        </motion.h1>

        <motion.h1
          custom={2}
          initial={reduced ? false : "hidden"}
          animate="visible"
          variants={fadeUp}
          className="hero-title absolute left-[22%] top-[56%] text-[10vw]"
        >
          <LiquidGlassText>з нами</LiquidGlassText>
        </motion.h1>

        <motion.p
          custom={3}
          initial={reduced ? false : "hidden"}
          animate="visible"
          variants={fadeUp}
          className="hero-glass absolute left-10 top-[48%] max-w-[280px] text-[15px] font-normal leading-snug"
        >
          веб-розробка, telegram-боти та автоматизація — від лендінгу до crm,
          n8n і ai-воркфлоу під ключ
        </motion.p>

        <motion.div
          custom={4}
          initial={reduced ? false : "hidden"}
          animate="visible"
          variants={fadeUp}
          className="hero-stat absolute right-24 top-[12%]"
        >
          <div className="flex items-center justify-end gap-3">
            <span className="h-px w-24 rotate-[20deg] bg-white/50" />
            <span className="text-5xl font-medium tracking-tight">48+</span>
          </div>
          <p className="mt-1 text-right text-sm text-white/80">сайтів і ботів</p>
        </motion.div>

        <motion.div
          custom={5}
          initial={reduced ? false : "hidden"}
          animate="visible"
          variants={fadeUp}
          className="hero-stat absolute bottom-24 left-20"
        >
          <div className="flex items-center gap-3">
            <span className="text-5xl font-medium tracking-tight">24/7</span>
            <span className="h-px w-24 rotate-[-20deg] bg-white/50" />
          </div>
          <p className="mt-1 text-sm text-white/80">боти онлайн</p>
        </motion.div>

        <motion.div
          custom={6}
          initial={reduced ? false : "hidden"}
          animate="visible"
          variants={fadeUp}
          className="hero-stat absolute bottom-20 right-20"
        >
          <div className="flex items-center justify-end gap-3">
            <span className="h-px w-24 rotate-[-20deg] bg-white/50" />
            <span className="text-5xl font-medium tracking-tight">10×</span>
          </div>
          <p className="mt-1 text-right text-sm text-white/80">менше рутини</p>
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block"
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

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black md:h-48" />
    </section>
  );
}
