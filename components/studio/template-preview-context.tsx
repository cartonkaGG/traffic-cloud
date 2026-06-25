"use client";

import { createContext, useContext, type RefObject } from "react";

export const TemplateScrollContext = createContext<RefObject<HTMLDivElement | null> | null>(
  null,
);

export function useTemplateScroll() {
  return useContext(TemplateScrollContext);
}
