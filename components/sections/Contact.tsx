"use client";

import { SectionBackground } from "@/components/effects/SectionBackground";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import { useState } from "react";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError("");
    setSending(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "contact",
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message"),
        }),
      });
      const data = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        throw new Error(data?.message ?? "Не вдалося надіслати заявку");
      }

      setSent(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Не вдалося надіслати заявку. Спробуйте ще раз.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/10 py-16 sm:py-24 md:py-32">
      <SectionBackground variant="pulse" />
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
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
            onSubmit={(event) => void handleSubmit(event)}
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
                    className="h-12 w-full rounded-full border border-white/10 bg-black px-4 text-base text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none sm:h-11 sm:text-sm"
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
                    className="h-12 w-full rounded-full border border-white/10 bg-black px-4 text-base text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none sm:h-11 sm:text-sm"
                    placeholder="you@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm text-white/80">
                    телефон
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    required
                    className="h-12 w-full rounded-full border border-white/10 bg-black px-4 text-base text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none sm:h-11 sm:text-sm"
                    placeholder="+380 XX XXX XX XX"
                    autoComplete="tel"
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
                    className="w-full resize-none rounded-2xl border border-white/10 bg-black px-4 py-3 text-base text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none sm:text-sm"
                    placeholder="сайт, telegram-бот, n8n-воркфлоу, інтеграція crm..."
                  />
                </div>
                {error && <p className="text-xs text-red-400">{error}</p>}
                <Button type="submit" className="w-full" disabled={sending}>
                  {sending ? "надсилаємо..." : "надіслати"}
                </Button>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
