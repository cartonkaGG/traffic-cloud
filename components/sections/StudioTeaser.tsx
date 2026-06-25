"use client";

import { SectionBackground } from "@/components/effects/SectionBackground";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  {
    title: "дизайн сайту",
    description: "12 тем, 9 шрифтів, блоки — зберіть бриф за хвилини",
  },
  {
    title: "бот-прототип",
    description: "опишіть сценарій — отримаєте структуру telegram-бота",
  },
  {
    title: "авто-воркфлоу",
    description: "схема інтеграцій crm, n8n та сповіщень під ваш процес",
  },
];

export function StudioTeaser() {
  return (
    <section
      id="studio"
      className="relative overflow-hidden border-t border-white/10 py-24 sm:py-32"
    >
      <SectionBackground variant="spotlight" />
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              label="cloud studio"
              title="зберіть бриф онлайн"
              description="не лише сайт — опишіть бота, автоматизацію чи повний digital-стек і одразу побачте preview."
            />
            <Link href="/studio" className="mt-8 inline-block">
              <Button>відкрити studio</Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.25)" }}
                className="rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-sm transition-colors hover:bg-black/60"
              >
                <div className="mb-3 h-px w-8 bg-white/40" />
                <p className="text-sm font-medium lowercase text-white">
                  {f.title}
                </p>
                <p className="mt-1 text-xs text-white/60">{f.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
