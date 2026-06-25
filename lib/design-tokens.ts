export const midnightCloud = {
  bg: "#0A0A0F",
  surface: "#14141C",
  surfaceHover: "#1C1C28",
  text: "#F4F4F5",
  muted: "#71717A",
  accent: "#818CF8",
  accent2: "#22D3EE",
  border: "rgba(113, 113, 122, 0.2)",
} as const;

export type PaletteColors = {
  id: string;
  label: string;
  bg: string;
  surface: string;
  text: string;
  muted: string;
  accent: string;
  accent2: string;
};

export const palettePresets: Record<string, PaletteColors> = {
  midnight: {
    id: "midnight",
    label: "Midnight Cloud",
    bg: "#0A0A0F",
    surface: "#14141C",
    text: "#F4F4F5",
    muted: "#71717A",
    accent: "#818CF8",
    accent2: "#22D3EE",
  },
  aurora: {
    id: "aurora",
    label: "Aurora Studio",
    bg: "#0B1020",
    surface: "#12182B",
    text: "#F1F5F9",
    muted: "#64748B",
    accent: "#6366F1",
    accent2: "#06B6D4",
  },
  ember: {
    id: "ember",
    label: "Ember Craft",
    bg: "#0F0A09",
    surface: "#1A1210",
    text: "#FAFAF9",
    muted: "#78716C",
    accent: "#EA580C",
    accent2: "#0D9488",
  },
  forest: {
    id: "forest",
    label: "Forest Mint",
    bg: "#071210",
    surface: "#0F1F1A",
    text: "#ECFDF5",
    muted: "#6B8F7E",
    accent: "#34D399",
    accent2: "#A7F3D0",
  },
  rose: {
    id: "rose",
    label: "Rose Velvet",
    bg: "#100A0E",
    surface: "#1A1018",
    text: "#FFF1F2",
    muted: "#9F8A94",
    accent: "#FB7185",
    accent2: "#F472B6",
  },
  ocean: {
    id: "ocean",
    label: "Deep Ocean",
    bg: "#030712",
    surface: "#0C1424",
    text: "#E0F2FE",
    muted: "#5B7C99",
    accent: "#38BDF8",
    accent2: "#7DD3FC",
  },
  sand: {
    id: "sand",
    label: "Desert Sand",
    bg: "#FAF7F2",
    surface: "#FFFFFF",
    text: "#1C1917",
    muted: "#A8A29E",
    accent: "#D97706",
    accent2: "#B45309",
  },
  lavender: {
    id: "lavender",
    label: "Lavender Haze",
    bg: "#0E0A14",
    surface: "#171222",
    text: "#F5F3FF",
    muted: "#8B7FA8",
    accent: "#A78BFA",
    accent2: "#C4B5FD",
  },
  neon: {
    id: "neon",
    label: "Neon Pulse",
    bg: "#050508",
    surface: "#0D0D14",
    text: "#FAFAFA",
    muted: "#6B6B80",
    accent: "#E879F9",
    accent2: "#22D3EE",
  },
  slate: {
    id: "slate",
    label: "Slate Pro",
    bg: "#0F172A",
    surface: "#1E293B",
    text: "#F8FAFC",
    muted: "#94A3B8",
    accent: "#3B82F6",
    accent2: "#60A5FA",
  },
  gold: {
    id: "gold",
    label: "Golden Hour",
    bg: "#0C0A08",
    surface: "#171410",
    text: "#FEF3C7",
    muted: "#9C8B6E",
    accent: "#FBBF24",
    accent2: "#F59E0B",
  },
  cherry: {
    id: "cherry",
    label: "Cherry Pop",
    bg: "#140808",
    surface: "#1F0E0E",
    text: "#FEF2F2",
    muted: "#A88A8A",
    accent: "#EF4444",
    accent2: "#F87171",
  },
};

export type PaletteId = keyof typeof palettePresets;

