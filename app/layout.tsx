import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import { SiteChrome } from "@/components/layout/SiteChrome";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Cloud Agency — Сайти, боти та автоматизація",
  description:
    "Веб-розробка, Telegram-боти та бізнес-автоматизація. Сайти, CRM-воркфлоу, n8n і AI — під ключ.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${onest.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-black font-[family-name:var(--font-onest)] text-white antialiased">
        <SiteChrome>
          <main className="flex-1">{children}</main>
        </SiteChrome>
      </body>
    </html>
  );
}
