"use client";

import { TemplateThemePreview } from "@/components/studio/TemplateThemePreview";
import {
  fontPairings,
  getBorderRadius,
  palettePresets,
  siteThemes,
} from "@/lib/design-tokens";
import { useStudioStore } from "@/lib/studio-store";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Mail,
  Menu,
  Quote,
  Star,
} from "lucide-react";

function BlockWrapper({
  children,
  visible,
  label,
}: {
  children: React.ReactNode;
  visible: boolean;
  label: string;
}) {
  if (!visible) return null;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      data-block={label}
    >
      {children}
    </motion.div>
  );
}

export function StudioFullPreview() {
  const {
    brandName,
    themeId,
    palette,
    fonts,
    style,
    borderRadius,
    industry,
    pages,
    blocks,
    previewDevice,
  } = useStudioStore();

  const themeTemplate = siteThemes.find((t) => t.id === themeId)?.template;
  const isTemplateTheme = Boolean(themeTemplate);

  if (isTemplateTheme) {
    return (
      <div className="flex h-full min-h-0 flex-1 flex-col">
        <TemplateThemePreview />
      </div>
    );
  }

  const colors = palettePresets[palette];
  const fontPair = fontPairings[fonts];
  const radius = getBorderRadius(borderRadius);
  const isLight = ["sand"].includes(palette);

  const cardStyle = (glass = false) => ({
    background: glass && style === "glass" ? `${colors.surface}88` : colors.surface,
    border: `1px solid ${colors.muted}33`,
    borderRadius: radius,
    backdropFilter: glass && style === "glass" ? "blur(12px)" : undefined,
  });

  const headingSize =
    style === "bold" ? "clamp(1.25rem, 4vw, 2rem)" : "clamp(1.1rem, 3vw, 1.5rem)";

  return (
    <div
      className={cn(
        "mx-auto overflow-hidden transition-all duration-500",
        previewDevice === "mobile" ? "max-w-[375px]" : "w-full",
      )}
    >
      <div
        className="overflow-hidden border"
        style={{
          borderColor: `${colors.muted}33`,
          borderRadius: previewDevice === "mobile" ? "32px" : radius,
        }}
      >
        {/* Browser chrome */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{
            background: colors.surface,
            borderBottom: `1px solid ${colors.muted}22`,
          }}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
          <span
            className="ml-2 flex-1 truncate rounded-md px-3 py-1 text-[10px]"
            style={{ background: `${colors.muted}18`, color: colors.muted }}
          >
            {brandName.toLowerCase().replace(/\s+/g, "")}.com
          </span>
        </div>

        <div
          className="max-h-[min(80vh,900px)] overflow-y-auto"
          style={{ background: colors.bg }}
        >
          {/* Nav */}
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: `1px solid ${colors.muted}18` }}
          >
            <span
              className="text-sm font-bold"
              style={{ fontFamily: fontPair.heading, color: colors.text }}
            >
              {brandName}
              <span style={{ color: colors.accent }}>.</span>
            </span>
            <div className="hidden items-center gap-4 sm:flex">
              {pages.slice(0, 4).map((p) => (
                <span
                  key={p}
                  className="text-[10px]"
                  style={{ fontFamily: fontPair.body, color: colors.muted }}
                >
                  {p}
                </span>
              ))}
            </div>
            <Menu className="h-4 w-4 sm:hidden" style={{ color: colors.muted }} />
          </div>

          <AnimatePresence mode="popLayout">
            <BlockWrapper visible={blocks.hero} label="hero">
              <div
                className="relative px-5 py-10 sm:px-8 sm:py-14"
                style={{
                  background: `linear-gradient(180deg, ${colors.accent}12 0%, transparent 100%)`,
                }}
              >
                <p
                  className="mb-3 text-[10px] font-medium uppercase tracking-widest"
                  style={{ color: colors.accent2, fontFamily: fontPair.body }}
                >
                  {industry}
                </p>
                <h1
                  className="font-bold leading-tight"
                  style={{
                    fontFamily: fontPair.heading,
                    color: colors.text,
                    fontSize: headingSize,
                    letterSpacing: style === "editorial" ? "0" : "-0.03em",
                  }}
                >
                  {style === "bold" ? (
                    <>
                      Ваш бізнес
                      <br />
                      <span style={{ color: colors.accent }}>на новому рівні</span>
                    </>
                  ) : (
                    <>Створюємо досвід, який запамʼятовується</>
                  )}
                </h1>
                <p
                  className="mt-3 max-w-md text-xs leading-relaxed"
                  style={{ fontFamily: fontPair.body, color: colors.muted }}
                >
                  Преміум-рішення для {industry.toLowerCase()} — швидко, стильно,
                  ефективно.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span
                    className="inline-flex items-center gap-1 px-4 py-2 text-[10px] font-semibold"
                    style={{
                      background: colors.accent,
                      color: isLight ? "#fff" : colors.bg,
                      borderRadius: radius,
                      fontFamily: fontPair.body,
                    }}
                  >
                    Почати
                    <ArrowRight className="h-3 w-3" />
                  </span>
                  <span
                    className="px-4 py-2 text-[10px] font-medium"
                    style={{
                      ...cardStyle(),
                      color: colors.text,
                      fontFamily: fontPair.body,
                    }}
                  >
                    Дізнатись більше
                  </span>
                </div>
              </div>
            </BlockWrapper>

            <BlockWrapper visible={blocks.features} label="features">
              <div className="px-5 py-8 sm:px-8">
                <h2
                  className="mb-4 text-sm font-bold"
                  style={{ fontFamily: fontPair.heading, color: colors.text }}
                >
                  Чому обирають нас
                </h2>
                <div className="grid gap-3 sm:grid-cols-3">
                  {["Швидкість", "Якість", "Підтримка"].map((title, i) => (
                    <div
                      key={title}
                      className="p-4"
                      style={cardStyle(style === "glass")}
                    >
                      <div
                        className="mb-2 flex h-7 w-7 items-center justify-center text-[10px] font-bold"
                        style={{
                          background: `${colors.accent}22`,
                          color: colors.accent,
                          borderRadius: radius,
                        }}
                      >
                        {i + 1}
                      </div>
                      <p
                        className="text-xs font-semibold"
                        style={{ fontFamily: fontPair.heading, color: colors.text }}
                      >
                        {title}
                      </p>
                      <p
                        className="mt-1 text-[10px] leading-relaxed"
                        style={{ fontFamily: fontPair.body, color: colors.muted }}
                      >
                        Опис переваги вашого продукту або послуги.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </BlockWrapper>

            <BlockWrapper visible={blocks.stats} label="stats">
              <div
                className="mx-5 mb-2 grid grid-cols-3 gap-2 rounded-xl p-4 sm:mx-8"
                style={cardStyle()}
              >
                {[
                  { v: "500+", l: "Клієнтів" },
                  { v: "98%", l: "Задоволених" },
                  { v: "24/7", l: "Підтримка" },
                ].map((s) => (
                  <div key={s.l} className="text-center">
                    <p
                      className="text-lg font-bold"
                      style={{ fontFamily: fontPair.heading, color: colors.accent }}
                    >
                      {s.v}
                    </p>
                    <p
                      className="text-[9px]"
                      style={{ fontFamily: fontPair.body, color: colors.muted }}
                    >
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
            </BlockWrapper>

            <BlockWrapper visible={blocks.gallery} label="gallery">
              <div className="px-5 py-6 sm:px-8">
                <h2
                  className="mb-4 text-sm font-bold"
                  style={{ fontFamily: fontPair.heading, color: colors.text }}
                >
                  Галерея
                </h2>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div
                      key={n}
                      className="aspect-[4/3]"
                      style={{
                        borderRadius: radius,
                        background: `linear-gradient(135deg, ${colors.accent}${n * 8} 0%, ${colors.surface} 100%)`,
                        border: `1px solid ${colors.muted}22`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </BlockWrapper>

            <BlockWrapper visible={blocks.testimonials} label="testimonials">
              <div className="px-5 py-6 sm:px-8">
                <h2
                  className="mb-4 text-sm font-bold"
                  style={{ fontFamily: fontPair.heading, color: colors.text }}
                >
                  Відгуки
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {["Олена К.", "Андрій М."].map((name) => (
                    <div key={name} className="p-4" style={cardStyle(style === "glass")}>
                      <Quote className="mb-2 h-4 w-4" style={{ color: colors.accent }} />
                      <p
                        className="text-[10px] leading-relaxed"
                        style={{ fontFamily: fontPair.body, color: colors.muted }}
                      >
                        «Чудовий результат — саме те, що ми шукали для нашого бізнесу.»
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className="h-2.5 w-2.5 fill-current"
                              style={{ color: colors.accent2 }}
                            />
                          ))}
                        </div>
                        <span
                          className="text-[10px] font-medium"
                          style={{ fontFamily: fontPair.body, color: colors.text }}
                        >
                          {name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </BlockWrapper>

            <BlockWrapper visible={blocks.pricing} label="pricing">
              <div className="px-5 py-6 sm:px-8">
                <h2
                  className="mb-4 text-sm font-bold"
                  style={{ fontFamily: fontPair.heading, color: colors.text }}
                >
                  Тарифи
                </h2>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { name: "Старт", price: "₴9 900" },
                    { name: "Pro", price: "₴19 900", featured: true },
                    { name: "Enterprise", price: "Договір" },
                  ].map((plan) => (
                    <div
                      key={plan.name}
                      className="p-4"
                      style={{
                        ...cardStyle(),
                        borderColor: plan.featured
                          ? colors.accent
                          : `${colors.muted}33`,
                        boxShadow: plan.featured
                          ? `0 0 24px ${colors.accent}22`
                          : undefined,
                      }}
                    >
                      <p
                        className="text-xs font-bold"
                        style={{ fontFamily: fontPair.heading, color: colors.text }}
                      >
                        {plan.name}
                      </p>
                      <p
                        className="mt-1 text-lg font-bold"
                        style={{ fontFamily: fontPair.heading, color: colors.accent }}
                      >
                        {plan.price}
                      </p>
                      <ul className="mt-3 space-y-1.5">
                        {["Фіча 1", "Фіча 2", "Фіча 3"].map((f) => (
                          <li
                            key={f}
                            className="flex items-center gap-1.5 text-[9px]"
                            style={{ fontFamily: fontPair.body, color: colors.muted }}
                          >
                            <Check className="h-2.5 w-2.5" style={{ color: colors.accent2 }} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </BlockWrapper>

            <BlockWrapper visible={blocks.faq} label="faq">
              <div className="px-5 py-6 sm:px-8">
                <h2
                  className="mb-4 text-sm font-bold"
                  style={{ fontFamily: fontPair.heading, color: colors.text }}
                >
                  FAQ
                </h2>
                <div className="space-y-2">
                  {["Як почати?", "Скільки це коштує?", "Які терміни?"].map((q) => (
                    <div
                      key={q}
                      className="flex items-center justify-between px-4 py-3"
                      style={cardStyle()}
                    >
                      <span
                        className="text-[10px] font-medium"
                        style={{ fontFamily: fontPair.body, color: colors.text }}
                      >
                        {q}
                      </span>
                      <span style={{ color: colors.muted }}>+</span>
                    </div>
                  ))}
                </div>
              </div>
            </BlockWrapper>

            <BlockWrapper visible={blocks.cta} label="cta">
              <div
                className="mx-5 my-6 p-6 text-center sm:mx-8"
                style={{
                  ...cardStyle(),
                  background: `linear-gradient(135deg, ${colors.accent}22, ${colors.accent2}11)`,
                  borderColor: `${colors.accent}44`,
                }}
              >
                <h3
                  className="text-sm font-bold"
                  style={{ fontFamily: fontPair.heading, color: colors.text }}
                >
                  Готові почати?
                </h3>
                <p
                  className="mt-2 text-[10px]"
                  style={{ fontFamily: fontPair.body, color: colors.muted }}
                >
                  Звʼяжіться з нами сьогодні
                </p>
                <span
                  className="mt-4 inline-block px-5 py-2 text-[10px] font-semibold"
                  style={{
                    background: colors.accent,
                    color: isLight ? "#fff" : colors.bg,
                    borderRadius: radius,
                  }}
                >
                  Написати нам
                </span>
              </div>
            </BlockWrapper>

            <BlockWrapper visible={blocks.contact} label="contact">
              <div className="px-5 pb-8 sm:px-8">
                <div className="p-4" style={cardStyle()}>
                  <div className="mb-3 flex items-center gap-2">
                    <Mail className="h-4 w-4" style={{ color: colors.accent }} />
                    <span
                      className="text-xs font-bold"
                      style={{ fontFamily: fontPair.heading, color: colors.text }}
                    >
                      Контакт
                    </span>
                  </div>
                  <div className="space-y-2">
                    {["Імʼя", "Email", "Повідомлення"].map((field) => (
                      <div
                        key={field}
                        className="h-8 px-3 text-[10px] leading-8"
                        style={{
                          background: colors.bg,
                          border: `1px solid ${colors.muted}22`,
                          borderRadius: radius,
                          color: colors.muted,
                          fontFamily: fontPair.body,
                        }}
                      >
                        {field}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </BlockWrapper>
          </AnimatePresence>

          {/* Footer */}
          <div
            className="px-5 py-4 text-center text-[9px]"
            style={{
              borderTop: `1px solid ${colors.muted}18`,
              color: colors.muted,
              fontFamily: fontPair.body,
            }}
          >
            © {brandName} · {pages.length} сторінок · стиль {style}
          </div>
        </div>
      </div>
    </div>
  );
}
