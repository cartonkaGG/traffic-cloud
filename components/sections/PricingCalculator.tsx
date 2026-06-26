"use client";

import { SectionBackground } from "@/components/effects/SectionBackground";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  BASE_PRODUCTS,
  PAYMENT_PLANS,
  calculateTotal,
  formatUsd,
  getAddonsForProduct,
  getPaymentPlanLabel,
  isValidPhone,
  type AddonId,
  type PaymentPlan,
  type ProductId,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Phone,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Step = 1 | 2 | 3;

const STEP_LABELS: Record<Step, string> = {
  1: "конфігурація",
  2: "оплата",
  3: "контакт",
};

function AnimatedPrice({ value }: { value: number }) {
  const reduced = useReducedMotion();
  const spring = useSpring(value, { stiffness: 120, damping: 22 });
  const display = useTransform(spring, (v) => formatUsd(Math.round(v)));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  if (reduced) return <span>{formatUsd(value)}</span>;
  return <motion.span>{display}</motion.span>;
}

function StepIndicator({ step }: { step: Step }) {
  const steps: Step[] = [1, 2, 3];
  return (
    <div className="mb-8 flex items-center justify-center gap-2 sm:gap-3">
      {steps.map((s) => (
        <div key={s} className="flex items-center gap-2 sm:gap-3">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors",
              step === s
                ? "bg-white text-black"
                : step > s
                  ? "bg-white/20 text-white"
                  : "border border-white/20 text-white/40",
            )}
          >
            {step > s ? <Check className="h-4 w-4" /> : s}
          </div>
          <span
            className={cn(
              "hidden text-xs uppercase tracking-wider sm:inline",
              step === s ? "text-white" : "text-white/40",
            )}
          >
            {STEP_LABELS[s]}
          </span>
          {s < 3 && (
            <div
              className={cn(
                "h-px w-6 sm:w-10",
                step > s ? "bg-white/40" : "bg-white/15",
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function PricingCalculator() {
  const [step, setStep] = useState<Step>(1);
  const [productId, setProductId] = useState<ProductId>("landing");
  const [addons, setAddons] = useState<Set<AddonId>>(new Set());
  const [paymentPlan, setPaymentPlan] = useState<PaymentPlan>("fifty-fifty");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const availableAddons = useMemo(() => getAddonsForProduct(productId), [productId]);

  useEffect(() => {
    setAddons((prev) => {
      const valid = new Set<AddonId>();
      for (const id of prev) {
        if (availableAddons.some((a) => a.id === id)) valid.add(id);
      }
      return valid;
    });
  }, [availableAddons]);

  const { total, lines } = useMemo(
    () => calculateTotal(productId, addons),
    [productId, addons],
  );

  const selectedProduct = BASE_PRODUCTS.find((p) => p.id === productId)!;

  const toggleAddon = (id: AddonId) => {
    setAddons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidPhone(phone)) {
      setPhoneError("Введіть коректний номер (мінімум 9 цифр)");
      return;
    }
    setPhoneError("");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section
        id="calculator"
        className="relative overflow-hidden border-t border-white/10 py-16 sm:py-24 md:py-32"
      >
        <SectionBackground variant="mesh" />
        <div className="relative z-10 mx-auto max-w-lg px-5 text-center sm:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-white/15 bg-black/50 p-8 backdrop-blur-xl sm:p-10"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
              <Check className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-medium text-white">Заявку надіслано</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Менеджер звʼяжеться з вами за номером{" "}
              <span className="text-white">{phone}</span> протягом робочого дня, щоб
              уточнити деталі та фінальну вартість проєкту.
            </p>
            <p className="mt-4 text-xs text-white/40">
              Орієнтовна сума: {formatUsd(total)} · {getPaymentPlanLabel(paymentPlan)}
            </p>
            <Button
              type="button"
              variant="secondary"
              className="mt-6"
              onClick={() => {
                setSubmitted(false);
                setStep(1);
                setPhone("");
              }}
            >
              новий розрахунок
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="calculator"
      className="relative overflow-hidden border-t border-white/10 py-16 sm:py-24 md:py-32"
    >
      <SectionBackground variant="mesh" />
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          label="калькулятор"
          title="порахуйте вартість проєкту"
          description="Оберіть продукт і опції, спосіб оплати — і залиште номер. Менеджер звʼяжеться для уточнення фінальної ціни."
          align="center"
          className="mb-6 sm:mb-8"
        />

        <StepIndicator step={step} />

        <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:gap-8 xl:grid-cols-[1fr_380px]">
          <div className="min-h-[320px]">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div>
                    <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                      тип проєкту
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {BASE_PRODUCTS.map((product) => {
                        const selected = productId === product.id;
                        const Icon = product.icon;
                        return (
                          <button
                            key={product.id}
                            type="button"
                            onClick={() => setProductId(product.id)}
                            className={cn(
                              "relative rounded-2xl border p-4 text-left transition-colors sm:p-5",
                              selected
                                ? "border-white/40 bg-white/10"
                                : "border-white/10 bg-black/40 hover:border-white/20",
                            )}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/5">
                                <Icon className="h-4 w-4 text-white/90" />
                              </div>
                              <span
                                className={cn(
                                  "rounded-full px-2 py-0.5 text-xs font-medium",
                                  selected ? "bg-white text-black" : "bg-white/10 text-white/70",
                                )}
                              >
                                {formatUsd(product.price)}
                              </span>
                            </div>
                            <p className="mt-3 text-sm font-medium text-white sm:text-base">
                              {product.title}
                            </p>
                            <p className="mt-0.5 text-xs text-white/50">{product.subtitle}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                      додаткові опції
                    </p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {availableAddons.map((addon) => {
                        const on = addons.has(addon.id);
                        const Icon = addon.icon;
                        return (
                          <button
                            key={addon.id}
                            type="button"
                            onClick={() => toggleAddon(addon.id)}
                            className={cn(
                              "flex items-start gap-3 rounded-xl border p-3.5 text-left sm:p-4",
                              on
                                ? "border-white/30 bg-white/8"
                                : "border-white/8 bg-black/30 hover:border-white/15",
                            )}
                          >
                            <div
                              className={cn(
                                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border",
                                on ? "border-white bg-white text-black" : "border-white/25",
                              )}
                            >
                              {on && <Check className="h-3 w-3" />}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <Icon className="h-3.5 w-3.5 text-white/50" />
                                <span className="text-sm text-white">{addon.title}</span>
                                <span className="ml-auto text-xs text-white/45">
                                  +{formatUsd(addon.price)}
                                </span>
                              </div>
                              <p className="mt-1 text-xs text-white/45">{addon.description}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                    спосіб оплати
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {PAYMENT_PLANS.map((plan) => {
                      const selected = paymentPlan === plan.id;
                      return (
                        <button
                          key={plan.id}
                          type="button"
                          onClick={() => setPaymentPlan(plan.id)}
                          className={cn(
                            "rounded-2xl border p-6 text-left transition-colors",
                            selected
                              ? "border-white/40 bg-white/10"
                              : "border-white/10 bg-black/40 hover:border-white/20",
                          )}
                        >
                          <p className="text-lg font-medium text-white">{plan.title}</p>
                          <p className="mt-2 text-sm leading-relaxed text-white/55">
                            {plan.description}
                          </p>
                          {selected && (
                            <span className="mt-4 inline-flex items-center gap-1 text-xs text-white/70">
                              <Check className="h-3.5 w-3.5" /> обрано
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-6 text-xs leading-relaxed text-white/40">
                    Точний графік платежів узгоджуємо з менеджером після брифу. Орієнтовна
                    сума: {formatUsd(total)}.
                  </p>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                    ваш номер телефону
                  </p>
                  <form onSubmit={handlePhoneSubmit} className="max-w-md space-y-4">
                    <p className="text-sm leading-relaxed text-white/60">
                      Залиште номер — менеджер передзвонить, щоб обговорити деталі проєкту та
                      уточнити фінальну вартість.
                    </p>
                    <div className="space-y-2">
                      <label htmlFor="calc-phone" className="text-sm text-white/80">
                        телефон
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                        <input
                          id="calc-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            setPhoneError("");
                          }}
                          placeholder="+380 XX XXX XX XX"
                          className="h-12 w-full rounded-full border border-white/10 bg-black pl-11 pr-4 text-base text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none sm:text-sm"
                          autoComplete="tel"
                          required
                        />
                      </div>
                      {phoneError && (
                        <p className="text-xs text-red-400">{phoneError}</p>
                      )}
                    </div>
                    <Button type="submit" className="w-full sm:w-auto">
                      надіслати заявку
                    </Button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Summary + navigation */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <motion.div
              layout
              className="overflow-hidden rounded-2xl border border-white/15 bg-black/50 backdrop-blur-xl"
            >
              <div className="border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent px-5 py-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/45">
                  <Sparkles className="h-3.5 w-3.5" />
                  орієнтовна сума
                </div>
                <p className="mt-2 text-4xl font-medium tracking-tight text-white">
                  <AnimatedPrice value={total} />
                </p>
                <p className="mt-1 text-xs text-white/45">
                  {selectedProduct.title}
                  {step >= 2 && ` · ${getPaymentPlanLabel(paymentPlan)}`}
                </p>
              </div>

              <div className="max-h-[200px] space-y-2 overflow-y-auto px-5 py-4">
                {lines.map((line) => (
                  <div
                    key={line.label}
                    className="flex items-center justify-between gap-2 text-sm"
                  >
                    <span className="truncate text-white/65">{line.label}</span>
                    <span className="shrink-0 text-white/90">{formatUsd(line.price)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-white/10 p-5">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => setStep((s) => (s - 1) as Step)}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    назад
                  </Button>
                )}
                {step < 3 && (
                  <Button
                    type="button"
                    className="w-full"
                    onClick={() => setStep((s) => (s + 1) as Step)}
                  >
                    далі
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </motion.div>

            <p className="mt-4 text-center text-[11px] leading-relaxed text-white/35">
              Ціни орієнтовні. Фінальну вартість підтверджує менеджер після брифу.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
