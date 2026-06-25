"use client";

import { SectionBackground } from "@/components/effects/SectionBackground";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import { useState } from "react";

export function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/10 py-24 sm:py-32">
      <SectionBackground variant="pulse" />
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHeader
            label="контакт"
            title="потрібен сайт чи бот?"
            description="опишіть задачу — сайт, telegram-бот, автоматизація — відповімо протягом 24 годин."
          />

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-md sm:p-8"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-lg font-medium lowercase text-white">
                  дякуємо!
                </p>
                <p className="mt-2 text-sm text-white/60">
                  ми звʼяжемось з вами найближчим часом.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm text-white/80">
                    імʼя
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="h-11 w-full rounded-full border border-white/10 bg-black px-4 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none"
                    placeholder="ваше імʼя"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm text-white/80">
                    email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="h-11 w-full rounded-full border border-white/10 bg-black px-4 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none"
                    placeholder="you@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm text-white/80">
                    що потрібно?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full resize-none rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none"
                    placeholder="сайт, telegram-бот, n8n-воркфлоу, інтеграція crm..."
                  />
                </div>
                <Button type="submit" className="w-full">
                  надіслати
                </Button>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
