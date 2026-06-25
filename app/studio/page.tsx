import { StudioBuilder } from "@/components/studio/StudioBuilder";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cloud Studio — Конструктор сайту | Cloud Agency",
  description:
    "Зберіть дизайн свого сайту: кольори, шрифти, блоки та сторінки. Live preview та експорт брифу.",
};

export default function StudioPage() {
  return (
    <div className="pt-16">
      <StudioBuilder />
    </div>
  );
}
