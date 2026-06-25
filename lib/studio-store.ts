import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  blockDefinitions,
  borderRadiusPresets,
  fontPairings,
  getBorderRadius,
  industries,
  pageOptions,
  palettePresets,
  siteThemes,
  stylePresets,
  type BlockId,
  type BorderRadiusId,
  type FontPairingId,
  type PaletteId,
  type SiteThemeId,
  type StyleId,
} from "./design-tokens";

type PreviewDevice = "desktop" | "mobile";

const defaultBlocks = Object.fromEntries(
  blockDefinitions.map((b) => [
    b.id,
    ["hero", "features", "stats", "testimonials", "cta", "contact"].includes(
      b.id,
    ),
  ]),
) as Record<BlockId, boolean>;

interface StudioState {
  brandName: string;
  industry: string;
  themeId: SiteThemeId;
  style: StyleId;
  palette: PaletteId;
  fonts: FontPairingId;
  borderRadius: BorderRadiusId;
  pages: string[];
  blocks: Record<BlockId, boolean>;
  brief: string;
  previewDevice: PreviewDevice;
  setBrandName: (name: string) => void;
  setIndustry: (industry: string) => void;
  applyTheme: (themeId: SiteThemeId) => void;
  setStyle: (style: StyleId) => void;
  setPalette: (palette: PaletteId) => void;
  setFonts: (fonts: FontPairingId) => void;
  setBorderRadius: (radius: BorderRadiusId) => void;
  togglePage: (page: string) => void;
  toggleBlock: (block: BlockId) => void;
  setBrief: (brief: string) => void;
  setPreviewDevice: (device: PreviewDevice) => void;
  exportTokens: () => string;
}

export const useStudioStore = create<StudioState>()(
  persist(
    (set, get) => ({
      brandName: "Ваш Бренд",
      industry: industries[0],
      themeId: "liquid-glass",
      style: "glass",
      palette: "midnight",
      fonts: "syneInter",
      borderRadius: "round",
      pages: ["Landing", "Про нас", "Контакти"],
      blocks: defaultBlocks,
      brief: "",
      previewDevice: "desktop",

      setBrandName: (brandName) => set({ brandName }),
      setIndustry: (industry) => set({ industry }),
      applyTheme: (themeId) => {
        const theme = siteThemes.find((t) => t.id === themeId);
        if (!theme) return;
        set({
          themeId,
          palette: theme.palette,
          style: theme.style,
          fonts: theme.fonts,
          borderRadius: theme.borderRadius,
          ...(themeId === "lithos"
            ? {
                brandName: "Lithos",
                industry: "Освіта",
                pages: [
                  "Course",
                  "Field Guides",
                  "Geology",
                  "Plans",
                  "Live Tour",
                ],
              }
            : {}),
          ...(themeId === "jack"
            ? {
                brandName: "Jack",
                industry: "Портфоліо",
                pages: ["Про мене", "Ціни", "Проєкти", "Контакт"],
              }
            : {}),
          ...(themeId === "digital-epoch"
            ? {
                brandName: "Digital Epoch",
                industry: "SaaS / Tech",
                pages: ["Продукти", "Документація", "Контакт"],
              }
            : {}),
        });
      },
      setStyle: (style) => set({ style }),
      setPalette: (palette) => set({ palette }),
      setFonts: (fonts) => set({ fonts }),
      setBorderRadius: (borderRadius) => set({ borderRadius }),
      togglePage: (page) =>
        set((state) => ({
          pages: state.pages.includes(page)
            ? state.pages.filter((p) => p !== page)
            : [...state.pages, page],
        })),
      toggleBlock: (block) =>
        set((state) => ({
          blocks: { ...state.blocks, [block]: !state.blocks[block] },
        })),
      setBrief: (brief) => set({ brief }),
      setPreviewDevice: (previewDevice) => set({ previewDevice }),

      exportTokens: () => {
        const state = get();
        const colors = palettePresets[state.palette];
        const fontPair = fontPairings[state.fonts];
        const radius = getBorderRadius(state.borderRadius);

        return JSON.stringify(
          {
            brand: state.brandName,
            industry: state.industry,
            theme: state.themeId,
            template: siteThemes.find((t) => t.id === state.themeId)?.template,
            style: state.style,
            borderRadius: radius,
            colors,
            typography: fontPair,
            pages: state.pages,
            blocks: Object.entries(state.blocks)
              .filter(([, on]) => on)
              .map(([id]) => id),
            brief: state.brief,
            generatedAt: new Date().toISOString(),
          },
          null,
          2,
        );
      },
    }),
    {
      name: "cloud-studio-config",
      partialize: (state) => ({
        brandName: state.brandName,
        industry: state.industry,
        themeId: state.themeId,
        style: state.style,
        palette: state.palette,
        fonts: state.fonts,
        borderRadius: state.borderRadius,
        pages: state.pages,
        blocks: state.blocks,
        brief: state.brief,
      }),
    },
  ),
);

export { borderRadiusPresets } from "./design-tokens";
