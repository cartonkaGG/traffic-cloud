"use client";

import { StudioFullPreview } from "@/components/studio/StudioFullPreview";
import { Button } from "@/components/ui/Button";
import {
  blockDefinitions,
  borderRadiusPresets,
  fontPairings,
  industries,
  pageOptions,
  palettePresets,
  stylePresets,
  type BlockId,
  type BorderRadiusId,
  type FontPairingId,
  type PaletteId,
} from "@/lib/design-tokens";
import { useStudioStore } from "@/lib/studio-store";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Copy,
  Download,
  Layout,
  Monitor,
  Palette,
  Smartphone,
  Type,
} from "lucide-react";
import { useState } from "react";

type TabId = "brand" | "style" | "blocks" | "pages" | "brief";

const tabs: { id: TabId; label: string; icon: typeof Palette }[] = [
  { id: "brand", label: "Бренд", icon: Type },
  { id: "style", label: "Стиль", icon: Palette },
  { id: "blocks", label: "Блоки", icon: Layout },
  { id: "pages", label: "Сторінки", icon: Monitor },
  { id: "brief", label: "Бриф", icon: Copy },
];

export function StudioBuilder() {
  const [activeTab, setActiveTab] = useState<TabId>("brand");
  const [copied, setCopied] = useState(false);

  const store = useStudioStore();

  const handleExport = () => {
    const json = store.exportTokens();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${store.brandName.replace(/\s+/g, "-").toLowerCase()}-brief.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(store.exportTokens());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="flex w-full flex-col border-b border-border bg-surface/40 lg:w-[400px] lg:shrink-0 lg:border-b-0 lg:border-r">
        <div className="border-b border-border px-5 py-5">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            Cloud Studio
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-syne)] text-xl font-bold">
            Конструктор сайту
          </h1>
        </div>

        <div className="flex gap-1 overflow-x-auto border-b border-border px-3 py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-accent/10 text-accent"
                  : "text-muted hover:text-foreground",
              )}
            >
              <tab.icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {activeTab === "brand" && (
                <>
                  <div className="space-y-2">
                    <label htmlFor="brand" className="text-sm font-medium">
                      Назва бренду
                    </label>
                    <input
                      id="brand"
                      value={store.brandName}
                      onChange={(e) => store.setBrandName(e.target.value)}
                      className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <fieldset className="space-y-3">
                    <legend className="text-sm font-medium">Ніша</legend>
                    <div className="flex flex-wrap gap-2">
                      {industries.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => store.setIndustry(item)}
                          className={cn(
                            "rounded-lg border px-3 py-2 text-xs transition-all",
                            store.industry === item
                              ? "border-accent bg-accent/10 text-accent"
                              : "border-border text-muted hover:text-foreground",
                          )}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </>
              )}

              {activeTab === "style" && (
                <>
                  <fieldset className="space-y-3">
                    <legend className="text-sm font-medium">Стиль</legend>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {stylePresets.map((preset) => (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => store.setStyle(preset.id)}
                          className={cn(
                            "rounded-xl border p-3 text-left transition-all",
                            store.style === preset.id
                              ? "border-accent bg-accent/5"
                              : "border-border hover:border-muted",
                          )}
                        >
                          <p className="text-xs font-medium">{preset.label}</p>
                          <p className="mt-0.5 text-[10px] text-muted">
                            {preset.description}
                          </p>
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="space-y-3">
                    <legend className="text-sm font-medium">
                      Палітра ({Object.keys(palettePresets).length} тем)
                    </legend>
                    <div className="grid grid-cols-2 gap-2">
                      {(Object.keys(palettePresets) as PaletteId[]).map((id) => {
                        const p = palettePresets[id];
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => store.setPalette(id)}
                            className={cn(
                              "flex items-center gap-2 rounded-xl border p-3 text-left transition-all",
                              store.palette === id
                                ? "border-accent bg-accent/5"
                                : "border-border hover:border-muted",
                            )}
                          >
                            <span className="flex shrink-0 flex-col gap-1">
                              <span
                                className="h-3 w-8 rounded"
                                style={{ background: p.accent }}
                              />
                              <span
                                className="h-3 w-8 rounded"
                                style={{
                                  background: p.bg,
                                  border: `1px solid ${p.muted}44`,
                                }}
                              />
                            </span>
                            <span className="text-[10px] font-medium leading-tight">
                              {p.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <fieldset className="space-y-3">
                    <legend className="text-sm font-medium">
                      Шрифти ({Object.keys(fontPairings).length} пар)
                    </legend>
                    <div className="space-y-2">
                      {(Object.keys(fontPairings) as FontPairingId[]).map((id) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => store.setFonts(id)}
                          className={cn(
                            "w-full rounded-lg border px-3 py-2.5 text-left text-xs transition-all",
                            store.fonts === id
                              ? "border-accent bg-accent/10 text-accent"
                              : "border-border text-muted hover:text-foreground",
                          )}
                          style={{
                            fontFamily: fontPairings[id].heading,
                          }}
                        >
                          {fontPairings[id].label}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="space-y-3">
                    <legend className="text-sm font-medium">Заокруглення</legend>
                    <div className="flex flex-wrap gap-2">
                      {borderRadiusPresets.map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() =>
                            store.setBorderRadius(r.id as BorderRadiusId)
                          }
                          className={cn(
                            "border px-4 py-2 text-xs transition-all",
                            store.borderRadius === r.id
                              ? "border-accent bg-accent/10 text-accent"
                              : "border-border text-muted",
                          )}
                          style={{ borderRadius: r.value }}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </>
              )}

              {activeTab === "blocks" && (
                <fieldset className="space-y-3">
                  <legend className="text-sm font-medium">
                    Блоки сторінки
                  </legend>
                  <p className="text-xs text-muted">
                    Увімкніть блоки — вони зʼявляться у live preview
                  </p>
                  <div className="space-y-2">
                    {blockDefinitions.map((block) => (
                      <button
                        key={block.id}
                        type="button"
                        onClick={() => store.toggleBlock(block.id as BlockId)}
                        className={cn(
                          "flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-all",
                          store.blocks[block.id as BlockId]
                            ? "border-accent/50 bg-accent/5"
                            : "border-border opacity-60 hover:opacity-100",
                        )}
                      >
                        <div
                          className={cn(
                            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border",
                            store.blocks[block.id as BlockId]
                              ? "border-accent bg-accent text-background"
                              : "border-border",
                          )}
                        >
                          {store.blocks[block.id as BlockId] && (
                            <Check className="h-3 w-3" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-medium">{block.label}</p>
                          <p className="mt-0.5 text-[10px] text-muted">
                            {block.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              {activeTab === "pages" && (
                <fieldset className="space-y-3">
                  <legend className="text-sm font-medium">Сторінки сайту</legend>
                  <div className="flex flex-wrap gap-2">
                    {pageOptions.map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => store.togglePage(page)}
                        className={cn(
                          "flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs transition-all",
                          store.pages.includes(page)
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-border text-muted hover:text-foreground",
                        )}
                      >
                        {store.pages.includes(page) && (
                          <Check className="h-3 w-3" />
                        )}
                        {page}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              {activeTab === "brief" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="studio-brief" className="text-sm font-medium">
                      Ідея / референси
                    </label>
                    <textarea
                      id="studio-brief"
                      rows={6}
                      value={store.brief}
                      onChange={(e) => store.setBrief(e.target.value)}
                      placeholder="Опишіть настрій, надішліть посилання на сайти-референси, особливі побажання..."
                      className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button onClick={handleExport}>
                      <Download className="h-4 w-4" />
                      Експорт брифу JSON
                    </Button>
                    <Button variant="secondary" onClick={handleCopy}>
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      {copied ? "Скопійовано" : "Копіювати JSON"}
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </aside>

      {/* Preview panel */}
      <div className="flex flex-1 flex-col bg-background">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <p className="text-xs font-medium uppercase tracking-widest text-muted">
            Live Preview
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => store.setPreviewDevice("desktop")}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-colors",
                store.previewDevice === "desktop"
                  ? "bg-accent/10 text-accent"
                  : "text-muted hover:text-foreground",
              )}
            >
              <Monitor className="h-3.5 w-3.5" />
              Desktop
            </button>
            <button
              type="button"
              onClick={() => store.setPreviewDevice("mobile")}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-colors",
                store.previewDevice === "mobile"
                  ? "bg-accent/10 text-accent"
                  : "text-muted hover:text-foreground",
              )}
            >
              <Smartphone className="h-3.5 w-3.5" />
              Mobile
            </button>
          </div>
        </div>

        <div className="flex flex-1 items-start justify-center overflow-y-auto p-5 sm:p-8">
          <StudioFullPreview />
        </div>
      </div>
    </div>
  );
}
