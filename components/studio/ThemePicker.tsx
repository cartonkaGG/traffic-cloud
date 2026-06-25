"use client";

import { JACK_PORTRAIT } from "@/lib/theme-assets";
import {
  LITHOS_BG_IMAGE_1,
  LITHOS_BG_IMAGE_2,
  palettePresets,
  siteThemes,
  themeCategories,
  type SiteTheme,
  type SiteThemeId,
  type ThemeCategory,
} from "@/lib/design-tokens";
import { useStudioStore } from "@/lib/studio-store";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

function ThemePreviewCard({
  theme,
  selected,
  onSelect,
}: {
  theme: SiteTheme;
  selected: boolean;
  onSelect: () => void;
}) {
  const colors = palettePresets[theme.palette];
  const isLight = theme.palette === "sand";
  const isLithos = theme.template === "lithos";
  const isJack = theme.template === "jack";
  const isDigitalEpoch = theme.template === "digital-epoch";
  const isCustomTemplate = Boolean(theme.template);

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative w-full overflow-hidden rounded-xl border text-left transition-shadow",
        selected
          ? "border-accent ring-2 ring-accent/40"
          : "border-border hover:border-muted hover:shadow-lg",
      )}
    >
      <div
        className="relative aspect-[4/3] overflow-hidden p-3"
        style={
          isLithos
            ? {
                backgroundImage: `url(${LITHOS_BG_IMAGE_1})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : isJack
              ? { background: "#0C0C0C" }
              : isDigitalEpoch
                ? { background: "#f9fafb" }
                : { background: colors.bg }
        }
      >
        {isJack && (
          <>
            <div className="pointer-events-none absolute inset-0 flex items-end justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={JACK_PORTRAIT}
                alt=""
                className="h-[70%] w-auto object-contain object-bottom opacity-90"
              />
            </div>
            <p className="relative z-10 mt-2 text-center text-[10px] font-black uppercase jack-hero-heading">
              hi, i&apos;m jack
            </p>
          </>
        )}

        {isDigitalEpoch && (
          <div className="relative flex h-full flex-col justify-between p-2">
            <div className="rounded-2xl bg-white/80 p-2 shadow-sm">
              <p className="text-[9px] font-medium leading-tight text-[#0a1b33]">
                Фундамент нової цифрової епохи
              </p>
            </div>
            <div className="mx-auto rounded-full bg-white/90 px-2 py-1 text-[8px] text-slate-500 shadow-sm">
              ✦ навігація
            </div>
          </div>
        )}

        {isLithos && (
          <>
            <div
              className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-90"
              style={{ backgroundImage: `url(${LITHOS_BG_IMAGE_2})` }}
            />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30 blur-xl" />
          </>
        )}

        {!isCustomTemplate && (
          <>
        <div
          className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full blur-2xl"
          style={{ background: `${colors.accent}55` }}
        />
        <div
          className="pointer-events-none absolute -bottom-6 -left-4 h-16 w-16 rounded-full blur-xl"
          style={{ background: `${colors.accent2}44` }}
        />
          </>
        )}

        <div className="relative flex items-center justify-between gap-2">
          <span
            className="rounded-full px-2 py-0.5 text-[9px] font-medium uppercase tracking-wide"
            style={{
              background: isLithos ? "rgba(0,0,0,0.5)" : `${colors.surface}cc`,
              color: isLithos ? "#fff" : colors.muted,
            }}
          >
            {theme.category}
          </span>
          {theme.premium && (
            <span
              className="rounded-full px-2 py-0.5 text-[9px] font-medium"
              style={{
                background: isLithos ? "#e8702a" : colors.accent,
                color: isLithos ? "#fff" : isLight ? colors.bg : colors.text,
              }}
            >
              premium
            </span>
          )}
        </div>

        {isLithos ? (
          <div className="relative mt-6 text-center">
            <p
              className="font-[family-name:var(--font-playfair)] text-sm italic text-white"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Layers hold
            </p>
            <p className="text-xs text-white/90">tales of time</p>
          </div>
        ) : isJack || isDigitalEpoch ? (
          <div className="relative mt-6 text-center">
            <p className="text-[10px] text-white/80">{theme.description}</p>
          </div>
        ) : (
        <div className="relative mt-4 space-y-2">
          <div
            className="h-2 w-3/4 rounded-full"
            style={{ background: colors.text, opacity: 0.9 }}
          />
          <div
            className="h-1.5 w-1/2 rounded-full"
            style={{ background: colors.muted, opacity: 0.6 }}
          />
          <div
            className="mt-3 inline-block rounded-full px-3 py-1 text-[9px] font-medium"
            style={{
              background: colors.accent,
              color: isLight ? "#fff" : colors.bg,
              borderRadius:
                theme.borderRadius === "pill"
                  ? "999px"
                  : theme.borderRadius === "sharp"
                    ? "4px"
                    : "8px",
            }}
          >
            CTA
          </div>
        </div>
        )}

        {theme.style === "glass" && !isCustomTemplate && (
          <div
            className="absolute bottom-3 right-3 h-10 w-14 rounded-lg border backdrop-blur-sm"
            style={{
              background: `${colors.surface}88`,
              borderColor: `${colors.muted}33`,
            }}
          />
        )}

        {selected && (
          <div
            className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full"
            style={{ background: colors.accent, color: colors.bg }}
          >
            <Check className="h-3.5 w-3.5" />
          </div>
        )}
      </div>

      <div className="border-t border-border bg-surface/50 px-3 py-2.5">
        <p className="text-xs font-medium leading-tight text-foreground">
          {theme.label}
        </p>
        <p className="mt-0.5 line-clamp-1 text-[10px] text-muted">
          {theme.description}
        </p>
      </div>
    </motion.button>
  );
}

export function ThemePicker() {
  const themeId = useStudioStore((s) => s.themeId);
  const applyTheme = useStudioStore((s) => s.applyTheme);
  const [category, setCategory] = useState<ThemeCategory>("Всі");

  const filtered = useMemo(
    () =>
      category === "Всі"
        ? siteThemes
        : siteThemes.filter((t) => t.category === category),
    [category],
  );

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2 rounded-xl border border-border bg-accent/5 p-3">
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
        <div>
          <p className="text-xs font-medium text-foreground">
            Оберіть готову тему
          </p>
          <p className="mt-0.5 text-[10px] leading-relaxed text-muted">
            Як на MotionSites — клік застосує палітру, стиль, шрифти та
            заокруглення. Далі можна тонко налаштувати у вкладці «Стиль».
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {themeCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-[10px] font-medium transition-colors",
              category === cat
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-muted hover:text-foreground",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {filtered.map((theme) => (
          <ThemePreviewCard
            key={theme.id}
            theme={theme}
            selected={themeId === theme.id}
            onSelect={() => applyTheme(theme.id as SiteThemeId)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-8 text-center text-xs text-muted">
          Тем у цій категорії поки немає
        </p>
      )}
    </div>
  );
}
