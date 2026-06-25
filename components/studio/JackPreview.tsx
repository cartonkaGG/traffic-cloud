"use client";

import {
  AnimatedScrollText,
  FadeIn,
  JackContactButton,
  Magnet,
} from "@/components/studio/studio-motion";
import { useTemplateScroll } from "@/components/studio/template-preview-context";
import {
  JACK_DECOR,
  JACK_MARQUEE_GIFS,
  JACK_PORTRAIT,
  JACK_PROJECTS,
} from "@/lib/theme-assets";
import { cn } from "@/lib/utils";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SERVICES = [
  {
    n: "01",
    title: "3D моделювання",
    desc: "Детальні обʼєкти, персонажі та середовища під ігри, продукти й візуалізації.",
  },
  {
    n: "02",
    title: "Рендеринг",
    desc: "Фотореалістичні рендери зі світлом, текстурами та матеріалами.",
  },
  {
    n: "03",
    title: "Моушн-дизайн",
    desc: "Динамічна анімація та motion graphics для брендів і продуктів.",
  },
  {
    n: "04",
    title: "Брендинг",
    desc: "Візуальна ідентичність — від логотипу до повної системи бренду.",
  },
  {
    n: "05",
    title: "Веб-дизайн",
    desc: "Сучасні сайти з фокусом на типографіку та UX.",
  },
];

const ABOUT_TEXT =
  "Понад пʼять років у дизайні — брендинг, веб і UX. Працюю з бізнесами, які хочуть виділятись. Давайте створимо щось неймовірне разом!";

