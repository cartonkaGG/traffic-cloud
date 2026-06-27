import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bot,
  Building2,
  CreditCard,
  Filter,
  Globe,
  Layers,
  LayoutTemplate,
  Package,
  Search,
  ShoppingBag,
  Smartphone,
  UserCircle,
  Workflow,
  Wrench,
} from "lucide-react";

export type ProductId =
  | "landing"
  | "mini-app"
  | "corporate"
  | "ecommerce"
  | "telegram-bot";

export type AddonId =
  | "online-payment"
  | "multi-language"
  | "personal-cabinet"
  | "catalog-1000"
  | "advanced-search"
  | "seo-package"
  | "crm-integration"
  | "analytics"
  | "admin-panel"
  | "support-3mo"
  | "automation";

export type PaymentPlan = "fifty-fifty" | "full" | "staged";

export type BaseProduct = {
  id: ProductId;
  title: string;
  subtitle: string;
  price: number;
  icon: LucideIcon;
  highlights: string[];
};

export type Addon = {
  id: AddonId;
  title: string;
  description: string;
  price: number;
  icon: LucideIcon;
  products: ProductId[];
};

export const PAYMENT_PLANS: {
  id: PaymentPlan;
  title: string;
  description: string;
}[] = [
  {
    id: "fifty-fifty",
    title: "50 / 50",
    description: "50% перед стартом робіт · 50% після здачі проєкту",
  },
  {
    id: "full",
    title: "Повна оплата",
    description: "100% оплата перед стартом робіт",
  },
  {
    id: "staged",
    title: "По етапах",
    description: "Оплата частинами: дизайн → розробка → тестування → запуск",
  },
];

export const BASE_PRODUCTS: BaseProduct[] = [
  {
    id: "landing",
    title: "Лендінг",
    subtitle: "односторінковий сайт",
    price: 100,
    icon: LayoutTemplate,
    highlights: ["1 сторінка", "форма заявки", "мобільна версія"],
  },
  {
    id: "mini-app",
    title: "Telegram Mini App",
    subtitle: "повноцінний додаток у Telegram",
    price: 1500,
    icon: Smartphone,
    highlights: ["tg sdk", "оплата", "кабінет користувача"],
  },
  {
    id: "corporate",
    title: "Корпоративний сайт",
    subtitle: "представницький сайт компанії",
    price: 1600,
    icon: Building2,
    highlights: ["до 8 сторінок", "адаптив", "cms-редагування"],
  },
  {
    id: "ecommerce",
    title: "Інтернет-магазин",
    subtitle: "каталог + оплата",
    price: 1400,
    icon: ShoppingBag,
    highlights: ["каталог", "кошик", "онлайн-оплата"],
  },
  {
    id: "telegram-bot",
    title: "Telegram-бот",
    subtitle: "автоматизація в месенджері",
    price: 600,
    icon: Bot,
    highlights: ["сценарії", "меню", "сповіщення"],
  },
];

export const ADDONS: Addon[] = [
  {
    id: "online-payment",
    title: "Онлайн-оплата",
    description: "LiqPay, Stripe, Monobank — checkout і webhooks",
    price: 280,
    icon: CreditCard,
    products: ["mini-app", "ecommerce", "corporate"],
  },
  {
    id: "multi-language",
    title: "Кілька мов",
    description: "UA / EN / PL — перемикач і переклад контенту",
    price: 220,
    icon: Globe,
    products: ["mini-app", "corporate", "ecommerce", "telegram-bot"],
  },
  {
    id: "personal-cabinet",
    title: "Особистий кабінет",
    description: "реєстрація, історія замовлень, профіль",
    price: 450,
    icon: UserCircle,
    products: ["corporate", "ecommerce", "mini-app"],
  },
  {
    id: "catalog-1000",
    title: "1000+ товарів",
    description: "масштабний каталог, імпорт, пагінація",
    price: 380,
    icon: Package,
    products: ["ecommerce"],
  },
  {
    id: "advanced-search",
    title: "Складна фільтрація та пошук",
    description: "фасети, сортування, автодоповнення",
    price: 320,
    icon: Filter,
    products: ["ecommerce", "corporate"],
  },
  {
    id: "seo-package",
    title: "SEO-пакет",
    description: "мета-теги, sitemap, schema, core web vitals",
    price: 180,
    icon: Search,
    products: ["corporate", "ecommerce"],
  },
  {
    id: "crm-integration",
    title: "CRM-інтеграція",
    description: "HubSpot, Pipedrive, KeyCRM — синхронізація лідів",
    price: 350,
    icon: Layers,
    products: ["corporate", "ecommerce", "telegram-bot"],
  },
  {
    id: "analytics",
    title: "Аналітика",
    description: "GA4, Meta Pixel, дашборд конверсій",
    price: 150,
    icon: BarChart3,
    products: ["mini-app", "corporate", "ecommerce", "telegram-bot"],
  },
  {
    id: "admin-panel",
    title: "Розширена адмін-панель",
    description: "ролі, логи, керування контентом і замовленнями",
    price: 300,
    icon: Wrench,
    products: ["ecommerce", "telegram-bot", "mini-app"],
  },
  {
    id: "automation",
    title: "Автоматизація n8n",
    description: "воркфлоу, webhooks, сповіщення в slack/tg",
    price: 400,
    icon: Workflow,
    products: ["corporate", "telegram-bot", "ecommerce"],
  },
  {
    id: "support-3mo",
    title: "Підтримка 3 місяці",
    description: "правки, моніторинг, дрібні доопрацювання",
    price: 240,
    icon: Package,
    products: ["mini-app", "corporate", "ecommerce", "telegram-bot"],
  },
];

export function getAddonsForProduct(productId: ProductId): Addon[] {
  if (productId === "landing") return [];
  return ADDONS.filter((a) => a.products.includes(productId));
}

export function getPaymentPlansForProduct(productId: ProductId | null) {
  if (productId === "landing") {
    return PAYMENT_PLANS.filter((plan) => plan.id !== "staged");
  }

  return PAYMENT_PLANS.filter((plan) => plan.id !== "full");
}

export function calculateTotal(
  productId: ProductId | null,
  selectedAddons: Set<AddonId>,
): { base: number; addons: number; total: number; lines: { label: string; price: number }[] } {
  if (!productId) {
    return { base: 0, addons: 0, total: 0, lines: [] };
  }

  const product = BASE_PRODUCTS.find((p) => p.id === productId)!;
  const available = getAddonsForProduct(productId);
  const lines: { label: string; price: number }[] = [
    { label: product.title, price: product.price },
  ];

  let addonsSum = 0;
  for (const addon of available) {
    if (selectedAddons.has(addon.id)) {
      addonsSum += addon.price;
      lines.push({ label: addon.title, price: addon.price });
    }
  }

  return {
    base: product.price,
    addons: addonsSum,
    total: product.price + addonsSum,
    lines,
  };
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getPaymentPlanLabel(plan: PaymentPlan): string {
  return PAYMENT_PLANS.find((p) => p.id === plan)?.title ?? plan;
}

export function normalizePhone(raw: string): string {
  return raw.replace(/[^\d+]/g, "");
}

export function isValidPhone(raw: string): boolean {
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15;
}
