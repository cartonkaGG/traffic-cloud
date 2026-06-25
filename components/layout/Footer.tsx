import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-[family-name:var(--font-syne)] text-lg font-bold">
            Cloud Agency
          </p>
          <p className="mt-1 text-sm text-muted">
            Веб-розробка · Брендинг · Автоматизація
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-muted">
          <Link href="/studio" className="hover:text-foreground">
            Studio
          </Link>
          <Link href="#contact" className="hover:text-foreground">
            Контакт
          </Link>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
