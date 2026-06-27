import {
  BASE_PRODUCTS,
  calculateTotal,
  formatUsd,
  getPaymentPlanLabel,
  isValidPhone,
  normalizePhone,
  type AddonId,
  type PaymentPlan,
  type ProductId,
} from "@/lib/pricing";

type LeadPayload = {
  kind?: "calculator" | "contact";
  productId?: ProductId;
  addons?: AddonId[];
  paymentPlan?: PaymentPlan;
  phone?: string;
  name?: string;
  email?: string;
  message?: string;
};

const PRODUCT_IDS = new Set(BASE_PRODUCTS.map((product) => product.id));
const PAYMENT_PLANS = new Set<PaymentPlan>(["fifty-fifty", "full", "staged"]);

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function getPaymentDetails(plan: PaymentPlan, total: number) {
  if (plan === "fifty-fifty") {
    const firstPayment = Math.ceil(total / 2);
    const secondPayment = total - firstPayment;
    return `Перший платіж: ${formatUsd(firstPayment)}\nДругий платіж: ${formatUsd(secondPayment)}`;
  }

  if (plan === "full") {
    return `До оплати: ${formatUsd(total)}`;
  }

  return "Оплата частинами за етапами";
}

async function sendTelegramMessage(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("Telegram env variables are not configured");
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`Telegram request failed with ${response.status}`);
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as LeadPayload;
    const kind = payload.kind ?? "calculator";

    if (kind === "contact") {
      const name = payload.name?.trim() ?? "";
      const email = payload.email?.trim() ?? "";
      const message = payload.message?.trim() ?? "";

      if (!name || !email || !message) {
        return Response.json({ message: "Заповніть усі поля" }, { status: 400 });
      }

      await sendTelegramMessage(
        [
          "<b>Нова заявка з контактної форми</b>",
          "",
          `<b>Імʼя:</b> ${escapeHtml(name)}`,
          `<b>Email:</b> ${escapeHtml(email)}`,
          "",
          "<b>Повідомлення:</b>",
          escapeHtml(message),
        ].join("\n"),
      );

      return Response.json({ ok: true });
    }

    const { productId, paymentPlan = "fifty-fifty" } = payload;
    const phone = payload.phone?.trim() ?? "";
    const addons = Array.isArray(payload.addons) ? payload.addons : [];

    if (!productId || !PRODUCT_IDS.has(productId)) {
      return Response.json({ message: "Оберіть тип проєкту" }, { status: 400 });
    }

    if (!PAYMENT_PLANS.has(paymentPlan)) {
      return Response.json({ message: "Оберіть коректний спосіб оплати" }, { status: 400 });
    }

    if (!isValidPhone(phone)) {
      return Response.json({ message: "Введіть коректний номер телефону" }, { status: 400 });
    }

    const selectedAddons = new Set(addons);
    const { total, lines } = calculateTotal(productId, selectedAddons);
    const product = BASE_PRODUCTS.find((item) => item.id === productId)!;
    const details = lines
      .map((line) => `• ${escapeHtml(line.label)}: ${formatUsd(line.price)}`)
      .join("\n");

    await sendTelegramMessage(
      [
        "<b>Нова заявка з Cloud Agency</b>",
        "",
        `<b>Телефон:</b> ${escapeHtml(normalizePhone(phone))}`,
        `<b>Проєкт:</b> ${escapeHtml(product.title)}`,
        `<b>Оплата:</b> ${escapeHtml(getPaymentPlanLabel(paymentPlan))}`,
        `<b>Сума:</b> ${formatUsd(total)}`,
        "",
        "<b>Деталі:</b>",
        details,
        "",
        escapeHtml(getPaymentDetails(paymentPlan, total)),
      ].join("\n"),
    );

    return Response.json({ ok: true });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Не вдалося надіслати заявку. Спробуйте ще раз." },
      { status: 500 },
    );
  }
}
