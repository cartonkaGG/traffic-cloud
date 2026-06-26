"use client";

import { SectionBackground } from "@/components/effects/SectionBackground";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const services = [
  {
    title: "веб-розробка",
    description:
      "сайти, лендінги та веб-додатки на next.js — швидко, seo-ready, з преміум ui.",
  },
  {
    title: "telegram-боти",
    description:
      "боти для продажів, підтримки, записів і розсилок — з адмін-панеллю та аналітикою.",
  },
  {
    title: "автоматизація",
    description:
      "n8n, make, crm-інтеграції, воронки та тригери — процеси працюють без вас.",
  },
  {
    title: "ai-інтеграції",
    description:
      "gpt-асистенти в ботах, генерація контенту, розумні відповіді та класифікація заявок.",
  },
  {
    title: "розрахунок вартості",
    description:
      "інтерактивний калькулятор — оберіть тип сайту чи бота та опції, отримайте орієнтовну ціну.",
  },
  {
    title: "підтримка & масштаб",
    description:
      "моніторинг ботів, оновлення сценаріїв, нові інтеграції — ростемо разом з бізнесом.",
  },
];

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden border-t border-white/10 py-16 sm:py-24 md:py-32">
      <SectionBackground variant="aurora" />
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          label="послуги"
          title="digital під ключ"
          description="сайти, telegram-боти та автоматизація — одна команда, повний цикл від ідеї до продакшену."
        />

        <div className="mt-10 grid gap-3 sm:mt-16 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {services.map((service, index) => {
            const isCalc = service.title === "розрахунок вартості";
            const Tag = isCalc ? "a" : "article";
            return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.25)" }}
              className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm transition-colors hover:bg-black/60"
            >
              <Tag
                {...(isCalc ? { href: "#calculator" } : {})}
                className={cn(
                  "block p-6",
                  isCalc && "cursor-pointer",
                )}
              >
              <div className="mb-4 h-px w-8 bg-white/40" />
              <h3 className="text-lg font-medium lowercase text-white">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {service.description}
              </p>
              {isCalc && (
                <p className="mt-3 text-xs font-medium text-white/80">
                  перейти до калькулятора →
                </p>
              )}
              </Tag>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
