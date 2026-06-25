import { StudioBuilder } from "@/components/studio/StudioBuilder";
import { StudioThemeFromUrl } from "@/components/studio/StudioThemeFromUrl";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Cloud Studio — Конструктор сайту | Cloud Agency",
  description:
    "Зберіть дизайн свого сайту: кольори, шрифти, блоки та сторінки. Live preview та експорт брифу.",
};

export default function StudioPage() {
  return (
    <div className="pt-14 sm:pt-16">
      <Suspense fallback={null}>
        <StudioThemeFromUrl />
      </Suspense>
      <StudioBuilder />
    </div>
  );
}
