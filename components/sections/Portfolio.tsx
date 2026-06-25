"use client";

import { SectionBackground } from "@/components/effects/SectionBackground";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    title: "nebula saas",
    category: "tech · landing",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    title: "lumière café",
    category: "ресторан · брендинг",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
  },
  {
    title: "forma studio",
    category: "портфоліо · мінімал",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
  },
  {
    title: "pulse health",
    category: "медицина · e-commerce",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="relative overflow-hidden border-t border-white/10 py-16 sm:py-24 md:py-32">
      <SectionBackground variant="mesh" />
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          label="портфоліо"
          title="проєкти, якими пишаємось"
          description="сайти, боти та автоматизація — реальні кейси для бізнесу."
        />

        <div className="mt-10 grid gap-3 sm:mt-16 sm:grid-cols-2 sm:gap-4">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm"
            >
              <div className="relative h-44 overflow-hidden sm:h-52">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>
              <div className="border-t border-white/10 p-6">
                <p className="text-xs lowercase text-white/50">
                  {project.category}
                </p>
                <h3 className="mt-1 text-xl font-medium lowercase text-white">
                  {project.title}
                </h3>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
