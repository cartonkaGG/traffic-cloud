"use client";

import { siteThemes, type SiteThemeId } from "@/lib/design-tokens";
import { useStudioStore } from "@/lib/studio-store";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function StudioThemeFromUrl() {
  const searchParams = useSearchParams();
  const applyTheme = useStudioStore((s) => s.applyTheme);

  useEffect(() => {
    const themeId = searchParams.get("theme") as SiteThemeId | null;
    if (!themeId) return;
    if (siteThemes.some((t) => t.id === themeId)) {
      applyTheme(themeId);
    }
  }, [searchParams, applyTheme]);

  return null;
}
