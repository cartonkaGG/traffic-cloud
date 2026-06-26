"use client";

import { SectionBackground } from "@/components/effects/SectionBackground";
import { Button } from "@/components/ui/Button";
import { CardStack } from "@/components/ui/card-stack";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  WebsiteShowcaseCard,
  type ShowcaseWorkItem,
} from "@/components/sections/WebsiteShowcaseCard";
import { LITHOS_BG_IMAGE_1 } from "@/lib/design-tokens";
import { DIGITAL_EPOCH_VIDEO, JACK_MARQUEE_GIFS } from "@/lib/theme-assets";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const WORKS: ShowcaseWorkItem[] = [
  {
    id: "lithos",
    title: "Преміум-лендінг з інтерактивним hero",
    description:
      "Кінематографічний фон, spotlight-reveal при наведенні, скляна навігація та типографіка під освітні й lifestyle-бренди.",
    imageSrc: LITHOS_BG_IMAGE_1,
    href: "/#contact",
    tag: "лендінг · motion",
    overlay: "lithos",
  },
  {
    id: "jack",
    title: "Портфоліо креатора з scroll-анімаціями",
    description:
      "Великий hero з персонажем, marquee проєктів, sticky-картки кейсів і магнітні ефекти — для дизайнерів та 3D-артистів.",
    imageSrc: JACK_MARQUEE_GIFS[12],
    href: "/#contact",
    tag: "портфоліо · 3d",
    overlay: "jack",
  },
  {
    id: "digital-epoch",
    title: "Tech/SaaS сайт з відео-hero",
    description:
      "Повноекранне відео, плаваючий navbar, чиста типографіка та marquee партнерів — для стартапів і продуктових команд.",
    imageSrc:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80&auto=format&fit=crop",
    videoSrc: DIGITAL_EPOCH_VIDEO,
    href: "/#contact",
    tag: "saas · fintech",
    overlay: "saas",
  },
];

function useCardDimensions() {
  const [dims, setDims] = useState({ width: 540, height: 380 });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 400) setDims({ width: 280, height: 400 });
      else if (w < 640) setDims({ width: 320, height: 420 });
      else if (w < 1024) setDims({ width: 420, height: 360 });
      else setDims({ width: 540, height: 380 });
    };

    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return dims;
}

export function PremiumShowcase() {
  const dims = useCardDimensions();

  const stackItems = useMemo(() => WORKS, []);

  return (
    <section
      id="works"
      className="relative overflow-x-hidden border-t border-white/10 py-16 sm:py-24 md:py-32"
    >
      <SectionBackground variant="grid" />
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          label="портфоліо"
          title="приклади кастомних робіт"
          description="Ось типи сайтів, які ми проєктуємо та розробляємо: від інтерактивних лендінгів до портфоліо з motion-ефектами. Кожен приклад — реальний формат, який можна адаптувати під ваш бренд."
          align="center"
          className="mb-10 sm:mb-14"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          className="mx-auto w-full max-w-5xl"
        >
          <CardStack
            items={stackItems}
            initialIndex={0}
            autoAdvance
            intervalMs={3500}
            pauseOnHover
            showDots
            cardWidth={dims.width}
            cardHeight={dims.height}
            overlap={0.42}
            spreadDeg={dims.width < 400 ? 30 : 42}
            maxVisible={5}
            renderCard={(item, { active }) => (
              <WebsiteShowcaseCard item={item as ShowcaseWorkItem} active={active} />
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mt-10 flex flex-col items-center gap-4 pb-6 sm:mt-12 sm:pb-0"
        >
          <p className="max-w-md text-center text-xs text-white/45">
            Макети живих сайтів. На телефоні — стрілки або свайп по картці; вниз — звичайний
            скрол сторінки.
          </p>
          <div
            data-works-cta
            className="flex w-full max-w-sm flex-col gap-2 sm:max-w-none sm:flex-row sm:justify-center sm:gap-3"
          >
            <Link href="/#contact" className="w-full sm:w-auto">
              <Button className="w-full">обговорити проєкт</Button>
            </Link>
            <Link href="/#calculator" className="w-full sm:w-auto">
              <Button variant="secondary" className="w-full">
                порахувати вартість
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
