"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useTemplateScroll } from "@/components/studio/template-preview-context";

export function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "40px", amount: 0.1 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1] as const,
      }}
    >
      {children}
    </motion.div>
  );
}

export function Magnet({
  children,
  padding = 150,
  strength = 3,
  className,
}: {
  children: ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRoot = useTemplateScroll();
  const [active, setActive] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const root = scrollRoot?.current ?? null;

    const onMove = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = clientX - cx;
      const dy = clientY - cy;
      const near =
        clientX >= rect.left - padding &&
        clientX <= rect.right + padding &&
        clientY >= rect.top - padding &&
        clientY <= rect.bottom + padding;

      setActive(near);
      setOffset(near ? { x: dx / strength, y: dy / strength } : { x: 0, y: 0 });
    };

    const onPointer = (e: PointerEvent) => onMove(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) onMove(t.clientX, t.clientY);
    };

    (root ?? el).addEventListener("pointermove", onPointer, { passive: true });
    (root ?? el).addEventListener("touchmove", onTouch, { passive: true });

    return () => {
      (root ?? el).removeEventListener("pointermove", onPointer);
      (root ?? el).removeEventListener("touchmove", onTouch);
    };
  }, [padding, strength, scrollRoot]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: active
          ? "transform 0.3s ease-out"
          : "transform 0.6s ease-in-out",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

export function AnimatedScrollText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const scrollRoot = useTemplateScroll();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollRoot ?? undefined,
    offset: ["start 0.8", "end 0.2"],
  });

  if (reduced) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p ref={ref} className={className}>
      {text.split("").map((char, i) => (
        <Char key={`${char}-${i}`} char={char} index={i} total={text.length} progress={scrollYProgress} />
      ))}
    </p>
  );
}

function Char({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <motion.span style={{ opacity }} className="inline">
      {char === " " ? "\u00a0" : char}
    </motion.span>
  );
}

export function JackContactButton({ className, small }: { className?: string; small?: boolean }) {
  return (
    <button
      type="button"
      className={`rounded-full font-medium uppercase tracking-widest text-white ${
        small ? "px-5 py-2 text-[10px]" : "px-6 py-2.5 text-xs sm:px-10 sm:py-3.5 sm:text-sm"
      } ${className ?? ""}`}
      style={{
        background:
          "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
        boxShadow:
          "0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1",
        outline: "2px solid white",
        outlineOffset: "-3px",
      }}
    >
      Звʼязатись
    </button>
  );
}
