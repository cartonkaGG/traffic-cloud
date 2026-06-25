"use client";

import { LITHOS_BG_IMAGE_1, LITHOS_BG_IMAGE_2 } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const DEFAULT_SPOTLIGHT_R = 260;

function LithosLogo() {
  return (
    <svg viewBox="0 0 256 256" width={26} height={26} fill="#ffffff" aria-hidden>
      <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
    </svg>
  );
}

interface LithosHeroPreviewProps {
  brandName?: string;
  compact?: boolean;
  fullPage?: boolean;
}

export function LithosHeroPreview({
  brandName = "Lithos",
  compact = false,
  fullPage = false,
}: LithosHeroPreviewProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const mouse = useRef({ x: -1, y: -1 });
  const smooth = useRef({ x: -1, y: -1 });
  const rafRef = useRef<number | undefined>(undefined);
  const [cursorPos, setCursorPos] = useState({ x: -1, y: -1 });
  const [hasPointer, setHasPointer] = useState(false);

  const spotlightR = compact ? 100 : DEFAULT_SPOTLIGHT_R;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const setDefaultCenter = () => {
      const rect = section.getBoundingClientRect();
      const cx = rect.width * 0.55;
      const cy = rect.height * 0.45;
      mouse.current = { x: cx, y: cy };
      smooth.current = { x: cx, y: cy };
      setCursorPos({ x: cx, y: cy });
    };

    setDefaultCenter();

    const setFromClient = (clientX: number, clientY: number) => {
      const rect = section.getBoundingClientRect();
      mouse.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
      setHasPointer(true);
    };

    const onPointerMove = (e: PointerEvent) => setFromClient(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) setFromClient(t.clientX, t.clientY);
    };

    let lastFrame = 0;
    const tick = (now: number) => {
      if (now - lastFrame >= 16) {
        smooth.current.x += (mouse.current.x - smooth.current.x) * 0.12;
        smooth.current.y += (mouse.current.y - smooth.current.y) * 0.12;
        setCursorPos({ x: smooth.current.x, y: smooth.current.y });
        lastFrame = now;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    section.addEventListener("pointermove", onPointerMove, { passive: true });
    section.addEventListener("touchmove", onTouchMove, { passive: true });

    const ro = new ResizeObserver(setDefaultCenter);
    ro.observe(section);

    return () => {
      ro.disconnect();
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("touchmove", onTouchMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [compact]);

  const navLinks = [
    { label: "Курс", active: true },
    { label: "Путівники" },
    { label: "Геологія" },
    { label: "Тарифи" },
    { label: "Тур" },
  ];

  const maskStyle = {
    WebkitMaskImage: `radial-gradient(circle ${spotlightR}px at ${cursorPos.x}px ${cursorPos.y}px, black 0%, black 38%, rgba(0,0,0,0.75) 58%, rgba(0,0,0,0.2) 78%, transparent 100%)`,
    maskImage: `radial-gradient(circle ${spotlightR}px at ${cursorPos.x}px ${cursorPos.y}px, black 0%, black 38%, rgba(0,0,0,0.75) 58%, rgba(0,0,0,0.2) 78%, transparent 100%)`,
    opacity: hasPointer || compact ? 1 : 0.85,
  };

  return (
    <section
      ref={sectionRef}
      className={cn(
        "@container relative w-full overflow-hidden bg-black tracking-[-0.02em] touch-pan-y",
        fullPage
          ? compact
            ? "min-h-[480px]"
            : "min-h-[min(100dvh,720px)]"
          : compact
            ? "min-h-[480px]"
            : "min-h-[min(85vh,720px)]",
      )}
      style={{
        height: fullPage && !compact ? "min(100dvh, 720px)" : undefined,
        fontFamily: "var(--font-inter), Inter, sans-serif",
      }}
    >
      <div
        className="hero-zoom absolute inset-0 z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${LITHOS_BG_IMAGE_1})` }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-30 bg-cover bg-center bg-no-repeat transition-opacity duration-300"
        style={{
          backgroundImage: `url(${LITHOS_BG_IMAGE_2})`,
          ...maskStyle,
        }}
      />

      <nav className="absolute left-0 right-0 top-0 z-[100] flex items-center justify-between p-3 sm:p-4">
        <div className="flex min-w-0 items-center gap-2">
          <LithosLogo />
          <span
            className="truncate font-[family-name:var(--font-playfair)] text-base italic text-white sm:text-2xl"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
          >
            {brandName}
          </span>
        </div>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 rounded-full border border-white/30 bg-white/20 px-1.5 py-1.5 backdrop-blur-md lg:flex">
          {navLinks.map((link) => (
            <span
              key={link.label}
              className={cn(
                "whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors sm:px-3 sm:py-1.5 sm:text-xs",
                link.active
                  ? "bg-white text-gray-900"
                  : "text-white/80 hover:bg-white/20 hover:text-white",
              )}
            >
              {link.label}
            </span>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white lg:hidden"
            aria-label="Меню"
          >
            <Menu className="h-4 w-4" />
          </button>
          <span className="hidden rounded-full bg-white px-4 py-1.5 text-[10px] font-semibold text-gray-900 sm:inline-block sm:px-5 sm:py-2 sm:text-xs">
            Реєстрація
          </span>
        </div>
      </nav>

      <div className="pointer-events-none absolute left-0 right-0 top-[12%] z-50 flex flex-col items-center px-4 text-center sm:top-[14%] sm:px-5">
        <h1 className="leading-[0.95] text-white">
          <span
            className="hero-anim hero-reveal block font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,9cqw,3.75rem)] font-normal italic"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              letterSpacing: "-0.05em",
              animationDelay: "0.25s",
            }}
          >
            Шари зберігають
          </span>
          <span
            className="hero-anim hero-reveal -mt-0.5 block text-[clamp(1.75rem,9cqw,3.75rem)] font-normal sm:-mt-1"
            style={{
              letterSpacing: "-0.08em",
              animationDelay: "0.42s",
            }}
          >
            історію часу
          </span>
        </h1>
      </div>

      <div
        className="hero-anim hero-fade pointer-events-none absolute bottom-10 left-4 z-50 hidden max-w-[220px] sm:block md:left-8"
        style={{ animationDelay: "0.7s" }}
      >
        <p className="text-xs leading-relaxed text-white/80 md:text-sm">
          Кожен шар осаду — розділ планети: від давніх морських днів до попелу
          вітрів, накладених мільйонами років під нашими ногами.
        </p>
      </div>

      <div
        className="hero-anim hero-fade absolute bottom-6 left-4 right-4 z-50 flex max-w-full flex-col items-start gap-3 sm:bottom-16 sm:left-auto sm:right-6 sm:max-w-[240px] sm:gap-4 md:right-8"
        style={{ animationDelay: "0.85s" }}
      >
        <p className="text-[11px] leading-relaxed text-white/80 sm:text-sm">
          Інтерактивні карти дозволяють зняти верхній шар кірки й простежити, як
          каміння, скамʼяніності та глибокий час формують землю під вами.
        </p>
        <button
          type="button"
          className="rounded-full bg-[#e8702a] px-5 py-2 text-[11px] font-medium text-white transition-all hover:scale-[1.03] hover:bg-[#d2611f] hover:shadow-lg hover:shadow-[#e8702a]/30 active:scale-95 sm:px-7 sm:py-3 sm:text-sm"
        >
          Почати дослідження
        </button>
      </div>
    </section>
  );
}
