"use client";

import { TemplateScrollContext } from "@/components/studio/template-preview-context";
import { DigitalEpochPreview } from "@/components/studio/DigitalEpochPreview";
import { JackPreview } from "@/components/studio/JackPreview";
import { LithosHeroPreview } from "@/components/studio/LithosHeroPreview";
import { siteThemes } from "@/lib/design-tokens";
import { useStudioStore } from "@/lib/studio-store";
import { cn } from "@/lib/utils";
import { useRef } from "react";

export function TemplateThemePreview() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { brandName, themeId, previewDevice } = useStudioStore();
  const theme = siteThemes.find((t) => t.id === themeId);
  const compact = previewDevice === "mobile";

  if (!theme?.template) return null;

  return (
    <div
      className={cn(
        "flex h-full min-h-0 w-full flex-col transition-all duration-500",
        compact ? "mx-auto max-w-[390px]" : "mx-auto max-w-full",
      )}
    >
      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col overflow-hidden border border-white/10 shadow-2xl",
          compact ? "rounded-[28px]" : "rounded-[20px]",
        )}
      >
        <div className="flex shrink-0 items-center gap-2 border-b border-white/10 bg-neutral-950 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-red-500/80" />
          <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
          <span className="h-2 w-2 rounded-full bg-green-500/80" />
          <span className="ml-1 truncate text-[10px] text-white/50">
            {brandName.toLowerCase().replace(/\s+/g, "")}.cloud
          </span>
        </div>

        <TemplateScrollContext.Provider value={scrollRef}>
          <div
            ref={scrollRef}
            className="min-h-0 flex-1 overflow-y-auto overscroll-y-auto bg-black [-webkit-overflow-scrolling:touch]"
          >
            {theme.template === "lithos" && (
              <LithosHeroPreview brandName={brandName} compact={compact} fullPage />
            )}
            {theme.template === "jack" && (
              <JackPreview brandName={brandName} compact={compact} />
            )}
            {theme.template === "digital-epoch" && (
              <DigitalEpochPreview compact={compact} />
            )}
          </div>
        </TemplateScrollContext.Provider>
      </div>

      {theme.template === "lithos" && (
        <p className="mt-2 shrink-0 text-center text-[10px] text-white/40">
          Наведи курсор — spotlight reveal другої картинки
        </p>
      )}
      {theme.template === "jack" && (
        <p className="mt-2 shrink-0 text-center text-[10px] text-white/40">
          Скроль превʼю колесом — marquee рухається; портрет реагує на курсор
        </p>
      )}
    </div>
  );
}
