"use client";

import { SectionBackground } from "@/components/effects/SectionBackground";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "бриф і аудит",
    description:
      "збираємо вимоги: сайт, telegram-бот, інтеграції. аналізуємо процеси, які можна автоматизувати.",
  },
  {
    step: "02",
    title: "прототип",
    description:
      "макет сайту в studio, схема бота, карта воркфлоу n8n/make — узгоджуємо за 24–48 годин.",
  },
  {
    step: "03",
    title: "розробка",
    description:
      "next.js, bot api, crm-звʼязки, ai-модулі. тестуємо сценарії та навантаження.",
  },
  {
    step: "04",
    title: "запуск",
    description:
      "деплой, моніторинг ботів 24/7, документація та підтримка — все працює в продакшені.",
  },
];

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden border-t border-white/10 py-24 sm:py-32">
      <SectionBackground variant="grid" />
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          label="процес"
          title="від ідеї до автоматизації"
          description="прозорі етапи — ви завжди знаєте, що робимо: сайт, бот чи повний стек."
        />

        <div className="relative mt-16">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent md:left-8 md:block" />

          <div className="space-y-8">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative flex gap-6 md:gap-10"
              >
                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/60 text-xs font-medium text-white backdrop-blur-sm sm:h-10 sm:w-10">
                  {item.step}
                </div>
                <div className="pb-2 pt-0.5">
                  <h3 className="text-xl font-medium lowercase text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/60">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
