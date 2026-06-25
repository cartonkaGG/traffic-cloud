import Link from "next/link";
import { SectionBackground } from "@/components/effects/SectionBackground";

export function HomeFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10">
      <SectionBackground variant="aurora" />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="text-lg font-medium lowercase text-white">
            cloud agency
          </p>
          <p className="mt-1 text-sm text-white/50">
            маштабуйся разом з нами — сайти · боти · автоматизація
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm lowercase text-white/50">
          <Link href="/studio" className="transition-colors hover:text-white">
            studio
          </Link>
          <Link href="#contact" className="transition-colors hover:text-white">
            контакт
          </Link>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