function ScrollMarqueeSection({
  compact,
  gifCount,
}: {
  compact: boolean;
  gifCount: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRoot = useTemplateScroll();
  const reduced = useReducedMotion();
  const [offsets, setOffsets] = useState({ right: 0, left: 0 });

  const row1 = JACK_MARQUEE_GIFS.slice(0, Math.ceil(gifCount / 2));
  const row2 = JACK_MARQUEE_GIFS.slice(Math.ceil(gifCount / 2), gifCount);

  useEffect(() => {
    const root = scrollRoot?.current;
    const section = sectionRef.current;
    if (!root || !section) return;

    const update = () => {
      const innerHeight = root.clientHeight;
      const scrollY = root.scrollTop;
      const sectionTop = section.offsetTop;
      const shift = (scrollY - sectionTop + innerHeight) * 0.3;
      setOffsets({ right: shift, left: -shift });
    };

    root.addEventListener("scroll", update, { passive: true });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(root);

    return () => {
      root.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [scrollRoot]);

  if (reduced) {
    return (
      <section ref={sectionRef} className="bg-[#0C0C0C] pb-8 pt-12 sm:pt-16">
        <MarqueeRow images={row1} compact={compact} staticOffset={0} />
        <div className="mt-3">
          <MarqueeRow images={row2} compact={compact} staticOffset={0} />
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="bg-[#0C0C0C] pb-8 pt-12 sm:pt-16">
      <MarqueeRow images={row1} compact={compact} staticOffset={offsets.right} />
      <div className="mt-3">
        <MarqueeRow images={row2} compact={compact} staticOffset={offsets.left} />
      </div>
    </section>
  );
}

function MarqueeRow({
  images,
  compact,
  staticOffset,
}: {
  images: string[];
  compact: boolean;
  staticOffset: number;
}) {
  const doubled = [...images, ...images];

  return (
    <div className="overflow-hidden">
      <div
        className="flex gap-2 will-change-transform sm:gap-3"
        style={{
          transform: `translate3d(${staticOffset}px, 0, 0)`,
          transition: "transform 0.05s linear",
        }}
      >
        {doubled.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className={cn(
              "relative shrink-0 overflow-hidden rounded-xl sm:rounded-2xl",
              compact ? "h-[88px] w-[132px]" : "h-[120px] w-[180px] sm:h-[160px] sm:w-[240px] md:h-[200px] md:w-[300px]",
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              loading={i < 4 ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  total,
  compact,
}: {
  project: (typeof JACK_PROJECTS)[number];
  index: number;
  total: number;
  compact: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const scrollRoot = useTemplateScroll();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    container: scrollRoot ?? undefined,
    offset: ["start end", "start 0.2"],
  });

  const targetEnd = 1 - (total - 1 - index) * (compact ? 0.04 : 0.05);
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetEnd]);

  return (
    <div
      ref={cardRef}
      className="sticky"
      style={{ top: compact ? `${56 + index * 14}px` : `${64 + index * 20}px` }}
    >
      <motion.div
        className={cn(
          "rounded-[24px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-3 sm:rounded-[40px] sm:p-6",
          reduced && "scale-[var(--card-scale)]",
        )}
        style={reduced ? { ["--card-scale" as string]: targetEnd } : { scale }}
      >
        <div className="mb-3 flex flex-wrap items-start justify-between gap-2 sm:mb-4 sm:gap-3">
          <span className="jack-hero-heading text-3xl font-black sm:text-6xl">
            {project.number}
          </span>
          <div className="text-right">
            <p className="text-[9px] uppercase tracking-widest text-[#D7E2EA]/60 sm:text-[10px]">
              {project.category}
            </p>
            <p className="text-xs font-medium uppercase text-[#D7E2EA] sm:text-base">
              {project.name}
            </p>
          </div>
          <button
            type="button"
            className="rounded-full border-2 border-[#D7E2EA] px-3 py-1 text-[9px] font-medium uppercase tracking-widest text-[#D7E2EA] hover:bg-[#D7E2EA]/10 sm:px-4 sm:py-1.5 sm:text-xs"
          >
            Переглянути
          </button>
        </div>
        <div className="grid grid-cols-5 gap-1.5 sm:gap-3">
          <div className="col-span-2 flex flex-col gap-1.5 sm:gap-3">
            <div className="relative h-16 overflow-hidden rounded-2xl sm:h-28 md:h-36">
              <Image src={project.images[0]} alt="" fill className="object-cover" sizes="160px" />
            </div>
            <div className="relative h-20 overflow-hidden rounded-2xl sm:h-32 md:h-44">
              <Image src={project.images[1]} alt="" fill className="object-cover" sizes="160px" />
            </div>
          </div>
          <div className="relative col-span-3 min-h-[110px] overflow-hidden rounded-2xl sm:min-h-[180px] md:min-h-[220px]">
            <Image src={project.images[2]} alt="" fill className="object-cover" sizes="280px" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface JackPreviewProps {
  brandName?: string;
  compact?: boolean;
}

export function JackPreview({ brandName = "Jack", compact = false }: JackPreviewProps) {
  const nav = ["Про мене", "Ціни", "Проєкти", "Контакт"];
  const displayName =
    brandName.toLowerCase() === "jack" ? "джек" : brandName.toLowerCase();
  const gifCount = compact ? 10 : 16;

  return (
    <div
      className="@container overflow-x-clip bg-[#0C0C0C] font-[family-name:var(--font-kanit)] text-[#D7E2EA]"
      style={{ fontFamily: "var(--font-kanit), Kanit, sans-serif" }}
    >
      <section
        className={cn(
          "relative overflow-hidden",
          compact ? "h-[500px]" : "h-[560px] sm:h-[600px]",
        )}
      >
        <FadeIn y={-12} className="relative z-30 shrink-0">
          <nav className="flex items-center justify-between px-4 pt-3 sm:px-8 sm:pt-5">
            <span className="text-[10px] font-medium uppercase tracking-wider opacity-80 sm:hidden">
              {brandName}
            </span>
            <div className="hidden flex-1 justify-between text-xs font-medium uppercase tracking-wider sm:flex sm:text-sm md:text-base">
              {nav.map((l) => (
                <span key={l} className="transition-opacity hover:opacity-70">
                  {l}
                </span>
              ))}
            </div>
            <div className="flex flex-1 justify-end gap-3 sm:hidden">
              <span className="text-[10px] font-medium uppercase tracking-wider">
                {nav[0]}
              </span>
              <button type="button" aria-label="Меню" className="text-[#D7E2EA]">
                <Menu className="h-4 w-4" />
              </button>
            </div>
          </nav>
        </FadeIn>

        <div className="relative z-30 px-3 pt-1 sm:px-6">
          <FadeIn delay={0.1} y={16}>
            <h1 className="jack-hero-heading text-center font-black uppercase leading-[0.9] tracking-tight text-[clamp(1.35rem,10cqw,3rem)]">
              <span className="block">Привіт,</span>
              <span className="block">я {displayName}</span>
            </h1>
          </FadeIn>
        </div>

        <Magnet
          padding={compact ? 50 : 80}
          strength={compact ? 4 : 3}
          className={cn(
            "absolute left-1/2 z-10 -translate-x-1/2",
            compact
              ? "bottom-[72px] w-[min(46cqw,180px)]"
              : "bottom-[76px] w-[min(38cqw,260px)] sm:bottom-[80px] sm:w-[min(34cqw,300px)]",
          )}
        >
          <FadeIn delay={0.35} y={20}>
            <div className="relative aspect-[3/4] w-full">
              <Image
                src={JACK_PORTRAIT}
                alt={brandName}
                fill
                className="object-cover object-top"
                sizes={compact ? "180px" : "(max-width:768px) 260px, 300px"}
                priority
              />
            </div>
          </FadeIn>
        </Magnet>

        <div className="absolute bottom-0 left-0 right-0 z-30 flex items-end justify-between gap-3 px-4 pb-4 sm:px-8 sm:pb-6">
          <FadeIn delay={0.35} y={20} className="max-w-[45%] sm:max-w-[220px]">
            <p className="text-[9px] font-light uppercase leading-snug tracking-wide sm:text-xs md:text-sm">
              3d-креатор яскравих і незабутніх проєктів
            </p>
          </FadeIn>
          <FadeIn delay={0.5} y={20}>
            <JackContactButton small={compact} />
          </FadeIn>
        </div>
      </section>

      <ScrollMarqueeSection compact={compact} gifCount={gifCount} />

      <section className="relative flex min-h-[360px] items-center justify-center px-4 py-14 sm:min-h-[420px] sm:px-8 sm:py-16">
        {!compact && (
          <>
            <Image
              src={JACK_DECOR.moon}
              alt=""
              width={120}
              height={120}
              className="absolute left-[2%] top-[4%] w-12 opacity-90 sm:w-24 md:w-28"
            />
            <Image
              src={JACK_DECOR.object}
              alt=""
              width={100}
              height={100}
              className="absolute bottom-[8%] left-[6%] w-10 sm:w-20 md:w-24"
            />
            <Image
              src={JACK_DECOR.lego}
              alt=""
              width={120}
              height={120}
              className="absolute right-[2%] top-[4%] w-12 sm:w-24 md:w-28"
            />
            <Image
              src={JACK_DECOR.group}
              alt=""
              width={130}
              height={130}
              className="absolute bottom-[8%] right-[6%] w-12 sm:w-28"
            />
          </>
        )}

        <div className="relative z-10 flex max-w-lg flex-col items-center gap-6 text-center sm:gap-12">
          <FadeIn>
            <h2 className="jack-hero-heading text-3xl font-black uppercase leading-none tracking-tight sm:text-6xl md:text-7xl">
              Про мене
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <AnimatedScrollText
              text={ABOUT_TEXT}
              className="max-w-md text-xs font-medium leading-relaxed text-[#D7E2EA] sm:text-base"
            />
          </FadeIn>
          <FadeIn delay={0.25}>
            <JackContactButton small={compact} />
          </FadeIn>
        </div>
      </section>

      <section className="rounded-t-[32px] bg-white px-4 py-12 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:py-20 md:rounded-t-[60px]">
        <h2 className="mb-8 text-center text-3xl font-black uppercase sm:mb-14 sm:text-6xl md:text-7xl">
          Послуги
        </h2>
        <div className="mx-auto max-w-3xl">
          {SERVICES.map((s, i) => (
            <FadeIn key={s.n} delay={i * 0.08}>
              <div className="border-t border-[#0C0C0C]/15 py-5 sm:py-8">
                <div className="flex gap-3 sm:gap-8">
                  <span className="text-2xl font-black sm:text-5xl md:text-6xl">{s.n}</span>
                  <div>
                    <p className="text-xs font-medium uppercase sm:text-lg">{s.title}</p>
                    <p className="mt-1 max-w-xl text-[11px] font-light leading-relaxed opacity-60 sm:text-sm">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="relative z-10 -mt-6 rounded-t-[32px] bg-[#0C0C0C] px-4 pb-14 pt-12 sm:-mt-10 sm:rounded-t-[50px] sm:px-8 sm:pb-16 sm:pt-14 md:rounded-t-[60px]">
        <h2 className="jack-hero-heading mb-8 text-center text-3xl font-black uppercase sm:mb-12 sm:text-6xl">
          Проєкти
        </h2>
        <div className="mx-auto max-w-3xl space-y-4 sm:space-y-6">
          {JACK_PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.number}
              project={p}
              index={i}
              total={JACK_PROJECTS.length}
              compact={compact}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
