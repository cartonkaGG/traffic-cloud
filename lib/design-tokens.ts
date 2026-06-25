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
  lithos: {
    id: "lithos",
    label: "Lithos",
    bg: "#000000",
    surface: "#0a0a0a",
    text: "#ffffff",
    muted: "#a3a3a3",
    accent: "#e8702a",
    accent2: "#d2611f",
  },
  jack: {
    id: "jack",
    label: "Jack",
    bg: "#0C0C0C",
    surface: "#141414",
    text: "#D7E2EA",
    muted: "#8a9aa6",
    accent: "#B600A8",
    accent2: "#BE4C00",
  },
  digitalEpoch: {
    id: "digital-epoch",
    label: "Digital Epoch",
    bg: "#f9fafb",
    surface: "#ffffff",
    text: "#0a1b33",
    muted: "#64748b",
    accent: "#0a152d",
    accent2: "#3b82f6",
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
  playfairInter: {
    id: "playfair-inter",
    label: "Playfair Display + Inter",
    heading: "var(--font-playfair)",
    body: "var(--font-inter)",
  },
  kanitKanit: {
    id: "kanit",
    label: "Kanit",
    heading: "var(--font-kanit)",
    body: "var(--font-kanit)",
  },
  outfitInter: {
    id: "outfit-inter",
    label: "Outfit + Inter",
    heading: "var(--font-outfit)",
    body: "var(--font-inter)",
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

export const themeCategories = [
  "Всі",
  "Герой",
  "Лендінг",
  "Агенція",
  "SaaS",
  "Фінтех",
  "Портфоліо",
] as const;

export type ThemeCategory = (typeof themeCategories)[number];

export type SiteTheme = {
  id: string;
  label: string;
  category: Exclude<ThemeCategory, "Всі">;
  description: string;
  palette: PaletteId;
  style: StyleId;
  fonts: FontPairingId;
  borderRadius: BorderRadiusId;
  premium?: boolean;
  template?: "lithos" | "jack" | "digital-epoch";
};

export const LITHOS_BG_IMAGE_1 =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85";

export const LITHOS_BG_IMAGE_2 =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85";

export const siteThemes: SiteTheme[] = [
  {
    id: "liquid-glass",
    label: "Рідке скло",
    category: "Агенція",
    description: "Скляні панелі, преміум-подача",
    palette: "midnight",
    style: "glass",
    fonts: "syneInter",
    borderRadius: "round",
    premium: true,
  },
  {
    id: "golden-portal",
    label: "Золотий портал",
    category: "Лендінг",
    description: "Теплий контраст і золоті акценти",
    palette: "gold",
    style: "bold",
    fonts: "playfairJakarta",
    borderRadius: "soft",
    premium: true,
  },
  {
    id: "neon-logic",
    label: "Неонова логіка",
    category: "SaaS",
    description: "Неоновий tech-настрій",
    palette: "neon",
    style: "bold",
    fonts: "clashInter",
    borderRadius: "sharp",
  },
  {
    id: "securify",
    label: "Securify Data",
    category: "SaaS",
    description: "Мінімалізм для security-продуктів",
    palette: "slate",
    style: "minimal",
    fonts: "spaceDm",
    borderRadius: "soft",
  },
  {
    id: "aurora-hero",
    label: "Аврора",
    category: "Герой",
    description: "Північне сяйво та gradient glow",
    palette: "aurora",
    style: "glass",
    fonts: "soraInter",
    borderRadius: "round",
    premium: true,
  },
  {
    id: "ocean-wave",
    label: "Океанська хвиля",
    category: "Герой",
    description: "Глибокий океан, спокійний вайб",
    palette: "ocean",
    style: "minimal",
    fonts: "outfitManrope",
    borderRadius: "soft",
  },
  {
    id: "modern-agency",
    label: "Сучасна агенція",
    category: "Агенція",
    description: "Чистий агенційний стиль",
    palette: "lavender",
    style: "editorial",
    fonts: "frauncesSource",
    borderRadius: "soft",
  },
  {
    id: "finflow",
    label: "FinFlow",
    category: "Фінтех",
    description: "Fintech: довіра та структура",
    palette: "slate",
    style: "minimal",
    fonts: "spaceDm",
    borderRadius: "sharp",
    premium: true,
  },
  {
    id: "desert-sand",
    label: "Пустельний пісок",
    category: "Лендінг",
    description: "Світла lifestyle-тема",
    palette: "sand",
    style: "editorial",
    fonts: "libreDm",
    borderRadius: "round",
  },
  {
    id: "ember-craft",
    label: "Вогняний craft",
    category: "Лендінг",
    description: "Теплий ремісничий стиль",
    palette: "ember",
    style: "bold",
    fonts: "bebasWork",
    borderRadius: "soft",
  },
  {
    id: "forest-mint",
    label: "Органічна одіссея",
    category: "Лендінг",
    description: "Еко та природні відтінки",
    palette: "forest",
    style: "minimal",
    fonts: "outfitManrope",
    borderRadius: "round",
  },
  {
    id: "rose-velvet",
    label: "Bloom",
    category: "Герой",
    description: "Мʼякий rose для lifestyle-брендів",
    palette: "rose",
    style: "glass",
    fonts: "playfairJakarta",
    borderRadius: "pill",
    premium: true,
  },
  {
    id: "cherry-pop",
    label: "Вишневий поп",
    category: "Герой",
    description: "Сміливий червоний акцент",
    palette: "cherry",
    style: "bold",
    fonts: "bebasWork",
    borderRadius: "sharp",
  },
  {
    id: "synapse-dark",
    label: "Synapse Dark",
    category: "SaaS",
    description: "Темний UI для AI SaaS",
    palette: "midnight",
    style: "minimal",
    fonts: "clashInter",
    borderRadius: "soft",
    premium: true,
  },
  {
    id: "creative-studio",
    label: "Prisma Creative",
    category: "Агенція",
    description: "Креативна студія, editorial",
    palette: "lavender",
    style: "editorial",
    fonts: "frauncesSource",
    borderRadius: "round",
  },
  {
    id: "lithos",
    label: "Літос · Геологія",
    category: "Герой",
    description: "Spotlight reveal для geology-бренду",
    palette: "lithos",
    style: "editorial",
    fonts: "playfairInter",
    borderRadius: "pill",
    premium: true,
    template: "lithos",
  },
  {
    id: "jack",
    label: "Джек · 3D креатор",
    category: "Портфоліо",
    description: "Портфоліо 3D-креатора з магнітним hero",
    palette: "jack",
    style: "bold",
    fonts: "kanitKanit",
    borderRadius: "round",
    premium: true,
    template: "jack",
  },
  {
    id: "digital-epoch",
    label: "Цифрова епоха",
    category: "Лендінг",
    description: "Відео-hero з плаваючим navbar і marquee",
    palette: "digitalEpoch",
    style: "minimal",
    fonts: "outfitInter",
    borderRadius: "round",
    premium: true,
    template: "digital-epoch",
  },
  {
    id: "wealth-video",
    label: "Wealth Video",
    category: "Фінтех",
    description: "Преміум fintech hero",
    palette: "gold",
    style: "glass",
    fonts: "libreDm",
    borderRadius: "soft",
    premium: true,
  },
];

export type SiteThemeId = (typeof siteThemes)[number]["id"];
