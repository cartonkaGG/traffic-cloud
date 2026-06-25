"use client";

import type { CardStackItem } from "@/components/ui/card-stack";
import { cn } from "@/lib/utils";

export type ShowcaseWorkItem = CardStackItem & {
  videoSrc?: string;
  overlay?: "lithos" | "jack" | "saas";
};

function SiteOverlay({ type }: { type: ShowcaseWorkItem["overlay"] }) {
  if (type === "lithos") {
    return (
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute left-0 right-0 top-0 flex items-center justify-between px-3 pt-3 sm:px-4 sm:pt-4">
          <span className="font-serif text-[11px] italic text-white sm:text-sm">Lithos</span>
          <div className="hidden items-center gap-1 rounded-full border border-white/25 bg-white/15 px-2 py-1 backdrop-blur-sm sm:flex">
            {["Курс", "Тур", "Тарифи"].map((l) => (
              <span key={l} className="rounded-full px-2 py-0.5 text-[7px] text-white/90">
                {l}
              </span>
            ))}
          </div>
          <span className="rounded-full bg-white px-2.5 py-1 text-[7px] font-semibold text-black sm:text-[8px]">
            Увійти
          </span>
        </div>
        <div className="absolute left-0 right-0 top-[22%] text-center">
          <p className="font-serif text-sm italic leading-tight text-white sm:text-lg">
            Шари зберігають
          </p>
          <p className="text-sm leading-tight text-white sm:text-lg">історію часу</p>
        </div>
        <div className="absolute bottom-4 right-4 rounded-full bg-[#e8702a] px-3 py-1.5 text-[8px] font-medium text-white sm:text-[9px]">
          Почати дослідження
        </div>
      </div>
    );
  }

  if (type === "jack") {
    return (
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-[#0C0C0C]/30 via-transparent to-[#0C0C0C]/80">
        <div className="absolute left-0 right-0 top-0 flex justify-between px-3 pt-3 text-[7px] font-medium uppercase tracking-wider text-[#D7E2EA] sm:px-4 sm:pt-4 sm:text-[8px]">
          <span>Про мене</span>
          <span>Проєкти</span>
          <span>Контакт</span>
        </div>
        <p className="absolute left-0 right-0 top-[14%] text-center text-lg font-black uppercase leading-none text-[#D7E2EA]/90 sm:top-[12%] sm:text-2xl">
          Привіт, я джек
        </p>
        <div className="absolute bottom-3 left-3 max-w-[45%] text-[7px] uppercase leading-snug text-[#D7E2EA]/80 sm:bottom-4 sm:left-4 sm:text-[8px]">
          3d-креатор яскравих проєктів
        </div>
        <div className="absolute bottom-3 right-3 rounded-full border border-white px-2 py-1 text-[7px] text-white sm:bottom-4 sm:right-4 sm:text-[8px]">
          Звʼязатись
        </div>
      </div>
    );
  }

  if (type === "saas") {
    return (
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
          <p className="text-sm font-medium leading-tight text-[#0a1b33] sm:text-xl">
            Фундамент нової
            <br />
            цифрової епохи
          </p>
          <p className="mt-1 max-w-[70%] text-[8px] text-[#64748b] sm:text-[10px]">
            Продукти, екосистеми та децентралізований веб
          </p>
        </div>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-slate-200/50 bg-white/90 px-2 py-1 shadow-lg backdrop-blur-md sm:bottom-5">
          <span className="text-[8px] font-semibold text-slate-500">Продукти</span>
          <span className="rounded-full bg-[#0a152d] px-2 py-0.5 text-[8px] font-semibold text-white">
            На звʼязку
          </span>
        </div>
      </div>
    );
  }

  return null;
}

export function WebsiteShowcaseCard({
  item,
  active,
}: {
  item: ShowcaseWorkItem;
  active: boolean;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
      {item.videoSrc ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover object-top"
        >
          <source src={item.videoSrc} type="video/mp4" />
        </video>
      ) : item.imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.imageSrc}
          alt={item.title}
          className={cn(
            "h-full w-full object-cover",
            item.overlay === "jack" ? "object-top" : "object-center",
          )}
          draggable={false}
          loading={active ? "eager" : "lazy"}
        />
      ) : null}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/5" />
      <SiteOverlay type={item.overlay} />
    </div>
  );
}