export const fontPairings = {
  syneInter: {
    id: "syne-inter",
    label: "Syne + Inter",
    heading: "var(--font-syne)",
    body: "var(--font-inter)",
  },
  spaceDm: {
    id: "space-dm",
    label: "Space Grotesk + DM Sans",
    heading: "var(--font-space)",
    body: "var(--font-dm)",
  },
  frauncesSource: {
    id: "fraunces-source",
    label: "Fraunces + Source Sans",
    heading: "var(--font-fraunces)",
    body: "var(--font-source)",
  },
  outfitManrope: {
    id: "outfit-manrope",
    label: "Outfit + Manrope",
    heading: "var(--font-outfit)",
    body: "var(--font-manrope)",
  },
  playfairJakarta: {
    id: "playfair-jakarta",
    label: "Playfair + Jakarta",
    heading: "var(--font-playfair)",
    body: "var(--font-jakarta)",
  },
  soraInter: {
    id: "sora-inter",
    label: "Sora + Inter",
    heading: "var(--font-sora)",
    body: "var(--font-inter)",
  },
  libreDm: {
    id: "libre-dm",
    label: "Libre Baskerville + DM Sans",
    heading: "var(--font-libre)",
    body: "var(--font-dm)",
  },
  clashInter: {
    id: "unbounded-inter",
    label: "Unbounded + Inter",
    heading: "var(--font-unbounded)",
    body: "var(--font-inter)",
  },
  bebasWork: {
    id: "bebas-work",
    label: "Bebas Neue + Work Sans",
    heading: "var(--font-bebas)",
    body: "var(--font-work)",
  },
} as const;

export type FontPairingId = keyof typeof fontPairings;

export const stylePresets = [
  { id: "minimal", label: "Мінімалізм", description: "Чисті лінії, багато повітря" },
  { id: "glass", label: "Glass", description: "Скляні панелі, м'яке світло" },
  { id: "bold", label: "Bold", description: "Велика типографіка, контраст" },
  { id: "editorial", label: "Editorial", description: "Журнальна подача контенту" },
] as const;

export type StyleId = (typeof stylePresets)[number]["id"];

export const borderRadiusPresets = [
  { id: "sharp", label: "Sharp", value: "4px" },
  { id: "soft", label: "Soft", value: "12px" },
  { id: "round", label: "Round", value: "20px" },
  { id: "pill", label: "Pill", value: "999px" },
] as const;

export type BorderRadiusId = (typeof borderRadiusPresets)[number]["id"];

export const industries = [
  "SaaS / Tech",
  "Ресторан / Кафе",
  "Портфоліо",
  "E-commerce",
  "Агенція",
  "Освіта",
  "Медицина",
  "Нерухомість",
  "Фітнес",
  "Юридичні",
] as const;

export const pageOptions = [
  "Landing",
  "Про нас",
  "Послуги",
  "Портфоліо",
  "Ціни",
  "Блог",
  "Контакти",
  "FAQ",
  "Команда",
] as const;

export const blockDefinitions = [
  { id: "hero", label: "Hero", description: "Головний екран з заголовком і CTA" },
  { id: "features", label: "Переваги", description: "Сітка з ключовими фічами" },
  { id: "stats", label: "Статистика", description: "Цифри та досягнення" },
  { id: "gallery", label: "Галерея", description: "Зображення робіт / продуктів" },
  { id: "testimonials", label: "Відгуки", description: "Цитати клієнтів" },
  { id: "pricing", label: "Ціни", description: "Тарифні плани" },
  { id: "faq", label: "FAQ", description: "Часті питання" },
  { id: "cta", label: "CTA", description: "Заклик до дії" },
  { id: "contact", label: "Контакт", description: "Форма звʼязку" },
] as const;

export type BlockId = (typeof blockDefinitions)[number]["id"];

export function getBorderRadius(id: BorderRadiusId): string {
  return borderRadiusPresets.find((r) => r.id === id)?.value ?? "12px";
}
