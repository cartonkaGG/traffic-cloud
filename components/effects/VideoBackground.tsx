"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HERO_VIDEO =
  "https://cdn.coverr.co/videos/coverr-abstract-digital-network-connections-5401/1080p.mp4";

export function VideoBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      </motion.div>

      <div className="absolute inset-0 bg-background/75" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(129,140,248,0.15) 0%, transparent 70%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(244,244,245,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(244,244,245,0.8) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
    </div>
  );
}
